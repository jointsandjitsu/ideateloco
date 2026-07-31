import { useCallback, useEffect, useRef, useState } from "react";
import { ASSISTANT, INITIAL_STEP, STEPS, resolveMessage } from "@/lib/idea/flow";
import type { FlowModel, InputField, Step } from "@/lib/idea/types";
import { MilesVisualizer, type MilesMode } from "@/components/idea/MilesVisualizer";
import { useStageBridge } from "@/components/idea/stage-bridge";
import { IdeateLogo } from "@/components/brand/IdeateLogo";
import { Check, ChevronLeft, Copy, Volume2, VolumeX } from "lucide-react";

type Phase = "typing" | "ready";

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}

function validate(fields: InputField[] | undefined, model: FlowModel): string | null {
  if (!fields?.length) return null;
  for (const f of fields) {
    if (!f.required) continue;
    const val = model[f.name];
    if (f.type === "checkboxes") {
      if (!Array.isArray(val) || val.length === 0) return `Select at least one option for ${f.label}.`;
      continue;
    }
    const s = String(val ?? "").trim();
    if (!s) return `Please fill in ${f.label}.`;
    if (f.type === "email" && !isEmail(s)) return "That email doesn’t look right.";
  }
  return null;
}

export function IdeaAssistant() {
  const [stepId, setStepId] = useState(INITIAL_STEP);
  const [model, setModel] = useState<FlowModel>({});
  const [phase, setPhase] = useState<Phase>("typing");
  const [soundOn, setSoundOn] = useState(false);
  const [audioUnlocked, setAudioUnlocked] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([INITIAL_STEP]);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [checks, setChecks] = useState<Record<string, string[]>>({});
  const [speakLevel, setSpeakLevel] = useState(0);
  const [dialog, setDialog] = useState("");
  const timerRef = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef(model);
  modelRef.current = model;

  const step: Step = STEPS[stepId] ?? STEPS.greeting;
  const isCompact =
    stepId === "intro" ||
    (!!step.autoAdvanceMs && !step.inputs?.length && !step.choices?.length);

  const milesMode: MilesMode = step.isProcessing
    ? "thinking"
    : phase === "typing"
      ? "speaking"
      : step.choices?.length || step.inputs?.length
        ? "listening"
        : "idle";

  const stage = useStageBridge();
  useEffect(() => {
    stage?.setMode(milesMode);
  }, [milesMode, stage]);
  useEffect(() => {
    stage?.setSpeakLevel(speakLevel);
  }, [speakLevel, stage]);
  useEffect(() => {
    stage?.setSeed(stepId);
  }, [stepId, stage]);

  const clearTimers = useCallback(() => {
    if (timerRef.current != null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const goTo = useCallback(
    (id: string, modelPatch?: FlowModel) => {
      clearTimers();
      setError(null);
      setDraft({});
      setChecks({});
      setCopied(false);
      setDialog("");
      if (modelPatch) setModel((m) => ({ ...m, ...modelPatch }));
      setStepId(id);
      setHistory((h) => (h[h.length - 1] === id ? h : [...h, id]));
      setPhase("typing");
      panelRef.current?.scrollTo({ top: 0, behavior: "smooth" });
    },
    [clearTimers],
  );

  const restart = () => {
    clearTimers();
    setModel({});
    setDraft({});
    setChecks({});
    setError(null);
    setDialog("");
    setHistory([INITIAL_STEP]);
    setStepId(INITIAL_STEP);
    setPhase("typing");
  };

  const goBack = () => {
    if (history.length < 2) return;
    const prev = history[history.length - 2]!;
    clearTimers();
    setHistory((h) => h.slice(0, -1));
    setStepId(prev);
    setPhase("typing");
    setError(null);
    setDraft({});
    setChecks({});
    setDialog("");
  };

  // Calm flowing messages via React state (reliable)
  useEffect(() => {
    if (!audioUnlocked) {
      setDialog("");
      return;
    }
    clearTimers();
    const msg = resolveMessage(step, modelRef.current);
    setPhase("typing");
    setSpeakLevel(0.4);
    setDialog(msg);

    const dwell = Math.min(2400, 1000 + msg.length * 14);
    timerRef.current = window.setTimeout(() => {
      setSpeakLevel(0);
      setPhase("ready");
    }, dwell);

    return clearTimers;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepId, audioUnlocked]);

  useEffect(() => {
    if (!audioUnlocked) return;
    if (phase !== "ready") return;
    if (!step.autoAdvanceMs || !step.next) return;
    if (step.inputs?.length || step.choices?.length) return;
    const t = window.setTimeout(() => goTo(step.next!), Math.max(step.autoAdvanceMs, 1600));
    return () => window.clearTimeout(t);
  }, [phase, step, goTo, audioUnlocked]);

  const progress = Math.max(0.04, Math.min(1, step.progress));

  const unlockAudio = () => {
    setAudioUnlocked(true);
    setSoundOn(true);
  };

  const submitInputs = () => {
    if (!step.inputs) return;
    const nextModel: FlowModel = { ...model };
    for (const f of step.inputs) {
      if (f.type === "checkboxes") nextModel[f.name] = checks[f.name] ?? [];
      else nextModel[f.name] = draft[f.name] ?? "";
    }
    const err = validate(step.inputs, nextModel);
    if (err) {
      setError(err);
      return;
    }
    setModel(nextModel);
    if (step.next) goTo(step.next, nextModel);
  };

  const onChoice = async (
    target?: string,
    modelUpdate?: { key: string; value: string },
    copyEmail?: string,
    href?: string,
  ) => {
    if (href) {
      window.location.href = href;
      return;
    }
    if (copyEmail) {
      try {
        await navigator.clipboard.writeText(copyEmail);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2200);
      } catch {
        setError(`Copy failed — email is ${copyEmail}`);
      }
      return;
    }
    const patch = modelUpdate ? { [modelUpdate.key]: modelUpdate.value } : undefined;
    if (target) goTo(target, patch);
  };

  const canContinue =
    phase === "ready" &&
    !step.inputs?.length &&
    !step.choices?.length &&
    !!step.next &&
    !step.autoAdvanceMs;

  const hasChoices = !!(step.choices && step.choices.length);
  const hasInputs = !!(step.inputs && step.inputs.length);

  return (
    <div className="relative h-dvh w-full select-none overflow-hidden bg-bg text-fg" style={{ WebkitUserSelect: "none", userSelect: "none" }}>
      <MilesVisualizer
        compact={isCompact}
        mode={milesMode}
        muted={!soundOn}
        speakLevel={speakLevel}
        seed={stepId}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in oklab, var(--color-bg) 20%, transparent) 0%, transparent 28%, transparent 40%, color-mix(in oklab, var(--color-bg) 40%, transparent) 70%, color-mix(in oklab, var(--color-bg) 94%, transparent) 100%)",
        }}
      />

      <header className="pointer-events-none absolute inset-x-0 top-0 z-50">
        <div className="pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:h-16 sm:px-6">
          <button
            type="button"
            onClick={restart}
            className="flex items-center gap-2.5 text-left"
            aria-label="Restart conversation"
          >
            <IdeateLogo className="h-10 w-10" priority />
            <span className="leading-tight">
              <span className="font-display block text-[13px] font-bold tracking-[0.04em] text-forest sm:text-[14px]">
                IDEATE with Reid Hoffman
              </span>
              <span className="block text-[10px] text-muted">get miles ahead · ARTICULATING VISIONS</span>
            </span>
          </button>
          <div className="rounded-full border border-forest/20 bg-bg/70 px-3 py-1 text-[11px] font-semibold tracking-[0.18em] text-forest uppercase backdrop-blur-sm sm:text-[12px]">
            {ASSISTANT.shortName}
          </div>
        </div>
      </header>


      <div
        className={[
          "pointer-events-none absolute inset-x-0 bottom-0 z-50 flex flex-col transition-[top] duration-500 ease-out",
          isCompact && !hasChoices && !hasInputs
            ? "top-[70%] sm:top-[72%]"
            : hasInputs || hasChoices
              ? "top-[42%] sm:top-[46%]"
              : "top-[58%]",
        ].join(" ")}
      >
        <div className="mx-auto h-full w-full max-w-6xl">
          <div
            ref={panelRef}
            className="pointer-events-auto h-full overflow-y-auto rounded-t-[28px] border border-border/50 border-b-0 bg-bg/95 shadow-[0_-12px_50px_rgba(32,64,41,0.08)] backdrop-blur-sm"
          >
            <div className="mx-auto max-w-3xl px-5 pb-24 pt-7 sm:px-10 sm:pt-9">
              <div className="min-h-[3.2rem]">
                <p
                  key={stepId + dialog.slice(0, 12)}
                  className="idea-rise whitespace-pre-line font-display text-[clamp(1.4rem,3.6vw,2.15rem)] font-bold leading-[1.25] tracking-[-0.02em] text-ink"
                >
                  {dialog}
                </p>
              </div>

              {phase === "ready" && hasInputs && (
                <form
                  className="mt-8 max-w-md space-y-5 idea-rise"
                  onSubmit={(e) => {
                    e.preventDefault();
                    submitInputs();
                  }}
                >
                  {step.inputs!.map((field) => (
                    <Field
                      key={field.name}
                      field={field}
                      draft={draft}
                      setDraft={setDraft}
                      checks={checks}
                      setChecks={setChecks}
                    />
                  ))}
                  {error && (
                    <p className="text-[13px] font-medium text-danger" role="alert">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="inline-flex h-11 items-center justify-center rounded-full bg-forest px-7 text-[13px] font-semibold tracking-wide text-accent-fg shadow-[0_8px_24px_rgba(45,91,58,0.2)] transition-all duration-200 hover:bg-moss active:scale-[0.98]"
                  >
                    Continue
                  </button>
                </form>
              )}

              {phase === "ready" && hasChoices && (
                <div className="mt-8 flex max-w-xl flex-wrap gap-2 idea-rise">
                  {step.choices!.map((c, idx) => {
                    const isCopy = !!c.copyEmail;
                    const showCopied = isCopy && copied;
                    return (
                      <button
                        key={`${c.label}-${idx}`}
                        type="button"
                        onClick={() => onChoice(c.target, c.modelUpdate, c.copyEmail, c.href)}
                        className="inline-flex min-h-11 w-full items-center gap-2 rounded-2xl border border-forest/15 bg-bg-elevated px-4 py-3 text-left text-[13px] font-semibold tracking-wide text-ink shadow-sm transition-all duration-200 hover:border-forest/40 hover:bg-choice-hover active:scale-[0.99] sm:w-auto sm:rounded-full sm:bg-forest sm:px-5 sm:text-accent-fg sm:hover:bg-moss"
                      >
                        {isCopy ? (
                          <>
                            Write us:{" "}
                            <span className="underline underline-offset-2">{c.copyEmail}</span>
                          </>
                        ) : (
                          c.label
                        )}
                        {showCopied ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : isCopy ? (
                          <Copy className="h-3.5 w-3.5 opacity-70" />
                        ) : null}
                      </button>
                    );
                  })}
                  {copied && (
                    <p className="w-full pt-1 text-[12px] text-muted">
                      {ASSISTANT.email} has been copied to the clipboard.
                    </p>
                  )}
                </div>
              )}


              {phase === "ready" &&
                step.autoAdvanceMs &&
                step.next &&
                !hasInputs &&
                !hasChoices && (
                  <p className="mt-6 text-[12px] text-subtle">Taking a breath…</p>
                )}
            </div>
          </div>
        </div>
      </div>

      {audioUnlocked && history.length > 1 && stepId !== "intro" && (
        <button
          type="button"
          onClick={goBack}
          className="absolute bottom-5 left-4 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-forest text-accent-fg shadow-soft transition-transform active:scale-95 sm:bottom-6 sm:left-6"
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {audioUnlocked && (
        <button
          type="button"
          onClick={() => setSoundOn((s) => !s)}
          className="absolute bottom-5 right-4 z-50 flex h-[68px] w-9 flex-col overflow-hidden rounded-full bg-forest sm:bottom-6 sm:right-6"
          aria-label={soundOn ? "Mute MILES" : "Unmute MILES"}
        >
          <span
            className={[
              "flex h-1/2 w-full items-center justify-center",
              soundOn ? "text-bg" : "bg-bg text-forest",
            ].join(" ")}
          >
            <Volume2 className="h-3.5 w-3.5" />
          </span>
          <span
            className={[
              "flex h-1/2 w-full items-center justify-center",
              !soundOn ? "text-bg" : "bg-bg text-forest",
            ].join(" ")}
          >
            <VolumeX className="h-3.5 w-3.5" />
          </span>
        </button>
      )}

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-1 origin-left bg-forest transition-transform duration-500 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}

function Field({
  field,
  draft,
  setDraft,
  checks,
  setChecks,
}: {
  field: InputField;
  draft: Record<string, string>;
  setDraft: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  checks: Record<string, string[]>;
  setChecks: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
}) {
  if (field.type === "checkboxes") {
    const selected = checks[field.name] ?? [];
    return (
      <fieldset>
        <legend className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {field.label}
        </legend>
        <div className="flex flex-wrap gap-2">
          {(field.choices ?? []).map((c) => {
            const on = selected.includes(c.value);
            return (
              <button
                key={c.value}
                type="button"
                onClick={() =>
                  setChecks((prev) => {
                    const cur = prev[field.name] ?? [];
                    const next = on ? cur.filter((x) => x !== c.value) : [...cur, c.value];
                    return { ...prev, [field.name]: next };
                  })
                }
                className={
                  on
                    ? "rounded-full bg-forest px-4 py-2.5 text-[13px] font-medium text-accent-fg"
                    : "rounded-full border border-border bg-bg-elevated px-4 py-2.5 text-[13px] font-medium transition-colors hover:bg-choice-hover"
                }
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }

  const shared =
    "w-full border-0 border-b border-forest/70 bg-transparent px-0 py-2 text-[15px] text-fg outline-none placeholder:text-subtle focus:border-forest";

  if (field.type === "textarea") {
    return (
      <label className="block space-y-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {field.label}
        </span>
        <textarea
          name={field.name}
          rows={4}
          value={draft[field.name] ?? ""}
          onChange={(e) => setDraft((d) => ({ ...d, [field.name]: e.target.value }))}
          placeholder={field.label}
          className={`${shared} min-h-[110px] resize-y leading-relaxed`}
        />
      </label>
    );
  }

  return (
    <label className="block space-y-2">
      <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        {field.label}
      </span>
      <input
        type={field.type === "month" ? "month" : field.type === "email" ? "email" : "text"}
        name={field.name}
        value={draft[field.name] ?? ""}
        onChange={(e) => setDraft((d) => ({ ...d, [field.name]: e.target.value }))}
        placeholder={field.label}
        className={`${shared} h-11`}
        autoComplete={
          field.name === "fullName"
            ? "name"
            : field.name === "email"
              ? "email"
              : field.name === "company"
                ? "organization"
                : field.name === "role"
                  ? "organization-title"
                  : "off"
        }
      />
    </label>
  );
}
