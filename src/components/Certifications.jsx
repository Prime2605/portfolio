import React, { useState, useEffect } from 'react'
import { FaAward, FaExternalLinkAlt, FaTimes, FaExpand } from 'react-icons/fa'
import { SiGoogle } from 'react-icons/si'

const baseCertificationsData = [
  // Hackathons (Priority: 1st, Semifinalist, Others)
  {
    id: '1ex-bRTYKIBCGbzYD1q3djoCazmtZiNuA',
    category: 'Hackathons',
    title: 'Certificate of Achievement',
    event: 'Smart Campus Hackathon\'26',
    issuer: 'Government College of Engineering, Erode',
    subIssuer: 'First Prize 🏆',
    date: '2026',
    color: '#d4af37',
    emoji: '🏆',
    tags: ['Hackathon', 'CSE', 'First Prize'],
    description: 'Secured the First Prize in the Smart Campus Hackathon\'26 conducted by the Department of Computer Science and Engineering, Government College of Engineering, Erode, on January 30, 2026. Signed by Dr. A. Kavitha (HOD) and Dr. A. Saradha (Principal).'
  },
  { 
    id: '1dZX4n7jC2ZFaCGFymZbceHyMnahZYii4', 
    category: 'Hackathons', 
    title: 'Certificate of Merit', 
    event: 'CONVOLVE 4.0 - Generative AI Track', 
    issuer: 'IIT Guwahati', 
    subIssuer: 'Semi-Finalist', 
    date: '2026', 
    color: '#0ea5e9', 
    emoji: '🏅', 
    tags: ['GenAI', 'Merit', 'Semi-Finalist'],
    description: 'Recognized as a Semi-Finalist in the Generative AI Track of CONVOLVE 4.0, a Pan-IIT hackathon organized by IIT Guwahati.'
  },
  { 
    id: '1vFpe6m2WvwHcEw-QWZaUGP4Pccv0tue2', 
    category: 'Hackathons', 
    title: 'Certificate of Participation', 
    event: 'Byte Quest AI Vibe Coding Challenge', 
    issuer: 'Ramdeobaba University', 
    subIssuer: '24 Hrs Hackathon', 
    date: '2026', 
    color: '#10b981', 
    emoji: '💻', 
    tags: ['24Hrs', 'AI Coding'],
    description: 'Participated in the 24-hour Byte Quest AI Vibe Coding Challenge hosted by Ramdeobaba University, building AI-focused solutions under time constraints.'
  },
  { 
    id: '1eIqQhZ7Q4_BOp21ehkyyJgAlT4kbjMKm', 
    category: 'Hackathons', 
    title: 'Certificate of Participation', 
    event: 'Kurukshetra\'26 - K!ODE WARS', 
    issuer: 'Anna University (CEG)', 
    subIssuer: '', 
    date: '2026', 
    color: '#a855f7', 
    emoji: '⚔️', 
    tags: ['Coding', 'Algorithms'],
    description: 'Competed in K!ODE WARS, a competitive algorithms and coding contest during Kurukshetra\'26, the international techno-management festival of CEG, Anna University.'
  },
  { 
    id: '1v2Ar-J6n2U_fnqZnIG5rHuDyPYTzgFbD', 
    category: 'Hackathons', 
    title: 'Certificate of Participation', 
    event: 'Conscientia 2025 - HACKORBITAL', 
    issuer: 'IIST', 
    subIssuer: '', 
    date: '2025', 
    color: '#14b8a6', 
    emoji: '🚀', 
    tags: ['Space Tech', 'Hackathon'],
    description: 'Participated in HACKORBITAL, a space-tech and core engineering hackathon organized during Conscientia 2025 by IIST (Indian Institute of Space Science and Technology).'
  },
  { 
    id: '1nJS1qGl6cquIWtiPnU2IZANp4ekJk_Nq', 
    category: 'Hackathons', 
    title: 'Certificate of Participation', 
    event: 'CodeFest\'26 - Vista', 
    issuer: 'IIT Varanasi (BHU)', 
    subIssuer: 'Unstop', 
    date: '2026', 
    color: '#3b82f6', 
    emoji: '👁️', 
    tags: ['CodeFest', 'IIT BHU'],
    description: 'Participated in Vista, a competitive coding and development track of CodeFest\'26 organized by IIT Varanasi (BHU) on Unstop.'
  },
  { 
    id: '1Trs7yUzWmyB4WZTqX5WSMPjCI05u_yCc', 
    category: 'Hackathons', 
    title: 'Certificate of Participation', 
    event: 'Devcation Delhi 2026', 
    issuer: 'Google Developer Groups', 
    subIssuer: 'IGDTUW × IITD', 
    date: '2026', 
    color: '#7c3aed', 
    emoji: '🎖️', 
    tags: ['GDG', 'Google', 'Delhi'],
    description: 'Participated in Devcation Delhi 2026, a hackathon organized by Google Developer Groups in collaboration with IGDTUW and IIT Delhi.'
  },
  { 
    id: '1K3TXgkwyfwqGvkZho8smKSFUNtEyoUw8', 
    category: 'Hackathons', 
    title: 'Certificate of Participation', 
    event: 'BITBOX 6.0', 
    issuer: 'Google Developer Groups', 
    subIssuer: 'JIIT Noida', 
    date: '2026', 
    color: '#4285F4', 
    emoji: '💻', 
    tags: ['Hackathon', 'GDG', 'Coding'],
    description: 'Successfully participated in BITBOX 6.0, a 12-hour hackathon conducted by Google Developers Group on campus at Jaypee Institute of Information Technology, Sector-128, Noida. Event coordination led by Dr. Anubhuti Roda Mohindra, Prof. Shikha Mehta, and Dr. Neeraj Pathak.'
  },
  {
    id: '11MUPrif_XkTJitDEAOvue3jXKtqUpNte',
    category: 'Hackathons',
    title: 'Certificate of Participation',
    event: 'Prince iSolve Hack',
    issuer: 'Prince Shri Venkateshwara Padmavathy Eng. College',
    subIssuer: 'Unstop',
    date: '2026',
    color: '#8b5cf6',
    emoji: '💻',
    tags: ['iSolve', 'Hackathon', 'Unstop'],
    description: 'Participated in the Prince iSolve Hack hackathon organized by Prince Shri Venkateshwara Padmavathy Engineering College (PSVPEC), Chennai, Tamil Nadu, hosted on Unstop.'
  },
  {
    id: '1_htQ0kTBuCuqUecnE2fQy1rKknS-lgvB',
    category: 'Hackathons',
    title: 'Certificate of Participation',
    event: 'Bitwars 3.0 - Offline Competitive Coding',
    issuer: 'VIT Chennai',
    subIssuer: 'Unstop',
    date: '2026',
    color: '#3b82f6',
    emoji: '⚔️',
    tags: ['Competitive Coding', 'VIT', 'Algorithms'],
    description: 'Participated in Bitwars 3.0, South India\'s Premier Offline Competitive Coding Event organized by Vellore Institute of Technology (VIT), Chennai, on Unstop.'
  },
  {
    id: '1PevDeLkbL9FacmzEI6vKRl-fZ5BXEdKF',
    category: 'Hackathons',
    title: 'Certificate of Participation',
    event: 'CodeFest\'26 - Vista',
    issuer: 'IIT (BHU) Varanasi',
    subIssuer: 'Dept of CSE',
    date: '2026',
    color: '#3b82f6',
    emoji: '👁️',
    tags: ['CodeFest', 'IIT BHU', 'Coding'],
    description: 'Recognized for outstanding performance in the Vista Event of Codefest\'26, the annual national coding festival organized by the Department of Computer Science and Engineering, IIT (BHU) Varanasi.'
  },
  {
    id: '1M2DNg_pNrsU9YLdHAH_ffF7ztBnoRPF8',
    category: 'Hackathons',
    title: 'Certificate of Participation',
    event: 'CodeKshetra Coding Contest',
    issuer: 'CodeKshetra',
    subIssuer: 'Coding Contest',
    date: '2026',
    color: '#10b981',
    emoji: '💻',
    tags: ['Coding Contest', 'Algorithms', 'Speed Coding'],
    description: 'Successfully participated in the CodeKshetra Coding Contest on 18th April 2026, demonstrating a strong commitment to learning and competitive algorithms problem-solving.'
  },
  {
    id: '1I1nFw6Qjppf7clrV7IUYNM_U--PVLNAe',
    category: 'Hackathons',
    title: 'Certificate of Participation',
    event: 'National Cloud Innovation Challenge',
    issuer: '3SVK, Hyderabad',
    subIssuer: 'Cloud Hackathon',
    date: '2026',
    color: '#0ea5e9',
    emoji: '☁️',
    tags: ['Cloud', 'Hackathon', '3SVK'],
    description: 'Participated in Season 1 of the National Cloud Innovation Challenge (India\'s Largest Student Cloud Hackathon) organized by 3SVK, Hyderabad, engaging over 2,000+ developers across India.'
  },
  
  // Courses (Priority: NPTEL / Gov, Private)
  {
    id: '1bWkTq-_emK-IO1lweK9Ij7NtUETxL2bA',
    category: 'Courses',
    title: 'Elite NPTEL Online Certification',
    event: 'NPTEL - Digital Design with Verilog',
    issuer: 'IIT Guwahati',
    subIssuer: 'NPTEL (Score: 62%)',
    date: '2026',
    color: '#0ea5e9',
    emoji: '📜',
    tags: ['Verilog', 'Digital Design', 'IIT'],
    description: 'Awarded Elite NPTEL Online Certification (funded by the MoE, Govt. of India) for successfully completing the 12-week course "Digital Design with Verilog" conducted by IIT Guwahati, scoring 62%. Roll No: NPTEL26CS24S1264900905.'
  },
  { 
    id: '13PYJYnI8NKImTvABLAXgZLh3lAgAeczU', 
    category: 'Courses', 
    title: 'Certificate of Achievement', 
    event: 'Employability Skills', 
    issuer: 'Naan Mudhalvan Scheme', 
    subIssuer: 'TN Skill Development', 
    date: '2025', 
    color: '#d946ef', 
    emoji: '📈', 
    tags: ['Soft Skills', 'Government'],
    description: 'Awarded a Certificate of Achievement in Employability Skills by Naan Mudhalvan Scheme, a TN Skill Development Initiative.'
  },
  { 
    id: '11lKSwl7u-l9MuRsM_9CAP1bE-fkdI-d3', 
    category: 'Courses', 
    title: 'Certificate of Completion', 
    event: 'Networking Basics', 
    issuer: 'Cisco Networking Academy', 
    subIssuer: '', 
    date: '2023', 
    color: '#0284c7', 
    emoji: '🌐', 
    tags: ['Networking', 'Cisco'],
    description: 'Completed the Networking Basics certification course by Cisco Networking Academy, covering fundamental network protocols and architectures.'
  },
  { 
    id: '1Mhd2kJh3Ck3LFwmKi4Shvy4-jrSotXLt', 
    category: 'Courses', 
    title: 'Certificate of Completion', 
    event: 'Semiconductors - VLSI & Embedded Systems', 
    issuer: 'Maven Silicon', 
    subIssuer: '', 
    date: '2024', 
    color: '#ea580c', 
    emoji: '🖲️', 
    tags: ['VLSI', 'Semiconductors'],
    description: 'Successfully completed VLSI and Embedded Systems training from Maven Silicon, focusing on chip design principles and architectures.'
  },
  { 
    id: '1p253OxTv8I-xKxW2kLGBynjzIk5-LxRi', 
    category: 'Courses', 
    title: 'Certificate of Completion', 
    event: 'Electronics - Nanoelectronics', 
    issuer: 'Cursa', 
    subIssuer: '', 
    date: '2025', 
    color: '#059669', 
    emoji: '🔬', 
    tags: ['Nanoelectronics', 'Online Course'],
    description: 'Completed the online course on Nanoelectronics by Cursa, studying nanoscale solid-state devices and semiconductor physics.'
  },
  { 
    id: '1wHtA88evTo25yOpd2GNKsZzabWGqIMKn', 
    category: 'Courses', 
    title: 'Certificate of Completion', 
    event: 'Basics of Python', 
    issuer: 'Infosys Springboard', 
    subIssuer: '', 
    date: '2023', 
    color: '#ca8a04', 
    emoji: '🐍', 
    tags: ['Python', 'Programming'],
    description: 'Completed the Python programming course by Infosys Springboard, mastering coding logic, data structures, and scripting basics.'
  },
  { 
    id: '1iGb4-e7J9iD4I8cIE2TAiGcvL_iIMx3R', 
    category: 'Courses', 
    title: 'Certificate of Completion', 
    event: 'Programming in C', 
    issuer: 'Infosys Springboard', 
    subIssuer: '', 
    date: '2023', 
    color: '#2563eb', 
    emoji: 'C', 
    tags: ['C Programming', 'Basics'],
    description: 'Completed the C programming course by Infosys Springboard, learning compiler directives, pointers, and memory management.'
  },
  { 
    id: '15uCpmj0FuC934kR7sLVJScsDcOM8wRkP', 
    category: 'Courses', 
    title: 'Certificate of Completion', 
    event: 'Explore Electrical Eng. Job Simulation', 
    issuer: 'Forage / GE Aerospace', 
    subIssuer: '', 
    date: '2025', 
    color: '#0f766e', 
    emoji: '⚡', 
    tags: ['Electrical', 'Simulation'],
    description: 'Completed the job simulation program for electrical engineering organized by GE Aerospace through Forage, working on aircraft power systems.'
  },
  { 
    id: '1xFsYn3jE6jxumdCkFrcd_KXh7maqjjFZ', 
    category: 'Courses', 
    title: 'Certificate of Completion', 
    event: 'Python Bootcamp', 
    issuer: 'Lets Upgrade', 
    subIssuer: 'NSDC & GDG MAD', 
    date: '2025', 
    color: '#eab308', 
    emoji: '🏕️', 
    tags: ['Bootcamp', 'Python'],
    description: 'Participated in the Python Bootcamp organized by Lets Upgrade in collaboration with NSDC and GDG MAD.'
  },
  { 
    id: '1gmBOeLgC8Yl4tz2coTeriBVHnwXGwjEl', 
    category: 'Courses', 
    title: 'Certificate of Completion', 
    event: 'GenAI 101: Socratic AI Tutor Essentials', 
    issuer: 'Lets Upgrade', 
    subIssuer: 'NSDC & GDG MAD', 
    date: '2026', 
    color: '#8b5cf6', 
    emoji: '🤖', 
    tags: ['GenAI', 'Course'],
    description: 'Completed the GenAI 101: Socratic AI Tutor Essentials course by Lets Upgrade, learning prompt engineering and LLM application frameworks.'
  },
  {
    id: '1_ajucDz_vJa4hpxMQ6LLWp7Ul7aDSaYp',
    category: 'Courses',
    title: 'Certificate of Completion',
    event: 'Generative AI Mastermind',
    issuer: 'Outskill',
    subIssuer: 'Vaibhav Sisinty',
    date: '2026',
    color: '#a855f7',
    emoji: '🤖',
    tags: ['Generative AI', 'AI Tools', 'Mastermind'],
    description: 'Successfully completed the Generative AI Mastermind course by Outskill, covering advanced prompt engineering, AI productivity workflows, and LLM implementation, signed by Founder Vaibhav Sisinty.'
  },

  // Workshops (Priority: Software, VLSI)
  { 
    id: '14Ih98vYjm8mlC-yhLxw7CEZNIt8B5oKW', 
    category: 'Workshops', 
    subCategory: 'Software',
    title: 'Certificate of Completion', 
    event: 'AI Tools and ChatGPT Workshop', 
    issuer: 'Be 10X', 
    subIssuer: 'AI Tools Workshop', 
    date: '2026', 
    color: '#fbbf24', 
    emoji: '🧠', 
    tags: ['AI Tools', 'ChatGPT', 'AI Productivity'],
    description: 'Completed the AI Tools and ChatGPT Workshop. Trained to create presentations using AI in under 5 minutes, analyze data in under 30 minutes, and code/debug using AI in under 10 minutes.'
  },
  {
    id: '1SzSvvalT-9MVUpexmEFYd-NcM7RqtJic',
    category: 'Workshops',
    subCategory: 'Software',
    title: 'Certificate of Completion',
    event: 'Full Stack Web Development Workshop',
    issuer: 'Jobaaj Learnings',
    subIssuer: 'Jobaaj Group',
    date: '2026',
    color: '#ec4899',
    emoji: '🌐',
    tags: ['Web Dev', 'Full Stack', 'Workshop'],
    description: 'Successfully completed the Full Stack Web Development Workshop organized by Jobaaj Learnings, covering modern web architectures and development practices. ID: ATNQX108468.'
  },
  { 
    id: '1jdgn5zAGoJRKyUwcA9HrtZVWysQ0M9e3', 
    category: 'Workshops', 
    subCategory: 'VLSI',
    title: 'Certificate of Participation', 
    event: 'Semiconductors & VLSI Design', 
    issuer: 'Edu Fabrica', 
    subIssuer: '', 
    date: '2025', 
    color: '#dc2626', 
    emoji: '🖥️', 
    tags: ['Workshop', 'Hardware'],
    description: 'Completed the Semiconductors and VLSI Design workshop by Edu Fabrica, gaining hands-on exposure to digital VLSI layout.'
  },
  { 
    id: '1Zq7L_2ZDxCzxBk7059DR-JEJ-7iUPWa-', 
    category: 'Workshops', 
    subCategory: 'VLSI',
    title: 'Workshop Certificate of Participation', 
    event: 'Two-Day Workshop on VLSI Design and Semiconductor Industry', 
    issuer: 'ChipXpert Technologies', 
    subIssuer: 'ID: CXVLSI-MAY26-1668', 
    date: '2026', 
    color: '#f97316', 
    emoji: '🖲️', 
    tags: ['VLSI', 'Semiconductors', 'Hardware'],
    description: 'Participated in the Two-Day Workshop on VLSI Design and Semiconductor Industry organized by ChipXpert Technologies Private Limited. Certificate ID: CXVLSI-MAY26-1668. Signed by Kairamkonda Shivakrishna (Managing Director).'
  },
  
  // Internships
  { 
    id: '1A5UF4Vs1HKMvMZNEeTlWPLm-d8mczyzF', 
    category: 'Internships', 
    title: 'Certificate of Internship', 
    event: 'Ind. Embedded Systems with IOT', 
    issuer: 'NSIC Chennai', 
    subIssuer: 'Govt. of India', 
    date: '2025', 
    color: '#4f46e5', 
    emoji: '🔌', 
    tags: ['IoT', 'Embedded Systems', 'Internship'],
    description: 'Completed a comprehensive industrial internship in Embedded Systems and IoT at NSIC Chennai, a Government of India enterprise.'
  },

  // Quiz
  { 
    id: '1H53l1-TWBtwFWw796zJVyUdQzkPlhpni', 
    category: 'Quiz', 
    title: 'Certificate of Participation', 
    event: 'National Level E-Quiz on World Intellectual Property Day 2026', 
    issuer: 'Guru Nanak College (Autonomous)', 
    subIssuer: 'Scored 90/100', 
    date: '2026', 
    color: '#10b981', 
    emoji: '⚖️', 
    tags: ['IPR Cell', 'Intellectual Property', 'Quiz'],
    description: 'Scored 90/100 in the National Level E-Quiz to commemorate World Intellectual Property Day 2026, organized by the Intellectual Property Rights Cell in association with the Guru Nanak Centre for Innovation, Incubation, Entrepreneurship & Startups of Guru Nanak College (Autonomous), Guru Nanak Salai, Velachery, Chennai – 600042, held on 28/04/2026. Signed by Dr. Mahendrakumar M., Dr. R. Rajini Surendranath, and Dr. R.M. Elilarasi.'
  },
  {
    id: '1T8Zio4WfzENAEJCzXEk5v_TZB_dV09yn',
    category: 'Quiz',
    title: 'Certificate of Participation',
    event: 'ML SPARK Machine Learning Challenge Quiz',
    issuer: 'University of Hyderabad',
    subIssuer: 'School of Management Studies',
    date: '2026',
    color: '#10b981',
    emoji: '🧠', 
    tags: ['Machine Learning', 'Quiz', 'Unstop'],
    description: 'Participated in the MCQ Quiz Competition of the ML SPARK Machine Learning Challenge organized by the School of Management Studies (SMS), University of Hyderabad, on the Unstop platform.'
  },
  {
    id: '1ZQaTQt6y_KjUtkNzyhScY0qtEJgtRler',
    category: 'Quiz',
    title: 'Certificate of Participation',
    event: 'Earth Day Quiz Competition 2026',
    issuer: 'ISTE Student Chapter',
    subIssuer: 'Unstop',
    date: '2026',
    color: '#22c55e',
    emoji: '🌍',
    tags: ['Earth Day', 'Quiz', 'ISTE'],
    description: 'Participated in the Earth Day Quiz Competition 2026, organized by the ISTE Student Chapter at Government College of Engineering, Erode, on Unstop.'
  },

  // Others
  { 
    id: '1Xc-mDE0YDTIVCnEBaVjgP6tOWiwRoftV', 
    category: 'Others', 
    title: 'Certificate of Appreciation', 
    event: 'Kalloori Kalai Thiruvizha - Science Exhb.', 
    issuer: 'Govt of Tamil Nadu', 
    subIssuer: '2nd Position', 
    date: '2025', 
    color: '#eab308', 
    emoji: '🥈', 
    tags: ['Exhibition', 'Science', '2nd Place'],
    description: 'Awarded 2nd Position in the state-level Science Exhibition during Kalloori Kalai Thiruvizha organized by the Government of Tamil Nadu.'
  },
  { 
    id: '1CIevT824g2PeKq--9QDFYH91RC8KAQmX', 
    category: 'Others', 
    title: 'Certificate of Participation', 
    event: 'ELECT-ERA\'26 - TYPING ARENA', 
    issuer: 'Coimbatore Institute of Technology', 
    subIssuer: '', 
    date: '2026', 
    color: '#8b5cf6', 
    emoji: '⌨️', 
    tags: ['Typing', 'Symposium'],
    description: 'Participated in the Typing Arena contest during ELECT-ERA\'26, a technical symposium at Coimbatore Institute of Technology.'
  },
  { 
    id: '1MqeiKsJ4MrCwwSNpQdCGeRJqGvOyV7Tb', 
    category: 'Others', 
    title: 'Certificate of Participation', 
    event: 'Kurukshetra\'26 - STEAM QUEST', 
    issuer: 'Anna University (CEG)', 
    subIssuer: '', 
    date: '2026', 
    color: '#f97316', 
    emoji: '🧩', 
    tags: ['STEAM', 'Techno-Management'],
    description: 'Participated in the STEAM QUEST competition at Kurukshetra\'26, CEG, Anna University.'
  },
  { 
    id: '1FcIO1JbiWeqyHtNl5_Uoh3YZjjbJ8Yga', 
    category: 'Others', 
    title: 'Certificate of Participation', 
    event: 'ELECT-ERA\'26 - CHASE AND BUILD', 
    issuer: 'Coimbatore Institute of Technology', 
    subIssuer: '', 
    date: '2026', 
    color: '#f43f5e', 
    emoji: '🛠️', 
    tags: ['Hardware', 'Symposium'],
    description: 'Participated in the Chase and Build hardware prototyping event at Coimbatore Institute of Technology\'s ELECT-ERA\'26 symposium.'
  },
  { 
    id: '13-CXBTGmug3noakvBJq4r3n3ved7DQwk', 
    category: 'Others', 
    title: 'Certificate of Participation', 
    event: 'GALAXY\'24 PHASE II - PAPER WAR', 
    issuer: 'Government College of Engineering, Erode', 
    subIssuer: '', 
    date: '2024', 
    color: '#6366f1', 
    emoji: '📄', 
    tags: ['Paper Presentation', 'Symposium'],
    description: 'Participated in the Paper War paper presentation symposium at Government College of Engineering, Erode.'
  },
  { 
    id: '1dwC1QsBZyVTeq1E4ZS9dkI7keI3322fb', 
    category: 'Others', 
    title: 'Certificate of Participation', 
    event: 'Attack on Bots (Robotics)', 
    issuer: 'NIT Tiruchi', 
    subIssuer: '', 
    date: '2025', 
    color: '#ef4444', 
    emoji: '🤖', 
    tags: ['Robotics', 'NIT'],
    description: 'Participated in the Attack on Bots robotics competition organized by NIT Trichy.'
  },
  { 
    id: '1jx_ff43Yk7cJBI9Y9dXTT-WhbL-pMoaZ', 
    category: 'Others', 
    title: 'Certificate of Completion', 
    event: 'Tech Bootcamp (AIML Track)', 
    issuer: 'Takshashila University', 
    subIssuer: 'in collaboration with Xebia', 
    date: '2026', 
    color: '#a855f7', 
    emoji: '🤖', 
    tags: ['Generative AI', 'Agentic Systems', 'Bootcamp'],
    description: 'Organized by Takshashila University in collaboration with Xebia. Covering No-Code & Low-Code Applications using Generative AI, and Agentic Systems and Autonomous Workflows. Signed by Amand Sahay (CEO, Xebia), Brijesh Kohli (Head of Education, Xebia), Prof. (Dr.) Vivek Inder Kochar (VC), and Prof. (Dr.) S. Senthil (Registrar).'
  },
  {
    id: '1HLpx5TmhRjmyrBWHGMTlUXb8rnmGbkXT',
    category: 'Others',
    title: 'Certificate of Participation',
    event: 'ARIVOLIO 2K\'26',
    issuer: 'Knowledge Institute of Technology',
    subIssuer: 'Unstop',
    date: '2026',
    color: '#d946ef',
    emoji: '✨',
    tags: ['Symposium', 'Tech Fest', 'Unstop'],
    description: 'Participated in ARIVOLIO 2K\'26, a national-level technical symposium organized by the Knowledge Institute of Technology on Unstop.'
  },
  {
    id: '1372-yHvQ7JgtB3_JxabcL-Jaq6hrZklS',
    category: 'Others',
    title: 'Certificate of Participation',
    event: 'The Filter of OutThinkX',
    issuer: 'Thinksy Arena',
    subIssuer: 'Unstop',
    date: '2026',
    color: '#f97316',
    emoji: '🧩',
    tags: ['Logic', 'Challenge', 'OutThinkX'],
    description: 'Participated in "The Filter" round of OutThinkX, a logical thinking and problem-solving competition organized by Thinksy Arena on Unstop.'
  },
  {
    id: '1qFReKIYph4h3SMwbdgbuWJdBTTqnbv8B',
    category: 'Others',
    title: 'Certificate of Participation',
    event: 'Galaxy24 Phase II - EROTECT WAR',
    issuer: 'Government College of Engineering, Erode',
    subIssuer: 'Association of ECE',
    date: '2024',
    color: '#6366f1',
    emoji: '🛡️',
    tags: ['ECE', 'Galaxy24', 'Symposium'],
    description: 'Participated in the EROTECT WAR event during GALAXY24 Phase II, a national-level technical symposium organized by the Association of ECE at Government College of Engineering, Erode, on 24th and 25th October 2024.'
  },
  {
    id: '1o7Rm5mFj2vbTguAIhDq7xngT2MIjZJJL',
    category: 'Others',
    title: 'Certificate of Participation',
    event: 'Kurukshetra\'26 - Design Hack!s',
    issuer: 'Anna University (CEG)',
    subIssuer: '',
    date: '2026',
    color: '#ec4899',
    emoji: '🎨',
    tags: ['Design', 'Hackathon'],
    description: 'Participated in the Design Hack!s hackathon at Kurukshetra\'26, CEG, Anna University, developing innovative UI/UX and design concepts.'
  }
];

