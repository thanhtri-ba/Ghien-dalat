import React from 'react';
import { scrollToTarget } from '../utils/initAnimations';

export default function Footer({ onNavigateSection }) {
  const handleNavClick = (e, target) => {
    e.preventDefault();
    if (onNavigateSection) {
      onNavigateSection(target);
    } else {
      scrollToTarget(target);
    }
  };

  return (
    <footer className="foot">
      <div className="foot-top">
        <p className="foot-word">dalat</p>
        <svg className="star" viewBox="0 0 100 100" aria-hidden="true" style={{ width: 44, height: 44, color: 'var(--coral)' }}>
          <path d="M50 0C51 39 61 49 100 50C61 51 51 61 50 100C49 61 39 51 0 50C39 49 49 39 50 0Z" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '18px 32px', marginTop: 40, paddingTop: 20, borderTop: '1.5px solid currentColor', fontSize: 15 }}>
        <nav aria-label="Chân trang" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px 26px' }}>
          <a className="link" href="#expeditions" onClick={(e) => handleNavClick(e, '#expeditions')}>Tọa độ Check-in</a>
          <a className="link" href="#fleet" onClick={(e) => handleNavClick(e, '#fleet')}>Xe máy &amp; Ô tô</a>
          <a className="link" href="#prices" onClick={(e) => handleNavClick(e, '#prices')}>Món ngon Quán ruột</a>
          <a className="link" href="#route" onClick={(e) => handleNavClick(e, '#route')}>Lịch trình 24h</a>
          <a className="link" href="#faq" onClick={(e) => handleNavClick(e, '#faq')}>Bí kíp vi vu</a>
          <a className="link" href="#contact" onClick={(e) => handleNavClick(e, '#contact')}>Gửi tọa độ mới</a>
          <a className="link" href="#admin" onClick={(e) => { e.preventDefault(); if (onOpenAdmin) onOpenAdmin(); }} style={{ color: 'var(--coral)', fontWeight: 700 }}>🛡️ Quản Trị Admin</a>
        </nav>
        <small>© 2026 Ghiền ĐÀ LẠT. Tiếp lửa đam mê xê dịch — Khám phá địa điểm, ẩm thực, văn hóa &amp; phương tiện vi vu Đà Lạt.</small>
      </div>
    </footer>
  );
}
