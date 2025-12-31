

// src/contexts/TestContext.tsx
import React, { createContext, useContext, useState } from "react";
import { mockTests } from "@/data/mockTests";

const TestContext = createContext<any>(null);

export const TestProvider = ({ children }: { children: React.ReactNode }) => {
  // Dummy state to satisfy interface
  const [studentName, setStudentName] = useState("Mock Student");
  const [answers, setAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(3600);
  const [isTestCompleted, setIsTestCompleted] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);

  return (
    <TestContext.Provider
      value={{
        tests: mockTests,
        loading: false,
        // Restored properties for compatibility
        studentName,
        setStudentName,
        answers,
        addAnswer: (qId: number, ans: any) => setAnswers((prev: any) => ({ ...prev, [qId]: ans })),
        currentQuestionIndex,
        setCurrentQuestionIndex,
        timeRemaining,
        setTimeRemaining,
        isTestCompleted,
        setIsTestCompleted,
        selectedTest,
        setSelectedTest,
        resetTest: () => {
          setAnswers({});
          setCurrentQuestionIndex(0);
          setIsTestCompleted(false);
        },
        totalTestTime: 3600,
      }}
    >
      {children}
    </TestContext.Provider>
  );
};

export const useTests = () => useContext(TestContext);
export const useTest = () => useContext(TestContext); // Alias for compatibility
