const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'overland.db');
const db = new Database(dbPath);

// Enable WAL mode for performance
db.pragma('journal_mode = WAL');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS expeditions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    distance TEXT NOT NULL,
    days INTEGER NOT NULL,
    terrain TEXT NOT NULL,
    convoy TEXT NOT NULL,
    price_shared REAL NOT NULL,
    price_private REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL,
    tone TEXT DEFAULT 'default',
    seats_total INTEGER DEFAULT 12,
    seats_available INTEGER DEFAULT 6,
    next_date TEXT DEFAULT '14 Tháng 5'
  );

  CREATE TABLE IF NOT EXISTS fleet (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL,
    seats TEXT NOT NULL,
    range TEXT NOT NULL,
    sleeps TEXT NOT NULL,
    rebuilt INTEGER NOT NULL,
    image_url TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    booking_code TEXT UNIQUE NOT NULL,
    expedition_id INTEGER,
    expedition_title TEXT NOT NULL,
    customer_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    guests INTEGER NOT NULL DEFAULT 1,
    booking_type TEXT NOT NULL DEFAULT 'shared',
    departure_date TEXT NOT NULL,
    special_requests TEXT,
    total_price REAL NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (expedition_id) REFERENCES expeditions (id)
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// Check if old non-Dalat data exists, reset if so to ensure fresh Dalat seeds
// Check if old non-Dalat or dolomite data exists, reset if so to ensure fresh Dalat seeds
const checkOldData = db.prepare("SELECT COUNT(*) as count FROM expeditions WHERE slug = 'lava-fields' OR image_url LIKE '%photo-1501785888041%'").get();
if (checkOldData && checkOldData.count > 0) {
  db.exec(`
    PRAGMA foreign_keys = OFF;
    DELETE FROM bookings;
    DELETE FROM expeditions;
    DELETE FROM fleet;
    PRAGMA foreign_keys = ON;
  `);
}

// Seed Dalat expeditions if empty
const countExpeditions = db.prepare('SELECT COUNT(*) as count FROM expeditions').get();
if (countExpeditions.count === 0) {
  const insertExpedition = db.prepare(`
    INSERT INTO expeditions (slug, title, distance, days, terrain, convoy, price_shared, price_private, description, image_url, tone, seats_total, seats_available, next_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertExpedition.run(
    'cau-dat',
    'Đồi chè Cầu Đất',
    '23 km',
    1,
    'Đồi chè & Tuabin gió',
    'Xe máy & Mọi loại ô tô',
    0,
    0,
    'Thiên đường săn biển mây sáng sớm trên những luống chè cổ thụ xanh ngát, ngắm cánh đồng điện gió tuabin khổng lồ và thưởng thức cà phê nóng.',
    'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80',
    'tone-sky',
    10,
    8,
    'Mở cửa tự do'
  );

  insertExpedition.run(
    'ho-tuyen-lam',
    'Hồ Tuyền Lâm & Suối Tía',
    '6 km',
    1,
    'Mặt hồ sương & Rừng thông',
    'Xe máy & Ô tô gia đình',
    0,
    0,
    'Ốc đảo bình yên bao bọc bởi ngút ngàn rừng thông ba lá. Trải nghiệm chèo SUP đón bình minh trên Suối Tía huyền ảo và tản bộ thư thái ven hồ.',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    'default',
    12,
    10,
    'Mở cửa tự do'
  );

  insertExpedition.run(
    'pink-grass',
    'Đồi Cỏ Hồng & Suối Vàng',
    '18 km',
    1,
    'Thảo nguyên cỏ hồng & Ven hồ',
    'Xe máy phượt & Ô tô gầm cao',
    0,
    0,
    'Thung lũng Đan Kia - Suối Vàng với thảo nguyên cỏ hồng ngút ngàn lúc bình minh phủ sương tuyết, cắm trại đón sương mai bên Cây Thông Cô Đơn.',
    'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80',
    'tone-moss',
    8,
    6,
    'Tháng 10 – Tháng 12'
  );

  insertExpedition.run(
    'da-phu',
    'Đồi Đa Phú Săn Mây',
    '12 km',
    1,
    'Đồi thông cao & Biển mây 360°',
    'Xe máy dốc sỏi & Trekking',
    0,
    0,
    'Tọa độ săn mây tự túc lý tưởng bậc nhất Đà Lạt với tầm nhìn panorama trọn vẹn thung lũng sương, cắm trại lều nóc đón ánh bình minh đầu tiên.',
    'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
    'tone-coral',
    12,
    10,
    '04:45 – 06:30 sáng'
  );

  insertExpedition.run(
    'bidoup-loop',
    'Rừng già Bidoup Núi Bà',
    '45 km',
    2,
    'Rừng rêu cổ & Sương mù',
    'Xe 4x4 & Hướng dẫn viên rừng',
    0,
    0,
    'Vương quốc rêu cổ thụ ma mị, hoa lan rừng đặc hữu và không khí trong lành ở độ cao trên 2.000m, nơi con đường nhựa chấm dứt để thiên nhiên cất lời.',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    'default',
    12,
    6,
    'Đăng ký kiểm lâm'
  );
}

// Seed Dalat fleet if empty
const countFleet = db.prepare('SELECT COUNT(*) as count FROM fleet').get();
if (countFleet.count === 0) {
  const insertRig = db.prepare(`
    INSERT INTO fleet (name, type, seats, range, sleeps, rebuilt, image_url)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertRig.run(
    'Jeep Cổ',
    'Willys A2 mui trần, 1974',
    '3 khách',
    '450 km',
    '2 người trên lều nóc',
    2020,
    'https://images.unsplash.com/photo-1647267198458-e38cadde4fec?auto=format&fit=crop&w=1600&q=75'
  );

  insertRig.run(
    'Chiến Mã',
    'UAZ 469 Hunter, 1985',
    '4 khách',
    '650 km',
    '2 trên xe, 2 lều đất',
    2022,
    'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=75'
  );

  insertRig.run(
    'FJ Cruiser',
    'Land Cruiser FJ40, 1981',
    '4 khách',
    '700 km',
    'Lều nóc ARB đôi',
    2023,
    'https://images.unsplash.com/photo-1519443933981-c665c4a62ad4?auto=format&fit=crop&w=1600&q=75'
  );

  insertRig.run(
    'Defender',
    'Defender 110 Hậu Cần, 1993',
    'Nước sạch, bếp lửa, tời cứu hộ',
    '950 km',
    'Thợ máy & đầu bếp',
    2019,
    'https://images.unsplash.com/photo-1564135624576-c5c88640f235?auto=format&fit=crop&w=1600&q=75'
  );
}

// Seed a sample Dalat booking if none exist
const countBookings = db.prepare('SELECT COUNT(*) as count FROM bookings').get();
if (countBookings.count === 0) {
  const firstExp = db.prepare('SELECT id, title FROM expeditions LIMIT 1').get();
  if (firstExp) {
    db.prepare(`
      INSERT INTO bookings (booking_code, expedition_id, expedition_title, customer_name, email, phone, guests, booking_type, departure_date, special_requests, total_price, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'DL-2026-8912',
      firstExp.id,
      firstExp.title,
      'Nguyễn Hoàng Nam',
      'hoangnam@example.com',
      '+84 912 345 678',
      2,
      'shared',
      '2026-05-14',
      'Cần lều nóc đôi ngắm sao, chuẩn bị cà phê Arabica không đường.',
      13800000,
      'confirmed'
    );
  }
}

module.exports = db;
