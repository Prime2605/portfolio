-- =====================================================
-- PRIME R S PORTFOLIO - SUPABASE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =====================================================

-- ─── Profile Table ───
CREATE TABLE IF NOT EXISTS profile (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  title TEXT,
  bio TEXT,
  email TEXT,
  secondary_email TEXT,
  phone TEXT,
  address TEXT,
  location TEXT,
  dob DATE,
  blood_group TEXT,
  nationality TEXT,
  languages TEXT[],
  avatar_url TEXT,
  resume_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Projects Table ───
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  tags TEXT[],
  github TEXT,
  live TEXT,
  image_url TEXT,
  emoji TEXT DEFAULT '🚀',
  display_order INT DEFAULT 0,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Skills Table ───
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  icon TEXT,
  proficiency INT DEFAULT 80,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Education Table ───
CREATE TABLE IF NOT EXISTS education (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  institution TEXT NOT NULL,
  description TEXT,
  grade TEXT,
  start_year INT,
  end_year INT,
  duration TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Experience Table ───
CREATE TABLE IF NOT EXISTS experience (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  current BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Social Links Table ───
CREATE TABLE IF NOT EXISTS socials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  username TEXT,
  icon TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ─── Contact Messages Table ───
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- SEED DATA - Prime R S
-- =====================================================

-- ─── Profile ───
INSERT INTO profile (name, title, bio, email, secondary_email, phone, address, location, dob, blood_group, nationality, languages)
VALUES (
  'Prime R S',
  'Aspiring Researcher | ECE Student | Full Stack Developer',
  'Passionate Electronics & Communication Engineering student at Government College of Engineering, Erode. Driven by a deep passion for research and innovation with expertise spanning both hardware (FPGA, microcontrollers, sensor modules) and software (React.js, Python, C++, Node.js). Demonstrated academic excellence with 94.8% in 10th grade and 93.17% in 12th grade. Beyond academics, passionate about leadership and taking initiative in team settings to inspire collaboration and achieve shared goals.',
  'rsprime265@gmail.com',
  'primesankar265@gmail.com',
  '+91 908099730',
  '249, Bazaar Street, Chinnasalem, Kallakurichi, TN - 606201',
  'Kallakurichi, Tamil Nadu, India',
  '2007-05-26',
  'B-ve',
  'Indian',
  ARRAY['Tamil', 'English']
);

-- ─── Projects ───
INSERT INTO projects (title, description, tags, github, emoji, display_order, featured) VALUES
('FPGA-based Trojan Recovery System', 'An advanced security system for real-time detection and recovery of hardware Trojans in FPGA-based systems. Implements embedded security protocols for robust protection against malicious modifications.', ARRAY['FPGA', 'Verilog', 'Security', 'Embedded Systems'], 'https://github.com/Prime2605/FPGA-based-Online-Real-Time-Trojan-Recovery-and-Embedded-Security-System', '🛡️', 1, true),
('Digital Image Forgery Detection', 'AI-powered forensic analysis system for detecting image forgeries and AI-generated images. Uses Error Level Analysis, noise variance analysis, and frequency domain techniques.', ARRAY['Python', 'Flask', 'AI/ML', 'Image Processing'], 'https://github.com/Prime2605', '🔍', 2, true),
('TNPSC Study App', 'A comprehensive web application for Tamil Nadu Public Service Commission exam preparation with study materials, practice tests, and resource management.', ARRAY['React.js', 'Node.js', 'Database', 'Education'], 'https://github.com/Prime2605', '📚', 3, false),
('Hall Allocation System', 'An intelligent hall allocation management system featuring a stunning 3D hero scene with React Three Fiber and interactive admin dashboard for efficient room management.', ARRAY['React.js', 'Three.js', 'Full Stack', 'Management'], 'https://github.com/Prime2605', '🏛️', 4, false),
('Li-Fi Communication System', 'Light Fidelity communication project using Arduino for data transmission through visible light. Demonstrates wireless communication through LED modulation.', ARRAY['Arduino', 'Embedded C', 'Li-Fi', 'IoT'], 'https://github.com/Prime2605', '💡', 5, false),
('Portfolio Website', 'Personal portfolio built with React, Three.js, and Supabase featuring AOS animations, glassmorphism, and a dark royal theme with 3D interactive elements.', ARRAY['React.js', 'Three.js', 'Supabase', 'Vite'], 'https://github.com/Prime2605/portfolio', '🚀', 6, false);

-- ─── Skills ───
INSERT INTO skills (name, category, proficiency) VALUES
('Python', 'Programming Languages', 85),
('C++', 'Programming Languages', 80),
('JavaScript', 'Programming Languages', 85),
('Verilog', 'Programming Languages', 75),
('VHDL', 'Programming Languages', 70),
('HTML/CSS', 'Programming Languages', 90),
('React.js', 'Frameworks & Libraries', 85),
('Node.js', 'Frameworks & Libraries', 80),
('Express.js', 'Frameworks & Libraries', 80),
('Flask', 'Frameworks & Libraries', 75),
('Three.js', 'Frameworks & Libraries', 70),
('Supabase', 'Frameworks & Libraries', 75),
('FPGA Design', 'Hardware & Embedded', 80),
('Microcontrollers', 'Hardware & Embedded', 85),
('Arduino', 'Hardware & Embedded', 85),
('Sensor Modules', 'Hardware & Embedded', 80),
('PCB Design', 'Hardware & Embedded', 65),
('Digital Electronics', 'Hardware & Embedded', 85),
('Git & GitHub', 'Tools & Platforms', 85),
('VS Code', 'Tools & Platforms', 90),
('Xilinx Vivado', 'Tools & Platforms', 75),
('Vercel', 'Tools & Platforms', 80),
('Linux', 'Tools & Platforms', 75),
('Figma', 'Tools & Platforms', 65);

-- ─── Education ───
INSERT INTO education (title, institution, description, grade, start_year, end_year, duration) VALUES
('Bachelor of Engineering — ECE', 'Government College of Engineering, Erode', 'Currently pursuing B.E. in Electronics and Communication Engineering with a focus on FPGA design, embedded systems, and full-stack development.', 'CGPA: 8.23', 2024, 2028, 'Sep 2024 – May 2028'),
('Higher Secondary — Bio Maths', 'Tagore Matric Higher Secondary School, Deviyakurichi', 'Completed higher secondary education with distinction in Bio Mathematics stream, demonstrating strong analytical and problem-solving capabilities.', '93.16%', 2022, 2024, 'Jul 2022 – May 2024'),
('SSLC (10th Grade)', 'Tagore Matric Higher Secondary School, Deviyakurichi', 'Achieved outstanding academic performance in secondary education, laying a strong foundation in science and mathematics.', '94.8%', 2020, 2022, 'Completed 2022');

-- ─── Socials ───
INSERT INTO socials (platform, url, username, icon) VALUES
('GitHub', 'https://github.com/Prime2605', 'Prime2605', 'FaGithub'),
('LinkedIn', 'https://www.linkedin.com/in/prime-r-s-0b7585318', 'prime-r-s', 'FaLinkedinIn'),
('Instagram', 'https://www.instagram.com/prime_snkar', 'prime_snkar', 'FaInstagram'),
('Discord', 'https://discord.com', 'rsprime265', 'FaDiscord');

-- ─── Enable Row Level Security ───
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE socials ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- ─── RLS Policies (Public read for portfolio data, write for messages) ───
CREATE POLICY "Allow public read on profile" ON profile FOR SELECT USING (true);
CREATE POLICY "Allow public read on projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Allow public read on skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Allow public read on education" ON education FOR SELECT USING (true);
CREATE POLICY "Allow public read on experience" ON experience FOR SELECT USING (true);
CREATE POLICY "Allow public read on socials" ON socials FOR SELECT USING (true);
CREATE POLICY "Allow public insert on messages" ON messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow service role full access on messages" ON messages FOR ALL USING (true);

-- ─── Create Storage Bucket for portfolio images ───
-- Run this separately in Supabase Storage settings or via API
-- INSERT INTO storage.buckets (id, name, public) VALUES ('portfolio-images', 'portfolio-images', true);
