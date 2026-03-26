'use client'

import Link from 'next/link'
import { useState } from 'react'
import { mockCurrentStudent, mockGoals } from '@/lib/mock-data'

const moods = [
    { emoji: '😔', label: 'Low' },
    { emoji: '😕', label: 'Uneasy' },
    { emoji: '😐', label: 'Okay' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😊', label: 'Great' },
]

function getTimeGreeting() {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 17) return 'Good afternoon'
    return 'Good evening'
}

export default function StudentDashboard() {
    const [selectedMood, setSelectedMood] = useState<number | null>(null)
    const [moodSaved, setMoodSaved] = useState(false)
    const student = mockCurrentStudent

    const handleMoodSelect = (idx: number) => {
        setSelectedMood(idx)
        setTimeout(() => setMoodSaved(true), 400)
    }

    return (
        <div style={{ maxWidth: '900px' }}>
            {/* Greeting */}
            <div style={{ marginBottom: '40px' }} className="animate-fade-up">
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, marginBottom: '6px' }}>
                    {getTimeGreeting()}, {student.name.split(' ')[0]}. 🌿
                </h1>
                <p style={{ color: 'var(--color-soft-gray)', fontWeight: 300, fontSize: 'var(--text-md)' }}>
                    How are you feeling today?
                </p>
            </div>

            {/* Mood selector card */}
            <div className="card animate-fade-up stagger-children" style={{ marginBottom: '24px', animationDelay: '80ms' }}>
                {!moodSaved ? (
                    <>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '20px', fontSize: 'var(--text-lg)' }}>
                            Today&apos;s check-in
                        </h3>
                        <div className="mood-selector" style={{ justifyContent: 'flex-start' }}>
                            {moods.map((mood, idx) => (
                                <button
                                    key={idx}
                                    className={`mood-btn${selectedMood === idx ? ' selected' : ''}`}
                                    onClick={() => handleMoodSelect(idx)}
                                    title={mood.label}
                                    aria-label={`Feeling ${mood.label}`}
                                >
                                    {mood.emoji}
                                </button>
                            ))}
                        </div>
                        {selectedMood !== null && !moodSaved && (
                            <p style={{ marginTop: '16px', color: 'var(--color-sage-dark)', fontSize: 'var(--text-sm)', fontStyle: 'italic' }}>
                                Feeling {moods[selectedMood].label.toLowerCase()} today — noted. 💚
                            </p>
                        )}
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: '8px 0' }}>
                        <span style={{ fontSize: '2rem' }}>{moods[selectedMood!].emoji}</span>
                        <p style={{ marginTop: '12px', color: 'var(--color-sage-dark)', fontWeight: 500 }}>
                            Check-in saved for today
                        </p>
                        <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-sm)', fontWeight: 300, marginTop: '4px' }}>
                            Thank you for showing up. That takes courage.
                        </p>
                    </div>
                )}
            </div>

            {/* Two-column grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }} className="animate-fade-up">

                {/* Upcoming session */}
                <div className="card" style={{ animationDelay: '160ms' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)' }}>
                            Upcoming session
                        </h3>
                        <span className="status-tag status-stable">Confirmed</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                        <div style={{
                            width: '48px', height: '48px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--color-sage-light), var(--color-clay))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem',
                        }}>👩‍⚕️</div>
                        <div>
                            <p style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>{student.assignedPsychologist.name}</p>
                            <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-xs)', fontWeight: 300 }}>
                                {student.assignedPsychologist.title}
                            </p>
                        </div>
                    </div>
                    <div style={{
                        padding: '12px 16px',
                        background: 'var(--color-cream-dark)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '16px',
                    }}>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)', fontWeight: 500 }}>
                            📅 {student.nextSession.date}
                        </p>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300, marginTop: '4px' }}>
                            {student.nextSession.time} · {student.nextSession.duration} · {student.nextSession.type}
                        </p>
                    </div>
                    <Link href="/demo/student/sessions" className="btn btn-secondary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                        Manage session
                    </Link>
                </div>

                {/* Weekly reflection */}
                <div className="card" style={{ animationDelay: '240ms', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)', marginBottom: '12px' }}>
                        Weekly reflection
                    </h3>
                    <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-sm)', fontWeight: 300, lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                        Take a few minutes to check in with yourself. There are no right or wrong answers here.
                    </p>
                    <div style={{
                        display: 'flex', gap: '8px',
                        padding: '12px',
                        background: 'var(--color-sage-5)',
                        borderRadius: 'var(--radius-md)',
                        marginBottom: '16px',
                    }}>
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d, i) => (
                            <div key={d} style={{
                                flex: 1, textAlign: 'center', fontSize: '10px', color: 'var(--color-soft-gray)',
                                paddingBottom: '4px',
                            }}>
                                <div style={{
                                    width: '100%', height: '6px', borderRadius: '3px', marginBottom: '4px',
                                    background: i < 4 ? 'var(--color-sage)' : 'var(--color-cream-darker)',
                                    opacity: i < 4 ? 0.8 - i * 0.05 : 1,
                                }} />
                                {d}
                            </div>
                        ))}
                    </div>
                    <Link href="/demo/student/reflection" className="btn btn-primary btn-sm" style={{ justifyContent: 'center' }}>
                        Continue reflection ✍️
                    </Link>
                </div>
            </div>

            {/* Goals & I need support */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }} className="animate-fade-up">
                {/* Goals preview */}
                <div className="card" style={{ animationDelay: '320ms' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)' }}>
                            Your goals
                        </h3>
                        <Link href="/demo/student/goals" style={{ fontSize: 'var(--text-sm)', color: 'var(--color-sage-dark)' }}>View all →</Link>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {mockGoals.slice(0, 2).map(goal => (
                            <div key={goal.id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 400 }}>{goal.title}</span>
                                    <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)' }}>{goal.progress}%</span>
                                </div>
                                <div className="progress-track">
                                    <div className="progress-fill" style={{ width: `${goal.progress}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* I need support CTA */}
                <div style={{
                    background: 'linear-gradient(160deg, rgba(201,197,224,0.15), rgba(139,157,131,0.10))',
                    border: '1px solid var(--color-lavender)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: '12px',
                    animationDelay: '400ms',
                }}>
                    <span style={{ fontSize: '2rem' }}>💙</span>
                    <div>
                        <p style={{ fontWeight: 500, fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)', marginBottom: '6px' }}>
                            Need to talk?
                        </p>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300, lineHeight: 1.5 }}>
                            Send a message to your care team right now.
                        </p>
                    </div>
                    <Link href="/demo/student/messages" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                        Message my mentor
                    </Link>
                    <p style={{ fontSize: '11px', color: 'var(--color-soft-gray)', fontStyle: 'italic' }}>
                        Not for emergencies. Call 112 if in crisis.
                    </p>
                </div>
            </div>
        </div>
    )
}
