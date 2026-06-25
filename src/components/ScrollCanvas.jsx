import React, { useEffect, useRef, useState } from 'react'

const ScrollCanvas = () => {
  const canvasRef = useRef(null)
  const frameCount = 600

  const imagesRef = useRef({}) // Map of frameIndex (1-600) -> Image object
  const loadingQueueRef = useRef(new Set()) // Set of frameIndices currently loading
  const lastPrefetchedRef = useRef(1)
  const [loadedCount, setLoadedCount] = useState(0)

  const targetFrameRef = useRef(1)
  const currentFrameRef = useRef(1)
  const isAnimatingRef = useRef(false)

  // Load a single frame image on demand
  const loadImage = (index) => {
    if (imagesRef.current[index]) {
      return Promise.resolve(imagesRef.current[index])
    }
    if (loadingQueueRef.current.has(index)) {
      return Promise.resolve(null)
    }

    loadingQueueRef.current.add(index)
    return new Promise((resolve) => {
      const img = new Image()
      const frameNum = String(index).padStart(4, '0')
      // Suffix query parameters to bust Vercel Edge Cache and local browser caching
      img.src = `/frames/frame_${frameNum}.jpg?v=4`
      img.onload = () => {
        imagesRef.current[index] = img
        loadingQueueRef.current.delete(index)
        setLoadedCount((prev) => prev + 1)
        resolve(img)
      }
      img.onerror = () => {
        loadingQueueRef.current.delete(index)
        resolve(null)
      }
    })
  }

  // Draw frame on canvas with dynamic fallback to nearest loaded frame
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let img = imagesRef.current[frameIndex]

    // Fallback: draw the closest available preloaded frame if the exact frame isn't loaded yet
    if (!img || !img.complete) {
      let closestIdx = -1
      let minDiff = Infinity

      for (const key in imagesRef.current) {
        const idx = parseInt(key, 10)
        const diff = Math.abs(idx - frameIndex)
        if (diff < minDiff && imagesRef.current[idx] && imagesRef.current[idx].complete) {
          minDiff = diff
          closestIdx = idx
        }
      }

      if (closestIdx !== -1) {
        img = imagesRef.current[closestIdx]
      } else {
        return // Skip drawing if no image is loaded yet
      }
    }

    const canvasWidth = canvas.width
    const canvasHeight = canvas.height
    const imgWidth = img.width
    const imgHeight = img.height

    const imgRatio = imgWidth / imgHeight
    const canvasRatio = canvasWidth / canvasHeight

    let drawWidth, drawHeight, offsetX, offsetY

    if (imgRatio > canvasRatio) {
      drawHeight = canvasHeight
      drawWidth = canvasHeight * imgRatio
      offsetX = (canvasWidth - drawWidth) / 2
      offsetY = 0
    } else {
      drawWidth = canvasWidth
      drawHeight = canvasWidth / imgRatio
      offsetX = 0
      offsetY = (canvasHeight - drawHeight) / 2
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight)
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = 'high'
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }

  // Stream a window of adjacent frames around the active scroll index
  const prefetchWindow = (centerIndex) => {
    const priorityList = [centerIndex]

    // Priority: Fetch next 8 frames (forward direction) and previous 3 frames (backward history)
    for (let i = 1; i <= 8; i++) {
      const nextIdx = centerIndex + i
      if (nextIdx <= frameCount) priorityList.push(nextIdx)
      const prevIdx = centerIndex - i
      if (prevIdx >= 1 && i <= 3) priorityList.push(prevIdx)
    }

    // Trigger on-demand downloads without blocking the network queue
    priorityList.forEach((idx) => {
      loadImage(idx).then((img) => {
        // Redraw immediately if the user is still resting on this frame index
        if (img && Math.round(currentFrameRef.current) === idx) {
          drawFrame(idx)
        }
      })
    })
  }

  // Smooth frame render loop
  const animate = () => {
    const target = targetFrameRef.current
    let current = currentFrameRef.current

    const diff = target - current
    if (Math.abs(diff) < 0.05) {
      currentFrameRef.current = target
      const roundedTarget = Math.round(target)
      drawFrame(roundedTarget)

      if (roundedTarget !== lastPrefetchedRef.current) {
        lastPrefetchedRef.current = roundedTarget
        prefetchWindow(roundedTarget)
      }
      isAnimatingRef.current = false
    } else {
      // Easing multiplier of 0.08 for fluid scroll interpolation
      current += diff * 0.08
      currentFrameRef.current = current

      const roundedCurrent = Math.round(current)
      drawFrame(roundedCurrent)

      // Network throttling: only prefetch surrounding window if scrolling relatively slowly
      // If user is flicking/sweeping fast (diff >= 15), load only the single frame to save network queue bandwidth
      if (roundedCurrent !== lastPrefetchedRef.current) {
        lastPrefetchedRef.current = roundedCurrent
        if (Math.abs(diff) < 15) {
          prefetchWindow(roundedCurrent)
        } else {
          loadImage(roundedCurrent).then((img) => {
            if (img && Math.round(currentFrameRef.current) === roundedCurrent) {
              drawFrame(roundedCurrent)
            }
          })
        }
      }

      requestAnimationFrame(animate)
    }
  }

  // Get active frame index based on window scroll percentage
  const getScrollFrame = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (maxScroll <= 0) return 1

    const scrollFraction = Math.min(1, Math.max(0, scrollTop / maxScroll))
    return Math.min(
      frameCount,
      Math.max(1, Math.floor(scrollFraction * frameCount) + 1)
    )
  }

  // Pre-load initial view and sparse keyframe timeline
  useEffect(() => {
    const isMobile = window.innerWidth <= 768

    // 1. Immediately load target frame (always frame 1 for static fallback on mobile)
    const initialFrame = isMobile ? 1 : getScrollFrame()
    loadImage(initialFrame).then(() => {
      currentFrameRef.current = initialFrame
      targetFrameRef.current = initialFrame
      drawFrame(initialFrame)
    })

    if (isMobile) {
      // Bypass loading sparse keyframe frames on mobile to save bandwidth & memory
      return
    }

    // 2. Queue sparse keyframes (every 10th frame) to build a fast-seeking outline timeline
    // This loads only 60 images (~12MB) on page load instead of 600 (~130MB), keeping network pipes free.
    const sparseFrames = []
    for (let i = 1; i <= frameCount; i += 10) {
      if (i !== initialFrame) sparseFrames.push(i)
    }

    // Load sparse keyframes in small batches of 4 to prevent browser connection starvation
    const loadSparse = async () => {
      const batchSize = 4
      for (let i = 0; i < sparseFrames.length; i += batchSize) {
        const batch = sparseFrames.slice(i, i + batchSize)
        await Promise.all(batch.map((idx) => loadImage(idx)))
      }
    }
    loadSparse()
  }, [])

  // Scroll and Resize Event Listeners
  useEffect(() => {
    const isMobile = window.innerWidth <= 768

    const handleScroll = () => {
      const frameIndex = getScrollFrame()
      targetFrameRef.current = frameIndex

      // Trigger animation thread
      if (!isAnimatingRef.current) {
        isAnimatingRef.current = true
        requestAnimationFrame(animate)
      }
    }

    if (!isMobile) {
      window.addEventListener('scroll', handleScroll, { passive: true })
    }

    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        drawFrame(Math.round(currentFrameRef.current))
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Sizing setup

    return () => {
      if (!isMobile) {
        window.removeEventListener('scroll', handleScroll)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -2,
          pointerEvents: 'none',
          display: 'block',
          // Rich cinematic blur & filter effects
          filter: 'blur(3.5px) brightness(0.44) contrast(1.2) saturate(0.85)',
          // Scale up slightly to prevent fuzzy white bleeding borders caused by the blur filter
          transform: 'scale(1.04)',
          transition: 'filter 0.5s ease',
        }}
      />
      {/* Dark radial vignette gradient layer for depth and high text readability */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none',
          background: 'radial-gradient(circle at center, transparent 15%, rgba(10, 10, 15, 0.45) 55%, rgba(5, 5, 8, 0.88) 100%)',
        }}
      />
    </>
  )
}

export default ScrollCanvas
