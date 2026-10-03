import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, CheckSquare, Square, Printer, RotateCcw, 
  Sun, Moon, Droplets, Camera, Compass, ShieldAlert, Sparkles, Gauge, Wind, Thermometer
} from 'lucide-react';

const defaultChecklist = [
  // Trang phục
  { id: 'c1', cat: 'clothing', label: 'Áo khoác gió chống nước & áo ấm giữ nhiệt (đêm Đà Lạt 11°C – 15°C)' },
  { id: 'c2', cat: 'clothing', label: 'Kính râm chống tia UV & mũ tai bèo che nắng trên đồi cao' },
  { id: 'c3', cat: 'clothing', label: '3-4 áo thun cotton hoặc merino dài tay thoáng khí' },
  { id: 'c4', cat: 'clothing', label: 'Quần trekking dã ngoại co giãn, nhanh khô khi lội sương rừng' },
  { id: 'c5', cat: 'clothing', label: 'Giày leo núi có gai bám chống trơn trượt trên rêu đá' },
  { id: 'c6', cat: 'clothing', label: 'Tất len dày giữ ấm cổ chân khi cắm trại qua đêm' },
  { id: 'c7', cat: 'clothing', label: 'Khăn rằn hoặc khăn choàng giữ ấm cổ sáng sớm' },
  
  // Thiết bị
  { id: 't1', cat: 'tech', label: 'Máy ảnh hoặc điện thoại có pin dự phòng dung lượng cao' },
  { id: 't2', cat: 'tech', label: 'Túi chống nước / chống ẩm bảo vệ máy ảnh trong sương sớm' },
  { id: 't3', cat: 'tech', label: 'Chân máy ảnh (tripod) chụp dải ngân hà và phơi sáng bình minh' },
  { id: 't4', cat: 'tech', label: 'Cáp sạc trên xe ô tô (cổng tẩu 12V / USB trên xe 4x4)' },

  // Đồ dùng cá nhân
  { id: 'p1', cat: 'personal', label: 'Kem chống muỗi & côn trùng rừng tự nhiên' },
  { id: 'p2', cat: 'personal', label: 'Đèn pin đội đầu có chế độ ánh sáng đỏ giữ tầm nhìn đêm' },
  { id: 'p3', cat: 'personal', label: 'Bình giữ nhiệt cá nhân 1.0L – 1.5L đựng nước ấm / cà phê' },
  { id: 'p4', cat: 'personal', label: 'Túi du lịch vải mềm dưới 15kg (hạn chế vali cứng để dễ xếp lên giá nóc xe)' }
];

