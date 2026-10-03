import React, { useState } from 'react';
import { ArrowRight, Compass, MapPin, Bike, Car, Heart, Sparkles } from 'lucide-react';

const spotsExtraInfo = {
  'cau-dat': {
    vehicle: 'Xe máy & Mọi loại ô tô',
    vehicleTag: 'both',
    bestHour: '04:45 – 06:30 săn mây',
    communityRating: '100% điểm check-in quốc dân',
    ticketInfo: 'Miễn phí / Cafe tự do',
    highlight: 'Tuabin gió khổng lồ & biển mây cuồn cuộn'
  },
  'ho-tuyen-lam': {
    vehicle: 'Xe máy & Ô tô gia đình',
    vehicleTag: 'both',
    bestHour: '05:30 – 07:30 & 16:00 hoàng hôn',
    communityRating: '99% yên bình chữa lành',
    ticketInfo: 'Tự do / Thuyền SUP ven hồ',
    highlight: 'Mặt hồ phẳng lặng soi bóng rừng thông'
  },
  'pink-grass': {
    vehicle: 'Xe máy phượt & Ô tô gầm cao',
    vehicleTag: 'both',
    bestHour: '05:00 – 07:00 sáng',
    communityRating: '98% khuyên nên đi',
    ticketInfo: 'Miễn phí tham quan',
    highlight: 'Thảo nguyên cỏ hồng đẫm sương tuyết bồng bềnh'
  },
  'da-phu': {
    vehicle: 'Xe máy dốc sỏi & Đi bộ nhẹ',
    vehicleTag: 'motorbike',
    bestHour: '04:45 – 06:15 sáng',
    communityRating: '99% view biển mây 360°',
    ticketInfo: 'Miễn phí hoàn toàn',
    highlight: 'Tầm nhìn panorama thung lũng mây tráng lệ'
  },
  'bidoup-loop': {
    vehicle: 'Xe máy côn tay / Ô tô 4x4',
    vehicleTag: 'both',
    bestHour: '08:00 – 15:00 khám phá',
    communityRating: '97% yêu thích thiên nhiên',
    ticketInfo: 'Vé bảo tồn: 40.000₫/người',
    highlight: 'Rừng rêu cổ tích ma mị & không khí trong veo'
  }
};

