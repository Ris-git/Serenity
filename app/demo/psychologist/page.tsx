'use client'

import Link from 'next/link'
import { useState } from 'react'
import { mockStudents } from '@/lib/mock-data'

type Status = 'improving' | 'stable' | 'needs-care'

const statusLabel: Record<Status, string> = {
    'improving': 'Improving',
    'stable': 'Stable',
    'needs-care': 'Needs care',
}

const statusClass: Record<Status, string> = {
    'improving': 'status-improving',
    'stable': 'status-stable',
    'needs-care': 'status-care',
}

export default function PsychologistDashboard() {
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<'all' | Status>('all')

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

    const filtered = mockStudents.filter(s => {
        const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase())
        const matchesFilter = filter === 'all' || s.status === filter
        return matchesSearch && matchesFilter
    })

    const needsCare = mockStudents.filter(s => s.status === 'needs-care').length
    const upcomingToday = mockStudents.filter(s => s.nextSession === '2026-03-13').length

    return (
        <div style={{ maxWidth: '960px' }}>
            {/* Header */}
            <div style={{ marginBottom: '40px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, marginBottom: '6px' }}>
                    Good morning, Dr. Williams.
                </h1>
                <p style={{ color: 'var(--color-soft-gray)', fontWeight: 300 }}>{today}</p>
            </div>

            {/* Summary cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }} className="stagger-children">
                {[
                    { label: 'Assigned students', value: mockStudents.length, emoji: '👤', status: null },
                    { label: 'Sessions today', value: upcomingToday || 1, emoji: '📅', status: null },
                    { label: 'Needs attention', value: needsCare, emoji: '💙', status: 'care' },
                ].map((item, i) => (
                    <div key={i} className="card animate-fade-up" style={{
                        background: item.status === 'care' ? 'rgba(184,180,208,0.08)' : 'var(--color-cream)',
                        border: item.status === 'care' ? '1px solid var(--color-lavender)' : '1px solid var(--color-sage-15)',
                    }}>
                        <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '8px' }}>{item.emoji}</span>
                        <p style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '4px' }}>{item.value}</p>
                        <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-sm)', fontWeight: 300 }}>{item.label}</p>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <input
                    className="input"
                    placeholder="Search students…"
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ flex: 1, minWidth: '200px', maxWidth: '300px' }}
                />
                <div style={{ display: 'flex', gap: '8px' }}>
                    {(['all', 'improving', 'stable', 'needs-care'] as const).map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={filter === f ? 'btn btn-primary btn-sm' : 'btn btn-secondary btn-sm'}
                            style={{ textTransform: 'capitalize', fontSize: 'var(--text-xs)' }}
                        >
                            {f === 'all' ? 'All' : f === 'needs-care' ? 'Needs care' : f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Student cards */}
            <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {filtered.map(student => (
                    <Link
                        key={student.id}
                        href={`/psychologist/students/${student.id}`}
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="card animate-fade-up" style={{ cursor: 'pointer' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                {/* Avatar */}
                                <div style={{
                                    width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                                    background: `linear-gradient(135deg, var(--color-sage-light), var(--color-clay))`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '1.1rem', fontFamily: 'var(--font-display)', color: 'white', fontWeight: 400,
                                }}>
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                </div>

                                {/* Info */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                                        <p style={{ fontWeight: 500 }}>{student.name}</p>
                                        <span className={`status-tag ${statusClass[student.status]}`}>
                                            {statusLabel[student.status]}
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-sm)', fontWeight: 300 }}>
                                        {student.email}
                                    </p>
                                </div>

                                {/* Meta */}
                                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>Last check-in</p>
                                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 400, marginTop: '2px' }}>
                                        {new Date(student.lastCheckIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>
                                    <p style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', marginTop: '8px', fontWeight: 300 }}>Next session</p>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-sage-dark)', fontWeight: 500, marginTop: '2px' }}>
                                        {new Date(student.nextSession).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                    </p>
                                </div>

                                <span style={{ color: 'var(--color-soft-gray)', marginLeft: '8px' }}>→</span>
                            </div>
                        </div>
                    </Link>
                ))}
                {filtered.length === 0 && (
                    <p style={{ textAlign: 'center', color: 'var(--color-soft-gray)', padding: '40px', fontWeight: 300 }}>
                        No students match your search.
                    </p>
                )}
            </div>
        </div>
    )
}
