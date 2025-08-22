import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Microscope, CheckCircle, XCircle, ArrowRight, RotateCcw, Leaf } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const scienceQuestions: Question[] = [
  {
    id: 1,
    question: "What do plants need to make their own food through photosynthesis?",
    options: ["Sunlight, water, and carbon dioxide", "Sunlight, soil, and oxygen", "Water, soil, and air", "Sunlight, water, and nitrogen"],
    correct: 0,
    explanation: "Plants need sunlight for energy, water from roots, and carbon dioxide from air to perform photosynthesis and make glucose.",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "What gas do plants release during photosynthesis?",
    options: ["Carbon dioxide", "Nitrogen", "Oxygen", "Hydrogen"],
    correct: 2,
    explanation: "During photosynthesis, plants release oxygen as a byproduct. This oxygen is essential for animals and humans to breathe.",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "Where in the plant does photosynthesis mainly occur?",
    options: ["Roots", "Stems", "Leaves", "Flowers"],
    correct: 2,
    explanation: "Photosynthesis mainly occurs in the leaves because they contain chloroplasts with chlorophyll that captures sunlight.",
    difficulty: "Medium"
  },
  {
    id: 4,
    question: "What is the green pigment in plants called?",
    options: ["Carotene", "Chlorophyll", "Hemoglobin", "Melanin"],
    correct: 1,
    explanation: "Chlorophyll is the green pigment in plants that absorbs sunlight energy needed for photosynthesis.",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "What is the chemical equation for photosynthesis?",
    options: ["6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂", "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O + energy", "2H₂O → 2H₂ + O₂", "N₂ + 3H₂ → 2NH₃"],
    correct: 0,
    explanation: "The photosynthesis equation shows that 6 molecules of CO₂ and 6 molecules of H₂O, with light energy, produce glucose (C₆H₁₂O₆) and 6 molecules of O₂.",
    difficulty: "Hard"
  }
];

const ScienceModule = () => {
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
    
    if (answerIndex === scienceQuestions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < scienceQuestions.length - 1) {
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
                <Leaf className="h-8 w-8 text-success" />
                <h1 className="text-3xl font-bold">Science Quiz Complete!</h1>
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">{score}/{scienceQuestions.length}</div>
                    <p className="text-sm opacity-90">Questions Correct</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-secondary text-secondary-foreground">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">{Math.round((score / scienceQuestions.length) * 100)}%</div>
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
                <h3 className="font-semibold mb-2">Scientific Knowledge Assessment</h3>
                <p className="text-muted-foreground">
                  {score === scienceQuestions.length 
                    ? "Excellent! You understand photosynthesis perfectly. You're ready to explore more complex biological processes!"
                    : score >= scienceQuestions.length * 0.8 
                    ? "Great job! You have a solid understanding of how plants make food."
                    : score >= scienceQuestions.length * 0.6 
                    ? "Good progress! Review the concepts and experiment with plants to deepen your understanding."
                    : "Keep exploring! Science is all about curiosity and discovery. Try observing real plants!"}
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

  const question = scienceQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / scienceQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-calm p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Microscope className="h-6 w-6 text-success" />
              <h1 className="text-2xl font-bold">Science Module: Photosynthesis</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Time: {formatTime(timeSpent)}</span>
              <span>Score: {score}/{scienceQuestions.length}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {scienceQuestions.length}
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
                <Leaf className="h-4 w-4 text-success" />
                <span className="text-sm text-muted-foreground">Observe and analyze</span>
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
                    <Microscope className="h-4 w-4" />
                    Scientific Explanation
                  </h4>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </CardContent>
              </Card>
            )}

            {isAnswered && (
              <div className="flex justify-end">
                <Button variant="focus" onClick={handleNextQuestion}>
                  {currentQuestion < scienceQuestions.length - 1 ? (
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

export default ScienceModule;