"use client";
import './generating.css';

import { useRouter } from "next/navigation";
import GeneratingScreen from "@/components/GeneratingScreen";
import { setCurrentStep } from "@/lib/storage";

export default function GeneratingPage() {
  const router = useRouter();
  return (
    <GeneratingScreen
      videoSrc="/generating-bg.mp4"
      onComplete={() => { setCurrentStep("reveal"); router.push("/reveal"); }}
    />
  );
}
