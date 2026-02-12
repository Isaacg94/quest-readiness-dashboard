"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Briefcase, 
  Heart, 
  Lightbulb,
  ChevronRight
} from 'lucide-react';
import type { SkillArea } from '@/utils/readiness';
import { getScoreColor } from '@/utils/readiness-calculator';

interface DetailedViewProps {
  skillAreas: SkillArea[];
  onSkillClick?: (skillId: string) => void;
}

const iconMap = {
  BookOpen,
  Briefcase,
  Heart,
  Lightbulb
};

export function DetailedView({ skillAreas, onSkillClick }: DetailedViewProps) {
  return (
    <Card className="animate-slide-up">
      <CardHeader>
        <CardTitle>All Skill Areas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {skillAreas.map((skill, index) => {
          const Icon = iconMap[skill.icon as keyof typeof iconMap] || BookOpen;
          const completionPercentage = Math.round(
            (skill.completedActivities / skill.totalActivities) * 100
          );

          return (
            <div
              key={skill.id}
              className="flex items-center gap-4 p-4 rounded-lg border hover:bg-muted/50 transition-colors cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => onSkillClick?.(skill.id)}
            >
              <div className="shrink-0">
                <div className="rounded-lg bg-muted p-3">
                  <Icon className="h-5 w-5" />
                </div>
              </div>

              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {skill.description}
                    </p>
                  </div>
                  <span className={`text-2xl font-bold ${getScoreColor(skill.score)} shrink-0`}>
                    {skill.score}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>
                      {skill.completedActivities} / {skill.totalActivities} activities
                    </span>
                  </div>
                  <Progress value={completionPercentage} className="h-1.5" />
                </div>
              </div>

              <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
