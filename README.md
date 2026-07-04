# Prime R S | Portfolio

Welcome to the official repository for my personal portfolio, built with modern web technologies and designed with a premium, Apple-inspired, mobile-first aesthetic.

## 🚀 Live Demo
[Insert Deployment URL Here]

## ✨ Key Features
- **Dark Futuristic Aesthetic:** Utilizing deep space grays, royal purples, cyans, and gold accents.
- **Glassmorphism Design System:** Clean, transparent cards with elegant blur backdrops.
- **Master-Pro Mobile Responsiveness:** Edge-to-edge layout optimization specifically designed for iPhone and premium Android devices.
- **Dynamic Scroll Animations:** Buttery-smooth, staggered entry effects using `aos` (Animate On Scroll) with custom timing (`1500ms` durations).
- **Interactive Modals:** Detailed views for Experiences, Certifications, and Workshops with mirror-reflection styles and mobile-friendly Back controls.
- **Performance Optimized:** No horizontal scrolling issues, strict `overflow-x: hidden`, and optimized asset loading.

## 🛠️ Tech Stack
- **Frontend Framework:** React + Vite
- **Styling:** Vanilla CSS3 + Advanced CSS Grid/Flexbox
- **Animations:** AOS (Animate on Scroll), React Type Animation
- **Icons:** React Icons (`fa`, `si`, `hi`)
- **Backend/Database:** Supabase (configured, schema ready) / Node.js Express Backend

## 📂 Project Structure
The repository strictly organizes code into modular UI components:
```text
src/
├── components/          # Core sections (Hero, About, Experience, etc.)
│   └── ui/              # Reusable base UI elements (Buttons, Text flips)
├── lib/                 # API controllers (api.js) and Supabase client
├── assets/              # Local images, videos, and icons
├── App.jsx              # Main routing and global layout container
└── index.css            # Global design system variables & responsive overrides
```

## 🎨 Design Philosophy (The "Master Pro" Layout)
Every padding, margin, and border has been meticulously calculated to prevent "overspace" (dead zones) and guarantee perfect symmetry on screens of all sizes.
- **Typography:** Outfit (Headings) and Space Grotesk (Body)
- **Borders:** `1px solid rgba(255, 255, 255, 0.05)` for ultra-sleek division.
- **Color Palette:**
  - `bg-primary`: `#0a0a0f`
  - `accent-primary`: `#7c3aed` (Purple)
  - `accent-secondary`: `#06b6d4` (Cyan)
  - `accent-gold`: `#f59e0b`

## 💻 Local Development
1. Clone the repository: `git clone https://github.com/Prime2605/portfolio.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`
4. Build for production: `npm run build`

## 📝 License
This project is proprietary and intended as a personal portfolio showcasing my professional work, skills, and research as an ECE student and Full-Stack Developer.
