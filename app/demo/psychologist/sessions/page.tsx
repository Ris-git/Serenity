'use client'

import { useState } from 'react'
import { mockStudents } from '@/lib/mock-data'

export default function PsychologistSessionsPage() {
    const [activeNote, setActiveNote] = useState<string | null>(null)
    const [noteText, setNoteText] = useState('')
    const [saved, setSaved] = useState(false)

    const sessions = [
        { id: 's1', studentId: '1', student: 'Aria Chen', date: '2026-03-13', time: '10:00 AM', type: 'Monthly check-in', status: 'upcoming' },
        { id: 's2', studentId: '3', student: 'Maya Patel', date: '2026-03-13', time: '1:00 PM', type: 'Crisis follow-up', status: 'upcoming' },
        { id: 's3', studentId: '2', student: 'James Okafor', date: '2026-03-15', time: '11:00 AM', type: 'Monthly check-in', status: 'upcoming' },
        { id: 's4', studentId: '4', student: 'Liam Torres', date: '2026-03-10', time: '2:00 PM', type: 'Monthly check-in', status: 'completed' },
        { id: 's5', studentId: '5', student: 'Sofia Nakamura', date: '2026-03-08', time: '3:30 PM', type: 'Monthly check-in', status: 'completed' },
    ]

    const upcoming = sessions.filter(s => s.status === 'upcoming')
    const completed = sessions.filter(s => s.status === 'completed')

    const handleSaveNote = () => {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div style={{ maxWidth: '900px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '8px' }}>
                    Sessions 📅
                </h1>
                <p style={{ color: 'var(--color-soft-gray)', fontWeight: 300 }}>
                    Manage your upcoming and past sessions.
                </p>
            </div>

            {/* Upcoming */}
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '16px', fontSize: '1.125rem' }}>
                Upcoming
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                {upcoming.map(s => (
                    <div key={s.id} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                <div style={{
                                    width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0,
                                    background: 'linear-gradient(135deg, var(--color-sage-light), var(--color-clay))',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    color: 'white', fontFamily: 'var(--font-display)', fontSize: '0.875rem',
                                }}>
                                    {s.student.split(' ').map((n: string) => n[0]).join('')}
                                </div>
                                <div>
                                    <p style={{ fontWeight: 500, marginBottom: '2px' }}>{s.student}</p>
                                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>{s.type}</p>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontWeight: 500, fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)' }}>
                                    {new Date(s.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                                </p>
                                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>{s.time}</p>
                            </div>
                            <button className="btn btn-secondary btn-sm" onClick={() => setActiveNote(s.id)}>
                                Add note
                            </button>
                        </div>

                        {/* Inline note editor */}
                        {activeNote === s.id && (
                            <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-charcoal-6)' }}>
                                <label className="label">Session note <span style={{ color: 'var(--color-soft-gray)' }}>(confidential)</span></label>
                                <textarea
                                    className="input"
                                    placeholder="Add your session observations, goals discussed, next steps…"
                                    value={noteText}
                                    onChange={e => setNoteText(e.target.value)}
                                    style={{ minHeight: '100px', marginBottom: '12px' }}
                                />
                                <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                    <button className="btn btn-ghost btn-sm" onClick={() => setActiveNote(null)}>Cancel</button>
                                    <button className="btn btn-primary btn-sm" onClick={handleSaveNote}>
                                        {saved ? '✓ Saved' : 'Save note'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Past sessions */}
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '16px', fontSize: '1.125rem' }}>
                Recent sessions
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {completed.map(s => (
                    <div key={s.id} className="card-flat" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
                        <div>
                            <p style={{ fontWeight: 400, fontSize: 'var(--text-sm)', marginBottom: '2px' }}>{s.student}</p>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>{s.type}</p>
                        </div>
                        <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>
                            {new Date(s.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {s.time}
                        </p>
                        <span className="status-tag status-improving">Completed</span>
                    </div>
                ))}
            </div>
        </div>
    )
}
