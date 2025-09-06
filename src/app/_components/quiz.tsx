"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import { quizQuestions } from "~/data/quiz-questions";

interface QuizState {
  currentQuestion: number;
  answers: number[];
  isComplete: boolean;
  showResults: boolean;
  score: number;
}

interface RandomizedQuestion {
  question: string;
  answers: string[];
  correctAnswerIndex: number;
}

// Function to shuffle array using Fisher-Yates algorithm
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i]!;
    shuffled[i] = shuffled[j]!;
    shuffled[j] = temp;
  }
  return shuffled;
}

export function Quiz() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    answers: [],
    isComplete: false,
    showResults: false,
    score: 0,
  });

  const [playerName, setPlayerName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [randomizedQuestions, setRandomizedQuestions] = useState<RandomizedQuestion[]>([]);

  const utils = api.useUtils();
  const submitScoreMutation = api.quiz.submitScore.useMutation({
    onSuccess: () => {
      // Invalidate and refetch leaderboard when score is submitted
      void utils.quiz.getLeaderboard.invalidate();
    },
  });

  // Generate randomized questions only on client side after hydration
  useEffect(() => {
    setIsClient(true);
    const randomized = quizQuestions.map((question) => {
      const shuffledAnswers = shuffleArray(question.answer);
      const correctAnswerIndex = shuffledAnswers.findIndex(
        (answer) => answer === question.answer[0] // Original correct answer (first in array)
      );

      return {
        question: question.question,
        answers: shuffledAnswers,
        correctAnswerIndex,
      };
    });
    setRandomizedQuestions(randomized);
  }, []);

  // Get current question with randomized answers
  const getCurrentQuestion = (questionIndex: number): RandomizedQuestion | null => {
    return randomizedQuestions[questionIndex] ?? null;
  };

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...quizState.answers, answerIndex];
    const isLastQuestion = quizState.currentQuestion === quizQuestions.length - 1;
    
    if (isLastQuestion) {
      // Calculate score by checking each answer against the correct index for that question
      const score = newAnswers.reduce((acc, answerIndex, questionIndex) => {
        const currentQuestion = getCurrentQuestion(questionIndex);
        return acc + (answerIndex === currentQuestion?.correctAnswerIndex ? 1 : 0);
      }, 0);
      
      setQuizState({
        ...quizState,
        answers: newAnswers,
        isComplete: true,
        showResults: true,
        score,
      });
      setShowNameInput(true);
    } else {
      setQuizState({
        ...quizState,
        answers: newAnswers,
        currentQuestion: quizState.currentQuestion + 1,
      });
    }
  };

  const handleSubmitScore = async () => {
    if (!playerName.trim()) return;
    
    try {
      await submitScoreMutation.mutateAsync({
        name: playerName.trim(),
        score: quizState.score,
        total: quizQuestions.length,
      });
      
      // Reset quiz
      setQuizState({
        currentQuestion: 0,
        answers: [],
        isComplete: false,
        showResults: false,
        score: 0,
      });
      setPlayerName("");
      setShowNameInput(false);
    } catch (error) {
      console.error("Failed to submit score:", error);
    }
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      answers: [],
      isComplete: false,
      showResults: false,
      score: 0,
    });
    setPlayerName("");
    setShowNameInput(false);
  };

  if (quizState.showResults) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Quiz Complete! 🎉</h2>
          
          <div className="bg-white/20 rounded-lg p-6 mb-6">
            <div className="text-4xl font-bold text-white mb-2">
              {quizState.score}/{quizQuestions.length}
            </div>
            <div className="text-xl text-white/80">
              {Math.round((quizState.score / quizQuestions.length) * 100)}% Correct
            </div>
          </div>

          {showNameInput && (
            <div className="space-y-4">
              <div className="text-white text-lg">Enter your name to join the leaderboard:</div>
              <div className="flex gap-3 justify-center">
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder="Your name"
                  className="px-4 py-2 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
                  maxLength={50}
                />
                <button
                  onClick={handleSubmitScore}
                  disabled={!playerName.trim() || submitScoreMutation.isPending}
                  className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {submitScoreMutation.isPending ? "Submitting..." : "Submit Score"}
                </button>
              </div>
            </div>
          )}

          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={resetQuiz}
              className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all"
            >
              Take Quiz Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Show loading state until client-side randomization is complete
  if (!isClient || randomizedQuestions.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-6">FIRST Robotics Quiz</h2>
          <div className="animate-pulse">
            <div className="bg-white/20 h-8 rounded-lg mb-6"></div>
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white/20 h-16 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = getCurrentQuestion(quizState.currentQuestion);

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-xl p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">FIRST Robotics Quiz</h2>
          <div className="text-white/70">
            Question {quizState.currentQuestion + 1} of {quizQuestions.length}
          </div>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((quizState.currentQuestion + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-white mb-6 leading-relaxed">
          {currentQuestion.question}
        </h3>
        
        <div className="space-y-3">
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className="w-full p-4 text-left bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 hover:border-white/40 transition-all duration-200 hover:scale-[1.02]"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-semibold">
                  {String.fromCharCode(65 + index)}
                </div>
                <div className="flex-1">{answer}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
