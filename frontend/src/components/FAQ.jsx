import React from 'react';

const faqItems = [
  {
    q: 'Nên đi xe máy hay xe hơi khi khám phá Đà Lạt?',
    a: 'Mỗi phương tiện đều có trải nghiệm tuyệt vời riêng: Xe máy lý tưởng nhất cho các bạn trẻ thích luồn lách vào những con dốc sâu, các hẻm quán ăn ngon và đường mòn đất đỏ lên đồi săn mây Cầu Đất hay Đa Phú. Xe hơi (4 - 7 chỗ) cực kỳ phù hợp cho nhóm bạn hoặc gia đình muốn giữ ấm ban đêm, tránh mưa phùn và an toàn khi vượt đèo dốc dài. Nếu đi ô tô, bạn nên chọn các điểm tham quan có bãi đỗ rộng như Trại Mát, Thung Lũng Tình Yêu, Dinh Bảo Đại và tránh các hẻm dốc như Dốc Nhà Bò.'
  },
  {
    q: 'Săn mây Đà Lạt vào mấy giờ và ở đâu đẹp nhất?',
    a: 'Thời điểm vàng để săn biển mây bồng bềnh là từ 04:45 đến 06:00 sáng, trước khi mặt trời lên cao làm mây tan. Các tọa độ săn mây đỉnh cao gồm: Đồi Chè Cầu Đất (có thảm gỗ săn mây nổi tiếng), Đồi Đa Phú, Đồi Thiên Phúc Đức và Đỉnh Hòn Bồ. Nhớ mặc áo ấm 2 lớp, găng tay và mang theo bình giữ nhiệt chứa trà hoặc cà phê nóng nhé!'
  },
  {
    q: 'Lái ô tô lên Đà Lạt nên chọn đèo Prenn hay đèo Mimosa?',
    a: 'Hiện nay Đèo Prenn đã được nâng cấp mở rộng lên 4 làn xe chạy rất êm, cảnh quan rừng thông hai bên tuyệt đẹp và là lựa chọn số 1 cho xe con và xe du lịch. Đèo Mimosa thì mặt đường gồ ghề hơn và là tuyến đường dành riêng cho xe tải chở hàng và nông sản, vì vậy xe hơi cá nhân nên ưu tiên đi đèo Prenn.'
  },
  {
    q: 'Những món ăn nhất định phải thử một lần khi đến Đà Lạt?',
    a: 'Danh sách món "bất hủ" của dân Ghiền Đà Lạt gồm: Lẩu gà lá é Tao Ngộ (đường 3/4), Lẩu bò Ba Toa Quán Gỗ (hẻm 1 Hoàng Diệu), Bánh căn trứng lòng đào xíu mại (đường Tăng Bạt Hổ / Nhà Chung), Bánh mì xíu mại chấm nước dùng béo ngậy (Hoàng Diệu), Kem bơ béo ngậy Thanh Thảo (Nguyễn Văn Trỗi) và dạo chợ đêm húp ly sữa đậu nành nóng hột gà cùng bánh tráng nướng giòn rụm.'
  },
  {
    q: 'Bí quyết lái xe máy an toàn trên các con dốc cao Đà Lạt?',
    a: 'Đà Lạt có nhiều dốc gắt nổi tiếng. Quy tắc sống còn là: Luôn về số thấp (số 2 hoặc số 1 trên xe số/xe côn) khi lên dốc và cả khi đổ dốc để hãm bằng động cơ, KHÔNG được bóp chết thắng trước để tránh trượt bánh trên đường trơn sương mù. Với xe ga, giữ đều tay ga khi lên dốc và rà phanh nhịp nhàng cả 2 phanh trước - sau khi xuống dốc.'
  },
  {
    q: 'Bốn mùa Đà Lạt: Đi tháng nào là đẹp và lãng mạn nhất?',
    a: 'Đà Lạt mùa nào cũng có chất riêng say đắm lòng người: Tháng 1 - 2 là mùa Mai Anh Đào nở hồng khắp các nẻo đường; Tháng 3 - 4 là sắc tím mộng mơ của Phượng Tím; Tháng 5 - 8 là mùa mây luồn mùa hè mát lạnh trốn nóng; Tháng 9 - 11 là sắc vàng rực của Hoa Dã Quỳ và đồi Cỏ Hồng Suối Vàng thơ mộng.'
  }
];

export default function FAQ() {
  return (
    <section id="faq" class="faq" data-kind="faq">
      <div class="wrap faq-grid">
        <div class="faq-side">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--sea)', fontWeight: 700, marginBottom: 8 }}>
            💡 Cẩm nang bỏ túi
          </div>
          <h2 class="h2" data-lines style={{ fontSize: 'clamp(28px, 4.5vw, 44px)', lineHeight: 1.15 }}>Hỏi &amp; Đáp Cùng Dân Bản Địa</h2>
          <p data-reveal style={{ fontSize: 15, color: '#555', marginTop: 14 }}>
            Tất tần tật những băn khoăn về thuê xe máy, chạy xe hơi lên đèo, giờ săn mây chuẩn và quán ăn chuẩn vị không chặt chém được cộng đồng Ghiền Đà Lạt đúc kết.
          </p>
          <a class="link" href="#contact" data-reveal style={{ display: 'inline-block', marginTop: 16, fontWeight: 700 }}>
            Chia sẻ thêm kinh nghiệm của bạn →
          </a>
        </div>

        <div class="faq-list">
          {faqItems.map((item, idx) => (
            <details key={idx} class="qa">
              <summary>
                <span style={{ fontWeight: 600 }}>{item.q}</span>
                <span class="qa-icon" aria-hidden="true">
                  <svg viewBox="0 0 100 100">
                    <path d="M50 0C51 39 61 49 100 50C61 51 51 61 50 100C49 61 39 51 0 50C39 49 49 39 50 0Z" />
                  </svg>
                </span>
              </summary>
              <div class="qa-a">
                <p style={{ lineHeight: 1.6, fontSize: 14.5 }}>{item.a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
