import React from 'react'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

const projectsData = [
  {
    title: 'FPGA-based Trojan Recovery System',
    description: 'An advanced security system for real-time detection and recovery of hardware Trojans in FPGA-based systems. Implements embedded security protocols for robust protection against malicious modifications.',
    tags: ['FPGA', 'Verilog', 'Security', 'Embedded Systems'],
    github: 'https://github.com/Prime2605/FPGA-based-Online-Real-Time-Trojan-Recovery-and-Embedded-Security-System',
    emoji: '🛡️',
  },
  {
    title: 'Digital Image Forgery Detection',
    description: 'AI-powered forensic analysis system for detecting image forgeries and AI-generated images. Uses Error Level Analysis, noise variance analysis, and frequency domain techniques.',
    tags: ['Python', 'Flask', 'AI/ML', 'Image Processing'],
    github: 'https://github.com/Prime2605',
    emoji: '🔍',
  },
  {
    title: 'TNPSC Study App',
    description: 'A comprehensive web application for Tamil Nadu Public Service Commission exam preparation with study materials, practice tests, and resource management.',
    tags: ['React.js', 'Node.js', 'Database', 'Education'],
    github: 'https://github.com/Prime2605',
    emoji: '📚',
  },
  {
    title: 'Hall Allocation System',
    description: 'An intelligent hall allocation management system featuring a stunning 3D hero scene with React Three Fiber and interactive admin dashboard for efficient room management.',
    tags: ['React.js', 'Three.js', 'Full Stack', 'Management'],
    github: 'https://github.com/Prime2605',
    emoji: '🏛️',
  },
  {
    title: 'Li-Fi Communication System',
    description: 'Light Fidelity communication project using Arduino for data transmission through visible light. Demonstrates wireless communication through LED modulation.',
    tags: ['Arduino', 'Embedded C', 'Li-Fi', 'IoT'],
    github: 'https://github.com/Prime2605',
    emoji: '💡',
  },
  {
    title: 'Portfolio Website',
    description: 'This very portfolio! Built with React, Three.js, and Supabase featuring AOS animations, glassmorphism, and a dark royal theme with 3D interactive elements.',
    tags: ['React.js', 'Three.js', 'Supabase', 'Vite'],
    github: 'https://github.com/Prime2605/portfolio',
    emoji: '🚀',
  },
]

const Projects = ({ data }) => {
  const projects = data || projectsData

  return (
    <section className="section" id="projects">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">// What I've built</span>
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">
            From hardware security to full-stack web apps — a selection of my work
          </p>
        </div>

        <div className="projects-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '30px',
          width: '100%'
        }}>
          {(Array.isArray(projects) ? projects : projectsData).map((project, idx) => (
            <div
              key={idx}
              className="project-card"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              style={{
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(124, 58, 237, 0.4)',
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
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.border = '1px solid rgba(124, 58, 237, 0.7)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(124, 58, 237, 0.25), 0 0 20px rgba(6, 182, 212, 0.2)';
                const reflection = e.currentTarget.querySelector('.mirror-reflection');
                if (reflection) reflection.style.transform = 'translateX(100%)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.border = '1px solid rgba(124, 58, 237, 0.4)';
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

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))' }}>{project.emoji || '🚀'}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: '#fff', fontSize: '1.4rem', transition: 'all 0.3s', textShadow: '0 0 10px rgba(124, 58, 237, 0.8)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#7c3aed'}
                      onMouseLeave={e => e.currentTarget.style.color = '#fff'}
                      onClick={e => e.stopPropagation()}
                    >
                      <FaGithub />
                    </a>
                  )}
                  {project.live && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: '#fff', fontSize: '1.4rem', transition: 'all 0.3s', textShadow: '0 0 10px rgba(6, 182, 212, 0.8)' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#06b6d4'}
                      onMouseLeave={e => e.currentTarget.style.color = '#fff'}
                      onClick={e => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>

              <h3 style={{ 
                fontSize: '1.6rem', 
                fontWeight: '900', 
                color: '#fff', 
                marginBottom: '12px',
                lineHeight: '1.3',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
              }}>
                {project.title || project.name}
              </h3>

              <p style={{ 
                fontSize: '1.05rem', 
                color: '#f1f5f9', 
                lineHeight: '1.7',
                marginBottom: '24px',
                position: 'relative',
                zIndex: 1,
                fontWeight: '500'
              }}>
                {project.description}
              </p>

              <div style={{ 
                marginTop: 'auto', 
                display: 'flex', 
                gap: '10px', 
                flexWrap: 'wrap',
                position: 'relative',
                zIndex: 1 
              }}>
                {(project.tags || project.tech || []).map((tag, tIdx) => (
                  <span key={tIdx} style={{ 
                    fontSize: '0.8rem', 
                    background: 'rgba(124, 58, 237, 0.15)', 
                    color: '#c4b5fd', 
                    padding: '6px 14px', 
                    borderRadius: '8px',
                    border: '1px solid rgba(124, 58, 237, 0.4)',
                    fontWeight: '700',
                    letterSpacing: '0.5px'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
