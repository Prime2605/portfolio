import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveHoverButton } from './ui/InteractiveHoverButton'
import { 
  FaAward, 
  FaTimes, 
  FaExpand, 
  FaExternalLinkAlt, 
  FaBriefcase, 
  FaCalendarAlt, 
  FaTag, 
  FaBrain, 
  FaGlobe, 
  FaLaptopCode, 
  FaMicrochip, 
  FaPlug 
} from 'react-icons/fa'
import { SiGoogle } from 'react-icons/si'
import { certificationsData } from './Certifications'

const experienceIcons = {
  '🧠': <FaBrain />,
  '🌐': <FaGlobe />,
  '🖥️': <FaLaptopCode />,
  '🖲️': <FaMicrochip />,
  '🔌': <FaPlug />,
  '💼': <FaBriefcase />,
}

const getExperienceIcon = (emoji) => {
  return experienceIcons[emoji] || <FaBriefcase />
}

const Experience = ({ data, limit }) => {
  const allData = data || certificationsData
  // Filter for Workshops and Internships
  const experienceData = allData.filter(cert => cert.category === 'Workshops' || cert.category === 'Internships')

  const [activeTab, setActiveTab] = useState('Internships') // Default category
  const [activeSubTab, setActiveSubTab] = useState('Software') // Default workshops subcategory to Software
  const [activeCertificate, setActiveCertificate] = useState(null)
  const [isFullScreenImg, setIsFullScreenImg] = useState(false)

  const tabs = ['Internships', 'Workshops']
  const filteredExps = experienceData.filter(cert => {
    if (cert.category !== activeTab) return false
    if (activeTab === 'Workshops') {
      return cert.subCategory === activeSubTab
    }
    return true
  })

  const displayedExps = limit ? filteredExps.slice(0, limit) : filteredExps

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeCertificate) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [activeCertificate])

  return (
    <section className="section" id="experience">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">// Practical exposure</span>
          <h2 className="section-title">Experience</h2>
          <p className="section-subtitle">
            Workshops and internships gained during my professional and academic journey
          </p>
        </div>

        {/* 1. Category Buttons */}
        <div className="cert-filters" data-aos="fade-up" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setActiveSubTab('Software'); }}
              style={{
                background: activeTab === tab ? 'var(--bg-highlight)' : 'var(--bg-glass)',
                color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
                border: '1px solid',
                borderColor: activeTab === tab ? 'var(--accent-primary)' : 'var(--border-glass)',
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
                  e.target.style.background = 'var(--bg-highlight)'
                  e.target.style.borderColor = 'var(--border-highlight)'
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.target.style.background = 'var(--bg-glass)'
                  e.target.style.borderColor = 'var(--border-glass)'
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 1.5. Workshops Sub-Filters */}
        {activeTab === 'Workshops' && (
          <div className="cert-subfilters" data-aos="fade-up" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {['Software', 'VLSI'].map(subTab => (
              <button
                key={subTab}
                onClick={() => setActiveSubTab(subTab)}
                style={{
                  background: activeSubTab === subTab ? 'var(--bg-highlight-blue)' : 'var(--bg-glass)',
                  color: activeSubTab === subTab ? 'var(--text-primary)' : 'var(--text-secondary)',
                  border: '1px solid',
                  borderColor: activeSubTab === subTab ? 'var(--border-highlight-blue)' : 'var(--border-glass)',
                  padding: '8px 24px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeSubTab === subTab ? '0 0 15px rgba(37, 99, 235, 0.4)' : 'none',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (activeSubTab !== subTab) {
                    e.target.style.background = 'var(--bg-highlight-blue)'
                    e.target.style.borderColor = 'var(--border-highlight-blue)'
                    e.target.style.color = 'var(--text-primary)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSubTab !== subTab) {
                    e.target.style.background = 'var(--bg-glass)'
                    e.target.style.borderColor = 'var(--border-glass)'
                    e.target.style.color = 'var(--text-secondary)'
                  }
                }}
              >
                {subTab}
              </button>
            ))}
          </div>
        )}

        {/* 2. Grid of Experience Cards */}
        <div className="cert-grid" data-aos="fade-up" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '25px',
          width: '100%',
          marginBottom: limit ? '0px' : '40px'
        }}>
          {displayedExps.length > 0 ? displayedExps.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setActiveCertificate(cert)}
              className="cert-card"
              style={{
                background: 'var(--bg-card)',
                backdropFilter: 'blur(50px)',
                border: '1px solid var(--border-glass)',
                borderRadius: '24px',
                padding: '30px',
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
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)'
                e.currentTarget.style.border = '1px solid rgba(212, 175, 55, 0.8)'
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(30, 58, 138, 0.5), 0 0 25px rgba(212, 175, 55, 0.3)'
                const reflection = e.currentTarget.querySelector('.mirror-reflection')
                if (reflection) reflection.style.transform = 'translateX(100%)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.border = '1px solid rgba(212, 175, 55, 0.4)'
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.8)'
                const reflection = e.currentTarget.querySelector('.mirror-reflection')
                if (reflection) reflection.style.transform = 'translateX(-100%)'
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
                <span style={{ fontSize: '2.5rem', color: 'var(--accent-secondary)', filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.4))', display: 'inline-flex', alignItems: 'center' }}>{getExperienceIcon(cert.emoji)}</span>
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
                WebkitLineClamp: limit ? 2 : 'none',
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
              No experience entries in this category.
            </div>
          )}
        </div>

        {limit && filteredExps.length > limit && (
          <div className="section-footer" style={{ textAlign: 'center', marginTop: '30px' }} data-aos="fade-up">
            <InteractiveHoverButton as={Link} to="/experience" className="glow-text">
              See All Experience
            </InteractiveHoverButton>
          </div>
        )}
      </div>

      {/* Detail Popup Modal */}
      {activeCertificate && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(12px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.3s ease'
        }}
        onClick={() => setActiveCertificate(null)}
        >
          <div 
            className="cert-detailed-view" 
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
              border: '2px solid rgba(212, 175, 55, 0.8)',
              boxShadow: '0 0 40px rgba(30, 58, 138, 0.8), inset 0 0 20px rgba(212, 175, 55, 0.2)',
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              backdropFilter: 'blur(45px)',
              color: '#fff',
              position: 'relative',
              animation: 'slideUp 0.4s ease'
            }}
            onClick={(e) => e.stopPropagation()}
          >
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
            >
              <FaTimes />
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '3rem', color: 'var(--accent-secondary)', filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.4))', marginBottom: '15px', display: 'inline-flex', alignItems: 'center' }}>{getExperienceIcon(activeCertificate.emoji)}</span>
                <h3 className="glow-text" style={{ fontSize: '2rem', fontWeight: '900', color: '#fff', marginBottom: '10px' }}>
                  {activeCertificate.event}
                </h3>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <div style={{ width: '12px', height: '12px', background: activeCertificate.color, borderRadius: '50%', boxShadow: `0 0 8px ${activeCertificate.color}` }} />
                  <span style={{ fontSize: '1.2rem', color: '#f8fafc', fontWeight: '700' }}>{activeCertificate.issuer}</span>
                  {activeCertificate.subIssuer && (
                    <span style={{ fontSize: '1rem', color: '#94a3b8' }}>• {activeCertificate.subIssuer}</span>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '25px' }}>
                  <span style={{ background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <FaCalendarAlt /> {activeCertificate.date}
                  </span>
                  <span style={{ background: 'rgba(30, 58, 138, 0.3)', color: '#93c5fd', border: '1px solid rgba(147, 197, 253, 0.3)', padding: '6px 16px', borderRadius: '50px', fontSize: '0.85rem', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <FaTag /> {activeCertificate.category}
                  </span>
                </div>

                <p style={{ fontSize: '1.1rem', color: '#e2e8f0', lineHeight: '1.8', marginBottom: '30px', fontWeight: '500' }}>
                  {activeCertificate.description}
                </p>

                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginBottom: '20px' }}>
                  {(activeCertificate.tags || []).map((tag, idx) => (
                    <span key={idx} style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-glass)', padding: '8px 16px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', color: '#f1f5f9' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {activeCertificate.driveId && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <div 
                    onClick={() => setIsFullScreenImg(true)}
                    style={{ 
                      width: '100%', 
                      aspectRatio: '1.414', 
                      borderRadius: '12px', 
                      overflow: 'hidden', 
                      border: '1px solid var(--border-glass)',
                      cursor: 'zoom-in',
                      position: 'relative'
                    }}
                  >
                    <img 
                      src={activeCertificate.driveImageUrl} 
                      alt={activeCertificate.event} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0a0a0a' }}
                    />
                    <div style={{ position: 'absolute', right: '15px', bottom: '15px', background: 'rgba(0,0,0,0.8)', padding: '10px', borderRadius: '50%', color: '#fff' }}>
                      <FaExpand />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Overlay */}
      {isFullScreenImg && activeCertificate && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '10px',
          cursor: 'zoom-out'
        }}
        onClick={() => setIsFullScreenImg(false)}
        >
          <button 
            onClick={() => setIsFullScreenImg(false)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              color: '#fff',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <FaTimes />
          </button>
          <img 
            src={activeCertificate.driveImageUrl} 
            alt={activeCertificate.event} 
            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
          />
        </div>
      )}
    </section>
  )
}

export default Experience
