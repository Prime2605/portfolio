import React from 'react'
import { FiArrowRight } from 'react-icons/fi'

export const InteractiveHoverButton = ({
  children,
  className = '',
  as: Component = 'button',
  ...props
}) => {
  return (
    <Component
      className={`interactive-hover-btn ${className}`}
      {...props}
    >
      <div className="interactive-hover-btn-inner">
        <div className="interactive-hover-btn-dot"></div>
        <span className="interactive-hover-btn-text">
          {children}
        </span>
      </div>
      <div className="interactive-hover-btn-overlay">
        <span>{children}</span>
        <FiArrowRight />
      </div>
    </Component>
  )
}
