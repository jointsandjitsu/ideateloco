import { createFileRoute, redirect } from "@tanstack/react-router";

/** Book path retired — About holds the name/vision note */
export const Route = createFileRoute("/book")({
  beforeLoad: () => {
    throw redirect({ to: "/about" });
  },
});
