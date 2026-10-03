import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

const galleryPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=1600&q=75',
    caption: 'Lều trại dã ngoại dưới bầu trời đêm ngập tràn ánh sao Đà Lạt',
    cls: 'ph gal-a',
    dir: 'left'
  },
  {
    src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=75',
    caption: 'Lối mòn đất đỏ xuyên qua cánh rừng thông mù sương buổi sớm',
    cls: 'ph gal-b',
    dir: 'top'
  },
  {
    src: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=75',
    caption: 'Xe việt dã vượt qua con suối đá tự nhiên giữa rừng nguyên sinh',
    cls: 'ph gal-c',
    dir: 'bottom'
  },
  {
    src: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=75',
    caption: 'Ánh lửa trại bập bùng giữa màn sương lạnh cao nguyên',
    cls: 'ph gal-d',
    dir: 'right'
  },
  {
    src: 'https://images.unsplash.com/photo-1647267198458-e38cadde4fec?auto=format&fit=crop&w=1600&q=75',
    caption: 'Chiếc xe jeep cổ điển dừng chân trên sườn đồi ngắm mây trôi',
    cls: 'ph gal-e',
    dir: 'left'
  },
  {
    src: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=75',
    caption: 'Những dãy núi trập trùng mờ ảo trong biển sương mù ban mai',
    cls: 'ph gal-f',
    dir: 'bottom'
  }
];

export default function Gallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  return (
    <section id="gallery" class="gallery" data-kind="gallery">
      <div class="wrap">
        <div class="gal-grid">
          <div class="gal-title">
            <h2 class="h2" data-lines>Từ cung đường</h2>
            <p class="lead" data-reveal>
              Những khoảnh khắc qua ống kính của Minh Triết qua các mùa. Không dàn dựng, không filter cầu kỳ, chỉ có sương mù, bụi đất và vẻ đẹp nguyên bản của cao nguyên.
            </p>
          </div>

          {galleryPhotos.map((item, idx) => (
            <figure 
              key={idx} 
              class={item.cls} 
              data-open={item.dir}
              onClick={() => setSelectedPhoto(item)}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.src} alt={item.caption} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div 
          class="modal-overlay" 
          onClick={() => setSelectedPhoto(null)}
          style={{ cursor: 'pointer' }}
        >
          <div 
            class="modal-content" 
            onClick={(e) => e.stopPropagation()} 
            style={{ maxWidth: 900, background: 'var(--ink)', color: 'var(--sand)', padding: 16 }}
          >
            <button 
              onClick={() => setSelectedPhoto(null)} 
              style={{ position: 'absolute', top: 16, right: 16, color: 'white', cursor: 'pointer', background: 'none', border: 'none' }}
              aria-label="Đóng"
            >
              <X size={28} />
            </button>
            <img src={selectedPhoto.src} alt={selectedPhoto.caption} style={{ width: '100%', maxHeight: '75vh', objectFit: 'contain' }} />
            <p style={{ marginTop: 16, fontStyle: 'italic', textAlign: 'center', fontSize: 15 }}>{selectedPhoto.caption}</p>
          </div>
        </div>
      )}
    </section>
  );
}
