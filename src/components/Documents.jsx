import React from 'react'
import { Link } from 'react-router-dom'
import { FaFilePdf, FaFileAlt, FaDownload, FaEye, FaArrowLeft, FaFileContract } from 'react-icons/fa'

const Documents = () => {
  return (
    <section className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', paddingTop: '120px' }}>
      <div className="container">
        {/* Back button */}
        <div data-aos="fade-up" style={{ marginBottom: '40px' }}>
          <Link 
            to="/" 
            className="btn-jelly btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              borderRadius: '12px',
              fontWeight: '700',
              textDecoration: 'none',
              background: 'rgba(255, 255, 255, 0.03)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </div>

        {/* Section Header */}
        <div className="section-header" data-aos="fade-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span className="section-label" style={{ display: 'block', color: '#c4b5fd', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>
            // Verification Portfolio
          </span>
          <h2 className="section-title" style={{ fontSize: '3rem', fontWeight: '900', color: '#fff', marginBottom: '20px' }}>
            Official Documents
          </h2>
          <p className="section-subtitle" style={{ maxWidth: '600px', margin: '0 auto', color: '#cbd5e1', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Access and download verified copies of my academic records, professional resume, and personal credentials.
          </p>
        </div>

        {/* Grid layout for documents */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          marginTop: '40px'
        }}>
          {/* Card 1: Academic Transcript */}
          <div 
            data-aos="fade-up"
            data-aos-delay="100"
            className="document-card"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(124, 58, 237, 0.2)',
              borderRadius: '24px',
              padding: '40px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.border = '1px solid rgba(124, 58, 237, 0.6)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(124, 58, 237, 0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.border = '1px solid rgba(124, 58, 237, 0.2)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
            }}
          >
            {/* Top decorative glow */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '120px',
              height: '120px',
              background: 'rgba(124, 58, 237, 0.15)',
              filter: 'blur(30px)',
              borderRadius: '50%'
            }} />

            <div>
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '16px',
                background: 'rgba(124, 58, 237, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.8rem',
                color: '#a855f7',
                marginBottom: '28px',
                border: '1px solid rgba(124, 58, 237, 0.2)'
              }}>
                <FaFilePdf />
              </div>
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
                Academic Transcript
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>
                Comprehensive transcript record containing verified semester-wise academic grades for both secondary education (schooling) and college degree (B.E. ECE).
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a
                href="/Transcript.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-jelly btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  background: 'linear-gradient(90deg, #7c3aed, #a855f7)',
                  color: '#fff',
                  border: 'none',
                  boxShadow: '0 4px 15px rgba(124, 58, 237, 0.3)',
                  cursor: 'pointer',
                  flex: 1,
                  justifyContent: 'center'
                }}
              >
                <FaEye /> View
              </a>
              <a
                href="/Transcript.pdf"
                download="Prime_RS_Transcript.pdf"
                className="btn-jelly btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  cursor: 'pointer',
                  flex: 1,
                  justifyContent: 'center',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                }}
              >
                <FaDownload /> Download
              </a>
            </div>
          </div>

          {/* Card 2: Bio Data */}
          <div 
            data-aos="fade-up"
            data-aos-delay="200"
            className="document-card"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '24px',
              padding: '40px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.border = '1px solid rgba(59, 130, 246, 0.6)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(59, 130, 246, 0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.border = '1px solid rgba(59, 130, 246, 0.2)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
            }}
          >
            {/* Top decorative glow */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '120px',
              height: '120px',
              background: 'rgba(59, 130, 246, 0.15)',
              filter: 'blur(30px)',
              borderRadius: '50%'
            }} />

            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '28px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  color: '#3b82f6',
                  border: '1px solid rgba(59, 130, 246, 0.2)'
                }}>
                  <FaFileAlt />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#3b82f6',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  padding: '4px 10px',
                  borderRadius: '50px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Coming Soon
                </span>
              </div>
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
                Personal Bio Data
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>
                Official personal profile containing detailed background information, personal details, contact data, and key career objectives.
              </p>
            </div>

            <div>
              <button
                disabled
                className="btn-jelly btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '0.95rem',
                  borderRadius: '12px',
                  fontWeight: '700',
                  background: 'rgba(255, 255, 255, 0.02)',
                  color: 'rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'not-allowed',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                Uploading Soon
              </button>
            </div>
          </div>

          {/* Card 3: Resume */}
          <div 
            data-aos="fade-up"
            data-aos-delay="300"
            className="document-card"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(15px)',
              border: '1px solid rgba(16, 185, 129, 0.2)',
              borderRadius: '24px',
              padding: '40px 30px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-10px)';
              e.currentTarget.style.border = '1px solid rgba(16, 185, 129, 0.6)';
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(16, 185, 129, 0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.border = '1px solid rgba(16, 185, 129, 0.2)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.4)';
            }}
          >
            {/* Top decorative glow */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '120px',
              height: '120px',
              background: 'rgba(16, 185, 129, 0.15)',
              filter: 'blur(30px)',
              borderRadius: '50%'
            }} />

            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '28px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '16px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.8rem',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.2)'
                }}>
                  <FaFileContract />
                </div>
                <span style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: '#10b981',
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '4px 10px',
                  borderRadius: '50px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Coming Soon
                </span>
              </div>
              
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '12px' }}>
                Professional Resume
              </h3>
              <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '30px' }}>
                Detailed resume showcasing professional skills, projects, certifications, research interests, and hands-on experience in ECE & Development.
              </p>
            </div>

            <div>
              <button
                disabled
                className="btn-jelly btn-secondary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  fontSize: '0.95rem',
                  borderRadius: '12px',
                  fontWeight: '700',
                  background: 'rgba(255, 255, 255, 0.02)',
                  color: 'rgba(255, 255, 255, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  cursor: 'not-allowed',
                  width: '100%',
                  justifyContent: 'center'
                }}
              >
                Uploading Soon
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Documents
