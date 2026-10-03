import React, { useState, useEffect } from 'react';
import { X, CheckCircle, XCircle, Trash2, Mail, DollarSign, Calendar, RefreshCw, ShieldCheck } from 'lucide-react';

export default function AdminDashboard({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'contacts'
  const [bookings, setBookings] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ totalBookings: 0, pendingBookings: 0, confirmedBookings: 0, totalRevenue: 0, totalContacts: 0 });
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // Stats
      const resStats = await fetch('/api/stats');
      const dataStats = await resStats.json();
      setStats(dataStats);

      // Bookings
      const statusParam = filterStatus ? `?status=${filterStatus}` : '';
      const resBookings = await fetch(`/api/bookings${statusParam}`);
      const dataBookings = await resBookings.json();
      setBookings(dataBookings);

      // Contacts
      const resContacts = await fetch('/api/contacts');
      const dataContacts = await resContacts.json();
      setContacts(dataContacts);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchAdminData();
    }
  }, [isOpen, filterStatus]);

  if (!isOpen) return null;

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      alert('Lỗi cập nhật trạng thái: ' + err.message);
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa bản ghi đặt chỗ này?')) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      alert('Lỗi khi xóa đặt chỗ: ' + err.message);
    }
  };

  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 1000, width: '95%' }}>
        <button 
          type="button" 
          onClick={onClose} 
          style={{ position: 'absolute', top: 20, right: 20, color: 'var(--ink)', cursor: 'pointer', background: 'none', border: 'none' }}
          aria-label="Đóng"
        >
          <X size={26} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
          <ShieldCheck size={32} style={{ color: 'var(--coral)' }} />
          <div>
            <h2 class="h2" style={{ fontSize: 28, margin: 0 }}>Quản Lý Đặt Chỗ &amp; Tư Vấn</h2>
            <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>Ghiền Đà Lạt — Hệ thống quản trị nội bộ đoàn xe việt dã</p>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
          <div style={{ background: 'white', padding: 16, borderLeft: '4px solid var(--sea)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', color: '#666' }}>Tổng Đặt Chỗ</span>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--ink)' }}>{stats.totalBookings}</div>
          </div>

          <div style={{ background: 'white', padding: 16, borderLeft: '4px solid #f59e0b', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', color: '#666' }}>Chờ Xử Lý</span>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#f59e0b' }}>{stats.pendingBookings}</div>
          </div>

          <div style={{ background: 'white', padding: 16, borderLeft: '4px solid #10b981', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', color: '#666' }}>Đã Xác Nhận</span>
            <div style={{ fontSize: 28, fontWeight: 700, color: '#10b981' }}>{stats.confirmedBookings}</div>
          </div>

          <div style={{ background: 'white', padding: 16, borderLeft: '4px solid var(--coral)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
            <span style={{ fontSize: 12, textTransform: 'uppercase', color: '#666' }}>Doanh Thu Xác Nhận</span>
            <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--coral)', fontFamily: 'var(--f-display)' }}>
              {stats.totalRevenue ? stats.totalRevenue.toLocaleString('vi-VN') : 0} ₫
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--sea)', paddingBottom: 8, marginBottom: 20 }}>
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              type="button"
              class={`btn ${activeTab === 'bookings' ? '' : 'btn--ghost'}`}
              onClick={() => setActiveTab('bookings')}
              style={{ minHeight: 38, padding: '0 16px', fontSize: 14 }}
            >
              Danh sách Đặt Chỗ ({bookings.length})
            </button>
            <button
              type="button"
              class={`btn ${activeTab === 'contacts' ? '' : 'btn--ghost'}`}
              onClick={() => setActiveTab('contacts')}
              style={{ minHeight: 38, padding: '0 16px', fontSize: 14 }}
            >
              Tin Nhắn Tư Vấn ({contacts.length})
            </button>
          </div>

          <button 
            type="button" 
            class="btn btn--ghost" 
            onClick={fetchAdminData} 
            disabled={loading}
            style={{ minHeight: 38, padding: '0 12px', fontSize: 13, gap: 6 }}
          >
            <RefreshCw size={14} className={loading ? 'spin' : ''} />
            <span>{loading ? 'Đang tải...' : 'Làm mới'}</span>
          </button>
        </div>

        {/* Bookings Table */}
        {activeTab === 'bookings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Lọc theo trạng thái:</span>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                class="input-control"
                style={{ padding: '6px 12px', fontSize: 14, background: 'white', color: 'var(--ink)', borderColor: 'var(--sea)' }}
              >
                <option value="">Tất cả trạng thái</option>
                <option value="pending">Chờ xác nhận</option>
                <option value="confirmed">Đã xác nhận</option>
                <option value="cancelled">Đã hủy</option>
              </select>
            </div>

            {bookings.length === 0 ? (
              <p style={{ fontStyle: 'italic', padding: 20, textAlign: 'center' }}>Không có hồ sơ đặt chỗ nào.</p>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, background: 'white' }}>
                  <thead>
                    <tr style={{ background: 'var(--sea)', color: 'white', textAlign: 'left' }}>
                      <th style={{ padding: 10 }}>Mã phiếu</th>
                      <th style={{ padding: 10 }}>Khách hàng</th>
                      <th style={{ padding: 10 }}>Hành trình</th>
                      <th style={{ padding: 10 }}>Khởi hành</th>
                      <th style={{ padding: 10 }}>Số khách / Loại</th>
                      <th style={{ padding: 10 }}>Tổng chi phí</th>
                      <th style={{ padding: 10 }}>Trạng thái</th>
                      <th style={{ padding: 10, textAlign: 'right' }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} style={{ borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: 10, fontWeight: 700 }}>{b.booking_code}</td>
                        <td style={{ padding: 10 }}>
                          <div><strong>{b.customer_name}</strong></div>
                          <div style={{ fontSize: 12, color: '#666' }}>{b.email}</div>
                          {b.phone && <div style={{ fontSize: 12, color: '#666' }}>{b.phone}</div>}
                        </td>
                        <td style={{ padding: 10 }}>{b.expedition_title}</td>
                        <td style={{ padding: 10 }}>{b.departure_date}</td>
                        <td style={{ padding: 10 }}>
                          {b.booking_type === 'shared' ? `Ghép đoàn (${b.guests} khách)` : 'Trọn xe riêng'}
                        </td>
                        <td style={{ padding: 10, fontWeight: 700, color: 'var(--sea)' }}>
                          {b.total_price ? b.total_price.toLocaleString('vi-VN') : 0} ₫
                        </td>
                        <td style={{ padding: 10 }}>
                          <span class={`badge-status badge-${b.status}`}>
                            {b.status === 'confirmed' ? 'Đã xác nhận' : b.status === 'cancelled' ? 'Đã hủy' : 'Chờ xử lý'}
                          </span>
                        </td>
                        <td style={{ padding: 10, textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                            {b.status !== 'confirmed' && (
                              <button 
                                onClick={() => handleUpdateStatus(b.id, 'confirmed')}
                                title="Xác nhận đặt chỗ"
                                style={{ background: '#10b981', color: 'white', padding: '4px 8px', borderRadius: 3, cursor: 'pointer', fontSize: 12, border: 'none' }}
                              >
                                Xác nhận
                              </button>
                            )}
                            {b.status !== 'cancelled' && (
                              <button 
                                onClick={() => handleUpdateStatus(b.id, 'cancelled')}
                                title="Hủy đặt chỗ"
                                style={{ background: '#f59e0b', color: 'white', padding: '4px 8px', borderRadius: 3, cursor: 'pointer', fontSize: 12, border: 'none' }}
                              >
                                Hủy
                              </button>
                            )}
                            <button 
                              onClick={() => handleDeleteBooking(b.id)}
                              title="Xóa hồ sơ"
                              style={{ background: '#ef4444', color: 'white', padding: '4px 8px', borderRadius: 3, cursor: 'pointer', fontSize: 12, border: 'none' }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Contacts Tab */}
        {activeTab === 'contacts' && (
          <div>
            {contacts.length === 0 ? (
              <p style={{ fontStyle: 'italic', padding: 20, textAlign: 'center' }}>Chưa có tin nhắn liên hệ nào.</p>
            ) : (
              <div style={{ display: 'grid', gap: 14 }}>
                {contacts.map((c) => (
                  <div key={c.id} style={{ background: 'white', padding: 18, border: '1px solid #ddd', borderRadius: 3 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                      <div>
                        <strong style={{ fontSize: 16 }}>{c.name}</strong>
                        <span style={{ color: '#666', fontSize: 13, marginLeft: 10 }}>&lt;{c.email}&gt;</span>
                      </div>
                      <span style={{ fontSize: 12, color: '#888' }}>{c.created_at}</span>
                    </div>
                    {c.subject && <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--coral)', marginBottom: 6 }}>{c.subject}</div>}
                    <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, background: 'var(--paper)', padding: 12, borderRadius: 2 }}>
                      {c.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
