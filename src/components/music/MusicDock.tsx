import { useEffect, useRef, useState } from "react";
import { Pause, Play, Disc3 } from "lucide-react";

/** So What first — Kind of Blue energy (Archive.org streams, in-app only) */
const TRACKS = [
  {
    title: "So What",
    album: "Kind of Blue · Miles Davis",
    src: "https://archive.org/download/milesdavis-kindofblueexpanded/01%20-%20So%20What.mp3",
  },
  {
    title: "Freddie Freeloader",
    album: "Kind of Blue · Miles Davis",
    src: "https://archive.org/download/milesdavis-kindofblueexpanded/02%20-%20Freddie%20Freeloader.mp3",
  },
  {
    title: "Blue in Green",
    album: "Kind of Blue · Miles Davis",
    src: "https://archive.org/download/milesdavis-kindofblueexpanded/03%20-%20Blue%20in%20Green.mp3",
  },
  {
    title: "All Blues",
    album: "Kind of Blue · Miles Davis",
    src: "https://archive.org/download/milesdavis-kindofblueexpanded/04%20-%20All%20Blues.mp3",
  },
  {
    title: "Flamenco Sketches",
    album: "Kind of Blue · Miles Davis",
    src: "https://archive.org/download/milesdavis-kindofblueexpanded/05%20-%20Flamenco%20Sketches.mp3",
  },
];

export function MusicDock() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const track = TRACKS[idx]!;

  useEffect(() => {
    const a = new Audio();
    a.preload = "none";
    a.volume = 0.45;
    a.crossOrigin = "anonymous";
    audioRef.current = a;
    const onEnded = () => setIdx((i) => (i + 1) % TRACKS.length);
    a.addEventListener("ended", onEnded);
    return () => {
      a.pause();
      a.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.src = TRACKS[idx]!.src;
    if (playing) {
      void a.play().catch(() => setPlaying(false));
    }
  }, [idx]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (!a.src) a.src = track.src;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <div className="pointer-events-auto fixed bottom-20 right-4 z-[80] sm:bottom-24 sm:right-6">
      {open && (
        <div className="mb-2 w-[min(300px,calc(100vw-2rem))] rounded-2xl border border-border/70 bg-bg/95 p-3 shadow-soft backdrop-blur-md">
          <p className="text-[10px] font-semibold tracking-[0.14em] text-forest uppercase">Soundtrack</p>
          <p className="font-display mt-1 text-[15px] font-bold text-ink">{track.title}</p>
          <p className="text-[11px] text-muted">{track.album}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {TRACKS.map((t, i) => (
              <button
                key={t.title}
                type="button"
                onClick={() => {
                  setIdx(i);
                  setPlaying(true);
                }}
                className={[
                  "rounded-full px-2.5 py-1 text-[10px] font-medium",
                  i === idx ? "bg-forest text-accent-fg" : "bg-choice-hover text-muted",
                ].join(" ")}
              >
                {t.title}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center gap-2 rounded-full border border-border/70 bg-bg/95 py-1.5 pr-2 pl-1.5 shadow-soft backdrop-blur-md">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-forest text-accent-fg"
          aria-label="Open music"
        >
          <Disc3 className={["h-4 w-4", playing ? "animate-spin" : ""].join(" ")} style={{ animationDuration: "3s" }} />
        </button>
        <div className="min-w-0 max-w-[140px]">
          <p className="truncate text-[11px] font-semibold text-ink">{track.title}</p>
          <p className="truncate text-[9px] text-muted">Kind of Blue</p>
        </div>
        <button
          type="button"
          onClick={toggle}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-forest/20 text-forest"
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
        </button>
      </div>
    </div>
  );
}
