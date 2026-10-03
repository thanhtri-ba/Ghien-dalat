import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Calendar, MapPin, Compass, Copy, Check, Sparkles, AlertTriangle, Car, Bike, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';

const ITINERARY_TEMPLATES = {
  'xe-may_san-may': [
    { time: '04:30', title: 'Săn mây Đồi Đa Phú / Cầu Đất', desc: 'Chạy xe máy trong sương lạnh (nhớ mặc ấm, đeo găng tay). Canh bình minh từ 5:15 đến 6:00.', tag: '🏍️ Đường đồi dốc nhẹ, ngắm mây 360°' },
    { time: '07:30', title: 'Bánh mì xíu mại chấm Hoàng Diệu', desc: 'Chén xíu mại nóng hổi béo ngậy kèm ly sữa đậu nành hột gà ấm sực.', tag: '🍲 Quán ăn sáng huyền thoại' },
    { time: '09:30', title: 'Cafe Hoàng Hôn Chiều / Thông Ơi', desc: 'Thưởng thức cà phê phin giữa triền thông thoai thoải, góc chụp ảnh cực chill.', tag: '☕ View đồi thông bay bổng' },
    { time: '12:30', title: 'Cơm niêu Như Ngọc / Bánh căn Nhà Chung', desc: 'Nạp năng lượng đậm đà ẩm thực cao nguyên giữa ngày.', tag: '🥢 Đậm vị dân dã phố núi' },
    { time: '15:00', title: 'Chèo thuyền SUP Suối Tía & Hồ Tuyền Lâm', desc: 'Lái xe máy ven bờ hồ Tuyền Lâm, dạo qua rừng phong lá đỏ bí ẩn.', tag: '🌲 Góc thiên nhiên nguyên sơ' },
    { time: '17:30', title: 'Hoàng hôn rực rỡ Xóm Lèo / Đồi Dã Chiến', desc: 'Ngắm chiều tà nhuộm tím đường chân trời, thưởng thức xiên que và trà nóng.', tag: '🌅 Tọa độ săn hoàng hôn số 1' },
    { time: '19:30', title: 'Lẩu gà lá é Tao Ngộ 3/4 & Dạo chợ đêm', desc: 'Húp xì xụp nồi lẩu cay nồng bên bạn bè trong cái rét 15°C đặc trưng Đà Lạt.', tag: '🍲 Hương vị không thể quên' }
  ],
  'xe-may_an-uong': [
    { time: '07:00', title: 'Bánh căn cô Lệ Yersin (trứng lòng đào xíu mại)', desc: 'Vừa thổi vừa ăn những chiếc bánh căn giòn rụm trong ngõ nhỏ đặc trưng.', tag: '🏍️ Hẻm dốc hẹp, xe máy vào tận cửa' },
    { time: '09:00', title: 'Cafe Tùng - Bản giao hưởng Trịnh Công Sơn', desc: 'Ngồi quán cafe lâu đời nhất Đà Lạt, nhấp ngụm cafe đậm đà hoài niệm.', tag: '☕ Ký ức thập niên 70' },
    { time: '11:30', title: 'Lẩu bò Ba Toa Quán Gỗ hẻm Hoàng Diệu', desc: 'Nồi lẩu bò nghi ngút khói đậm đà sa tế với mớ rau cải xanh tươi giòn.', tag: '🍲 Quán ruột dân tộc địa phương' },
    { time: '14:30', title: 'Kem bơ Thanh Thảo & Chè hé Ba Tháng Hai', desc: 'Bơ béo ngậy sánh mịn dầm sầu riêng thơm lừng làm ấm lòng giữa trưa lạnh.', tag: '🥑 Món tráng miệng quốc dân' },
    { time: '17:00', title: 'Bánh tráng nướng Dì Đinh Hoàng Diệu', desc: 'Được mệnh danh là Pizza Đà Lạt - giòn tan, ngập phô mai, trứng cút và khô bò.', tag: '🔥 Ăn vặt chiều hoàng hôn' },
    { time: '19:30', title: 'Lẩu bắp bò nhúng mắm ruốc / Đồ nướng ngói Cu Đức', desc: 'Tiếng thịt xèo xèo trên ngói đất nung, nhâm nhi chút rượu hâm nóng.', tag: '🥩 Hương vị đêm sương phố núi' }
  ],
  'xe-hoi_gia-dinh': [
    { time: '08:00', title: 'Điểm tâm Cơm niêu & Bánh mì chảo tại trung tâm', desc: 'Xe hơi đỗ thuận tiện ngay bãi xe rộng rãi đường Trần Phú hoặc Phan Chu Trinh.', tag: '🚗 Bãi đỗ xe 4-7 chỗ rộng rãi' },
    { time: '09:30', title: 'Vườn hoa Cẩm Tú Cầu Trại Mát & Đồi chè Cầu Đất', desc: 'Đường quốc lộ 20 thảm nhựa phẳng đẹp, lái xe hơi ngắm cảnh hai bên đồi thông tuyệt đẹp.', tag: '🌸 Cung đường êm ái cho gia đình' },
    { time: '12:00', title: 'Ẩm thực Tây Nguyên tại Nhà hàng Rừng Thông Mơ', desc: 'Không gian ấm cúng sang trọng, có chỗ chơi an toàn cho trẻ em và người lớn tuổi.', tag: '🍽️ Tiện nghi, view rừng thoáng đãng' },
    { time: '14:30', title: 'Dinh I Bảo Đại & Ga xe lửa cổ Đà Lạt', desc: 'Khám phá kiến trúc Pháp cổ điển, lối vào rộng rãi, bóng râm mát rượi.', tag: '🏛️ Lịch sử & Văn hóa kiến trúc' },
    { time: '17:30', title: 'Ngắm thung lũng đèn đêm Trại Mát từ The Diff House', desc: 'Quán có sân đỗ ô tô lớn, cả nhà thưởng thức trà atiso nóng ngắm vạn ánh đèn kính.', tag: '💡 Thung lũng ngàn sao' },
    { time: '19:30', title: 'Lẩu gà lá é hoặc lẩu nấm bồi bổ sức khỏe', desc: 'Không gian ấm cúng, xe đậu an toàn trước cửa nhà hàng.', tag: '🍲 Bữa tối ấm áp gia đình' }
  ],
  'cam-trai_chill': [
    { time: '06:00', title: 'Đón sương mai tại Cây Thông Cô Đơn Suối Vàng', desc: 'Di chuyển bằng xe máy gầm cao hoặc jeep việt dã băng qua đồi cỏ hồng.', tag: '⛺ Tọa độ cắm trại huyền thoại' },
    { time: '09:00', title: 'Pha cà phê Moka dã ngoại bên bờ hồ', desc: 'Tự tay nấu ấm nước suối nóng, thưởng thức hương cà phê lan tỏa giữa rừng thông.', tag: '☕ Vibe tự do phóng khoáng' },
    { time: '12:00', title: 'Bữa trưa Picnic gà nướng cơm lam ống tre', desc: 'Gà đồi nướng mọi vàng ươm chấm muối ớt chanh rừng Tây Nguyên cay xé lưỡi.', tag: '🍖 Trải nghiệm bản địa đặc sắc' },
    { time: '16:00', title: 'Dựng lều đón hoàng hôn tại Đồi Cỏ Hồng', desc: 'Dựng lều, chuẩn bị củi khô nhóm lửa ấm khi sương chiều bắt đầu buông xuống.', tag: '🔥 Không gian thiên nhiên diệu kỳ' },
    { time: '19:00', title: 'Lửa trại đàn hát Acoustic & Ngắm dải ngân hà', desc: 'Quây quần bên lửa than nướng khoai bắp, bầu trời đêm ngập tràn sao sáng.', tag: '✨ Chữa lành tâm hồn trọn vẹn' }
  ]
};

