'use client';

import { useShowMeTheMoney } from "@/hooks/useShowMeTheMoney";
import { useEffect } from "react";

export default function ClientProvider({ children }: { children: React.ReactNode }) {
  const { progress, isActivated } = useShowMeTheMoney();
  
  useEffect(() => {
    // Visual feedback in console for progress (remove in production)
    if (progress > 0 && progress < 100) {
      console.log(`🔐 Secret progress: ${progress}%`);
    }
    if (isActivated) {
      console.log("⚡️ GOD MODE ACTIVATED! Mike & Mike have entered the building!");
    }
  }, [progress, isActivated]);
  
  return <>{children}</>;
}