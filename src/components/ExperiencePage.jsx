import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import Experience from './Experience'
import { InteractiveHoverButton } from './ui/InteractiveHoverButton'

const ExperiencePage = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="section-container" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ marginBottom: '20px' }}>
        <InteractiveHoverButton as={Link} to="/" className="glow-text">
          <HiArrowLeft style={{ display: 'inline' }} /> Back to Home
        </InteractiveHoverButton>
      </div>
      <Experience data={data} />
    </div>
  )
}

export default ExperiencePage
