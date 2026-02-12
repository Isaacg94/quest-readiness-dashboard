import type { ScoreLevel } from "@/utils/readiness";

export function getReadinessLevel(score: number): {
  level: string;
  description: string;
  color: "success" | "primary" | "warning" | "danger";
} {
  if (score >= 80) {
    return {
      level: "Thriving",
      description: "Outstanding progress! You're excelling across multiple areas.",
      color: "success",
    };
  }

  if (score >= 50) {
    return {
      level: "Building Momentum",
      description: "You're making steady progress. Keep up the consistent effort!",
      color: "primary",
    };
  }

  if (score >= 25) {
    return {
      level: "Getting Started",
      description: "Good foundation. Focus on growth areas to accelerate progress.",
      color: "warning",
    };
  }

  return {
    level: "Beginning Journey",
    description: "Every expert started here. Let's build your path together!",
    color: "danger",
  };
}

export type ProgressVariant = "auto" | "primary" | "success" | "warning" | "danger";

export const READINESS_THRESHOLDS = {
  success: 80,
  primary: 50,
  warning: 25,
} as const;

export function normalizeToPercent(value?: number | null) {
  const raw = typeof value === "number" ? value : 0;
  const asPercent = raw > 0 && raw <= 1 ? raw * 100 : raw;
  return Math.min(Math.max(asPercent, 0), 100);
}

export function autoVariantFromScorePercent(
  percent: number
): Exclude<ProgressVariant, "auto"> {
  if (percent >= READINESS_THRESHOLDS.success) return "success";
  if (percent >= READINESS_THRESHOLDS.primary) return "primary";
  if (percent >= READINESS_THRESHOLDS.warning) return "warning";
  return "danger";
}

export function getTierColorVar(variant: Exclude<ProgressVariant, "auto">) {
  if (variant === "success") return "--secondary";
  if (variant === "warning") return "--accent";
  if (variant === "danger") return "--destructive";
  return "--primary";
}

export function getTierHsl(variant: Exclude<ProgressVariant, "auto">) {
  const tierVar = getTierColorVar(variant);
  return `hsl(var(${tierVar}))`;
}

export function getTrackStroke(variant: Exclude<ProgressVariant, "auto">) {
  return variant === "success"
    ? "hsl(var(--secondary) / 0.20)"
    : variant === "warning"
    ? "hsl(var(--accent) / 0.25)"
    : variant === "danger"
    ? "hsl(var(--destructive) / 0.20)"
    : "hsl(var(--primary) / 0.20)";
}

export function getTrackClass(variant: Exclude<ProgressVariant, "auto">) {
  return variant === "success"
    ? "bg-secondary/20"
    : variant === "warning"
    ? "bg-accent/25"
    : variant === "danger"
    ? "bg-destructive/20"
    : "bg-primary/20";
}

export function getScoreLevel(score: number): ScoreLevel {
  if (score >= 80) return "excellent";
  if (score >= 50) return "good";
  if (score >= 25) return "developing";
  return "needs-focus";
}

export function calculateOverallScore(skillAreas: Array<{ score: number }>): number {
  if (skillAreas.length === 0) return 0;
  const sum = skillAreas.reduce((acc, area) => acc + area.score, 0);
  return Math.round(sum / skillAreas.length);
}

export function getScoreColor(score: number): string {
  const level = getScoreLevel(score);
  const colorMap: Record<ScoreLevel, string> = {
    excellent: "text-secondary",
    good: "text-primary",
    developing: "text-accent",
    "needs-focus": "text-destructive",
  };
  return colorMap[level];
}

export function getScoreBgColor(score: number): string {
  const level = getScoreLevel(score);
  const colorMap: Record<ScoreLevel, string> = {
    excellent: "bg-secondary/10",
    good: "bg-primary/10",
    developing: "bg-accent/10",
    "needs-focus": "bg-destructive/10",
  };
  return colorMap[level];
}

export function formatActivityDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export function getTrendMessage(trend: "up" | "down" | "stable"): string {
  const messages = {
    up: "Great progress! Keep it up! 📈",
    stable: "Stay consistent to see improvement 💪",
    down: "Let's focus here together 🎯",
  };
  return messages[trend];
}

export function getCompletionPercentage(completed: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((completed / total) * 100);
}
