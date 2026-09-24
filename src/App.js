import React, { useState, useEffect } from 'react';
import './App.css';

// Master Services Menu (Prices in USD $, Starting $15+)
const SERVICES = [
  { id: 'gentlemen-cut', name: 'Classic Gentleman Haircut', price: 15, duration: '45 mins', desc: 'Precision tailor-made haircut, razor finish line-up, scalp massage & hot towel refresh.' },
  { id: 'lanko-special', name: 'Lead Barber Lanko Signature Cut', price: 25, duration: '60 mins', desc: 'Master craftsmanship cut by Lanko. Includes custom fade, beard sculpt, hot towel steam & luxury treatment.' },
  { id: 'beard-sculpt', name: 'Beard Sculpting & Razor Line', price: 15, duration: '30 mins', desc: 'Expert beard shaping, hot oil massage, straight razor detailing, and aromatic beard balm finish.' },
  { id: 'executive-combo', name: 'Executive Grooming Package', price: 35, duration: '75 mins', desc: 'The ultimate gentleman service: Haircut + Beard trim or Razor Shave + Scalp Treatment + Complimentary Drink.' },
  { id: 'hot-towel-shave', name: 'Traditional Hot Towel Wet Shave', price: 20, duration: '45 mins', desc: 'Classic straight-razor shave with warm steam towels, rich lather, and post-shave moisturizer.' },
  { id: 'junior-cut', name: 'Junior Classic Cut (Under 12)', price: 12, duration: '30 mins', desc: 'Patient, stylish, and sharp haircut experience for young gentlemen.' }
];

