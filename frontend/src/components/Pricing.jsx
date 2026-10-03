import React, { useState } from 'react';
import { Utensils, Coffee, MapPin, Sparkles, Bike, Car, Heart } from 'lucide-react';

const foodCategories = [
  {
    category: 'hotpot',
    name: 'Lẩu gà lá é & Lẩu bò Ba Toa',
    tagline: 'Ấm nồng giữa đêm lạnh 15°C',
    dish: 'Lẩu gà lá é Tao Ngộ & Lẩu Bò Nhà Gỗ',
    address: 'Số 5 Đường 3 Tháng 4 & Hẻm 1/29 Hoàng Diệu',
    pricePerson: 120000,
    vehicleTip: 'Xe máy đậu trước quán; Ô tô nên gửi ở bãi đầu hẻm',
    highlight: 'Nước lẩu ngọt thanh the cay xua tan sương buốt',
    features: [
      'Lá é tươi thơm the nồng đặc trưng, măng le giòn sần sật',
      'Thịt gà ta thả đồi dai ngọt chấm muối tiêu ớt xanh giã nhuyễn',
      'Nồi lẩu bò Ba Toa ngập tràn nạm, gầu và đuôi bò ninh nhừ',
      'Ăn kèm rau tần ô (cải cúc) Đà Lạt xanh mướt giòn ngọt'
    ],
    main: true
  },
  {
    category: 'breakfast',
    name: 'Bánh căn & Bánh mì xíu mại',
    tagline: 'Bữa sáng kinh điển của người Đà Lạt',
    dish: 'Bánh Căn Lệ & Bánh Mì Hoàng Diệu',
    address: '27/44 Yersin & 79 Hoàng Diệu',
    pricePerson: 45000,
    vehicleTip: 'Dốc hẻm nhỏ hẹp, cực kỳ thích hợp đi xe máy',
    highlight: 'Giòn rụm viền bánh, xíu mại nóng bỏng tay',
    features: [
      'Bánh căn đúc khuôn đất nung giòn rụm nhân trứng cút / lòng đào',
      'Chén nước chấm mỡ hành ngập xíu mại và da heo dai giòn',
      'Bánh mì nóng giòn chấm nước sốt xá xíu đậm đà sa tế',
      'Uống kèm ly sữa đậu nành nóng hổi vào sáng sớm tinh mơ'
    ],
    main: false
  },
  {
    category: 'cafe-snack',
    name: 'Kem bơ & Cà phê view đồi',
    tagline: 'Góc chill ngắm hoàng hôn & săn đèn đêm',
    dish: 'Kem Bơ Thanh Thảo & Cafe Túi Mơ To',
    address: '76 Nguyễn Văn Trỗi & Hẻm 31 Sào Nam',
    pricePerson: 65000,
    vehicleTip: 'Xe máy hay ô tô đều tới được, có bãi đỗ rộng',
    highlight: 'Bơ sáp dẻo quánh & thung lũng đèn đêm',
    features: [
      'Bơ sáp loại 1 xay mịn không đá kết hợp kem dừa béo ngậy',
      'Bánh tráng nướng trứng cút, phô mai kéo sợi thơm nức mũi',
      'Cà phê Arabica Cầu Đất nguyên chất pha phin đậm đà',
      'View toàn cảnh thung lũng nhà lồng lung linh như dải ngân hà'
    ],
    main: false
  }
];

export default function Pricing({ onOpenBooking }) {
  const [personCount, setPersonCount] = useState(2);
  const [activeTab, setActiveTab] = useState('all');

  const filteredDishes = foodCategories.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <section id="prices" class="pricing" data-kind="pricing" data-tone="sky">
      <div class="wrap pricing-head">
        <div>
          <h2 class="h2" data-lines>Món ngon quán ruột &amp; Bản đồ ẩm thực</h2>
          
          {/* Group size budget estimator */}
          <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 14, background: 'rgba(0,0,0,0.06)', padding: '10px 18px', borderRadius: 4, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Dự tính ăn thả ga cho:
            </span>
            <input 
              type="range" 
              min="1" 
              max="8" 
              value={personCount}
              onChange={(e) => setPersonCount(parseInt(e.target.value, 10))}
              style={{ accentColor: 'var(--coral)', cursor: 'pointer' }}
            />
            <span style={{ fontWeight: 800, fontSize: 16, minWidth: 70, color: 'var(--sea)' }}>
              {personCount} {personCount === 1 ? 'người' : 'người'}
            </span>
            <span style={{ fontSize: 13, opacity: 0.85 }}>
              (Khoảng {(personCount * 220000).toLocaleString('vi-VN')}₫ cho cả ngày ăn sập Đà Lạt)
            </span>
          </div>
        </div>

        <div class="plan-switch" role="group" aria-label="Bộ lọc ẩm thực">
          <button 
            type="button" 
            class="btn plan-btn" 
            aria-pressed={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          >
            Tất cả món ngon
          </button>
          <button 
            type="button" 
            class="btn plan-btn" 
            aria-pressed={activeTab === 'hotpot'}
            onClick={() => setActiveTab('hotpot')}
          >
            🍲 Lẩu đêm lạnh
          </button>
          <button 
            type="button" 
            class="btn plan-btn" 
            aria-pressed={activeTab === 'breakfast'}
            onClick={() => setActiveTab('breakfast')}
          >
            🥖 Món sáng ấm bụng
          </button>
          <button 
            type="button" 
            class="btn plan-btn" 
            aria-pressed={activeTab === 'cafe-snack'}
            onClick={() => setActiveTab('cafe-snack')}
          >
            ☕ Kem bơ &amp; Cafe view
          </button>
        </div>
      </div>

      <ul class="plans wrap">
        {filteredDishes.map((item, idx) => {
          const totalEstimated = item.pricePerson * personCount;

          return (
            <li key={idx} class={`plan ${item.main ? 'plan--main' : ''}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--coral)', fontSize: 13, fontWeight: 700 }}>
                <Utensils size={15} />
                <span>{item.tagline}</span>
              </div>

              <h3 class="plan-name" style={{ fontSize: 'clamp(28px, 3.2vw, 48px)' }}>{item.name}</h3>

              <dl class="spec">
                <div><dt>Món trứ danh</dt><dd>{item.dish}</dd></div>
                <div><dt>Địa chỉ ruột</dt><dd>{item.address}</dd></div>
                <div><dt>Phương tiện</dt><dd>{item.vehicleTip}</dd></div>
                <div><dt>Đặc điểm vị</dt><dd>{item.highlight}</dd></div>
              </dl>

              <div class="plan-price">
                <span style={{ fontSize: 13, textTransform: 'uppercase', opacity: 0.8, fontWeight: 700 }}>
                  Chi phí trung bình:
                </span>
                <span style={{ fontFamily: 'var(--f-display)', fontSize: 'clamp(32px, 3.6vw, 54px)', fontWeight: 800 }}>
                  {totalEstimated.toLocaleString('vi-VN')} ₫
                </span>
                <span class="plan-unit wide">
                  ước tính cho nhóm {personCount} người ({item.pricePerson.toLocaleString('vi-VN')}₫/người)
                </span>
              </div>

              <ul class="plan-list">
                {item.features.map((feat, fIdx) => (
                  <li key={fIdx}>{feat}</li>
                ))}
              </ul>

              <button 
                type="button" 
                class="btn btn--ink"
                onClick={() => onOpenBooking({ title: item.name, terrain: item.dish })}
                style={{ gap: 8 }}
              >
                <Sparkles size={16} />
                <span>Lên lịch đi ăn món này</span>
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
