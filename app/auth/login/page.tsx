'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()
    const supabase = createClient()

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError(null)

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (signInError || !data.user) {
            setError(signInError?.message || 'Invalid email or password.')
            setLoading(false)
            return
        }

        // Read role from user metadata (stored at sign-up)
        const role = data.user.user_metadata?.role || 'student'
        const roleRoutes: Record<string, string> = {
            student: '/student',
            psychologist: '/psychologist',
            trainee: '/psychologist',
            admin: '/admin',
        }
        router.push(roleRoutes[role] || '/student')
    }

    const demoAccounts = [
        { role: 'student', label: 'Student demo', emoji: '🎓', path: '/demo/student' },
        { role: 'psychologist', label: 'Psychologist demo', emoji: '🌿', path: '/demo/psychologist' },
        { role: 'admin', label: 'Admin demo', emoji: '📊', path: '/demo/admin' },
    ]

    return (
        <div style={{
            minHeight: '100vh',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            background: 'var(--color-cream)',
        }}>
            {/* Left — decorative panel */}
            <div style={{
                background: 'linear-gradient(160deg, var(--color-sage-light) 0%, var(--color-sage-dark) 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '64px',
                position: 'relative',
                overflow: 'hidden',
            }} className="left-panel">
                <div style={{ position: 'absolute', top: '-20%', right: '-20%', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.08)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', pointerEvents: 'none' }} />
                <div style={{ position: 'relative', zIndex: 1 }}>
                    <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '24px' }}>🌿</span>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 400, color: '#fff', lineHeight: 1.3, marginBottom: '20px', letterSpacing: '-0.02em' }}>
                        Welcome back.<br /><em>Take your time.</em>
                    </h1>
                    <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: '1rem', fontWeight: 300, maxWidth: '360px' }}>
                        Your mental health journey continues here, in a space built for trust, not performance.
                    </p>
                    <div style={{ marginTop: '48px', padding: '20px 24px', background: 'rgba(255,255,255,0.12)', borderRadius: 'var(--radius-lg)', backdropFilter: 'blur(8px)' }}>
                        <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: 'var(--text-sm)', fontStyle: 'italic', lineHeight: 1.6 }}>
                            &ldquo;Your mental health data is confidential and separate from your academic records. University administrators cannot access your conversations or therapy notes.&rdquo;
                        </p>
                    </div>
                </div>
            </div>

            {/* Right — form */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '64px', maxWidth: '480px', margin: '0 auto', width: '100%' }} className="animate-fade-up">
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, color: 'var(--color-charcoal-dark)', marginBottom: '8px' }}>
                    Sign in
                </h2>
                <p style={{ color: 'var(--color-soft-gray)', marginBottom: '40px', fontWeight: 300 }}>
                    Use your university email to continue.
                </p>

                <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                        <label className="label">University email</label>
                        <input className="input" type="email" placeholder="your.name@university.edu" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <input className="input" type="password" placeholder="Your password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {error && (
                        <p style={{ color: '#c0392b', fontSize: 'var(--text-sm)', textAlign: 'center', padding: '10px', background: 'rgba(192,57,43,0.08)', borderRadius: 'var(--radius-md)' }}>
                            {error}
                        </p>
                    )}
                    <button type="submit" className="btn btn-primary" style={{ marginTop: '8px', justifyContent: 'center' }} disabled={loading}>
                        {loading ? 'Signing in…' : 'Sign in'}
                    </button>
                </form>

                {/* Demo access */}
                <div style={{ marginTop: '40px' }}>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-soft-gray)', textAlign: 'center', marginBottom: '16px', fontWeight: 300 }}>
                        Prototype demo — explore without an account
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {demoAccounts.map(account => (
                            <a
                                key={account.role}
                                href={account.path}
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '12px',
                                    padding: '12px 16px',
                                    background: 'var(--color-cream-dark)',
                                    border: '1.5px solid var(--color-charcoal-6)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'var(--color-charcoal)',
                                    fontSize: 'var(--text-sm)',
                                    fontWeight: 400,
                                    textDecoration: 'none',
                                    transition: 'all var(--duration-normal) var(--ease-smooth)',
                                }}
                                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-sage-8)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-sage)' }}
                                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-cream-dark)'; (e.currentTarget as HTMLElement).style.borderColor = 'var(--color-charcoal-6)' }}
                            >
                                <span style={{ fontSize: '1.1rem' }}>{account.emoji}</span>
                                <span>{account.label}</span>
                                <span style={{ marginLeft: 'auto', color: 'var(--color-soft-gray)', fontSize: 'var(--text-xs)' }}>→</span>
                            </a>
                        ))}
                    </div>
                </div>

                <p style={{ textAlign: 'center', marginTop: '32px', fontSize: 'var(--text-sm)', color: 'var(--color-soft-gray)' }}>
                    New student?{' '}
                    <Link href="/auth/register" style={{ color: 'var(--color-sage-dark)', fontWeight: 500 }}>Create account</Link>
                </p>
            </div>

            <style jsx>{`
        @media (max-width: 768px) {
          .left-panel { display: none; }
          div[style*="grid-template-columns"] { grid-template-columns: 1fr; }
        }
      `}</style>
        </div>
    )
}