// Actual Barbers Data with Real Images
const BARBERS = [
  { 
    id: 'lanko', 
    name: 'Barber Lanko', 
    role: 'Lead Master Barber', 
    experience: '14+ Years Experience', 
    bio: 'Renowned master barber in Harare & Westgate. Signature cuts, precision razor lines, executive beard styling.', 
    img: '/Images/barbers/barber Lanko.jpg',
    isLead: true
  },
  { 
    id: 'kedha', 
    name: 'Barber Kedha', 
    role: 'Precision Fade Specialist', 
    experience: '9 Years Experience', 
    bio: 'Specialist in modern texture fades, skin tapers, crisp edge-ups, and modern gentleman haircuts.', 
    img: '/Images/barbers/barber kedha.jpg',
    isLead: false
  },
  { 
    id: 'tc', 
    name: 'Barber TC', 
    role: 'Stylist & Beard Sculptor', 
    experience: '8 Years Experience', 
    bio: 'Expert in beard sculpting, sharp razor work, hot towel shaves, and personalized grooming.', 
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

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
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
    // Show promo modal after 2 seconds
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

  // iCal / Apple Calendar Generator
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
      'PRODID:-//Classic Cuts Barbershop Zimbabwe//NONSGML v1.0//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Classic Cuts Barber Appointment - ${confirmedBooking.service}`,
      `DESCRIPTION:Appointment with ${confirmedBooking.barber} at Classic Cuts Barbershop.\\nCustomer: ${confirmedBooking.name}\\nPhone: ${confirmedBooking.phone}`,
      `LOCATION:Westgate Shopping Center, Shop 213, Harare, Zimbabwe`,
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

  // Google Calendar Link Generator
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
    const location = encodeURIComponent(`Westgate Shopping Center Shop 213, Harare, Zimbabwe`);
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
      {/* Navigation Header */}
      <header className="navbar">
        <a href="#home" className="navbar-brand" onClick={() => setCurrentPage('home')}>
          <img src="/Images/Logo/Logooo.png" alt="Classic Cuts Logo" className="brand-logo-img" />
          <div>
            <span className="brand-title">Classic Cuts</span>
            <span className="brand-sub">WESTGATE • ZIMBABWE</span>
          </div>
        </a>

        <ul className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <li>
            <button className={`nav-link ${currentPage === 'home' ? 'active' : ''}`} onClick={() => { setCurrentPage('home'); setMobileMenuOpen(false); }}>
              Home
            </button>
          </li>
          <li>
            <button className={`nav-link ${currentPage === 'services' ? 'active' : ''}`} onClick={() => { setCurrentPage('services'); setMobileMenuOpen(false); }}>
              Services & Rates
            </button>
          </li>
          <li>
            <button className={`nav-link ${currentPage === 'barbers' ? 'active' : ''}`} onClick={() => { setCurrentPage('barbers'); setMobileMenuOpen(false); }}>
              Barbers & Gallery
            </button>
          </li>
          <li>
            <button className={`nav-link ${currentPage === 'terms' ? 'active' : ''}`} onClick={() => { setCurrentPage('terms'); setMobileMenuOpen(false); }}>
              Terms
            </button>
          </li>
          <li>
            <button className="btn-primary" onClick={() => { setCurrentPage('booking'); setMobileMenuOpen(false); }}>
              <i className="fa-solid fa-calendar-check"></i> Book Appointment
            </button>
          </li>
        </ul>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle Navigation Menu">
          <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
        </button>
      </header>

      {/* Main Page Routing Content */}
      <main style={{ flex: 1 }}>
        {/* HOME PAGE */}
        {currentPage === 'home' && (
          <div>
            {/* Hero Banner */}
            <section className="hero-section">
              <div className="hero-content">
                <span className="hero-badge">
                  <i className="fa-solid fa-crown"></i> Zimbabwe's Premier Barber Lounge
                </span>
                <h1 className="hero-title">
                  Luxury Barbering, <br /><span className="gold-text">Crafted For Leaders</span>
                </h1>
                <p className="hero-subtitle">
                  Welcome to <strong>Classic Cuts Barbershop</strong> at Westgate Shopping Center. Led by Master Barber <strong>Lanko</strong>, we blend luxury vintage sophistication with sharp precision haircuts starting from $15+.
                </p>
                <div className="hero-cta-group">
                  <button className="btn-primary" onClick={() => setCurrentPage('booking')}>
                    <i className="fa-solid fa-scissors"></i> Book Your Experience
                  </button>
                  <button className="btn-secondary" onClick={() => setCurrentPage('services')}>
                    View Menu & Rates
                  </button>
                </div>
              </div>
            </section>

            {/* Barber Lead Feature Highlight */}
            <section className="section" style={{ background: '#191412' }}>
              <div className="section-header">
                <span className="section-subtitle">Master Craftsmanship</span>
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
                      <button className="btn-secondary" style={{ marginTop: '1.2rem', width: '100%' }} onClick={() => { setSelectedBarber(barber.id); setCurrentPage('booking'); }}>
                        Book with {barber.name}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Featured Services Preview */}
            <section className="section">
              <div className="section-header">
                <span className="section-subtitle">Grooming Packages</span>
                <h2 className="section-title">Popular Services (From $15+)</h2>
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
                        <span><i className="fa-solid fa-circle-check gold-text"></i> Luxury Treatment</span>
                      </div>
                      <button className="btn-primary" style={{ width: '100%', marginTop: '1.2rem' }} onClick={() => navigateToBookingWithService(service.id)}>
                        Book This Cut
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
                <button className="btn-secondary" onClick={() => setCurrentPage('services')}>
                  View Complete Pricing Menu <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </section>

            {/* Cut Gallery Section */}
            <section className="section" style={{ background: '#191412' }}>
              <div className="section-header">
                <span className="section-subtitle">Real Results</span>
                <h2 className="section-title">Fresh Cuts & Precision Lines</h2>
              </div>
              <div className="gallery-grid">
                {GALLERY_IMAGES.map((item, idx) => (
                  <div key={idx} className="gallery-item">
                    <img src={item.img} alt={item.title} className="gallery-img" />
                    <div className="gallery-overlay">
                      <span className="brand-font" style={{ color: 'var(--gold-primary)', fontWeight: '700' }}>{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* SERVICES PAGE */}
        {currentPage === 'services' && (
          <div className="section" style={{ paddingTop: '9rem' }}>
            <div className="section-header">
              <span className="section-subtitle">Transparent Pricing</span>
              <h2 className="section-title">Services & Pricing Menu</h2>
              <p style={{ color: 'var(--text-muted)', maxWidth: '650px', margin: '0.6rem auto 0 auto' }}>
                All services include razor finish, warm towel refresh, and scalp consultation. Prices starting from $12 - $35 USD.
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
          <div className="section" style={{ paddingTop: '9rem' }}>
            <div className="section-header">
              <span className="section-subtitle">Craftsmen & Work</span>
              <h2 className="section-title">Barbers & Style Gallery</h2>
            </div>

            <div className="barbers-grid" style={{ marginBottom: '5rem' }}>
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
                    <button className="btn-primary" style={{ marginTop: '1.2rem', width: '100%' }} onClick={() => { setSelectedBarber(barber.id); setCurrentPage('booking'); }}>
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
                    <span className="brand-font" style={{ color: 'var(--gold-primary)', fontWeight: '700' }}>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BOOKING PAGE */}
        {currentPage === 'booking' && (
          <div className="section" style={{ paddingTop: '9rem' }}>
            <div className="section-header">
              <span className="section-subtitle">Westgate Location</span>
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

                  <hr style={{ borderColor: 'var(--border-muted)', margin: '2rem 0' }} />

                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="e.g. Brendon Karuru"
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
                        placeholder="brendon@example.com"
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

                  <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1.2rem' }}>
                    Confirm & Reserve Seat
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* TERMS PAGE */}
        {currentPage === 'terms' && (
          <div className="section" style={{ paddingTop: '9rem', maxWidth: '900px' }}>
            <div className="section-header">
              <span className="section-subtitle">Legal & Policies</span>
              <h2 className="section-title">Terms & Conditions</h2>
            </div>

            <div style={{ background: 'var(--bg-card)', padding: '2.8rem', borderRadius: '4px', border: '1px solid var(--border-muted)', color: 'var(--text-muted)' }}>
              <h3 style={{ color: 'var(--gold-primary)', marginBottom: '1rem' }}>1. Shop Rules & Punctuality</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                We operate on strict appointment schedules at Shop 213, Westgate Shopping Center. Please arrive 5 minutes prior to your scheduled time. Late arrivals beyond 15 minutes may be subject to rescheduling.
              </p>

              <h3 style={{ color: 'var(--gold-primary)', marginBottom: '1rem' }}>2. Booking & Cancellations</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Cancellations can be made up to 2 hours before the scheduled haircut via WhatsApp (+263718786349) or call (+263777305046).
              </p>

              <h3 style={{ color: 'var(--gold-primary)', marginBottom: '1rem' }}>3. Quality Guarantee</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Lead Barber Lanko and our team guarantee total client satisfaction. Any styling adjustments requested within 24 hours of your appointment will be honored free of charge.
              </p>

              <h3 style={{ color: 'var(--gold-primary)', marginBottom: '1rem' }}>4. Development Credits</h3>
              <p>
                Website conceptualized, designed, and engineered by <strong>Brendon Karuru</strong>.
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
              <span className="hero-badge"><i className="fa-solid fa-crown"></i> Westgate Special Offer</span>
              <h3 className="brand-font" style={{ fontSize: '2rem', color: 'var(--gold-primary)', margin: '1rem 0' }}>
                15% OFF Executive Cuts
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: '1.7' }}>
                Experience luxury barbering by Lead Barber <strong>Lanko</strong> & team at Westgate Shopping Center (Shop 213). Book online today and mention code <strong style={{ color: 'var(--gold-light)' }}>WESTGATE15</strong> upon arrival.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn-primary" onClick={() => { closePromoModal(); setCurrentPage('booking'); }}>
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
              <h3 className="brand-font" style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                Reservation Confirmed!
              </h3>
              <p style={{ color: 'var(--gold-primary)', fontWeight: '600', marginBottom: '1.5rem' }}>
                Thank you, {confirmedBooking.name}. We look forward to receiving you at Westgate.
              </p>

              <div style={{ background: '#191412', padding: '1.5rem', borderRadius: '4px', border: '1px solid var(--border-gold)', textAlign: 'left', marginBottom: '1.8rem', fontSize: '0.92rem' }}>
                <p style={{ marginBottom: '6px' }}><strong>Service:</strong> {confirmedBooking.service} (${confirmedBooking.price} USD)</p>
                <p style={{ marginBottom: '6px' }}><strong>Barber:</strong> {confirmedBooking.barber}</p>
                <p style={{ marginBottom: '6px' }}><strong>Date & Time:</strong> {confirmedBooking.date} at {confirmedBooking.time}</p>
                <p><strong>Location:</strong> Shop 213, Westgate Shopping Center, Harare</p>
              </div>

              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--gold-primary)', marginBottom: '1rem' }}>
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
                style={{ width: '100%', marginTop: '1.8rem' }} 
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
            <div className="navbar-brand" style={{ marginBottom: '1.2rem' }}>
              <img src="/Images/Logo/Logooo.png" alt="Classic Cuts Logo" className="brand-logo-img" />
              <div>
                <span className="brand-title" style={{ fontSize: '1.1rem' }}>Classic Cuts</span>
                <span className="brand-sub">WESTGATE • HARARE</span>
              </div>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              Zimbabwe’s premier vintage luxury barbershop. Crafting timeless cuts, executive fades, and straight razor shaves.
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
              <li><a href="#home" onClick={() => setCurrentPage('home')}>Home Lounge</a></li>
              <li><a href="#services" onClick={() => setCurrentPage('services')}>Services & Pricing Menu</a></li>
              <li><a href="#barbers" onClick={() => setCurrentPage('barbers')}>Our Master Barbers</a></li>
              <li><a href="#booking" onClick={() => setCurrentPage('booking')}>Book Haircut</a></li>
              <li><a href="#terms" onClick={() => setCurrentPage('terms')}>Terms & Conditions</a></li>
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
