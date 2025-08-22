import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dashboard } from '@/components/Dashboard';
import { Brain, Zap, Target, Users, Eye, Volume2, Gamepad2, BookOpen, ChevronRight } from 'lucide-react';

const Index = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo login - in production, integrate with Supabase
    setUserName(email.split('@')[0] || 'Student');
    setCurrentView('dashboard');
  };

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Adaptation',
      description: 'Real-time content personalization based on your cognitive patterns and attention levels.'
    },
    {
      icon: Zap,
      title: 'Micro-Attention Tracking',
      description: 'Advanced focus monitoring that adapts learning materials instantly to maintain engagement.'
    },
    {
      icon: Target,
      title: 'Neuro-Profile Builder',
      description: 'Evolving personalized profiles that learn your optimal session lengths and preferences.'
    },
    {
      icon: Users,
      title: 'Inclusive Design',
      description: 'Specifically crafted for neurodiverse learners including ADHD, autism, and learning differences.'
    }
  ];

  const modalities = [
    { icon: Eye, label: 'Visual', color: 'text-primary' },
    { icon: Volume2, label: 'Audio', color: 'text-secondary' },
    { icon: Gamepad2, label: 'Interactive', color: 'text-success' },
    { icon: BookOpen, label: 'Text', color: 'text-purple-600' }
  ];

  if (currentView === 'dashboard') {
    return <Dashboard userName={userName} />;
  }

  if (currentView === 'login') {
    return (
      <div className="min-h-screen bg-gradient-calm flex items-center justify-center p-6">
        <Card className="w-full max-w-md shadow-focus">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Brain className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                EduMorph
              </span>
            </div>
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your adaptive learning journey</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" variant="focus" className="w-full">
                Sign In
              </Button>
              <Button 
                type="button" 
                variant="ghost" 
                className="w-full"
                onClick={() => setCurrentView('landing')}
              >
                Back to Home
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-calm">
      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Brain className="h-12 w-12 text-primary" />
            <h1 className="text-4xl md:text-6xl font-bold">
              <span className="bg-gradient-primary bg-clip-text text-transparent">EduMorph</span>
            </h1>
          </div>
          
          <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-6">
            <span className="bg-gradient-focus bg-clip-text text-transparent">Adaptive AI Learning</span>
            <br />That Evolves With You
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Revolutionary learning platform that adapts in real-time to your unique cognitive processing style. 
            Powered by AI that understands how you learn best.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="focus" 
              size="xl"
              onClick={() => setCurrentView('login')}
              className="text-lg"
            >
              Start Learning Today
              <ChevronRight className="h-5 w-5" />
            </Button>
            <Button variant="learning" size="xl" className="text-lg">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Modality Showcase */}
      <section className="px-6 py-16 bg-card/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Real-Time Modality Shifting</h3>
            <p className="text-lg text-muted-foreground">
              Content instantly adapts across four learning modes based on your focus and engagement
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {modalities.map((modality, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-focus transition-all duration-300 group">
                <CardContent className="p-6">
                  <modality.icon className={`h-12 w-12 mx-auto mb-4 ${modality.color} group-hover:scale-110 transition-transform`} />
                  <h4 className="font-semibold text-lg">{modality.label}</h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Powered by Advanced AI</h3>
            <p className="text-lg text-muted-foreground">
              Cutting-edge technology designed specifically for neurodiverse learning success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-soft hover:shadow-engage transition-all duration-300 border-l-4 border-l-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 bg-gradient-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">
            Ready to Transform Your Learning Experience?
          </h3>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of neurodiverse students who've discovered their optimal learning style with EduMorph
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="secondary" 
              size="xl"
              onClick={() => setCurrentView('login')}
              className="text-lg"
            >
              Get Started Free
            </Button>
            <Button variant="outline" size="xl" className="text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;