const certificationsData = baseCertificationsData.map(cert => ({
  ...cert,
  driveImageUrl: `/certs/${cert.id}.png?v=1`,
  driveId: cert.id,
  description: cert.description || (
    cert.category === 'Hackathons' ? "Demonstrated outstanding performance and technical skillset in this competitive event." :
    cert.category === 'Courses' ? "Successfully completed comprehensive coursework and practical assignments to master fundamental concepts." :
    cert.category === 'Internships' ? "Gained hands-on industry experience and tackled real-world projects during this extensive internship training." :
    "Actively engaged in collaborative activities, exhibitions, and symposiums to broaden technical boundaries."
  )
}));

const Certifications = ({ data }) => {
  const certs = data || certificationsData
  const [activeTab, setActiveTab] = useState('Hackathons') // Default category
  const [activeSubTab, setActiveSubTab] = useState('Software') // Default workshops subcategory to Software
  const [activeCertificate, setActiveCertificate] = useState(null)
  const [isFullScreenImg, setIsFullScreenImg] = useState(false)

  const tabs = ['Hackathons', 'Courses', 'Workshops', 'Internships', 'Quiz', 'Others'];
  const filteredCerts = certs.filter(cert => {
    if (cert.category !== activeTab) return false;
    if (activeTab === 'Workshops') {
      return cert.subCategory === activeSubTab;
    }
    return true;
  });

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [activeCertificate]);

  return (
    <section className="section" id="certifications">
      <div className="container">
        <div className="section-header" data-aos="fade-up">
          <span className="section-label">// Recognition & achievements</span>
          <h2 className="section-title">Certifications</h2>
          <p className="section-subtitle">
            Credentials and recognition earned through dedication and hard work
          </p>
        </div>

        {/* 1. Category Buttons */}
        <div className="cert-filters" data-aos="fade-up" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => { setActiveTab(tab); setActiveSubTab('Software'); }}
              style={{
                background: activeTab === tab ? 'linear-gradient(90deg, #1e3a8a, #d4af37)' : 'rgba(0, 0, 0, 0.4)',
                color: activeTab === tab ? '#fff' : '#d4af37',
                border: '1px solid',
                borderColor: activeTab === tab ? '#d4af37' : 'rgba(212, 175, 55, 0.3)',
                padding: '10px 24px',
                borderRadius: '8px',
                fontSize: '0.95rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: activeTab === tab ? '0 0 15px rgba(30, 58, 138, 0.6), 0 0 10px rgba(212, 175, 55, 0.4)' : 'none',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                if (activeTab !== tab) {
                  e.target.style.background = 'rgba(30, 58, 138, 0.3)';
                  e.target.style.borderColor = '#d4af37';
                }
              }}
              onMouseLeave={(e) => {
                if (activeTab !== tab) {
                  e.target.style.background = 'rgba(0, 0, 0, 0.4)';
                  e.target.style.borderColor = 'rgba(212, 175, 55, 0.3)';
                }
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 1.5. Workshops Sub-Filters */}
        {activeTab === 'Workshops' && (
          <div className="cert-subfilters" data-aos="fade-up" style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
            {['Software', 'VLSI'].map(subTab => (
              <button
                key={subTab}
                onClick={() => setActiveSubTab(subTab)}
                style={{
                  background: activeSubTab === subTab ? 'linear-gradient(90deg, #3b82f6, #1d4ed8)' : 'rgba(0, 0, 0, 0.5)',
                  color: activeSubTab === subTab ? '#fff' : '#94a3b8',
                  border: '1px solid',
                  borderColor: activeSubTab === subTab ? '#60a5fa' : 'rgba(148, 163, 184, 0.2)',
                  padding: '8px 24px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: activeSubTab === subTab ? '0 0 15px rgba(37, 99, 235, 0.4)' : 'none',
                  backdropFilter: 'blur(10px)'
                }}
                onMouseEnter={(e) => {
                  if (activeSubTab !== subTab) {
                    e.target.style.background = 'rgba(59, 130, 246, 0.15)';
                    e.target.style.borderColor = 'rgba(59, 130, 246, 0.5)';
                    e.target.style.color = '#fff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeSubTab !== subTab) {
                    e.target.style.background = 'rgba(0, 0, 0, 0.5)';
                    e.target.style.borderColor = 'rgba(148, 163, 184, 0.2)';
                    e.target.style.color = '#94a3b8';
                  }
                }}
              >
                {subTab}
              </button>
            ))}
          </div>
        )}

        {/* 2. Grid of Certificate Cards for the active category */}
        <div className="cert-grid" data-aos="fade-up" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '25px',
          marginBottom: '50px',
          width: '100%'
        }}>
          {filteredCerts.length > 0 ? filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => setActiveCertificate(cert)}
              className="cert-card"
              style={{
                background: 'rgba(0, 0, 0, 0.65)',
                backdropFilter: 'blur(30px)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '20px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                height: '100%',
                boxShadow: '0 15px 40px rgba(0, 0, 0, 0.8)',
                zIndex: 1
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
                e.currentTarget.style.border = '1px solid rgba(212, 175, 55, 0.8)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(30, 58, 138, 0.5), 0 0 25px rgba(212, 175, 55, 0.3)';
                const reflection = e.currentTarget.querySelector('.mirror-reflection');
                if (reflection) reflection.style.transform = 'translateX(100%)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.border = '1px solid rgba(212, 175, 55, 0.4)';
                e.currentTarget.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.8)';
                const reflection = e.currentTarget.querySelector('.mirror-reflection');
                if (reflection) reflection.style.transform = 'translateX(-100%)';
              }}
            >
              {/* Mirror Reflection Effect Layer */}
              <div 
                className="mirror-reflection"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                  transform: 'translateX(-100%)',
                  transition: 'transform 0.6s ease-in-out',
                  pointerEvents: 'none',
                  zIndex: 0
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '2.5rem', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))' }}>{cert.emoji}</span>
                <span style={{ 
                  fontSize: '0.8rem', 
                  fontWeight: '800', 
                  color: '#fff', 
                  background: 'rgba(212, 175, 55, 0.2)', 
                  padding: '6px 14px', 
                  borderRadius: '50px',
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  letterSpacing: '1px',
                  textShadow: '0 0 10px rgba(212, 175, 55, 0.5)'
                }}>
                  {cert.date}
                </span>
              </div>

              <h3 style={{ 
                fontSize: '1.4rem', 
                fontWeight: '900', 
                color: '#fff', 
                marginBottom: '10px',
                lineHeight: '1.3',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
              }}>
                {cert.event}
              </h3>

              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                marginBottom: '20px',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{ width: '14px', height: '14px', background: cert.color, borderRadius: '50%', boxShadow: `0 0 10px ${cert.color}` }} />
                <span style={{ fontSize: '1rem', color: '#f1f5f9', fontWeight: '700' }}>{cert.issuer}</span>
              </div>

              <p style={{ 
                fontSize: '1rem', 
                color: '#cbd5e1', 
                lineHeight: '1.7',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                marginBottom: '24px',
                position: 'relative',
                zIndex: 1,
                fontWeight: '500'
              }}>
                {cert.description}
              </p>

              <div style={{ 
                marginTop: 'auto', 
                display: 'flex', 
                gap: '10px', 
                flexWrap: 'wrap',
                position: 'relative',
                zIndex: 1 
              }}>
                {(cert.tags || []).slice(0, 2).map((tag, tIdx) => (
                  <span key={tIdx} style={{ 
                    fontSize: '0.75rem', 
                    background: 'rgba(30, 58, 138, 0.3)', 
                    color: '#93c5fd', 
                    padding: '4px 12px', 
                    borderRadius: '6px',
                    border: '1px solid rgba(147, 197, 253, 0.3)',
                    fontWeight: '700'
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
              No certificates in this category.
            </div>
          )}
        </div>
      </div>

      {/* 3. Floating Window / Mirror Transparent Blue-Gold-Black Styled Box */}
      {activeCertificate && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          animation: 'fadeIn 0.3s ease'
        }}
        onClick={() => setActiveCertificate(null)} // Click outside to close
        >
          <div 
            className="cert-detailed-view" 
            style={{
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(15, 23, 42, 0.95) 100%)',
              border: '2px solid rgba(212, 175, 55, 0.8)', // Stronger Gold border
              boxShadow: '0 0 40px rgba(30, 58, 138, 0.8), inset 0 0 20px rgba(212, 175, 55, 0.2)', // Intense Blue & Gold glow
              borderRadius: '20px',
              padding: '30px',
              maxWidth: '900px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              backdropFilter: 'blur(24px)', // High mirror transparent blur
              color: '#fff',
              position: 'relative',
              animation: 'slideUp 0.4s ease'
            }}
            onClick={(e) => e.stopPropagation()} // Prevent close on inner click
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveCertificate(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(212, 175, 55, 0.2)',
                border: '1px solid #d4af37',
                color: '#d4af37',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 10,
                transition: 'all 0.3s'
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#d4af37'; e.currentTarget.style.color = '#000'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(212, 175, 55, 0.2)'; e.currentTarget.style.color = '#d4af37'; }}
            >
              <FaTimes />
            </button>

            {/* Mirror reflection overlay */}
            <div style={{
              position: 'absolute',
              top: '-20%',
              left: '-20%',
              right: '-20%',
              height: '100%',
              background: 'linear-gradient(to bottom right, rgba(255,255,255,0.1) 0%, transparent 60%)',
              transform: 'rotate(-15deg)',
              pointerEvents: 'none'
            }}></div>

            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }} className="cert-detailed-split">
              
              {/* Image side */}
              <div 
                style={{ 
                  flex: '1', 
                  minWidth: '300px',
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 2
                }}
                onClick={() => setIsFullScreenImg(!isFullScreenImg)}
              >
                <img 
                  src={activeCertificate.driveImageUrl} 
                  alt={activeCertificate.event} 
                  style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', background: '#000', transition: 'transform 0.4s' }} 
                  onError={(e) => { e.target.src = '/vite.svg'; }}
                />
                {!isFullScreenImg && (
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s',
                    color: '#FFF'
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0}
                  >
                    <div style={{ background: 'rgba(212,175,55,0.8)', padding: '10px', borderRadius: '50%', color: '#000' }}>
                       <FaExpand size={24} />
                    </div>
                  </div>
                )}
              </div>

              {/* Details side */}
              <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{activeCertificate.emoji}</span>
                    <h3 style={{ fontSize: '1.8rem', color: '#d4af37', marginBottom: '10px', fontWeight: 'bold' }}>{activeCertificate.title}</h3>
                  </div>
                  <h4 style={{ fontSize: '1.3rem', color: '#60a5fa', marginBottom: '15px' }}>{activeCertificate.event}</h4>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <SiGoogle style={{ color: '#4285F4', fontSize: '1.8rem', opacity: activeCertificate.issuer.includes("Google") ? 1 : 0.2 }} />
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#f8fafc', fontSize: '1.1rem' }}>{activeCertificate.issuer}</p>
                    {activeCertificate.subIssuer && <p style={{ margin: 0, fontSize: '0.9rem', color: '#94a3b8' }}>{activeCertificate.subIssuer}</p>}
                  </div>
                </div>

                <p style={{ color: '#cbd5e1', lineHeight: '1.7', marginBottom: '25px', fontSize: '1.05rem' }}>
                  {activeCertificate.description}
                </p>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', flexWrap: 'wrap', gap: '15px' }}>
                  <span style={{ background: 'linear-gradient(90deg, #1e3a8a, #3b82f6)', color: '#fff', padding: '8px 16px', borderRadius: '6px', fontWeight: 'bold', border: '1px solid #60a5fa', boxShadow: '0 4px 10px rgba(30,58,138,0.4)' }}>
                    Issued: {activeCertificate.date}
                  </span>
                  
                  {activeCertificate.driveId && (
                    <a
                      href={`https://drive.google.com/file/d/${activeCertificate.driveId}/view`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#d4af37',
                        color: '#000',
                        textDecoration: 'none',
                        fontWeight: '700',
                        padding: '10px 20px',
                        border: '1px solid #d4af37',
                        borderRadius: '6px',
                        transition: 'all 0.3s',
                        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = '#000';
                        e.currentTarget.style.color = '#d4af37';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = '#d4af37';
                        e.currentTarget.style.color = '#000';
                      }}
                    >
                      <FaExternalLinkAlt /> Open in New Tab
                    </a>
                  )}
                </div>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '20px' }}>
                  {(activeCertificate.tags || []).map((tag, tIdx) => (
                    <span key={tIdx} style={{ fontSize: '0.8rem', background: 'rgba(212, 175, 55, 0.1)', color: '#d4af37', padding: '5px 12px', borderRadius: '999px', border: '1px solid rgba(212, 175, 55, 0.5)' }}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Extreme Full Screen Image View inside the Floating Window */}
      {isFullScreenImg && activeCertificate && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.95)',
          zIndex: 999999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => setIsFullScreenImg(false)}
        >
          <button style={{ position: 'absolute', top: '20px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}><FaTimes /></button>
          <img src={activeCertificate.driveImageUrl} alt={activeCertificate.event} style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain' }} />
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
      `}} />
    </section>
  )
}

export default Certifications
