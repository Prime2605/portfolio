import React from 'react'
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaGraduationCap, FaCalendar, FaLanguage, FaCode, FaMicrochip } from 'react-icons/fa'

const About = ({ data }) => {
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

              <div className="about-image-placeholder" style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(0 0 15px rgba(124, 58, 237, 0.4))' }}>
                <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                  <defs>
                    <linearGradient id="avatarGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#7c3aed"/>
                      <stop offset="1" stopColor="#06b6d4"/>
                    </linearGradient>
                  </defs>
                  <circle cx="60" cy="45" r="22" fill="url(#avatarGrad)" opacity="0.9"/>
                  <ellipse cx="60" cy="95" rx="35" ry="22" fill="url(#avatarGrad)" opacity="0.7"/>
                  <text x="60" y="52" textAnchor="middle" fill="white" fontSize="18" fontWeight="bold" fontFamily="Outfit">P</text>
                </svg>
              </div>
              <div className="about-stats" style={{ position: 'relative', zIndex: 1 }}>
                <div className="stat-item" style={{ background: 'rgba(124, 58, 237, 0.1)', border: '1px solid rgba(124, 58, 237, 0.2)' }}>
                  <div className="stat-number" style={{ color: '#fff', textShadow: '0 0 10px rgba(124, 58, 237, 0.8)', fontWeight: '900' }}>8.23</div>
                  <div className="stat-label" style={{ color: '#cbd5e1' }}>CGPA</div>
                </div>
                <div className="stat-item" style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
                  <div className="stat-number" style={{ color: '#fff', textShadow: '0 0 10px rgba(6, 182, 212, 0.8)', fontWeight: '900' }}>5+</div>
                  <div className="stat-label" style={{ color: '#cbd5e1' }}>Projects</div>
                </div>
                <div className="stat-item" style={{ background: 'rgba(168, 85, 247, 0.1)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
                  <div className="stat-number" style={{ color: '#fff', textShadow: '0 0 10px rgba(168, 85, 247, 0.8)', fontWeight: '900' }}>94.8%</div>
                  <div className="stat-label" style={{ color: '#cbd5e1' }}>10th</div>
                </div>
              </div>
            </div>
          </div>

          <div className="about-content" data-aos="fade-left" data-aos-delay="200">
            <h3>
              Aspiring Researcher & <span style={{ color: '#a855f7', textShadow: '0 0 15px rgba(168, 85, 247, 0.4)' }}>ECE Innovator</span>
            </h3>
            <p style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: '500', lineHeight: '1.8' }}>
              I'm an Electronics and Communication Engineering student at Government College of 
              Engineering, Erode, driven by an insatiable curiosity for research and innovation. 
              My expertise spans across both the digital and physical worlds — from crafting 
              elegant web applications with React.js and Node.js to designing complex hardware 
              systems with FPGAs and microcontrollers.
            </p>
            <p style={{ color: '#f8fafc', fontSize: '1.05rem', fontWeight: '400', lineHeight: '1.8' }}>
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
                    background: 'rgba(0, 0, 0, 0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    padding: '12px 18px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  <span style={{ color: '#22d3ee', fontSize: '1.3rem' }}>{info.icon}</span>
                  <div>
                    <div className="info-label" style={{ fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>{info.label}</div>
                    <div className="info-value" style={{ fontSize: '1rem', fontWeight: '700', color: '#fff' }}>{info.value}</div>
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
