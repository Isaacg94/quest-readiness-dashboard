import { Sparkles, TrendingUp } from "lucide-react";

import { getReadinessLevel } from "@/utils/readiness-calculator";
import { ProgressRing } from "./ProgressRing";

interface ReadinessScoreProps {
  score: number;
  learnerName: string;
  level?: string;
  levelDescription?: string;
}

export function ReadinessScore({
  score,
  learnerName,
  level,
  levelDescription,
}: ReadinessScoreProps) {
  const readinessInfo = level
    ? { level, description: levelDescription ?? "", color: "" }
    : getReadinessLevel(score);

  return (
    <div
      className="relative glass overflow-hidden rounded-3xl border border-white/90 bg-white/90 p-8 backdrop-blur-xl transition-all duration-500 ease-out before:absolute before:inset-0 before:bg-linear-to-br before:from-white/90 before:via-white/90 before:to-transparent before:opacity-50"
    >
      <div className="relative flex flex-col items-center space-y-6 text-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold md:text-3xl">
            Hi, {learnerName}! 👋
          </h1>
          <p className="text-muted-foreground">Here's your readiness overview</p>
        </div>

        <div className="my-4">
          <ProgressRing score={score} size={160} strokeWidth={18} />
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border px-6 py-3 bg-white/20 ">
          <Sparkles className="h-5 w-5 text-primary" />
          <span className="text-lg font-semibold">{readinessInfo.level}</span>
        </div>

        <p className="max-w-md leading-relaxed text-foreground/80">
          {readinessInfo.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingUp className="h-4 w-4 text-secondary" />
          <span>Keep building your future, one step at a time!</span>
        </div>
      </div>
    </div>
  );
}
