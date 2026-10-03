import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Manifesto from './components/Manifesto';
import Expeditions from './components/Expeditions';
import Fleet from './components/Fleet';
import RouteItinerary from './components/RouteItinerary';
import SeasonsChart from './components/SeasonsChart';
import Guides from './components/Guides';
import Stories from './components/Stories';
import Gallery from './components/Gallery';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import BookingModal from './components/BookingModal';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

// New Pages
import ExpeditionDetailPage from './pages/ExpeditionDetailPage';
import GuidePage from './pages/GuidePage';
import LookupPage from './pages/LookupPage';
import AdminPage from './pages/AdminPage';

import { initAnimations, scrollToTarget } from './utils/initAnimations';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const initialExpeditions = [
  {
    id: 1,
    slug: 'cau-dat',
    title: 'Đồi chè Cầu Đất',
    distance: '23 km',
    days: 1,
    terrain: 'Đồi chè & Tuabin gió',
    convoy: 'Xe máy & Mọi loại ô tô',
    price_shared: 0,
    price_private: 0,
    description: 'Thiên đường săn biển mây sáng sớm trên những luống chè cổ thụ xanh ngát, ngắm cánh đồng điện gió tuabin khổng lồ và thưởng thức cà phê nóng.',
    image_url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80',
    tone: 'tone-sky',
    seats_total: 10,
    seats_available: 8,
    next_date: 'Mở cửa tự do'
  },
  {
    id: 2,
    slug: 'ho-tuyen-lam',
    title: 'Hồ Tuyền Lâm & Suối Tía',
    distance: '6 km',
    days: 1,
    terrain: 'Mặt hồ sương & Rừng thông',
    convoy: 'Xe máy & Ô tô gia đình',
    price_shared: 0,
    price_private: 0,
    description: 'Ốc đảo bình yên bao bọc bởi ngút ngàn rừng thông ba lá. Trải nghiệm chèo SUP đón bình minh trên Suối Tía huyền ảo và tản bộ thư thái ven hồ.',
    image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80',
    tone: 'default',
    seats_total: 12,
    seats_available: 10,
    next_date: 'Mở cửa tự do'
  },
  {
    id: 3,
    slug: 'pink-grass',
    title: 'Đồi Cỏ Hồng & Suối Vàng',
    distance: '18 km',
    days: 1,
    terrain: 'Thảo nguyên cỏ hồng & Ven hồ',
    convoy: 'Xe máy phượt & Ô tô gầm cao',
    price_shared: 0,
    price_private: 0,
    description: 'Thung lũng Đan Kia - Suối Vàng với thảo nguyên cỏ hồng ngút ngàn lúc bình minh phủ sương tuyết, cắm trại đón sương mai bên Cây Thông Cô Đơn.',
    image_url: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80',
    tone: 'tone-moss',
    seats_total: 8,
    seats_available: 6,
    next_date: 'Tháng 10 – Tháng 12'
  },
  {
    id: 4,
    slug: 'da-phu',
    title: 'Đồi Đa Phú Săn Mây',
    distance: '12 km',
    days: 1,
    terrain: 'Đồi thông cao & Biển mây 360°',
    convoy: 'Xe máy dốc sỏi & Trekking',
    price_shared: 0,
    price_private: 0,
    description: 'Tọa độ săn mây tự túc lý tưởng bậc nhất Đà Lạt với tầm nhìn panorama trọn vẹn thung lũng sương, cắm trại lều nóc đón ánh bình minh đầu tiên.',
    image_url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80',
    tone: 'tone-coral',
    seats_total: 12,
    seats_available: 10,
    next_date: '04:45 – 06:30 sáng'
  },
  {
    id: 5,
    slug: 'bidoup-loop',
    title: 'Rừng già Bidoup Núi Bà',
    distance: '45 km',
    days: 2,
    terrain: 'Rừng rêu cổ & Sương mù',
    convoy: 'Xe 4x4 & Hướng dẫn viên rừng',
    price_shared: 0,
    price_private: 0,
    description: 'Vương quốc rêu cổ thụ ma mị, hoa lan rừng đặc hữu và không khí trong lành ở độ cao trên 2.000m, nơi con đường nhựa chấm dứt để thiên nhiên cất lời.',
    image_url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80',
    tone: 'default',
    seats_total: 12,
    seats_available: 6,
    next_date: 'Đăng ký kiểm lâm'
  }
];

const initialFleet = [
  {
    id: 1,
    name: 'Jeep Cổ',
    type: 'Willys A2 mui trần, 1974',
    seats: '3 khách',
    range: '450 km',
    sleeps: '2 người trên lều nóc',
    rebuilt: 2020,
    image_url: 'https://images.unsplash.com/photo-1647267198458-e38cadde4fec?auto=format&fit=crop&w=1600&q=75'
  },
  {
    id: 2,
    name: 'Chiến Mã',
    type: 'UAZ 469 Hunter, 1985',
    seats: '4 khách',
    range: '650 km',
    sleeps: '2 trên xe, 2 lều đất',
    rebuilt: 2022,
    image_url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1600&q=75'
  },
  {
    id: 3,
    name: 'FJ Cruiser',
    type: 'Land Cruiser FJ40, 1981',
    seats: '4 khách',
    range: '700 km',
    sleeps: 'Lều nóc ARB đôi',
    rebuilt: 2023,
    image_url: 'https://images.unsplash.com/photo-1519443933981-c665c4a62ad4?auto=format&fit=crop&w=1600&q=75'
  },
  {
    id: 4,
    name: 'Defender',
    type: 'Defender 110 Hậu Cần, 1993',
    seats: 'Nước sạch, bếp lửa, tời cứu hộ',
    range: '950 km',
    sleeps: 'Thợ máy & đầu bếp',
    rebuilt: 2019,
    image_url: 'https://images.unsplash.com/photo-1564135624576-c5c88640f235?auto=format&fit=crop&w=1600&q=75'
  }
];

