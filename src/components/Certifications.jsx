import React, { useState, useEffect } from 'react'
import { FaAward, FaExternalLinkAlt, FaTimes, FaExpand } from 'react-icons/fa'
import { SiGoogle } from 'react-icons/si'

const baseCertificationsData = [
  // Hackathons
  { id: '1YG9MutlUK3s2c6VCuqDl4-zmsLjLheev', category: 'Hackathons', title: 'Certificate of Participation', event: 'CONVOLVE 4.0 - Pan-IIT AI/ML Hackathon', issuer: 'IIT Guwahati', subIssuer: 'Unstop', date: '2025', color: '#06b6d4', emoji: '🏆', tags: ['AI/ML', 'IIT', 'Hackathon'] },
  { id: '1dZX4n7jC2ZFaCGFymZbceHyMnahZYii4', category: 'Hackathons', title: 'Certificate of Merit', event: 'CONVOLVE 4.0 - Generative AI Track', issuer: 'IIT Guwahati', subIssuer: 'Semi-Finalist', date: '2026', color: '#0ea5e9', emoji: '🏅', tags: ['GenAI', 'Merit', 'Semi-Finalist'] },
  { id: '1vFpe6m2WvwHcEw-QWZaUGP4Pccv0tue2', category: 'Hackathons', title: 'Certificate of Participation', event: 'Byte Quest AI Vibe Coding Challenge', issuer: 'Ramdeobaba University', subIssuer: '24 Hrs Hackathon', date: '2026', color: '#10b981', emoji: '💻', tags: ['24Hrs', 'AI Coding'] },
  { id: '1eIqQhZ7Q4_BOp21ehkyyJgAlT4kbjMKm', category: 'Hackathons', title: 'Certificate of Participation', event: 'Kurukshetra\'26 - K!ODE WARS', issuer: 'Anna University (CEG)', subIssuer: '', date: '2026', color: '#a855f7', emoji: '⚔️', tags: ['Coding', 'Algorithms'] },
  { id: '1o7Rm5mFj2vbTguAIhDq7xngT2MIjZJJL', category: 'Hackathons', title: 'Certificate of Participation', event: 'Kurukshetra\'26 - Design Hack!s', issuer: 'Anna University (CEG)', subIssuer: '', date: '2026', color: '#ec4899', emoji: '🎨', tags: ['Design', 'Hackathon'] },
  { id: '1v2Ar-J6n2U_fnqZnIG5rHuDyPYTzgFbD', category: 'Hackathons', title: 'Certificate of Participation', event: 'Conscientia 2025 - HACKORBITAL', issuer: 'IIST', subIssuer: '', date: '2025', color: '#14b8a6', emoji: '🚀', tags: ['Space Tech', 'Hackathon'] },
  { id: '1nJS1qGl6cquIWtiPnU2IZANp4ekJk_Nq', category: 'Hackathons', title: 'Certificate of Participation', event: 'CodeFest\'26 - Vista', issuer: 'IIT Varanasi (BHU)', subIssuer: 'Unstop', date: '2026', color: '#3b82f6', emoji: '👁️', tags: ['CodeFest', 'IIT BHU'] },
  { id: '1Trs7yUzWmyB4WZTqX5WSMPjCI05u_yCc', category: 'Hackathons', title: 'Certificate of Participation', event: 'Devcation Delhi 2026', issuer: 'Google Developer Groups', subIssuer: 'IGDTUW × IITD', date: '2026', color: '#7c3aed', emoji: '🎖️', tags: ['GDG', 'Google', 'Delhi'] }, // Moved to Hackathons
  
  // Courses
  { id: '11lKSwl7u-l9MuRsM_9CAP1bE-fkdI-d3', category: 'Courses', title: 'Certificate of Completion', event: 'Networking Basics', issuer: 'Cisco Networking Academy', subIssuer: '', date: '2023', color: '#0284c7', emoji: '🌐', tags: ['Networking', 'Cisco'] },
  { id: '1Mhd2kJh3Ck3LFwmKi4Shvy4-jrSotXLt', category: 'Courses', title: 'Certificate of Completion', event: 'Semiconductors - VLSI & Embedded Systems', issuer: 'Maven Silicon', subIssuer: '', date: '2024', color: '#ea580c', emoji: '🖲️', tags: ['VLSI', 'Semiconductors'] },
  { id: '1p253OxTv8I-xKxW2kLGBynjzIk5-LxRi', category: 'Courses', title: 'Certificate of Completion', event: 'Electronics - Nanoelectronics', issuer: 'Cursa', subIssuer: '', date: '2025', color: '#059669', emoji: '🔬', tags: ['Nanoelectronics', 'Online Course'] },
  { id: '1wHtA88evTo25yOpd2GNKsZzabWGqIMKn', category: 'Courses', title: 'Certificate of Completion', event: 'Basics of Python', issuer: 'Infosys Springboard', subIssuer: '', date: '2023', color: '#ca8a04', emoji: '🐍', tags: ['Python', 'Programming'] },
  { id: '1iGb4-e7J9iD4I8cIE2TAiGcvL_iIMx3R', category: 'Courses', title: 'Certificate of Completion', event: 'Programming in C', issuer: 'Infosys Springboard', subIssuer: '', date: '2023', color: '#2563eb', emoji: 'C', tags: ['C Programming', 'Basics'] },
  { id: '13PYJYnI8NKImTvABLAXgZLh3lAgAeczU', category: 'Courses', title: 'Certificate of Achievement', event: 'Employability Skills', issuer: 'Naan Mudhalvan Scheme', subIssuer: 'TN Skill Development', date: '2025', color: '#d946ef', emoji: '📈', tags: ['Soft Skills', 'Government'] },
  { id: '15uCpmj0FuC934kR7sLVJScsDcOM8wRkP', category: 'Courses', title: 'Certificate of Completion', event: 'Explore Electrical Eng. Job Simulation', issuer: 'Forage / GE Aerospace', subIssuer: '', date: '2025', color: '#0f766e', emoji: '⚡', tags: ['Electrical', 'Simulation'] },
  { id: '1xFsYn3jE6jxumdCkFrcd_KXh7maqjjFZ', category: 'Courses', title: 'Certificate of Completion', event: 'Python Bootcamp', issuer: 'Lets Upgrade', subIssuer: 'NSDC & GDG MAD', date: '2025', color: '#eab308', emoji: '🏕️', tags: ['Bootcamp', 'Python'] },
  { id: '1gmBOeLgC8Yl4tz2coTeriBVHnwXGwjEl', category: 'Courses', title: 'Certificate of Completion', event: 'GenAI 101: Socratic AI Tutor Essentials', issuer: 'Lets Upgrade', subIssuer: 'NSDC & GDG MAD', date: '2026', color: '#8b5cf6', emoji: '🤖', tags: ['GenAI', 'Course'] }, // Moved to Courses

  // Workshops
  { id: '1jdgn5zAGoJRKyUwcA9HrtZVWysQ0M9e3', category: 'Workshops', title: 'Certificate of Participation', event: 'Semiconductors & VLSI Design', issuer: 'Edu Fabrica', subIssuer: '', date: '2025', color: '#dc2626', emoji: '🖥️', tags: ['Workshop', 'Hardware'] },
  
  // Internships
  { id: '1A5UF4Vs1HKMvMZNEeTlWPLm-d8mczyzF', category: 'Internships', title: 'Certificate of Internship', event: 'Ind. Embedded Systems with IOT', issuer: 'NSIC Chennai', subIssuer: 'Govt. of India', date: '2025', color: '#4f46e5', emoji: '🔌', tags: ['IoT', 'Embedded Systems', 'Internship'] }, // Moved to Internships

  // Others
  { id: '1CIevT824g2PeKq--9QDFYH91RC8KAQmX', category: 'Others', title: 'Certificate of Participation', event: 'ELECT-ERA\'26 - TYPING ARENA', issuer: 'Coimbatore Institute of Technology', subIssuer: '', date: '2026', color: '#8b5cf6', emoji: '⌨️', tags: ['Typing', 'Symposium'] }, // Moved to Others
  { id: '1Xc-mDE0YDTIVCnEBaVjgP6tOWiwRoftV', category: 'Others', title: 'Certificate of Appreciation', event: 'Kalloori Kalai Thiruvizha - Science Exhb.', issuer: 'Govt of Tamil Nadu', subIssuer: '2nd Position', date: '2025', color: '#eab308', emoji: '🥈', tags: ['Exhibition', 'Science', '2nd Place'] }, // Moved to Others
  { id: '1MqeiKsJ4MrCwwSNpQdCGeRJqGvOyV7Tb', category: 'Others', title: 'Certificate of Participation', event: 'Kurukshetra\'26 - STEAM QUEST', issuer: 'Anna University (CEG)', subIssuer: '', date: '2026', color: '#f97316', emoji: '🧩', tags: ['STEAM', 'Techno-Management'] }, // Moved to Others
  { id: '1FcIO1JbiWeqyHtNl5_Uoh3YZjjbJ8Yga', category: 'Others', title: 'Certificate of Participation', event: 'ELECT-ERA\'26 - CHASE AND BUILD', issuer: 'Coimbatore Institute of Technology', subIssuer: '', date: '2026', color: '#f43f5e', emoji: '🛠️', tags: ['Hardware', 'Symposium'] }, // Moved to Others
  { id: '13-CXBTGmug3noakvBJq4r3n3ved7DQwk', category: 'Others', title: 'Certificate of Participation', event: 'GALAXY\'24 PHASE II - PAPER WAR', issuer: 'Government College of Engineering, Erode', subIssuer: '', date: '2024', color: '#6366f1', emoji: '📄', tags: ['Paper Presentation', 'Symposium'] }, // Moved to Others
  { id: '1dwC1QsBZyVTeq1E4ZS9dkI7keI3322fb', category: 'Others', title: 'Certificate of Participation', event: 'Attack on Bots (Robotics)', issuer: 'NIT Tiruchi', subIssuer: '', date: '2025', color: '#ef4444', emoji: '🤖', tags: ['Robotics', 'NIT'] }, // Moved to Others
];