export default function GuidePage({ onBack, onOpenBooking }) {
  const [packedItems, setPackedItems] = useState(() => {
    try {
      const saved = localStorage.getItem('dalat_packed_items');
      return saved ? JSON.parse(saved) : {};
    } catch (_) {
      return {};
    }
  });

  const [selectedSeason, setSelectedSeason] = useState('dry'); // 'dry' | 'spring' | 'cloud'

  useEffect(() => {
    try {
      localStorage.setItem('dalat_packed_items', JSON.stringify(packedItems));
    } catch (_) {}
  }, [packedItems]);

  const toggleItem = (id) => {
    setPackedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const resetChecklist = () => {
    if (window.confirm('Đặt lại toàn bộ danh sách hành lý chuẩn bị?')) {
      setPackedItems({});
    }
  };

  const totalItems = defaultChecklist.length;
  const packedCount = Object.values(packedItems).filter(Boolean).length;
  const progressPercent = Math.round((packedCount / totalItems) * 100);

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
          Sổ Tay Hành Trang Ghiền Đà Lạt
        </span>
        <h1 class="h2" style={{ color: 'var(--sky)', fontSize: 'clamp(40px, 6.5vw, 90px)', marginTop: 8 }}>
          Chuẩn Bị Hành Lý &amp; Kỹ Năng
        </h1>
        <p class="lead" style={{ color: 'var(--sand)', maxWidth: '64ch', marginTop: 14 }}>
          Danh mục trang phục cần thiết, tư vấn thời tiết cao nguyên theo mùa và các lưu ý an toàn trước khi bạn có mặt tại Gara Dốc Thông, TP. Đà Lạt.
        </p>
      </div>

      <div class="wrap" style={{ marginTop: 48, display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) minmax(0, 1.2fr)', gap: 48 }}>
        {/* Left Column: Interactive Packing Checklist Tool */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h2 style={{ fontSize: 28, fontWeight: 700, color: 'var(--sea)', margin: 0 }}>
                Hành Trang Cần Chuẩn Bị
              </h2>
              <span style={{ fontSize: 14, opacity: 0.8 }}>
                Đã chuẩn bị {packedCount} / {totalItems} vật dụng ({progressPercent}%)
              </span>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button 
                type="button" 
                class="btn btn--ghost" 
                onClick={() => window.print()}
                style={{ minHeight: 36, padding: '0 12px', fontSize: 13, gap: 6 }}
                title="In danh mục hành lý"
              >
                <Printer size={15} /> In danh sách
              </button>
              <button 
                type="button" 
                class="btn btn--ghost" 
                onClick={resetChecklist}
                style={{ minHeight: 36, padding: '0 12px', fontSize: 13, gap: 6 }}
                title="Làm mới lại"
              >
                <RotateCcw size={15} /> Đặt lại
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ height: 8, background: 'rgba(0,0,0,0.1)', borderRadius: 999, overflow: 'hidden', marginBottom: 32 }}>
            <div 
              style={{ 
                height: '100%', 
                width: `${progressPercent}%`, 
                background: progressPercent === 100 ? '#10b981' : 'var(--coral)',
                transition: 'width 0.4s ease'
              }} 
            />
          </div>

          {/* Categories */}
          {['clothing', 'tech', 'personal'].map(category => {
            const catTitles = {
              clothing: 'Trang phục & Đồ ấm ban đêm',
              tech: 'Thiết bị chụp ảnh & Nguồn sạc',
              personal: 'Đồ dùng cá nhân & Chăm sóc sức khỏe'
            };
            const catItems = defaultChecklist.filter(item => item.cat === category);

            return (
              <div key={category} style={{ marginBottom: 28 }}>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.04em', borderBottom: '1.5px solid var(--sea)', paddingBottom: 6, marginBottom: 14 }}>
                  {catTitles[category]}
                </h3>

                <div style={{ display: 'grid', gap: 10 }}>
                  {catItems.map(item => {
                    const isChecked = !!packedItems[item.id];
                    return (
                      <div 
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          gap: 12, 
                          background: isChecked ? 'rgba(16, 185, 129, 0.08)' : 'white', 
                          padding: '12px 16px', 
                          border: isChecked ? '1px solid #10b981' : '1px solid #ddd',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          borderRadius: 2
                        }}
                      >
                        {isChecked ? (
                          <CheckSquare size={20} style={{ color: '#10b981', flex: 'none' }} />
                        ) : (
                          <Square size={20} style={{ color: '#888', flex: 'none' }} />
                        )}
                        <span style={{ 
                          fontSize: 15, 
                          textDecoration: isChecked ? 'line-through' : 'none',
                          color: isChecked ? '#666' : 'var(--ink)'
                        }}>
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Seasonal Climate Advisor & Technical Tips */}
        <div>
          {/* Seasonal Advisor */}
          <div style={{ background: 'white', padding: 28, border: '2px solid var(--sea)', marginBottom: 32, boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--sea)', marginBottom: 14 }}>
              🌤️ Tư Vấn Thời Tiết Cao Nguyên Theo Mùa
            </h3>

            <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
              {[
                { id: 'dry', label: 'Mùa Cỏ Hồng (Th10–Th12)' },
                { id: 'spring', label: 'Mùa Mai Anh Đào (Th1–Th3)' },
                { id: 'cloud', label: 'Mùa Săn Mây (Th4–Th6)' }
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSelectedSeason(s.id)}
                  class={`btn ${selectedSeason === s.id ? '' : 'btn--ghost'}`}
                  style={{ minHeight: 36, padding: '0 10px', fontSize: 12, borderColor: 'var(--sea)' }}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {selectedSeason === 'dry' && (
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                <p><strong>Nhiệt độ ngày:</strong> 20°C – 24°C • <strong>Ban đêm:</strong> 11°C – 14°C</p>
                <p>Mùa đồi cỏ hồng Đan Kia và hoa dã quỳ nở vàng rực. Trời hanh khô, đêm lạnh sâu, cần chuẩn bị áo ấm dày và găng tay khi ngồi lửa trại.</p>
                <span style={{ color: 'var(--coral)', fontWeight: 700 }}>★ Đẹp nhất cho: Đồi Cỏ Hồng &amp; Rừng già Bidoup</span>
              </div>
            )}

            {selectedSeason === 'spring' && (
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                <p><strong>Nhiệt độ ngày:</strong> 22°C – 26°C • <strong>Ban đêm:</strong> 13°C – 16°C</p>
                <p>Mùa mai anh đào nở rộ trên sườn đồi, nắng ấm chan hòa và bầu trời trong vắt. Thời điểm hoàn hảo để cắm trại ngắm sao.</p>
                <span style={{ color: 'var(--coral)', fontWeight: 700 }}>★ Đẹp nhất cho: Cầu Đất &amp; Đỉnh Pinhatt</span>
              </div>
            )}

            {selectedSeason === 'cloud' && (
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                <p><strong>Nhiệt độ ngày:</strong> 24°C – 27°C • <strong>Ban đêm:</strong> 15°C – 18°C</p>
                <p>Thời điểm biển mây dày đặc và đẹp nhất năm trên các triền đồi cao Cầu Đất, Đran và Bidoup.</p>
                <span style={{ color: 'var(--coral)', fontWeight: 700 }}>★ Đẹp nhất cho: Săn Mây Cầu Đất &amp; Bidoup</span>
              </div>
            )}
          </div>

          {/* Off-Road Technical Advice */}
          <div style={{ background: 'var(--moss)', color: 'var(--sand)', padding: 28, borderRadius: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <Gauge size={22} style={{ color: 'var(--sky)' }} />
              <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--sky)', margin: 0 }}>
                Kinh Nghiệm Lái Xe 4x4 Trên Cao Nguyên
              </h3>
            </div>

            <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'grid', gap: 12, fontSize: 14, lineHeight: 1.55 }}>
              <li>
                <strong style={{ color: 'var(--coral)' }}>1. Hạ áp suất lốp:</strong> Khi vào đường đất đỏ rừng Bidoup hoặc cát suối, giảm áp suất lốp xuống 16–18 PSI để tăng độ bám và êm ái.
              </li>
              <li>
                <strong style={{ color: 'var(--coral)' }}>2. Chế độ 2 cầu chậm (4L):</strong> Luôn cài cầu chậm trước khi bắt đầu dốc đứng hoặc ngầm lội nước, tránh chuyển cầu khi đang trượt bánh.
              </li>
              <li>
                <strong style={{ color: 'var(--coral)' }}>3. Giữ khoảng cách đoàn xe:</strong> Duy trì cự ly tối thiểu 40–50 mét giữa hai xe trên đường đèo để tránh bụi đỏ và có đủ tầm nhìn xử lý tình huống.
              </li>
              <li>
                <strong style={{ color: 'var(--coral)' }}>4. Đều chân ga:</strong> Trên địa hình bùn lầy cao nguyên, ga đều và giữ lái thẳng, không thốc ga đột ngột gây xoay lốp đào hố.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
