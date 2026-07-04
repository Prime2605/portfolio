import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { InteractiveHoverButton } from './ui/InteractiveHoverButton'

const GalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="section-container" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ marginBottom: '20px' }}>
        <InteractiveHoverButton as={Link} to="/" className="glow-text">
          ← Back to Home
        </InteractiveHoverButton>
      </div>
      <h2 className="section-title glow-text" data-aos="fade-up">Gallery</h2>
      
      <div className="gallery-branch neumorphic-card" data-aos="fade-up" data-aos-delay="100">
        <h3 className="glow-text branch-title">IIST Thiruvananthapuram</h3>
        <p className="branch-subtitle">Hackorbital Hackathon | Organized by Conscientia 2025</p>
        
        <div className="event-details">
          <p><strong>Event:</strong> Annual Technical Fest of Indian Institute of Space Science and Technology</p>
          <p><strong>Date:</strong> 16-19 October 2025</p>
          <p><strong>Location:</strong> IIST, Thiruvananthapuram</p>
          <p><strong>Team Name:</strong> Hack Pirates</p>
          <p><strong>Team Members:</strong> Sudarsanam R, Santosh D</p>
        </div>

        <div className="gallery-grid">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="gallery-item neumorphic-card-inset">
              <img src={`/assets/gallery/iist/${num}.jpg`} alt={`IIST Hackathon photo ${num}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default GalleryPage
