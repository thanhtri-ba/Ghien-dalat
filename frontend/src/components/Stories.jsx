import React from 'react';

const reviewsData = [
  {
    quote: 'Chạy xe máy vượt đèo Prenn trong sương sớm lúc 5 giờ sáng, hai hàm răng va vào nhau vì lạnh nhưng khoảnh khắc nhìn thấy biển mây Cầu Đất ùa về thì mọi mệt mỏi tan biến hết!',
    author: 'Trần Đức Anh',
    trip: 'Hà Nội • Phượt xe máy 3N2Đ'
  },
  {
    quote: 'Lần đầu tự lái ô tô 7 chỗ đưa cả gia đình và bố mẹ lên Đà Lạt. Đi đèo Prenn mới êm ru, cả nhà ăn lẩu gà lá é Tao Ngộ xong ai cũng tấm tắc khen ngon.',
    author: 'Lê Thảo My & Gia Đình',
    trip: 'TP. Hồ Chí Minh • Chuyến đi gia đình'
  },
  {
    quote: 'Đà Lạt không chỉ có cảnh đẹp mà con người ở đây dễ thương vô cùng. Xe máy thủng xăm dốc Trại Mát được chú sửa xe nhiệt tình vá giúp còn mời chén trà atiso nóng hổi.',
    author: 'Trịnh Minh Quân',
    trip: 'Đà Nẵng • Bụi Đà Lạt 4 ngày'
  },
  {
    quote: 'Hoàng hôn Xóm Lèo chiều hôm ấy tím ngắt một góc trời, vừa nhâm nhi bánh tráng nướng vừa nghe Acoustic bên đường. Đà Lạt chữa lành tâm hồn mình thật sự.',
    author: 'Vũ Hải Đăng',
    trip: 'Hải Phòng • Chuyến đi chữa lành'
  },
  {
    quote: 'Quán Gỗ Ba Toa trong hẻm sâu đúng là chân ái. Lẩu bò ngập thịt, nước lèo béo thơm sôi sùng sục giữa cái lạnh 14 độ C đêm phố núi. Đi Đà Lạt 10 lần vẫn phải ghé!',
    author: 'Gia đình chị Thanh Hương',
    trip: 'Cần Thơ • Khám phá ẩm thực'
  },
  {
    quote: 'Cắm trại một đêm ở Cây Thông Cô Đơn ngắm dải ngân hà và thức dậy giữa sương hồ Suối Vàng là kỷ niệm tuổi 25 tuyệt vời nhất của tụi mình.',
    author: 'Phan Tuấn & Mai Lan',
    trip: 'TP. Hồ Chí Minh • Cắm trại & Săn mây'
  }
];

export default function Stories() {
  return (
    <section id="stories" class="stories" data-kind="reviews" data-tone="dark">
      <div class="wrap">
        <figure class="big-quote">
          <blockquote>
            <p data-lines>Người ta đến Đà Lạt không phải để tìm kiếm sự ồn ào vội vã, mà để chậm lại một nhịp thở, hít căng lồng ngực mùi nhựa thông và sưởi ấm tâm hồn bên những người thân thương.</p>
          </blockquote>
          <figcaption>
            <strong>Cộng Đồng Ghiền ĐÀ LẠT</strong>
            <span class="wide">Hơn 2.000.000 thành viên tiếp lửa tình yêu xứ sở ngàn hoa</span>
          </figcaption>
        </figure>
      </div>

      <div class="quotes" data-marquee>
        <ul class="quotes-row">
          {reviewsData.map((r, idx) => (
            <li key={idx} class="q">
              <p>{r.quote}</p>
              <p class="q-by">
                <strong>{r.author}</strong>
                <span class="wide">{r.trip}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
