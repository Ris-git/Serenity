// Mock data for demo/prototype — replace with Supabase queries in production

export const mockStudents = [
    {
        id: '1',
        name: 'Aria Chen',
        email: 'aria.chen@university.edu',
        avatar: null,
        status: 'improving' as const,
        lastCheckIn: '2026-03-12',
        nextSession: '2026-03-15',
        streak: 8,
        assignedPsychologist: 'Dr. Sarah Williams',
        joinedAt: '2026-01-15',
    },
    {
        id: '2',
        name: 'James Okafor',
        email: 'james.okafor@university.edu',
        avatar: null,
        status: 'stable' as const,
        lastCheckIn: '2026-03-11',
        nextSession: '2026-03-16',
        streak: 3,
        assignedPsychologist: 'Dr. Sarah Williams',
        joinedAt: '2026-01-20',
    },
    {
        id: '3',
        name: 'Maya Patel',
        email: 'maya.patel@university.edu',
        avatar: null,
        status: 'needs-care' as const,
        lastCheckIn: '2026-03-08',
        nextSession: '2026-03-13',
        streak: 1,
        assignedPsychologist: 'Dr. Sarah Williams',
        joinedAt: '2026-02-01',
    },
    {
        id: '4',
        name: 'Liam Torres',
        email: 'liam.torres@university.edu',
        avatar: null,
        status: 'stable' as const,
        lastCheckIn: '2026-03-12',
        nextSession: '2026-03-18',
        streak: 5,
        assignedPsychologist: 'Dr. Sarah Williams',
        joinedAt: '2026-01-10',
    },
    {
        id: '5',
        name: 'Sofia Nakamura',
        email: 'sofia.nakamura@university.edu',
        avatar: null,
        status: 'improving' as const,
        lastCheckIn: '2026-03-12',
        nextSession: '2026-03-17',
        streak: 12,
        assignedPsychologist: 'Dr. Sarah Williams',
        joinedAt: '2025-12-01',
    },
]

export const mockCurrentStudent = {
    id: 'me',
    name: 'Priya Sharma',
    email: 'priya.sharma@university.edu',
    role: 'student' as const,
    assignedPsychologist: {
        name: 'Dr. Sarah Williams',
        title: 'Clinical Psychologist',
        photoUrl: null,
        nextAvailable: '2026-03-15',
    },
    nextSession: {
        date: 'Thursday, March 15',
        time: '2:00 PM',
        duration: '50 min',
        type: 'Monthly check-in',
    },
}

export const mockReflectionQuestions = [
    {
        id: 'q1',
        question: 'How have you been feeling overall this week?',
        hint: 'There are no right or wrong answers here.',
    },
    {
        id: 'q2',
        question: 'Was there a moment this week that felt particularly heavy?',
        hint: 'You can share as much or as little as you\'d like.',
    },
    {
        id: 'q3',
        question: 'What\'s one small thing that brought you peace or joy?',
        hint: 'Even the tiniest things count.',
    },
    {
        id: 'q4',
        question: 'Is there anything you\'d like your psychologist to know before your next session?',
        hint: 'This goes directly to your care team.',
    },
]

export const mockMessages = [
    {
        id: 'm1',
        from: 'psychologist',
        senderName: 'Dr. Sarah Williams',
        text: 'Hi Priya, just checking in after our last session. How are you feeling about the breathing exercises we discussed?',
        timestamp: '2026-03-10T10:30:00',
        read: true,
    },
    {
        id: 'm2',
        from: 'student',
        senderName: 'Priya Sharma',
        text: "I've been trying them before bed and they actually really help! I feel a bit more settled when I do them consistently.",
        timestamp: '2026-03-10T14:15:00',
        read: true,
    },
    {
        id: 'm3',
        from: 'psychologist',
        senderName: 'Dr. Sarah Williams',
        text: "That's wonderful to hear. Consistency is key and you're already building a great habit. See you Thursday! 🌿",
        timestamp: '2026-03-11T09:00:00',
        read: true,
    },
]

export const mockGoals = [
    {
        id: 'g1',
        title: 'Practice mindful breathing daily',
        description: '5 minutes before sleep',
        progress: 65,
        isPrivate: true,
        createdAt: '2026-02-01',
        category: 'wellbeing',
    },
    {
        id: 'g2',
        title: 'Reach out to one friend each week',
        description: 'Stay connected with people who matter',
        progress: 80,
        isPrivate: false,
        createdAt: '2026-02-15',
        category: 'social',
    },
    {
        id: 'g3',
        title: 'Take a 20-minute walk outdoors, 3×/week',
        description: 'Movement and fresh air',
        progress: 40,
        isPrivate: false,
        createdAt: '2026-03-01',
        category: 'physical',
    },
]

export const mockAdminMetrics = {
    totalActiveStudents: 247,
    sessionAttendanceRate: 87.4,
    weeklyReflectionsCompleted: 189,
    platformEngagementRate: 74.2,
    avgSessionsPerStudent: 2.1,
    newStudentsThisMonth: 23,
    engagementTrend: [
        { week: 'W1 Jan', rate: 68 },
        { week: 'W2 Jan', rate: 71 },
        { week: 'W3 Jan', rate: 69 },
        { week: 'W4 Jan', rate: 75 },
        { week: 'W1 Feb', rate: 73 },
        { week: 'W2 Feb', rate: 78 },
        { week: 'W3 Feb', rate: 76 },
        { week: 'W4 Feb', rate: 80 },
        { week: 'W1 Mar', rate: 74 },
        { week: 'W2 Mar', rate: 82 },
    ],
    sessionsByWeek: [
        { week: 'W1', count: 42 },
        { week: 'W2', count: 48 },
        { week: 'W3', count: 45 },
        { week: 'W4', count: 52 },
        { week: 'W5', count: 49 },
        { week: 'W6', count: 55 },
    ],
}
