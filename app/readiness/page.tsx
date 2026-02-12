import { getReadinessData } from "@/lib/readiness-data"
import { ReadinessSkillsSection } from "@/components/ReadinessSkillsSection"

export default async function ReadinessOverviewPage() {
  const data = await getReadinessData()

  return (
    <main className="mx-auto max-w-5xl space-y-6">

      <ReadinessSkillsSection
        skillAreas={data.skillAreas as any}
        defaultView="summary"
        enableSearch
      />
    </main>
  )
}