import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import Certifications from './Certifications'
import { InteractiveHoverButton } from './ui/InteractiveHoverButton'

const CertificationsPage = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="section-container" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ paddingTop: '100px', paddingBottom: '30px' }}>
        <InteractiveHoverButton as={Link} to="/" className="glow-text" style={{ marginBottom: '20px' }}>
          ← Back to Home
        </InteractiveHoverButton>
      </div>
      <Certifications data={data} />
    </div>
  )
}

export default CertificationsPage
