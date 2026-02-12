import type { ReadinessData } from "@/utils/readiness";

// Static JSON import is great for prototyping. When you move to a real API/DB,
// keep the same return shape and swap the implementation.
import readinessJson from "@/data/readiness.json";

export async function getReadinessData(): Promise<ReadinessData> {
  return readinessJson as ReadinessData;
}
