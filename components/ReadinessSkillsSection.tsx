"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useMemo, useState } from "react"

import { SkillCard } from "@/components/SkillCard"
import { DetailedView } from "@/components/DetailedView"
import { ViewToggle } from "@/components/ViewToggle"
import { cn } from "@/lib/utils"
import type { SkillArea } from "@/utils/readiness"

type Props = {
  skillAreas: SkillArea[]
  defaultView?: "summary" | "detailed"
  title?: string
  subtitle?: string
  className?: string
  enableSearch?: boolean
}

export function ReadinessSkillsSection({
  skillAreas,
  defaultView = "summary",
  title = "Your Skill Areas",
  subtitle = "Track your progress across different areas",
  className,
  enableSearch = true,
}: Props) {
  const router = useRouter()
  const [viewMode, setViewMode] = useState<"summary" | "detailed">(defaultView)
  const [query, setQuery] = useState("")

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return skillAreas
    return skillAreas.filter((s) => {
      const hay = `${s.name} ${s.description} ${s.id}`.toLowerCase()
      return hay.includes(q)
    })
  }, [skillAreas, query])

  return (
    <section className={cn("space-y-6", className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="text-sm text-muted-foreground">
            <Link href="/" className="hover:underline">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <span>Skills Overview</span>
          </div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="flex items-center gap-3">
          {enableSearch && (
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search skills…"
                className="h-10 w-64 rounded-md border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          )}
          <ViewToggle view={viewMode} onViewChange={setViewMode} />
        </div>
      </div>

      {viewMode === "summary" ? (
        <div className="grid gap-6 md:grid-cols-2">
          {filtered.map((skill, index) => (
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
          skillAreas={filtered}
          onSkillClick={(skillId) => router.push(`/readiness/${skillId}`)}
        />
      )}
    </section>
  )
}