require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { createClient } = require('@supabase/supabase-js')

const app = express()
const PORT = process.env.PORT || 5000

// ─── Supabase Client (Service Role for backend) ───
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
)

// ─── Middleware ───
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}))
app.use(express.json())

// ─── Health Check ───
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ─── Get All Portfolio Data (Single Endpoint) ───
app.get('/api/portfolio', async (req, res) => {
  try {
    const [profile, projects, skills, education, experience, socials] = await Promise.all([
      supabase.from('profile').select('*').single(),
      supabase.from('projects').select('*').order('display_order', { ascending: true }),
      supabase.from('skills').select('*').order('category'),
      supabase.from('education').select('*').order('start_year', { ascending: false }),
      supabase.from('experience').select('*').order('start_date', { ascending: false }),
      supabase.from('socials').select('*'),
    ])

    res.json({
      profile: profile.data,
      projects: projects.data || [],
      skills: skills.data || [],
      education: education.data || [],
      experience: experience.data || [],
      socials: socials.data || [],
    })
  } catch (err) {
    console.error('Error fetching portfolio data:', err)
    res.status(500).json({ message: 'Failed to fetch portfolio data' })
  }
})

// ─── Individual Endpoints ───
app.get('/api/profile', async (req, res) => {
  try {
    const { data, error } = await supabase.from('profile').select('*').single()
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch profile' })
  }
})

app.get('/api/projects', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true })
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch projects' })
  }
})

app.get('/api/skills', async (req, res) => {
  try {
    const { data, error } = await supabase.from('skills').select('*').order('category')
    if (error) throw error
    
    // Group skills by category
    const grouped = data.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = {
          title: skill.category,
          icon: skill.icon,
          skills: []
        }
      }
      acc[skill.category].skills.push(skill.name)
      return acc
    }, {})
    
    res.json(Object.values(grouped))
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch skills' })
  }
})

app.get('/api/education', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('education')
      .select('*')
      .order('start_year', { ascending: false })
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch education' })
  }
})

app.get('/api/experience', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('experience')
      .select('*')
      .order('start_date', { ascending: false })
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch experience' })
  }
})

app.get('/api/socials', async (req, res) => {
  try {
    const { data, error } = await supabase.from('socials').select('*')
    if (error) throw error
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch socials' })
  }
})

// ─── Contact Form Submission ───
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required' })
    }

    const { data, error } = await supabase.from('messages').insert([
      {
        name,
        email,
        subject: subject || 'No Subject',
        message,
        read: false,
        created_at: new Date().toISOString(),
      }
    ])

    if (error) throw error

    res.json({ success: true, message: 'Message sent successfully!' })
  } catch (err) {
    console.error('Error saving message:', err)
    res.status(500).json({ message: 'Failed to send message' })
  }
})

// ─── Start Server ───
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio Backend running on port ${PORT}`)
  console.log(`📡 Supabase URL: ${process.env.SUPABASE_URL}`)
  console.log(`🌐 CORS Origin: ${process.env.FRONTEND_URL || 'http://localhost:5173'}\n`)
})