export default function BookingModal({ isOpen, onClose, initialExpedition, initialPlan = 'shared', expeditions = [] }) {
  const [vehicle, setVehicle] = useState('xe-may'); // 'xe-may' | 'xe-hoi' | 'cam-trai'
  const [vibe, setVibe] = useState('san-may'); // 'san-may' | 'an-uong' | 'chill'
  const [days, setDays] = useState('2n1d'); // '1n' | '2n1d' | '3n2d'
  const [travelerName, setTravelerName] = useState('');
  const [email, setEmail] = useState('');
  const [copied, setCopied] = useState(false);
  const [generated, setGenerated] = useState(false);

  useEffect(() => {
    if (initialExpedition?.slug?.includes('xe-hoi') || initialPlan === 'private') {
      setVehicle('xe-hoi');
    }
  }, [initialExpedition, initialPlan]);

  if (!isOpen) return null;

  // Determine key for template
  let key = `${vehicle}_${vibe}`;
  if (vehicle === 'cam-trai') key = 'cam-trai_chill';
  else if (vehicle === 'xe-hoi') key = 'xe-hoi_gia-dinh';
  else if (!ITINERARY_TEMPLATES[key]) key = 'xe-may_san-may';

  const schedule = ITINERARY_TEMPLATES[key] || ITINERARY_TEMPLATES['xe-may_san-may'];

  const handleGenerate = (e) => {
    e.preventDefault();
    setGenerated(true);
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (_) {}
  };

  const handleCopy = () => {
    const text = `🗺️ LỊCH TRÌNH VI VU ĐÀ LẠT TỰ TÚC (${days.toUpperCase()})
Phương tiện: ${vehicle === 'xe-may' ? 'Xe Máy vi vu' : vehicle === 'xe-hoi' ? 'Xe Ô tô / Gia đình' : 'Cắm Trại & Phượt'}
Người đồng hành: ${travelerName || 'Bằng hữu mê Đà Lạt'}
------------------------------------
${schedule.map(s => `⏰ ${s.time} - ${s.title}\n   ${s.desc}\n   📌 Lưu ý: ${s.tag}`).join('\n\n')}
------------------------------------
Chúc bạn có một chuyến đi Đà Lạt ngập tràn kỷ niệm đẹp! - Cộng đồng Ghiền Đà Lạt`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div class="modal-overlay" onClick={onClose}>
      <div class="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 680, maxHeight: '90vh', overflowY: 'auto' }}>
        <button 
          type="button" 
          onClick={onClose} 
          style={{ position: 'absolute', top: 20, right: 20, color: 'var(--ink)', cursor: 'pointer', background: 'none', border: 'none' }}
          aria-label="Đóng"
        >
          <X size={26} />
        </button>

        {!generated ? (
          <div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', background: 'color-mix(in oklab, var(--sea) 15%, transparent)', color: 'var(--sea)', borderRadius: 20, fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                <Sparkles size={14} /> Miễn phí 100% cho cộng đồng
              </div>
              <h2 class="h2" style={{ fontSize: 'clamp(24px, 4vw, 36px)', lineHeight: 1.2 }}>Thiết Kế Lịch Trình Vi Vu Tự Túc</h2>
              <p style={{ fontSize: 15, color: '#555', marginTop: 6 }}>
                Chọn sở thích và phương tiện của bạn. Hệ thống của <strong>Ghiền ĐÀ LẠT</strong> sẽ tự động gợi ý cung đường, tọa độ chụp ảnh và quán ăn ruột phù hợp nhất!
              </p>
            </div>

            <form onSubmit={handleGenerate}>
              {/* Select Vehicle */}
              <div class="input-group" style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  1. Bạn đi Đà Lạt bằng phương tiện gì?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 10, marginTop: 6 }}>
                  <button
                    type="button"
                    class={`btn ${vehicle === 'xe-may' ? '' : 'btn--ghost'}`}
                    onClick={() => setVehicle('xe-may')}
                    style={{ minHeight: 46, fontSize: 13, textTransform: 'none', justifyContent: 'flex-start', paddingInline: 12 }}
                  >
                    <Bike size={18} style={{ marginRight: 6 }} /> Xe Máy (Luồn hẻm & săn mây)
                  </button>
                  <button
                    type="button"
                    class={`btn ${vehicle === 'xe-hoi' ? '' : 'btn--ghost'}`}
                    onClick={() => setVehicle('xe-hoi')}
                    style={{ minHeight: 46, fontSize: 13, textTransform: 'none', justifyContent: 'flex-start', paddingInline: 12 }}
                  >
                    <Car size={18} style={{ marginRight: 6 }} /> Xe Hơi / Ô tô (Ấm áp, gia đình)
                  </button>
                  <button
                    type="button"
                    class={`btn ${vehicle === 'cam-trai' ? '' : 'btn--ghost'}`}
                    onClick={() => setVehicle('cam-trai')}
                    style={{ minHeight: 46, fontSize: 13, textTransform: 'none', justifyContent: 'flex-start', paddingInline: 12 }}
                  >
                    <Compass size={18} style={{ marginRight: 6 }} /> Cắm Trại & Việt Dã 4x4
                  </button>
                </div>
              </div>

              {/* Select Vibe */}
              <div class="input-group" style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  2. Gu trải nghiệm chuyến này của bạn?
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: 10, marginTop: 6 }}>
                  <button
                    type="button"
                    class={`btn ${vibe === 'san-may' ? '' : 'btn--ghost'}`}
                    onClick={() => setVibe('san-may')}
                    style={{ minHeight: 42, fontSize: 13, textTransform: 'none' }}
                  >
                    ☁️ Săn Mây & Check-in
                  </button>
                  <button
                    type="button"
                    class={`btn ${vibe === 'an-uong' ? '' : 'btn--ghost'}`}
                    onClick={() => setVibe('an-uong')}
                    style={{ minHeight: 42, fontSize: 13, textTransform: 'none' }}
                  >
                    🍲 Càn Quét Quán Ngon
                  </button>
                  <button
                    type="button"
                    class={`btn ${vibe === 'chill' ? '' : 'btn--ghost'}`}
                    onClick={() => setVibe('chill')}
                    style={{ minHeight: 42, fontSize: 13, textTransform: 'none' }}
                  >
                    ☕ Cà Phê Chill Chữa Lành
                  </button>
                </div>
              </div>

              {/* Duration */}
              <div class="input-group" style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  3. Thời gian bạn ở Đà Lạt
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginTop: 6 }}>
                  <button
                    type="button"
                    class={`btn ${days === '1n' ? '' : 'btn--ghost'}`}
                    onClick={() => setDays('1n')}
                    style={{ minHeight: 40, fontSize: 13, textTransform: 'none' }}
                  >
                    1 Ngày (24h Express)
                  </button>
                  <button
                    type="button"
                    class={`btn ${days === '2n1d' ? '' : 'btn--ghost'}`}
                    onClick={() => setDays('2n1d')}
                    style={{ minHeight: 40, fontSize: 13, textTransform: 'none' }}
                  >
                    2 Ngày 1 Đêm (Lý tưởng)
                  </button>
                  <button
                    type="button"
                    class={`btn ${days === '3n2d' ? '' : 'btn--ghost'}`}
                    onClick={() => setDays('3n2d')}
                    style={{ minHeight: 40, fontSize: 13, textTransform: 'none' }}
                  >
                    3 Ngày 2 Đêm (Thong dong)
                  </button>
                </div>
              </div>

              {/* User details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
                <div class="input-group">
                  <label>Biệt danh / Tên của bạn</label>
                  <input 
                    type="text" 
                    required 
                    class="input-control" 
                    placeholder="Ví dụ: Hoàng Mai"
                    value={travelerName}
                    onChange={(e) => setTravelerName(e.target.value)}
                    style={{ background: 'white', color: 'var(--ink)' }}
                  />
                </div>
                <div class="input-group">
                  <label>Email hoặc Zalo (Nhận bản đồ offline)</label>
                  <input 
                    type="text" 
                    class="input-control" 
                    placeholder="hoangmai@gmail.com / 09xx"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ background: 'white', color: 'var(--ink)' }}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                class="btn btn--ink" 
                style={{ width: '100%', minHeight: 48, fontSize: 15 }}
              >
                <Sparkles size={18} style={{ marginRight: 6 }} /> Lên Lịch Trình Tự Túc Ngay
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <CheckCircle2 size={32} style={{ color: '#10b981' }} />
              <div>
                <h3 class="h3" style={{ fontSize: 24, margin: 0 }}>Lịch Trình Đà Lạt Của {travelerName || 'Bạn'}</h3>
                <p style={{ margin: 0, fontSize: 13, color: '#666' }}>
                  Phương tiện: <strong>{vehicle === 'xe-may' ? 'Xe Máy vi vu' : vehicle === 'xe-hoi' ? 'Xe Hơi ấm áp' : 'Cắm Trại 4x4'}</strong> • Thời lượng: <strong>{days.toUpperCase()}</strong>
                </p>
              </div>
            </div>

            {/* Practical Advice Banner */}
            <div style={{ padding: 12, background: 'var(--paper)', borderLeft: '4px solid var(--sea)', fontSize: 13, marginBottom: 16 }}>
              {vehicle === 'xe-may' ? (
                <span>🛵 <strong>Mẹo xe máy:</strong> Sáng sớm & tối nhiệt độ xuống 14°C, nhớ mang găng tay và áo gió cản sương. Khi xuống đèo Mimosa/Prenn hãy về số thấp (số 2 hoặc 3) để hãm phanh động cơ.</span>
              ) : vehicle === 'xe-hoi' ? (
                <span>🚗 <strong>Mẹo xe ô tô:</strong> Các con dốc nhỏ trong trung tâm (như dốc Nhà Bò, dốc Ánh Sáng) xe hơi không nên vào. Hãy ưu tiên đỗ xe tại các bãi đường lớn hoặc khách sạn rồi đi bộ/gọi xe taxi ngắn.</span>
              ) : (
                <span>⛺ <strong>Mẹo cắm trại:</strong> Đêm sương Đà Lạt rất đọng nước, lều cần có 2 lớp chống mưa và tấm cách nhiệt mặt đất dày tối thiểu 10mm để giữ ấm cơ thể.</span>
              )}
            </div>

            {/* Generated Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBlock: 16, maxHeight: 360, overflowY: 'auto', paddingRight: 6 }}>
              {schedule.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: 14, padding: 12, background: 'white', border: '1px solid #e2e8f0', borderRadius: 4 }}>
                  <div style={{ minWidth: 54, fontWeight: 700, color: 'var(--sea)', fontSize: 14 }}>
                    {item.time}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>{item.title}</h4>
                    <p style={{ fontSize: 13, color: '#555', margin: '0 0 6px' }}>{item.desc}</p>
                    <span style={{ fontSize: 11, background: 'color-mix(in oklab, var(--sea) 10%, transparent)', color: 'var(--sea)', padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 20 }}>
              <button 
                type="button" 
                class="btn" 
                onClick={handleCopy}
                style={{ minHeight: 44, fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
                {copied ? 'Đã Lưu Vào Bộ Nhớ!' : 'Sao Chép Lịch Trình'}
              </button>
              <button 
                type="button" 
                class="btn btn--ghost" 
                onClick={() => setGenerated(false)}
                style={{ minHeight: 44, fontSize: 14 }}
              >
                Điều Chỉnh Lại
              </button>
            </div>

            <p style={{ fontSize: 12, color: '#777', textAlign: 'center', marginTop: 14 }}>
              ❤️ Chia sẻ lịch trình này cho người bạn đồng hành của bạn để chuẩn bị xách ba lô lên và đi nhé!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
