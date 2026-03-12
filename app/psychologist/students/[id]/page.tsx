'use client'

import { mockStudents, mockMessages } from '@/lib/mock-data'
import Link from 'next/link'

export default function StudentProfilePage({ params }: { params: { id: string } }) {
    const student = mockStudents.find(s => s.id === params.id) || mockStudents[0]

    const checkIns = [
        { date: '2026-03-12', mood: '😊', note: 'Feeling much better this week.' },
        { date: '2026-03-05', mood: '🙂', note: 'Good progress with breathing exercises.' },
        { date: '2026-02-26', mood: '😐', note: 'Stressed about exams, talked about it.' },
        { date: '2026-02-19', mood: '😕', note: 'Difficult week, reached out proactively.' },
    ]

    return (
        <div style={{ maxWidth: '900px' }}>
            {/* Back */}
            <Link href="/psychologist" className="btn btn-ghost btn-sm" style={{ marginBottom: '24px', display: 'inline-flex' }}>
                ← Back to students
            </Link>

            {/* Student header */}
            <div className="card" style={{ marginBottom: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                <div style={{
                    width: '72px', height: '72px', borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg, var(--color-sage-light), var(--color-clay))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.4rem', color: 'white', fontFamily: 'var(--font-display)', fontWeight: 400,
                }}>
                    {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
                        <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.375rem' }}>{student.name}</h2>
                        <span className={`status-tag status-${student.status}`}>
                            {student.status === 'improving' ? 'Improving' : student.status === 'stable' ? 'Stable' : 'Needs care'}
                        </span>
                    </div>
                    <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-sm)', fontWeight: 300 }}>{student.email}</p>
                    <p style={{ color: 'var(--color-soft-gray)', fontSize: '11px', fontWeight: 300, marginTop: '4px' }}>
                        Enrolled {new Date(student.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', marginBottom: '4px', fontWeight: 300 }}>Next session</p>
                    <p style={{ fontWeight: 500, color: 'var(--color-charcoal)' }}>
                        {new Date(student.nextSession).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                </div>
            </div>

            {/* Two-column layout */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Check-in history */}
                <div className="card">
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '20px' }}>Check-in history</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {checkIns.map((ci, i) => (
                            <div key={i} style={{
                                display: 'flex', gap: '12px',
                                padding: '12px',
                                background: 'var(--color-cream-dark)',
                                borderRadius: 'var(--radius-md)',
                                border: '1px solid var(--color-charcoal-6)',
                            }}>
                                <span style={{ fontSize: '1.25rem' }}>{ci.mood}</span>
                                <div>
                                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300, marginBottom: '2px' }}>
                                        {new Date(ci.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)', fontStyle: 'italic', fontWeight: 300 }}>
                                        &ldquo;{ci.note}&rdquo;
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Session notes */}
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400 }}>Session notes</h3>
                        <span className="status-tag" style={{ background: 'var(--color-charcoal-6)', color: 'var(--color-soft-gray)' }}>
                            🔒 Confidential
                        </span>
                    </div>
                    {[
                        { date: '2026-03-01', preview: 'Discussed exam anxiety and coping strategies. Student shows good insight into their patterns…' },
                        { date: '2026-02-15', preview: 'Follow-up on breathing exercises. Reported improved sleep quality…' },
                    ].map((note, i) => (
                        <div key={i} style={{
                            padding: '14px',
                            background: 'var(--color-cream-dark)',
                            borderRadius: 'var(--radius-md)',
                            marginBottom: '8px',
                            cursor: 'pointer',
                            border: '1px solid var(--color-charcoal-6)',
                        }}>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300, marginBottom: '6px' }}>
                                {new Date(note.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                            </p>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)', lineHeight: 1.5, fontWeight: 300 }}>
                                {note.preview}
                            </p>
                        </div>
                    ))}
                    <button className="btn btn-secondary btn-sm" style={{ marginTop: '8px', width: '100%', justifyContent: 'center' }}>
                        + Add session note
                    </button>
                </div>
            </div>

            {/* Risk/Escalation panel */}
            {student.status === 'needs-care' && (
                <div style={{
                    marginTop: '24px',
                    padding: '20px 24px',
                    background: 'rgba(184,180,208,0.12)',
                    border: '1px solid var(--color-lavender)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                }}>
                    <div>
                        <p style={{ fontWeight: 500, marginBottom: '4px', color: 'var(--color-charcoal)' }}>
                            💙 This student may need additional support
                        </p>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>
                            Their check-in frequency has dropped. Consider a proactive outreach.
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                        <button className="btn btn-secondary btn-sm">Send message</button>
                        <button className="btn btn-primary btn-sm">Escalate to supervisor</button>
                    </div>
                </div>
            )}
        </div>
    )
}
