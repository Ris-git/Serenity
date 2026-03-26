'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function RegisterPage() {
    const [step, setStep] = useState(1)
    const [agreed, setAgreed] = useState(false)
    const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async () => {
        if (!agreed) return
        setLoading(true)
        setError(null)

        const { error: signUpError } = await supabase.auth.signUp({
            email: form.email,
            password: form.password,
            options: {
                data: { full_name: form.name, role: form.role }
            }
        })

        if (signUpError) {
            setError(signUpError.message)
            setLoading(false)
            return
        }

        // Redirect — simple default to student for now
        router.push('/student')
    }

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            background: 'var(--color-cream)',
        }}>
            <div className="animate-fade-up" style={{ width: '100%', maxWidth: '480px' }}>
                <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '40px' }}>
                    {[1, 2].map(s => (
                        <div key={s} style={{
                            width: s <= step ? '24px' : '8px',
                            height: '8px',
                            borderRadius: 'var(--radius-full)',
                            background: s <= step ? 'var(--color-sage)' : 'var(--color-clay)',
                            transition: 'all 0.3s var(--ease-smooth)',
                        }} />
                    ))}
                </div>

                <div style={{
                    background: 'var(--color-cream)',
                    border: '1px solid var(--color-sage-15)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '40px',
                    boxShadow: 'var(--shadow-card)',
                }}>
                    {step === 1 && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '8px', color: 'var(--color-charcoal-dark)' }}>
                                Let&apos;s get you set up
                            </h2>
                            <p style={{ color: 'var(--color-soft-gray)', marginBottom: '32px', fontWeight: 300 }}>
                                Use your university email — this keeps your account verified and your data safe.
                            </p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <label className="label">Full name</label>
                                    <input className="input" type="text" placeholder="How should we address you?"
                                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="label">University email</label>
                                    <input className="input" type="email" placeholder="your.name@university.edu"
                                        value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
                                </div>
                                <div>
                                    <label className="label">Password</label>
                                    <input className="input" type="password" placeholder="At least 8 characters"
                                        value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
                                </div>
                                <div>
                                    <label className="label">I am a…</label>
                                    <select className="input" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} style={{ cursor: 'pointer' }}>
                                        <option value="student">Student</option>
                                        <option value="psychologist">Psychologist / Counselor</option>
                                        <option value="trainee">Psychology trainee (supervised)</option>
                                    </select>
                                </div>
                                {error && <p style={{ color: '#c0392b', fontSize: 'var(--text-sm)', textAlign: 'center' }}>{error}</p>}
                                <button
                                    className="btn btn-primary"
                                    style={{ marginTop: '8px', justifyContent: 'center' }}
                                    onClick={() => {
                                        if (!form.name || !form.email || !form.password) { setError('Please fill in all fields.'); return }
                                        setError(null)
                                        setStep(2)
                                    }}
                                    type="button"
                                >
                                    Continue
                                </button>
                            </div>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '8px', color: 'var(--color-charcoal-dark)' }}>
                                Before we begin…
                            </h2>
                            <p style={{ color: 'var(--color-soft-gray)', marginBottom: '32px', fontWeight: 300 }}>
                                Please read this carefully. Your trust matters deeply to us.
                            </p>
                            <div style={{ background: 'var(--color-cream-dark)', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '24px', border: '1px solid var(--color-charcoal-6)' }}>
                                <h4 style={{ marginBottom: '12px', color: 'var(--color-charcoal)' }}>Your privacy is protected</h4>
                                <ul style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-sm)', lineHeight: 1.8, paddingLeft: '20px', fontWeight: 300 }}>
                                    <li>Your reflections and therapy notes are completely private</li>
                                    <li>University administrators cannot access your personal data</li>
                                    <li>Your participation does not affect your academic standing</li>
                                    <li>You can request data deletion at any time</li>
                                    <li>This platform is not a substitute for emergency services</li>
                                </ul>
                            </div>
                            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', marginBottom: '24px' }}>
                                <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)}
                                    style={{ marginTop: '3px', accentColor: 'var(--color-sage)', width: '16px', height: '16px' }} />
                                <span style={{ color: 'var(--color-charcoal)', fontSize: 'var(--text-sm)', lineHeight: 1.6, fontWeight: 300 }}>
                                    I have read and agree to the privacy policy and informed consent. I understand this is a support tool, not for emergencies.
                                </span>
                            </label>
                            {error && <p style={{ color: '#c0392b', fontSize: 'var(--text-sm)', marginBottom: '16px', textAlign: 'center' }}>{error}</p>}
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button className="btn btn-ghost" onClick={() => setStep(1)} type="button" style={{ flex: 1, justifyContent: 'center' }}>
                                    Back
                                </button>
                                <button
                                    className="btn btn-primary"
                                    disabled={!agreed || loading}
                                    type="button"
                                    onClick={handleSubmit}
                                    style={{ flex: 2, justifyContent: 'center', opacity: agreed && !loading ? 1 : 0.5, cursor: agreed && !loading ? 'pointer' : 'not-allowed' }}
                                >
                                    {loading ? 'Creating account…' : 'Create my account'}
                                </button>
                            </div>
                        </>
                    )}
                </div>

                <p style={{ textAlign: 'center', marginTop: '24px', fontSize: 'var(--text-sm)', color: 'var(--color-soft-gray)' }}>
                    Already have an account?{' '}
                    <Link href="/auth/login" style={{ color: 'var(--color-sage-dark)', fontWeight: 500 }}>Sign in</Link>
                </p>
            </div>
        </div>
    )
}
