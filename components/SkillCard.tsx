"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Briefcase, 
  Heart, 
  Lightbulb,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight
} from 'lucide-react';
import type { SkillArea as SkillAreaType } from '@/utils/readiness';
import { getCompletionPercentage, getScoreColor, getScoreBgColor } from '@/utils/readiness-calculator';
import { useState } from 'react';

interface SkillCardProps {
  skill: SkillAreaType;
  onClick?: () => void;
  delay?: number;
}

const iconMap = {
  BookOpen,
  Briefcase,
  Heart,
  Lightbulb
};

export function SkillCard({ skill, onClick, delay = 0 }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = iconMap[skill.icon as keyof typeof iconMap] || BookOpen;
  const completionPercentage = getCompletionPercentage(
    skill.completedActivities,
    skill.totalActivities
  );

  const TrendIcon = skill.trend === 'up' ? TrendingUp : skill.trend === 'down' ? TrendingDown : Minus;
    const trendColor = skill.trend === 'up' ? 'text-secondary' : skill.trend === 'down' ? 'text-destructive' : 'text-muted-foreground';

  return (
    <Card
      className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-slide-up ${
        isHovered ? 'ring-2 ring-primary/20' : ''
      }`}
      style={{ animationDelay: `${delay}ms` }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className={`rounded-lg p-3 ${getScoreBgColor(skill.score)}`}>
            <Icon className={`h-6 w-6 ${getScoreColor(skill.score)}`} />
          </div>
          <div className="flex items-center gap-1">
            <TrendIcon className={`h-4 w-4 ${trendColor}`} />
            <span className={`text-2xl font-bold ${getScoreColor(skill.score)}`}>
              {skill.score}
            </span>
          </div>
        </div>
        <CardTitle className="mt-4">{skill.name}</CardTitle>
        <CardDescription>{skill.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">
              {skill.completedActivities} / {skill.totalActivities}
            </span>
          </div>
          <Progress value={completionPercentage} className="" />
        </div>

        {isHovered && skill.strengths.length > 0 && (
          <div className="animate-fade-in space-y-2 pt-2 border-t">
            <p className="text-sm font-medium text-muted-foreground">Strengths:</p>
            <ul className="space-y-1">
              {skill.strengths.slice(0, 2).map((strength, index) => (
                <li key={index} className="text-sm flex items-start gap-2">
                  <span className="text-secondary mt-0.5">✓</span>
                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-primary pt-2">
          <span className="font-medium">View details</span>
          <ChevronRight className="h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}
