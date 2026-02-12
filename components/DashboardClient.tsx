"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Loader2, AlertCircle } from "lucide-react";

import { ReadinessScore } from "@/components/ReadinessScore";
import { SkillCard } from "@/components/SkillCard";
import { InsightPanel } from "@/components/InsightPanel";
import { ViewToggle } from "@/components/ViewToggle";
import { DetailedView } from "@/components/DetailedView";

import type { ReadinessData } from "@/utils/readiness";
import type { ViewMode } from "@/utils/readiness";
import Image from "next/image";

type Props = {
  data?: ReadinessData | null;
  loading?: boolean;
  error?: string | null;
};

export default function DashboardClient({ data, loading, error }: Props) {
  const [viewMode, setViewMode] = useState<ViewMode>("summary");
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading your readiness data…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex h-full min-h-[60vh] items-center justify-center p-4">
        <div className="max-w-md space-y-4 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
            <AlertCircle className="h-8 w-8 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold">Unable to Load Data</h2>
          <p className="text-muted-foreground">
            {error ||
              "Something went wrong while loading your readiness information."}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 active:bg-[hsl(var(--primary-active))]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <header className="sticky top-0 z-10 border rounded-lg bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Image
                src="/assets/novamonochromelogoblack.svg"
                alt="Quest"
                width={48}
                height={48}
                className="transition-[opacity,width] duration-300 ease-in-out overflow-hidden"
              />
              <div>
                <h1 className="text-xl font-bold">Quest</h1>
                <p className="text-xs text-muted-foreground ">
                  Post-School Success Platform
                </p>
              </div>
            </div>

            <span className="hidden text-sm text-muted-foreground sm:inline">
              {data.learner.grade}
            </span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-10 px-4 pb-10">
        <ReadinessScore
          score={data.learner.overallScore}
          learnerName={data.learner.name}
          level={data.learner.level}
          levelDescription={data.learner.levelDescription}
        />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Your Skill Areas</h2>
            <p className="text-muted-foreground">
              Track your progress across different areas
            </p>
          </div>

          <ViewToggle view={viewMode} onViewChange={setViewMode} />
        </div>

        {viewMode === "summary" ? (
          <div className="grid gap-6 md:grid-cols-2">
            {data.skillAreas.map((skill, index) => (
              <Link
                key={skill.id}
                href={`/readiness/${skill.id}`}
                className="block"
              >
                <SkillCard skill={skill} delay={index * 100} />
              </Link>
            ))}
          </div>
        ) : (
          <DetailedView
            skillAreas={data.skillAreas}
            onSkillClick={(skillId) => router.push(`/readiness/${skillId}`)}
          />
        )}

        <div>
          <h2 className="mb-6 text-2xl font-bold">
            Insights & Recommendations
          </h2>
          <InsightPanel insights={data.insights} skillAreas={data.skillAreas} />
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>Quest – Empowering your post-school success journey</p>
        <p className="mt-2">© 2025 Nova Pioneer. All rights reserved.</p>
      </footer>
    </div>
  );
}
