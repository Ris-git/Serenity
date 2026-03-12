'use client'

import { useState } from 'react'
import { mockReflectionQuestions } from '@/lib/mock-data'

const moods = ['😔', '😕', '😐', '🙂', '😊']

export default function ReflectionPage() {
    const [currentQ, setCurrentQ] = useState(0)
    const [answers, setAnswers] = useState<Record<string, { mood?: number; text: string }>>({})
    const [submitted, setSubmitted] = useState(false)

    const question = mockReflectionQuestions[currentQ]
    const total = mockReflectionQuestions.length
    const current = answers[question?.id] || { text: '' }

    if (submitted) {
        return (
            <div style={{ maxWidth: '600px', textAlign: 'center', padding: '80px 24px 0' }}>
                <span style={{ fontSize: '3rem', display: 'block', marginBottom: '24px' }}>🌿</span>
                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '12px' }}>
                    You showed up for yourself today.
                </h2>
                <p style={{ color: 'var(--color-soft-gray)', fontWeight: 300, lineHeight: 1.7, marginBottom: '32px' }}>
                    Your reflection has been saved. Your care team will review it before your next session.
                    Thank you for taking this time — it matters.
                </p>
                <button className="btn btn-secondary" onClick={() => { setSubmitted(false); setCurrentQ(0); setAnswers({}) }}>
                    Start over
                </button>
            </div>
        )
    }

    return (
        <div style={{ maxWidth: '680px' }}>
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '8px' }}>
                    Weekly reflection ✍️
                </h1>
                <p style={{ color: 'var(--color-soft-gray)', fontWeight: 300 }}>
                    Take your time. This is just for you.
                </p>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>
                        Question {currentQ + 1} of {total}
                    </span>
                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-sage-dark)' }}>
                        {Math.round(((currentQ) / total) * 100)}% complete
                    </span>
                </div>
                <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${((currentQ) / total) * 100}%` }} />
                </div>
            </div>

            {/* Question card */}
            <div className="card animate-scale-in" style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '12px' }}>
                    Question {currentQ + 1}
                </p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, fontSize: '1.25rem', marginBottom: '8px', lineHeight: 1.4 }}>
                    {question.question}
                </h3>
                <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-sm)', fontStyle: 'italic', marginBottom: '24px', fontWeight: 300 }}>
                    {question.hint}
                </p>

                {/* Mood selector for first question */}
                {currentQ === 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)', marginBottom: '12px' }}>Select a mood:</p>
                        <div className="mood-selector">
                            {moods.map((emoji, idx) => (
                                <button
                                    key={idx}
                                    className={`mood-btn${current.mood === idx ? ' selected' : ''}`}
                                    onClick={() => setAnswers({ ...answers, [question.id]: { ...current, mood: idx } })}
                                    aria-label={`Mood ${idx + 1}`}
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <textarea
                    className="input"
                    placeholder="Share your thoughts here… or just leave this blank. Either is okay."
                    value={current.text}
                    onChange={e => setAnswers({ ...answers, [question.id]: { ...current, text: e.target.value } })}
                    style={{ minHeight: '120px' }}
                />
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setCurrentQ(Math.max(0, currentQ - 1))}
                    disabled={currentQ === 0}
                    style={{ opacity: currentQ === 0 ? 0.4 : 1 }}
                >
                    ← Back
                </button>

                <button
                    className="btn btn-ghost btn-sm"
                    style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-xs)' }}
                    onClick={() => setSubmitted(true)}
                >
                    It&apos;s okay to skip today
                </button>

                {currentQ < total - 1 ? (
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setCurrentQ(currentQ + 1)}
                    >
                        Next →
                    </button>
                ) : (
                    <button className="btn btn-primary btn-sm" onClick={() => setSubmitted(true)}>
                        Submit reflection 🌿
                    </button>
                )}
            </div>

            {/* Auto-save notice */}
            <p style={{ textAlign: 'center', marginTop: '24px', fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontStyle: 'italic' }}>
                Your answers are saved automatically as you write.
            </p>
        </div>
    )
}
