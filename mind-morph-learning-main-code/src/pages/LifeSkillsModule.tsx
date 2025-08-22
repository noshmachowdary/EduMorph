import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Calendar, CheckCircle, XCircle, ArrowRight, RotateCcw, Clock } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const lifeSkillsQuestions: Question[] = [
  {
    id: 1,
    question: "What is the best way to start your morning routine?",
    options: ["Sleep in as long as possible", "Wake up at the same time every day", "Check your phone immediately", "Skip breakfast to save time"],
    correct: 1,
    explanation: "Waking up at the same time every day helps establish a healthy circadian rhythm and makes it easier to maintain consistent daily routines.",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "How can you break down a big task to make it more manageable?",
    options: ["Do it all at once", "Divide it into smaller steps", "Wait until the last minute", "Ask someone else to do it"],
    correct: 1,
    explanation: "Breaking large tasks into smaller, manageable steps makes them less overwhelming and helps you track progress more easily.",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "What is a good strategy for remembering important appointments?",
    options: ["Trust your memory", "Write it down or use a calendar", "Hope someone reminds you", "Only schedule things you can't forget"],
    correct: 1,
    explanation: "Writing appointments down or using a digital calendar creates a reliable external memory system that reduces stress and prevents missed appointments.",
    difficulty: "Medium"
  },
  {
    id: 4,
    question: "When feeling overwhelmed, what is a healthy coping strategy?",
    options: ["Ignore the feeling and push through", "Take deep breaths and pause", "Avoid all responsibilities", "Complain to everyone around you"],
    correct: 1,
    explanation: "Taking deep breaths and pausing helps activate your body's relaxation response and gives you space to think clearly about solutions.",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "What is the most effective way to build a new habit?",
    options: ["Start with huge changes", "Be consistent even if the action is small", "Only do it when you feel motivated", "Change everything at once"],
    correct: 1,
    explanation: "Consistency with small actions is more effective than sporadic big efforts. Small, consistent steps build neural pathways and make habits stick.",
    difficulty: "Hard"
  }
];

const LifeSkillsModule = () => {
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
    
    if (answerIndex === lifeSkillsQuestions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < lifeSkillsQuestions.length - 1) {
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

  if (quizComplete) {
    return (
      <div className="min-h-screen bg-gradient-calm p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="shadow-focus">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="h-8 w-8 text-orange-600" />
                <h1 className="text-3xl font-bold">Life Skills Quiz Complete!</h1>
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">{score}/{lifeSkillsQuestions.length}</div>
                    <p className="text-sm opacity-90">Questions Correct</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-secondary text-secondary-foreground">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">{Math.round((score / lifeSkillsQuestions.length) * 100)}%</div>
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
                <h3 className="font-semibold mb-2">Life Management Assessment</h3>
                <p className="text-muted-foreground">
                  {score === lifeSkillsQuestions.length 
                    ? "Excellent! You have strong daily life management skills. You're well-equipped for independence!"
                    : score >= lifeSkillsQuestions.length * 0.8 
                    ? "Great job! You understand the key principles of effective daily routines."
                    : score >= lifeSkillsQuestions.length * 0.6 
                    ? "Good foundation! Practice these skills daily to build strong life management habits."
                    : "Keep learning! Life skills develop with practice and patience. Start with small, consistent changes."}
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

  const question = lifeSkillsQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / lifeSkillsQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-calm p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-6 w-6 text-orange-600" />
              <h1 className="text-2xl font-bold">Life Skills Module: Daily Routines</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Time: {formatTime(timeSpent)}</span>
              <span>Score: {score}/{lifeSkillsQuestions.length}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {lifeSkillsQuestions.length}
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
                <Clock className="h-4 w-4 text-orange-600" />
                <span className="text-sm text-muted-foreground">Build healthy habits</span>
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
                    <Calendar className="h-4 w-4" />
                    Life Skill Insight
                  </h4>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </CardContent>
              </Card>
            )}

            {isAnswered && (
              <div className="flex justify-end">
                <Button variant="focus" onClick={handleNextQuestion}>
                  {currentQuestion < lifeSkillsQuestions.length - 1 ? (
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

export default LifeSkillsModule;