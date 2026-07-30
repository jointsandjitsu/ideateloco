import { createFileRoute, Link } from "@tanstack/react-router";
import { CornerBrand } from "@/components/brand/CornerBrand";
import { IdeaAssistant } from "@/components/idea/IdeaAssistant";
import { ChevronLeft } from "lucide-react";

export const Route = createFileRoute("/talk")({
  component: TalkPage,
  head: () => ({
    meta: [
      { title: "Talk with MILES | IDEATE with Reid Hoffman" },
      {
        name: "description",
        content:
          "Talk with MILES — IDEATE's Interactive Super Assistant. Start a project, join the team, or just say hello.",
      },
    ],
  }),
});

function TalkPage() {
  return (
    <div className="relative h-dvh overflow-hidden">
      <Link
        to="/"
        className="absolute top-4 left-4 z-50 flex items-center gap-1 rounded-full border border-forest/20 bg-bg/90 px-3 py-1.5 text-[11px] font-semibold tracking-wide text-forest backdrop-blur-md sm:top-5 sm:left-5"
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        IDEATE
      </Link>
      <IdeaAssistant />
      <div className="pointer-events-none absolute bottom-5 left-4 z-50 sm:bottom-6 sm:left-6">
        <div className="rounded-full border border-border/60 bg-bg/90 px-3 py-1.5 shadow-soft backdrop-blur-md">
          <CornerBrand />
        </div>
      </div>
    </div>
  );
}
