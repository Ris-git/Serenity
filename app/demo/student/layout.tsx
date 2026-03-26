'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
    { href: '/demo/student', label: 'Home', emoji: '🏠' },
    { href: '/demo/student/reflection', label: 'Reflection', emoji: '✍️' },
    { href: '/demo/student/sessions', label: 'Sessions', emoji: '📅' },
    { href: '/demo/student/messages', label: 'Messages', emoji: '💬' },
    { href: '/demo/student/goals', label: 'My goals', emoji: '🌱' },
]

export default function StudentLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)

    return (
        <div className="app-shell">
            {/* Sidebar */}
            <aside className={`sidebar${mobileOpen ? ' open' : ''}`}>
                {/* Logo */}
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

                {/* Welcome */}
                <div style={{
                    padding: '12px 24px',
                    margin: '0 12px 16px',
                    background: 'var(--color-sage-5)',
                    borderRadius: 'var(--radius-md)',
                }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>Signed in as</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)', fontWeight: 500, marginTop: '2px' }}>Priya Sharma</p>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, padding: '0 12px' }}>
                    {navItems.map(item => {
                        const active = pathname === item.href
                        return (
                            <Link key={item.href} href={item.href} style={{
                                display: 'flex', alignItems: 'center', gap: '12px',
                                padding: '10px 12px',
                                borderRadius: 'var(--radius-md)',
                                marginBottom: '4px',
                                background: active ? 'var(--color-sage-10)' : 'transparent',
                                border: active ? '1px solid var(--color-sage-15)' : '1px solid transparent',
                                color: active ? 'var(--color-sage-dark)' : 'var(--color-charcoal)',
                                fontWeight: active ? 500 : 400,
                                fontSize: 'var(--text-sm)',
                                textDecoration: 'none',
                                transition: 'all var(--duration-normal) var(--ease-smooth)',
                            }}>
                                <span>{item.emoji}</span>
                                <span>{item.label}</span>
                            </Link>
                        )
                    })}
                </nav>

                {/* Bottom */}
                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-charcoal-6)', marginTop: 'auto' }}>
                    <div className="crisis-disclaimer" style={{ marginBottom: '12px' }}>
                        <span>⚠️</span>
                        <span>Not for emergencies. Call 112 if in crisis.</span>
                    </div>
                    <Link href="/auth/login" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)' }}>Sign out</Link>
                </div>
            </aside>

            {/* Main */}
            <main className="main-content animate-fade-up">
                {children}
            </main>
        </div>
    )
}
