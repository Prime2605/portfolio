import React from 'react'
import { FaGraduationCap, FaStar } from 'react-icons/fa'

const educationData = [
  {
    date: 'Sep 2024 – May 2028',
    title: 'Bachelor of Engineering — ECE',
    institution: 'Government College of Engineering, Erode',
    description: 'Currently pursuing B.E. in Electronics and Communication Engineering with a focus on FPGA design, embedded systems, and full-stack development.',
    grade: 'CGPA: 8.23',
  },
  {
    date: 'Jul 2022 – May 2024',
    title: 'HSC (11th & 12th Grade)',
    institution: 'Tagore Matric Higher Secondary School, Deviyakurichi',
    description: 'Completed higher secondary education in Bio-Mathematics stream. Scored 557/600 (92.83%) in 11th standard and 559/600 (93.17%) in 12th standard, demonstrating strong analytical skills.',
    grade: '93.17% (12th Grade)',
  },
  {
    date: 'Jun 2020 – May 2022',
    title: 'SSLC (9th & 10th Grade)',
    institution: 'Tagore Matric Higher Secondary School, Deviyakurichi',
    description: 'Completed secondary education with an outstanding foundation in science and mathematics. Scored 474/500 in 10th standard.',
    grade: '94.8% (10th Grade)',
  },
]

const Education = ({ data }) => {
  const items = data || educationData

  return (
    <section className="section" id="education">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">// My academic journey</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            A track record of academic excellence and continuous learning
          </p>
        </div>

        <div className="timeline" style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '40px',
          paddingLeft: '20px',
          borderLeft: '2px solid rgba(124, 58, 237, 0.2)',
          position: 'relative'
        }}>
          {(Array.isArray(items) ? items : educationData).map((item, idx) => (
            <div
              className="timeline-item"
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 150}
              style={{
                position: 'relative',
                width: '100%'
              }}
            >
              {/* Timeline Dot Indicator */}
              <div style={{
                position: 'absolute',
                left: '-31px',
                top: '30px',
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: 'var(--bg-primary)',
                border: '3px solid #7c3aed',
                boxShadow: '0 0 10px #7c3aed',
                zIndex: 2
              }} />

              <div className="education-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', position: 'relative', zIndex: 1, flexWrap: 'wrap', gap: '10px' }}>
                  <span style={{ 
                    fontSize: '0.85rem', 
                    fontWeight: '700', 
                    color: 'var(--text-primary)', 
                    background: 'var(--bg-highlight)', 
                    padding: '6px 14px', 
                    borderRadius: '50px',
                    border: '1px solid var(--border-highlight)',
                    letterSpacing: '1px'
                  }}>
                    {item.date || item.duration}
                  </span>
                  
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    background: 'var(--bg-highlight-green)', 
                    color: 'var(--accent-emerald)', 
                    padding: '6px 14px', 
                    borderRadius: '50px',
                    border: '1px solid var(--border-highlight-green)',
                    fontWeight: '700',
                    fontSize: '0.85rem'
                  }}>
                    {item.grade}
                  </span>
                </div>

                <h3 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: '800', 
                  color: 'var(--text-primary)', 
                  marginBottom: '8px',
                  lineHeight: '1.3',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {item.institution}
                </h3>

                <p style={{ 
                  fontSize: '0.95rem', 
                  color: 'var(--text-secondary)', 
                  fontWeight: '600',
                  position: 'relative',
                  zIndex: 1,
                  marginBottom: '12px'
                }}>
                  {item.title || item.degree}
                </p>

                <p style={{
                  fontSize: '0.9rem',
                  color: 'rgba(255, 255, 255, 0.7)',
                  lineHeight: '1.6',
                  position: 'relative',
                  zIndex: 1
                }}>
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
