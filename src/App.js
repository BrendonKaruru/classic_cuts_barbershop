import React, { useState, useEffect } from 'react';
import './App.css';

// Inclusive Services Menu ($12 - $35 USD)
const SERVICES = [
  { id: 'gentlemen-cut', name: 'Classic Precision Cut', price: 15, duration: '45 mins', desc: 'Precision haircut for all ages & styles, sharp razor edging, scalp massage & hot towel refresh.' },
  { id: 'lanko-special', name: 'Lead Barber Lanko Signature Cut', price: 25, duration: '60 mins', desc: 'Master craftsmanship by Lanko. Tailored custom cut, beard sculpt/styling, hot towel steam & luxury finish.' },
  { id: 'beard-sculpt', name: 'Beard Sculpting & Razor Line', price: 15, duration: '30 mins', desc: 'Expert beard shaping, hot oil treatment, straight razor detailing, and aromatic conditioning balm.' },
  { id: 'executive-combo', name: 'Executive Grooming Package', price: 35, duration: '75 mins', desc: 'The ultimate royal treatment: Full haircut + Beard sculpt or Razor Shave + Scalp massage + Lounge beverage.' },
  { id: 'hot-towel-shave', name: 'Traditional Hot Towel Wet Shave', price: 20, duration: '45 mins', desc: 'Classic straight-razor shave with warm steam towels, rich lather shave, and post-shave balm.' },
  { id: 'junior-cut', name: 'Junior & Family Classic Cut', price: 12, duration: '30 mins', desc: 'Patient, gentle, and stylish haircut experience for young gentlemen & students.' }
];

// Actual Barbers Data with Real Images
const BARBERS = [
  { 
    id: 'lanko', 
    name: 'Barber Lanko', 
    role: 'Lead Master Barber', 
    experience: '14+ Years Experience', 
    bio: 'Renowned master barber in Harare. Signature cuts, precision razor lines, executive beard styling for gentlemen of all ages.', 
    img: '/Images/barbers/barber Lanko.jpg',
    isLead: true
  },
  { 
    id: 'kedha', 
    name: 'Barber Kedha', 
    role: 'Precision Fade Specialist', 
    experience: '9 Years Experience', 
    bio: 'Specialist in modern texture fades, skin tapers, crisp edge-ups, and classic cuts for every generation.', 
    img: '/Images/barbers/barber kedha.jpg',
    isLead: false
  },
  { 
    id: 'tc', 
    name: 'Barber TC', 
    role: 'Stylist & Beard Sculptor', 
    experience: '8 Years Experience', 
    bio: 'Expert in beard sculpting, sharp razor work, hot towel shaves, and personalized grooming experiences.', 
    img: '/Images/barbers/barber tc.jpg',
    isLead: false
  }
];

// Gallery Images of Real Work
const GALLERY_IMAGES = [
  { img: '/Images/people gettign haircuts/1.jpg', title: 'Crisp Taper Fade' },
  { img: '/Images/people gettign haircuts/2.jpg', title: 'Precision Line-Up' },
  { img: '/Images/people gettign haircuts/3.jpg', title: 'Gentleman Styling' },
  { img: '/Images/people gettign haircuts/4.jpg', title: 'Beard Sculpting' },
  { img: '/Images/people gettign haircuts/5.jpg', title: 'Classic Low Fade' },
  { img: '/Images/people gettign haircuts/6.jpg', title: 'Hot Towel Finish' }
];

// Real Authentic Reviews
const REVIEWS = [
  { name: 'Tinashe M.', role: 'Regular Executive Client', stars: 5, text: 'Lanko has been cutting my hair for 3 years now. Unmatched attention to detail, precision razor work, and true professionalism at Westgate!' },
  { name: 'Dr. Farai K.', role: 'Westgate Business Owner', stars: 5, text: 'Best barbershop experience in Harare. Clean environment, complimentary espresso, and Kedha gave me the cleanest taper fade.' },
  { name: 'Simbai C.', role: 'Father & Client', stars: 5, text: 'Brought my two sons for junior cuts. TC was super patient and gave them stylish haircuts. Highly recommended for families!' }
];

