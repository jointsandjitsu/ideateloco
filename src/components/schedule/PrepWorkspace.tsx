import { useEffect, useState } from "react";
import { POST_TASKS, PREP_TASKS } from "@/lib/ideate/calendly";
import { Check, Circle } from "lucide-react";

const STORAGE_KEY = "ideate-call-workspace-v1";

type Store = {
  prep: Record<string, string>;
  post: Record<string, string>;
  done: Record<string, boolean>;
};

function load(): Store {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Store;
  } catch {
    /* ignore */
  }
  return { prep: {}, post: {}, done: {} };
}

export function PrepWorkspace({ phase = "before" }: { phase?: "before" | "after" }) {
  const [store, setStore] = useState<Store>({ prep: {}, post: {}, done: {} });
  const tasks = phase === "before" ? PREP_TASKS : POST_TASKS;
  const bucket = phase === "before" ? "prep" : "post";

  useEffect(() => {
    setStore(load());
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch {
      /* ignore */
    }
  }, [store]);

  const setNote = (id: string, value: string) => {
    setStore((s) => ({
      ...s,
      [bucket]: { ...s[bucket], [id]: value },
    }));
  };

  const toggle = (id: string) => {
    setStore((s) => ({
      ...s,
      done: { ...s.done, [id]: !s.done[id] },
    }));
  };

  const completed = tasks.filter((t) => store.done[t.id]).length;

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.16em] text-forest uppercase">
            {phase === "before" ? "Before the call" : "After the call"}
          </p>
          <h3 className="font-display mt-1 text-[1.25rem] font-bold">
            {phase === "before" ? "Get ready — make the hour count" : "Ship the follow-through"}
          </h3>
        </div>
        <p className="font-mono text-[12px] text-muted">
          {completed}/{tasks.length} done
        </p>
      </div>

      <ul className="space-y-3">
        {tasks.map((t) => {
          const on = !!store.done[t.id];
          const note = store[bucket][t.id] ?? "";
          return (
            <li
              key={t.id}
              className={[
                "rounded-2xl border p-4 transition-colors sm:p-5",
                on ? "border-forest/40 bg-forest/5" : "border-border bg-bg-elevated/90",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <button
                  type="button"
                  onClick={() => toggle(t.id)}
                  className="mt-0.5 shrink-0 text-forest"
                  aria-label={on ? "Mark incomplete" : "Mark complete"}
                >
                  {on ? <Check className="h-5 w-5" /> : <Circle className="h-5 w-5 opacity-40" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className="text-[15px] font-semibold text-ink">{t.title}</p>
                  <p className="mt-0.5 text-[13px] text-muted">{t.blurb}</p>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(t.id, e.target.value)}
                    rows={2}
                    placeholder="Notes…"
                    className="mt-3 w-full resize-y rounded-xl border border-border bg-bg px-3 py-2 text-[14px] outline-none focus:border-forest"
                  />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
