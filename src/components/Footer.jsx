import React from 'react'
import { FaHeart } from 'react-icons/fa'

const Footer = () => {
  const year = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">{'<Prime />'}</div>
          <ul className="footer-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
          <p className="footer-text">
            © {year} Prime R S. Crafted with <FaHeart style={{ color: 'var(--accent-rose)', verticalAlign: 'middle', fontSize: '0.8rem' }} /> and lots of code.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
