import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { MilesMode } from "@/components/idea/MilesVisualizer";

type StageState = {
  mode: MilesMode;
  speakLevel: number;
  seed: string;
  setMode: (m: MilesMode) => void;
  setSpeakLevel: (n: number) => void;
  setSeed: (s: string) => void;
};

const Ctx = createContext<StageState | null>(null);

export function StageBridgeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<MilesMode>("idle");
  const [speakLevel, setSpeakLevel] = useState(0);
  const [seed, setSeed] = useState("intro");
  const value = useMemo(
    () => ({ mode, speakLevel, seed, setMode, setSpeakLevel, setSeed }),
    [mode, speakLevel, seed],
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStageBridge() {
  return useContext(Ctx);
}
