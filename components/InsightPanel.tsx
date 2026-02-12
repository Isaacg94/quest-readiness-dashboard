import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Target, Sparkles, ArrowRight } from 'lucide-react';
import type { Insights as InsightsType, SkillArea } from '@/utils/readiness';
import { Button } from '@/components/ui/button';

interface InsightPanelProps {
  insights: InsightsType;
  skillAreas: SkillArea[];
}
export function InsightPanel({ insights, skillAreas }: InsightPanelProps) {
  const strongestSkill = skillAreas.find(s => s.id === insights.strongest);
  const focusSkill = skillAreas.find(s => s.id === insights.focusArea);

  return (
    <div className="space-y-4 animate-slide-up" style={{ animationDelay: '400ms' }}>
      <Card className="bg-linear-to-br from-primary/5 to-primary/10 border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-primary/10 p-2">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <CardTitle className="text-lg">Key Insight</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground/90 leading-relaxed">
            {insights.encouragement}
          </p>

          <div className="grid gap-3 md:grid-cols-2">
            {strongestSkill && (
              <div className="rounded-lg bg-secondary/10 p-3 border border-secondary/20">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="h-4 w-4 text-secondary" />
                  <span className="text-sm font-medium text-secondary">
                    Your Strength
                  </span>
                </div>
                <p className="text-sm font-semibold">{strongestSkill.name}</p>
                <p className="text-xs text-secondary/80 mt-1">
                  Score: {strongestSkill.score}/100
                </p>
              </div>
            )}

            {focusSkill && (
              <div className="rounded-lg bg-accent/10 p-3 border border-accent/20">
                <div className="flex items-center gap-2 mb-1">
                  <Target className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-accent">
                    Focus Area
                  </span>
                </div>
                <p className="text-sm font-semibold">{focusSkill.name}</p>
                <p className="text-xs text-accent/80 mt-1">
                  Score: {focusSkill.score}/100
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Recommended Next Steps</CardTitle>
          <CardDescription>
            Focus on these actions to accelerate your progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.nextSteps.map((step, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
              >
                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm font-semibold shrink-0 mt-0.5">
                  {index + 1}
                </div>
                <p className="text-sm flex-1 leading-relaxed">{step}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t">
            <Button className="w-full group" size="lg">
              Start Your Next Activity
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
