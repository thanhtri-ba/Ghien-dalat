const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Ghiền Đà Lạt API', timestamp: new Date().toISOString() });
});

// GET Expeditions
app.get('/api/expeditions', (req, res) => {
  try {
    const expeditions = db.prepare('SELECT * FROM expeditions ORDER BY id ASC').all();
    res.json(expeditions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Single Expedition
app.get('/api/expeditions/:slug', (req, res) => {
  try {
    const expedition = db.prepare('SELECT * FROM expeditions WHERE slug = ?').get(req.params.slug);
    if (!expedition) return res.status(404).json({ error: 'Expedition not found' });
    res.json(expedition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Create Expedition / Spot
app.post('/api/expeditions', (req, res) => {
  try {
    const { title, slug, distance, days = 1, terrain, convoy, description, image_url, tone = 'default' } = req.body;
    if (!title) return res.status(400).json({ error: 'Tên địa điểm là bắt buộc' });
    const finalSlug = slug || title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    const stmt = db.prepare(`
      INSERT INTO expeditions (slug, title, distance, days, terrain, convoy, price_shared, price_private, description, image_url, tone, seats_total, seats_available, next_date)
      VALUES (?, ?, ?, ?, ?, ?, 0, 0, ?, ?, ?, 12, 10, 'Mở cửa tự do')
    `);
    const result = stmt.run(finalSlug, title, distance || '10 km', days, terrain || 'Đồi núi & Sương mù', convoy || 'Xe máy & Ô tô', description || '', image_url || 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80', tone);
    const created = db.prepare('SELECT * FROM expeditions WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, spot: created });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT Update Expedition / Spot
app.put('/api/expeditions/:id', (req, res) => {
  try {
    const { title, distance, terrain, convoy, description, image_url } = req.body;
    const stmt = db.prepare(`
      UPDATE expeditions 
      SET title = COALESCE(?, title),
          distance = COALESCE(?, distance),
          terrain = COALESCE(?, terrain),
          convoy = COALESCE(?, convoy),
          description = COALESCE(?, description),
          image_url = COALESCE(?, image_url)
      WHERE id = ?
    `);
    stmt.run(title, distance, terrain, convoy, description, image_url, req.params.id);
    const updated = db.prepare('SELECT * FROM expeditions WHERE id = ?').get(req.params.id);
    res.json({ success: true, spot: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Expedition / Spot
app.delete('/api/expeditions/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM expeditions WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Fleet
app.get('/api/fleet', (req, res) => {
  try {
    const fleet = db.prepare('SELECT * FROM fleet ORDER BY id ASC').all();
    res.json(fleet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Bookings
app.get('/api/bookings', (req, res) => {
  try {
    const { status } = req.query;
    let query = 'SELECT * FROM bookings ORDER BY created_at DESC';
    let params = [];
    if (status) {
      query = 'SELECT * FROM bookings WHERE status = ? ORDER BY created_at DESC';
      params = [status];
    }
    const bookings = db.prepare(query).all(...params);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Create Booking
app.post('/api/bookings', (req, res) => {
  try {
    const {
      expedition_id,
      expedition_title,
      customer_name,
      email,
      phone,
      guests = 1,
      booking_type = 'shared',
      departure_date,
      special_requests,
      total_price
    } = req.body;

    if (!customer_name || !email || !expedition_title || !departure_date) {
      return res.status(400).json({ error: 'Missing required booking fields (name, email, expedition, date)' });
    }

    // Generate unique code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const booking_code = `DL-${new Date().getFullYear()}-${randomNum}`;

    const stmt = db.prepare(`
      INSERT INTO bookings (
        booking_code, expedition_id, expedition_title, customer_name,
        email, phone, guests, booking_type, departure_date,
        special_requests, total_price, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `);

    const result = stmt.run(
      booking_code,
      expedition_id || null,
      expedition_title,
      customer_name,
      email,
      phone || '',
      parseInt(guests, 10) || 1,
      booking_type,
      departure_date,
      special_requests || '',
      parseFloat(total_price) || 0
    );

    // Optionally update seats left for expedition if expedition_id is provided
    if (expedition_id) {
      db.prepare(`
        UPDATE expeditions 
        SET seats_available = MAX(0, seats_available - ?) 
        WHERE id = ?
      `).run(parseInt(guests, 10) || 1, expedition_id);
    }

    const createdBooking = db.prepare('SELECT * FROM bookings WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json({ success: true, booking: createdBooking });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PATCH Update Booking Status
app.patch('/api/bookings/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }

    const stmt = db.prepare('UPDATE bookings SET status = ? WHERE id = ?');
    const result = stmt.run(status, req.params.id);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    const updated = db.prepare('SELECT * FROM bookings WHERE id = ?').get(req.params.id);
    res.json({ success: true, booking: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Booking
app.delete('/api/bookings/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM bookings WHERE id = ?');
    const result = stmt.run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST Contact Form
app.post('/api/contacts', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const stmt = db.prepare('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)');
    const result = stmt.run(name, email, subject || 'General Inquiry', message);

    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Contacts (Admin)
app.get('/api/contacts', (req, res) => {
  try {
    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Contact Submission
app.delete('/api/contacts/:id', (req, res) => {
  try {
    const stmt = db.prepare('DELETE FROM contacts WHERE id = ?');
    stmt.run(req.params.id);
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET Dashboard Stats
app.get('/api/stats', (req, res) => {
  try {
    const totalBookings = db.prepare('SELECT COUNT(*) as count FROM bookings').get().count;
    const pendingBookings = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'pending'").get().count;
    const confirmedBookings = db.prepare("SELECT COUNT(*) as count FROM bookings WHERE status = 'confirmed'").get().count;
    const totalRevenue = db.prepare("SELECT SUM(total_price) as sum FROM bookings WHERE status = 'confirmed'").get().sum || 0;
    const totalContacts = db.prepare('SELECT COUNT(*) as count FROM contacts').get().count;

    res.json({
      totalBookings,
      pendingBookings,
      confirmedBookings,
      totalRevenue,
      totalContacts
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`[Ghiền Đà Lạt API] Running on http://localhost:${PORT}`);
});
