import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  IDEATE_BASE_INBOX,
  ideateClientInbox,
  resolveClientName,
} from "@/lib/ideate/mail-routing";

const LeadSchema = z.object({
  goal: z.string().optional(),
  fullName: z.string().optional(),
  company: z.string().optional(),
  email: z.string().email().or(z.literal("")).optional(),
  role: z.string().optional(),
  budget: z.string().optional(),
  deadline: z.string().optional(),
  message: z.string().optional(),
  services: z.array(z.string()).optional(),
  source: z.string().default("miles"),
  stepId: z.string().optional(),
  /** Free-form prep / workspace notes */
  notes: z.record(z.string(), z.string()).optional(),
  extra: z.record(z.string(), z.unknown()).optional(),
});

export type LeadPayload = z.infer<typeof LeadSchema>;

function formatBody(data: LeadPayload, route: ReturnType<typeof ideateClientInbox>) {
  const lines = [
    `IDEATE lead · ${route.label}`,
    `Routed to: ${route.display}`,
    `Deliverable To: ${route.email}`,
    `Mirror: ${route.base}`,
    `Source: ${data.source}`,
    data.stepId ? `Step: ${data.stepId}` : null,
    data.goal ? `Goal: ${data.goal}` : null,
    "",
    `Name: ${data.fullName || "—"}`,
    `Company: ${data.company || "—"}`,
    `Email: ${data.email || "—"}`,
    data.role ? `Role: ${data.role}` : null,
    data.budget ? `Budget: ${data.budget}` : null,
    data.deadline ? `Deadline: ${data.deadline}` : null,
    data.services?.length ? `Services: ${data.services.join(", ")}` : null,
    "",
    "Message / brief:",
    data.message || "—",
  ];

  if (data.notes && Object.keys(data.notes).length) {
    lines.push("", "Workspace notes:");
    for (const [k, v] of Object.entries(data.notes)) {
      if (v?.trim()) lines.push(`- ${k}: ${v}`);
    }
  }

  if (data.extra) {
    lines.push("", "Extra:");
    lines.push(JSON.stringify(data.extra, null, 2));
  }

  lines.push("", `Submitted: ${new Date().toISOString()}`);
  return lines.filter((l) => l !== null).join("\n");
}

async function deliverViaFormSubmit(opts: {
  to: string;
  replyTo?: string;
  subject: string;
  body: string;
  name: string;
  fields: Record<string, string>;
}): Promise<{ ok: boolean; detail: string }> {
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(opts.to)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: opts.name,
        email: opts.replyTo || IDEATE_BASE_INBOX,
        _subject: opts.subject,
        _replyto: opts.replyTo || IDEATE_BASE_INBOX,
        _template: "table",
        message: opts.body,
        ...opts.fields,
      }),
    });
    const text = await res.text();
    if (!res.ok) return { ok: false, detail: `formsubmit ${res.status}: ${text.slice(0, 200)}` };
    return { ok: true, detail: text.slice(0, 200) };
  } catch (e) {
    return { ok: false, detail: e instanceof Error ? e.message : "send failed" };
  }
}

async function persistSubmission(record: Record<string, unknown>) {
  try {
    const { mkdir, appendFile } = await import("node:fs/promises");
    await mkdir("/workspace/data", { recursive: true });
    await appendFile(
      "/workspace/data/ideate-submissions.jsonl",
      `${JSON.stringify({ ...record, at: new Date().toISOString() })}\n`,
      "utf8",
    );
    return true;
  } catch {
    return false;
  }
}

/**
 * Server: route a MILES / workspace lead to IDEATE(client)@reidhoffman.com
 * (plus-address + base mirror). Always persists a local copy.
 */
export const submitIdeateLead = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => LeadSchema.parse(raw))
  .handler(async ({ data }) => {
    const clientName = resolveClientName(data as Record<string, unknown>);
    const route = ideateClientInbox(clientName);
    const subject = `${route.label} · ${data.goal || data.source || "lead"} · ${data.fullName || clientName}`;
    const body = formatBody(data, route);
    const replyTo = data.email && data.email.includes("@") ? data.email : undefined;

    const fields: Record<string, string> = {
      client_label: route.label,
      client_route: route.display,
      client_email_to: route.email,
      goal: data.goal || "",
      company: data.company || "",
      fullName: data.fullName || "",
      client_email: data.email || "",
    };

    // 1) Primary: client-specific plus address
    const primary = await deliverViaFormSubmit({
      to: route.email,
      replyTo,
      subject,
      body,
      name: data.fullName || clientName,
      fields,
    });

    // 2) Mirror: base inbox (never miss a lead)
    const mirror = await deliverViaFormSubmit({
      to: IDEATE_BASE_INBOX,
      replyTo,
      subject: `[mirror] ${subject}`,
      body,
      name: data.fullName || clientName,
      fields: { ...fields, mirror: "true" },
    });

    const saved = await persistSubmission({
      route,
      subject,
      data,
      primary,
      mirror,
    });

    return {
      ok: primary.ok || mirror.ok || saved,
      routedTo: route.display,
      deliverable: route.email,
      base: route.base,
      primaryOk: primary.ok,
      mirrorOk: mirror.ok,
      saved,
    };
  });
