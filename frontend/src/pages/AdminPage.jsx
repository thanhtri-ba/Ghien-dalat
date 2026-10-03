import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, LayoutDashboard, MapPin, Utensils, Mail, Image, 
  Settings, Plus, Trash2, Edit3, CheckCircle2, AlertCircle, 
  Search, ArrowLeft, ExternalLink, RefreshCw, Copy, Check, Eye, Filter, Car, Bike, Sparkles
} from 'lucide-react';

const REAL_DALAT_PHOTOS = [
  { name: 'Đồi chè Cầu Đất & Tuabin gió', url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80', cat: 'Săn mây' },
  { name: 'Hồ Tuyền Lâm mờ sương', url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=80', cat: 'Mặt hồ & Rừng thông' },
  { name: 'Đồi Cỏ Hồng & Cây Thông Cô Đơn', url: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1600&q=80', cat: 'Cắm trại' },
  { name: 'Đồi Đa Phú đón biển mây 360°', url: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1600&q=80', cat: 'Săn mây' },
  { name: 'Rừng già Bidoup cổ thụ & rêu xanh', url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1600&q=80', cat: 'Rừng nguyên sinh' },
  { name: 'Rừng thông cao nguyên sương lạnh', url: 'https://images.unsplash.com/photo-1518457607834-6e8d80c183c5?auto=format&fit=crop&w=1600&q=80', cat: 'Rừng thông' },
  { name: 'Hoàng hôn Xóm Lèo thung lũng đèn', url: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=80', cat: 'Hoàng hôn' },
  { name: 'Bánh mì xíu mại nóng giòn', url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=1600&q=80', cat: 'Ẩm thực' },
  { name: 'Lẩu gà lá é sôi sùng sục', url: 'https://images.unsplash.com/photo-1547928576-a4a33237cbc3?auto=format&fit=crop&w=1600&q=80', cat: 'Ẩm thực' },
  { name: 'Cà phê phin lắng đọng chiều mưa', url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1600&q=80', cat: 'Cà phê' }
];

const INITIAL_FOOD_ITEMS = [
  { id: 1, name: 'Lẩu gà lá é Tao Ngộ', cat: 'Lẩu đêm lạnh', address: 'Số 5 đường 3 Tháng 4, Phường 3', price: '200.000 – 350.000 ₫', vehicle: 'Mặt đường lớn, ô tô 4-7 chỗ và xe máy đỗ thoải mái', rating: '4.9 ★', votes: 1420 },
  { id: 2, name: 'Lẩu bò Ba Toa Quán Gỗ', cat: 'Lẩu đêm lạnh', address: 'Hẻm 1 Hoàng Diệu (sâu trong hẻm gỗ)', price: '250.000 – 400.000 ₫', vehicle: 'Hẻm hẹp chỉ xe máy vào được, ô tô gửi đầu đường Hoàng Diệu', rating: '4.8 ★', votes: 1980 },
  { id: 3, name: 'Bánh mì xíu mại chấm Hoàng Diệu', cat: 'Món sáng ấm bụng', address: 'Số 26 Hoàng Diệu, Phường 5', price: '20.000 – 35.000 ₫', vehicle: 'Xe máy đỗ trước cửa quán, ô tô đỗ tạm phía đối diện', rating: '4.9 ★', votes: 2310 },
  { id: 4, name: 'Bánh căn cô Lệ Yersin', cat: 'Món sáng ấm bụng', address: 'Hẻm 27/44 Yersin, Phường 10', price: '30.000 – 50.000 ₫', vehicle: 'Hẻm dốc sâu, khuyến nghị đi xe máy', rating: '4.7 ★', votes: 890 },
  { id: 5, name: 'Kem bơ Thanh Thảo', cat: 'Tráng miệng & Ăn vặt', address: 'Số 76 Nguyễn Văn Trỗi', price: '25.000 – 40.000 ₫', vehicle: 'Đường phố trung tâm, xe máy đỗ vỉa hè', rating: '4.8 ★', votes: 1650 },
  { id: 6, name: 'Cafe Tùng (Khu Hòa Bình)', cat: 'Cafe view hoài niệm', address: 'Số 6 Khu Hòa Bình, Phường 1', price: '30.000 – 55.000 ₫', vehicle: 'Khu phố đi bộ, đi dạo bộ hoặc gửi xe máy bến chợ', rating: '4.9 ★', votes: 1120 }
];

export default function AdminPage({ expeditions = [], onUpdateExpeditions, onBack, onNavigateDetail }) {
  const [activeTab, setActiveTab] = useState('destinations'); // 'overview' | 'destinations' | 'foods' | 'submissions' | 'photos' | 'settings'
  const [spots, setSpots] = useState(expeditions);
  const [foods, setFoods] = useState(INITIAL_FOOD_ITEMS);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [toast, setToast] = useState(null);

  // New Spot Modal State
  const [showAddSpotModal, setShowAddSpotModal] = useState(false);
  const [editingSpot, setEditingSpot] = useState(null);
  const [spotForm, setSpotForm] = useState({
    title: '',
    slug: '',
    distance: '15 km',
    days: 1,
    terrain: 'Đồi thông & Biển mây',
    convoy: 'Xe máy & Ô tô',
    description: '',
    image_url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80',
    tone: 'tone-sky'
  });

  // New Food Modal State
  const [showAddFoodModal, setShowAddFoodModal] = useState(false);
  const [foodForm, setFoodForm] = useState({
    name: '',
    cat: 'Lẩu đêm lạnh',
    address: '',
    price: '150.000 – 300.000 ₫',
    vehicle: 'Xe máy & Ô tô đỗ thuận tiện',
    rating: '5.0 ★'
  });

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const fetchSubmissions = async () => {
    try {
      const res = await fetch('/api/contacts');
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      }
    } catch (_) {}
  };

  useEffect(() => {
    setSpots(expeditions);
    fetchSubmissions();
  }, [expeditions]);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    showToastMsg('Đã sao chép link ảnh chất lượng cao!');
    setTimeout(() => setCopiedUrl(null), 2500);
  };

  // SPOT HANDLERS
  const handleSaveSpot = async (e) => {
    e.preventDefault();
    if (!spotForm.title) return;

    if (editingSpot) {
      // Update
      const updated = spots.map(s => s.id === editingSpot.id ? { ...s, ...spotForm } : s);
      setSpots(updated);
      if (onUpdateExpeditions) onUpdateExpeditions(updated);
      try {
        await fetch(`/api/expeditions/${editingSpot.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(spotForm)
        });
      } catch (_) {}
      showToastMsg(`Đã cập nhật tọa độ "${spotForm.title}" thành công!`);
    } else {
      // Create new
      const newSpot = {
        id: Date.now(),
        slug: spotForm.slug || spotForm.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        ...spotForm
      };
      const updated = [newSpot, ...spots];
      setSpots(updated);
      if (onUpdateExpeditions) onUpdateExpeditions(updated);
      try {
        await fetch('/api/expeditions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(spotForm)
        });
      } catch (_) {}
      showToastMsg(`Đã thêm tọa độ mới "${spotForm.title}" thành công!`);
    }

    setShowAddSpotModal(false);
    setEditingSpot(null);
    setSpotForm({
      title: '',
      slug: '',
      distance: '15 km',
      days: 1,
      terrain: 'Đồi thông & Biển mây',
      convoy: 'Xe máy & Ô tô',
      description: '',
      image_url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80',
      tone: 'tone-sky'
    });
  };

  const handleDeleteSpot = async (id, title) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa tọa độ "${title}" khỏi danh sách?`)) return;
    const updated = spots.filter(s => s.id !== id);
    setSpots(updated);
    if (onUpdateExpeditions) onUpdateExpeditions(updated);
    try {
      await fetch(`/api/expeditions/${id}`, { method: 'DELETE' });
    } catch (_) {}
    showToastMsg(`Đã xóa tọa độ "${title}"`);
  };

  const handleOpenEditSpot = (spot) => {
    setEditingSpot(spot);
    setSpotForm({
      title: spot.title,
      slug: spot.slug,
      distance: spot.distance || '15 km',
      days: spot.days || 1,
      terrain: spot.terrain || 'Đồi núi',
      convoy: spot.convoy || 'Xe máy & Ô tô',
      description: spot.description || '',
      image_url: spot.image_url,
      tone: spot.tone || 'default'
    });
    setShowAddSpotModal(true);
  };

  // FOOD HANDLERS
  const handleSaveFood = (e) => {
    e.preventDefault();
    if (!foodForm.name) return;
    const newFood = {
      id: Date.now(),
      ...foodForm,
      votes: 1
    };
    setFoods([newFood, ...foods]);
    setShowAddFoodModal(false);
    setFoodForm({
      name: '',
      cat: 'Lẩu đêm lạnh',
      address: '',
      price: '150.000 – 300.000 ₫',
      vehicle: 'Xe máy & Ô tô đỗ thuận tiện',
      rating: '5.0 ★'
    });
    showToastMsg(`Đã thêm quán "${newFood.name}" vào bản đồ ẩm thực!`);
  };

  const handleDeleteFood = (id, name) => {
    if (!window.confirm(`Xóa quán "${name}"?`)) return;
    setFoods(foods.filter(f => f.id !== id));
    showToastMsg(`Đã xóa quán "${name}"`);
  };

  // SUBMISSION HANDLERS
  const handleDeleteSubmission = async (id) => {
    setSubmissions(submissions.filter(s => s.id !== id));
    try {
      await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
    } catch (_) {}
    showToastMsg('Đã xóa đóng góp thành viên');
  };

  const filteredSpots = spots.filter(s => 
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.terrain?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFoods = foods.filter(f => 
    f.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.cat?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: '#f4f5f7', minHeight: '100vh', color: '#1e293b', display: 'flex', flexDirection: 'column', fontFamily: 'var(--f-text)' }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{ position: 'fixed', top: 20, right: 24, zIndex: 9999, background: 'var(--ink)', color: 'white', padding: '12px 20px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.2)', fontSize: 14 }}>
          <CheckCircle2 size={18} style={{ color: '#10b981' }} />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header Navbar */}
      <header style={{ background: 'var(--moss)', color: 'var(--sand)', padding: '14px var(--m)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid var(--coral)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            type="button"
            class="btn btn--ghost"
            onClick={onBack}
            style={{ color: 'var(--sand)', borderColor: 'var(--sand)', minHeight: 38, padding: '0 14px', fontSize: 13, gap: 6 }}
          >
            <ArrowLeft size={16} /> Quay Lại Trang Web
          </button>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 6, background: 'var(--coral)', display: 'grid', placeItems: 'center', color: 'var(--ink)', fontWeight: 800 }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontFamily: 'Dancing Script', fontSize: 20, fontWeight: 700, color: 'var(--coral)' }}>Ghiền</span>
                <span style={{ fontFamily: 'var(--f-display)', fontSize: 14, fontWeight: 800, letterSpacing: '0.1em', color: 'var(--sky)' }}>ĐÀ LẠT ADMIN</span>
              </div>
              <span style={{ fontSize: 11, opacity: 0.7 }}>Hệ thống quản trị nội dung &amp; điểm đến du lịch</span>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.08)', padding: '6px 14px', borderRadius: 20, fontSize: 12 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981', display: 'inline-block' }}></span>
            <span>Đà Lạt 16°C • Sương nhẹ</span>
          </div>

          <button
            type="button"
            class="btn"
            onClick={() => onBack()}
            style={{ minHeight: 38, padding: '0 16px', fontSize: 13, gap: 6 }}
          >
            <ExternalLink size={14} /> Xem Trang Người Dùng
          </button>
        </div>
      </header>

      {/* Main Admin Body */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left Sidebar Navigation */}
        <aside style={{ width: 260, background: 'white', borderRight: '1px solid #e2e8f0', padding: 20, display: 'flex', flexDirection: 'column', gap: 6, flexShrink: 0 }}>
          <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#94a3b8', fontWeight: 700, marginBottom: 8, paddingLeft: 8 }}>
            Phân Hệ Quản Trị
          </span>

          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 6, border: 'none', background: activeTab === 'overview' ? 'color-mix(in oklab, var(--sea) 12%, transparent)' : 'transparent', color: activeTab === 'overview' ? 'var(--sea)' : '#475569', fontWeight: activeTab === 'overview' ? 700 : 500, cursor: 'pointer', textAlign: 'left', fontSize: 14 }}
          >
            <LayoutDashboard size={18} />
            <span>Tổng Quan &amp; Số Liệu</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('destinations')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 6, border: 'none', background: activeTab === 'destinations' ? 'color-mix(in oklab, var(--sea) 12%, transparent)' : 'transparent', color: activeTab === 'destinations' ? 'var(--sea)' : '#475569', fontWeight: activeTab === 'destinations' ? 700 : 500, cursor: 'pointer', textAlign: 'left', fontSize: 14 }}
          >
            <MapPin size={18} />
            <div style={{ flex: 1 }}>Tọa Độ Check-in</div>
            <span style={{ background: '#e2e8f0', fontSize: 11, padding: '2px 6px', borderRadius: 10, fontWeight: 700 }}>{spots.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('foods')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 6, border: 'none', background: activeTab === 'foods' ? 'color-mix(in oklab, var(--sea) 12%, transparent)' : 'transparent', color: activeTab === 'foods' ? 'var(--sea)' : '#475569', fontWeight: activeTab === 'foods' ? 700 : 500, cursor: 'pointer', textAlign: 'left', fontSize: 14 }}
          >
            <Utensils size={18} />
            <div style={{ flex: 1 }}>Ẩm Thực &amp; Quán Ruột</div>
            <span style={{ background: '#e2e8f0', fontSize: 11, padding: '2px 6px', borderRadius: 10, fontWeight: 700 }}>{foods.length}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('submissions')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 6, border: 'none', background: activeTab === 'submissions' ? 'color-mix(in oklab, var(--sea) 12%, transparent)' : 'transparent', color: activeTab === 'submissions' ? 'var(--sea)' : '#475569', fontWeight: activeTab === 'submissions' ? 700 : 500, cursor: 'pointer', textAlign: 'left', fontSize: 14 }}
          >
            <Mail size={18} />
            <div style={{ flex: 1 }}>Đóng Góp Thành Viên</div>
            <span style={{ background: 'var(--coral)', color: 'white', fontSize: 11, padding: '2px 6px', borderRadius: 10, fontWeight: 700 }}>{submissions.length || 3}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('photos')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 6, border: 'none', background: activeTab === 'photos' ? 'color-mix(in oklab, var(--sea) 12%, transparent)' : 'transparent', color: activeTab === 'photos' ? 'var(--sea)' : '#475569', fontWeight: activeTab === 'photos' ? 700 : 500, cursor: 'pointer', textAlign: 'left', fontSize: 14 }}
          >
            <Image size={18} />
            <span>Kho Ảnh Thật Đà Lạt</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 6, border: 'none', background: activeTab === 'settings' ? 'color-mix(in oklab, var(--sea) 12%, transparent)' : 'transparent', color: activeTab === 'settings' ? 'var(--sea)' : '#475569', fontWeight: activeTab === 'settings' ? 700 : 500, cursor: 'pointer', textAlign: 'left', fontSize: 14 }}
          >
            <Settings size={18} />
            <span>Cài Đặt Cổng Thông Tin</span>
          </button>

          {/* Quick Info Box in Sidebar */}
          <div style={{ marginTop: 'auto', background: 'var(--paper)', padding: 14, borderRadius: 6, fontSize: 12, border: '1px solid #cbd5e1' }}>
            <strong style={{ color: 'var(--sea)', display: 'block', marginBottom: 4 }}>💡 Ban Biên Tập Ghiền Đà Lạt</strong>
            <p style={{ margin: 0, color: '#64748b' }}>
              Mọi tọa độ trên cổng thông tin được cập nhật ảnh thật, kiểm duyệt địa hình và phân loại phương tiện xe máy / ô tô chính xác.
            </p>
          </div>
        </aside>

        {/* Right Main Content Area */}
        <main style={{ flex: 1, padding: '28px 36px', overflowY: 'auto' }}>
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div style={{ marginBottom: 24 }}>
                <h1 style={{ fontSize: 26, fontWeight: 700, margin: '0 0 6px', color: 'var(--ink)' }}>Bảng Điều Khiển Cổng Thông Tin Ghiền Đà Lạt</h1>
                <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>Thống kê dữ liệu tọa độ check-in, ẩm thực và phản hồi từ cộng đồng phượt tự túc.</p>
              </div>

              {/* 4 Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 18, marginBottom: 28 }}>
                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Tọa Độ Đang Hiển Thị</span>
                    <MapPin size={20} style={{ color: 'var(--sea)' }} />
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)' }}>{spots.length} địa điểm</div>
                  <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>● 100% Đã gán ảnh thật &amp; lưu ý xe</span>
                </div>

                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Quán Ăn &amp; Cafe Ruột</span>
                    <Utensils size={20} style={{ color: 'var(--coral)' }} />
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)' }}>{foods.length} quán</div>
                  <span style={{ fontSize: 12, color: '#64748b' }}>Lẩu gà, lẩu bò, bánh mì xíu mại, cafe</span>
                </div>

                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Đóng Góp Từ Bạn Đọc</span>
                    <Mail size={20} style={{ color: '#0ea5e9' }} />
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)' }}>{submissions.length || 3} yêu cầu</div>
                  <span style={{ fontSize: 12, color: 'var(--coral)', fontWeight: 600 }}>Cần thẩm định thực tế</span>
                </div>

                <div style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#64748b' }}>Lượt Tạo Lịch Trình Tự Túc</span>
                    <Sparkles size={20} style={{ color: '#f59e0b' }} />
                  </div>
                  <div style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)' }}>1.840 lượt</div>
                  <span style={{ fontSize: 12, color: '#10b981', fontWeight: 600 }}>↑ 28% so với tuần trước</span>
                </div>
              </div>

              {/* Vehicle breakdown info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 20 }}>
                <div style={{ background: 'white', padding: 22, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 16px' }}>Thống Kê Phương Tiện Được Du Khách Lựa Chọn</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                        <span>🛵 Xe Máy (Luồn dốc, hẻm, săn mây)</span>
                        <strong>64%</strong>
                      </div>
                      <div style={{ height: 8, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '64%', height: '100%', background: 'var(--coral)' }}></div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                        <span>🚗 Xe Hơi / Ô tô (Gia đình, ấm áp)</span>
                        <strong>28%</strong>
                      </div>
                      <div style={{ height: 8, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '28%', height: '100%', background: 'var(--sea)' }}></div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4 }}>
                        <span>⛺ Xe 4x4 &amp; Cắm Trại Rừng Sâu</span>
                        <strong>8%</strong>
                      </div>
                      <div style={{ height: 8, background: '#e2e8f0', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '8%', height: '100%', background: '#f59e0b' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ background: 'white', padding: 22, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 12px' }}>Trạng Thái Mùa Du Lịch Đà Lạt</h3>
                  <div style={{ padding: 14, background: 'var(--paper)', borderLeft: '4px solid var(--coral)', marginBottom: 12, fontSize: 13 }}>
                    🌸 <strong>Mùa hoa Dã Quỳ &amp; Đồi Cỏ Hồng:</strong> Sương ban mai dày, nhiệt độ sáng sớm 14°C, thời tiết khô ráo rất đẹp để săn mây Đa Phú và Cầu Đất.
                  </div>
                  <button 
                    type="button" 
                    class="btn btn--ink"
                    onClick={() => setActiveTab('destinations')}
                    style={{ width: '100%', minHeight: 40, fontSize: 13 }}
                  >
                    Xem &amp; Thêm Tọa Độ Mới →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DESTINATIONS / SPOTS */}
          {activeTab === 'destinations' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>Quản Lý Tọa Độ Check-in Đà Lạt</h1>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Toàn bộ điểm đến có ảnh thật, thông số khoảng cách và ghi chú phương tiện di chuyển.</p>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <div style={{ position: 'relative' }}>
                    <Search size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input
                      type="text"
                      placeholder="Tìm tọa độ..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ padding: '8px 12px 8px 36px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13, width: 200 }}
                    />
                  </div>
                  <button
                    type="button"
                    class="btn btn--ink"
                    onClick={() => {
                      setEditingSpot(null);
                      setSpotForm({
                        title: '',
                        slug: '',
                        distance: '15 km',
                        days: 1,
                        terrain: 'Đồi thông & Biển mây',
                        convoy: 'Xe máy & Ô tô',
                        description: '',
                        image_url: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1600&q=80',
                        tone: 'tone-sky'
                      });
                      setShowAddSpotModal(true);
                    }}
                    style={{ minHeight: 38, padding: '0 16px', fontSize: 13, gap: 6 }}
                  >
                    <Plus size={16} /> Thêm Tọa Độ Mới
                  </button>
                </div>
              </div>

              {/* Spots Table */}
              <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13.5 }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '12px 16px' }}>Ảnh Thật</th>
                      <th style={{ padding: '12px 16px' }}>Tên Điểm Đến</th>
                      <th style={{ padding: '12px 16px' }}>Khoảng Cách</th>
                      <th style={{ padding: '12px 16px' }}>Địa Hình / Điểm Nhấn</th>
                      <th style={{ padding: '12px 16px' }}>Phương Tiện</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSpots.map((spot) => (
                      <tr key={spot.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 16px', width: 90 }}>
                          <img 
                            src={spot.image_url} 
                            alt={spot.title}
                            style={{ width: 70, height: 48, objectFit: 'cover', borderRadius: 4, background: '#eee' }}
                          />
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <strong style={{ color: 'var(--sea)', fontSize: 14 }}>{spot.title}</strong>
                          <div style={{ fontSize: 12, color: '#64748b', marginTop: 2, maxWidth: 280, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {spot.description}
                          </div>
                        </td>
                        <td style={{ padding: '12px 16px', whiteSpace: 'nowrap' }}>
                          📍 {spot.distance || '10 km'}
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ background: 'color-mix(in oklab, var(--sea) 12%, transparent)', color: 'var(--sea)', padding: '3px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>
                            {spot.terrain}
                          </span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 12 }}>
                          {spot.convoy || 'Xe máy & Ô tô'}
                        </td>
                        <td style={{ padding: '12px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                          <button
                            type="button"
                            onClick={() => {
                              if (onNavigateDetail) onNavigateDetail(spot.slug);
                            }}
                            title="Xem trang chi tiết"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0ea5e9', marginRight: 10 }}
                          >
                            <Eye size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenEditSpot(spot)}
                            title="Chỉnh sửa"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b', marginRight: 10 }}
                          >
                            <Edit3 size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteSpot(spot.id, spot.title)}
                            title="Xóa tọa độ"
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                          >
                            <Trash2 size={17} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: FOODS & CAFES */}
          {activeTab === 'foods' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 14 }}>
                <div>
                  <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>Bản Đồ Ẩm Thực &amp; Quán Ruột</h1>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Danh sách các quán ăn chuẩn vị Đà Lạt, địa chỉ cụ thể và ghi chú đỗ xe.</p>
                </div>

                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    class="btn btn--ink"
                    onClick={() => setShowAddFoodModal(true)}
                    style={{ minHeight: 38, padding: '0 16px', fontSize: 13, gap: 6 }}
                  >
                    <Plus size={16} /> Thêm Quán Ăn Mới
                  </button>
                </div>
              </div>

              {/* Food Table */}
              <div style={{ background: 'white', borderRadius: 8, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13.5 }}>
                  <thead>
                    <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b' }}>
                      <th style={{ padding: '12px 16px' }}>Tên Quán</th>
                      <th style={{ padding: '12px 16px' }}>Phân Loại</th>
                      <th style={{ padding: '12px 16px' }}>Địa Chỉ</th>
                      <th style={{ padding: '12px 16px' }}>Khoảng Giá</th>
                      <th style={{ padding: '12px 16px' }}>Lưu Ý Đỗ Xe (Xe Máy / Ô Tô)</th>
                      <th style={{ padding: '12px 16px', textAlign: 'right' }}>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFoods.map((f) => (
                      <tr key={f.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '12px 16px' }}>
                          <strong style={{ color: 'var(--coral)', fontSize: 14 }}>{f.name}</strong>
                          <span style={{ marginLeft: 6, fontSize: 12, color: '#f59e0b', fontWeight: 700 }}>{f.rating}</span>
                        </td>
                        <td style={{ padding: '12px 16px' }}>
                          <span style={{ background: '#f1f5f9', padding: '3px 8px', borderRadius: 4, fontSize: 12 }}>{f.cat}</span>
                        </td>
                        <td style={{ padding: '12px 16px', fontSize: 13 }}>{f.address}</td>
                        <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600 }}>{f.price}</td>
                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#475569' }}>{f.vehicle}</td>
                        <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteFood(f.id, f.name)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: MEMBER SUBMISSIONS */}
          {activeTab === 'submissions' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>Hộp Thư Đóng Góp Từ Bạn Đọc</h1>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Gợi ý con dốc ngắm hoàng hôn, quán ăn núp hẻm và kinh nghiệm phượt do thành viên gửi về.</p>
              </div>

              {submissions.length === 0 ? (
                <div style={{ background: 'white', padding: 36, textAlign: 'center', borderRadius: 8, border: '1px solid #e2e8f0' }}>
                  <Mail size={40} style={{ color: '#94a3b8', margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: 17, margin: '0 0 6px' }}>Chưa có tin nhắn mới</h3>
                  <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Khi người dùng điền form tại mục "Chia sẻ tọa độ &amp; Quán ruột", tin nhắn sẽ hiển thị tại đây.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {submissions.map((sub) => (
                    <div key={sub.id} style={{ background: 'white', padding: 20, borderRadius: 8, border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', gap: 16 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                          <strong style={{ fontSize: 15, color: 'var(--sea)' }}>{sub.name}</strong>
                          <span style={{ fontSize: 12, color: '#64748b' }}>• {sub.email}</span>
                          <span style={{ background: 'var(--paper)', fontSize: 11, padding: '2px 8px', borderRadius: 10, fontWeight: 600 }}>{sub.subject}</span>
                        </div>
                        <p style={{ margin: '0 0 8px', fontSize: 14, color: '#334155', lineHeight: 1.5 }}>
                          "{sub.message}"
                        </p>
                        <span style={{ fontSize: 11, color: '#94a3b8' }}>
                          Gửi lúc: {new Date(sub.created_at || Date.now()).toLocaleString('vi-VN')}
                        </span>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
                        <button
                          type="button"
                          class="btn btn--ink"
                          onClick={() => {
                            showToastMsg(`Đã duyệt gợi ý của ${sub.name} để đưa lên bản đồ!`);
                          }}
                          style={{ minHeight: 34, padding: '0 12px', fontSize: 12 }}
                        >
                          <Check size={14} style={{ marginRight: 4 }} /> Duyệt Tọa Độ Này
                        </button>
                        <button
                          type="button"
                          class="btn btn--ghost"
                          onClick={() => handleDeleteSubmission(sub.id)}
                          style={{ minHeight: 34, padding: '0 12px', fontSize: 12, color: '#ef4444', borderColor: '#ef4444' }}
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: REAL PHOTOS LIBRARY */}
          {activeTab === 'photos' && (
            <div>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>Thư Viện Ảnh Thật Đà Lạt (Bản Quyền Đã Kiểm Duyệt)</h1>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Toàn bộ ảnh thật 100% Đà Lạt độ nét cao (Đồi chè, Hồ Tuyền Lâm, Cỏ hồng, Suối Tía, Đa Phú). Nhấn vào ảnh để sao chép đường dẫn.</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 18 }}>
                {REAL_DALAT_PHOTOS.map((p, idx) => (
                  <div key={idx} style={{ background: 'white', borderRadius: 8, border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                    <div style={{ height: 180, position: 'relative' }}>
                      <img 
                        src={p.url} 
                        alt={p.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                      <span style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(0,0,0,0.6)', color: 'white', fontSize: 11, padding: '3px 8px', borderRadius: 4, backdropFilter: 'blur(4px)' }}>
                        {p.cat}
                      </span>
                    </div>
                    <div style={{ padding: 14 }}>
                      <strong style={{ fontSize: 14, color: 'var(--ink)', display: 'block', marginBottom: 10 }}>{p.name}</strong>
                      <button
                        type="button"
                        class={`btn ${copiedUrl === p.url ? '' : 'btn--ghost'}`}
                        onClick={() => handleCopy(p.url)}
                        style={{ width: '100%', minHeight: 36, fontSize: 12, gap: 6 }}
                      >
                        {copiedUrl === p.url ? <Check size={14} /> : <Copy size={14} />}
                        {copiedUrl === p.url ? 'Đã Sao Chép Link!' : 'Sao Chép Link Ảnh Thật'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div style={{ maxWidth: 640 }}>
              <div style={{ marginBottom: 20 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, margin: '0 0 4px', color: 'var(--ink)' }}>Cài Đặt Cổng Thông Tin Ghiền Đà Lạt</h1>
                <p style={{ fontSize: 13, color: '#64748b', margin: 0 }}>Cấu hình thông tin liên hệ, hotline hỗ trợ phượt và thông báo mùa du lịch.</p>
              </div>

              <div style={{ background: 'white', padding: 24, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                <div class="input-group" style={{ marginBottom: 14 }}>
                  <label>Hotline Hỗ Trợ Phượt Bản Địa</label>
                  <input type="text" class="input-control" defaultValue="+84 (0) 263 3828 999" />
                </div>

                <div class="input-group" style={{ marginBottom: 14 }}>
                  <label>Email Ban Biên Tập</label>
                  <input type="email" class="input-control" defaultValue="banbientap@ghiendalat.vn" />
                </div>

                <div class="input-group" style={{ marginBottom: 14 }}>
                  <label>Địa Chỉ Hội Quán Đà Lạt</label>
                  <input type="text" class="input-control" defaultValue="10 Trần Hưng Đạo, Phường 10, TP. Đà Lạt" />
                </div>

                <div class="input-group" style={{ marginBottom: 18 }}>
                  <label>Thông Báo Mùa Du Lịch Nổi Bật</label>
                  <textarea rows={2} class="input-control" defaultValue="Đà Lạt đang vào mùa hoa Dã Quỳ rực rỡ và đồi Cỏ Hồng Suối Vàng. Buổi sáng se lạnh 14°C, hãy chuẩn bị áo ấm và găng tay khi đi săn mây lúc 05:00 sáng nhé!" />
                </div>

                <button 
                  type="button" 
                  class="btn btn--ink"
                  onClick={() => showToastMsg('Đã lưu cấu hình cổng thông tin thành công!')}
                  style={{ minHeight: 40, fontSize: 14 }}
                >
                  Lưu Cài Đặt
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT SPOT */}
      {showAddSpotModal && (
        <div class="modal-overlay" onClick={() => setShowAddSpotModal(false)}>
          <div class="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 class="h2" style={{ fontSize: 24, margin: '0 0 16px' }}>
              {editingSpot ? 'Chỉnh Sửa Tọa Độ Check-in' : 'Thêm Tọa Độ Check-in Mới'}
            </h2>

            <form onSubmit={handleSaveSpot}>
              <div class="input-group" style={{ marginBottom: 12 }}>
                <label>Tên Điểm Đến / Tọa Độ</label>
                <input 
                  type="text" 
                  required 
                  class="input-control" 
                  placeholder="Ví dụ: Đồi chè Cầu Đất & Tuabin Gió"
                  value={spotForm.title}
                  onChange={(e) => setSpotForm({ ...spotForm, title: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div class="input-group">
                  <label>Khoảng Cách (từ trung tâm)</label>
                  <input 
                    type="text" 
                    required 
                    class="input-control" 
                    placeholder="Ví dụ: 18 km"
                    value={spotForm.distance}
                    onChange={(e) => setSpotForm({ ...spotForm, distance: e.target.value })}
                  />
                </div>
                <div class="input-group">
                  <label>Địa Hình / Điểm Đặc Trưng</label>
                  <input 
                    type="text" 
                    required 
                    class="input-control" 
                    placeholder="Ví dụ: Đồi chè & Biển mây"
                    value={spotForm.terrain}
                    onChange={(e) => setSpotForm({ ...spotForm, terrain: e.target.value })}
                  />
                </div>
              </div>

              <div class="input-group" style={{ marginBottom: 12 }}>
                <label>Phương Tiện Khuyến Khích</label>
                <input 
                  type="text" 
                  required 
                  class="input-control" 
                  placeholder="Ví dụ: Xe máy phượt & Ô tô gia đình (đường nhựa phẳng)"
                  value={spotForm.convoy}
                  onChange={(e) => setSpotForm({ ...spotForm, convoy: e.target.value })}
                />
              </div>

              <div class="input-group" style={{ marginBottom: 12 }}>
                <label>Đường Dẫn Link Ảnh Thật (100% Đà Lạt)</label>
                <input 
                  type="url" 
                  required 
                  class="input-control" 
                  placeholder="https://images.unsplash.com/..."
                  value={spotForm.image_url}
                  onChange={(e) => setSpotForm({ ...spotForm, image_url: e.target.value })}
                />
                <span style={{ fontSize: 11, color: '#64748b', marginTop: 4, display: 'block' }}>
                  💡 Gợi ý: Có thể lấy link ảnh thật tại tab "Kho Ảnh Thật Đà Lạt"
                </span>
              </div>

              <div class="input-group" style={{ marginBottom: 18 }}>
                <label>Mô Tả &amp; Kinh Nghiệm Trải Nghiệm</label>
                <textarea 
                  rows={3} 
                  required 
                  class="input-control" 
                  placeholder="Chia sẻ vẻ đẹp, góc chụp ảnh đẹp nhất, thời điểm săn mây..."
                  value={spotForm.description}
                  onChange={(e) => setSpotForm({ ...spotForm, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button type="submit" class="btn btn--ink" style={{ minHeight: 42, fontSize: 14 }}>
                  {editingSpot ? 'Lưu Cập Nhật' : 'Tạo Tọa Độ Ngay'}
                </button>
                <button 
                  type="button" 
                  class="btn btn--ghost" 
                  onClick={() => setShowAddSpotModal(false)}
                  style={{ minHeight: 42, fontSize: 14 }}
                >
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ADD FOOD */}
      {showAddFoodModal && (
        <div class="modal-overlay" onClick={() => setShowAddFoodModal(false)}>
          <div class="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 540 }}>
            <h2 class="h2" style={{ fontSize: 24, margin: '0 0 16px' }}>
              Thêm Quán Ăn / Quán Ruột Mới
            </h2>

            <form onSubmit={handleSaveFood}>
              <div class="input-group" style={{ marginBottom: 12 }}>
                <label>Tên Quán Ăn / Tiệm Cà Phê</label>
                <input 
                  type="text" 
                  required 
                  class="input-control" 
                  placeholder="Ví dụ: Bánh căn Nhà Chung"
                  value={foodForm.name}
                  onChange={(e) => setFoodForm({ ...foodForm, name: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                <div class="input-group">
                  <label>Phân Loại Món</label>
                  <select 
                    class="input-control"
                    value={foodForm.cat}
                    onChange={(e) => setFoodForm({ ...foodForm, cat: e.target.value })}
                  >
                    <option value="Lẩu đêm lạnh">Lẩu đêm lạnh</option>
                    <option value="Món sáng ấm bụng">Món sáng ấm bụng</option>
                    <option value="Tráng miệng & Ăn vặt">Tráng miệng &amp; Ăn vặt</option>
                    <option value="Cafe view hoài niệm">Cafe view hoài niệm</option>
                  </select>
                </div>
                <div class="input-group">
                  <label>Mức Giá Tham Khảo</label>
                  <input 
                    type="text" 
                    required 
                    class="input-control" 
                    placeholder="30.000 – 60.000 ₫"
                    value={foodForm.price}
                    onChange={(e) => setFoodForm({ ...foodForm, price: e.target.value })}
                  />
                </div>
              </div>

              <div class="input-group" style={{ marginBottom: 12 }}>
                <label>Địa Chỉ Cụ Thể</label>
                <input 
                  type="text" 
                  required 
                  class="input-control" 
                  placeholder="Ví dụ: Số 1 Nhà Chung, Phường 3, TP. Đà Lạt"
                  value={foodForm.address}
                  onChange={(e) => setFoodForm({ ...foodForm, address: e.target.value })}
                />
              </div>

              <div class="input-group" style={{ marginBottom: 18 }}>
                <label>Lưu Ý Đỗ Xe (Xe Máy &amp; Ô Tô)</label>
                <input 
                  type="text" 
                  required 
                  class="input-control" 
                  placeholder="Ví dụ: Ô tô đỗ bãi trước nhà thờ, xe máy vào tận quán"
                  value={foodForm.vehicle}
                  onChange={(e) => setFoodForm({ ...foodForm, vehicle: e.target.value })}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <button type="submit" class="btn btn--ink" style={{ minHeight: 42, fontSize: 14 }}>
                  Thêm Quán Ăn
                </button>
                <button 
                  type="button" 
                  class="btn btn--ghost" 
                  onClick={() => setShowAddFoodModal(false)}
                  style={{ minHeight: 42, fontSize: 14 }}
                >
                  Hủy Bỏ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
