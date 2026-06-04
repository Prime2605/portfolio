import React, { useState } from 'react'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedinIn, FaInstagram, FaDiscord, FaPaperPlane } from 'react-icons/fa'
import { api } from '../lib/api'

const Contact = ({ data }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    setStatus(null)

    try {
      await api.sendMessage(form)
      setStatus({ type: 'success', message: '✨ Message sent successfully! I\'ll get back to you soon.' })
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      // Fallback: Try mailto
      const mailtoLink = `mailto:rsprime265@gmail.com?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(`From: ${form.name} (${form.email})\n\n${form.message}`)}`
      window.open(mailtoLink)
      setStatus({ type: 'success', message: '📧 Opening your email client. You can also reach me directly.' })
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">// Let's connect</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">
            Have a question or want to collaborate? Feel free to reach out!
          </p>
        </div>

        <div className="contact-container">
          <div className="glass-card contact-info-card" data-aos="fade-right" data-aos-delay="100">
            <h3>Let's Build Something <span style={{ color: 'var(--accent-primary)' }}>Amazing</span></h3>
            <p>
              Whether it's a hardware project, a web application, or a research collaboration — 
              I'm always excited to explore new opportunities and ideas.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-item-icon"><FaEnvelope /></div>
                <div>
                  <div className="contact-item-label">Email</div>
                  <div className="contact-item-text">rsprime265@gmail.com</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><FaPhone /></div>
                <div>
                  <div className="contact-item-label">Phone</div>
                  <div className="contact-item-text">+91 908099730</div>
                </div>
              </div>
              <div className="contact-item">
                <div className="contact-item-icon"><FaMapMarkerAlt /></div>
                <div>
                  <div className="contact-item-label">Location</div>
                  <div className="contact-item-text">Chinnasalem, Kallakurichi, TN</div>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <a href="https://github.com/Prime2605" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="GitHub" id="contact-github">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/prime-r-s-0b7585318" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="LinkedIn" id="contact-linkedin">
                <FaLinkedinIn />
              </a>
              <a href="https://www.instagram.com/prime_snkar" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="Instagram" id="contact-instagram">
                <FaInstagram />
              </a>
              <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="contact-social-link" aria-label="Discord" id="contact-discord">
                <FaDiscord />
              </a>
            </div>
          </div>

          <form className="glass-card contact-form-card" data-aos="fade-left" data-aos-delay="200" onSubmit={handleSubmit} id="contact-form">
            <div className="form-group">
              <label htmlFor="contact-name">Your Name</label>
              <input
                type="text"
                id="contact-name"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">Your Email</label>
              <input
                type="email"
                id="contact-email"
                name="email"
                className="form-input"
                placeholder="john@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-subject">Subject</label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                className="form-input"
                placeholder="Project Collaboration"
                value={form.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">Message</label>
              <textarea
                id="contact-message"
                name="message"
                className="form-textarea"
                placeholder="Tell me about your idea..."
                value={form.message}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn-jelly btn-primary form-submit" disabled={sending} id="contact-submit">
              {sending ? 'Sending...' : <>Send Message <FaPaperPlane /></>}
            </button>
            {status && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
