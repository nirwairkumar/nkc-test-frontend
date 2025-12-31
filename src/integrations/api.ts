import { mockUser, mockUsers } from '../data/mockUser';
import { mockTests, MockTest } from '../data/mockTests';
import { mockAttempts, MockAttempt } from '../data/mockAttempts';
// import { mockResults } from '../data/mockResults';
import { MockQuestion } from '../data/mockQuestions';
export type Question = MockQuestion;

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// --- Auth API ---
// Import helper
import { getMockUserByEmail } from '../data/mockUser';

export const getCurrentUser = async () => {
    await delay(500);
    // Return the mock student user by default
    return { data: mockUser, error: null };
};

export const getSession = async () => {
    await delay(300);
    return {
        data: {
            session: {
                access_token: 'mock-token',
                refresh_token: 'mock-refresh',
                expires_in: 3600,
                token_type: 'bearer',
                user: mockUser
            }
        },
        error: null
    };
};

export const signIn = async (email: string, _password: string) => {
    await delay(500);
    const user = getMockUserByEmail(email) || mockUser; // Fallback to default if not found

    return {
        data: {
            user: { ...user, email }, // Ensure email matches input
            session: {
                access_token: 'mock-token',
                refresh_token: 'mock-refresh',
                expires_in: 3600,
                token_type: 'bearer',
                user: { ...user, email }
            }
        },
        error: null
    };
};

export const signUp = async (email: string, _password: string, metadata?: any) => {
    await delay(1000);
    return {
        data: {
            user: { ...mockUser, email, user_metadata: { ...mockUser.user_metadata, ...metadata } },
            session: {
                access_token: 'mock-token',
                refresh_token: 'mock-refresh',
                expires_in: 3600,
                token_type: 'bearer',
                user: { ...mockUser, email, user_metadata: { ...mockUser.user_metadata, ...metadata } }
            }
        },
        error: null
    };
};

export const signOut = async () => {
    await delay(200);
    return { error: null };
};

// --- Test API ---
export const fetchTests = async () => {
    await delay(800);
    return { data: mockTests, error: null };
};

export const fetchTestById = async (testId: string) => {
    await delay(600);
    const test = mockTests.find(t => t.id === testId);
    if (!test) {
        return { data: null, error: { message: 'Test not found' } };
    }
    return { data: test, error: null };
};

export const fetchQuestionsByTestId = async (testId: string) => {
    await delay(500);
    const test = mockTests.find(t => t.id === testId);
    if (!test) {
        return { data: [], error: { message: 'Test not found' } };
    }
    return { data: test.questions, error: null };
}

export const createTest = async (testData: Partial<MockTest>) => {
    await delay(1000);
    const newTest: MockTest = {
        ...testData,
        id: `test-new-${Date.now()}`,
        questions: testData.questions || [],
        created_at: new Date().toISOString(),
        title: testData.title || 'Untitled Test',
        description: testData.description || '',
        duration: testData.duration || 60,
        // totalQuestions property removed from interface, handled by questions.length in UI or added if needed
        marks_per_question: testData.marks_per_question || 4,
        negative_marks: testData.negative_marks || 0,
        created_by: mockUser.id,
        is_public: !!testData.is_public
    };
    mockTests.unshift(newTest);
    return { data: newTest, error: null };
}


// --- Attempts & Results API ---
export const submitTestAttempt = async (attempt: Partial<MockAttempt>) => {
    await delay(1500); // Simulate processing
    const newAttempt: MockAttempt = {
        ...attempt,
        id: `attempt-${Date.now()}`,
        user_id: mockUser.id,
        created_at: new Date().toISOString(),
        status: 'completed',
        test_id: attempt.test_id!,
        score: attempt.score || 0,
        answers: attempt.answers || {},
        time_taken: attempt.time_taken || 0
    };
    mockAttempts.push(newAttempt);
    return { data: newAttempt, error: null };
};

export const saveAttempt = async (userId: string, testId: string, answers: any, score: number, metadata?: any) => {
    return submitTestAttempt({
        user_id: userId,
        test_id: testId,
        answers,
        score,
        time_taken: metadata?.timeTaken || 0
    });
}

export const fetchUserAttempts = async (userId: string) => {
    await delay(600);
    const attempts = mockAttempts.filter(a => a.user_id === userId);
    return { data: attempts, error: null };
};

export const fetchTestAttempts = async (testId: string) => {
    await delay(600);
    const attempts = mockAttempts.filter(a => a.test_id === testId);
    return { data: attempts, error: null };
}

