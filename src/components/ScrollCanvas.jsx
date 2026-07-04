import React, { useEffect, useRef, useState } from 'react'

const ScrollCanvas = () => {
  const canvasRef = useRef(null)
  const videoRef = useRef(null)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
  const frameCount = 600

  // Canvas Refs
  const imagesRef = useRef({})
  const loadingQueueRef = useRef(new Set())
  const lastPrefetchedRef = useRef(1)
  const targetFrameRef = useRef(1)
  const currentFrameRef = useRef(1)
  const isAnimatingRef = useRef(false)

  // Video Refs
  const videoTargetTimeRef = useRef(0)
  const videoCurrentTimeRef = useRef(0)
  const isVideoAnimatingRef = useRef(false)

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
      const canvas = canvasRef.current
      if (canvas && window.innerWidth > 768) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        drawFrame(Math.round(currentFrameRef.current))
      }
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // --- DESKTOP CANVAS LOGIC ---

  const loadImage = (index) => {
    if (imagesRef.current[index]) return Promise.resolve(imagesRef.current[index])
    if (loadingQueueRef.current.has(index)) return Promise.resolve(null)

    loadingQueueRef.current.add(index)
    return new Promise((resolve) => {
      const img = new Image()
      const frameNum = String(index).padStart(4, '0')
      img.src = `/frames/frame_${frameNum}.jpg?v=4`
      img.onload = () => {
        imagesRef.current[index] = img
        loadingQueueRef.current.delete(index)
        resolve(img)
      }
      img.onerror = () => {
        loadingQueueRef.current.delete(index)
        resolve(null)
      }
    })
  }

  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let img = imagesRef.current[frameIndex]

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
        return
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

  const prefetchWindow = (centerIndex) => {
    const priorityList = [centerIndex]
    for (let i = 1; i <= 8; i++) {
      if (centerIndex + i <= frameCount) priorityList.push(centerIndex + i)
      if (centerIndex - i >= 1 && i <= 3) priorityList.push(centerIndex - i)
    }
    priorityList.forEach((idx) => {
      loadImage(idx).then((img) => {
        if (img && Math.round(currentFrameRef.current) === idx) {
          drawFrame(idx)
        }
      })
    })
  }

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
      current += diff * 0.08
      currentFrameRef.current = current
      const roundedCurrent = Math.round(current)
      drawFrame(roundedCurrent)

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

  // --- MOBILE VIDEO LOGIC ---
  const animateVideo = () => {
    if (!videoRef.current || !videoRef.current.duration) {
      isVideoAnimatingRef.current = false
      return
    }
    
    const target = videoTargetTimeRef.current
    let current = videoCurrentTimeRef.current
    const diff = target - current
    
    // Smoothness interpolation
    if (Math.abs(diff) < 0.01) {
      videoCurrentTimeRef.current = target
      videoRef.current.currentTime = target
      isVideoAnimatingRef.current = false
    } else {
      current += diff * 0.08 // same easing as desktop
      videoCurrentTimeRef.current = current
      videoRef.current.currentTime = current
      requestAnimationFrame(animateVideo)
    }
  }

  // --- SHARED SCROLL LISTENER ---
  const getScrollFraction = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    if (maxScroll <= 0) return 0
    return Math.min(1, Math.max(0, scrollTop / maxScroll))
  }

  useEffect(() => {
    const handleScroll = () => {
      const fraction = getScrollFraction()

      if (isMobile) {
        if (videoRef.current && videoRef.current.duration) {
          videoTargetTimeRef.current = fraction * videoRef.current.duration
          if (!isVideoAnimatingRef.current) {
            isVideoAnimatingRef.current = true
            requestAnimationFrame(animateVideo)
          }
        }
      } else {
        const frameIndex = Math.min(frameCount, Math.max(1, Math.floor(fraction * frameCount) + 1))
        targetFrameRef.current = frameIndex
        if (!isAnimatingRef.current) {
          isAnimatingRef.current = true
          requestAnimationFrame(animate)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isMobile])

  // --- DESKTOP PRELOAD ---
  useEffect(() => {
    if (isMobile) return

    const initialFrame = getScrollFraction() === 0 ? 1 : Math.min(frameCount, Math.max(1, Math.floor(getScrollFraction() * frameCount) + 1))
    
    loadImage(initialFrame).then(() => {
      currentFrameRef.current = initialFrame
      targetFrameRef.current = initialFrame
      drawFrame(initialFrame)
    })

    const sparseFrames = []
    for (let i = 1; i <= frameCount; i += 10) {
      if (i !== initialFrame) sparseFrames.push(i)
    }

    const loadSparse = async () => {
      const batchSize = 4
      for (let i = 0; i < sparseFrames.length; i += batchSize) {
        const batch = sparseFrames.slice(i, i + batchSize)
        await Promise.all(batch.map((idx) => loadImage(idx)))
      }
    }
    loadSparse()
  }, [isMobile])

  // Handle Video Metadata Loaded for initial time set
  const handleVideoLoaded = () => {
    if (isMobile && videoRef.current) {
       const fraction = getScrollFraction()
       const target = fraction * videoRef.current.duration
       videoTargetTimeRef.current = target
       videoCurrentTimeRef.current = target
       videoRef.current.currentTime = target
    }
  }

  return (
    <>
      {!isMobile ? (
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
            filter: 'blur(3.5px) brightness(0.44) contrast(1.2) saturate(0.85)',
            transform: 'scale(1.04)',
            transition: 'filter 0.5s ease',
          }}
        />
      ) : (
        <video
          ref={videoRef}
          src="/assets/mobile-bg-scroll.mp4"
          muted
          playsInline
          onLoadedMetadata={handleVideoLoaded}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            objectFit: 'cover',
            zIndex: -2,
            pointerEvents: 'none',
            display: 'block',
            filter: 'brightness(0.44) contrast(1.2) saturate(0.85)',
          }}
        />
      )}
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
