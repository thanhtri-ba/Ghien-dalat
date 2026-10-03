import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Search, Calendar, Users, ShieldCheck, 
  MapPin, Check, FileText, Send, Phone, Clock
} from 'lucide-react';

export default function LookupPage({ onBack }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState(null);
  const [yardMessage, setYardMessage] = useState('');
  const [msgSent, setMsgSent] = useState(false);

  // Check query parameter ?code=
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryCode = params.get('code');
    if (queryCode) {
      setCode(queryCode);
      lookupBooking(queryCode);
    }
  }, []);

  const lookupBooking = async (lookupCode) => {
    if (!lookupCode.trim()) return;
    setLoading(true);
    setError(null);
    setBooking(null);

    try {
      const res = await fetch(`/api/bookings/lookup/${lookupCode.trim()}`);
      const data = await res.json();

      if (res.ok && data.success) {
        setBooking(data.booking);
      } else {
        setError(`Không tìm thấy thông tin đặt chỗ mã "${lookupCode}". Vui lòng kiểm tra lại mã hoặc liên hệ Gara Đà Lạt.`);
      }
    } catch (err) {
      setError(err.message || 'Lỗi kết nối tới hệ thống máy chủ');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    lookupBooking(code);
  };

  const handleSendYardMessage = async (e) => {
    e.preventDefault();
    if (!yardMessage.trim() || !booking) return;

    try {
      await fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: booking.customer_name,
          email: booking.email,
          subject: `Ghi chú cho mã đặt chỗ: ${booking.booking_code}`,
          message: yardMessage
        })
      });
      setMsgSent(true);
      setYardMessage('');
    } catch {
      setMsgSent(true);
    }
  };

  const calculateDaysLeft = (dateString) => {
    if (!dateString) return null;
    const diff = new Date(dateString).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const daysLeft = booking ? calculateDaysLeft(booking.departure_date) : null;

  return (
    <div style={{ background: 'var(--sand)', minHeight: '100vh', color: 'var(--ink)', paddingBottom: 80 }}>
      {/* Top Banner */}
      <div style={{ background: 'var(--moss)', color: 'var(--sand)', padding: '60px var(--m) 48px' }}>
        <button 
          type="button" 
          class="btn btn--ghost" 
          onClick={onBack}
          style={{ color: 'var(--sky)', borderColor: 'var(--sky)', minHeight: 38, fontSize: 13, gap: 6, marginBottom: 24 }}
        >
          <ArrowLeft size={16} /> Quay lại Trang Chủ
        </button>

        <span style={{ color: 'var(--coral)', textTransform: 'uppercase', fontWeight: 800, fontSize: 13, letterSpacing: '0.08em' }}>
          Cổng Tra Cứu Ghiền Đà Lạt
        </span>
        <h1 class="h2" style={{ color: 'var(--sky)', fontSize: 'clamp(40px, 6.5vw, 84px)', marginTop: 8 }}>
          Tra Cứu Phiếu Đặt Chỗ
        </h1>
        <p class="lead" style={{ color: 'var(--sand)', maxWidth: '64ch', marginTop: 14 }}>
          Kiểm tra thông tin hành trình, đếm ngược ngày khởi hành, danh sách hành lý chuẩn bị và nhắn tin trực tiếp tới đội ngũ kỹ thuật Gara Dốc Thông.
        </p>
      </div>

      <div class="wrap" style={{ marginTop: 44, maxWidth: 900, marginInline: 'auto' }}>
        {/* Search Bar Card */}
        <div style={{ background: 'white', padding: 28, border: '2px solid var(--sea)', boxShadow: '0 8px 30px rgba(0,0,0,0.06)' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 260 }}>
              <Search size={20} style={{ position: 'absolute', left: 14, top: 15, color: '#888' }} />
              <input 
                type="text" 
                required
                class="input-control" 
                placeholder="Nhập mã đặt chỗ (ví dụ: DL-2026-8912)"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ paddingLeft: 42, background: 'var(--paper)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}
              />
            </div>

            <button type="submit" class="btn btn--ink" disabled={loading} style={{ minHeight: 48, padding: '0 28px' }}>
              {loading ? 'Đang kiểm tra...' : 'Tra cứu phiếu đặt'}
            </button>
          </form>

          {error && (
            <div style={{ marginTop: 18, padding: 14, background: '#fee2e2', border: '1px solid #ef4444', color: '#7f1d1d', fontSize: 14 }}>
              {error}
            </div>
          )}
        </div>

        {/* Boarding Voucher Result */}
        {booking && (
          <div style={{ marginTop: 36 }}>
            {/* Countdown Badge */}
            {daysLeft !== null && daysLeft > 0 && (
              <div style={{ background: 'var(--coral)', color: 'var(--ink)', padding: '12px 20px', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <span>⏳ ĐẾM NGƯỢC NGÀY KHỞI HÀNH:</span>
                <span style={{ fontSize: 18, fontWeight: 800 }}>
                  Còn {daysLeft} ngày nữa đoàn sẽ khởi hành từ Gara Dốc Thông, TP. Đà Lạt!
                </span>
              </div>
            )}

            {/* Passport-style Boarding Pass Card */}
            <div style={{ background: 'white', border: '2px solid var(--sea)', boxShadow: '0 16px 50px rgba(0,0,0,0.12)', position: 'relative', overflow: 'hidden' }}>
              {/* Header Strip */}
              <div style={{ background: 'var(--moss)', color: 'var(--sand)', padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <span style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sky)' }}>Phiếu Xác Nhận Khởi Hành</span>
                  <div style={{ fontSize: 32, fontWeight: 800, fontFamily: 'var(--f-display)', color: 'var(--sand)' }}>
                    {booking.expedition_title}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: 12, opacity: 0.8, textTransform: 'uppercase' }}>Mã đặt chỗ:</span>
                  <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--coral)', letterSpacing: '0.06em' }}>
                    {booking.booking_code}
                  </div>
                </div>
              </div>

              {/* Main Ticket Grid */}
              <div style={{ padding: 32 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                  <div>
                    <span style={{ fontSize: 12, textTransform: 'uppercase', color: '#666', fontWeight: 600 }}>Tên khách hàng</span>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>{booking.customer_name}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: 12, textTransform: 'uppercase', color: '#666', fontWeight: 600 }}>Ngày khởi hành</span>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>{booking.departure_date}</div>
                  </div>

                  <div>
                    <span style={{ fontSize: 12, textTransform: 'uppercase', color: '#666', fontWeight: 600 }}>Hình thức tham gia</span>
                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--ink)' }}>
                      {booking.booking_type === 'shared' ? `Ghép đoàn (${booking.guests} khách)` : 'Bao trọn xe riêng'}
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: 12, textTransform: 'uppercase', color: '#666', fontWeight: 600 }}>Trạng thái xác nhận</span>
                    <div>
                      <span class={`badge-status badge-${booking.status}`}>
                        {booking.status === 'confirmed' ? 'Đã xác nhận' : 'Đang xử lý'}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: 12, textTransform: 'uppercase', color: '#666', fontWeight: 600 }}>Điểm đón &amp; tập trung</span>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--sea)' }}>
                      Số 10 Trần Hưng Đạo, P.10, Đà Lạt (07:30 sáng)
                    </div>
                  </div>

                  <div>
                    <span style={{ fontSize: 12, textTransform: 'uppercase', color: '#666', fontWeight: 600 }}>Tổng chi phí</span>
                    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--sea)', fontFamily: 'var(--f-display)' }}>
                      {booking.total_price.toLocaleString('vi-VN')} ₫
                    </div>
                  </div>
                </div>

                {booking.special_requests && (
                  <div style={{ marginTop: 24, background: 'var(--paper)', padding: 16, borderLeft: '4px solid var(--sea)', fontSize: 14 }}>
                    <strong>Ghi chú đặc biệt / Chế độ ăn uống:</strong>
                    <p style={{ margin: '4px 0 0', fontStyle: 'italic' }}>"{booking.special_requests}"</p>
                  </div>
                )}

                {/* Pre-Trip Checklist */}
                <div style={{ marginTop: 28, background: '#fcfcfc', border: '1px solid #eee', padding: 20 }}>
                  <strong style={{ fontSize: 13, textTransform: 'uppercase', color: 'var(--sea)', display: 'block', marginBottom: 12 }}>
                    Danh mục chuẩn bị kỹ thuật tại Gara:
                  </strong>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, fontSize: 13 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check size={16} style={{ color: '#10b981' }} /> Hành lý mềm dưới 15kg sẵn sàng
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check size={16} style={{ color: '#10b981' }} /> Kênh đàm bộ đàm xe đã phân bổ (Kênh 14)
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check size={16} style={{ color: '#10b981' }} /> Lều nóc ARB &amp; túi ngủ ấm đã kiểm tra
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Check size={16} style={{ color: '#10b981' }} /> Thực đơn ăn uống đặc sản đã lên kế hoạch
                    </div>
                  </div>
                </div>

                {/* Footer Controls */}
                <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px dashed #ccc', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                  <div style={{ fontSize: 13, color: '#666' }}>
                    Cần hỗ trợ gấp? Gọi trực tiếp Gara qua hotline <a href="tel:+842633828999" class="link">+84 (0) 263 3828 999</a>
                  </div>

                  <button 
                    type="button" 
                    class="btn btn--ink"
                    onClick={() => window.print()}
                    style={{ minHeight: 42, padding: '0 20px', fontSize: 14, gap: 8 }}
                  >
                    <FileText size={16} /> In phiếu xác nhận
                  </button>
                </div>
              </div>
            </div>

            {/* Direct Yard Messaging Box */}
            <div style={{ marginTop: 32, background: 'var(--moss)', color: 'var(--sand)', padding: 28, border: '1px solid var(--sky)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, color: 'var(--sky)' }}>
                <Send size={20} />
                <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
                  Gửi lời nhắn tới Anh Hải &amp; Minh Tuấn
                </h3>
              </div>

              <p style={{ fontSize: 14, opacity: 0.9, marginBottom: 16 }}>
                Bạn có thay đổi về giờ đến sân bay Liên Khương, cập nhật chế độ ăn uống hoặc câu hỏi về hành trang cho mã đặt chỗ <strong>{booking.booking_code}</strong>?
              </p>

              {msgSent ? (
                <div style={{ background: 'rgba(16, 185, 129, 0.2)', border: '1px solid #10b981', padding: 14, color: 'white', fontSize: 14 }}>
                  ✓ Đã gửi lời nhắn tới đội ngũ kỹ thuật Gara Dốc Thông. Chúng tôi sẽ phản hồi tới {booking.email} sớm nhất.
                </div>
              ) : (
                <form onSubmit={handleSendYardMessage}>
                  <textarea 
                    rows={2}
                    required
                    class="input-control"
                    placeholder="Ví dụ: Chuyến bay hạ cánh sân bay Liên Khương lúc 15:30, xin lưu ý đoàn có 1 người ăn chay..."
                    value={yardMessage}
                    onChange={(e) => setYardMessage(e.target.value)}
                    style={{ background: 'rgba(0,0,0,0.3)', color: 'white', width: '100%', marginBottom: 12 }}
                  />
                  <button type="submit" class="btn" style={{ minHeight: 40, fontSize: 14 }}>
                    Gửi lời nhắn tới Gara Đà Lạt
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
