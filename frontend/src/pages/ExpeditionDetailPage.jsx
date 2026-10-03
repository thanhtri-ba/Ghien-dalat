import React, { useState } from 'react';
import { 
  ArrowLeft, Calendar, MapPin, Bike, Car, Compass, Clock, 
  Camera, Utensils, AlertTriangle, Sparkles, Copy, Check, Heart, ExternalLink
} from 'lucide-react';

const REAL_DALAT_DETAILS = {
  'cau-dat': {
    title: 'Đồi Chè Cầu Đất & Tuabin Gió',
    tagline: 'Thiên đường săn biển mây sáng sớm trên đồi chè trăm tuổi và cánh đồng điện gió khổng lồ',
    heroImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80',
    distance: '23 km từ Chợ Đà Lạt',
    altitude: '1.650m so với mực nước biển',
    bestHour: '04:45 – 06:30 (Săn mây) & 16:30 – 17:30 (Hoàng hôn)',
    bestSeason: 'Quanh năm, đẹp nhất từ Tháng 4 đến Tháng 11 (mùa mây cuồn cuộn)',
    ticket: 'Miễn phí vào cổng / Các khu cafe chụp ảnh từ 60.000 – 100.000₫ kèm nước',
    
    motorbikeTips: {
      route: 'Từ trung tâm chạy theo đường Trần Hưng Đạo → Hùng Vương → Quốc lộ 20 hướng Trại Mát thẳng tiến Cầu Đất.',
      terrain: 'Đường nhựa phẳng đẹp, có vài khúc cua đèo thoải. Xe ga hay xe số đều đi êm ái.',
      safety: 'Nếu đi săn mây lúc 4h sáng, trời cực kỳ lạnh (13°C – 15°C) và sương mù dày, bắt buộc phải có áo ấm 2 lớp, găng tay giữ nhiệt, kính chắn gió và kiểm tra đèn pha.',
      gas: 'Cây xăng lớn tại Trại Mát mở cửa 24/7, nên đổ đầy bình trước khi qua đèo.'
    },

    carTips: {
      route: 'Tuyến Quốc lộ 20 mặt đường rộng 2-3 làn, ô tô 4 chỗ đến 45 chỗ lưu thông thuận tiện.',
      parking: 'Có nhiều bãi đỗ xe ô tô rộng rãi ngay cổng vào Đồi Chè Cầu Đất Farm và các tiệm cafe tuabin gió.',
      safety: 'Đoạn Trại Mát có nhiều xe chở nông sản và sương mù sáng sớm, nên bật đèn gầm sương mù và giữ khoảng cách an toàn.'
    },

    photoSpots: [
      { name: 'Cây cầu gỗ săn mây / Thảm gỗ bồng bềnh', desc: 'Góc chụp ôm trọn thung lũng mây trắng bồng bềnh như chốn bồng lai khi mặt trời ló rạng.' },
      { name: 'Chân cột tuabin gió khổng lồ', desc: 'Đứng giữa luống chè xanh ngát ngước nhìn cánh quạt trắng khổng lồ quay chậm rãi giữa trời xanh.' },
      { name: 'Đoàn tàu hỏa Cầu Đất màu đỏ cổ điển', desc: 'Góc check-in mang hơi hướng châu Âu giữa bạt ngàn nương chè xanh mướt.' },
      { name: 'Bậc thang giữa đồi chè cổ thụ', desc: 'Thả dáng tự nhiên trong làn sương sớm tinh khôi.' }
    ],

    nearbyFoods: [
      { name: 'Cà phê Cầu Đất Farm', type: 'Cà phê & Điểm tâm', note: 'Thưởng thức Arabica Cầu Đất nguyên chất ngay tại nguồn gốc sản xuất.' },
      { name: 'Bánh mì nướng muối ớt & Bắp nướng Trại Mát', type: 'Ăn vặt ven đèo', note: 'Ấm sực bàn tay sau khi săn mây trở về.' },
      { name: 'Lẩu gà lá é khu Trại Mát', type: 'Bữa trưa ấm nóng', note: 'Nước dùng chua thanh lá é ăn kèm măng cay nồng.' }
    ]
  },

  'ho-tuyen-lam': {
    title: 'Hồ Tuyền Lâm & Rừng Thông Suối Tía',
    tagline: 'Ốc đảo bình yên bao bọc bởi ngàn thông reo và dòng Suối Tía mờ sương kỳ ảo',
    heroImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    distance: '6 km từ trung tâm Đà Lạt',
    altitude: '1.500m so với mực nước biển',
    bestHour: '05:30 – 07:30 (Sương khói Suối Tía) & 15:30 – 17:30 (Hoàng hôn ven hồ)',
    bestSeason: 'Mùa thu và đông (Tháng 10 đến Tháng 2) khi rừng phong thay lá và sương sớm đặc quánh',
    ticket: 'Tự do dạo bờ hồ / Thuê thuyền SUP hoặc cano từ 150.000 – 300.000₫/người',

    motorbikeTips: {
      route: 'Chạy dọc theo đường Triệu Việt Vương hoặc đèo Prenn rẽ vào lối Thiền Viện Trúc Lâm.',
      terrain: 'Cung đường nhựa uốn lượn ven rừng thông cực kỳ lãng mạn, mặt đường êm ái, độ dốc nhẹ nhàng.',
      safety: 'Đoạn đường ven hồ sáng sớm thường đọng sương trơn trượt, chạy chậm ngắm cảnh thông reo hai bên.',
      gas: 'Trạm xăng nằm ngay ngã ba Triệu Việt Vương - Trần Thánh Tông.'
    },

    carTips: {
      route: 'Đường đôi thảm nhựa rộng thênh thang, xe 4-7 chỗ hoặc 16 chỗ lưu thông rất dễ dàng.',
      parking: 'Bãi đỗ ô tô cực rộng tại bến thuyền Tuyền Lâm, đập thủy điện hoặc sân Thiền Viện Trúc Lâm.',
      safety: 'Đường quanh co có nhiều người đi xe đạp và chạy bộ ven hồ, hạn chế bấm còi lớn để giữ yên tĩnh.'
    },

    photoSpots: [
      { name: 'Bến thuyền SUP Suối Tía lúc 6:00 sáng', desc: 'Rễ cây tràm cổ thụ mọc giữa làn nước mờ ảo trong khói sương bốc lên từ mặt hồ ấm.' },
      { name: 'Cây cầu gỗ ngắm hồ Tuyền Lâm', desc: 'View mặt hồ phẳng lặng như gương soi bóng rặng thông ba lá điệp trùng.' },
      { name: 'Đoạn đường thông uốn lượn ven đập', desc: 'Góc chụp đậm chất điện ảnh lãng mạn phong cách phim tình cảm mùa đông.' }
    ],

    nearbyFoods: [
      { name: 'Gà nướng cơm lam ống tre ven hồ', type: 'Đặc sản núi rừng', note: 'Gà đồi nướng than hoa chấm muối mè thơm phức bên bờ hồ lộng gió.' },
      { name: 'Cafe The Wilder-nest / Bình Minh Ơi', type: 'Cafe chill rừng thông', note: 'Ngắm thung lũng thông mờ ảo trong tiếng chim hót.' }
    ]
  },

  'pink-grass': {
    title: 'Đồi Cỏ Hồng & Cây Thông Cô Đơn',
    tagline: 'Thảo nguyên cỏ hồng đẫm tuyết sương mai và cắm trại ngắm dải ngân hà giữa thung lũng Suối Vàng',
    heroImage: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80',
    distance: '18 km về hướng Lạc Dương',
    altitude: '1.480m so với mực nước biển',
    bestHour: '05:00 – 07:00 sáng (khi sương đọng trên cỏ tạo thành đồi cỏ tuyết trắng hồng)',
    bestSeason: 'Duy nhất vào Tháng 11 – Tháng 12 hàng năm (mùa cỏ nở rộ)',
    ticket: 'Miễn phí tham quan thiên nhiên / Có dịch vụ đò chở qua hồ nếu không tự lái xe địa hình',

    motorbikeTips: {
      route: 'Đi hướng Xô Viết Nghệ Tĩnh → Ankroet → Thung Lũng Vàng rồi rẽ vào đường mòn đất đỏ ven hồ.',
      terrain: 'Đoạn đường đất mòn đồi dốc có bùn và rễ thông, khuyến nghị xe số hoặc xe côn tay gầm cao.',
      safety: 'Nếu trời mưa đường rất trơn, người lái cần vững tay lái. Tránh đi xe ga bánh nhỏ vào sâu trong đồi cỏ.',
      gas: 'Nên đổ đầy bình xăng từ khu trung tâm vì dọc đường Ankroet ít cây xăng lớn.'
    },

    carTips: {
      route: 'Xe ô tô con gầm thấp chỉ nên đi đến bãi xe Thung Lũng Vàng hoặc bến đò Suối Vàng.',
      parking: 'Gửi xe ô tô tại bến thuyền, sau đó đi cano qua đồi (khoảng 100.000₫/khứ hồi) để vào Cây Thông Cô Đơn an toàn.',
      safety: 'Chỉ xe SUV 2 cầu (4x4) gầm cao có kỹ năng offroad mới nên tự lái vào tận nơi.'
    },

    photoSpots: [
      { name: 'Cây Thông Cô Đơn sừng sững bên bờ hồ', desc: 'Biểu tượng của sự tự do và kiên định, chụp lúc bình minh dát vàng mặt hồ.' },
      { name: 'Triền đồi cỏ hồng đẫm sương tuyết', desc: 'Thảm cỏ hồng rực rỡ dưới ánh nắng ban mai lung linh như cổ tích.' },
      { name: 'Lều cắm trại dã ngoại bên đồi thông', desc: 'Khung cảnh thiên nhiên nguyên sơ, không một vướng bận phố xá.' }
    ],

    nearbyFoods: [
      { name: 'Quán ăn Thung Lũng Vàng', type: 'Cơm lam & Heo rừng nướng', note: 'Ấm bụng với các món nướng than củi nóng hổi.' },
      { name: 'Trà thảo mộc & Cà phê dã ngoại tự pha', type: 'Tự phục vụ', note: 'Tự nấu ấm nước sôi pha trà nóng giữa cái rét 12°C.' }
    ]
  },

  'da-phu': {
    title: 'Đồi Đa Phú — Săn Mây 360°',
    tagline: 'Tọa độ ngắm biển mây bình minh trọn vẹn nhất ngay sát vách trung tâm thành phố',
    heroImage: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
    distance: '12 km về phía Tây Bắc Đà Lạt',
    altitude: '1.600m so with mực nước biển',
    bestHour: '04:45 – 06:15 sáng (bắt buộc phải có mặt trước 05:15 để đón mây)',
    bestSeason: 'Tháng 4 đến Tháng 10 là mùa mây luồn dày nhất trong năm',
    ticket: 'Hoàn toàn miễn phí',

    motorbikeTips: {
      route: 'Chạy theo đường Phan Đình Phùng → Xô Viết Nghệ Tĩnh → rẽ vào đường Đan Kia rồi lên dốc chùa Dục Đức.',
      terrain: 'Đường dốc sỏi đất thoai thoải, xe máy lên đến tận đỉnh đồi nếu tay lái vững.',
      safety: 'Đoạn dốc lên đồi trời tối không có đèn đường, nên đi cùng bạn đồng hành và dùng đèn pha sáng.',
      gas: 'Đổ xăng tại ngã ba Phan Đình Phùng trước khi xuất phát.'
    },

    carTips: {
      route: 'Ô tô 4-7 chỗ chạy đến chân dốc chùa Dục Đức rồi đỗ tại bãi chân đồi rộng rãi.',
      parking: 'Đỗ xe an toàn tại chân đồi, sau đó đi bộ bộ tản bộ leo dốc khoảng 15-20 phút lên đỉnh đồi tập thể dục buổi sáng.',
      safety: 'Không nên lái ô tô cố leo lên đỉnh vì đường đất mòn hẹp khó quay đầu xe.'
    },

    photoSpots: [
      { name: 'Mỏm đồi thông nhìn xuống thung lũng mây 360°', desc: 'Tầm nhìn không góc chết bao quát biển mây cuồn cuộn dưới chân.' },
      { name: 'Bình minh ửng hồng trên đường chân trời', desc: 'Khoảnh khắc mặt trời đỏ rực nhô lên sau dãy Langbiang huyền thoại.' }
    ],

    nearbyFoods: [
      { name: 'Bánh mì xíu mại chén ngã ba Đan Kia', type: 'Ăn sáng bình dân', note: 'Chén xíu mại nóng giòn cay nồng ngay khi xuống đồi.' },
      { name: 'Quán sữa đậu nành hột gà', type: 'Thức uống giữ ấm', note: 'Làm ấm người tức thì sau 2 tiếng đón gió lạnh trên đồi cao.' }
    ]
  },

  'bidoup-loop': {
    title: 'Rừng Già Bidoup Núi Bà',
    tagline: 'Vương quốc rêu cổ thụ ma mị, hoa phong lan rừng và hệ sinh thái nguyên sinh nóc nhà Lâm Đồng',
    heroImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    distance: '45 km theo Quốc lộ 27C (đường đèo Khánh Lê)',
    altitude: '2.287m (Đỉnh Bidoup cao nhất Lâm Viên)',
    bestHour: 'Cả ngày / Khám phá hệ sinh thái rừng rêu lúc 08:00 – 15:00',
    bestSeason: 'Mùa khô từ Tháng 12 đến Tháng 4 năm sau (đường khô ráo, ít trơn trượt)',
    ticket: 'Vé tham quan Vườn quốc gia: 40.000₫/người (Trekking cần có kiểm lâm dẫn đường)',

    motorbikeTips: {
      route: 'Chạy theo Quốc lộ 27C hướng Nha Trang, cung đường đèo Khánh Lê tuyệt đẹp.',
      terrain: 'Đường nhựa đèo quanh co, có nhiều khúc cua gấp và sương mù bao phủ quanh năm.',
      safety: 'Cần xe máy máy khỏe (xe số hoặc tay côn), phanh tốt, kiểm tra lốp cẩn thận.',
      gas: 'Cây xăng cuối cùng ở xã Đạ Nhim, cách cửa rừng 15 km.'
    },

    carTips: {
      route: 'Quốc lộ 27C xe ô tô di chuyển rất tốt, đường nhựa êm.',
      parking: 'Đỗ xe an toàn tại Trung tâm Du khách Vườn Quốc gia Bidoup Núi Bà.',
      safety: 'Đèo Khánh Lê hay có sương mù dày và đá lở khi mưa lớn, theo dõi dự báo thời tiết trước khi đi.'
    },

    photoSpots: [
      { name: 'Cây pơ mu cổ thụ hơn 1.300 năm tuổi', desc: 'Thân cây khổng lồ ôm trọn cả vòng tay 7 người, bao phủ bởi rêu xanh huyền bí.' },
      { name: 'Thảm rêu cổ tích và hoa lan rừng', desc: 'Thế giới thực vật nguyên sinh kỳ ảo như trong truyện cổ tích tích.' }
    ],

    nearbyFoods: [
      { name: 'Cơm lam gà nướng của đồng bào K\'Ho', type: 'Ẩm thực bản địa', note: 'Ướp gia vị mắc mật rừng đặc trưng đậm đà hương vị Tây Nguyên.' }
    ]
  }
};

