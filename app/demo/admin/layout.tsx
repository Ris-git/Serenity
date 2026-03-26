'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    return (
        <div className="app-shell">
            <aside className="sidebar">
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

                <div style={{
                    padding: '12px 24px', margin: '0 12px 16px',
                    background: 'var(--color-sage-5)', borderRadius: 'var(--radius-md)',
                }}>
                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>Signed in as</p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-charcoal)', fontWeight: 500, marginTop: '2px' }}>Admin</p>
                    <p style={{ fontSize: '11px', color: 'var(--color-soft-gray)', fontWeight: 300 }}>University Administration</p>
                </div>

                <nav style={{ flex: 1, padding: '0 12px' }}>
                    <Link href="/demo/admin" style={{
                        display: 'flex', alignItems: 'center', gap: '12px',
                        padding: '10px 12px', borderRadius: 'var(--radius-md)',
                        background: pathname === '/demo/admin' ? 'var(--color-sage-10)' : 'transparent',
                        border: pathname === '/demo/admin' ? '1px solid var(--color-sage-15)' : '1px solid transparent',
                        color: pathname === '/demo/admin' ? 'var(--color-sage-dark)' : 'var(--color-charcoal)',
                        fontWeight: pathname === '/demo/admin' ? 500 : 400,
                        fontSize: 'var(--text-sm)', textDecoration: 'none',
                    }}>
                        <span>📊</span><span>Dashboard</span>
                    </Link>
                </nav>

                <div style={{ padding: '16px 24px', borderTop: '1px solid var(--color-charcoal-6)', marginTop: 'auto' }}>
                    <div style={{
                        padding: '10px 12px',
                        background: 'rgba(201,197,224,0.1)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-soft-gray)',
                        lineHeight: 1.5,
                        marginBottom: '12px',
                    }}>
                        🔒 Admin view shows aggregated data only. No personal student data is accessible here.
                    </div>
                    <Link href="/auth/login" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)' }}>Sign out</Link>
                </div>
            </aside>
            <main className="main-content animate-fade-up">{children}</main>
        </div>
    )
}