const certificationsData = baseCertificationsData.map(cert => ({
  ...cert,
  driveImageUrl: `/certs/${cert.id}.png?v=1`,
  driveId: cert.id,
  description: 
    cert.category === 'Hackathons' ? "Demonstrated outstanding performance and technical skillset in this competitive event." :
    cert.category === 'Courses' ? "Successfully completed comprehensive coursework and practical assignments to master fundamental concepts." :
    cert.category === 'Internships' ? "Gained hands-on industry experience and tackled real-world projects during this extensive internship training." :
    "Actively engaged in collaborative activities, exhibitions, and symposiums to broaden technical boundaries."
}));

const Certifications = ({ data }) => {
  const certs = data || certificationsData
  const [activeTab, setActiveTab] = useState('Hackathons') // Default category
  const [activeCertificate, setActiveCertificate] = useState(null)
  const [isFullScreenImg, setIsFullScreenImg] = useState(false)

  const tabs = ['Hackathons', 'Courses', 'Workshops', 'Internships', 'Others'];
  const filteredCerts = certs.filter(cert => cert.category === activeTab);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeCertificate]);

  return (
    <section className="section" id="certifications">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">// Recognition & achievements</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            Credentials and recognition earned through dedication and hard work
          </p>
        </div>

        {/* 1. Category Buttons */}
        <div className="cert-filters" data-aos="fade-up" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? 'linear-gradient(90deg, #1e3a8a, #d4af37)' : 'rgba(0, 0, 0, 0.4)',
                color: activeTab === tab ? '#fff' : '#d4af37',
                border: '1px solid',
                borderColor: activeTab === tab ? '#d4af37' : 'rgba(212, 175, 55, 0.3)',
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab ? '0 0 15px rgba(30, 58, 138, 0.6), 0 0 10px rgba(212, 175, 55, 0.4)' : 'none',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.target.style.background = 'rgba(30, 58, 138, 0.3)';
                  e.target.style.borderColor = '#d4af37';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.target.style.background = 'rgba(0, 0, 0, 0.4)';
                  e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 2. Grid of Certificate Cards for the active category */}
        <div className="cert-grid" data-aos="fade-up" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '25px',
          marginBottom: '50px',
          width: '100%'
        }}>
          {filteredCerts.length > 0 ? filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setActiveCertificate(cert)}
              className="cert-card"
              style={{
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '20px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8)',
                zIndex: 1
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.border = '1px solid rgba(212, 175, 55, 0.8)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(30, 58, 138, 0.5), 0 0 25px rgba(212, 175, 55, 0.3)';
                const reflection = e.currentTarget.querySelector('.mirror-reflection');
                if (reflection) reflection.style.transform = 'translateX(100%)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.border = '1px solid rgba(212, 175, 55, 0.4)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.8)';
                const reflection = e.currentTarget.querySelector('.mirror-reflection');
                if (reflection) reflection.style.transform = 'translateX(-100%)';
              }}
            >
              {/* Mirror Reflection Effect Layer */}
              <div 
                className="mirror-reflection"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.6s ease-in-out',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))' }}>{cert.emoji}</span>
                <span style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: '800', 
                  color: '#fff', 
                  background: 'rgba(212, 175, 55, 0.2)', 
                  padding: '6px 14px', 
                  borderRadius: '50px',
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  letterSpacing: '1px',
                  textShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                }}>
                  {cert.date}
                </span>
              </div>

              <h3 style={{ 
                fontSize: '1.4rem', 
                fontWeight: '900', 
                color: '#fff', 
                marginBottom: '10px',
                lineHeight: '1.3',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
              }}>
                {cert.event}
              </h3>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{ width: '14px', height: '14px', background: cert.color, borderRadius: '50%', boxShadow: `0 0 10px ${cert.color}` }} />
                <span style={{ fontSize: '1rem', color: '#f1f5f9', fontWeight: '700' }}>{cert.issuer}</span>
              </div>

              <p style={{ 
                fontSize: '1rem', 
                color: '#cbd5e1', 
                lineHeight: '1.7',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: '24px',
                position: 'relative',
                zIndex: 1,
                fontWeight: '500'
              }}>
                {cert.description}
              </p>

              <div style={{ 
                marginTop: 'auto', 
                display: 'flex', 
                gap: '10px', 
                flexWrap: 'wrap',
                position: 'relative',
                zIndex: 1 
              }}>
                {(cert.tags || []).slice(0, 2).map((tag, tIdx) => (
                  <span key={tIdx} style={{ 
                    fontSize: '0.75rem', 
                    background: 'rgba(30, 58, 138, 0.3)', 
                    color: '#93c5fd', 
                    padding: '4px 12px', 
                    borderRadius: '6px',
                    border: '1px solid rgba(147, 197, 253, 0.3)',
                    fontWeight: '700'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
              No certificates in this category.
            </div>
          )}
        </div>
      </div>

      {/* 3. Floating Window / Mirror Transparent Blue-Gold-Black Styled Box */}
      {activeCertificate && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.3s ease'
        }}
        onClick={() => setActiveCertificate(null)} // Click outside to close
        >
          <div 
            className="cert-detailed-view" 
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
              border: '2px solid rgba(212, 175, 55, 0.8)', // Stronger Gold border
              boxShadow: '0 0 40px rgba(30, 58, 138, 0.8), inset 0 0 20px rgba(212, 175, 55, 0.2)', // Intense Blue & Gold glow
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              backdropFilter: 'blur(24px)', // High mirror transparent blur
              color: '#fff',
              position: 'relative',
              animation: 'slideUp 0.4s ease'
            }}
            onClick={(e) => e.stopPropagation()} // Prevent close on inner click
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveCertificate(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(212, 175, 55, 0.2)',
                border: '1px solid #d4af37',
                color: '#d4af37',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d4af37'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)'; e.currentTarget.style.color = '#d4af37'; }}
            >
              <FaTimes />
            </button>

            {/* Mirror reflection overlay */}
            <div style={{
              position: 'absolute',
              top: '-20%',
              left: '-20%',
              right: '-20%',
              height: '100%',
              background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1) 0%, transparent 60%)',
              transform: 'rotate(-15deg)',
              pointerEvents: 'none'
            }}></div>

            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }} className="cert-detailed-split">
              
              {/* Image side */}
              <div 
                style={{ 
                  flex: '1', 
                  minWidth: '300px',
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 2
                }}
                onClick={() => setIsFullScreenImg(!isFullScreenImg)}
              >
                <img 
                  src={activeCertificate.driveImageUrl} 
                  alt={activeCertificate.event} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#000', transition: 'transform 0.4s' }} 
                  onError={(e) => { e.target.src = '/vite.svg'; }}
                />
                {!isFullScreenImg && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    color: '#FFF'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}
                  >
                    <div style={{ background: 'rgba(212,175,55,0.8)', padding: '10px', borderRadius: '50%', color: '#000' }}>
                       <FaExpand size={24} />
                    </div>
                  </div>
                )}
              </div>

              {/* Details side */}
              <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{activeCertificate.emoji}</span>
                    <h3 style={{ fontSize: '1.8rem', color: '#d4af37', marginBottom: '10px', fontWeight: 'bold' }}>{activeCertificate.title}</h3>
                  </div>
                  <h4 style={{ fontSize: '1.3rem', color: '#60a5fa', marginBottom: '15px' }}>{activeCertificate.event}</h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <SiGoogle style={{ color: '#4285F4', fontSize: '1.8rem', opacity: activeCertificate.issuer.includes("Google") ? 1 : 0.2 }} />
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#f8fafc', fontSize: '1.1rem' }}>{activeCertificate.issuer}</p>
                    {activeCertificate.subIssuer && <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>{activeCertificate.subIssuer}</p>}
                  </div>
                </div>

                <p style={{ color: '#cbd5e1', lineHeight: '1.7', marginBottom: '25px', fontSize: '1.05rem' }}>
                  {activeCertificate.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', flexWrap: 'wrap', gap: '15px' }}>
                  <span style={{ background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', border: '1px solid #60a5fa', boxShadow: '0 4px 10px rgba(30,58,138,0.4)' }}>
                    Issued: {activeCertificate.date}
                  </span>
                  
                  {activeCertificate.driveId && (
                    <a
                      href={`https://drive.google.com/file/d/${activeCertificate.driveId}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#d4af37',
                        color: '#000',
                        textDecoration: 'none',
                        fontWeight: '700',
                        padding: '10px 20px',
                        border: '1px solid #d4af37',
                        borderRadius: '6px',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#000';
                        e.currentTarget.style.color = '#d4af37';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#d4af37';
                        e.currentTarget.style.color = '#000';
                      }}
                    >
                      <FaExternalLinkAlt /> Open in New Tab
                    </a>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
                  {(activeCertificate.tags || []).map((tag, tIdx) => (
                    <span key={tIdx} style={{ fontSize: '0.8rem', background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', padding: '5px 12px', borderRadius: '999px', border: '1px solid rgba(212, 175, 55, 0.5)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Extreme Full Screen Image View inside the Floating Window */}
      {isFullScreenImg && activeCertificate && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.95)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => setIsFullScreenImg(false)}
        >
          <button style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}><FaTimes /></button>
          <img src={activeCertificate.driveImageUrl} alt={activeCertificate.event} style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }} />
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}} />
    </section>
  )
}

export default Certifications
