'use client'

import { useState } from 'react'

export default function SessionsPage() {
    const [booked, setBooked] = useState(false)

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

            {/* Empty state for no assigned psychologist */}
            <div className="card animate-fade-up" style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--color-soft-gray)' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>👩‍⚕️</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: 'var(--text-lg)', marginBottom: '8px', color: 'var(--color-charcoal)' }}>
                    Matching you with a care team
                </h3>
                <p style={{ fontWeight: 300, lineHeight: 1.6, maxWidth: '400px', margin: '0 auto' }}>
                    We are currently matching you with a clinical psychologist. Once assigned, you will be able to book sessions here.
                </p>
            </div>
        </div>
    )
}

