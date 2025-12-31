export interface MockResult {
    testId: string;
    userId: string;
    totalMarks: number;
    score: number;
    correctCount: number;
    wrongCount: number;
    skippedCount: number;
    percentage: number;
    attemptId: string;
}

export const mockResults: MockResult[] = [
    {
        testId: 'test-101',
        userId: 'user-123',
        attemptId: 'attempt-001',
        totalMarks: 80,
        score: 15,
        correctCount: 4,
        wrongCount: 1,
        skippedCount: 15,
        percentage: 18.75
    }
];
