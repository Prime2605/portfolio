import React from 'react'
import { Link } from 'react-router-dom'
import { InteractiveHoverButton } from './ui/InteractiveHoverButton'
import { 
  FaGithub, 
  FaExternalLinkAlt, 
  FaBook, 
  FaMobileAlt, 
  FaSearch, 
  FaShieldAlt, 
  FaKey, 
  FaUniversity, 
  FaSeedling, 
  FaMapMarkedAlt, 
  FaLink, 
  FaCode 
} from 'react-icons/fa'

const projectIcons = {
  '🌾': <FaSeedling />,
  '🏛️': <FaUniversity />,
  '📚': <FaBook />,
  '📱': <FaMobileAlt />,
  '🔍': <FaSearch />,
  '🪖': <FaMapMarkedAlt />,
  '🛡️': <FaShieldAlt />,
  '🔗': <FaLink />,
  '🔐': <FaKey />,
}

const getProjectIcon = (emoji) => {
  return projectIcons[emoji] || <FaCode />
}

const projectsData = [
  {
    title: 'AI Crop Advisor',
    description: 'An AI-powered agricultural advisory system featuring an interactive Leaflet/OSM map, real-time weather integration (OpenWeather API), suitability scoring for 70+ crops, and a slide-in AI Chat Assistant powered by the GitHub Models API. Designed with a custom gold and royal purple glassmorphism UI.',
    tags: ['React', 'Node.js', 'GitHub Models API', 'Leaflet', 'Supabase', 'OpenWeather API'],
    github: 'https://github.com/Prime2605/AI-Crop-Advisor',
    emoji: '🌾',
  },
  {
    title: 'University Exam Hall Allotment System',
    description: 'A web application for automating student seat allocation for university exams. Features PDF parsing of student hall tickets and timetables (Anna University format), hall layout configuration, and an intelligent seat assignment algorithm that ensures no adjacent students share the same subject.',
    tags: ['Next.js 15', 'FastAPI', 'Python', 'Tailwind CSS', 'SQLAlchemy', 'SQLite'],
    github: 'https://github.com/Prime2605/Exam_hall_allotment',
    emoji: '🏛️',
  },
  {
    title: 'Library Automation & Management System',
    description: 'A library management solution combining a Python Flask backend with a React frontend. Employs a dual-theme design: a cinematic 3D landing page (with a floating book and particle systems using React Three Fiber) and a clean, light-themed admin dashboard with analytics and borrowing statistics.',
    tags: ['React.js', 'Flask', 'React Three Fiber', 'SQLite', 'SQLAlchemy', 'Excel Integration'],
    github: 'https://github.com/Prime2605/Library_Automation',
    emoji: '📚',
  },
  {
    title: 'Digital OTP-Based Smart Attendance System',
    description: 'An OTP-based attendance tracker for educational institutions. Allows staff to generate dynamic, time-limited OTP codes tied to specific class periods. Students log in during class, submit the OTP, and the system verifies credentials, period timings, and logs attendance into a Supabase database.',
    tags: ['Python', 'Flask', 'Supabase', 'HTML5/JS', 'SQL', 'PostgreSQL'],
    github: 'https://github.com/Prime2605/Digital-Attendance',
    emoji: '📱',
  },
  {
    title: 'Image Fraud & Forgery Detection System',
    description: 'A digital forensics application implementing a multi-criteria analysis engine. Features SIFT-based descriptor extraction and DBSCAN spatial clustering for copy-move forgery detection, Error Level Analysis (ELA) and FFT analysis for AI-generated images, and HSV/Laplacian edge analysis for doodle/tamper detection.',
    tags: ['Python', 'OpenCV', 'scikit-learn', 'Flask', 'NumPy', 'Computer Vision'],
    github: 'https://github.com/Prime2605/Image-Fraud-Detection',
    emoji: '🔍',
  },
  {
    title: 'NAND Navigators: Tactical Tracking & Survival System',
    description: 'An indoor localization platform for GPS-denied tactical operations. Fuses ESP32 multi-sensor telemetry (Madgwick 9DoF orientation, ZUPT dead reckoning, barometric height, and UWB peer ranging). Features a safety engine (fall/heart-rate alerts) and an interactive Three.js 3D command center dashboard.',
    tags: ['ESP32', 'Arduino/C++', 'Three.js', 'WebSockets', 'LoRa', 'Sensor Fusion'],
    github: 'https://github.com/Prime2605/NAND-Navigators',
    emoji: '🪖',
  },
  {
    title: 'SENTINEL-X: Hardware Trojan Detection & Self-Healing',
    description: 'An multi-layer hardware security framework implemented on a Spartan-7 FPGA using Verilog. Protects against supply chain Hardware Trojans via boot-time PUF fingerprinting, real-time AI-based Trojan detection using a decision tree classifier, and automatic isolation and hot-swapping to a backup ALU.',
    tags: ['Verilog', 'FPGA', 'Xilinx Vivado', 'Hardware Security', 'PUF', 'Logic Design'],
    github: 'https://github.com/Prime2605/FPGA-based-Online-Real-Time-Trojan-Recovery-and-Embedded-Security-System',
    emoji: '🛡️',
  },
  {
    title: 'Blockchain Academic Authenticity Validator',
    description: 'A secure credential verification system developed for Smart India Hackathon 2024. Combines a custom SHA-256 proof-of-work blockchain ledger with an AI forensics engine (Tesseract OCR and fraud classification models), PKI digital signing, and government-compliant DigiLocker/NAD integration.',
    tags: ['Python', 'Flask', 'Blockchain', 'Cryptography', 'OCR', 'Machine Learning'],
    github: 'https://github.com/Prime2605/Academic-Authenticity-Validator',
    emoji: '🔗',
  },
  {
    title: 'Secured Door Lock System using Li-Fi Technology',
    description: 'A wireless light-based security lock system utilizing Li-Fi (Visible Light Communication). Decodes password patterns flashed from an Android transmitter app to an Arduino receiver unit via an LDR sensor, controlling a servo-driven deadbolt, buzzer alerts, status LEDs, and an LCD interface.',
    tags: ['Arduino', 'Embedded C', 'Li-Fi', 'VLC', 'IoT', 'Hardware Security'],
    github: 'https://github.com/Prime2605/Door-Lock-System',
    emoji: '🔐',
  },
]

