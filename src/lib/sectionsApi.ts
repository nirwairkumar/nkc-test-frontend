// src/lib/sectionsApi.ts

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface Section {
    id: string;
    name: string;
    created_at: string;
}

// In-memory mock sections
const mockSections: Section[] = [
    { id: 'sec-1', name: 'Physics', created_at: new Date().toISOString() },
    { id: 'sec-2', name: 'Chemistry', created_at: new Date().toISOString() },
    { id: 'sec-3', name: 'Mathematics', created_at: new Date().toISOString() },
    { id: 'sec-4', name: 'General Knowledge', created_at: new Date().toISOString() },
    { id: 'sec-5', name: 'Reasoning', created_at: new Date().toISOString() }
];

export async function fetchSections() {
    await delay(400);
    return { data: mockSections, error: null };
}

export async function createSection(name: string) {
    await delay(300);
    const newSection: Section = {
        id: `sec-${Date.now()}`,
        name,
        created_at: new Date().toISOString()
    };
    mockSections.push(newSection);
    return { data: newSection, error: null };
}

export async function assignSectionsToTest(testId: string, sectionIds: string[]) {
    await delay(300);
    // Mock assignment - no-op for now as we don't strictly track this in mockTests yet, 
    // or we could add it to the test object if we had access to it here easily.
    // For now assuming success is enough.
    return { error: null };
}

export async function fetchTestSections(testId: string) {
    await delay(300);
    // Return random subset or empty for now
    return { data: [], error: null };
}

export async function updateSection(id: string, name: string) {
    await delay(300);
    const section = mockSections.find(s => s.id === id);
    if (section) {
        section.name = name;
        return { data: section, error: null };
    }
    return { data: null, error: { message: 'Section not found' } };
}

export async function deleteSection(id: string) {
    await delay(300);
    const index = mockSections.findIndex(s => s.id === id);
    if (index !== -1) {
        mockSections.splice(index, 1);
    }
    return { error: null };
}