export default function Expeditions({ expeditions = [], onOpenBooking, onNavigateDetail }) {
  const [filterType, setFilterType] = useState('all');

  const filteredExpeditions = expeditions.filter(exp => {
    const extra = spotsExtraInfo[exp.slug] || {};
    if (filterType === 'motorbike') return extra.vehicleTag === 'motorbike' || extra.vehicleTag === 'both';
    if (filterType === 'car') return extra.vehicleTag === 'both';
    if (filterType === 'cloud') return exp.slug === 'cau-dat' || exp.slug === 'da-phu' || exp.slug === 'pink-grass';
    if (filterType === 'camp') return exp.slug === 'pink-grass' || exp.slug === 'ho-tuyen-lam' || exp.slug === 'bidoup-loop';
    return true;
  });

  const getToneClass = (tone) => {
    if (tone === 'tone-moss') return 'poster tone-moss';
    if (tone === 'tone-sky') return 'poster tone-sky';
    if (tone === 'tone-coral') return 'poster tone-coral';
    return 'poster';
  };

  return (
    <section id="expeditions" class="exp" data-kind="expeditions">
      <div class="wrap exp-head">
        <div>
          <h2 class="h2" style={{ lineHeight: 1.1, paddingBottom: 8, textTransform: 'none' }}>
            Tọa Độ Check-in &amp; Cung Đường Sống Ảo
          </h2>
          
          <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
            <button
              type="button"
              class={`btn ${filterType === 'all' ? '' : 'btn--ghost'}`}
              onClick={() => setFilterType('all')}
              style={{ minHeight: 38, padding: '0 16px', fontSize: 13 }}
            >
              Tất cả điểm đến ({expeditions.length})
            </button>
            <button
              type="button"
              class={`btn ${filterType === 'motorbike' ? '' : 'btn--ghost'}`}
              onClick={() => setFilterType('motorbike')}
              style={{ minHeight: 38, padding: '0 16px', fontSize: 13, gap: 6 }}
            >
              <Bike size={15} /> Phượt Xe Máy
            </button>
            <button
              type="button"
              class={`btn ${filterType === 'car' ? '' : 'btn--ghost'}`}
              onClick={() => setFilterType('car')}
              style={{ minHeight: 38, padding: '0 16px', fontSize: 13, gap: 6 }}
            >
              <Car size={15} /> Xe Hơi / Gia Đình
            </button>
            <button
              type="button"
              class={`btn ${filterType === 'cloud' ? '' : 'btn--ghost'}`}
              onClick={() => setFilterType('cloud')}
              style={{ minHeight: 38, padding: '0 16px', fontSize: 13 }}
            >
              ☁️ Săn Mây &amp; Bình Minh
            </button>
            <button
              type="button"
              class={`btn ${filterType === 'camp' ? '' : 'btn--ghost'}`}
              onClick={() => setFilterType('camp')}
              style={{ minHeight: 38, padding: '0 16px', fontSize: 13 }}
            >
              ⛺ Cắm Trại &amp; Rừng Thông
            </button>
          </div>
        </div>

        <p class="lead" data-reveal>
          Dù bạn chọn lượn xe máy qua những con dốc khúc khuỷu thơm mùi nhựa thông hay vi vu trên xe ô tô ấm cúng cùng gia đình, đây là những góc Đà Lạt đẹp mê hồn chụp bằng ảnh thật 100% nhất định phải ghé qua.
        </p>
      </div>

      <div class="exp-stack">
        {filteredExpeditions.map((exp) => {
          const extra = spotsExtraInfo[exp.slug] || {
            vehicle: 'Xe máy hoặc Ô tô',
            bestHour: '06:00 – 17:30',
            communityRating: '98% yêu thích',
            ticketInfo: 'Miễn phí / Tự do',
            highlight: 'Không gian thơ mộng'
          };

          return (
            <article key={exp.id} class={getToneClass(exp.tone)}>
              <dl class="spec">
                <div><dt>Phương tiện</dt><dd>{extra.vehicle}</dd></div>
                <div><dt>Khoảng cách</dt><dd>{exp.distance} từ trung tâm</dd></div>
                <div><dt>Giờ vàng</dt><dd>{extra.bestHour}</dd></div>
                <div><dt>Chi phí vé</dt><dd>{extra.ticketInfo}</dd></div>
              </dl>

              <div>
                <h3 class="poster-title" style={{ textTransform: 'none' }}>{exp.title}</h3>
                
                <div style={{ marginTop: 12, display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(224, 98, 68, 0.15)', padding: '6px 14px', borderRadius: 4, border: '1px solid rgba(224, 98, 68, 0.3)' }}>
                  <Heart size={15} style={{ color: 'var(--coral)', fill: 'var(--coral)' }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: 'inherit' }}>
                    {extra.communityRating} • {extra.highlight}
                  </span>
                </div>
              </div>

              <div class="poster-text">
                <p>{exp.description}</p>
                <div class="poster-foot">
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: 14, color: 'var(--coral)' }}>
                    <MapPin size={17} />
                    <span>Ảnh Thật 100% Đà Lạt</span>
                  </div>

                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', width: '100%', marginTop: 8 }}>
                    <button 
                      type="button" 
                      class="btn"
                      onClick={() => onNavigateDetail(exp.slug)}
                      style={{ minHeight: 44, padding: '0 20px', fontSize: 14, gap: 6 }}
                    >
                      Xem Cẩm Nang Chi Tiết <ArrowRight size={16} />
                    </button>
                    <button 
                      type="button" 
                      class="btn btn--ghost"
                      onClick={() => onOpenBooking(exp)}
                      style={{ minHeight: 44, padding: '0 16px', fontSize: 13, gap: 6 }}
                    >
                      <Sparkles size={15} /> Lên Lịch Trình Tới Đây
                    </button>
                  </div>
                </div>
              </div>

              <figure class="poster-ph ph" style={{ cursor: 'pointer' }} onClick={() => onNavigateDetail(exp.slug)}>
                <img 
                  src={exp.image_url} 
                  alt={exp.title} 
                  width="1600" 
                  height="1067" 
                  loading="lazy" 
                />
              </figure>
            </article>
          );
        })}
      </div>
    </section>
  );
}
