import React, { useEffect, useRef, useState } from 'react'

const ScrollCanvas = () => {
  const canvasRef = useRef(null)
  const [images, setImages] = useState([])
  const [loadedCount, setLoadedCount] = useState(0)
  const frameCount = 361
  const activeFrameRef = useRef(1)

  // Preload images
  useEffect(() => {
    const loadedImages = []
    let loaded = 0

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image()
      const frameNum = String(i).padStart(4, '0')
      img.src = `/frames/frame_${frameNum}.jpg`
      img.onload = () => {
        loaded++
        setLoadedCount(loaded)
        if (loaded === frameCount) {
          // All images loaded
        }
      }
      loadedImages.push(img)
    }
    setImages(loadedImages)
  }, [])

  // Draw current frame on canvas
  const drawFrame = (frameIndex) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const img = images[frameIndex - 1]
    if (!img || !img.complete) return

    // Clear and compute cover fit aspect ratio
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
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
  }

  // Handle resizing
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        drawFrame(activeFrameRef.current)
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize() // Initial set

    return () => window.removeEventListener('resize', handleResize)
  }, [images])

  // Handle scroll to sync with video frames
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (maxScroll <= 0) return

      const scrollFraction = Math.min(1, Math.max(0, scrollTop / maxScroll))
      const frameIndex = Math.min(
        frameCount,
        Math.max(1, Math.floor(scrollFraction * frameCount) + 1)
      )

      if (activeFrameRef.current !== frameIndex) {
        activeFrameRef.current = frameIndex
        requestAnimationFrame(() => drawFrame(frameIndex))
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial draw
    if (images.length > 0) {
      drawFrame(1)
    }

    return () => window.removeEventListener('scroll', handleScroll)
  }, [images])

  return (
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
        display: 'block'
      }}
    />
  )
}

export default ScrollCanvas
