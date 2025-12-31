export interface MockUser {
    id: string;
    email: string;
    user_metadata: {
        full_name: string;
        avatar_url?: string;
        role: 'student' | 'teacher' | 'admin';
        institution?: string;
        designation?: string;
        bio?: string;
    };
    created_at?: string;
}

export const adminUser: MockUser = {
    id: 'admin-001',
    email: 'admin@yugayatra.com',
    user_metadata: {
        full_name: 'Yuga Yatra Admin',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
        role: 'admin',
        institution: 'Yuga Yatra HQ',
        designation: 'Founder & CEO',
        bio: 'Platform administrator and content overseer.'
    }
};

export const mockTeacher: MockUser = {
    id: 'teacher-456',
    email: 'teacher@yugayatra.com',
    user_metadata: {
        full_name: 'Amit Sharma',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amit',
        role: 'teacher',
        institution: 'Allen Institute',
        designation: 'Senior Physics Faculty',
        bio: '10+ years of experience in coaching for JEE Advanced.'
    }
};

export const mockStudent: MockUser = {
    id: 'user-123',
    email: 'student@yugayatra.com',
    user_metadata: {
        full_name: 'Rahul Kumar',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul',
        role: 'student',
        institution: 'Delhi Public School',
        designation: 'Student'
    }
};

export const guestUser: MockUser = {
    id: 'guest-999',
    email: 'guest@yugayatra.com',
    user_metadata: {
        full_name: 'Guest User',
        avatar_url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Guest',
        role: 'student',
        institution: 'Self Learner',
        designation: 'Guest'
    }
};

// Aliases for compatibility with existing code
export const mockUser = mockStudent;

export const mockUsers: MockUser[] = [adminUser, mockTeacher, mockStudent, guestUser];

export const getMockUserByEmail = (email: string): MockUser | undefined => {
    return mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
};
