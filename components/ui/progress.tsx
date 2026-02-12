"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import {
  type ProgressVariant,
  normalizeToPercent,
  autoVariantFromScorePercent,
  getTierHsl,
  getTrackClass,
} from "@/utils/readiness-calculator";

type Props = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  variant?: ProgressVariant;
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Props
>(({ className, value, variant = "auto", ...props }, ref) => {
  const v = normalizeToPercent(value);

  const resolved = variant === "auto" ? autoVariantFromScorePercent(v) : variant;

  const tierHsl = getTierHsl(resolved);
  const trackClass = getTrackClass(resolved);

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
  );
});

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };