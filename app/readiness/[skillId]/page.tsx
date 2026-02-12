import Link from "next/link";
import { notFound } from "next/navigation";

import { getReadinessData } from "@/lib/readiness-data";
import { ProgressRing } from "@/components/ProgressRing";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getCompletionPercentage, getScoreColor } from "@/utils/readiness-calculator";

type PageProps = {
  params: Promise<{ skillId: string }>;
};

export default async function SkillDetailPage({ params }: PageProps) {
  const data = await getReadinessData();
  const { skillId } = await params;

  const skill = data.skillAreas.find((s) => s.id === skillId);
  if (!skill) notFound();

  const completion = getCompletionPercentage(
    skill.completedActivities,
    skill.totalActivities
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <span>Skill details</span>
          </div>
          <h1 className="text-3xl font-bold">{skill.name}</h1>
          <p className="text-muted-foreground">{skill.description}</p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/growth"
            className="rounded-md bg-[hsl(var(--primary-active))] px-4 py-2 text-sm font-medium text-primary-foreground "
          >
            Next steps
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <ProgressRing score={skill.score} size={140} />
            <div className="text-center">
              <p className={`text-2xl font-bold ${getScoreColor(skill.score)}`}>
                {skill.score}/100
              </p>
              <p className="text-sm text-muted-foreground">Current readiness</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Activities completed</span>
              <span className="font-medium">
                {skill.completedActivities} / {skill.totalActivities}
              </span>
            </div>
            <Progress value={completion} className="" />
            <p className="text-sm text-muted-foreground">
              Keep going — consistency is what moves the score.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Strengths</CardTitle>
          </CardHeader>
          <CardContent>
            {skill.strengths.length ? (
              <ul className="space-y-2">
                {skill.strengths.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-secondary">✓</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No strengths recorded yet.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Focus next</CardTitle>
          </CardHeader>
          <CardContent>
            {skill.improvements.length ? (
              <ul className="space-y-2">
                {skill.improvements.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="mt-0.5 text-accent">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">
                No improvements recorded yet.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
