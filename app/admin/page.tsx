'use client'

import { mockAdminMetrics } from '@/lib/mock-data'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar,
} from 'recharts'

const metrics = mockAdminMetrics

function MetricCard({ label, value, unit, emoji, note }: {
    label: string; value: number; unit?: string; emoji: string; note?: string
}) {
    return (
        <div className="card">
            <span style={{ fontSize: '1.5rem', display: 'block', marginBottom: '12px' }}>{emoji}</span>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '2.25rem', fontWeight: 400, color: 'var(--color-charcoal-dark)', marginBottom: '4px' }}>
                {value}{unit}
            </p>
            <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-sm)', fontWeight: 300 }}>{label}</p>
            {note && <p style={{ fontSize: '11px', color: 'var(--color-sage-dark)', marginTop: '8px', fontWeight: 300 }}>{note}</p>}
        </div>
    )
}

export default function AdminDashboard() {
    return (
        <div style={{ maxWidth: '1000px' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 400, marginBottom: '8px' }}>
                    Platform overview 📊
                </h1>
                <p style={{ color: 'var(--color-soft-gray)', fontWeight: 300 }}>
                    Aggregated, anonymised data only. This view contains no personal student information.
                </p>
            </div>

            {/* Privacy banner */}
            <div style={{
                padding: '16px 20px',
                background: 'rgba(201,197,224,0.10)',
                border: '1px solid var(--color-lavender)',
                borderRadius: 'var(--radius-lg)',
                marginBottom: '32px',
                display: 'flex',
                gap: '12px',
                alignItems: 'flex-start',
            }}>
                <span style={{ fontSize: '1.25rem', flexShrink: 0 }}>🔒</span>
                <div>
                    <p style={{ fontWeight: 500, fontSize: 'var(--text-sm)', marginBottom: '4px', color: 'var(--color-charcoal)' }}>
                        Your mental health data is confidential and separate from your academic records.
                    </p>
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>
                        University administrators cannot access student conversations, therapy notes, reflections, or individual mental health data. This dashboard shows only aggregated platform metrics.
                    </p>
                </div>
            </div>

            {/* Metric cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '40px' }} className="stagger-children">
                <MetricCard label="Active students" value={metrics.totalActiveStudents} emoji="👥" />
                <MetricCard label="Session attendance rate" value={metrics.sessionAttendanceRate} unit="%" emoji="📅" note="↑ 3.2% from last month" />
                <MetricCard label="Reflections completed this week" value={metrics.weeklyReflectionsCompleted} emoji="✍️" />
                <MetricCard label="Platform engagement rate" value={metrics.platformEngagementRate} unit="%" emoji="📈" />
                <MetricCard label="Avg sessions per student" value={metrics.avgSessionsPerStudent} emoji="🗓️" />
                <MetricCard label="New students this month" value={metrics.newStudentsThisMonth} emoji="🌱" />
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {/* Engagement trend */}
                <div className="card">
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '24px', fontSize: '1.125rem' }}>
                        Engagement trend (10 weeks)
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={metrics.engagementTrend} margin={{ top: 0, right: 0, bottom: 0, left: -24 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(74,74,72,0.06)" />
                            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#8F8F8D', fontFamily: 'DM Sans' }} />
                            <YAxis tick={{ fontSize: 11, fill: '#8F8F8D', fontFamily: 'DM Sans' }} domain={[60, 90]} unit="%" />
                            <Tooltip
                                contentStyle={{
                                    background: '#FAF8F5', border: '1px solid rgba(139,157,131,0.15)',
                                    borderRadius: '8px', fontFamily: 'DM Sans', fontSize: '13px',
                                    color: '#4A4A48',
                                }}
                            />
                            <Line
                                type="monotone" dataKey="rate" stroke="#8B9D83" strokeWidth={2.5}
                                dot={{ fill: '#8B9D83', r: 3 }} activeDot={{ r: 5 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* Sessions per week */}
                <div className="card">
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '24px', fontSize: '1.125rem' }}>
                        Sessions completed (6 weeks)
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={metrics.sessionsByWeek} margin={{ top: 0, right: 0, bottom: 0, left: -24 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(74,74,72,0.06)" />
                            <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#8F8F8D', fontFamily: 'DM Sans' }} />
                            <YAxis tick={{ fontSize: 11, fill: '#8F8F8D', fontFamily: 'DM Sans' }} />
                            <Tooltip
                                contentStyle={{
                                    background: '#FAF8F5', border: '1px solid rgba(139,157,131,0.15)',
                                    borderRadius: '8px', fontFamily: 'DM Sans', fontSize: '13px',
                                    color: '#4A4A48',
                                }}
                            />
                            <Bar dataKey="count" fill="#A8B5A1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* System health */}
            <div className="card" style={{ marginTop: '24px' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '20px', fontSize: '1.125rem' }}>
                    System health
                </h3>
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    {[
                        { label: 'API uptime', value: '99.98%', status: 'improving' as const },
                        { label: 'Auth service', value: 'Operational', status: 'improving' as const },
                        { label: 'Message delivery', value: 'Normal', status: 'stable' as const },
                        { label: 'Storage', value: '34% used', status: 'stable' as const },
                    ].map(item => (
                        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span className={`status-tag status-${item.status}`}>{item.value}</span>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
