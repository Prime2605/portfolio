import React, { useState, useEffect, useRef } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Education from './components/Education'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import { api } from './lib/api'
import { supabase } from './lib/supabase'

function App() {
  const [loading, setLoading] = useState(true)
  const [portfolioData, setPortfolioData] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cursorRef = useRef(null)

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      delay: 50,
    })

    // Try fetching from backend API, fallback to static data
    const fetchData = async () => {
      try {
        const data = await api.getAll()
        setPortfolioData(data)
      } catch (err) {
        console.log('Backend not available, using static data')
        setPortfolioData(null)
      }
    }

    fetchData()

    // Simulate loading for visual effect
    const timer = setTimeout(() => {
      setLoading(false)
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    AOS.refresh()
  }, [loading])

  return (
    <>
      <LoadingScreen loading={loading} />
      
      <div className="app-background" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="cursor-glow" ref={cursorRef} />

      <Navbar />
      <main>
        <Hero data={portfolioData?.profile} />
        <About data={portfolioData?.profile} />
        <Skills data={portfolioData?.skills} />
        <Education data={portfolioData?.education} />
        <Projects data={portfolioData?.projects} />
        <Certifications data={portfolioData?.certifications} />
        <Contact data={portfolioData?.profile} />
      </main>
      <Footer />
    </>
  )
}

export default App
