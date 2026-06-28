import React, { useImperativeHandle, useLayoutEffect, useRef } from "react"

export const PulsatingButton = React.forwardRef(
  (
    {
      className = "",
      children,
      pulseColor,
      duration = "1.5s",
      distance = "8px",
      variant = "pulse",
      as: Component = "button",
      ...props
    },
    ref
  ) => {
    const innerRef = useRef(null)
    useImperativeHandle(ref, () => innerRef.current)

    useLayoutEffect(() => {
      const button = innerRef.current
      if (!button) return

      if (pulseColor) {
        button.style.removeProperty("--bg")
        return
      }

      let animationFrameId = 0
      let currentBg = ""

      const updateBg = () => {
        animationFrameId = 0
        const nextBg = getComputedStyle(button).backgroundColor
        if (nextBg === currentBg) return

        currentBg = nextBg
        button.style.setProperty("--bg", nextBg)
      }

      const scheduleBgUpdate = () => {
        if (animationFrameId) return
        animationFrameId = window.requestAnimationFrame(updateBg)
      }

      updateBg()

      const themeObserver = new MutationObserver(scheduleBgUpdate)
      themeObserver.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      })

      const buttonObserver = new MutationObserver(scheduleBgUpdate)
      buttonObserver.observe(button, {
        attributes: true,
      })

      const syncEvents = ["blur", "focus", "pointerenter", "pointerleave"]

      for (const eventName of syncEvents) {
        button.addEventListener(eventName, scheduleBgUpdate)
      }

      return () => {
        if (animationFrameId) {
          window.cancelAnimationFrame(animationFrameId)
        }
        themeObserver.disconnect()
        buttonObserver.disconnect()

        for (const eventName of syncEvents) {
          button.removeEventListener(eventName, scheduleBgUpdate)
        }
      }
    }, [pulseColor])

    return (
      <Component
        ref={innerRef}
        className={`pulsating-button ${className}`}
        style={
          {
            ...(pulseColor && { "--pulse-color": pulseColor }),
            "--duration": duration,
            "--distance": distance,
          }
        }
        {...props}
      >
        <span className="pulsating-button-content">{children}</span>
        <span
          aria-hidden="true"
          className={`pulsating-button-ring ${
            variant === "pulse" ? "animate-pulse" : "animate-pulse-ripple"
          }`}
        />
      </Component>
    )
  }
)

PulsatingButton.displayName = "PulsatingButton"
