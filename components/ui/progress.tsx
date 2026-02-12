"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

type ProgressVariant = "auto" | "primary" | "success" | "warning" | "danger"

type Props = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  variant?: ProgressVariant
}

function normalizeToPercent(value?: number | null) {
  const raw = typeof value === "number" ? value : 0
  const asPercent = raw > 0 && raw <= 1 ? raw * 100 : raw
  return Math.min(Math.max(asPercent, 0), 100)
}

function autoVariantFromValue(v: number): Exclude<ProgressVariant, "auto"> {
  if (v >= 80) return "success"
  if (v >= 50) return "primary"
  if (v >= 25) return "warning"
  return "danger"
}

function getTierColorVar(v: Exclude<ProgressVariant, "auto">) {
  if (v === "success") return "--secondary"
  if (v === "warning") return "--accent"
  if (v === "danger") return "--destructive"
  return "--primary"
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Props
>(({ className, value, variant = "auto", ...props }, ref) => {
  const v = normalizeToPercent(value)
  const resolved = variant === "auto" ? autoVariantFromValue(v) : variant

  const tierVar = getTierColorVar(resolved)
  const tierHsl = `hsl(var(${tierVar}))`

  const trackClass =
    resolved === "success"
      ? "bg-secondary/20"
      : resolved === "warning"
      ? "bg-accent/25"
      : resolved === "danger"
      ? "bg-destructive/20"
      : "bg-primary/20"

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full",
        trackClass,
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full transition-all rounded-full"
        style={{
          transform: `translateX(-${100 - v}%)`,
          background: `linear-gradient(
            to right,
            ${tierHsl} 0%,
            ${tierHsl} 55%,
            ${tierHsl} 100%
          )`,
          opacity: 1,
        }}
      />
    </ProgressPrimitive.Root>
  )
})

Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }