"use client";

import { useEffect, useMemo, useState, useId } from "react";
import { cn } from "@/lib/utils";

type ProgressVariant = "auto" | "primary" | "success" | "warning" | "danger";

type ProgressRingProps = {
  value?: number;
  score?: number;
  size?: number;
  strokeWidth?: number;
  variant?: ProgressVariant;
  showLabel?: boolean;
  className?: string;
};

function normalizeToPercent(value?: number | null) {
  const raw = typeof value === "number" ? value : 0;
  const asPercent = raw > 0 && raw <= 1 ? raw * 100 : raw;
  return Math.min(Math.max(asPercent, 0), 100);
}

function autoVariantFromScore(v: number): Exclude<ProgressVariant, "auto"> {
  if (v >= 80) return "success";
  if (v >= 50) return "primary";
  if (v >= 25) return "warning";
  return "danger";
}

function getTierColorVar(v: Exclude<ProgressVariant, "auto">) {
  if (v === "success") return "--secondary";
  if (v === "warning") return "--accent";
  if (v === "danger") return "--destructive";
  return "--primary";
}

export function ProgressRing({
  value,
  score,
  size = 180,
  strokeWidth = 20,
  variant = "auto",
  showLabel = true,
  className,
}: ProgressRingProps) {
  const target =
    typeof value === "number"
      ? value
      : typeof score === "number"
      ? score
      : 0;

  const clamped = normalizeToPercent(target);

  const resolvedVariant = useMemo(() => {
    return variant === "auto" ? autoVariantFromScore(clamped) : variant;
  }, [variant, clamped]);

  const tierVar = getTierColorVar(resolvedVariant);
  const tierHsl = `hsl(var(${tierVar}))`;

  const trackStroke =
    resolvedVariant === "success"
      ? "hsl(var(--secondary) / 0.20)"
      : resolvedVariant === "warning"
      ? "hsl(var(--accent) / 0.25)"
      : resolvedVariant === "danger"
      ? "hsl(var(--destructive) / 0.20)"
      : "hsl(var(--primary) / 0.20)";

  const [progress, setProgress] = useState(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let start: number | null = null;
    const duration = 900;

    const animate = (timestamp: number) => {
      if (start === null) start = timestamp;
      const elapsed = timestamp - start;
      const t = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - t, 3);
      const current = eased * clamped;

      setProgress(current);
      setDisplayValue(Math.round(current));

      if (t < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [clamped]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress / 100);

  // ✅ FIXED: deterministic id for SSR + client
  const reactId = useId();
  const gradientId = useMemo(
    () => `ring-grad-${reactId.replace(/[:]/g, "")}`,
    [reactId]
  );

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Progress ${displayValue}%`}
    >
      <svg width={size} height={size} className="block">
        <defs>
          <linearGradient
            id={gradientId}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={tierHsl} stopOpacity="1" />
            <stop offset="55%" stopColor={tierHsl} stopOpacity="0.45" />
            <stop offset="100%" stopColor={tierHsl} stopOpacity="0.18" />
          </linearGradient>
        </defs>

        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={trackStroke}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
          />
        </g>
      </svg>

      {showLabel && (
        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-foreground">
            {displayValue}%
          </span>
        </div>
      )}
    </div>
  );
}