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
