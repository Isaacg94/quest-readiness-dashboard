export interface Learner {
  name: string;
  grade: string;
  overallScore: number;
  level: string;
  levelDescription: string;
}

export interface SkillArea {
  id: string;
  name: string;
  description: string;
  score: number;
  trend: 'up' | 'down' | 'stable';
  completedActivities: number;
  totalActivities: number;
  icon: string;
  color: 'success' | 'warning' | 'secondary' | 'accent' | 'primary';
  strengths: string[];
  improvements: string[];
}

export interface Insights {
  strongest: string;
  focusArea: string;
  primaryRecommendation: string;
  secondaryRecommendation: string;
  encouragement: string;
  nextSteps: string[];
}

export interface Activity {
  date: string;
  type: string;
  title: string;
  score: number;
}

export interface Milestones {
  total: number;
  completed: number;
  nextMilestone: string;
  progress: number;
}

export interface ReadinessData {
  learner: Learner;
  skillAreas: SkillArea[];
  insights: Insights;
  recentActivity: Activity[];
  milestones: Milestones;
}

export type ViewMode = 'summary' | 'detailed';

export type ScoreLevel = 'excellent' | 'good' | 'developing' | 'needs-focus';
