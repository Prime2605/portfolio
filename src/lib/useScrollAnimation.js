/**
 * useScrollAnimation.js
 * ─────────────────────────────────────────────────────────────
 * Three.js-powered animate-on-scroll utilities for the Portfolio.
 *
 * Usage:
 *   const { ref, scrollY, progress } = useScrollAnimation()
 *   const opacity = mapRange(progress, 0, 0.5, 0, 1)
 * ─────────────────────────────────────────────────────────────
 */

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'

// ─── mapRange ────────────────────────────────────────────────
// Maps a value from one range to another, optionally clamped.
export function mapRange(value, inMin, inMax, outMin, outMax, clamp = true) {
  const mapped = ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
  if (!clamp) return mapped
  return Math.min(Math.max(mapped, Math.min(outMin, outMax)), Math.max(outMin, outMax))
}

// ─── lerp ────────────────────────────────────────────────────
export function lerp(a, b, t) {
  return a + (b - a) * t
}

// ─── easing helpers ──────────────────────────────────────────
export const ease = {
  inOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outExpo: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
  spring: (t) => {
    const c4 = (2 * Math.PI) / 3
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1
  },
}

// ─── useScrollProgress ───────────────────────────────────────
/**
 * Tracks overall page scroll progress (0 → 1).
 * Also exposes raw scrollY pixel value.
 */
export function useScrollProgress() {
  const [scrollY, setScrollY] = useState(0)
  const [progress, setProgress] = useState(0)
  const rafRef = useRef(null)
  const currentRef = useRef(0)

  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const raw = window.scrollY
      currentRef.current = raw
      setScrollY(raw)
      setProgress(maxScroll > 0 ? raw / maxScroll : 0)
      rafRef.current = null
    }

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    update() // init
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return { scrollY, progress }
}

// ─── useElementScroll ────────────────────────────────────────
/**
 * Returns the scroll progress (0 → 1) of a DOM element
 * relative to the viewport. 0 = element enters viewport,
 * 1 = element fully exits from top.
 *
 * @param {object} options
 * @param {number} options.offset  - fraction of element height to use as start offset (default 0.15)
 */
export function useElementScroll({ offset = 0.15 } = {}) {
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)
  const [inView, setInView] = useState(false)
  const rafRef = useRef(null)

  const calculate = useCallback(() => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const vh = window.innerHeight
    // start: element bottom enters viewport; end: element top leaves top of viewport
    const start = vh - rect.height * offset
    const end = -rect.height * (1 - offset)
    const raw = (rect.top - start) / (end - start)
    const clamped = Math.min(Math.max(raw, 0), 1)
    setProgress(clamped)
    setInView(rect.top < vh && rect.bottom > 0)
    rafRef.current = null
  }, [offset])

  useEffect(() => {
    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(calculate)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', calculate)
    calculate()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', calculate)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [calculate])

  return { ref, progress, inView }
}

// ─── useScrollThree ──────────────────────────────────────────
/**
 * Bridges page scroll position into Three.js units via THREE.MathUtils.
 * Returns a reactive Three.js Vector3 that you can attach to any R3F object.
 *
 * @param {object} opts
 * @param {number[]} opts.yRange        - [start, end] in Three.js world units along Y
 * @param {number}   opts.lerpFactor    - smoothing factor (default 0.06)
 */
export function useScrollThree({ yRange = [0, -10], lerpFactor = 0.06 } = {}) {
  const vec = useRef(new THREE.Vector3())
  const target = useRef(new THREE.Vector3())
  const { progress } = useScrollProgress()

  // Update target Y based on scroll progress
  useEffect(() => {
    const y = THREE.MathUtils.lerp(yRange[0], yRange[1], progress)
    target.current.set(0, y, 0)
  }, [progress, yRange])

  // Animate loop: lerp vec toward target (call inside useFrame)
  const update = useCallback(() => {
    vec.current.lerp(target.current, lerpFactor)
    return vec.current
  }, [lerpFactor])

  return { vec, update, progress }
}

// ─── useParallax ─────────────────────────────────────────────
/**
 * CSS-only parallax helper for regular DOM elements.
 * Returns a style object you spread onto the element.
 *
 * @param {number} speed   - parallax speed factor (-1 to 1, 0 = no parallax, negative = opposite direction)
 * @param {string} axis    - 'Y' (default) or 'X'
 */
export function useParallax(speed = 0.3, axis = 'Y') {
  const { scrollY } = useScrollProgress()
  const offset = scrollY * speed
  return {
    transform: axis === 'Y' ? `translateY(${offset}px)` : `translateX(${offset}px)`,
    willChange: 'transform',
  }
}

// ─── useReveal ───────────────────────────────────────────────
/**
 * Intersection Observer-based reveal hook. Returns whether
 * the element has entered the viewport.
 *
 * @param {object} options
 * @param {number} options.threshold  - IO threshold (default 0.15)
 * @param {string} options.rootMargin - IO rootMargin (default '0px 0px -60px 0px')
 * @param {boolean} options.once      - only trigger once (default true)
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -60px 0px', once = true } = {}) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold, rootMargin }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, visible }
}
