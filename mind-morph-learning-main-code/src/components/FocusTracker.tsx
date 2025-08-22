import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Brain, Eye, Target } from 'lucide-react';

interface FocusTrackerProps {
  onFocusChange: (score: number) => void;
  isActive: boolean;
}

export const FocusTracker: React.FC<FocusTrackerProps> = ({ onFocusChange, isActive }) => {
  const [focusScore, setFocusScore] = useState(75);
  const [attentionPattern, setAttentionPattern] = useState('stable');

  useEffect(() => {
    if (!isActive) return;

    // Simulate real-time focus tracking
    const interval = setInterval(() => {
      // Simulate micro-attention tracking with realistic variations
      const variation = (Math.random() - 0.5) * 20;
      const newScore = Math.max(0, Math.min(100, focusScore + variation));
      
      setFocusScore(newScore);
      onFocusChange(newScore);

      // Determine attention pattern
      if (newScore > 80) setAttentionPattern('high');
      else if (newScore > 60) setAttentionPattern('stable');
      else if (newScore > 40) setAttentionPattern('declining');
      else setAttentionPattern('low');
    }, 2000);

    return () => clearInterval(interval);
  }, [isActive, focusScore, onFocusChange]);

  const getScoreColor = () => {
    if (focusScore > 80) return 'text-success';
    if (focusScore > 60) return 'text-primary';
    if (focusScore > 40) return 'text-secondary';
    return 'text-destructive';
  };

  const getPatternIcon = () => {
    switch (attentionPattern) {
      case 'high': return <Target className="h-5 w-5 text-success" />;
      case 'stable': return <Eye className="h-5 w-5 text-primary" />;
      case 'declining': return <Brain className="h-5 w-5 text-secondary" />;
      default: return <Brain className="h-5 w-5 text-destructive" />;
    }
  };

  return (
    <Card className="p-4 bg-gradient-calm border-primary/20">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {getPatternIcon()}
          <h3 className="font-semibold text-sm">Focus Monitor</h3>
        </div>
        <div className={`text-xl font-bold ${getScoreColor()}`}>
          {Math.round(focusScore)}%
        </div>
      </div>
      
      <Progress 
        value={focusScore} 
        className="h-2 mb-2"
      />
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Pattern: {attentionPattern}</span>
        <span className={isActive ? 'text-success animate-pulse-focus' : 'text-muted-foreground'}>
          {isActive ? '● Live' : '○ Paused'}
        </span>
      </div>
    </Card>
  );
};