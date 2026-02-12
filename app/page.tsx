import DashboardClient from "@/components/DashboardClient";
import { getReadinessData } from "@/lib/readiness-data";

export default async function Page() {
  const data = await getReadinessData();
  return <DashboardClient data={data} />;
}
