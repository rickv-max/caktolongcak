import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { 
  Menu, X, Phone, ShieldCheck, Clock, MapPin, CheckCircle, 
  ChevronDown, ChevronUp, ShoppingBag, Package, FileText, 
  Users, Wrench, AlertTriangle, HelpCircle, Lock, EyeOff,
  Instagram, Mail, ArrowRight, ArrowUp, Sparkles
} from 'lucide-react';

// --- CONFIGURATION ---
const WA_NUMBER = "6285856618965";
const WA_INFO_TEXT = "Halo Cak Tolong Cak, saya ingin bertanya mengenai layanan yang tersedia.";

// --- DATA ---
const SERVICES = [
  { id: 'titip-beli', title: 'Titip Beli', icon: ShoppingBag, desc: 'Membantu membeli makanan, minuman, obat bebas, kebutuhan rumah tangga, perlengkapan kerja, dan barang lainnya.' },
  { id: 'antar-ambil', title: 'Antar dan Ambil Barang', icon: Package, desc: 'Membantu mengambil atau mengantarkan paket, dokumen, makanan, laundry, barang pribadi, dan kebutuhan lainnya.' },
  { id: 'antar-dokumen', title: 'Antar Dokumen', icon: FileText, desc: 'Membantu pengiriman dokumen ke kantor, sekolah, kampus, instansi, tempat usaha, atau lokasi tujuan lainnya.' },
  { id: 'antrean', title: 'Antrean & Pengurusan', icon: Users, desc: 'Membantu mengantre atau mengambil kebutuhan tertentu selama tidak melanggar ketentuan instansi terkait.' },
  { id: 'bantuan-rumah', title: 'Bantuan Rumah Tangga', icon: Wrench, desc: 'Membantu pekerjaan ringan seperti memindahkan barang kecil, mengambil kebutuhan rumah, membuang barang, dll.' },
  { id: 'pendampingan', title: 'Pendampingan Lapangan', icon: Users, desc: 'Membantu pelanggan yang membutuhkan pendampingan untuk kegiatan tertentu di wilayah Lumajang.' },
  { id: 'jasa-darurat', title: 'Jasa Darurat Ringan', icon: AlertTriangle, desc: 'Membantu kebutuhan mendesak seperti mengambil barang tertinggal, mengantarkan kunci, atau dokumen mendesak.' },
  { id: 'khusus', title: 'Permintaan Khusus', icon: HelpCircle, desc: 'Jelaskan kebutuhan lain yang belum tersedia. Tim akan memeriksa apakah permintaan tersebut dapat dikerjakan.' }
];

const AREAS = [
  "Kecamatan Lumajang", "Sukodono", "Sumbersuko", "Tekung", "Randuagung", 
  "Kedungjajang", "Klakah", "Jatiroto", "Yosowilangun", "Tempeh", 
  "Pasirian", "Senduro", "Gucialit", "Candipuro", "Pronojiwo", "Wilayah Lainnya"
];

const BENEFITS = [
  { title: 'Siap 24 Jam', desc: 'Kirimkan permintaan kapan saja. Pelaksanaan menyesuaikan ketersediaan petugas.', icon: Clock },
  { title: 'Respons Cepat', desc: 'Pemesanan langsung terhubung ke WhatsApp tanpa perlu membuat akun.', icon: Phone },
  { title: 'Privasi Terjamin', desc: 'Informasi Anda hanya digunakan untuk memproses dan menyelesaikan pesanan.', icon: ShieldCheck },
  { title: 'Petugas Terpercaya', desc: 'Setiap pesanan dikonfirmasi dan dikoordinasikan sebelum dikerjakan.', icon: CheckCircle },
  { title: 'Harga Transparan', desc: 'Estimasi biaya disampaikan sebelum layanan dimulai. Tidak ada biaya tersembunyi.', icon: FileText },
  { title: 'Khusus Lumajang', desc: 'Dirancang untuk memahami kebutuhan, lokasi, dan karakter masyarakat lokal.', icon: MapPin }
];

const FAQS = [
  { q: 'Apa itu Cak Tolong Cak?', a: 'Layanan jasa serba bisa yang dirancang khusus untuk membantu masyarakat Lumajang mengurus berbagai kebutuhan harian, mulai dari titip beli hingga pengantaran barang dengan cepat dan praktis.' },
  { q: 'Layanan apa saja yang tersedia?', a: 'Kami melayani titip beli barang/makanan, antar-ambil barang, pengiriman dokumen, jasa antre, bantuan rumah tangga ringan, hingga permintaan khusus selama memungkinkan dan legal.' },
  { q: 'Apakah benar melayani 24 jam?', a: 'Sistem pemesanan website terbuka 24 jam. Namun, pelaksanaan di lapangan menyesuaikan dengan ketersediaan petugas pada jam tersebut.' },
  { q: 'Bagaimana cara melakukan pemesanan?', a: 'Pilih layanan di website, isi formulir dengan lengkap, lalu klik kirim. Sistem otomatis menyusun pesanan Anda menjadi pesan WhatsApp ke tim kami.' },
  { q: 'Apakah pembayaran barang dilakukan di awal?', a: 'Untuk layanan titip beli dengan nominal tertentu, petugas kami mungkin meminta pembayaran barang di awal (transfer) demi keamanan bersama, yang akan dikonfirmasi via WA.' },
  { q: 'Apakah data pelanggan aman?', a: 'Sangat aman. Kami tidak meminta data sensitif seperti password/PIN. Alamat dan nomor telepon murni digunakan untuk pengantaran pesanan.' }
];

