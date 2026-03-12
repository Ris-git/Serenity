-- ============================================================
-- SERENITY — Supabase Database Schema
-- PostgreSQL + Row Level Security (RLS)
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id            UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name     TEXT NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  role          TEXT NOT NULL CHECK (role IN ('student', 'psychologist', 'trainee', 'admin')),
  university    TEXT,
  avatar_url    TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PSYCHOLOGIST ASSIGNMENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS assignments (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id        UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  psychologist_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  assigned_at       TIMESTAMPTZ DEFAULT NOW(),
  is_active         BOOLEAN DEFAULT TRUE,
  UNIQUE(student_id, psychologist_id)
);

-- ============================================================
-- MOOD CHECK-INS
-- ============================================================
CREATE TABLE IF NOT EXISTS checkins (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  mood        INTEGER NOT NULL CHECK (mood BETWEEN 1 AND 5),
  note        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- WEEKLY REFLECTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS reflections (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  week_start  DATE NOT NULL,
  answers     JSONB NOT NULL DEFAULT '{}',
  submitted   BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, week_start)
);

-- ============================================================
-- SESSIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS sessions (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id       UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  psychologist_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  scheduled_at     TIMESTAMPTZ NOT NULL,
  duration_min     INTEGER DEFAULT 50,
  session_type     TEXT DEFAULT 'monthly-checkin',
  status           TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming','completed','cancelled','rescheduled')),
  pre_checkin_mood INTEGER CHECK (pre_checkin_mood BETWEEN 1 AND 5),
  post_checkin_mood INTEGER CHECK (post_checkin_mood BETWEEN 1 AND 5),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SESSION NOTES (confidential — psychologist only)
-- ============================================================
CREATE TABLE IF NOT EXISTS session_notes (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id      UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  psychologist_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  content         TEXT NOT NULL,
  is_confidential BOOLEAN DEFAULT TRUE,
  risk_level      TEXT DEFAULT 'none' CHECK (risk_level IN ('none', 'low', 'moderate', 'high')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- MESSAGES (async threading)
-- ============================================================
CREATE TABLE IF NOT EXISTS messages (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  recipient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  thread_id    UUID NOT NULL,
  content      TEXT NOT NULL,
  is_read      BOOLEAN DEFAULT FALSE,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- GOALS
-- ============================================================
CREATE TABLE IF NOT EXISTS goals (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id  UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  category    TEXT DEFAULT 'wellbeing',
  progress    INTEGER DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  is_private  BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- AUDIT LOG
-- ============================================================
CREATE TABLE IF NOT EXISTS audit_log (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  actor_id    UUID REFERENCES profiles(id),
  action      TEXT NOT NULL,
  resource    TEXT NOT NULL,
  resource_id UUID,
  metadata    JSONB DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================

ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments   ENABLE ROW LEVEL SECURITY;
ALTER TABLE checkins      ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections   ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages      ENABLE ROW LEVEL SECURITY;
ALTER TABLE goals         ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_log     ENABLE ROW LEVEL SECURITY;

-- profiles: users see/edit only their own row
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- checkins: students own their data
CREATE POLICY "Students can manage own checkins" ON checkins
  FOR ALL USING (auth.uid() = student_id);

-- psychologists can read check-ins for assigned students
CREATE POLICY "Psychologists can read assigned student checkins" ON checkins
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM assignments
      WHERE psychologist_id = auth.uid()
      AND student_id = checkins.student_id
      AND is_active = TRUE
    )
  );

-- reflections: students own their data
CREATE POLICY "Students can manage own reflections" ON reflections
  FOR ALL USING (auth.uid() = student_id);

-- psychologists can read reflections for assigned students
CREATE POLICY "Psychologists can read assigned student reflections" ON reflections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM assignments
      WHERE psychologist_id = auth.uid()
      AND student_id = reflections.student_id
      AND is_active = TRUE
    )
  );

-- sessions: student or their psychologist
CREATE POLICY "Students can view own sessions" ON sessions
  FOR SELECT USING (auth.uid() = student_id);

CREATE POLICY "Psychologists can manage assigned student sessions" ON sessions
  FOR ALL USING (auth.uid() = psychologist_id);

-- session_notes: psychologist only
CREATE POLICY "Psychologists can manage own notes" ON session_notes
  FOR ALL USING (auth.uid() = psychologist_id);

-- messages: sender or recipient
CREATE POLICY "Users can view own messages" ON messages
  FOR SELECT USING (auth.uid() = sender_id OR auth.uid() = recipient_id);

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

-- goals: student owns; psychologist reads if shared
CREATE POLICY "Students can manage own goals" ON goals
  FOR ALL USING (auth.uid() = student_id);

CREATE POLICY "Psychologists can read shared student goals" ON goals
  FOR SELECT USING (
    is_private = FALSE
    AND EXISTS (
      SELECT 1 FROM assignments
      WHERE psychologist_id = auth.uid()
      AND student_id = goals.student_id
      AND is_active = TRUE
    )
  );

-- ADMIN: NO RLS bypass — admins use aggregated views only
-- Admin-only aggregated views (no personal data)
CREATE OR REPLACE VIEW admin_metrics AS
SELECT
  (SELECT COUNT(*) FROM profiles WHERE role = 'student') AS total_students,
  (SELECT COUNT(*) FROM sessions WHERE status = 'completed'
     AND scheduled_at > NOW() - INTERVAL '30 days') AS sessions_last_30_days,
  (SELECT COUNT(*) FROM reflections WHERE submitted = TRUE
     AND created_at > NOW() - INTERVAL '7 days') AS reflections_this_week,
  (SELECT COUNT(*) FROM profiles WHERE role = 'student'
     AND created_at > NOW() - INTERVAL '30 days') AS new_students_this_month;
