import React, { useState, useEffect } from 'react'
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGraduationCap, FaCalendar, FaLanguage, FaCode, FaMicrochip } from 'react-icons/fa'

const About = ({ data }) => {
  const [imageError, setImageError] = useState(false)
  const avatarSrc = data?.avatar_url || '/assets/profile.jpg'

  useEffect(() => {
    setImageError(false)
  }, [data?.avatar_url])

  return (
    <section className="section" id="about">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">// Get to know me</span>
          <h2 className="section-title">About Me</h2>
          <p className="section-subtitle">
            A passionate learner bridging the gap between hardware and software
          </p>
        </div>

        <div className="about-grid">
          <div className="about-image-wrapper" data-aos="fade-right" data-aos-delay="100">
            <div className="about-image-card">

              <div className="about-image-placeholder" style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(var(--shadow-card))' }}>
                {!imageError ? (
                  <img 
                    src={avatarSrc} 
                    alt={data?.name || "Prime R S"} 
                    onError={() => setImageError(true)}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover', 
                      borderRadius: 'var(--border-radius)',
                      transition: 'var(--transition-smooth)'
                    }} 
                    className="about-profile-img"
                  />
                ) : (
                  <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                    <circle cx="60" cy="45" r="22" fill="var(--text-secondary)" opacity="0.9"/>
                    <ellipse cx="60" cy="95" rx="35" ry="22" fill="var(--text-secondary)" opacity="0.7"/>
                    <text x="60" y="52" textAnchor="middle" fill="var(--bg-primary)" fontSize="18" fontWeight="bold" fontFamily="Outfit">P</text>
                  </svg>
                )}
              </div>
              <div className="about-stats" style={{ position: 'relative', zIndex: 1 }}>
                <div className="stat-item" style={{ background: 'var(--bg-highlight)', border: '1px solid var(--border-highlight)' }}>
                  <div className="stat-number" style={{ color: 'var(--text-primary)', fontWeight: '900' }}>8.23</div>
                  <div className="stat-label" style={{ color: 'var(--text-secondary)' }}>CGPA</div>
                </div>
                <div className="stat-item" style={{ background: 'var(--bg-highlight-blue)', border: '1px solid var(--border-highlight-blue)' }}>
                  <div className="stat-number" style={{ color: 'var(--text-primary)', fontWeight: '900' }}>5+</div>
                  <div className="stat-label" style={{ color: 'var(--text-secondary)' }}>Projects</div>
                </div>
                <div className="stat-item" style={{ background: 'var(--bg-highlight-green)', border: '1px solid var(--border-highlight-green)' }}>
                  <div className="stat-number" style={{ color: 'var(--text-primary)', fontWeight: '900' }}>94.8%</div>
                  <div className="stat-label" style={{ color: 'var(--text-secondary)' }}>10th</div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-content" data-aos="fade-left" data-aos-delay="200">
            <h3>
              Aspiring Researcher & <span style={{ color: 'var(--accent-primary)', textShadow: '0 0 15px var(--border-highlight)' }}>ECE Innovator</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontWeight: '500', lineHeight: '1.8' }}>
              I'm an Electronics and Communication Engineering student at Government College of 
              Engineering, Erode, driven by an insatiable curiosity for research and innovation. 
              My expertise spans across both the digital and physical worlds — from crafting 
              elegant web applications with React.js and Node.js to designing complex hardware 
              systems with FPGAs and microcontrollers.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', fontWeight: '400', lineHeight: '1.8' }}>
              With a stellar academic record of 94.8% in 10th grade and 93.17% in 12th grade, 
              I bring the same dedication to every project I undertake. I believe in the power 
              of interdisciplinary thinking — where hardware meets software, and innovation 
              meets execution.
            </p>
            
            <div className="about-info-grid">
              {[
                { label: 'Degree', value: 'B.E. in ECE', icon: <FaGraduationCap /> },
                { label: 'Born', value: '26 May 2007', icon: <FaCalendar /> },
                { label: 'Email', value: 'rsprime265@gmail.com', icon: <FaEnvelope /> },
                { label: 'Hardware', value: 'FPGA, Embedded', icon: <FaMicrochip /> }
              ].map((info, i) => (
                <div 
                  key={i} 
                  className="info-item"
                  style={{ 
                    background: 'var(--bg-overlay)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid var(--border-color)',
                    padding: '12px 18px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <span style={{ color: 'var(--accent-secondary)', fontSize: '1.3rem' }}>{info.icon}</span>
                  <div>
                    <div className="info-label" style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>{info.label}</div>
                    <div className="info-value" style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-primary)' }}>{info.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
