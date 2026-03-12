# 🌿 Serenity

**A University-Integrated Mental Health Platform**

> "A space built for trust, not performance."

Serenity is a modern, compassionate mental health platform designed specifically for university environments. It prioritizes emotional safety, privacy, and proactive care through a "Soft Organic Minimalism" design philosophy, moving away from clinical or corporate aesthetics to create a digital sanctuary for students.

---

## ✨ The Vision

Serenity acknowledges the unique pressures of university life. It bridges the gap between students, psychologists, and university administration by providing a unified yet strictly isolated ecosystem for mental wellbeing.

- **Trust First**: Radical transparency about data usage and strict isolation of personal health data.
- **Micro-Reflection**: Encouraging small, regular check-ins instead of overwhelming surveys.
- **Human Connection**: Facilitating warm, asynchronous communication between students and their care teams.

---

## 🎨 Design Philosophy: Soft Organic Minimalism

We believe that the user interface is the first step in care.
- **Palette**: Earthy sage greens, warm creams, and soft clays.
- **Typography**: Refined serifs (Lora) for display to evoke trust and wisdom; modern sans-serifs (DM Sans) for clarity.
- **Motion**: Subtle, purposeful animations that respond to user presence without causing distraction.

---

## 🏗️ Core Portals

### 🎓 Student Portal
- **Daily Mood Check-ins**: Simple, emoji-based tracking to monitor emotional trends.
- **Guided Reflections**: Weekly step-by-step prompts for self-discovery.
- **Goal Tracking**: Wellbeing goals (e.g., "Practice mindfulness", "Social connection") with progress visualization.
- **Async Messaging**: Secure, non-urgent communication with assigned mentors.

### 🩺 Psychologist Portal
- **Case Management**: Student overview with status indicators (*Improving*, *Stable*, *Needs Care*).
- **Care History**: Viewing longitudinal student check-in data and reflection trends.
- **Session Notes**: Confidential, encrypted documentation for professional use.
- **Escalation Workflow**: Tools for proactive outreach to students showing signs of distress.

### 📊 Admin Portal
- **Privacy-Preserving Analytics**: High-level, aggregated university health metrics.
- **Trust Architecture**: Administration has ZERO access to individual student data, reflections, or notes.
- **System Health**: Real-time monitoring of platform engagement and attendance rates.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS & Custom CSS Design Tokens
- **Database/Auth**: [Supabase](https://supabase.com/) (PostgreSQL with RLS)
- **Animations**: Framer Motion
- **Visualization**: Recharts
- **Typo**: Google Fonts (Lora, DM Sans)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ris-git/Serenity.git
   cd Serenity
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   *Note: Runs on [http://localhost:3001](http://localhost:3001)*

---

## 🧪 Prototype Demo

Serenity is currently in **Prototype Mode**. You can explore any portal without a live Supabase account using the demo links on the login page:

- **Student Demo**: `priya@university.edu`
- **Psychologist Demo**: `dr.williams@serenity.health`
- **Admin Demo**: `admin@university.edu`

---

## 🛡️ Privacy & Security

Serenity implements **Row Level Security (RLS)** at the database level to ensure data isolation:
- Students only see their own data.
- Psychologists only see data for students assigned to them.
- Administrators only see aggregated, anonymous views.
- **Audit Logs**: Every access to sensitive data is logged for accountability.

---

Designed with 💚 by **Rishabh Vishwakarma**