export default function App() {
  const [expeditions, setExpeditions] = useState(initialExpeditions);
  const [fleet, setFleet] = useState(initialFleet);
  const [selectedPlan, setSelectedPlan] = useState('shared'); // 'shared' | 'private'

  // Page Routing State
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'expedition-detail' | 'guide' | 'lookup'
  const [detailSlug, setDetailSlug] = useState('bidoup-loop');
  const [targetSection, setTargetSection] = useState(null);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [targetExpedition, setTargetExpedition] = useState(null);
  const [adminOpen, setAdminOpen] = useState(false);

  const fetchBackendData = async () => {
    try {
      const [resExp, resFleet] = await Promise.all([
        fetch('/api/expeditions'),
        fetch('/api/fleet')
      ]);

      if (resExp.ok) {
        const dataExp = await resExp.json();
        if (Array.isArray(dataExp) && dataExp.length > 0) {
          setExpeditions(dataExp);
        }
      }
      if (resFleet.ok) {
        const dataFleet = await resFleet.json();
        if (Array.isArray(dataFleet) && dataFleet.length > 0) {
          setFleet(dataFleet);
        }
      }
    } catch (err) {
      // Keep robust initial fallbacks
      console.log('Running in local/static mode:', err);
    }
  };

  useEffect(() => {
    fetchBackendData();
  }, []);

  // Initialize Home animations (GSAP, Lenis, ScrollTrigger) when home is mounted
  useEffect(() => {
    if (currentView === 'home') {
      let cleanup = null;
      const timer = setTimeout(() => {
        cleanup = initAnimations();
      }, 150);

      return () => {
        if (timer) clearTimeout(timer);
        if (cleanup) cleanup();
      };
    }
  }, [currentView, expeditions, fleet]);

  // Handle navigating from other views back to a specific section on Home
  useEffect(() => {
    if (currentView === 'home' && targetSection) {
      const timer = setTimeout(() => {
        scrollToTarget(targetSection);
        setTargetSection(null);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [currentView, targetSection]);

  const handleOpenBooking = (expedition = null, plan = selectedPlan) => {
    setTargetExpedition(expedition || expeditions[0]);
    setSelectedPlan(plan);
    setBookingModalOpen(true);
  };

  const handleNavigateDetail = (slug) => {
    try {
      if (window.gsap && ScrollTrigger) {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    } catch (_) {}
    setDetailSlug(slug);
    setCurrentView('expedition-detail');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNavigateSection = (selector) => {
    if (currentView !== 'home') {
      setTargetSection(selector);
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      scrollToTarget(selector);
    }
  };

  const handleViewPage = (pageName, extraSlug = null) => {
    try {
      if (window.gsap && ScrollTrigger) {
        ScrollTrigger.getAll().forEach(t => t.kill());
      }
    } catch (_) {}

    if (extraSlug) {
      setDetailSlug(extraSlug);
    }

    if (pageName === 'home') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      setCurrentView(pageName);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  if (currentView === 'admin') {
    return (
      <AdminPage 
        expeditions={expeditions}
        onUpdateExpeditions={(updated) => setExpeditions(updated)}
        onBack={() => handleViewPage('home')}
        onNavigateDetail={(slug) => handleViewPage('expedition-detail', slug)}
      />
    );
  }

  return (
    <div className="site-wrapper">
      <Header 
        onNavigatePage={handleViewPage}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => handleViewPage('admin')}
        onViewPage={handleViewPage}
        onNavigateSection={handleNavigateSection}
        onNavigateDetail={handleNavigateDetail}
        currentView={currentView}
        detailSlug={detailSlug}
        expeditions={expeditions}
      />

      <main>
        {currentView === 'home' && (
          <>
            <Hero 
              expeditions={expeditions} 
              onOpenBooking={() => handleOpenBooking()}
            />

            <Manifesto />

            <Expeditions 
              expeditions={expeditions} 
              onOpenBooking={handleOpenBooking}
              onNavigateDetail={handleNavigateDetail}
              selectedPlan={selectedPlan}
            />

            <Fleet fleet={fleet} />

            <RouteItinerary />

            <SeasonsChart />

            <Guides />

            <Stories />

            <Gallery />

            <Pricing 
              selectedPlan={selectedPlan}
              setSelectedPlan={setSelectedPlan}
              onOpenBooking={handleOpenBooking}
              expeditions={expeditions}
            />

            <FAQ />

            <Contact onOpenBooking={() => handleOpenBooking()} />
          </>
        )}

        {currentView === 'expedition-detail' && (
          <ExpeditionDetailPage 
            slug={detailSlug}
            expeditions={expeditions}
            onBack={() => handleViewPage('home')}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentView === 'guide' && (
          <GuidePage 
            onBack={() => handleViewPage('home')}
            onOpenBooking={() => handleOpenBooking()}
          />
        )}

        {currentView === 'lookup' && (
          <LookupPage 
            onBack={() => handleViewPage('home')}
          />
        )}
      </main>

      <Footer 
        onNavigateSection={handleNavigateSection}
        onOpenAdmin={() => handleViewPage('admin')}
      />

      {/* Reservation Booking Modal */}
      <BookingModal 
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        initialExpedition={targetExpedition}
        initialPlan={selectedPlan}
        expeditions={expeditions}
        onBookingSuccess={() => fetchBackendData()}
      />

      {/* Admin Dashboard Modal */}
      <AdminDashboard 
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
      />
    </div>
  );
}
