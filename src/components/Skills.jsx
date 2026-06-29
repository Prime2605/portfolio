import React from 'react'
import { FaCode, FaMicrochip, FaTools, FaDatabase, FaGithub } from 'react-icons/fa'
import { SiPython, SiCplusplus, SiJavascript, SiReact, SiNodedotjs, SiFlask, SiArduino, SiLinux, SiVercel, SiFigma } from 'react-icons/si'
import { ScrollVelocityContainer, ScrollVelocityRow } from './ui/ScrollBasedVelocity'

const skillCategories = [
  {
    icon: <FaCode />,
    title: 'Programming Languages',
    skills: ['Python', 'C++', 'JavaScript', 'Verilog', 'VHDL', 'HTML/CSS'],
  },
  {
    icon: <FaDatabase />,
    title: 'Frameworks & Libraries',
    skills: ['React.js', 'Node.js', 'Express.js', 'Flask', 'Three.js', 'Supabase'],
  },
  {
    icon: <FaMicrochip />,
    title: 'Hardware & Embedded',
    skills: ['FPGA Design', 'Microcontrollers', 'Arduino', 'Sensor Modules', 'PCB Design', 'Digital Electronics'],
  },
  {
    icon: <FaTools />,
    title: 'Tools & Platforms',
    skills: ['Git & GitHub', 'VS Code', 'Xilinx Vivado', 'Vercel', 'Linux', 'Figma'],
  },
]

const Skills = ({ data }) => {
  const categories = data || skillCategories

  return (
    <section className="section" id="skills">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">// What I work with</span>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A versatile skill set spanning both software development and hardware engineering
          </p>
        </div>

        <ScrollVelocityContainer className="skills-velocity-container" style={{ margin: '40px 0', position: 'relative' }}>
          <ScrollVelocityRow baseVelocity={3} direction={1}>
            {[
              { name: 'Python', icon: <SiPython /> },
              { name: 'C++', icon: <SiCplusplus /> },
              { name: 'JavaScript', icon: <SiJavascript /> },
              { name: 'React.js', icon: <SiReact /> },
              { name: 'Node.js', icon: <SiNodedotjs /> },
              { name: 'Flask', icon: <SiFlask /> },
              { name: 'Express.js', icon: <FaDatabase /> },
              { name: 'Three.js', icon: <FaCode /> },
            ].map((skill, idx) => (
              <div key={idx} className="velocity-skill-badge" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 24px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-highlight)',
                borderRadius: '16px',
                margin: '0 12px',
                color: 'var(--text-primary)',
                fontWeight: '600',
                fontSize: '1.1rem',
                backdropFilter: 'blur(10px)',
                boxShadow: 'var(--shadow-card)'
              }}>
                <span style={{ color: '#7c3aed', fontSize: '1.5rem' }}>{skill.icon}</span>
                {skill.name}
              </div>
            ))}
          </ScrollVelocityRow>
          
          <ScrollVelocityRow baseVelocity={3} direction={-1} style={{ marginTop: '24px' }}>
            {[
              { name: 'FPGA Design', icon: <FaMicrochip /> },
              { name: 'Microcontrollers', icon: <FaMicrochip /> },
              { name: 'Arduino', icon: <SiArduino /> },
              { name: 'Linux', icon: <SiLinux /> },
              { name: 'Vercel', icon: <SiVercel /> },
              { name: 'Figma', icon: <SiFigma /> },
              { name: 'Git & GitHub', icon: <FaGithub /> },
              { name: 'VS Code', icon: <FaTools /> },
            ].map((skill, idx) => (
              <div key={idx} className="velocity-skill-badge" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 24px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-highlight-blue)',
                borderRadius: '16px',
                margin: '0 12px',
                color: 'var(--text-primary)',
                fontWeight: '600',
                fontSize: '1.1rem',
                backdropFilter: 'blur(10px)',
                boxShadow: 'var(--shadow-card)'
              }}>
                <span style={{ color: '#06b6d4', fontSize: '1.5rem' }}>{skill.icon}</span>
                {skill.name}
              </div>
            ))}
          </ScrollVelocityRow>
          
          <div style={{ pointerEvents: 'none', position: 'absolute', top: 0, bottom: 0, left: 0, width: '25%', background: 'linear-gradient(to right, var(--bg-primary) 0%, transparent 100%)', zIndex: 2 }}></div>
          <div style={{ pointerEvents: 'none', position: 'absolute', top: 0, bottom: 0, right: 0, width: '25%', background: 'linear-gradient(to left, var(--bg-primary) 0%, transparent 100%)', zIndex: 2 }}></div>
        </ScrollVelocityContainer>

        <div className="skills-container">
          {(Array.isArray(categories) ? categories : skillCategories).map((category, idx) => (
            <div
              className="glass-card skill-category"
              key={idx}
              data-aos="fade-up"
              data-aos-delay={idx * 100}
              style={{ padding: '28px' }}
            >
              <div className="skill-category-header">
                <div className="skill-category-icon">
                  {category.icon || <FaCode />}
                </div>
                <h3 className="skill-category-title">{category.title}</h3>
              </div>
              <div className="skills-grid">
                {(category.skills || []).map((skill, sIdx) => (
                  <span className="skill-tag" key={sIdx}>
                    {typeof skill === 'string' ? skill : skill.name}
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

export default Skills
