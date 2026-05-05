"use client";

import { useRouter } from "next/navigation";
import GeneratingScreen from "@/components/GeneratingScreen";

export default function GeneratingPage() {
  const router = useRouter();
  return <GeneratingScreen videoSrc="/generating-bg.mp4" onComplete={() => router.push("/reveal")} />;
}
