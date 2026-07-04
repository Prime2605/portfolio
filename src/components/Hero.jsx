import React from 'react'
import { Link } from 'react-router-dom'
import { TypeAnimation } from 'react-type-animation'
import { FaGithub, FaLinkedinIn, FaInstagram, FaDiscord } from 'react-icons/fa'
import { HiArrowDown } from 'react-icons/hi'
import { InteractiveHoverButton } from './ui/InteractiveHoverButton'
import { PulsatingButton } from './ui/PulsatingButton'
import { Text3DFlip } from './ui/Text3DFlip'

const Hero = ({ data }) => {
  return (
    <section className="hero section" id="home" style={{ background: 'transparent' }}>
      <div className="container">
        <div className="hero-content">
          <div className="hero-text" data-aos="fade-right">
            <p className="hero-greeting">
              Hello, I'm
            </p>
            <div className="hero-name">
              <Text3DFlip as="h1" className="hero-name-3d" textClassName="highlight" flipTextClassName="highlight" rotateDirection="top">PRIME R S</Text3DFlip>
            </div>
            <div className="hero-tagline">
              <TypeAnimation
                sequence={[
                  'Aspiring Researcher',
                  2000,
                  'ECE Student',
                  2000,
                  'Full Stack Developer',
                  2000,
                  'Hardware Enthusiast',
                  2000,
                  'FPGA Developer',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                style={{ color: 'var(--accent-secondary)' }}
              />
            </div>
            <p className="hero-description">
              Passionate Electronics & Communication Engineering student with a dual focus on 
              hardware innovation and software development. Building the future one circuit 
              and one line of code at a time.
            </p>
            <div className="hero-buttons" style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
              <InteractiveHoverButton as="a" href="#contact" id="hero-contact-btn">
                Get In Touch
              </InteractiveHoverButton>
              <InteractiveHoverButton as={Link} to="/documents" id="hero-documents-btn">
                Documents
              </InteractiveHoverButton>
              <InteractiveHoverButton as="a" href="#projects" id="hero-projects-btn">
                View Projects
              </InteractiveHoverButton>
              <InteractiveHoverButton as={Link} to="/gallery" id="hero-gallery-btn">
                View Gallery
              </InteractiveHoverButton>
            </div>
            <div className="hero-socials">
              <a href="https://github.com/Prime2605" target="_blank" rel="noopener noreferrer" aria-label="GitHub" id="social-github">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/prime-r-s-0b7585318" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" id="social-linkedin">
                <FaLinkedinIn />
              </a>
              <a href="https://www.instagram.com/prime_snkar" target="_blank" rel="noopener noreferrer" aria-label="Instagram" id="social-instagram">
                <FaInstagram />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" aria-label="Discord" id="social-discord">
                <FaDiscord />
              </a>
            </div>
          </div>
          <div className="hero-3d" data-aos="fade-left" data-aos-delay="200" style={{ pointerEvents: 'none' }}>
            {/* Transparent space for scroll-animated blackhole background */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