// Interactive FAQ Data
const FAQS = [
  { q: 'Do I need to book in advance or can I walk in?', a: 'Walk-ins are always welcome at Shop 213, Westgate Shopping Center! However, we strongly recommend reserving your seat online or via WhatsApp to guarantee zero wait time.' },
  { q: 'Where exactly is the shop located in Westgate?', a: 'We are located at Westgate Shopping Center, Shop Number 213, Harare. Convenient parking is available directly in front of the shop.' },
  { q: 'What payment methods do you accept?', a: 'We accept USD Cash, EcoCash, Zipit, and Visa/Mastercard payments.' }
];

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);
  
  // Promo Modal State
  const [showPromoModal, setShowPromoModal] = useState(false);
  
  // Booking Form State
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [selectedBarber, setSelectedBarber] = useState(BARBERS[0].id);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('10:00');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  // Booking Confirmation Modal
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const hasSeenPromo = sessionStorage.getItem('hasSeenPromo');
      if (!hasSeenPromo) {
        setShowPromoModal(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const closePromoModal = () => {
    setShowPromoModal(false);
    sessionStorage.setItem('hasSeenPromo', 'true');
  };

  // Handle Home Click & Smooth Scroll to Top
  const handleHomeClick = () => {
    setCurrentPage('home');
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !bookingDate || !bookingTime) {
      alert('Please fill in all required fields to complete your reservation.');
      return;
    }

    const serviceObj = SERVICES.find(s => s.id === selectedService);
    const barberObj = BARBERS.find(b => b.id === selectedBarber);

    const bookingDetails = {
      service: serviceObj.name,
      price: serviceObj.price,
      duration: serviceObj.duration,
      barber: barberObj.name,
      date: bookingDate,
      time: bookingTime,
      name: customerName,
      email: customerEmail,
      phone: customerPhone
    };

    setConfirmedBooking(bookingDetails);
  };

  const generateICSFile = () => {
    if (!confirmedBooking) return;

    const [year, month, day] = confirmedBooking.date.split('-');
    const [hours, minutes] = confirmedBooking.time.split(':');
    
    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + 45 * 60000);

    const formatDateStr = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Classic Cuts Barbershop//NONSGML v1.0//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Classic Cuts Appointment - ${confirmedBooking.service}`,
      `DESCRIPTION:Appointment with ${confirmedBooking.barber} at Classic Cuts Barbershop.\\nCustomer: ${confirmedBooking.name}\\nPhone: ${confirmedBooking.phone}`,
      `LOCATION:Shop Number 213, Westgate Shopping Center, Harare, Zimbabwe`,
      `DTSTART:${formatDateStr(startDate)}`,
      `DTEND:${formatDateStr(endDate)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Classic_Cuts_Appointment_${confirmedBooking.date}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateGoogleCalendarUrl = () => {
    if (!confirmedBooking) return '#';
    const [year, month, day] = confirmedBooking.date.split('-');
    const [hours, minutes] = confirmedBooking.time.split(':');

    const startDate = new Date(year, month - 1, day, hours, minutes);
    const endDate = new Date(startDate.getTime() + 45 * 60000);

    const formatGCalDate = (date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, '');
    };

    const title = encodeURIComponent(`Classic Cuts Barbershop - ${confirmedBooking.service}`);
    const details = encodeURIComponent(`Barber: ${confirmedBooking.barber}\nCustomer: ${confirmedBooking.name}\nPhone: ${confirmedBooking.phone}`);
    const location = encodeURIComponent(`Shop 213, Westgate Shopping Center, Harare, Zimbabwe`);
    const dates = `${formatGCalDate(startDate)}/${formatGCalDate(endDate)}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const navigateToBookingWithService = (serviceId) => {
    setSelectedService(serviceId);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="app-container">
      {/* Top Announcement Bar */}
      <div className="top-bar">
        <div className="top-bar-info">
          <span className="top-bar-item"><i className="fa-solid fa-location-dot gold-text"></i> Westgate Shopping Center, Shop 213</span>
          <span className="top-bar-item"><i className="fa-solid fa-phone gold-text"></i> +263 71 878 6349 / +263 77 730 5046</span>
        </div>
        <div className="status-badge">
          <span className="pulse-dot"></span> OPEN TODAY • WALK-INS WELCOME
        </div>
      </div>

      {/* Responsive Navbar with Unsquashed Brand Container */}
      <header className="navbar">
        <a href="#home" className="navbar-brand" onClick={handleHomeClick}>
          <img src="/Images/Logo/Logooo.png" alt="Classic Cuts Logo" className="brand-logo-img" />
          <div className="brand-text-container">
            <span className="brand-title">Classic Cuts</span>
            <span className="brand-sub">PREMIER BARBERSHOP</span>
          </div>
        </a>

        <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <button className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={handleHomeClick}>
              Home
            </button>
          </li>
          <li>
            <button className={`nav-link ${currentPage === 'services' ? 'active' : ''}`} onClick={() => { setCurrentPage('services'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Services & Rates
            </button>
          </li>
          <li>
            <button className={`nav-link ${currentPage === 'barbers' ? 'active' : ''}`} onClick={() => { setCurrentPage('barbers'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Barbers & Gallery
            </button>
          </li>
          <li>
            <button className={`nav-link ${currentPage === 'terms' ? 'active' : ''}`} onClick={() => { setCurrentPage('terms'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              Terms
            </button>
          </li>
          <li>
            <button className="btn-primary" onClick={() => { setCurrentPage('booking'); setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
              <i className="fa-solid fa-calendar-check"></i> Book Appointment
            </button>
          </li>
        </ul>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Navigation Menu">
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </header>

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div>
            {/* Sleek Hero Section */}
            <section className="hero-section">
              <div className="hero-content">
                <span className="hero-badge">
                  <i className="fa-solid fa-crown"></i> Zimbabwe's Premier Barber Lounge
                </span>
                <h1 className="hero-title">
                  Luxury Barbering, <br /><span className="gold-text">Crafted For Everyone</span>
                </h1>
                <p className="hero-subtitle">
                  Step into <strong>Classic Cuts Barbershop</strong> for an authentic, premium grooming experience at Westgate Shopping Center. Led by Master Barber <strong>Lanko</strong>, we offer precision fades, hot towel shaves, and custom styling starting from $15+.
                </p>
                <div className="hero-cta-group">
                  <button className="btn-primary" onClick={() => navigateToBookingWithService(SERVICES[0].id)}>
                    <i className="fa-solid fa-scissors"></i> Reserve Your Appointment
                  </button>
                  <button className="btn-secondary" onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Explore Menu & Pricing ($15+)
                  </button>
                </div>
              </div>
            </section>

            {/* Human Features Strip */}
            <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
              <div className="features-strip">
                <div className="feature-box">
                  <i className="fa-solid fa-user-check feature-icon"></i>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>Lead Barber Lanko</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>14+ Years Master Experience</p>
                </div>
                <div className="feature-box">
                  <i className="fa-solid fa-mug-hot feature-icon"></i>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>Lounge Hospitality</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Complimentary Drinks & Wi-Fi</p>
                </div>
                <div className="feature-box">
                  <i className="fa-solid fa-location-dot feature-icon"></i>
                  <h4 style={{ color: 'var(--text-main)', marginBottom: '4px' }}>Westgate Shop 213</h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Convenient Safe Parking</p>
                </div>
              </div>
            </section>

            {/* Barber Team Highlight */}
            <section className="section">
              <div className="section-header">
                <span className="section-subtitle">Master Craftsmen</span>
                <h2 className="section-title">Meet Lead Barber Lanko & Team</h2>
              </div>

              <div className="barbers-grid">
                {BARBERS.map(barber => (
                  <div key={barber.id} className="barber-card">
                    <div className="barber-img-wrapper">
                      <img src={barber.img} alt={barber.name} className="barber-img" />
                      {barber.isLead && <span className="barber-badge-lead">Lead Barber</span>}
                    </div>
                    <div className="barber-info">
                      <h3 className="barber-name">{barber.name}</h3>
                      <div className="barber-role">{barber.role}</div>
                      <p className="barber-bio">{barber.bio}</p>
                      <button className="btn-secondary" style={{ marginTop: '1.2rem', width: '100%' }} onClick={() => { setSelectedBarber(barber.id); setCurrentPage('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                        Book with {barber.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Services Preview */}
            <section className="section" style={{ background: '#171211' }}>
              <div className="section-header">
                <span className="section-subtitle">Grooming Packages</span>
                <h2 className="section-title">Featured Services (From $15+)</h2>
              </div>
              <div className="services-grid">
                {SERVICES.slice(0, 3).map(service => (
                  <div key={service.id} className="service-card">
                    <div>
                      <div className="service-header">
                        <h3 className="service-name">{service.name}</h3>
                        <span className="service-price">${service.price}</span>
                      </div>
                      <p className="service-desc">{service.desc}</p>
                    </div>
                    <div>
                      <div className="service-meta">
                        <span><i className="fa-regular fa-clock"></i> {service.duration}</span>
                        <span><i className="fa-solid fa-circle-check gold-text"></i> Hot Towel Included</span>
                      </div>
                      <button className="btn-primary" style={{ width: '100%', marginTop: '1.2rem' }} onClick={() => navigateToBookingWithService(service.id)}>
                        Book This Cut
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                <button className="btn-secondary" onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  View Full Menu & Rates <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </section>

            {/* Haircut Portfolio Gallery */}
            <section className="section">
              <div className="section-header">
                <span className="section-subtitle">Real Results</span>
                <h2 className="section-title">Fresh Cuts & Styling Portfolio</h2>
              </div>
              <div className="gallery-grid">
                {GALLERY_IMAGES.map((item, idx) => (
                  <div key={idx} className="gallery-item">
                    <img src={item.img} alt={item.title} className="gallery-img" />
                    <div className="gallery-overlay">
                      <span className="brand-font" style={{ color: 'var(--gold-primary)', fontWeight: '800', fontSize: '1rem' }}>{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Genuine Client Reviews Section */}
            <section className="section" style={{ background: '#171211' }}>
              <div className="section-header">
                <span className="section-subtitle">Client Stories</span>
                <h2 className="section-title">What Our Clients Say</h2>
              </div>

              <div className="reviews-grid">
                {REVIEWS.map((rev, idx) => (
                  <div key={idx} className="review-card">
                    <div className="stars">
                      {[...Array(rev.stars)].map((_, i) => (
                        <i key={i} className="fa-solid fa-star" style={{ marginRight: '3px' }}></i>
                      ))}
                    </div>
                    <p className="review-text">"{rev.text}"</p>
                    <div className="reviewer-name">{rev.name}</div>
                    <div className="reviewer-meta">{rev.role}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Interactive FAQ Section */}
            <section className="section">
              <div className="section-header">
                <span className="section-subtitle">Got Questions?</span>
                <h2 className="section-title">Frequently Asked Questions</h2>
              </div>

              <div className="faq-list">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="faq-item">
                    <button className="faq-question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                      <span>{faq.q}</span>
                      <i className={`fa-solid ${activeFaq === idx ? 'fa-minus' : 'fa-plus'}`} style={{ color: 'var(--gold-primary)' }}></i>
                    </button>
                    {activeFaq === idx && (
                      <div className="faq-answer">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* SERVICES PAGE */}
        {currentPage === 'services' && (
          <div className="section" style={{ paddingTop: '5rem' }}>
            <div className="section-header">
              <span className="section-subtitle">Transparent Pricing</span>
              <h2 className="section-title">Services & Pricing Menu</h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0.5rem auto 0 auto', fontSize: '1rem' }}>
                Every service includes precision edging, warm towel refresh, and hair/scalp consultation. Prices starting from $12 - $35 USD.
              </p>
            </div>

            <div className="services-grid">
              {SERVICES.map(service => (
                <div key={service.id} className="service-card">
                  <div>
                    <div className="service-header">
                      <h3 className="service-name">{service.name}</h3>
                      <span className="service-price">${service.price}</span>
                    </div>
                    <p className="service-desc">{service.desc}</p>
                  </div>
                  <div>
                    <div className="service-meta">
                      <span><i className="fa-regular fa-clock"></i> {service.duration}</span>
                      <span><i className="fa-solid fa-gem gold-text"></i> Luxury Finish</span>
                    </div>
                    <button className="btn-primary" style={{ width: '100%', marginTop: '1.2rem' }} onClick={() => navigateToBookingWithService(service.id)}>
                      Select & Book
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BARBERS & GALLERY PAGE */}
        {currentPage === 'barbers' && (
          <div className="section" style={{ paddingTop: '5rem' }}>
            <div className="section-header">
              <span className="section-subtitle">Craftsmen & Work</span>
              <h2 className="section-title">Barbers & Style Gallery</h2>
            </div>

            <div className="barbers-grid" style={{ marginBottom: '4rem' }}>
              {BARBERS.map(barber => (
                <div key={barber.id} className="barber-card">
                  <div className="barber-img-wrapper">
                    <img src={barber.img} alt={barber.name} className="barber-img" />
                    {barber.isLead && <span className="barber-badge-lead">Lead Barber</span>}
                  </div>
                  <div className="barber-info">
                    <h3 className="barber-name">{barber.name}</h3>
                    <div className="barber-role">{barber.role} • {barber.experience}</div>
                    <p className="barber-bio">{barber.bio}</p>
                    <button className="btn-primary" style={{ marginTop: '1.2rem', width: '100%' }} onClick={() => { setSelectedBarber(barber.id); setCurrentPage('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                      Book with {barber.name}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="section-header">
              <span className="section-subtitle">Portfolio</span>
              <h2 className="section-title">Client Transformations</h2>
            </div>

            <div className="gallery-grid">
              {GALLERY_IMAGES.map((item, idx) => (
                <div key={idx} className="gallery-item">
                  <img src={item.img} alt={item.title} className="gallery-img" />
                  <div className="gallery-overlay">
                    <span className="brand-font" style={{ color: 'var(--gold-primary)', fontWeight: '800', fontSize: '1rem' }}>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOKING PAGE */}
        {currentPage === 'booking' && (
          <div className="section" style={{ paddingTop: '5rem' }}>
            <div className="section-header">
              <span className="section-subtitle">Online Reservations</span>
              <h2 className="section-title">Reserve Your Seat</h2>
              <p style={{ color: 'var(--text-muted)' }}>Shop 213, Westgate Shopping Center, Harare, Zimbabwe</p>
            </div>

            <div style={{ maxWidth: '750px', margin: '0 auto' }}>
              <div className="booking-card">
                <form onSubmit={handleBookingSubmit}>
                  <div className="form-group">
                    <label className="form-label"><i className="fa-solid fa-scissors"></i> Choose Grooming Service</label>
                    <select className="form-select" value={selectedService} onChange={(e) => setSelectedService(e.target.value)}>
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.id}>{s.name} (${s.price} USD • {s.duration})</option>
                      ))}
                    </select>
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label"><i className="fa-solid fa-user-ninja"></i> Preferred Barber</label>
                      <select className="form-select" value={selectedBarber} onChange={(e) => setSelectedBarber(e.target.value)}>
                        {BARBERS.map(b => (
                          <option key={b.id} value={b.id}>{b.name} ({b.role})</option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label"><i className="fa-regular fa-calendar"></i> Preferred Date</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        required
                        value={bookingDate} 
                        onChange={(e) => setBookingDate(e.target.value)} 
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label"><i className="fa-regular fa-clock"></i> Time Slot</label>
                    <select className="form-select" value={bookingTime} onChange={(e) => setBookingTime(e.target.value)}>
                      <option value="08:30">08:30 AM</option>
                      <option value="09:30">09:30 AM</option>
                      <option value="10:30">10:30 AM</option>
                      <option value="11:30">11:30 AM</option>
                      <option value="13:00">01:00 PM</option>
                      <option value="14:30">02:30 PM</option>
                      <option value="16:00">04:00 PM</option>
                      <option value="17:30">05:30 PM</option>
                    </select>
                  </div>

                  <hr style={{ borderColor: 'var(--border-muted)', margin: '1.8rem 0' }} />

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. John Doe"
                      required
                      value={customerName} 
                      onChange={(e) => setCustomerName(e.target.value)} 
                    />
                  </div>

                  <div className="grid-2">
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input 
                        type="email" 
                        className="form-control" 
                        placeholder="john@example.com"
                        required
                        value={customerEmail} 
                        onChange={(e) => setCustomerEmail(e.target.value)} 
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">WhatsApp / Phone *</label>
                      <input 
                        type="tel" 
                        className="form-control" 
                        placeholder="+263 71 878 6349"
                        required
                        value={customerPhone} 
                        onChange={(e) => setCustomerPhone(e.target.value)} 
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1.1rem' }}>
                    Confirm & Reserve Seat
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TERMS PAGE */}
        {currentPage === 'terms' && (
          <div className="section" style={{ paddingTop: '5rem', maxWidth: '850px' }}>
            <div className="section-header">
              <span className="section-subtitle">Legal & Policies</span>
              <h2 className="section-title">Terms & Conditions</h2>
            </div>

            <div style={{ background: '#231B19', padding: '2.5rem', borderRadius: '6px', border: '1px solid var(--border-gold)', color: 'var(--text-muted)' }}>
              <h3 style={{ color: 'var(--gold-primary)', marginBottom: '0.8rem' }}>1. Shop Arrival & Punctuality</h3>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
                We operate on structured appointment schedules at Shop 213, Westgate Shopping Center. Please arrive 5 to 10 minutes prior to your reserved time slot. Late arrivals beyond 15 minutes may be subject to rescheduling.
              </p>

              <h3 style={{ color: 'var(--gold-primary)', marginBottom: '0.8rem' }}>2. Booking & Cancellation Policy</h3>
              <p style={{ marginBottom: '1.5rem', lineHeight: '1.7' }}>
                Cancellations or appointment adjustments can be made up to 2 hours before your scheduled appointment time via WhatsApp (+263 71 878 6349) or direct phone call (+263 77 730 5046).
              </p>

              <h3 style={{ color: 'var(--gold-primary)', marginBottom: '0.8rem' }}>3. Quality & Satisfaction Guarantee</h3>
              <p style={{ lineHeight: '1.7' }}>
                Lead Barber Lanko and our entire team are committed to 100% client satisfaction. Any minor touch-up or styling adjustment requested within 24 hours of your service will be completed with our compliments.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* PROMO / SPECIAL OFFER MODAL */}
      {showPromoModal && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <button className="modal-close" onClick={closePromoModal} aria-label="Close modal">
              <i className="fa-solid fa-xmark"></i>
            </button>
            <div style={{ textAlign: 'center' }}>
              <span className="hero-badge"><i className="fa-solid fa-crown"></i> Welcome Special Offer</span>
              <h3 className="brand-font" style={{ fontSize: '1.8rem', color: 'var(--gold-primary)', margin: '0.8rem 0' }}>
                15% OFF Executive Cuts
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.8rem', lineHeight: '1.7', fontSize: '0.95rem' }}>
                Experience luxury barbering by Lead Barber <strong>Lanko</strong> & team at Westgate (Shop 213). Book online today and mention code <strong style={{ color: 'var(--gold-light)' }}>CLASSIC15</strong> upon arrival.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => { closePromoModal(); setCurrentPage('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                  Claim Offer & Book
                </button>
                <button className="btn-secondary" onClick={closePromoModal}>
                  Explore Site
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING SUCCESS & CALENDAR SYNC MODAL */}
      {confirmedBooking && (
        <div className="modal-backdrop">
          <div className="modal-card">
            <div className="success-box">
              <i className="fa-solid fa-circle-check success-icon"></i>
              <h3 className="brand-font" style={{ fontSize: '1.8rem', color: '#ffffff', marginBottom: '0.4rem' }}>
                Reservation Confirmed!
              </h3>
              <p style={{ color: 'var(--gold-primary)', fontWeight: '700', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Thank you, {confirmedBooking.name}. We look forward to receiving you at Classic Cuts.
              </p>

              <div style={{ background: 'rgba(18, 14, 13, 0.9)', padding: '1.2rem', borderRadius: '6px', border: '1px solid var(--border-gold)', textAlign: 'left', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
                <p style={{ marginBottom: '6px' }}><strong>Service:</strong> {confirmedBooking.service} (${confirmedBooking.price} USD)</p>
                <p style={{ marginBottom: '6px' }}><strong>Barber:</strong> {confirmedBooking.barber}</p>
                <p style={{ marginBottom: '6px' }}><strong>Date & Time:</strong> {confirmedBooking.date} at {confirmedBooking.time}</p>
                <p><strong>Location:</strong> Shop 213, Westgate Shopping Center, Harare</p>
              </div>

              <h4 style={{ fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--gold-primary)', marginBottom: '0.8rem' }}>
                Add to your Calendar:
              </h4>

              <div className="calendar-actions">
                <a 
                  href={generateGoogleCalendarUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-cal btn-gcal"
                >
                  <i className="fa-brands fa-google"></i> Google Calendar Sync
                </a>

                <button 
                  onClick={generateICSFile} 
                  className="btn-cal btn-ical"
                >
                  <i className="fa-solid fa-calendar-plus"></i> Apple / Outlook (.ics) Export
                </button>
              </div>

              <button 
                className="btn-secondary" 
                style={{ width: '100%', marginTop: '1.5rem' }} 
                onClick={() => setConfirmedBooking(null)}
              >
                Close & Return
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="navbar-brand" style={{ marginBottom: '1rem' }} onClick={handleHomeClick}>
              <img src="/Images/Logo/Logooo.png" alt="Classic Cuts Logo" className="brand-logo-img" />
              <div className="brand-text-container">
                <span className="brand-title" style={{ fontSize: '1.1rem' }}>Classic Cuts</span>
                <span className="brand-sub">BARBERSHOP</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              Premier vintage luxury barbershop. Crafting timeless cuts, executive fades, and straight razor shaves for everyone.
            </p>
            <div className="social-icons">
              <a href="#instagram" className="social-icon" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
              <a href="#facebook" className="social-icon" aria-label="Facebook"><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#whatsapp" className="social-icon" aria-label="WhatsApp"><i className="fa-brands fa-whatsapp"></i></a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Quick Navigation</h4>
            <ul className="footer-links">
              <li><a href="#home" onClick={handleHomeClick}>Home Lounge</a></li>
              <li><a href="#services" onClick={() => { setCurrentPage('services'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Services & Pricing Menu</a></li>
              <li><a href="#barbers" onClick={() => { setCurrentPage('barbers'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Our Master Barbers</a></li>
              <li><a href="#booking" onClick={() => { setCurrentPage('booking'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Book Haircut</a></li>
              <li><a href="#terms" onClick={() => { setCurrentPage('terms'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>Terms & Conditions</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Location & Hours</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.8rem' }}>
              <i className="fa-solid fa-location-dot gold-text"></i> Westgate Shopping Center, Shop 213, Harare, Zimbabwe
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.4rem' }}>
              Mon - Sat: 08:00 AM - 06:30 PM
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Sunday: 09:00 AM - 04:00 PM
            </p>
          </div>

          <div className="footer-col">
            <h4>Contact Barbershop</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
              <i className="fa-solid fa-phone gold-text"></i> +263 71 878 6349
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.6rem' }}>
              <i className="fa-solid fa-phone gold-text"></i> +263 77 730 5046
            </p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <i className="fa-solid fa-envelope gold-text"></i> info@classiccuts.co.zw
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; 2026 Classic Cuts Barbershop. All Rights Reserved.</span>
          <span>Designed & Developed by <strong style={{ color: 'var(--gold-primary)' }}>Brendon Karuru</strong></span>
        </div>
      </footer>
    </div>
  );
}

export default App;
