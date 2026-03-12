import Link from 'next/link'

export default function HomePage() {
    return (
        <main style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            background: 'var(--color-cream)',
            position: 'relative',
            overflow: 'hidden',
        }}>
            {/* Decorative blobs */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                right: '-5%',
                width: '500px',
                height: '500px',
                borderRadius: '50% 40% 60% 30%',
                background: 'radial-gradient(circle, rgba(139,157,131,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />
            <div style={{
                position: 'absolute',
                bottom: '-10%',
                left: '-5%',
                width: '400px',
                height: '400px',
                borderRadius: '40% 60% 30% 50%',
                background: 'radial-gradient(circle, rgba(201,197,224,0.1) 0%, transparent 70%)',
                pointerEvents: 'none',
            }} />

            <div className="animate-fade-up" style={{ textAlign: 'center', maxWidth: '600px', position: 'relative', zIndex: 1 }}>
                {/* Logo mark */}
                <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, var(--color-sage-light), var(--color-sage-dark))',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.75rem',
                    marginBottom: '32px',
                    boxShadow: '0 4px 16px rgba(139,157,131,0.3)',
                }}>
                    🌿
                </div>

                <h1 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(2rem, 5vw, 3rem)',
                    fontWeight: 400,
                    color: 'var(--color-charcoal-dark)',
                    marginBottom: '16px',
                    lineHeight: 1.2,
                    letterSpacing: '-0.02em',
                }}>
                    You deserve support.<br />
                    <em style={{ fontStyle: 'italic', color: 'var(--color-sage-dark)' }}>Serenity</em> is here.
                </h1>

                <p style={{
                    fontSize: '1.0625rem',
                    color: 'var(--color-soft-gray)',
                    lineHeight: 1.7,
                    marginBottom: '40px',
                    fontWeight: 300,
                }}>
                    A confidential space for university students to tend to their mental health —
                    with guidance from trained professionals, at your own pace.
                </p>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/auth/login" className="btn btn-primary btn-lg">
                        Sign in
                    </Link>
                    <Link href="/auth/register" className="btn btn-secondary btn-lg">
                        Create account
                    </Link>
                </div>

                <p style={{
                    marginTop: '32px',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-soft-gray-40)',
                    fontStyle: 'italic',
                }}>
                    Your mental health data is confidential and completely separate from your academic records.
                </p>
            </div>

            {/* Trust badges */}
            <div className="animate-fade-up" style={{
                marginTop: '80px',
                display: 'flex',
                gap: '40px',
                flexWrap: 'wrap',
                justifyContent: 'center',
                opacity: 0.6,
                animationDelay: '200ms',
            }}>
                {[
                    { icon: '🔒', label: 'Private & confidential' },
                    { icon: '🎓', label: 'University-integrated' },
                    { icon: '💬', label: 'Professional guidance' },
                ].map(item => (
                    <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.1rem' }}>{item.icon}</span>
                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </main>
    )
}
