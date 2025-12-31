export interface MockAttempt {
    id: string; // was attemptId
    test_id: string; // was testId
    user_id: string; // was userId
    score: number;
    answers: { [questionId: number]: string | string[] }; // questionId -> answer
    created_at: string; // was createdAt
    status: 'completed' | 'ongoing';
    time_taken: number; // seconds, was timeTaken
}

export const mockAttempts: MockAttempt[] = [
    {
        id: 'attempt-001',
        test_id: 'test-101',
        user_id: 'user-123',
        score: 15,
        answers: { 1: 'A', 2: '50' },
        created_at: '2025-01-20T09:00:00Z',
        status: 'completed',
        time_taken: 1200
    },
    {
        id: 'attempt-002',
        test_id: 'test-102',
        user_id: 'user-123',
        score: 4,
        answers: { 3: 'B', 4: ['A', 'C'] },
        created_at: '2025-01-22T14:30:00Z',
        status: 'completed',
        time_taken: 800
    },
    {
        id: 'attempt-003',
        test_id: 'test-107',
        user_id: 'user-123',
        score: 8,
        answers: { 14: 'A', 15: '1' },
        created_at: '2025-01-28T10:00:00Z',
        status: 'completed',
        time_taken: 1500
    }
];
