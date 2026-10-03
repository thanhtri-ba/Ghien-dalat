import React, { useState } from 'react';
import { X, Bike, Car, Compass, ShieldAlert, CheckCircle2, PhoneCall, Sparkles } from 'lucide-react';

const vehiclesData = [
  {
    id: 'bike',
    name: 'Xe máy vi vu phố dốc',
    type: 'Xe số, tay ga & xe côn tay',
    highlight: 'Linh hoạt số 1 • Luồn lách mọi con dốc & hẻm nhỏ',
    cost: '100.000₫ – 160.000₫ / ngày',
    suitableFor: 'Bạn trẻ, phượt thủ, các cặp đôi mê tự do',
    routes: 'Dốc Nhà Bò, Đồi Đa Phú, Cà phê view sườn đồi, Chợ Đêm',
    fuelTip: 'Đổ đầy bình trước khi lên các đồi xa vì cây xăng đóng cửa sớm lúc 20:30',
    pros: [
      'Dễ dàng dừng lại chụp ảnh bất cứ khúc cua nào',
      'Cảm nhận trọn vẹn từng luồng gió mát lạnh và mùi nhựa thông',
      'Giao nhận xe miễn phí tận homestay, khách sạn'
    ],
    tips: 'Khi đổ dốc dài (như dốc Prenn cũ, dốc Đa Phú), hãy gài số thấp (số 2 hoặc số 1 với xe số), tuyệt đối không tắt máy thả trôi hay rà phanh liên tục.',
    rentalSpot: 'Anh Cường Cho Thuê Xe (0982 123 456) • Giao xe tại Bến xe Liên tỉnh & trung tâm',
    image_url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1000&q=75'
  },
  {
    id: 'car',
    name: 'Xe hơi gia đình & Tự lái',
    type: 'Sedan 4 chỗ, Crossover & SUV 7 chỗ',
    highlight: 'Ấm áp tuyệt đối • Tránh mưa phùn sương đêm',
    cost: '700.000₫ – 1.400.000₫ / ngày',
    suitableFor: 'Gia đình có con nhỏ, người lớn tuổi, nhóm bạn 4-7 người',
    routes: 'Đồi chè Cầu Đất, Samten Hills, Thác Datanla, Thiền Viện Trúc Lâm',
    fuelTip: 'Nhiều trạm xăng lớn và trạm sạc xe điện dọc Quốc lộ 20 và vòng xoay trung tâm',
    pros: [
      'Không ngại sương giá buốt đêm hay những cơn mưa bất chợt',
      'Khoang hành lý rộng rãi đựng đặc sản mứt, dâu tây mang về',
      'Bật máy sưởi ấm và nghe nhạc suốt dọc đường đèo'
    ],
    tips: 'Tuyến đèo Prenn mới mở rộng 4 làn xe chạy rất êm. Tránh vượt vạch liền ở các khúc cua khuất tầm nhìn và chủ động tìm bãi đỗ xe trước khi vào khu Hòa Bình.',
    rentalSpot: 'Dịch vụ ô tô tự lái Đà Lạt Car (0263 382 8999) • Nhận xe sân bay Liên Khương',
    image_url: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1000&q=75'
  },
  {
    id: '4x4',
    name: 'Jeep Cổ & Xe 4x4 Việt Dã',
    type: 'Jeep A2, Land Cruiser, UAZ Thợ Rừng',
    highlight: 'Đạo cụ sống ảo triệu view • Băng rừng lội bùn',
    cost: '800.000₫ – 1.600.000₫ / tour có tài',
    suitableFor: 'Tín đồ chụp ảnh phim, mê cắm trại rừng sâu, off-road',
    routes: 'Đỉnh Pinhatt, Rừng nguyên sinh Bidoup, Cây Thông Cô Đơn Suối Vàng',
    fuelTip: 'Xe gài cầu chuyên dụng vượt qua sình lầy và dốc đá gập ghềnh',
    pros: [
      'Góc máy chụp hình phong cách vintage hoài niệm cực chất',
      'Vào được những khu vực sâu nhất mà xe thường không thể tới',
      'Tài xế kiêm thợ ảnh bản địa hỗ trợ chụp hình suốt chuyến'
    ],
    tips: 'Trang bị áo gió chống nước và giày leo núi có độ bám cao vì đường rừng rất trơn sau mưa.',
    rentalSpot: 'Convoy Jeep Ghiền Đà Lạt (Hotline: 0263 3828 999) • Gara Dốc Thông',
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1000&q=75'
  },
  {
    id: 'bike-walk',
    name: 'Xe đạp đôi & Tản bộ',
    type: 'Xe đạp đôi quanh hồ & Dạo bộ dốc phố',
    highlight: 'Nhịp sống chậm rãi nhất • Thơ mộng bên bờ hồ',
    cost: '30.000₫ – 50.000₫ / giờ',
    suitableFor: 'Các cặp đôi đang yêu, người tìm sự tĩnh lặng bình yên',
    routes: 'Vòng quanh Hồ Xuân Hương, Đồi Cù, Vườn Hoa Thành Phố, Dốc Nhà Làng',
    fuelTip: 'Năng lượng từ một ly sữa đậu nành nóng và bắp ngô nướng vỉa hè',
    pros: [
      'Cảm nhận được nhịp thở và hơi sương sớm mai của cao nguyên',
      'Dừng chân bất kỳ quán cà phê cóc nào để trò chuyện cùng người bản xứ',
      'Vừa rèn luyện sức khỏe vừa thưởng ngoạn phong cảnh ngàn hoa'
    ],
    tips: 'Khoảng thời gian đạp xe đẹp nhất là từ 06:00 – 08:00 sáng hoặc 16:30 – 18:00 khi hoàng hôn buông xuống mặt hồ lấp lánh.',
    rentalSpot: 'Bến thuyền đạp vịt & Điểm thuê xe đạp quanh bờ hồ Xuân Hương',
    image_url: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1000&q=75'
  }
];