const TESTIMONIALS = [
  { name: 'Budi Santoso', role: 'Wiraswasta, Lumajang', text: 'Sangat membantu saat saya butuh ambil dokumen penting yang tertinggal di rumah sementara saya sudah di kantor. Cepat dan profesional!' },
  { name: 'Siti Aminah', role: 'Ibu Rumah Tangga, Sukodono', text: 'Malam-malam anak rewel butuh obat, kebetulan suami luar kota. Pakai jasa Cak Tolong Cak langsung diantarkan dengan aman. Terima kasih banyak.' },
  { name: 'Andi Pratama', role: 'Mahasiswa, Sumbersuko', text: 'Sering pakai buat titip beli makanan kalau lagi nugas malam dan hujan. Respons adminnya ramah dan harganya jelas di awal.' }
];

// --- ADVANCED CSS & KEYFRAMES ---
const AdvancedStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    
    :root {
      --font-heading: 'Cormorant Garamond', serif;
      --font-body: 'Plus Jakarta Sans', sans-serif;
    }
    
    h1, h2, h3, h4, h5, h6, .font-heading { font-family: var(--font-heading); }
    body { font-family: var(--font-body); background-color: #0f172a; color: #1F2937; overflow-x: hidden; }
    html { scroll-behavior: smooth; }

    /* Intersection Reveal Animations */
    .reveal-elem {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 1s cubic-bezier(0.16, 1, 0.3, 1), transform 1s cubic-bezier(0.16, 1, 0.3, 1);
      will-change: opacity, transform;
    }
    .reveal-elem.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    .delay-100 { transition-delay: 100ms; }
    .delay-200 { transition-delay: 200ms; }
    .delay-300 { transition-delay: 300ms; }
    .delay-400 { transition-delay: 400ms; }

    /* Velocity Scroll Inertia Engine */
    .velocity-card {
      will-change: transform;
      transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), box-shadow 0.4s ease;
    }

    /* Stacked Section Inner Content Parallax Engine */
    .stacked-content {
      will-change: transform, opacity;
      transform-origin: top center;
      transition: transform 0.1s linear, opacity 0.1s linear;
    }

    /* Elegant Scrollbar */
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #0f172a; }
    ::-webkit-scrollbar-thumb { background: #334155; border-radius: 10px; }
    ::-webkit-scrollbar-thumb:hover { background: #475569; }
  `}} />
);

// --- COMPONENT: STACKED SECTION ---
const StackedSection = ({ children, id, zIndex, bgClass, isFirst = false, isLast = false, noRounding = false }) => {
  const sectionRef = useRef(null);
  const [topVal, setTopVal] = useState('0px');

  useLayoutEffect(() => {
    const updateStickyTop = () => {
      if (sectionRef.current) {
        const height = sectionRef.current.offsetHeight;
        const vh = window.innerHeight;
        if (height > vh && !isLast) {
          setTopVal(`${vh - height}px`);
        } else {
          setTopVal('0px');
        }
      }
    };

    const observer = new ResizeObserver(() => updateStickyTop());
    if (sectionRef.current) observer.observe(sectionRef.current);
    window.addEventListener('resize', updateStickyTop);
    updateStickyTop();
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateStickyTop);
    };
  }, [isLast]);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`stacked-wrapper w-full ${isLast ? 'relative' : 'sticky'} ${bgClass} 
        ${!noRounding && !isFirst ? 'rounded-t-[2.5rem] md:rounded-t-[4rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] overflow-hidden' : ''} 
        will-change-transform`}
      style={{ zIndex, top: isLast ? 'auto' : topVal }}
    >
      <div className="stacked-content w-full h-full">
        {children}
      </div>
    </section>
  );
};

// --- MAIN APP ---
export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedServiceForm, setSelectedServiceForm] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [toastMsg, setToastMsg] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const formRef = useRef(null);

  // Core Animation Engine (Reveal, Velocity, Stacked Parallax)
  useEffect(() => {
    // 1. Intersection Observer for Smooth Reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal-elem').forEach(el => observer.observe(el));

    // 2. High-Performance Scroll Engine
    let lastScrollY = window.scrollY;
    let ticking = false;
    let scrollTimeout;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const velocity = currentScrollY - lastScrollY;
          
          // Navbar & Progress
          setIsScrolled(currentScrollY > 20);
          setShowScrollTop(currentScrollY > 500);
          const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
          setScrollProgress((currentScrollY / totalHeight) * 100);

          // A. Overlapping Parallax Effect (Apple Style Dim & Scale)
          const wrappers = document.querySelectorAll('.stacked-wrapper');
          wrappers.forEach((wrapper, index) => {
            const nextWrapper = wrappers[index + 1];
            if (nextWrapper) {
              const nextRect = nextWrapper.getBoundingClientRect();
              const vh = window.innerHeight;
              
              if (nextRect.top < vh) {
                const overlap = vh - nextRect.top;
                const progress = Math.min(1, Math.max(0, overlap / vh));
                
                const content = wrapper.querySelector('.stacked-content');
                if (content) {
                  content.style.transform = `scale(${1 - (progress * 0.05)}) translateY(${progress * 20}px)`;
                  content.style.opacity = `${1 - (progress * 0.5)}`;
                }
              } else {
                const content = wrapper.querySelector('.stacked-content');
                if (content) {
                  content.style.transform = `scale(1) translateY(0px)`;
                  content.style.opacity = '1';
                }
              }
            }
          });

          // B. Velocity Scroll on Cards (Inertia Skew)
          const cards = document.querySelectorAll('.velocity-card');
          const skewValue = Math.min(Math.max(velocity * 0.03, -3), 3); 
          const scaleValue = velocity !== 0 ? 0.99 : 1; 

          cards.forEach(card => {
            card.style.transform = `skewY(${skewValue}deg) scale(${scaleValue})`;
          });

          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }

      // Reset Velocity inertia
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        document.querySelectorAll('.velocity-card').forEach(card => {
          card.style.transform = `skewY(0deg) scale(1)`;
        });
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToForm = (serviceId = '') => {
    if (serviceId) setSelectedServiceForm(serviceId);
    setTimeout(() => {
      const element = document.getElementById('order-form');
      if(element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
    setMobileMenuOpen(false);
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="relative selection:bg-amber-200 selection:text-slate-900 bg-slate-950">
      <AdvancedStyles />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-400 to-amber-400 z-[100] transition-all duration-300" style={{ width: `${scrollProgress}%` }} />

      {/* Premium Navbar */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className={`font-heading font-bold text-xl md:text-2xl tracking-tight transition-colors duration-300 ${isScrolled ? 'text-slate-900' : 'text-slate-900'}`}>
              Cak Tolong Cak<span className="text-amber-500">.</span>
            </span>
          </div>

          <div className="hidden lg:flex items-center gap-8">
            <NavLinks isScrolled={isScrolled} />
            <button 
              onClick={() => scrollToForm()}
              className="bg-slate-900 text-white px-7 py-3 rounded-full text-sm font-semibold hover:bg-slate-800 transition-all hover:scale-105 shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
            >
              Pesan Sekarang
            </button>
          </div>

          <button className="lg:hidden text-slate-900 p-2 -mr-2 bg-white/50 backdrop-blur-md rounded-full" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-500 origin-top border-t border-slate-100 ${mobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0'}`}>
          <div className="flex flex-col p-6 gap-2">
            <NavLinks mobile onClick={() => setMobileMenuOpen(false)} />
            <button 
              onClick={() => scrollToForm()}
              className="bg-slate-900 text-white w-full py-4 rounded-xl text-sm font-semibold mt-4 shadow-lg active:scale-95 transition-transform"
            >
              Pesan Sekarang
            </button>
          </div>
        </div>
      </nav>

      {/* --- STACKED ARCHITECTURE START --- */}
      
      {/* 1. Hero Section (Bottom Layer) */}
      <StackedSection zIndex={0} isFirst bgClass="bg-[#FDFBF7]" noRounding>
        <div className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/60 to-transparent" />
          <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-emerald-200/40 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-amber-200/40 rounded-full blur-[80px] translate-x-1/2 translate-y-1/2" />

          <div className="max-w-4xl mx-auto text-center px-5 relative z-10 w-full pt-10 pb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 shadow-sm mb-6 md:mb-8 reveal-elem">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-slate-700 tracking-wide">Online — Tim kami siap membantu</span>
            </div>
            <h1 className="font-heading text-[2.75rem] leading-[1.05] md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 reveal-elem delay-100">
              Apa Pun Kebutuhanmu, <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 relative">
                Cak Tolong Cak Hadir
                <Sparkles className="absolute -right-8 -top-6 text-amber-400 w-8 h-8 hidden md:block" />
              </span>
            </h1>
            <p className="text-base md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed reveal-elem delay-200">
              Layanan concierge lokal eksklusif untuk masyarakat Lumajang. Cepat, aman, terpercaya, dan melayani 24 jam setiap hari.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 reveal-elem delay-300">
              <button 
                onClick={() => scrollToForm()}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white rounded-full font-semibold text-sm md:text-base hover:bg-slate-800 transition-all hover:scale-105 shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex items-center justify-center gap-2 group"
              >
                Pesan Sekarang <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a 
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_INFO_TEXT)}`}
                target="_blank" rel="noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-md text-slate-900 border border-slate-200 rounded-full font-semibold text-sm md:text-base hover:bg-white transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-105"
              >
                <Phone size={18} className="text-emerald-600" /> Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </StackedSection>

      {/* 2. About Section (Overlaps Hero) */}
      <StackedSection id="tentang" zIndex={10} bgClass="bg-white">
        <div className="pt-24 pb-20 md:pt-32 md:pb-32 px-5 md:px-8 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="relative order-2 lg:order-1 reveal-elem">
            <div className="aspect-square bg-slate-50 rounded-[2rem] overflow-hidden relative border border-slate-100">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black flex flex-col items-center justify-center text-white p-8 md:p-12 text-center group">
                <ShieldCheck size={56} className="text-amber-400 mb-6 opacity-90 group-hover:scale-110 transition-transform duration-500" />
                <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">Concierge Lokal Anda</h3>
                <p className="text-slate-300 text-sm font-medium px-4 leading-relaxed">Hadir untuk menghemat waktu dan tenaga Anda di Lumajang.</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 bg-white p-5 md:p-6 rounded-2xl shadow-2xl border border-slate-50 max-w-[240px] md:max-w-xs animate-fade-in-up delay-300 velocity-card">
              <div className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                  <CheckCircle className="text-emerald-500 w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Amanah & Cepat</p>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">Diproses profesional untuk kepuasan Anda.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight reveal-elem">
              Standar Baru <br className="hidden md:block"/>Layanan Jasa
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6 text-base md:text-lg reveal-elem delay-100">
              Cak Tolong Cak hadir mengotomatiskan berbagai kebutuhan harian Anda. Mulai dari mengambil barang, membeli kebutuhan, hingga pendampingan lapangan khusus wilayah Lumajang.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8 text-base md:text-lg reveal-elem delay-200">
              Cukup beritahu kebutuhan Anda lewat website. Sistem cerdas kami akan memprosesnya langsung ke WhatsApp tim operasional dalam hitungan detik.
            </p>
            <div className="bg-amber-50/50 border-l-4 border-amber-500 p-5 rounded-r-2xl reveal-elem delay-300">
              <p className="text-slate-700 font-medium text-sm leading-relaxed">
                <strong className="text-slate-900">Komitmen Kami:</strong> Selama permintaan Anda aman dan legal, tim lapangan kami siap mengeksekusinya dengan standar terbaik.
              </p>
            </div>
          </div>
        </div>
      </StackedSection>

      {/* 3. Services Section (Overlaps About) */}
      <StackedSection id="layanan" zIndex={20} bgClass="bg-slate-50">
        <div className="py-24 md:py-32 px-5 md:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-elem">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-4">Layanan Kami</h2>
            <p className="text-slate-600 text-base md:text-lg">Beragam solusi elegan untuk mempermudah hidup Anda.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {SERVICES.map((srv, index) => {
              const Icon = srv.icon;
              return (
                <div 
                  key={srv.id} 
                  className="velocity-card bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-slate-200 group flex flex-col reveal-elem"
                  style={{ transitionDelay: `${(index % 4) * 100}ms` }}
                >
                  <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-slate-700 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">{srv.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow group-hover:text-slate-700 transition-colors">{srv.desc}</p>
                  <button 
                    onClick={() => scrollToForm(srv.title)}
                    className="text-emerald-700 font-bold text-sm flex items-center gap-2 group-hover:text-emerald-600 transition-colors mt-auto w-max"
                  >
                    Pesan Layanan <ArrowRight size={16} className="transform group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </StackedSection>

      {/* 4. How it Works Section (Overlaps Services) */}
      <StackedSection id="cara-pesan" zIndex={30} bgClass="bg-white">
        <div className="py-24 md:py-32 px-5 md:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-elem">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">Cara Kerja Pintar</h2>
            <p className="text-slate-600 text-base md:text-lg">Proses pemesanan tanpa hambatan, langsung dari genggaman Anda.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-emerald-100 via-amber-100 to-emerald-100 -z-10" />
            
            {[
              { title: 'Pilih Layanan', desc: 'Tentukan jenis bantuan yang Anda butuhkan hari ini.' },
              { title: 'Isi Detail', desc: 'Masukkan lokasi, waktu, dan rincian pekerjaan.' },
              { title: 'Kirim Otomatis', desc: 'Sistem menyusun info pesanan ke format WhatsApp.' },
              { title: 'Konfirmasi Cepat', desc: 'Tim operasional langsung merespons dan mengeksekusi.' }
            ].map((step, idx) => (
              <div key={idx} className="relative text-center reveal-elem" style={{ transitionDelay: `${idx * 150}ms` }}>
                <div className="w-20 h-20 mx-auto bg-white border-[6px] border-slate-50 rounded-full flex items-center justify-center text-2xl font-bold font-heading text-slate-900 shadow-[0_10px_20px_rgba(0,0,0,0.05)] mb-6 z-10 group hover:border-amber-100 hover:scale-110 transition-all duration-300">
                  {idx + 1}
                </div>
                <h3 className="font-bold text-xl text-slate-900 mb-2">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed px-4 md:px-0">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </StackedSection>

      {/* 5. Form Section (Overlaps How it works) */}
      <StackedSection id="order-form" zIndex={40} bgClass="bg-slate-900">
        <div className="py-24 md:py-32 px-5 md:px-8 text-white relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djI2aDJWMzRoLTJ6bTAtMzRWMEgzNHYyNmgyek0yNCAzNHYyNmgtMlYzNGgyem0wLTM0VjBIMjJ2MjZoMnpNMzYgMzhWNzhIMzRWMzh6bS0xMiAwdjQwaC0yVjM4aDJ6bTEyLTQwaDIwVjhIMzRWMHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
          
          <div className="max-w-3xl mx-auto relative z-10">
            <div className="text-center mb-12 reveal-elem">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">Mulai Pesanan</h2>
              <p className="text-slate-400 text-base md:text-lg">Isi ringkasan kebutuhan, biarkan kami yang mengurus sisanya.</p>
            </div>

            <div className="bg-white rounded-3xl md:rounded-[2.5rem] p-6 md:p-12 shadow-[0_30px_60px_rgba(0,0,0,0.4)] text-slate-900 reveal-elem delay-100">
              <OrderForm selectedService={selectedServiceForm} onShowToast={showToast} />
            </div>

            <div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 reveal-elem delay-200">
              <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <FileText className="w-6 h-6 text-amber-400" /> Transparansi Harga
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                Biaya dihitung elegan berdasarkan jenis pekerjaan, jarak, dan urgensi. <strong>Tidak ada biaya tersembunyi.</strong> Tim kami akan selalu mengonfirmasi total estimasi melalui WhatsApp sebelum tindakan dimulai.
              </p>
            </div>
          </div>
        </div>
      </StackedSection>

      {/* 6. Benefits & Area (Overlaps Form) */}
      <StackedSection id="keunggulan" zIndex={50} bgClass="bg-slate-50">
        <div className="py-24 md:py-32 px-5 md:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-elem">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">Nilai Lebih Kami</h2>
            <p className="text-slate-600 text-base md:text-lg">Alasan masyarakat Lumajang mengandalkan layanan kami setiap hari.</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8 mb-20">
            {BENEFITS.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={idx} 
                  className="velocity-card bg-white p-6 md:p-8 rounded-3xl border border-slate-100 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] reveal-elem"
                  style={{ transitionDelay: `${(idx % 3) * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-emerald-100/50 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-emerald-700" />
                  </div>
                  <h3 className="font-bold text-lg md:text-xl text-slate-900 mb-3">{benefit.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center border-t border-slate-200 pt-16 reveal-elem">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-6">Area Operasional (Kab. Lumajang)</h2>
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 max-w-4xl mx-auto">
              {AREAS.map((area, idx) => (
                <span key={idx} className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm shadow-sm velocity-card">
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </StackedSection>

      {/* 7. Security (Overlaps Benefits) */}
      <StackedSection id="keamanan" zIndex={60} bgClass="bg-white">
        <div className="py-24 md:py-32 px-5 md:px-8 max-w-7xl mx-auto grid lg:grid-cols-5 gap-10 md:gap-16 items-center">
          <div className="lg:col-span-2 reveal-elem">
            <div className="bg-slate-900 p-8 md:p-10 rounded-[2.5rem] relative overflow-hidden shadow-2xl velocity-card">
              <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/20 rounded-bl-full blur-2xl" />
              <ShieldCheck className="w-12 h-12 text-amber-400 mb-6 relative z-10" />
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight relative z-10">Privasi Anda,<br/>Prioritas Kami.</h2>
              <div className="mt-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex gap-4 items-start relative z-10 backdrop-blur-md">
                <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
                <p className="text-sm text-red-100 font-medium leading-relaxed">Kami tidak pernah meminta kode OTP, PIN, password, atau akses rekening.</p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ul className="grid sm:grid-cols-2 gap-4 md:gap-6">
              {[
                { text: 'Tanpa repot membuat akun website.', icon: Lock },
                { text: 'Bebas permintaan password/PIN/OTP.', icon: EyeOff },
                { text: 'Data murni untuk eksekusi pesanan.', icon: FileText },
                { text: 'Alamat aman, tidak disebarluaskan.', icon: ShieldCheck },
                { text: 'Petugas hanya tahu detail lapangan.', icon: Users },
                { text: 'Hak tolak order ilegal/berbahaya.', icon: CheckCircle },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <li key={idx} className="flex gap-4 items-start bg-slate-50 p-5 rounded-2xl border border-slate-100 shadow-sm reveal-elem velocity-card" style={{ transitionDelay: `${(idx % 2) * 100}ms` }}>
                    <div className="p-2 bg-emerald-50 rounded-lg shrink-0 mt-0.5">
                       <Icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 leading-relaxed">{item.text}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </StackedSection>

      {/* 8. FAQ & Testimonials (Overlaps Security) */}
      <StackedSection id="faq" zIndex={70} bgClass="bg-slate-50">
        <div className="py-24 md:py-32 px-5 md:px-8">
          <div className="max-w-7xl mx-auto mb-24">
            <div className="text-center mb-16 reveal-elem">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">Kata Mereka</h2>
              <span className="inline-block bg-slate-200 text-slate-600 text-xs px-4 py-1.5 rounded-full uppercase tracking-wider font-bold">
                Review Pelanggan
              </span>
            </div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {TESTIMONIALS.map((testi, idx) => (
                <div key={idx} className="velocity-card bg-white p-8 rounded-3xl border border-slate-100 shadow-sm reveal-elem" style={{ transitionDelay: `${idx * 150}ms` }}>
                  <div className="flex text-amber-400 mb-6 gap-1">
                    {[...Array(5)].map((_, i) => <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                  </div>
                  <p className="text-slate-600 italic text-base md:text-lg leading-relaxed mb-8">"{testi.text}"</p>
                  <div>
                    <h4 className="font-bold text-base text-slate-900">{testi.name}</h4>
                    <p className="text-sm text-slate-500 font-medium mt-1">{testi.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-3xl mx-auto border-t border-slate-200 pt-20">
            <div className="text-center mb-16 reveal-elem">
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-slate-900 mb-4">Tanya Jawab (FAQ)</h2>
            </div>
            <div className="space-y-4">
              {FAQS.map((faq, idx) => (
                <div className="reveal-elem" style={{ transitionDelay: `${idx * 50}ms` }} key={idx}>
                  <Accordion question={faq.q} answer={faq.a} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </StackedSection>

      {/* 9. CTA & Footer (Bottom most layer, scrolls naturally over FAQ) */}
      <StackedSection zIndex={80} bgClass="bg-slate-950" isLast>
        <div className="pt-24 pb-16 px-5 md:px-8">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] md:rounded-[4rem] p-10 md:p-20 text-center relative overflow-hidden border border-slate-700 shadow-2xl reveal-elem mb-24">
             <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[100px]" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[100px]" />
             
             <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 relative z-10 leading-tight">
               Siap Menyerahkan <br className="hidden md:block"/>Urusan Anda?
             </h2>
             <p className="text-slate-300 text-base md:text-xl mb-10 max-w-2xl mx-auto relative z-10">
               Tim operasional kami di Lumajang stand-by untuk membantu mempermudah aktivitas Anda hari ini.
             </p>
             <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
                <button 
                  onClick={() => scrollToForm()}
                  className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.15)]"
                >
                  Pesan Sekarang
                </button>
                <a 
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_INFO_TEXT)}`}
                  target="_blank" rel="noreferrer"
                  className="px-8 py-4 bg-transparent border-2 border-slate-600 text-white rounded-full font-bold text-base md:text-lg hover:border-white hover:bg-white/5 transition-all flex items-center justify-center gap-2"
                >
                  Hubungi WhatsApp
                </a>
             </div>
          </div>

          {/* Footer Contents */}
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 reveal-elem delay-200">
            <div>
              <span className="font-heading font-bold text-2xl text-white tracking-tight mb-4 block">
                Cak Tolong Cak<span className="text-amber-500">.</span>
              </span>
              <p className="text-sm text-slate-400 leading-relaxed mb-6">
                Layanan jasa serba bisa eksklusif untuk masyarakat Lumajang. Profesional, amanah, dan selalu responsif.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all hover:scale-110 text-slate-400">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:bg-slate-700 hover:text-white transition-all hover:scale-110 text-slate-400">
                  <Mail size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-bold mb-6">Navigasi Utama</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><a href="#tentang" className="hover:text-amber-500 transition-colors">Tentang Kami</a></li>
                <li><a href="#layanan" className="hover:text-amber-500 transition-colors">Pilihan Layanan</a></li>
                <li><a href="#cara-pesan" className="hover:text-amber-500 transition-colors">Cara Pesan</a></li>
                <li><a href="#faq" className="hover:text-amber-500 transition-colors">Pusat Bantuan (FAQ)</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Informasi</h4>
              <ul className="space-y-4 text-sm text-slate-400">
                <li><span className="block text-slate-500 text-xs uppercase mb-1 font-bold tracking-wider">Jam Operasional</span> 24 Jam Setiap Hari</li>
                <li><span className="block text-slate-500 text-xs uppercase mb-1 font-bold tracking-wider">Area Jangkauan</span> Khusus Kab. Lumajang</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6">Legalitas</h4>
              <ul className="space-y-3 text-sm text-slate-400">
                <li><button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">Kebijakan Privasi</button></li>
                <li><button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">Syarat & Ketentuan</button></li>
              </ul>
              <p className="text-xs text-slate-500 mt-6 leading-relaxed bg-slate-900/50 p-4 rounded-xl border border-slate-800">
                Disclaimer: Kami berhak penuh menolak pesanan yang terindikasi melanggar hukum, membahayakan, atau di luar batas kapasitas teknis kami.
              </p>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800/80 text-xs md:text-sm text-slate-500 text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Cak Tolong Cak. Hak Cipta Dilindungi Undang-Undang.</p>
          </div>
        </div>
      </StackedSection>
      {/* --- STACKED ARCHITECTURE END --- */}

      {/* Floating Elements (WhatsApp & Scroll Top) */}
      <a 
        href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_INFO_TEXT)}`}
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 w-14 h-14 bg-emerald-500 text-white rounded-full shadow-[0_10px_30px_rgba(16,185,129,0.4)] flex items-center justify-center hover:bg-emerald-600 hover:scale-110 transition-all z-[90] group"
      >
        <Phone className="w-6 h-6" />
        <span className="hidden md:block absolute right-full mr-4 bg-slate-900 text-white text-xs px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 pointer-events-none font-medium">
          Butuh bantuan?
        </span>
      </a>

      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 md:bottom-28 md:right-8 w-12 h-12 bg-white/80 backdrop-blur-md border border-slate-200 text-slate-700 rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all z-[90]"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Modals & Toast */}
      {activeModal && <InfoModal type={activeModal} onClose={() => setActiveModal(null)} />}
      
      {toastMsg && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl z-[100] animate-fade-in-up text-sm font-medium flex items-center gap-2">
          <CheckCircle size={16} className="text-emerald-400" /> {toastMsg}
        </div>
      )}
    </div>
  );
}

// --- SUB COMPONENTS ---

const NavLinks = ({ mobile, onClick, isScrolled }) => {
  const links = [
    { name: 'Tentang', href: '#tentang' },
    { name: 'Layanan', href: '#layanan' },
    { name: 'Cara Pesan', href: '#cara-pesan' },
    { name: 'Keamanan', href: '#keamanan' },
    { name: 'FAQ', href: '#faq' },
  ];
  return (
    <>
      {links.map((link) => (
        <a 
          key={link.name} 
          href={link.href} 
          onClick={onClick}
          className={`text-sm font-semibold transition-colors hover:text-amber-500 ${mobile ? 'text-slate-700 py-3 border-b border-slate-50' : 'text-slate-600'}`}
        >
          {link.name}
        </a>
      ))}
    </>
  );
};

const Accordion = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-slate-200 rounded-2xl bg-white overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md velocity-card">
      <button 
        className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-bold text-sm md:text-base text-slate-900 pr-4">{question}</span>
        {isOpen ? <ChevronUp className="text-slate-400 shrink-0 w-5 h-5" /> : <ChevronDown className="text-slate-400 shrink-0 w-5 h-5" />}
      </button>
      <div className={`px-6 text-slate-600 text-sm leading-relaxed transition-all duration-300 ease-in-out ${isOpen ? 'pb-6 opacity-100 max-h-[500px]' : 'max-h-0 opacity-0 overflow-hidden'}`}>
        {answer}
      </div>
    </div>
  );
};

const OrderForm = ({ selectedService, onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '', phone: '', service: '', details: '', notes: '', agreement: false
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedService) setFormData(prev => ({ ...prev, service: selectedService }));
  }, [selectedService]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Wajib diisi';
    if (!formData.phone.trim()) newErrors.phone = 'Wajib diisi';
    if (!formData.service) newErrors.service = 'Pilih layanan';
    if (!formData.details.trim()) newErrors.details = 'Mohon jelaskan detail kebutuhan Anda';
    if (!formData.agreement) newErrors.agreement = 'Harap centang persetujuan';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      onShowToast('Mohon periksa kembali isian form.');
      return;
    }

    const message = `Halo Cak Tolong Cak, saya butuh bantuan.

Nama: ${formData.name}
WA: ${formData.phone}
Layanan: ${formData.service}

Detail Bantuan / Lokasi: 
${formData.details}

Catatan Tambahan: ${formData.notes || '-'}

Mohon info ketersediaan petugas & estimasi biaya.`;

    onShowToast('Membuka WhatsApp...');
    setTimeout(() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank'), 800);
  };

  const inputClass = "w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all placeholder-slate-400";
  const labelClass = "block text-sm font-semibold text-slate-700 mb-2";
  const errorClass = "text-red-500 text-xs mt-1.5 font-medium flex items-center gap-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left relative z-10">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Nama Anda <span className="text-red-500">*</span></label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className={inputClass} placeholder="Contoh: Budi Santoso" />
          {errors.name && <p className={errorClass}><AlertTriangle size={12}/>{errors.name}</p>}
        </div>
        <div>
          <label className={labelClass}>Nomor WhatsApp <span className="text-red-500">*</span></label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={inputClass} placeholder="0812XXXXXXXX" />
          {errors.phone && <p className={errorClass}><AlertTriangle size={12}/>{errors.phone}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Pilih Layanan <span className="text-red-500">*</span></label>
        <select name="service" value={formData.service} onChange={handleChange} className={inputClass}>
          <option value="">-- Sentuh untuk memilih --</option>
          {SERVICES.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
        </select>
        {errors.service && <p className={errorClass}><AlertTriangle size={12}/>{errors.service}</p>}
      </div>

      <div>
        <label className={labelClass}>Detail Bantuan / Alamat Lengkap <span className="text-red-500">*</span></label>
        <textarea name="details" value={formData.details} onChange={handleChange} rows="4" className={inputClass} placeholder="Jelaskan kebutuhan, alamat awal, tujuan, dan jam layanan jika diperlukan..."></textarea>
        {errors.details && <p className={errorClass}><AlertTriangle size={12}/>{errors.details}</p>}
      </div>

      <div>
        <label className={labelClass}>Catatan Tambahan (Opsional)</label>
        <input type="text" name="notes" value={formData.notes} onChange={handleChange} className={inputClass} placeholder="Cth: Tolong siapkan uang kembalian untuk 100rb" />
      </div>

      <div className="pt-4">
        <label className="flex items-start gap-3 cursor-pointer group bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
          <div className="relative flex items-start mt-0.5">
            <input type="checkbox" name="agreement" checked={formData.agreement} onChange={handleChange} className="w-5 h-5 border-slate-300 rounded text-amber-500 focus:ring-amber-500 cursor-pointer accent-amber-500" />
          </div>
          <span className="text-xs md:text-sm text-slate-700 leading-relaxed select-none">
            Saya memastikan bahwa informasi di atas benar dan kebutuhan yang diminta tidak melanggar hukum. <span className="text-red-500">*</span>
          </span>
        </label>
        {errors.agreement && <p className={errorClass}><AlertTriangle size={12}/>{errors.agreement}</p>}
      </div>

      <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-base md:text-lg hover:bg-slate-800 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.15)] hover:scale-[1.02] flex items-center justify-center gap-2 mt-2">
        Kirim Pesanan via WhatsApp <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  );
};

const InfoModal = ({ type, onClose }) => {
  const content = {
    privacy: {
      title: "Kebijakan Privasi",
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p><strong>1. Pengumpulan Data:</strong> Kami murni hanya menggunakan data yang Anda ketik di formulir (Nama, WA, Alamat) untuk keperluan pengerjaan pesanan Anda.</p>
          <p><strong>2. Keamanan:</strong> Kami tidak menyimpan data Anda dalam database permanen website. Sistem ini langsung melempar teks ke aplikasi WhatsApp Anda. Kerahasiaan ada di ruang chat antara Anda dan admin.</p>
          <p><strong>3. Larangan Ekstrem:</strong> Mohon jangan pernah memberikan PIN, Password, OTP, atau akses bank Anda ke tim kami melalui jalur manapun.</p>
        </div>
      )
    },
    terms: {
      title: "Syarat dan Ketentuan",
      body: (
        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
          <p><strong>1. Tanggung Jawab:</strong> Anda bertanggung jawab penuh atas legalitas barang yang diminta. Kami berhak menolak pesanan yang membahayakan atau melanggar hukum.</p>
          <p><strong>2. Eksekusi & Biaya:</strong> Estimasi harga final akan disepakati di WhatsApp. Waktu tiba bersifat estimasi tergantung kondisi lapangan (hujan/macet).</p>
          <p><strong>3. Pembatalan:</strong> Pembatalan harus dilakukan sebelum petugas bergerak. Jika petugas sudah membeli barang Anda menggunakan dana nalangan (jika ada), pembatalan sepihak tidak diterima dan wajib diganti.</p>
        </div>
      )
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" onClick={onClose} />
      <div className="bg-white rounded-[2rem] w-full max-w-lg max-h-[85vh] flex flex-col relative z-10 shadow-2xl reveal-elem revealed">
        <div className="p-6 md:p-8 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-heading font-bold text-2xl text-slate-900">{content[type].title}</h3>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-all">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 md:p-8 overflow-y-auto">
          {content[type].body}
        </div>
        <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-[2rem] text-right">
          <button onClick={onClose} className="px-8 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all hover:scale-105 shadow-md">
            Saya Mengerti
          </button>
        </div>
      </div>
    </div>
  );
};


