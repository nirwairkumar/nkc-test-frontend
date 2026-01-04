// src/lib/testsApi.ts
import { mockTests } from '@/data/mockTests';
import { MockTest } from '@/data/mockTests';
import { MockQuestion } from '@/data/mockQuestions';

// Re-export interfaces to match existing usage in components
export interface Test {
    id: string; // uuid
    title: string;
    description: string;
    questions: Question[]; // JSONB
    created_at: string;
    custom_id?: string;
    marks_per_question?: number;
    negative_marks?: number;
    duration?: number; // minutes
    revision_notes?: string;
    is_public?: boolean;
    creator_name?: string;
    creator_avatar?: string;
    created_by?: string;
    institution_name?: string;
    institution_logo?: string;
    settings?: TestSettings;
}

export interface TestSettings {
    attempt_limit?: number; // 1 for single attempt
    strict_timer?: boolean; // Server-side time validation
    tab_switch_mode?: 'warming' | 'strict' | 'off'; // Warning then submit, or instant submit
    disable_copy_paste?: boolean;
    disable_actions?: boolean; // Right click, etc
    force_fullscreen?: boolean;
    shuffle_questions?: boolean;
    show_results_immediate?: boolean;
    schedule?: {
        enabled: boolean;
        start_time?: string;
        end_time?: string;
    };
    start_form?: {
        enabled: boolean;
        fields: { label: string; required: boolean }[];
    };
}

export interface Question extends MockQuestion {
    // Extending MockQuestion to ensure compatibility, or re-defining if needed.
    // MockQuestion from data file has: id, type, question, options, correctAnswer, etc.
}

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const mapMockToTest = (mock: MockTest): Test => {
    // Explicit mapping if needed, currently they look compatible enough for the UI
    // specific fields might differ but for basic display it works.
    return mock as unknown as Test;
}

export async function createTest(testData: Partial<Test>) {
    await delay(500);
    const newTest: MockTest = {
        ...testData as any,
        id: `test-new-${Date.now()}`,
        questions: testData.questions || [],
        created_at: new Date().toISOString(),
        title: testData.title || 'Untitled Test',
        description: testData.description || '',
        duration: testData.duration || 60,
        marks_per_question: testData.marks_per_question || 4,
        negative_marks: testData.negative_marks || 0,
        created_by: 'user-123', // Mock current user
        is_public: !!testData.is_public
    };
    mockTests.unshift(newTest);
    return { data: mapMockToTest(newTest), error: null };
}

export async function updateTest(id: string, updates: Partial<Test>) {
    await delay(500);
    const index = mockTests.findIndex(t => t.id === id);
    if (index === -1) return { data: null, error: { message: 'Test not found' } };

    mockTests[index] = { ...mockTests[index], ...updates };
    return { data: mapMockToTest(mockTests[index]), error: null };
}

export async function fetchTests() {
    await delay(600);
    // Return all tests for now
    return { data: mockTests.map(mapMockToTest), error: null };
}

export async function getNextTestId(prefix: 'M' | 'YT'): Promise<string> {
    await delay(200);
    // Simple random ID for mock
    return `${prefix}-${Math.floor(Math.random() * 10000)}`;
}

export async function fetchTestById(id: string) {
    await delay(400);
    const test = mockTests.find(t => t.id === id);
    if (!test) {
        return { data: null, error: { message: 'Test not found' } };
    }
    return { data: mapMockToTest(test), error: null };
}

export async function fetchTestsByUserId(userId: string) {
    await delay(400);
    const tests = mockTests.filter(t => t.created_by === userId);
    return { data: tests.map(mapMockToTest), error: null };
}

export async function toggleTestLike(testId: string, userId: string) {
    await delay(300);
    // Mock toggle
    return { liked: true, error: null };
}

export async function getTestLikeCount(testId: string) {
    await delay(200);
    return { count: 15, error: null };
}

export async function getTestLikeStatus(testId: string, userId: string) {
    await delay(200);
    return { liked: false, error: null };
}
