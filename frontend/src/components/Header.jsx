import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu as MenuIcon, X, ChevronDown, Compass, ShieldCheck, 
  Sparkles, Calendar, Search, BookOpen 
} from 'lucide-react';
import { scrollToTarget } from '../utils/initAnimations';

export default function Header({ 
  currentView, 
  detailSlug, 
  onNavigateSection, 
  onNavigatePage, 
  onOpenBooking, 
  onOpenAdmin 
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [expDropdownOpen, setExpDropdownOpen] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const dropdownRef = useRef(null);

  // Poll for admin notifications badge
  useEffect(() => {
    const checkBookings = async () => {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.ok) {
          const stats = await res.json();
          setPendingCount(stats.pendingBookings || 0);
        }
      } catch {
        // quiet fallback
      }
    };
    checkBookings();
    const interval = setInterval(checkBookings, 30000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setExpDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      document.documentElement.classList.add('menu-open');
    } else {
      document.documentElement.classList.remove('menu-open');
    }
  };

  const handleNavClick = (e, target, extraSlug = null) => {
    e.preventDefault();
    setExpDropdownOpen(false);

    if (target.startsWith('#')) {
      if (currentView !== 'home') {
        onNavigatePage('home', target);
      } else {
        scrollToTarget(target);
      }
    } else {
      onNavigatePage(target, extraSlug);
    }
  };

  const handleMobileNavClick = (e, target, extraSlug = null) => {
    setMenuOpen(false);
    document.documentElement.classList.remove('menu-open');
    handleNavClick(e, target, extraSlug);
  };

  return (
    <>
      <header className="site-head">
        <a 
          className="brand" 
          href="#hero" 
          onClick={(e) => handleNavClick(e, '#hero')}
          aria-label="Ghiền Đà Lạt, trang chủ"
        >
          <svg className="star" viewBox="0 0 100 100" aria-hidden="true" style={{ width: 28, height: 28, color: '#e06244' }}>
            <path d="M50 0C51 39 61 49 100 50C61 51 51 61 50 100C49 61 39 51 0 50C39 49 49 39 50 0Z" />
          </svg>
          <span className="brand-text">
            <span className="brand-ghien">Ghiền</span>
            <span className="brand-dalat">ĐÀ LẠT</span>
          </span>
        </a>

        <nav className="nav" aria-label="Main navigation">
          {/* Expeditions with dropdown */}
          <div 
            ref={dropdownRef}
            style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}
            onMouseEnter={() => setExpDropdownOpen(true)}
            onMouseLeave={() => setExpDropdownOpen(false)}
          >
            <a 
              href="#expeditions" 
              onClick={(e) => handleNavClick(e, '#expeditions')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                color: currentView === 'expedition-detail' ? 'var(--coral)' : 'inherit',
                fontWeight: currentView === 'expedition-detail' ? 700 : 'inherit'
              }}
            >
              Tọa độ Check-in
              <ChevronDown size={14} style={{ opacity: 0.7, transform: expDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
            </a>

            {/* Dropdown Menu */}
            {expDropdownOpen && (
              <div 
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  marginTop: 6,
                  background: 'rgba(28, 24, 21, 0.96)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(224, 98, 68, 0.3)',
                  boxShadow: '0 16px 36px rgba(0,0,0,0.35)',
                  minWidth: 260,
                  padding: '8px 0',
                  zIndex: 100,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 4
                }}
              >
                <div style={{ padding: '6px 14px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'var(--coral)', letterSpacing: '0.08em' }}>
                  Tọa độ &amp; Góc view nổi tiếng
                </div>
                
                <button
                  type="button"
                  onClick={(e) => handleNavClick(e, '#expeditions')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '8px 14px',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--sky)',
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: 'pointer',
                    width: '100%',
                    fontFamily: 'inherit'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Compass size={15} style={{ color: 'var(--coral)' }} />
                  <span>Khám phá tất cả tọa độ &amp; view đẹp</span>
                </button>

                <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '4px 0' }} />
                
                <div style={{ padding: '6px 14px 2px', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.08em' }}>
                  Điểm đến gợi ý theo khu vực
                </div>

                {[
                  { slug: 'bidoup-loop', title: 'Rừng già Bidoup', days: 'Rừng rêu' },
                  { slug: 'pink-grass', title: 'Đồi Cỏ Hồng & Suối Vàng', days: 'Săn mây' },
                  { slug: 'cau-dat', title: 'Đồi chè Cầu Đất & Tuabin', days: 'View đẹp' },
                  { slug: 'pinhatt-summit', title: 'Đỉnh Pinhatt & Hồ Tuyền Lâm', days: 'Hoàng hôn' }
                ].map(item => (
                  <button
                    key={item.slug}
                    type="button"
                    onClick={(e) => handleNavClick(e, 'expedition-detail', item.slug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '7px 14px',
                      textAlign: 'left',
                      background: currentView === 'expedition-detail' && detailSlug === item.slug ? 'rgba(224, 98, 68, 0.15)' : 'transparent',
                      border: 'none',
                      color: currentView === 'expedition-detail' && detailSlug === item.slug ? 'var(--coral)' : '#f3ede2',
                      fontSize: 13,
                      cursor: 'pointer',
                      width: '100%',
                      fontFamily: 'inherit'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = currentView === 'expedition-detail' && detailSlug === item.slug ? 'rgba(224, 98, 68, 0.15)' : 'transparent'}
                  >
                    <span>{item.title}</span>
                    <span style={{ fontSize: 11, opacity: 0.65 }}>{item.days}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <a 
            href="#fleet" 
            onClick={(e) => handleNavClick(e, '#fleet')}
          >
            Xe máy &amp; Ô tô
          </a>
          <a 
            href="#prices" 
            onClick={(e) => handleNavClick(e, '#prices')}
          >
            Món ngon Đà Lạt
          </a>
          <a 
            href="#route" 
            onClick={(e) => handleNavClick(e, '#route')}
          >
            Lịch trình tự túc
          </a>
          <a 
            href="#seasons" 
            onClick={(e) => handleNavClick(e, '#seasons')}
          >
            4 Mùa hoa &amp; Mây
          </a>
          <a 
            href="#guides" 
            onClick={(e) => handleNavClick(e, '#guides')}
          >
            Người Đà Lạt
          </a>
          <a 
            href="#guide" 
            className={currentView === 'guide' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'guide')}
            style={currentView === 'guide' ? { color: 'var(--coral)', fontWeight: 700 } : {}}
          >
            Bí kíp vi vu
          </a>
          <a 
            href="#lookup" 
            className={currentView === 'lookup' ? 'active' : ''}
            onClick={(e) => handleNavClick(e, 'lookup')}
            style={currentView === 'lookup' ? { color: 'var(--coral)', fontWeight: 700 } : {}}
          >
            Tra cứu chuyến đi
          </a>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginLeft: 'auto' }}>
          <button 
            type="button" 
            className="btn" 
            onClick={() => onOpenBooking()}
            style={{ minHeight: 42, padding: '0 18px', fontSize: 14 }}
          >
            <Sparkles size={14} />
            <span>Gợi Ý Lịch Trình</span>
          </button>

          <button
            type="button"
            className="btn btn--ghost"
            onClick={onOpenAdmin}
            title="Trang quản trị nội dung Ghiền Đà Lạt"
            style={{ minHeight: 42, padding: '0 12px', fontSize: 13, gap: 6, position: 'relative' }}
          >
            <ShieldCheck size={16} />
            <span>Quản Trị Admin</span>
            {pendingCount > 0 && (
              <span 
                style={{ 
                  background: '#f59e0b', 
                  color: '#78350f', 
                  borderRadius: '999px', 
                  padding: '2px 6px', 
                  fontSize: 11, 
                  fontWeight: 800
                }}
              >
                {pendingCount}
              </span>
            )}
          </button>

          <button 
            className="icon-btn" 
            type="button" 
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            style={{ padding: 6 }}
          >
            {menuOpen ? <X size={26} /> : <MenuIcon size={26} />}
          </button>
        </div>
      </header>

      {/* Mobile / Fullscreen Drawer Menu */}
      <div 
        className={`menu ${menuOpen ? 'is-open' : ''}`}
        style={{ overflowY: 'auto' }}
      >
        <nav aria-label="Menu">
          <a href="#hero" onClick={(e) => handleMobileNavClick(e, '#hero')}>
            Trang chủ
          </a>
          <a href="#expeditions" onClick={(e) => handleMobileNavClick(e, '#expeditions')}>
            Hành trình
          </a>
          <a 
            href="#expeditions" 
            onClick={(e) => handleMobileNavClick(e, '#expeditions')}
          >
            Tọa độ Check-in
          </a>
          <a href="#fleet" onClick={(e) => handleMobileNavClick(e, '#fleet')}>
            Xe máy &amp; Ô tô vi vu
          </a>
          <a href="#prices" onClick={(e) => handleMobileNavClick(e, '#prices')}>
            Bản đồ món ngon
          </a>
          <a href="#route" onClick={(e) => handleMobileNavClick(e, '#route')}>
            Lịch trình tự túc
          </a>
          <a href="#seasons" onClick={(e) => handleMobileNavClick(e, '#seasons')}>
            4 Mùa hoa &amp; Săn mây
          </a>
          <a href="#guides" onClick={(e) => handleMobileNavClick(e, '#guides')}>
            Người Đà Lạt
          </a>
          <a 
            href="#guide" 
            onClick={(e) => handleMobileNavClick(e, 'guide')}
            style={currentView === 'guide' ? { color: 'var(--coral)' } : {}}
          >
            Bí kíp vi vu bỏ túi
          </a>
          <a 
            href="#lookup" 
            onClick={(e) => handleMobileNavClick(e, 'lookup')}
            style={currentView === 'lookup' ? { color: 'var(--coral)' } : {}}
          >
            Lịch trình của tôi
          </a>
        </nav>

        {/* Quick Mobile Action Buttons */}
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 10 }}>
          <button 
            type="button" 
            className="btn"
            onClick={() => { setMenuOpen(false); onOpenBooking(); }}
            style={{ flex: 1, minHeight: 46 }}
          >
            <Sparkles size={16} /> Gợi Ý Lịch Trình
          </button>

          <button 
            type="button" 
            className="btn btn--ghost"
            onClick={() => { setMenuOpen(false); onOpenAdmin(); }}
            style={{ color: 'var(--sand)', borderColor: 'var(--sand)', minHeight: 46 }}
          >
            <ShieldCheck size={16} /> Quản Trị Admin
          </button>
        </div>

        <div className="menu-foot">
          <a href="mailto:banbientap@ghiendalat.vn">banbientap@ghiendalat.vn</a>
          <a href="tel:+842633828999">+84 (0) 263 3828 999</a>
          <span>Hội Quán Ghiền Đà Lạt — Mở cửa đón bạn bè 7:30–21:30</span>
        </div>
      </div>
    </>
  );
}