const Projects = ({ data, limit }) => {
  const allProjects = data || projectsData
  const displayedProjects = limit ? allProjects.slice(0, limit) : allProjects

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
          width: '100%',
          marginBottom: limit ? '0px' : '40px'
        }}>
          {displayedProjects.map((project, idx) => (
            <div
              key={idx}
              className="project-card"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '2.5rem', color: 'var(--accent-secondary)', filter: 'drop-shadow(0 0 10px rgba(6, 182, 212, 0.4))' }}>{getProjectIcon(project.emoji)}</span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {project.github && (
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'var(--text-primary)', fontSize: '1.4rem', transition: 'all 0.3s', textShadow: '0 0 10px var(--border-highlight)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-primary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
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
                      style={{ color: 'var(--text-primary)', fontSize: '1.4rem', transition: 'all 0.3s', textShadow: '0 0 10px var(--border-highlight-blue)' }}
                      onMouseEnter={e => e.currentTarget.style.color = 'var(--accent-secondary)'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--text-primary)'}
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
                color: 'var(--text-primary)', 
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
                color: 'var(--text-secondary)', 
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
                    background: 'var(--bg-highlight)', 
                    color: 'var(--text-primary)', 
                    padding: '6px 14px', 
                    borderRadius: '8px',
                    border: '1px solid var(--border-highlight)',
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

        {limit && allProjects.length > limit && (
          <div className="section-footer" style={{ textAlign: 'center', marginTop: '30px' }}>
            <InteractiveHoverButton as={Link} to="/projects" className="glow-text">
              See All Projects
            </InteractiveHoverButton>
          </div>
        )}
      </div>
    </section>
  )
}

export default Projects