export default function ExpeditionDetailPage({ slug, expeditions = [], onBack, onOpenBooking }) {
  const [copied, setCopied] = useState(false);
  const exp = expeditions.find(e => e.slug === slug) || expeditions[0];
  const detail = REAL_DALAT_DETAILS[slug] || REAL_DALAT_DETAILS['cau-dat'];

  const handleCopyCoord = () => {
    navigator.clipboard.writeText(`${detail.title} - ${detail.distance} (Đà Lạt)`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div style={{ background: 'var(--sand)', minHeight: '100vh', color: 'var(--ink)', paddingBottom: 80, fontFamily: 'var(--f-text)' }}>
      {/* Detail Hero Header */}
      <div style={{ position: 'relative', height: '60vh', minHeight: 440, overflow: 'hidden' }}>
        <img 
          src={detail.heroImage} 
          alt={detail.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(24, 20, 18, 0.95) 0%, rgba(24, 20, 18, 0.35) 50%, rgba(24, 20, 18, 0.2) 100%)' }} />

        {/* Back Button */}
        <div style={{ position: 'absolute', top: 24, left: 'var(--m)', zIndex: 10 }}>
          <button 
            type="button" 
            class="btn btn--ghost" 
            onClick={onBack}
            style={{ color: 'white', borderColor: 'white', minHeight: 40, fontSize: 13, gap: 8, backdropFilter: 'blur(8px)' }}
          >
            <ArrowLeft size={16} /> Quay lại danh sách điểm đến
          </button>
        </div>

        {/* Hero Title & Caption */}
        <div style={{ position: 'absolute', bottom: 36, left: 'var(--m)', right: 'var(--m)', color: 'var(--sand)' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{ background: 'var(--coral)', color: 'var(--ink)', padding: '4px 12px', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              📍 {detail.distance}
            </span>
            <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>
              ⛰️ {detail.altitude}
            </span>
            <span style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(6px)', padding: '4px 12px', fontSize: 12, fontWeight: 600 }}>
              ✨ Ảnh chụp thật 100% Đà Lạt
            </span>
          </div>

          <h1 class="h2" style={{ fontSize: 'clamp(36px, 6vw, 84px)', color: 'var(--sky)', margin: 0, lineHeight: 1.05 }}>
            {detail.title}
          </h1>
          <p class="lead" style={{ color: 'var(--sand)', maxWidth: '64ch', marginTop: 10, fontSize: 'clamp(15px, 1vw + 11px, 20px)' }}>
            {detail.tagline}
          </p>
        </div>
      </div>

      {/* Quick Specs Highlight Box */}
      <div class="wrap" style={{ marginTop: -24, position: 'relative', zIndex: 10 }}>
        <div style={{ background: 'var(--moss)', color: 'var(--sand)', padding: '20px 28px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, boxShadow: '0 12px 36px rgba(0,0,0,0.2)', border: '1px solid var(--sky)', borderRadius: 2 }}>
          <div>
            <span style={{ fontSize: 11, textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em' }}>Giờ Vàng Check-in</span>
            <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--coral)', marginTop: 4 }}>{detail.bestHour}</div>
          </div>
          <div>
            <span style={{ fontSize: 11, textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em' }}>Mùa Đẹp Nhất</span>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--sky)', marginTop: 4 }}>{detail.bestSeason}</div>
          </div>
          <div>
            <span style={{ fontSize: 11, textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em' }}>Chi Phí Tham Quan</span>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'white', marginTop: 4 }}>{detail.ticket}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <button
              type="button"
              class="btn"
              onClick={() => onOpenBooking(exp)}
              style={{ width: '100%', minHeight: 40, fontSize: 13, gap: 6 }}
            >
              <Sparkles size={16} /> Lên Lịch Trình Tới Đây
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div class="wrap" style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1fr)', gap: 'var(--gap)' }}>
        {/* Left Column: Guides by Vehicles & Photo spots */}
        <div>
          {/* VEHICLE GUIDES SECTION */}
          <div style={{ marginBottom: 40 }}>
            <h2 class="h2" style={{ fontSize: 'clamp(26px, 4vw, 42px)', marginBottom: 20 }}>
              Cẩm Nang Phương Tiện: Xe Máy Hay Xe Hơi?
            </h2>

            {/* Motorbike Card */}
            <div style={{ background: 'var(--paper)', padding: 24, borderRadius: 2, marginBottom: 20, borderLeft: '5px solid var(--coral)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Bike size={24} style={{ color: 'var(--coral)' }} />
                <h3 style={{ fontSize: 19, fontWeight: 700, margin: 0 }}>Kinh Nghiệm Vi Vu Bằng Xe Máy</h3>
              </div>
              <p style={{ fontSize: 14, margin: '0 0 8px', lineHeight: 1.6 }}><strong>Tuyến đường:</strong> {detail.motorbikeTips.route}</p>
              <p style={{ fontSize: 14, margin: '0 0 8px', lineHeight: 1.6 }}><strong>Mặt đường &amp; Dốc:</strong> {detail.motorbikeTips.terrain}</p>
              <p style={{ fontSize: 14, margin: '0 0 8px', lineHeight: 1.6, color: '#b91c1c' }}><strong>⚠️ Lưu ý an toàn &amp; Thời tiết:</strong> {detail.motorbikeTips.safety}</p>
              <p style={{ fontSize: 13, margin: 0, color: '#475569' }}>⛽ <strong>Trạm xăng:</strong> {detail.motorbikeTips.gas}</p>
            </div>

            {/* Car Card */}
            <div style={{ background: 'var(--paper)', padding: 24, borderRadius: 2, borderLeft: '5px solid var(--sea)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <Car size={24} style={{ color: 'var(--sea)' }} />
                <h3 style={{ fontSize: 19, fontWeight: 700, margin: 0 }}>Kinh Nghiệm Đi Bằng Xe Hơi / Ô Tô</h3>
              </div>
              <p style={{ fontSize: 14, margin: '0 0 8px', lineHeight: 1.6 }}><strong>Tuyến đường:</strong> {detail.carTips.route}</p>
              <p style={{ fontSize: 14, margin: '0 0 8px', lineHeight: 1.6 }}><strong>Bãi đỗ xe ô tô:</strong> {detail.carTips.parking}</p>
              <p style={{ fontSize: 14, margin: 0, lineHeight: 1.6, color: '#1e3a8a' }}>💡 <strong>Mẹo cho tài xế:</strong> {detail.carTips.safety}</p>
            </div>
          </div>

          {/* PHOTO SPOTS SECTION */}
          <div style={{ marginBottom: 40 }}>
            <h2 class="h2" style={{ fontSize: 'clamp(26px, 4vw, 42px)', marginBottom: 20 }}>
              Góc Chụp Ảnh Sống Ảo Triệu View
            </h2>

            <div style={{ display: 'grid', gap: 14 }}>
              {detail.photoSpots.map((spot, idx) => (
                <div key={idx} style={{ background: 'white', padding: 18, border: '1px solid #e2e8f0', borderRadius: 4, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'color-mix(in oklab, var(--sea) 15%, transparent)', color: 'var(--sea)', display: 'grid', placeItems: 'center', fontWeight: 800, flexShrink: 0, fontSize: 14 }}>
                    {idx + 1}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>{spot.name}</h4>
                    <p style={{ fontSize: 14, color: '#555', margin: 0, lineHeight: 1.5 }}>{spot.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar: Food nearby & Community tips */}
        <div>
          {/* Nearby Foods Card */}
          <div style={{ background: 'white', padding: 24, borderRadius: 4, border: '1px solid #e2e8f0', marginBottom: 24, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <Utensils size={20} style={{ color: 'var(--coral)' }} />
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Quán Ăn &amp; Cafe Quanh Đây</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {detail.nearbyFoods.map((food, idx) => (
                <div key={idx} style={{ borderBottom: idx < detail.nearbyFoods.length - 1 ? '1px dashed #e2e8f0' : 'none', paddingBottom: 10 }}>
                  <strong style={{ fontSize: 14, color: 'var(--ink)', display: 'block' }}>{food.name}</strong>
                  <span style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 600 }}>{food.type}</span>
                  <p style={{ fontSize: 13, color: '#666', margin: '3px 0 0' }}>{food.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions Card */}
          <div style={{ background: 'var(--moss)', color: 'var(--sand)', padding: 24, borderRadius: 4 }}>
            <h4 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 10px', color: 'var(--sky)' }}>Tiếp Lửa Xê Dịch Cùng Ghiền Đà Lạt</h4>
            <p style={{ fontSize: 13, lineHeight: 1.6, margin: '0 0 16px', opacity: 0.9 }}>
              Bạn chuẩn bị đến đây? Hãy nhấn tạo lịch trình để nhận gợi ý lộ trình di chuyển 24 giờ hợp lý nhất và lưu tọa độ vào điện thoại!
            </p>

            <button 
              type="button" 
              class="btn" 
              onClick={() => onOpenBooking(exp)}
              style={{ width: '100%', minHeight: 44, fontSize: 14, marginBottom: 10 }}
            >
              Lên Lịch Trình Tự Túc
            </button>

            <button 
              type="button" 
              class="btn btn--ghost" 
              onClick={handleCopyCoord}
              style={{ width: '100%', minHeight: 40, fontSize: 13, gap: 6, borderColor: 'var(--sand)', color: 'var(--sand)' }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Đã Sao Chép Tọa Độ!' : 'Sao Chép Tên Điểm Đến'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
