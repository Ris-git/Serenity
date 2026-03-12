'use client'

import { useState } from 'react'
import { mockMessages } from '@/lib/mock-data'

export default function MessagesPage() {
    const [newMessage, setNewMessage] = useState('')
    const [messages, setMessages] = useState(mockMessages)

    const handleSend = () => {
        if (!newMessage.trim()) return
        setMessages([...messages, {
            id: `m${Date.now()}`,
            from: 'student',
            senderName: 'Priya Sharma',
            text: newMessage.trim(),
            timestamp: new Date().toISOString(),
            read: false,
        }])
        setNewMessage('')
    }

    return (
        <div style={{ maxWidth: '700px', display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '8px' }}>
                    Messages 💬
                </h1>
                <p style={{ color: 'var(--color-soft-gray)', fontWeight: 300 }}>Your private thread with your care team.</p>
            </div>

            {/* Crisis disclaimer */}
            <div className="crisis-disclaimer" style={{ marginBottom: '20px' }}>
                <span>⚠️</span>
                <span>
                    This is not for emergencies. If you&apos;re in crisis, please call <strong>112</strong> or your university&apos;s crisis line immediately.
                </span>
            </div>

            {/* Mentor card */}
            <div className="card-flat" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--color-sage-light), var(--color-clay))',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem',
                }}>👩‍⚕️</div>
                <div>
                    <p style={{ fontWeight: 500, fontSize: 'var(--text-sm)' }}>Dr. Sarah Williams</p>
                    <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-xs)', fontWeight: 300 }}>
                        Clinical Psychologist · Replies within 24 hours on weekdays
                    </p>
                </div>
                <span className="status-tag status-improving" style={{ marginLeft: 'auto' }}>Active</span>
            </div>

            {/* Messages */}
            <div style={{
                flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px',
                padding: '4px 0', marginBottom: '20px',
            }}>
                {messages.map(msg => {
                    const isStudent = msg.from === 'student'
                    return (
                        <div key={msg.id} style={{
                            display: 'flex', flexDirection: 'column',
                            alignItems: isStudent ? 'flex-end' : 'flex-start',
                        }}>
                            <div style={{
                                maxWidth: '75%',
                                padding: '14px 18px',
                                borderRadius: isStudent
                                    ? '16px 16px 4px 16px'
                                    : '16px 16px 16px 4px',
                                background: isStudent ? 'var(--color-sage)' : 'var(--color-cream-dark)',
                                border: isStudent ? 'none' : '1px solid var(--color-charcoal-6)',
                                color: isStudent ? 'white' : 'var(--color-charcoal)',
                                fontSize: 'var(--text-sm)',
                                lineHeight: 1.6,
                            }}>
                                {msg.text}
                            </div>
                            <p style={{
                                fontSize: '11px',
                                color: 'var(--color-soft-gray)',
                                marginTop: '4px',
                                fontWeight: 300,
                            }}>
                                {new Date(msg.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                {msg.read && isStudent && ' · Read ✓'}
                            </p>
                        </div>
                    )
                })}
            </div>

            {/* Input */}
            <div style={{
                display: 'flex', gap: '12px', alignItems: 'flex-end',
                padding: '16px',
                background: 'var(--color-cream-dark)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--color-charcoal-6)',
            }}>
                <textarea
                    className="input"
                    style={{ flex: 1, minHeight: '48px', maxHeight: '120px', resize: 'none' }}
                    placeholder="Write a message… take your time."
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                />
                <button
                    className="btn btn-primary"
                    onClick={handleSend}
                    disabled={!newMessage.trim()}
                    style={{ flexShrink: 0, opacity: newMessage.trim() ? 1 : 0.5 }}
                >
                    Send
                </button>
            </div>
        </div>
    )
}
