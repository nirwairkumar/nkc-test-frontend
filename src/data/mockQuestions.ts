// Adapting from src/lib/testsApi.ts Question interface
export interface MockQuestion {
    id: number;
    testId: string;
    type: 'single' | 'multiple' | 'numerical' | 'single-advance' | 'comprehension';
    question: string;
    image?: string;
    passageContent?: string;
    options?: { [key: string]: string };
    optionImages?: { [key: string]: string };
    correctAnswer: string | string[];
}

export const mockQuestions: MockQuestion[] = [
    // Test 101: Physics Mechanics
    {
        id: 1,
        testId: 'test-101',
        type: 'single',
        question: 'What is the unit of Force?',
        options: { A: 'Newton', B: 'Joule', C: 'Watt', D: 'Pascal' },
        correctAnswer: 'A'
    },
    {
        id: 2,
        testId: 'test-101',
        type: 'numerical',
        question: 'If a car travels 100km in 2 hours, what is its speed in km/h?',
        correctAnswer: '50'
    },
    // Test 102: Solar System GK
    {
        id: 3,
        testId: 'test-102',
        type: 'single',
        question: 'Which planet is known as the Red Planet?',
        options: { A: 'Venus', B: 'Mars', C: 'Jupiter', D: 'Saturn' },
        correctAnswer: 'B'
    },
    {
        id: 4,
        testId: 'test-102',
        type: 'multiple',
        question: 'Select all prime numbers.',
        options: { A: '2', B: '4', C: '11', D: '9' },
        correctAnswer: ['A', 'C']
    },
    // Test 103: JEE Advanced Physics
    {
        id: 5,
        testId: 'test-103',
        type: 'single',
        question: 'Two point charges +q and -q are placed at distance d. The electric field at the midpoint is:',
        options: { A: 'Zero', B: 'kq/d^2', C: '8kq/d^2', D: '2kq/d^2' },
        correctAnswer: 'C'
    },
    {
        id: 6,
        testId: 'test-103',
        type: 'numerical',
        question: 'A capacitor of capacitance 2µF is charged to 100V. The energy stored in Joules is (answer in decimal like 0.01):',
        correctAnswer: '0.01'
    },
    {
        id: 7,
        testId: 'test-103',
        type: 'multiple',
        question: 'Which of the following are conserved in an elastic collision?',
        options: { A: 'Kinetic Energy', B: 'Momentum', C: 'Total Energy', D: 'Velocity' },
        correctAnswer: ['A', 'B', 'C']
    },
    // Test 104: NEET Biology
    {
        id: 8,
        testId: 'test-104',
        type: 'single',
        question: 'The structural and functional unit of the kidney is:',
        options: { A: 'Neuron', B: 'Nephron', C: 'Alveoli', D: 'Villi' },
        correctAnswer: 'B'
    },
    {
        id: 9,
        testId: 'test-104',
        type: 'single',
        question: 'Double circulation is a characteristic feature of:',
        options: { A: 'Fishes', B: 'Amphibians', C: 'Reptiles', D: 'Mammals' },
        correctAnswer: 'D'
    },
    // Test 105: CS DSA
    {
        id: 10,
        testId: 'test-105',
        type: 'single',
        question: 'Which data structure follows LIFO principle?',
        options: { A: 'Queue', B: 'Stack', C: 'Linked List', D: 'Tree' },
        correctAnswer: 'B'
    },
    {
        id: 11,
        testId: 'test-105',
        type: 'single',
        question: 'What is the time complexity of binary search?',
        options: { A: 'O(n)', B: 'O(n^2)', C: 'O(log n)', D: 'O(1)' },
        correctAnswer: 'C'
    },
    // Test 106: History WW2
    {
        id: 12,
        testId: 'test-106',
        type: 'single',
        question: 'When did World War II begin?',
        options: { A: '1914', B: '1939', C: '1945', D: '1941' },
        correctAnswer: 'B'
    },
    {
        id: 13,
        testId: 'test-106',
        type: 'single',
        question: 'Who was the Prime Minister of UK during most of WW2?',
        options: { A: 'Neville Chamberlain', B: 'Winston Churchill', C: 'Clement Attlee', D: 'Tony Blair' },
        correctAnswer: 'B'
    },
    // Test 107: Calculus
    {
        id: 14,
        testId: 'test-107',
        type: 'single',
        question: 'Derivative of sin(x) is:',
        options: { A: 'cos(x)', B: '-cos(x)', C: 'tan(x)', D: 'sec(x)' },
        correctAnswer: 'A'
    },
    {
        id: 15,
        testId: 'test-107',
        type: 'numerical',
        question: 'Limit of (sin x)/x as x approaches 0 is:',
        correctAnswer: '1'
    },
    // Test 108: Current Affairs
    {
        id: 16,
        testId: 'test-108',
        type: 'single',
        question: 'Which country hosted the 2024 Olympics?',
        options: { A: 'Japan', B: 'USA', C: 'France', D: 'Germany' },
        correctAnswer: 'C'
    },
    {
        id: 17,
        testId: 'test-108',
        type: 'single',
        question: 'Who is the current UN Secretary General?',
        options: { A: 'Ban Ki-moon', B: 'António Guterres', C: 'Kofi Annan', D: 'Boutros-Ghali' },
        correctAnswer: 'B'
    },
    // Test 110: English Literature
    {
        id: 18,
        testId: 'test-110',
        type: 'single',
        question: 'Who wrote "Romeo and Juliet"?',
        options: { A: 'Charles Dickens', B: 'William Shakespeare', C: 'Jane Austen', D: 'Mark Twain' },
        correctAnswer: 'B'
    },
    {
        id: 19,
        testId: 'test-110',
        type: 'single',
        question: 'In "Macbeth", who kills King Duncan?',
        options: { A: 'Macduff', B: 'Banquo', C: 'Macbeth', D: 'Malcolm' },
        correctAnswer: 'C'
    },
    // Test 111: Organic Chemistry
    {
        id: 20,
        testId: 'test-111',
        type: 'single',
        question: 'General formula of Alkanes is:',
        options: { A: 'CnH2n', B: 'CnH2n-2', C: 'CnH2n+2', D: 'CnHn' },
        correctAnswer: 'C'
    },
    {
        id: 21,
        testId: 'test-111',
        type: 'single',
        question: 'Which of the following is the simplest Alkyne?',
        options: { A: 'Ethene', B: 'Ethyne', C: 'Methane', D: 'Propyne' },
        correctAnswer: 'B'
    },
    // Test 112: Logical Reasoning
    {
        id: 22,
        testId: 'test-112',
        type: 'single',
        question: 'Find the next number in series: 2, 4, 8, 16, ...',
        options: { A: '24', B: '32', C: '20', D: '18' },
        correctAnswer: 'B'
    },
    {
        id: 23,
        testId: 'test-112',
        type: 'single',
        question: 'If CAT is coded as 3120, how is DOG coded?',
        options: { A: '4157', B: '4158', C: '3127', D: '4120' },
        correctAnswer: 'A' // D=4, O=15, G=7
    },
    // Test 113: Geography
    {
        id: 24,
        testId: 'test-113',
        type: 'single',
        question: 'What is the capital of Australia?',
        options: { A: 'Sydney', B: 'Melbourne', C: 'Canberra', D: 'Perth' },
        correctAnswer: 'C'
    },
    {
        id: 25,
        testId: 'test-113',
        type: 'single',
        question: 'Which is the longest river in the world?',
        options: { A: 'Amazon', B: 'Nile', C: 'Yangtze', D: 'Mississippi' },
        correctAnswer: 'B'
    },
    // Test 114: Art History
    {
        id: 26,
        testId: 'test-114',
        type: 'single',
        question: 'Who painted the "Mona Lisa"?',
        options: { A: 'Michelangelo', B: 'Leonardo da Vinci', C: 'Raphael', D: 'Donatello' },
        correctAnswer: 'B'
    },
    {
        id: 27,
        testId: 'test-114',
        type: 'single',
        question: 'The "Starry Night" is a work by:',
        options: { A: 'Pablo Picasso', B: 'Vincent van Gogh', C: 'Claude Monet', D: 'Salvador Dali' },
        correctAnswer: 'B'
    },
    // Test 115: Sports
    {
        id: 28,
        testId: 'test-115',
        type: 'single',
        question: 'How many players are there in a standard Cricket team?',
        options: { A: '10', B: '11', C: '12', D: '9' },
        correctAnswer: 'B'
    },
    {
        id: 29,
        testId: 'test-115',
        type: 'single',
        question: 'Which country won the FIFA World Cup 2022?',
        options: { A: 'Brazil', B: 'France', C: 'Argentina', D: 'Germany' },
        correctAnswer: 'C'
    }
];
