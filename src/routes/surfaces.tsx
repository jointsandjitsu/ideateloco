import { createFileRoute, redirect } from "@tanstack/react-router";

/** Surfaces directory removed — embeds live on Schedule / Book / Talk */
export const Route = createFileRoute("/surfaces")({
  beforeLoad: () => {
    throw redirect({ to: "/schedule" });
  },
});
