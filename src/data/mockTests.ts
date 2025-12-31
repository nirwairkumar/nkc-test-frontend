import { MockQuestion, mockQuestions } from './mockQuestions';

export interface MockTest {
    id: string;
    title: string;
    description: string;
    duration: number; // minutes
    questions: MockQuestion[];
    created_at: string;

    // Snake case for compatibility
    marks_per_question: number;
    negative_marks: number;
    created_by: string;
    is_public: boolean;
    custom_id?: string;

    // UI/Logic specific
    sections?: string[];
    settings?: any;

    // Added for UI
    creator_name?: string;
    creator_avatar?: string;
    test_likes?: { count: number }[];
    institution_name?: string;
    institution_logo?: string;
}

export const mockTests: MockTest[] = [
    {
        id: 'test-101',
        custom_id: 'M-101',
        title: 'Physics Mechanics: Laws of Motion',
        description: 'A comprehensive test covering Newton\'s laws of motion and friction. Suitable for JEE Main aspirants.',
        duration: 60,
        marks_per_question: 4,
        negative_marks: 1,
        created_by: 'teacher-456',
        is_public: true,
        sections: ['Physics', 'Mechanics', 'JEE Main'],
        questions: mockQuestions.filter(q => q.testId === 'test-101'),
        created_at: '2025-01-10T10:00:00Z',
        settings: { attempt_limit: 1, strict_timer: true },
        creator_name: 'Amit Sharma',
        creator_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
        test_likes: [{ count: 142 }],
        institution_name: 'Allen Institute',
    },
    {
        id: 'test-102',
        custom_id: 'YT-102',
        title: 'Solar System General Knowledge',
        description: 'Test your knowledge about our solar system. Fun quiz for everyone!',
        duration: 30,
        marks_per_question: 2,
        negative_marks: 0,
        created_by: 'admin-001',
        is_public: true,
        sections: ['GK', 'Science'],
        questions: mockQuestions.filter(q => q.testId === 'test-102'),
        created_at: '2025-01-15T14:30:00Z',
        creator_name: 'Yuga Yatra Admin',
        creator_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        test_likes: [{ count: 85 }]
    },
    {
        id: 'test-103',
        custom_id: 'JEE-ADV-25',
        title: 'JEE Advanced: Full Physics Mock',
        description: 'High-difficulty simulation for JEE Advanced Physics. Covers Electrostatics, Magnetism, and Optics.',
        duration: 180,
        marks_per_question: 3,
        negative_marks: 1,
        created_by: 'teacher-456',
        is_public: true,
        sections: ['Physics', 'JEE Advanced', 'Electrostatics'],
        questions: mockQuestions.filter(q => q.testId === 'test-103'),
        created_at: '2025-01-18T09:00:00Z',
        settings: { attempt_limit: 1 },
        creator_name: 'Amit Sharma',
        creator_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
        test_likes: [{ count: 320 }],
        institution_name: 'Allen Institute',
    },
    {
        id: 'test-104',
        custom_id: 'NEET-BIO-01',
        title: 'NEET Biology: Human Physiology',
        description: 'Detailed test on Human Digestion, Respiration, and Circulation systems.',
        duration: 45,
        marks_per_question: 4,
        negative_marks: 1,
        created_by: 'teacher-456',
        is_public: true,
        sections: ['Biology', 'NEET', 'Medical'],
        questions: mockQuestions.filter(q => q.testId === 'test-104'),
        created_at: '2025-01-20T11:00:00Z',
        creator_name: 'Dr. Neha Gupta',
        creator_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Neha',
        test_likes: [{ count: 210 }]
    },
    {
        id: 'test-105',
        custom_id: 'CS-DSA-101',
        title: 'Data Structures & Algorithms: Linear DS',
        description: 'Test your understanding of Arrays, Linked Lists, Stacks, and Queues.',
        duration: 90,
        marks_per_question: 2,
        negative_marks: 0,
        created_by: 'admin-001',
        is_public: true,
        sections: ['CS', 'Programming', 'Coding'],
        questions: mockQuestions.filter(q => q.testId === 'test-105'),
        created_at: '2025-01-22T15:00:00Z',
        creator_name: 'Yuga Yatra Tech',
        creator_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tech',
        test_likes: [{ count: 567 }]
    },
    {
        id: 'test-106',
        custom_id: 'HIST-WW2',
        title: 'History: World War II',
        description: 'Review the major events, dates, and figures of the Second World War.',
        duration: 40,
        marks_per_question: 1,
        negative_marks: 0,
        created_by: 'guest-999',
        is_public: true,
        sections: ['History', 'Humanities', 'General Awareness'],
        questions: mockQuestions.filter(q => q.testId === 'test-106'),
        created_at: '2025-01-25T10:00:00Z',
        creator_name: 'History Buff',
        creator_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=History',
        test_likes: [{ count: 45 }]
    },
    {
        id: 'test-107',
        custom_id: 'MATH-CALC',
        title: 'Calculus: Limits & Derivatives',
        description: 'Fundamental concepts of Calculus. Essential for Class 11 and 12 students.',
        duration: 75,
        marks_per_question: 4,
        negative_marks: 1,
        created_by: 'teacher-456',
        is_public: true,
        sections: ['Math', 'Calculus', 'Board Exams'],
        questions: mockQuestions.filter(q => q.testId === 'test-107'),
        created_at: '2025-01-28T09:30:00Z',
        creator_name: 'Amit Sharma',
        creator_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
        test_likes: [{ count: 89 }]
    },
    {
        id: 'test-108',
        custom_id: 'CURR-AFF-JAN',
        title: 'Current Affairs: January 2025',
        description: 'Stay updated with the latest national and international news.',
        duration: 20,
        marks_per_question: 1,
        negative_marks: 0.25,
        created_by: 'admin-001',
        is_public: true,
        sections: ['GK', 'Current Affairs', 'Banking'],
        questions: mockQuestions.filter(q => q.testId === 'test-108'),
        created_at: '2025-02-01T08:00:00Z',
        creator_name: 'Yuga Yatra News',
        creator_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=News',
        test_likes: [{ count: 1200 }]
    },
    {
        id: 'test-109',
        custom_id: 'STUDENT-GEN-01',
        title: 'My Custom Practice Test',
        description: 'A test generated by the student for self-practice.',
        duration: 45,
        marks_per_question: 4,
        negative_marks: 1,
        created_by: 'user-123', // Matches mockStudent.id
        is_public: false,
        sections: ['Physics', 'Self Practice'],
        questions: mockQuestions.filter(q => q.testId === 'test-101'), // Reuse questions for now
        created_at: '2025-02-05T10:00:00Z',
        creator_name: 'Rahul Kumar',
        creator_avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
        test_likes: []
    }
];
