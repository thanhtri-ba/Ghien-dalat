import React from 'react';

const guidesData = [
  {
    name: 'chú ba',
    fullName: 'Chú Ba "Dốc Núi"',
    role: 'Tài xế lão thành 30 năm & Người kể chuyện',
    note: 'Thuộc lòng từng ngóc ngách, từng căn biệt thự cổ thời Pháp và luôn sẵn lòng kể bạn nghe những câu chuyện xưa cũ về xứ sở sương mù.',
    img: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=900&q=75'
  },
  {
    name: 'chị mai',
    fullName: 'Chị Mai Homestay',
    role: 'Chủ vườn mận & Người giữ lửa homestay',
    note: 'Tự tay ủ trà hoa hồng, nướng bánh chuối ấm nóng cho khách mỗi sớm mai và chỉ đường đến những con suối vắng vẻ không bóng người.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=75'
  },
  {
    name: 'anh hoàng',
    fullName: 'Hoàng "Săn Mây"',
    role: 'Nhiếp ảnh gia tự do & Thổ địa đồi cao',
    note: 'Chỉ cần nhìn hướng gió và nhiệt độ đêm là biết sớm mai mây sẽ tràn ngập ở Cầu Đất hay Đa Phú. Chuyên gia góc ảnh ngược sáng.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=75'
  },
  {
    name: 'bé linh',
    fullName: 'Khánh Linh',
    role: 'Thổ địa ẩm thực & Trưởng nhóm Ghiền Đà Lạt',
    note: 'Sành ăn từ quán cóc vỉa hè đến tiệm lẩu sâu trong hẻm. Luôn cập nhật những tọa độ quán cafe view đồi mới toanh cho cộng đồng.',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=75'
  }
];

export default function Guides() {
  return (
    <section id="guides" class="guides">
      <div class="wrap guides-head">
        <div>
          <h2 class="h2">Người Đà Lạt &amp; Những người bạn thổ địa</h2>
          <p class="lead" style={{ marginTop: 14 }}>
            Đà Lạt đẹp không chỉ bởi ngọn đồi hay rặng thông, mà còn bởi nét nồng hậu, hiền hòa và nụ cười ấm áp của những con người nơi đây.
          </p>
        </div>
      </div>

      <ul class="crew wrap">
        {guidesData.map((g, idx) => (
          <li key={idx} class="guide">
            <p class="guide-name">{g.name}</p>
            <figure class="guide-ph ph">
              <img src={g.img} alt={g.fullName} loading="lazy" />
            </figure>
            <p class="guide-role">
              <strong>{g.fullName}</strong>
              <span class="wide">{g.role}</span>
            </p>
            <p class="guide-note">{g.note}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
