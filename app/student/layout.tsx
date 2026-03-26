'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

const navItems = [
    { href: '/student', label: 'Home', emoji: '🏠' },
    { href: '/student/reflection', label: 'Reflection', emoji: '✍️' },
    { href: '/student/sessions', label: 'Sessions', emoji: '📅' },
    { href: '/student/messages', label: 'Messages', emoji: '💬' },
    { href: '/student/goals', label: 'My goals', emoji: '🌱' },
]

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const [mobileOpen, setMobileOpen] = useState(false)
    const [userName, setUserName] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        const getUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const name = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student'
                setUserName(name)
            }
        }
        getUser()
    }, [supabase])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/auth/login')
    }

    return (
        <div className="app-shell">
            <aside className={`sidebar${mobileOpen ? ' open' : ''}`}>
                <div style={{ padding: '0 24px 32px' }}>
                    <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
                        <span style={{
                            width: '36px', height: '36px', borderRadius: '10px',
                            background: 'linear-gradient(135deg, var(--color-sage-light), var(--color-sage-dark))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem',
                        }}>🌿</span>
                        <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--color-charcoal-dark)', fontWeight: 400 }}>
                            Serenity
                        </span>
                    </Link>
                </div>

                <div style={{ padding: '12px 24px', margin: '0 12px 16px', background: 'var(--color-sage-5)', borderRadius: 'var(--radius-md)' }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>Signed in as</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)', fontWeight: 500, marginTop: '2px' }}>
                        {userName || '…'}
                    </p>
                </div>

                <nav style={{ flex: 1, padding: '0 12px' }}>
                    {navItems.map(item => {
                        const active = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href} style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '10px 12px', borderRadius: 'var(--radius-md)', marginBottom: '4px',
                                background: active ? 'var(--color-sage-10)' : 'transparent',
                                border: active ? '1px solid var(--color-sage-15)' : '1px solid transparent',
                                color: active ? 'var(--color-sage-dark)' : 'var(--color-charcoal)',
                                fontWeight: active ? 500 : 400, fontSize: 'var(--text-sm)',
                                textDecoration: 'none', transition: 'all var(--duration-normal) var(--ease-smooth)',
                            }}>
                                <span>{item.emoji}</span>
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-charcoal-6)', marginTop: 'auto' }}>
                    <div className="crisis-disclaimer" style={{ marginBottom: '12px' }}>
                        <span>⚠️</span>
                        <span>Not for emergencies. Call 112 if in crisis.</span>
                    </div>
                    <button
                        onClick={handleSignOut}
                        style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                    >
                        Sign out
                    </button>
                </div>
            </aside>

            <main className="main-content animate-fade-up">
                {children}
            </main>
        </div>
    )
}
