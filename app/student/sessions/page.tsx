'use client'

import { useState } from 'react'
import { mockCurrentStudent } from '@/lib/mock-data'

const timeSlots: Record<string, string[]> = {
    'Mon Mar 16': ['10:00 AM', '11:30 AM', '2:00 PM'],
    'Tue Mar 17': ['9:00 AM', '1:00 PM', '3:30 PM'],
    'Thu Mar 19': ['11:00 AM', '2:30 PM', '4:00 PM'],
    'Fri Mar 20': ['9:30 AM', '12:00 PM'],
}

export default function SessionsPage() {
    const [selectedDate, setSelectedDate] = useState<string | null>(null)
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
    const [booked, setBooked] = useState(false)
    const student = mockCurrentStudent

    if (booked) {
        return (
            <div style={{ maxWidth: '600px', textAlign: 'center', padding: '60px 24px 0' }}>
                <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '20px' }}>📅</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '12px' }}>
                    Session confirmed!
                </h2>
                <p style={{ color: 'var(--color-soft-gray)', fontWeight: 300, marginBottom: '32px' }}>
                    <strong>{selectedSlot}</strong> on <strong>{selectedDate}</strong> with {student.assignedPsychologist.name}.
                    You&apos;ll receive a reminder 24 hours before.
                </p>
                <button className="btn btn-secondary" onClick={() => { setBooked(false); setSelectedDate(null); setSelectedSlot(null) }}>
                    Book another session
                </button>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '800px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '8px' }}>
                    Book a session 📅
                </h1>
                <p style={{ color: 'var(--color-soft-gray)', fontWeight: 300 }}>
                    Sessions are twice a month. Choose a time that works for you.
                </p>
            </div>

            {/* Psychologist card */}
            <div className="card" style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{
                    width: '64px', height: '64px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-sage-light), var(--color-clay))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem', flexShrink: 0,
                }}>👩‍⚕️</div>
                <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 500, marginBottom: '4px' }}>{student.assignedPsychologist.name}</p>
                    <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-sm)', fontWeight: 300 }}>
                        {student.assignedPsychologist.title}
                    </p>
                    <span className="status-tag status-improving" style={{ marginTop: '8px', display: 'inline-flex' }}>
                        Your assigned psychologist
                    </span>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>Upcoming session</p>
                    <p style={{ fontWeight: 500, color: 'var(--color-charcoal)', fontSize: 'var(--text-sm)', marginTop: '4px' }}>
                        {student.nextSession.date}
                    </p>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)' }}>{student.nextSession.time}</p>
                </div>
            </div>

            {/* Calendar */}
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '16px' }}>
                Available slots
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                {Object.entries(timeSlots).map(([date, slots]) => (
                    <div
                        key={date}
                        onClick={() => setSelectedDate(date)}
                        style={{
                            padding: '16px',
                            border: `1.5px solid ${selectedDate === date ? 'var(--color-sage)' : 'var(--color-charcoal-6)'}`,
                            borderRadius: 'var(--radius-lg)',
                            cursor: 'pointer',
                            background: selectedDate === date ? 'var(--color-sage-5)' : 'var(--color-cream)',
                            transition: 'all var(--duration-normal) var(--ease-smooth)',
                        }}
                    >
                        <p style={{ fontWeight: 500, fontSize: 'var(--text-sm)', marginBottom: '12px', color: selectedDate === date ? 'var(--color-sage-dark)' : 'var(--color-charcoal)' }}>
                            {date}
                        </p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                            {slots.map(slot => (
                                <button
                                    key={slot}
                                    onClick={e => { e.stopPropagation(); setSelectedDate(date); setSelectedSlot(slot) }}
                                    style={{
                                        padding: '6px 10px',
                                        borderRadius: '6px',
                                        border: `1px solid ${selectedDate === date && selectedSlot === slot ? 'var(--color-sage)' : 'var(--color-charcoal-10)'}`,
                                        background: selectedDate === date && selectedSlot === slot ? 'var(--color-sage)' : 'transparent',
                                        color: selectedDate === date && selectedSlot === slot ? 'white' : 'var(--color-charcoal)',
                                        fontSize: 'var(--text-xs)',
                                        cursor: 'pointer',
                                        transition: 'all var(--duration-fast) var(--ease-smooth)',
                                        fontFamily: 'var(--font-body)',
                                    }}
                                >
                                    {slot}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedSlot && (
                <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '16px 20px',
                    background: 'var(--color-sage-5)',
                    border: '1px solid var(--color-sage-15)',
                    borderRadius: 'var(--radius-lg)',
                    marginBottom: '16px',
                }}>
                    <div>
                        <p style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>Selected: {selectedSlot} · {selectedDate}</p>
                        <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-xs)', fontWeight: 300 }}>50-minute session with {student.assignedPsychologist.name}</p>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => setBooked(true)}>
                        Confirm booking
                    </button>
                </div>
            )}
        </div>
    )
}
