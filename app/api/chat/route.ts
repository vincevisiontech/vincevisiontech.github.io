import type { NextRequest } from "next/server";
import {
  about,
  chatConfig,
  engagementSteps,
  faqs,
  industries,
  services,
  site,
  techStack,
} from "@/content/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/* ----------------------------------------------------------------------------
 * In-memory rate limiting (per IP). Resets on server restart — adequate for
 * a low-volume company site. Swap for Upstash/Redis if traffic grows.
 * -------------------------------------------------------------------------- */
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5;
const buckets = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = buckets.get(ip);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (bucket.count >= MAX_REQUESTS) return false;
  bucket.count += 1;
  return true;
}

// Periodic cleanup so the map cannot grow unbounded.
if (!globalThis.vvRateLimitCleaner) {
  globalThis.vvRateLimitCleaner = setInterval(() => {
    const now = Date.now();
    for (const [key, value] of buckets) {
      if (value.resetAt < now) buckets.delete(key);
    }
  }, WINDOW_MS);
  // Don't keep the event loop alive solely for cleanup.
  globalThis.vvRateLimitCleaner.unref?.();
}

/* ----------------------------------------------------------------------------
 * System prompt — generated from the single content source, so the assistant
 * can never drift from what is published on the site.
 * -------------------------------------------------------------------------- */
function buildSystemPrompt(): string {
  const serviceLines = services
    .map((s) => `- ${s.title}: ${s.summary} Capabilities: ${s.points.join("; ")}.`)
    .join("\n");
  const industryLines = industries.map((i) => `- ${i.name}: ${i.summary}`).join("\n");
  const faqLines = faqs.map((f) => `- Q: ${f.q} A: ${f.a}`).join("\n");

  return `You are the website assistant for ${site.name}, a cross-continent technology company headquartered in Kenya and the United Kingdom, led by founder and CEO ${about.ceo.name} (${about.ceo.role}).

SCOPE RULES:
- Answer ONLY questions about ${site.shortName}: its services, industries, process, regions, leadership, testimonials, and contact details.
- For anything off-topic (general knowledge, coding help, other companies, personal opinions, politics), politely decline with exactly this meaning: ${chatConfig.offTopicMessage}
- Never invent figures, clients, awards, addresses, or metrics. If information is not in the facts below, say so and offer the email/WhatsApp channels.
- Be concise (aim for 60-110 words), precise, and enterprise-credible. No hype, no emojis.
- Always end with a relevant next step using these channels when the user seems ready to engage: email ${site.email} or WhatsApp ${site.whatsapp.display}.

COMPANY FACTS:
Description: ${site.description}
Regions: Kenya (Nairobi, Africa/Nairobi) and United Kingdom (London, Europe/London).
Contact: email ${site.email}; WhatsApp ${site.whatsapp.display} (${site.whatsapp.waLink}). No public contact forms.
Engagement process: ${engagementSteps.join(" ")}
About: ${about.paragraphs.join(" ")}
Tech stack includes: ${techStack.join(", ")}.

SERVICES:
${serviceLines}

INDUSTRIES:
${industryLines}

FAQ:
${faqLines}
${process.env.ANTHROPIC_SYSTEM_SUFFIX ? `\nAdditional guidance: ${process.env.ANTHROPIC_SYSTEM_SUFFIX}` : ""}`;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

function sse(payload: unknown) {
  return `data: ${JSON.stringify(payload)}\n\n`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Assistant is not configured. Use email or WhatsApp instead." },
      { status: 503 }
    );
  }

  const ip = getClientIp(req);
  if (!rateLimit(ip)) {
    return Response.json(
      { error: "Rate limit exceeded. Please wait a few minutes or contact us directly." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  const valid = messages
    .filter(
      (m): m is ChatMessage =>
        (m.role === "user" || m.role === "assistant") && typeof m.content === "string"
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1200) }));

  if (valid.length === 0 || valid[valid.length - 1].role !== "user") {
    return Response.json({ error: "A user message is required." }, { status: 400 });
  }

  const encoder = new TextEncoder();
  const model = process.env.ANTHROPIC_MODEL || "claude-sonnet-4-5";

  let upstream: Response;
  try {
    upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model,
        max_tokens: 600,
        system: buildSystemPrompt(),
        messages: valid,
        stream: true,
      }),
    });
  } catch (err) {
    console.error("Anthropic API unreachable:", err);
    return Response.json({ error: "AI service is temporarily unreachable." }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => "");
    console.error("Anthropic API error:", upstream.status, detail);
    return Response.json({ error: "Upstream AI service unavailable." }, { status: 502 });
  }

  const reader = upstream.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) {
            controller.enqueue(encoder.encode(sse("[DONE]")));
            controller.close();
            return;
          }
          buffer += decoder.decode(value, { stream: true });
          const rawEvents = buffer.split("\n\n");
          buffer = rawEvents.pop() ?? "";

          for (const raw of rawEvents) {
            const dataLine = raw
              .split("\n")
              .find((line) => line.startsWith("data: "));
            if (!dataLine) continue;
            try {
              const evt = JSON.parse(dataLine.slice(6));
              if (evt.type === "content_block_delta" && evt.delta?.type === "text_delta") {
                controller.enqueue(encoder.encode(sse({ delta: evt.delta.text })));
              }
              if (evt.type === "error") {
                controller.enqueue(encoder.encode(sse({ error: "AI service error." })));
                controller.close();
                return;
              }
            } catch {
              // Ignore malformed SSE fragments.
            }
          }
        }
      } catch (err) {
        console.error("Chat stream failed:", err);
        controller.enqueue(encoder.encode(sse({ error: "Stream interrupted." })));
        controller.close();
      }
    },
    cancel() {
      reader.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
