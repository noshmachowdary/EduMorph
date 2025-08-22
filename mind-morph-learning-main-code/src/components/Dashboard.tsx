import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { FocusTracker } from './FocusTracker';
import { LearningModule } from './LearningModule';
import { Brain, TrendingUp, Clock, Award, Settings, User } from 'lucide-react';

interface DashboardProps {
  userName: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  const [currentFocus, setCurrentFocus] = useState(75);
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [learningMode, setLearningMode] = useState<'text' | 'visual' | 'audio' | 'interactive'>('visual');
  const [todayProgress, setTodayProgress] = useState(65);

  const learningModules = [
    {
      id: 'math-fractions',
      title: 'Understanding Fractions',
      subject: 'Math' as const,
      description: 'Learn fractions through visual and interactive methods designed for your learning style.',
      progress: 45
    },
    {
      id: 'science-photosynthesis',
      title: 'How Plants Make Food',
      subject: 'Science' as const,
      description: 'Discover photosynthesis through animations and hands-on experiments.',
      progress: 78
    },
    {
      id: 'english-storytelling',
      title: 'Creative Writing',
      subject: 'English' as const,
      description: 'Build storytelling skills with structured, supportive exercises.',
      progress: 32
    },
    {
      id: 'life-time-management',
      title: 'Daily Routines',
      subject: 'Life Skills' as const,
      description: 'Learn to organize your day with visual schedules and reminders.',
      progress: 89
    }
  ];

  const handleFocusChange = (score: number) => {
    setCurrentFocus(score);
    
    // Simulate adaptive content changes based on focus
    if (score < 50 && learningMode !== 'interactive') {
      setLearningMode('interactive');
    } else if (score > 80 && learningMode !== 'text') {
      setLearningMode('text');
    }
  };

  const handleModuleStart = (moduleId: string) => {
    setActiveModule(activeModule === moduleId ? null : moduleId);
  };

  return (
    <div className="min-h-screen bg-gradient-calm p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {userName}!</h1>
            <p className="text-muted-foreground mt-1">Your adaptive learning journey continues</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-primary text-primary-foreground">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Brain className="h-4 w-4" />
                Current Focus
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(currentFocus)}%</div>
              <p className="text-xs text-primary-foreground/80 mt-1">
                {currentFocus > 80 ? 'Excellent focus!' : currentFocus > 60 ? 'Good attention' : 'Let\'s re-engage'}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Today's Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayProgress}%</div>
              <Progress value={todayProgress} className="h-2 mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Learning Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h 34m</div>
              <p className="text-xs text-muted-foreground mt-1">Optimal session length</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Award className="h-4 w-4" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground mt-1">Completed this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Focus Tracker */}
          <div className="lg:col-span-1">
            <FocusTracker 
              onFocusChange={handleFocusChange}
              isActive={activeModule !== null}
            />
          </div>

          {/* Active Learning Summary */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  Neuro-Profile Insights
                </CardTitle>
                <CardDescription>
                  AI-powered recommendations based on your learning patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-gradient-secondary/10 border border-secondary/20">
                    <h4 className="font-medium text-sm text-secondary">Optimal Learning Mode</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Visual + Interactive (Based on current focus: {Math.round(currentFocus)}%)
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-focus/10 border border-primary/20">
                    <h4 className="font-medium text-sm text-primary">Best Session Time</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      25-minute intervals with 5-minute breaks
                    </p>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/50">
                  <p className="text-sm text-muted-foreground">
                    💡 <strong>AI Tip:</strong> Your focus is {currentFocus > 70 ? 'excellent' : 'good'} right now. 
                    {currentFocus > 70 ? ' Perfect time for challenging content!' : ' Consider switching to interactive mode.'}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Learning Modules */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Your Learning Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {learningModules.map((module) => (
              <LearningModule
                key={module.id}
                title={module.title}
                subject={module.subject}
                description={module.description}
                currentMode={learningMode}
                onModeChange={setLearningMode}
                onStart={() => handleModuleStart(module.id)}
                isActive={activeModule === module.id}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};