export default function Fleet() {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  return (
    <section id="fleet" class="fleet" data-kind="fleet" data-tone="dark">
      <div class="wrap fleet-head">
        <div>
          <h2 class="h2" data-lines>Đi xe máy hay xe hơi khi đến Đà Lạt?</h2>
          <p class="lead" data-reveal style={{ marginTop: 14 }}>
            Mỗi phương tiện mang lại một góc nhìn hoàn toàn khác biệt. Xe máy cho bạn sự tự do luồn qua từng con dốc sương lạnh, trong khi xe ô tô ôm ấp gia đình bạn ấm cúng qua những chặng đường xa.
          </p>
        </div>

        <div style={{ background: 'rgba(255,255,255,0.06)', padding: 18, borderLeft: '3px solid var(--coral)', borderRadius: 2 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--coral)', fontWeight: 700, fontSize: 14, marginBottom: 4 }}>
            <Compass size={18} />
            <span>MẸO THỔ ĐỊA</span>
          </div>
          <p style={{ fontSize: 14, margin: 0, opacity: 0.9 }}>
            Nếu đi 3 ngày: Hãy dành 1 ngày đi xe ô tô cho các điểm ngoại ô (Cầu Đất, Tuyền Lâm), và 2 ngày thuê xe máy dạo quanh các quán ăn, dốc hẻm nội đô!
          </p>
        </div>
      </div>

      <ul class="fleet-list wrap">
        {vehiclesData.map((v) => (
          <li 
            key={v.id} 
            class="rig" 
            data-rule
            onClick={() => setSelectedVehicle(v)}
            title="Nhấn để xem kinh nghiệm thuê & mẹo lái xe an toàn"
          >
            <div class="rig-id">
              <h3 class="rig-name" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>{v.name}</h3>
              <p class="rig-type wide" style={{ color: 'var(--coral)', fontWeight: 600 }}>{v.highlight}</p>
              <span style={{ fontSize: 13, color: 'var(--sky)', marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 600 }}>
                <Sparkles size={14} /> Xem kinh nghiệm &amp; địa chỉ thuê
              </span>
            </div>

            <figure class="rig-ph ph">
              <img src={v.image_url} alt={v.name} loading="lazy" />
            </figure>

            <dl class="spec">
              <div><dt>Chi phí tham khảo</dt><dd>{v.cost}</dd></div>
              <div><dt>Phù hợp nhất</dt><dd>{v.suitableFor}</dd></div>
              <div><dt>Cung đường chuẩn</dt><dd>{v.routes}</dd></div>
              <div><dt>Lưu ý nhiên liệu</dt><dd>{v.fuelTip}</dd></div>
            </dl>
          </li>
        ))}
      </ul>

      {/* Vehicle Guide Modal */}
      {selectedVehicle && (
        <div class="modal-overlay" onClick={() => setSelectedVehicle(null)}>
          <div class="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680, background: 'var(--moss)', color: 'var(--sand)' }}>
            <button 
              onClick={() => setSelectedVehicle(null)} 
              style={{ position: 'absolute', top: 20, right: 20, color: 'var(--sand)', cursor: 'pointer', background: 'none', border: 'none' }}
              aria-label="Đóng"
            >
              <X size={26} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              {selectedVehicle.id === 'bike' ? <Bike size={28} style={{ color: 'var(--coral)' }} /> : <Car size={28} style={{ color: 'var(--sky)' }} />}
              <h3 class="h2" style={{ fontSize: 32, color: 'var(--sky)', margin: 0 }}>{selectedVehicle.name}</h3>
            </div>

            <p style={{ fontSize: 15, color: 'var(--coral)', fontWeight: 700, marginBottom: 16 }}>
              {selectedVehicle.highlight} • Giá thuê: {selectedVehicle.cost}
            </p>

            <img 
              src={selectedVehicle.image_url} 
              alt={selectedVehicle.name} 
              style={{ width: '100%', height: 240, objectFit: 'cover', border: '1px solid var(--sky)', marginBottom: 20, borderRadius: 2 }} 
            />

            <div style={{ marginBottom: 18 }}>
              <h4 style={{ fontSize: 14, textTransform: 'uppercase', color: 'var(--sky)', marginBottom: 8, letterSpacing: '0.05em' }}>
                Lợi thế khi lựa chọn:
              </h4>
              <ul style={{ display: 'grid', gap: 8 }}>
                {selectedVehicle.pros.map((p, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontSize: 14 }}>
                    <CheckCircle2 size={15} style={{ color: '#10b981', flexShrink: 0 }} />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ background: 'rgba(224, 98, 68, 0.15)', border: '1px solid rgba(224, 98, 68, 0.4)', padding: 14, borderRadius: 4, marginBottom: 18 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--coral)', fontWeight: 700, fontSize: 13, marginBottom: 4 }}>
                <ShieldAlert size={16} />
                <span>BÍ KÍP LÁI XE AN TOÀN TRÊN CAO NGUYÊN</span>
              </div>
              <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.55 }}>{selectedVehicle.tips}</p>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.06)', padding: 14, borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              <div>
                <span style={{ fontSize: 12, opacity: 0.75, display: 'block' }}>Gợi ý địa chỉ thuê xe uy tín:</span>
                <strong style={{ fontSize: 14, color: 'var(--sand)' }}>{selectedVehicle.rentalSpot}</strong>
              </div>
              <a 
                href="tel:02633828999" 
                class="btn"
                style={{ minHeight: 38, padding: '0 16px', fontSize: 13, gap: 6 }}
              >
                <PhoneCall size={14} /> Gọi tư vấn xe
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
