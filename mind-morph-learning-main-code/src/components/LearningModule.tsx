import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { BookOpen, Volume2, Eye, Gamepad2, Play, Pause } from 'lucide-react';

interface LearningModuleProps {
  title: string;
  subject: 'Math' | 'Science' | 'English' | 'Life Skills';
  description: string;
  currentMode: 'text' | 'visual' | 'audio' | 'interactive';
  onModeChange: (mode: 'text' | 'visual' | 'audio' | 'interactive') => void;
  onStart: () => void;
  isActive?: boolean;
}

export const LearningModule: React.FC<LearningModuleProps> = ({
  title,
  subject,
  description,
  currentMode,
  onModeChange,
  onStart,
  isActive = false
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const subjectColors = {
    'Math': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    'Science': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    'English': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    'Life Skills': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
  };

  const modeIcons = {
    text: BookOpen,
    visual: Eye,
    audio: Volume2,
    interactive: Gamepad2
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    onStart();
  };

  const handleModuleClick = () => {
    const moduleUrls = {
      'Math': '/math',
      'Science': '/science', 
      'English': '/english',
      'Life Skills': '/life-skills'
    };
    
    const url = moduleUrls[subject];
    if (url) {
      window.open(url, '_blank');
    }
  };

  const renderContent = () => {
    switch (currentMode) {
      case 'text':
        return (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {description}
            </p>
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm">
                <strong>Example:</strong> Understanding fractions through real-world scenarios like pizza slices and pie charts.
              </p>
            </div>
          </div>
        );
      
      case 'visual':
        return (
          <div className="space-y-3">
            <div className="bg-gradient-primary rounded-lg p-6 text-center text-primary-foreground">
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[...Array(9)].map((_, i) => (
                  <div key={i} className={`h-8 rounded ${i < 3 ? 'bg-primary-foreground/80' : 'bg-primary-foreground/20'}`} />
                ))}
              </div>
              <p className="text-sm">Visual: 3/9 = 1/3</p>
            </div>
          </div>
        );
      
      case 'audio':
        return (
          <div className="space-y-3">
            <div className="flex items-center justify-center p-6 bg-gradient-secondary rounded-lg">
              <Button 
                variant="ghost" 
                size="lg"
                onClick={handlePlayPause}
                className="text-secondary-foreground"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
              </Button>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              {isPlaying ? 'Playing audio explanation...' : 'Click to hear lesson'}
            </p>
          </div>
        );
      
      case 'interactive':
        return (
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2">
              {[...Array(12)].map((_, i) => (
                <Button
                  key={i}
                  variant="learning"
                  size="sm"
                  className="aspect-square p-0"
                  onClick={() => {}}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Drag and drop to create groups
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:scale-[1.02] hover:shadow-engage cursor-pointer group ${isActive ? 'ring-2 ring-primary shadow-focus' : 'shadow-soft'}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge className={subjectColors[subject]} variant="secondary">
              {subject}
            </Badge>
          </div>
          <div className="flex gap-1">
            {Object.entries(modeIcons).map(([mode, Icon]) => (
              <Button
                key={mode}
                variant={currentMode === mode ? "focus" : "ghost"}
                size="sm"
                onClick={() => onModeChange(mode as any)}
                className="h-8 w-8 p-0"
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {renderContent()}
        
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-success animate-pulse-focus' : 'bg-muted'}`} />
            {isActive ? 'Active' : 'Ready'}
          </div>
          <Button 
            variant={isActive ? "success" : "focus"} 
            size="sm"
            onClick={handleModuleClick}
            className="hover:scale-105 transition-transform"
          >
            {isActive ? 'Continue Learning' : 'Start Module'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};