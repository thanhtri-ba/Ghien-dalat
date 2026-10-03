import React, { useState } from 'react';

const monthlyData = [
  { month: 'Th1', days: 26, best: true },
  { month: 'Th2', days: 27, best: true },
  { month: 'Th3', days: 28, best: true },
  { month: 'Th4', days: 24, best: true },
  { month: 'Th5', days: 20, best: false },
  { month: 'Th6', days: 14, best: false },
  { month: 'Th7', days: 11, best: false },
  { month: 'Th8', days: 12, best: false },
  { month: 'Th9', days: 16, best: false },
  { month: 'Th10', days: 25, best: true },
  { month: 'Th11', days: 28, best: true },
  { month: 'Th12', days: 27, best: true }
];

export default function SeasonsChart() {
  const [selectedMonth, setSelectedMonth] = useState(monthlyData[10]); // Th11 (November)
  const maxVal = 30;

  return (
    <section id="seasons" class="seasons" data-tone="sky">
      <div class="wrap seasons-grid">
        <div class="seasons-copy">
          <h2 class="h2">Bốn Mùa Săn Mây &amp; Ngắm Hoa</h2>
          <p class="lead">
            Số ngày thời tiết lý tưởng vi vu mỗi tháng tại Đà Lạt, đúc kết từ nhật ký xê dịch của cộng đồng. Thời điểm đẹp nhất kéo dài từ Tháng 10 đến Tháng 4 năm sau — mùa dã quỳ, đồi cỏ hồng, mai anh đào và biển mây bồng bềnh.
          </p>

          <dl class="spec seasons-notes">
            <div><dt>Tháng 10 – 12</dt><dd>Mùa hoa Dã Quỳ rực vàng, đồi cỏ hồng Suối Vàng và sương lạnh ban mai</dd></div>
            <div><dt>Tháng 1 – 3</dt><dd>Mùa Mai Anh Đào nở rộ khắp phố, khí hậu khô ráo trời trong vắt</dd></div>
            <div><dt>Tháng 4 – 7</dt><dd>Mùa mây luồn mùa hè, khí hậu mát rượi trốn nóng cực đã</dd></div>
          </dl>

          {selectedMonth && (
            <div style={{ marginTop: 24, padding: 16, background: 'var(--moss)', color: 'var(--sand)', borderRadius: 2 }}>
              <strong>Thời tiết {selectedMonth.month}:</strong> Trung bình có khoảng {selectedMonth.days} ngày trời trong lành, cực thích hợp vi vu xe máy hoặc ô tô dạo quanh thành phố.
              {selectedMonth.best && <span style={{ color: 'var(--coral)', marginLeft: 8, fontWeight: 700 }}>★ Thời điểm vàng để đến Đà Lạt</span>}
            </div>
          )}
        </div>

        <figure class="chart">
          <ol class="bars">
            {monthlyData.map((item, idx) => {
              const heightPercent = (item.days / maxVal) * 100;
              const isSelected = selectedMonth.month === item.month;

              return (
                <li 
                  key={idx} 
                  class={`bar ${item.best ? 'bar--best' : ''}`}
                  onClick={() => setSelectedMonth(item)}
                  style={{ cursor: 'pointer' }}
                >
                  <span class="bar-track">
                    <span 
                      class="bar-col" 
                      style={{ 
                        height: `${heightPercent}%`,
                        outline: isSelected ? '2px solid var(--ink)' : 'none'
                      }} 
                    />
                    <span class="bar-v">{item.days}</span>
                  </span>
                  <span class="bar-m" style={{ fontWeight: isSelected ? 800 : 500 }}>{item.month}</span>
                </li>
              );
            })}
          </ol>
          <figcaption class="chart-cap wide" style={{ marginTop: 24 }}>
            Số ngày thời tiết lý tưởng trong tháng, trung bình qua 12 năm nhật ký hành trình (Nhấn vào tháng để xem chi tiết)
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
