import React from 'react'

const LoadingScreen = ({ loading }) => {
  return (
    <div className={`loading-screen premium-splash ${!loading ? 'fade-out' : ''}`}>
      <div className="splash-content">
        <h1 className="splash-title">PRIME R S</h1>
        <div className="splash-subtitle">Loading Experience...</div>
        <div className="splash-progress">
          <div className="splash-progress-bar" />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen
