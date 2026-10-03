import React from 'react';

export default function Hero({ expeditions = [], onOpenBooking }) {
  const mainExp = expeditions.find(e => e.slug === 'bidoup-loop') || expeditions[0];
  const nextDate = mainExp?.next_date || '14 Tháng 5';
  const seatsLeft = mainExp?.seats_available !== undefined ? mainExp.seats_available : 6;

  return (
    <section id="hero" class="hero" data-kind="hero">
      <div class="hero-frame" data-frame>
        <img 
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=75" 
          alt="Rừng thông Đà Lạt ngập trong sương sớm dưới ánh nắng bình minh cao nguyên"
          width="1600"
          height="2000"
        />
      </div>

      <dl class="spec hero-spec">
        <div><dt>Khí hậu</dt><dd>14°C – 22°C se lạnh</dd></div>
        <div><dt>Phương tiện</dt><dd>Xe máy &amp; Xe hơi</dd></div>
        <div><dt>Tọa độ</dt><dd>100+ Điểm check-in</dd></div>
        <div><dt>Ẩm thực</dt><dd>Ấm nồng vị phố núi</dd></div>
      </dl>

      <h1 class="hero-word" style={{ '--len': 5 }} data-knock>dalat</h1>

      <p class="hero-cap">
        Chẳng cần lịch trình vội vã ngoài những sớm mai đón mây luồn qua kẽ lá, những chiều hoàng hôn tím ngắt bên sườn đồi và nồi lẩu nghi ngút khói giữa đêm lạnh 15°C. Ghiền Đà Lạt tiếp lửa cho bạn khám phá từng góc thông reo, quán quen và con dốc hoài niệm.
      </p>
    </section>
  );
}