export const deleteAttempt = async (attemptId: string) => {
    await delay(500);
    const index = mockAttempts.findIndex(a => a.id === attemptId);
    if (index !== -1) mockAttempts.splice(index, 1);
    return { error: null };
}

// Mocking other specific calls found in codebase
export const getNextTestId = async (prefix: 'M' | 'YT') => {
    await delay(200);
    return `${prefix}-${Math.floor(Math.random() * 1000) + 200}`;
}

export const toggleTestLike = async (_testId: string, _userId: string) => {
    await delay(300);
    return { liked: true, error: null };
}

export const getTestLikeStatus = async (_testId: string, _userId: string) => {
    await delay(200);
    return { liked: false, error: null };
}

export const getTestLikeCount = async (_testId: string) => {
    await delay(200);
    return { count: 12, error: null }; // Mock count
}

// Duplicate import removed
export interface Section {
    id: string;
    name: string;
}

// --- User Profile API ---
export const fetchUserProfile = async (userId: string) => {
    // Mock profile data
    const profile = mockUsers.find(u => u.id === userId);
    if (!profile && userId === mockUser.id) {
        // Fallback to the single logged in mock user if not found in list (if we only have one)
        return {
            data: {
                id: mockUser.id,
                full_name: mockUser.user_metadata.full_name,
                avatar_url: mockUser.user_metadata.avatar_url,
                bio: mockUser.user_metadata.bio || "This is a mock bio for the creator.",
                designation: mockUser.user_metadata.designation,
                social_links: { twitter: "#", linkedin: "#" }
            },
            error: null
        };
    }
    if (profile) {
        return {
            data: {
                id: profile.id,
                full_name: profile.user_metadata.full_name,
                avatar_url: profile.user_metadata.avatar_url,
                bio: profile.user_metadata.bio || "This is a mock bio for the creator.",
                designation: profile.user_metadata.designation,
                social_links: { twitter: "#", linkedin: "#" }
            },
            error: null
        };
    }
    return { data: null, error: { message: "User not found" } };
};

export const fetchTestsByUserId = async (userId: string) => {
    await delay(500);
    // Return all tests created by this user
    const tests = mockTests.filter(t => t.created_by === userId);
    return { data: tests, error: null };
};

export const uploadAvatar = async (file: File) => {
    await delay(1000);
    return { data: { path: `avatars/${file.name}` }, error: null };
}

export const getPublicUrl = (path: string) => {
    // Return a dummy public url
    return { data: { publicUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${path}` } };
}

export const updateUser = async (updates: any) => {
    await delay(500);
    // Mock update current user
    if (updates.data) {
        Object.assign(mockUser.user_metadata, updates.data);
    }
    return { data: { user: mockUser }, error: null };
}

// --- Sections API ---
export const fetchSections = async () => {
    await delay(400);
    return {
        data: [
            { id: 'sec-1', name: 'Physics' },
            { id: 'sec-2', name: 'Chemistry' },
            { id: 'sec-3', name: 'Math' },
            { id: 'sec-4', name: 'GK' },
            { id: 'sec-5', name: 'JEE Main' },
        ],
        error: null
    };
};

export const fetchTestSections = async () => {
    await delay(400);
    return {
        data: [
            { test_id: 'test-101', section_id: 'sec-1' },
            { test_id: 'test-101', section_id: 'sec-5' },
            { test_id: 'test-102', section_id: 'sec-4' },
        ],
        error: null
    };
};

export const assignSectionsToTest = async (_testId: string, _sectionIds: string[]) => {
    await delay(500);
    return { error: null };
}

export const updateTest = async (id: string, updates: Partial<MockTest>) => {
    await delay(800);
    const index = mockTests.findIndex(t => t.id === id);
    if (index === -1) return { data: null, error: { message: 'Test not found' } };

    mockTests[index] = { ...mockTests[index], ...updates };
    return { data: mockTests[index], error: null };
}

// --- Attempts API (Save) ---
// --- Section Management API ---
export const createSection = async (name: string) => {
    await delay(300);
    return { data: { id: `sec-${Date.now()}`, name }, error: null };
};

export const updateSection = async (id: string, name: string) => {
    await delay(300);
    return { data: { id, name }, error: null };
};

export const deleteSection = async (id: string) => {
    await delay(300);
    return { error: null };
};

export const deleteTest = async (testId: string) => {
    await delay(500);
    const index = mockTests.findIndex(t => t.id === testId);
    if (index !== -1) {
        mockTests.splice(index, 1);
    }
    return { error: null };
};

