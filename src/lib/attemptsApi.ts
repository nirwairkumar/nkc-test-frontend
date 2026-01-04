// src/lib/attemptsApi.ts
import { mockAttempts, MockAttempt } from '../data/mockAttempts';
import { getMockUserByEmail } from '../data/mockUser';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function saveAttempt(user_id: string, test_id: string, answers: any, score?: number, metadata?: any) {
    await delay(800);
    const newAttempt: MockAttempt = {
        id: `attempt-${Date.now()}`,
        user_id,
        test_id,
        answers,
        score: score || 0,
        time_taken: metadata?.time_taken || 0,
        created_at: new Date().toISOString(),
        status: 'completed'
    };
    mockAttempts.push(newAttempt);
    return { data: newAttempt, error: null };
}

export async function fetchUserAttempts(user_id: string) {
    await delay(600);
    const attempts = mockAttempts.filter(a => a.user_id === user_id);
    return { data: attempts, error: null };
}

export async function checkUserTestAttempt(user_id: string, test_id: string) {
    await delay(300);
    // Check if exists in mock attempts
    const hasAttempted = mockAttempts.some(a => a.user_id === user_id && a.test_id === test_id);
    return { hasAttempted, error: null };
}

export async function registerTestStart(user_id: string, test_id: string) {
    await delay(200);
    // Mock registration success
    return { success: true, error: null };
}
