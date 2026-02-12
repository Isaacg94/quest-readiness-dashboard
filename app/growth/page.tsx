import Link from "next/link";

import { getReadinessData } from "@/lib/readiness-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function GrowthPage() {
  const data = await getReadinessData();

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="space-y-2">
        <div className="text-sm text-muted-foreground">
          <Link href="/" className="hover:underline">
            Dashboard
          </Link>
          <span className="mx-2">/</span>
          <span>Growth</span>
        </div>

        <h1 className="text-3xl font-bold">Your Growth Plan</h1>
        <p className="text-muted-foreground">
          Clear, practical next steps based on your current readiness.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>What to focus on</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <span className="font-medium">Strongest area:</span>{" "}
              {data.insights.strongest}
            </p>
            <p>
              <span className="font-medium">Focus area:</span>{" "}
              {data.insights.focusArea}
            </p>
            <div className="pt-2">
              <p className="font-medium">Recommendation</p>
              <p className="text-muted-foreground">
                {data.insights.primaryRecommendation}
              </p>
              <p className="mt-2 text-muted-foreground">
                {data.insights.secondaryRecommendation}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Milestone tracker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p>
              <span className="font-medium">Completed:</span>{" "}
              {data.milestones.completed} / {data.milestones.total}
            </p>
            <p>
              <span className="font-medium">Next milestone:</span>{" "}
              {data.milestones.nextMilestone}
            </p>
            <p className="text-muted-foreground">
              Progress: {data.milestones.progress}%
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Next steps this week</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {data.insights.nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-0.5 text-primary">•</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-lg bg-primary/10 p-4 text-sm">
            <p className="font-medium">Keep going</p>
            <p className="text-muted-foreground">{data.insights.encouragement}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}