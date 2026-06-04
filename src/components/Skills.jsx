import React from 'react'
import { FaCode, FaMicrochip, FaTools, FaDatabase } from 'react-icons/fa'

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
