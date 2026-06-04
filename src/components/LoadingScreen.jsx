import React from 'react'

const LoadingScreen = ({ loading }) => {
  return (
    <div className={`loading-screen ${!loading ? 'fade-out' : ''}`}>
      <div className="loading-logo">Prime R S</div>
      <div className="loading-bar">
        <div className="loading-bar-fill" />
      </div>
    </div>
  )
}

export default LoadingScreen
