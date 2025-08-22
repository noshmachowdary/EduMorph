import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Brain, CheckCircle, XCircle, ArrowRight, RotateCcw, Calculator } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const mathQuestions: Question[] = [
  {
    id: 1,
    question: "What is 1/4 + 1/4?",
    options: ["1/8", "2/4", "1/2", "4/8"],
    correct: 2,
    explanation: "When adding fractions with the same denominator, add the numerators: 1/4 + 1/4 = 2/4 = 1/2",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "If you have 3/8 of a pizza and eat 1/8, how much is left?",
    options: ["2/8", "4/8", "1/4", "2/7"],
    correct: 0,
    explanation: "3/8 - 1/8 = 2/8. You subtract the numerators when denominators are the same.",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "What is the equivalent of 2/6 in simplest form?",
    options: ["2/6", "1/3", "4/12", "3/9"],
    correct: 1,
    explanation: "2/6 can be simplified by dividing both numerator and denominator by 2: 2÷2 = 1, 6÷2 = 3, so 2/6 = 1/3",
    difficulty: "Medium"
  },
  {
    id: 4,
    question: "Which fraction is larger: 3/5 or 2/3?",
    options: ["3/5", "2/3", "They are equal", "Cannot determine"],
    correct: 1,
    explanation: "Convert to common denominators: 3/5 = 9/15 and 2/3 = 10/15. Since 10/15 > 9/15, 2/3 is larger.",
    difficulty: "Hard"
  },
  {
    id: 5,
    question: "What is 1/2 × 1/3?",
    options: ["1/5", "1/6", "2/6", "2/5"],
    correct: 1,
    explanation: "To multiply fractions, multiply numerators together and denominators together: 1×1 = 1, 2×3 = 6, so 1/6",
    difficulty: "Medium"
  }
];

const MathModule = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setIsAnswered(true);
    setShowExplanation(true);
    
    if (answerIndex === mathQuestions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < mathQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setShowExplanation(false);
    setQuizComplete(false);
    setTimeSpent(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = () => {
    const percentage = (score / mathQuestions.length) * 100;
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-primary';
    return 'text-destructive';
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-calm p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-focus">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Calculator className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold">Math Quiz Complete!</h1>
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">{score}/{mathQuestions.length}</div>
                    <p className="text-sm opacity-90">Questions Correct</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-secondary text-secondary-foreground">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">{Math.round((score / mathQuestions.length) * 100)}%</div>
                    <p className="text-sm opacity-90">Accuracy</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-focus text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">{formatTime(timeSpent)}</div>
                    <p className="text-sm opacity-90">Time Spent</p>
                  </CardContent>
                </Card>
              </div>

              <div className="p-6 bg-muted rounded-lg">
                <h3 className="font-semibold mb-2">Performance Analysis</h3>
                <p className="text-muted-foreground">
                  {score === mathQuestions.length 
                    ? "Perfect! You've mastered fractions completely. Ready for the next challenge!"
                    : score >= mathQuestions.length * 0.8 
                    ? "Excellent work! You have a strong understanding of fractions."
                    : score >= mathQuestions.length * 0.6 
                    ? "Good progress! Review the explanations and try again to improve."
                    : "Keep practicing! Fractions can be tricky, but you're learning."}
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button variant="focus" size="lg" onClick={resetQuiz}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                <Button variant="outline" size="lg" onClick={() => window.close()}>
                  Return to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const question = mathQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / mathQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-calm p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calculator className="h-6 w-6 text-primary" />
              <h1 className="text-2xl font-bold">Math Module: Fractions</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Time: {formatTime(timeSpent)}</span>
              <span>Score: {score}/{mathQuestions.length}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {mathQuestions.length}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>

        {/* Question Card */}
        <Card className="shadow-focus animate-fade-in">
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="w-fit">
                {question.difficulty}
              </Badge>
              <div className="flex items-center gap-2">
                <Brain className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">Think carefully</span>
              </div>
            </div>
            <CardTitle className="text-xl">{question.question}</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    isAnswered
                      ? index === question.correct
                        ? "success"
                        : index === selectedAnswer
                        ? "destructive"
                        : "outline"
                      : "outline"
                  }
                  className={`p-4 h-auto text-left justify-start transition-all duration-300 ${
                    !isAnswered ? 'hover:scale-105 hover:shadow-md' : ''
                  }`}
                  onClick={() => handleAnswerSelect(index)}
                  disabled={isAnswered}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0">
                      {isAnswered && index === question.correct && (
                        <CheckCircle className="h-4 w-4" />
                      )}
                      {isAnswered && index === selectedAnswer && index !== question.correct && (
                        <XCircle className="h-4 w-4" />
                      )}
                      {!isAnswered && (
                        <div className="w-4 h-4 rounded-full border-2 border-current" />
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </Button>
              ))}
            </div>

            {showExplanation && (
              <Card className="bg-muted/50 animate-fade-in">
                <CardContent className="p-4">
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <Brain className="h-4 w-4" />
                    Explanation
                  </h4>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </CardContent>
              </Card>
            )}

            {isAnswered && (
              <div className="flex justify-end">
                <Button variant="focus" onClick={handleNextQuestion}>
                  {currentQuestion < mathQuestions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  ) : (
                    'Complete Quiz'
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MathModule;