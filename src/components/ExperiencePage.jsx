import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { HiArrowLeft } from 'react-icons/hi'
import Experience from './Experience'

const ExperiencePage = ({ data }) => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="section-container" style={{ minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container" style={{ marginBottom: '20px' }}>
        <Link to="/" className="btn-jelly btn-primary glow-text" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', fontSize: '0.95rem', textDecoration: 'none' }}>
          <HiArrowLeft /> Back to Home
        </Link>
      </div>
      <Experience data={data} />
    </div>
  )
}

export default ExperiencePage
