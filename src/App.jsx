import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'
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
import Documents from './components/Documents'
import ScrollCanvas from './components/ScrollCanvas'
import GalleryPage from './components/GalleryPage'
import { AnimatedThemeToggler } from './components/ui/AnimatedThemeToggler'
import { api } from './lib/api'
import { supabase } from './lib/supabase'
import Experience from './components/Experience'
import ProjectsPage from './components/ProjectsPage'
import CertificationsPage from './components/CertificationsPage'
import ExperiencePage from './components/ExperiencePage'

function AppContent() {
  const [loading, setLoading] = useState(true)
  const [portfolioData, setPortfolioData] = useState(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const cursorRef = useRef(null)
  const location = useLocation()

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
      delay: 50,
      disable: 'mobile',
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

    // Scroll to section hash when loading completes
    if (!loading && location.hash) {
      setTimeout(() => {
        const el = document.querySelector(location.hash)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }, 100)
    }
  }, [loading, location.hash])

  // Scroll to top when pathname changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <>
      <LoadingScreen loading={loading} />
      
      <div className="app-background" />
      {location.pathname !== '/gallery' && <ScrollCanvas />}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      <div className="cursor-glow" ref={cursorRef} />

      <AnimatedThemeToggler />

      <Navbar />
      <Routes>
        <Route path="/" element={
          <main>
            <Hero data={portfolioData?.profile} />
            <About data={portfolioData?.profile} />
            <Skills data={portfolioData?.skills} />
            <Education data={portfolioData?.education} />
            <Experience data={portfolioData?.certifications} limit={3} />
            <Projects data={portfolioData?.projects} limit={3} />
            <Certifications data={portfolioData?.certifications} limit={3} />
            <Contact data={portfolioData?.profile} />
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0 0 80px 0' }}>
              <Link to="/gallery" className="btn-jelly btn-primary glow-text" style={{ padding: '16px 40px', fontSize: '1.2rem' }}>
                View Gallery
              </Link>
            </div>
          </main>
        } />
        <Route path="/documents" element={<Documents />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/projects" element={<ProjectsPage data={portfolioData?.projects} />} />
        <Route path="/certifications" element={<CertificationsPage data={portfolioData?.certifications} />} />
        <Route path="/experience" element={<ExperiencePage data={portfolioData?.certifications} />} />
      </Routes>
      <Footer />
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
