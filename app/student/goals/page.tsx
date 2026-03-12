'use client'

import { useState } from 'react'
import { mockGoals } from '@/lib/mock-data'

type Goal = typeof mockGoals[0]

const categoryEmoji: Record<string, string> = {
    wellbeing: '🧘',
    social: '💛',
    physical: '🌿',
    academic: '📚',
    creative: '🎨',
}

export default function GoalsPage() {
    const [goals, setGoals] = useState(mockGoals)
    const [showForm, setShowForm] = useState(false)
    const [newGoal, setNewGoal] = useState({ title: '', description: '', category: 'wellbeing', isPrivate: true })

    const addGoal = () => {
        if (!newGoal.title.trim()) return
        setGoals([...goals, {
            id: `g${Date.now()}`,
            ...newGoal,
            progress: 0,
            createdAt: new Date().toISOString().split('T')[0],
        }])
        setNewGoal({ title: '', description: '', category: 'wellbeing', isPrivate: true })
        setShowForm(false)
    }

    return (
        <div style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                <div>
                    <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', fontWeight: 400, marginBottom: '8px' }}>
                        Your goals 🌱
                    </h1>
                    <p style={{ color: 'var(--color-soft-gray)', fontWeight: 300 }}>
                        These belong to you. Private by default — share only what you choose.
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : '+ Add goal'}
                </button>
            </div>

            {/* New goal form */}
            {showForm && (
                <div className="card animate-scale-in" style={{ marginBottom: '24px', border: '1.5px solid var(--color-sage-15)' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 400, marginBottom: '20px' }}>
                        What would you like to work towards?
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label className="label">Goal</label>
                            <input className="input" type="text" placeholder="e.g. Practice mindful breathing daily"
                                value={newGoal.title} onChange={e => setNewGoal({ ...newGoal, title: e.target.value })} />
                        </div>
                        <div>
                            <label className="label">A little more detail (optional)</label>
                            <input className="input" type="text" placeholder="Any notes for yourself…"
                                value={newGoal.description} onChange={e => setNewGoal({ ...newGoal, description: e.target.value })} />
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <div style={{ flex: 1 }}>
                                <label className="label">Category</label>
                                <select className="input" value={newGoal.category} onChange={e => setNewGoal({ ...newGoal, category: e.target.value })} style={{ cursor: 'pointer' }}>
                                    <option value="wellbeing">🧘 Wellbeing</option>
                                    <option value="social">💛 Social</option>
                                    <option value="physical">🌿 Physical</option>
                                    <option value="academic">📚 Academic</option>
                                    <option value="creative">🎨 Creative</option>
                                </select>
                            </div>
                            <div>
                                <label className="label">Visibility</label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', paddingTop: '12px' }}>
                                    <input type="checkbox" checked={newGoal.isPrivate}
                                        onChange={e => setNewGoal({ ...newGoal, isPrivate: e.target.checked })}
                                        style={{ accentColor: 'var(--color-sage)' }}
                                    />
                                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 300 }}>Keep private</span>
                                </label>
                            </div>
                        </div>
                        <button className="btn btn-primary" onClick={addGoal} style={{ alignSelf: 'flex-start' }}>
                            Save goal 🌱
                        </button>
                    </div>
                </div>
            )}

            {/* Goals list */}
            <div className="stagger-children" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {goals.map(goal => (
                    <div key={goal.id} className="card animate-fade-up">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <span style={{
                                    fontSize: '1.25rem',
                                    width: '40px', height: '40px',
                                    borderRadius: '10px',
                                    background: 'var(--color-sage-5)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    flexShrink: 0,
                                }}>
                                    {categoryEmoji[goal.category] || '🎯'}
                                </span>
                                <div>
                                    <p style={{ fontWeight: 500, marginBottom: '4px' }}>{goal.title}</p>
                                    {goal.description && (
                                        <p style={{ color: 'var(--color-soft-gray)', fontSize: 'var(--text-sm)', fontWeight: 300 }}>
                                            {goal.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                                {goal.isPrivate && (
                                    <span className="status-tag" style={{ background: 'var(--color-charcoal-6)', color: 'var(--color-soft-gray)' }}>
                                        🔒 Private
                                    </span>
                                )}
                                {goal.progress >= 80 && (
                                    <span className="status-tag status-improving">✨ Almost there</span>
                                )}
                            </div>
                        </div>
                        <div style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-soft-gray)', fontWeight: 300 }}>Progress</span>
                                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-sage-dark)' }}>{goal.progress}%</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: `${goal.progress}%` }} />
                            </div>
                        </div>
                        <p style={{ fontSize: '11px', color: 'var(--color-soft-gray)', fontWeight: 300 }}>
                            Started {new Date(goal.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                        </p>
                    </div>
                ))}
            </div>

            {goals.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 24px', color: 'var(--color-soft-gray)' }}>
                    <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '16px' }}>🌱</span>
                    <p style={{ fontWeight: 300 }}>No goals yet. Add your first one when you&apos;re ready.</p>
                </div>
            )}
        </div>
    )
}
