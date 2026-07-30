/**
 * IDEATE mail routing for @reidhoffman.com
 *
 * Owner catch-all: anything @reidhoffman.com lands with Reid.
 * Per-client addressing (human form):
 *   IDEATE(ClientName)@reidhoffman.com
 * SMTP-safe plus-address (works with Gmail / Workspace / most hosts):
 *   ideate+clientname@reidhoffman.com
 * Always mirrored to the base inbox:
 *   ideate@reidhoffman.com
 */

export const IDEATE_BASE_INBOX = "ideate@reidhoffman.com";
export const DOMAIN = "reidhoffman.com";

/** Slug for plus-address local-part */
export function slugifyClient(name: string): string {
  const s = name
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return s || "lead";
}

/** Human label: IDEATE(Acme Corp) */
export function ideateClientLabel(clientName: string): string {
  const clean = clientName.trim().replace(/[()<>@]/g, "") || "Client";
  return `IDEATE(${clean})`;
}

/**
 * Full addressing for a client submission.
 * display — how we talk about the route (and use in subjects)
 * email   — deliverable To: (plus addressing)
 * base    — always-on mirror inbox
 */
export function ideateClientInbox(clientName: string): {
  display: string;
  email: string;
  base: string;
  label: string;
  slug: string;
} {
  const label = ideateClientLabel(clientName);
  const slug = slugifyClient(clientName);
  return {
    label,
    slug,
    display: `${label}@${DOMAIN}`,
    email: `ideate+${slug}@${DOMAIN}`,
    base: IDEATE_BASE_INBOX,
  };
}

/** Pick best client identifier from a lead model */
export function resolveClientName(model: Record<string, unknown>): string {
  const company = String(model.company ?? "").trim();
  const fullName = String(model.fullName ?? model.name ?? "").trim();
  const email = String(model.email ?? "").trim();
  if (company) return company;
  if (fullName) return fullName;
  if (email.includes("@")) return email.split("@")[0] ?? "lead";
  return "lead";
}
