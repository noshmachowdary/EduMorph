import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle, XCircle, ArrowRight, RotateCcw, PenTool } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

const englishQuestions: Question[] = [
  {
    id: 1,
    question: "What is the main character in a story called?",
    options: ["Antagonist", "Protagonist", "Narrator", "Supporting character"],
    correct: 1,
    explanation: "The protagonist is the main character around whom the story revolves. They are usually the character the reader follows throughout the story.",
    difficulty: "Easy"
  },
  {
    id: 2,
    question: "Which of these is a good way to start a creative story?",
    options: ["'Once upon a time...'", "With exciting action", "Introducing the main character", "All of the above"],
    correct: 3,
    explanation: "All of these are valid ways to start a story! Different openings work for different types of stories and can all be effective in engaging readers.",
    difficulty: "Easy"
  },
  {
    id: 3,
    question: "What is a simile?",
    options: ["A comparison using 'like' or 'as'", "A comparison without using 'like' or 'as'", "Giving human qualities to objects", "An exaggeration"],
    correct: 0,
    explanation: "A simile is a figure of speech that compares two different things using the words 'like' or 'as'. For example: 'She runs like the wind.'",
    difficulty: "Medium"
  },
  {
    id: 4,
    question: "What are the three main parts of a story structure?",
    options: ["Beginning, middle, end", "Characters, setting, plot", "Conflict, climax, resolution", "Introduction, body, conclusion"],
    correct: 0,
    explanation: "The basic story structure has three main parts: beginning (setup), middle (development), and end (conclusion). This helps organize the narrative flow.",
    difficulty: "Medium"
  },
  {
    id: 5,
    question: "What is 'show, don't tell' in creative writing?",
    options: ["Use pictures instead of words", "Describe actions and details instead of stating facts", "Always use dialogue", "Write short sentences"],
    correct: 1,
    explanation: "'Show, don't tell' means using descriptive details, actions, and sensory information to let readers experience the story rather than just stating facts directly.",
    difficulty: "Hard"
  }
];

const EnglishModule = () => {
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
    
    if (answerIndex === englishQuestions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < englishQuestions.length - 1) {
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
                <PenTool className="h-8 w-8 text-purple-600" />
                <h1 className="text-3xl font-bold">English Quiz Complete!</h1>
              </div>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">{score}/{englishQuestions.length}</div>
                    <p className="text-sm opacity-90">Questions Correct</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-secondary text-secondary-foreground">
                  <CardContent className="p-6">
                    <div className="text-3xl font-bold">{Math.round((score / englishQuestions.length) * 100)}%</div>
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
                <h3 className="font-semibold mb-2">Writing Skills Assessment</h3>
                <p className="text-muted-foreground">
                  {score === englishQuestions.length 
                    ? "Fantastic! You have excellent storytelling knowledge. Ready to write your own creative stories!"
                    : score >= englishQuestions.length * 0.8 
                    ? "Great work! You understand the fundamentals of creative writing well."
                    : score >= englishQuestions.length * 0.6 
                    ? "Good foundation! Practice writing short stories to improve your skills."
                    : "Keep reading and writing! Every great author started with curiosity and practice."}
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

  const question = englishQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / englishQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-calm p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-purple-600" />
              <h1 className="text-2xl font-bold">English Module: Creative Writing</h1>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Time: {formatTime(timeSpent)}</span>
              <span>Score: {score}/{englishQuestions.length}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-muted-foreground">
                Question {currentQuestion + 1} of {englishQuestions.length}
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
                <PenTool className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-muted-foreground">Express your creativity</span>
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
                    <BookOpen className="h-4 w-4" />
                    Writing Insight
                  </h4>
                  <p className="text-sm text-muted-foreground">{question.explanation}</p>
                </CardContent>
              </Card>
            )}

            {isAnswered && (
              <div className="flex justify-end">
                <Button variant="focus" onClick={handleNextQuestion}>
                  {currentQuestion < englishQuestions.length - 1 ? (
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

export default EnglishModule;