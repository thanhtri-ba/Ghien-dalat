import React from 'react';

const stopsData = [
  {
    day: '04:45 Sáng',
    title: 'Săn mây Cầu Đất / Đa Phú',
    desc: 'Lên xe máy hoặc ô tô lúc trời còn mờ sương. Đến đỉnh đồi khi mặt trời vừa ló rạng nhuộm hồng biển mây cuồn cuộn.',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=75',
    low: false
  },
  {
    day: '07:30 Sáng',
    title: 'Bánh mì xíu mại & Sữa đậu nành',
    desc: 'Ghé tiệm Hoàng Diệu hoặc hẻm Nhà Làng thưởng thức chén xíu mại nóng bỏng tay, húp thìa nước súp ngọt thơm cay nồng.',
    img: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1000&q=75',
    low: true
  },
  {
    day: '09:30 Trưa',
    title: 'Cà phê view đồi Túi Mơ To',
    desc: 'Ngồi bên sườn đồi ngắm thung lũng, nhâm nhi ly cà phê pha phin và chụp những bức hình đậm chất thơ giữa vườn cúc họa mi.',
    img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80',
    low: false
  },
  {
    day: '14:30 Chiều',
    title: 'Chèo SUP Suối Tía mờ ảo',
    desc: 'Xuôi mái chèo trên mặt hồ Tuyền Lâm phẳng lặng như gương soi, len lỏi giữa rừng thông ngập nước kỳ ảo bốc khói sương sớm.',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80',
    low: true
  },
  {
    day: '17:30 Chiều',
    title: 'Hoàng hôn Xóm Lèo & Dã Chiến',
    desc: 'Ngắm vầng thái dương đỏ rực lặn sau những rặng thông già, khi thành phố phía xa bắt đầu thắp sáng những dải đèn nhà kính.',
    img: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
    low: false
  },
  {
    day: '19:30 Đêm',
    title: 'Lẩu gà lá é & Bánh tráng nướng',
    desc: 'Nồi lẩu gà lá é sôi sùng sục giữa đêm 15°C, rồi dạo bộ chợ đêm ăn bánh tráng nướng giòn rụm và uống ly sữa hạt ấm lòng.',
    img: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=1000&q=80',
    low: true
  }
];

export default function RouteItinerary() {
  return (
    <section id="route" class="route" data-kind="itinerary">
      <div class="wrap route-head">
        <div>
          <h2 class="h2" data-lines>Lịch trình 24 giờ tự túc hoàn hảo</h2>
          <p class="lead" data-reveal style={{ marginTop: 14 }}>
            Gợi ý nhịp điệu một ngày trọn vẹn khám phá Đà Lạt: từ sớm tinh mơ đón mây luồn đến đêm muộn quây quần bên nồi lẩu nóng. Đi xe máy hay ô tô đều cực kỳ thuận đường!
          </p>
        </div>
      </div>

      <div class="route-track">
        <div class="route-rail">
          <svg class="route-line" aria-hidden="true"><path d="" /></svg>
          <ol class="route-list">
            {stopsData.map((item, idx) => (
              <li key={idx} class={`stop ${item.low ? 'stop--low' : ''}`}>
                <p class="stop-day">
                  <svg class="stop-mark" viewBox="0 0 100 100" aria-hidden="true">
                    <path d="M50 0C51 39 61 49 100 50C61 51 51 61 50 100C49 61 39 51 0 50C39 49 49 39 50 0Z" />
                  </svg>
                  {item.day}
                </p>
                <figure class="stop-ph ph">
                  <img src={item.img} alt={item.title} loading="lazy" width="1000" height="667" />
                </figure>
                <h3 class="stop-title">{item.title}</h3>
                <p>{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
