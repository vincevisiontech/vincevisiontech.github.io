"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { chatConfig, site } from "@/content/site";
import { useExperience } from "@/components/providers/experience";

type Message = { role: "user" | "assistant"; content: string };
const MIN_GAP_MS = 2500;
const MAX_MESSAGES = 12;

/**
 * Terminal-style streaming console for the Claude /api/chat route.
 * Works in two variants: embedded "section" (Live Demo) and floating "panel".
 * Any failure degrades to the email/WhatsApp fallback channels.
 */
export function VinceConsole({ variant = "section" }: { variant?: "section" | "panel" }) {
  const { blip } = useExperience();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [fallback, setFallback] = useState(false);
  const lastSend = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages]);

  async function submit(e: FormEvent) {
    e.preventDefault();
    const question = input.trim();
    if (!question || streaming) return;
    if (Date.now() - lastSend.current < MIN_GAP_MS) return;
    lastSend.current = Date.now();

    const history = [...messages, { role: "user" as const, content: question }].slice(-MAX_MESSAGES);
    setMessages(history);
    setInput("");
    setStreaming(true);
    setFallback(false);
    setMessages((prev) => [...prev, { role: "assistant", content: "" }]);
    blip(920);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });
      if (!res.ok || !res.body) throw new Error(`chat ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() ?? "";
        for (const raw of chunks) {
          const line = raw.replace(/^data: /, "").trim();
          if (!line || line === "[DONE]") continue;
          const evt = JSON.parse(line) as { delta?: string; error?: string };
          if (evt.error) throw new Error(evt.error);
          if (evt.delta) {
            setMessages((prev) => {
              const next = [...prev];
              const last = next[next.length - 1];
              if (last?.role === "assistant") {
                next[next.length - 1] = { ...last, content: last.content + evt.delta };
              }
              return next;
            });
          }
        }
      }
    } catch {
      setFallback(true);
      setMessages((prev) => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === "assistant") {
          next[next.length - 1] = { ...last, content: chatConfig.fallbackMessage };
        }
        return next;
      });
    } finally {
      setStreaming(false);
      inputRef.current?.focus();
    }
  }

  const shell =
    variant === "section"
      ? "vv-holo h-[520px]"
      : "h-full";

  return (
    <div className={`${shell} flex flex-col`}>
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950/80 px-4 py-2.5">
        <p className="vv-mono text-[0.66rem] uppercase tracking-[0.26em] text-cyan-300">
          vince-core ~ secure shell
        </p>
        <span className="vv-mono flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-soft" />
          scoped to VinceVision
        </span>
      </div>

      <div ref={scrollRef} className="vv-mono flex-1 space-y-4 overflow-y-auto px-4 py-4 text-xs leading-relaxed">
        {messages.length === 0 && (
          <div className="space-y-2 text-slate-400">
            <p><span className="text-cyan-400">vince@core</span>:~$ describe a business problem and I will map it to a VinceVision module.</p>
            <p className="text-slate-500">Try: “We need fraud detection for a lending product in Kenya.”</p>
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i}>
            {m.role === "user" ? (
              <p className="text-violet-300">
                <span className="text-slate-500">you</span>:~$ {m.content}
              </p>
            ) : (
              <p className="whitespace-pre-wrap text-slate-200">
                <span className="text-cyan-400">vince@core</span>:~${" "}
                {m.content || (
                  <span className="inline-flex gap-1" aria-label="Processing">
                    <span className="h-2 w-2 animate-pulse rounded-sm bg-cyan-400" />
                    <span className="h-2 w-2 animate-pulse rounded-sm bg-cyan-400 [animation-delay:0.2s]" />
                    <span className="h-2 w-2 animate-pulse rounded-sm bg-cyan-400 [animation-delay:0.4s]" />
                  </span>
                )}
              </p>
            )}
          </div>
        ))}
        {fallback && (
          <div className="flex flex-wrap gap-2 pt-1">
            <a
              href={`mailto:${site.email}`}
              className="rounded-full border border-cyan-400/50 bg-cyan-500/10 px-3 py-1.5 text-[0.64rem] uppercase tracking-[0.14em] text-cyan-200"
            >
              Email channel
            </a>
            <a
              href={site.whatsapp.waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-emerald-400/50 bg-emerald-500/10 px-3 py-1.5 text-[0.64rem] uppercase tracking-[0.14em] text-emerald-200"
            >
              WhatsApp channel
            </a>
          </div>
        )}
      </div>

      <form onSubmit={submit} className="flex items-center gap-2 border-t border-slate-800 bg-slate-950/80 px-3 py-2.5">
        <span className="vv-mono text-xs text-cyan-400">:~$</span>
        <label htmlFor={`vince-input-${variant}`} className="sr-only">
          Describe your business problem
        </label>
        <input
          id={`vince-input-${variant}`}
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          maxLength={500}
          autoComplete="off"
          placeholder={chatConfig.placeholder}
          className="vv-mono flex-1 bg-transparent text-xs text-slate-100 outline-none placeholder:text-slate-600"
        />
        <button
          type="submit"
          disabled={streaming || !input.trim()}
          className="vv-mono rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-1.5 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-slate-950 disabled:opacity-40"
        >
          Run
        </button>
      </form>
    </div>
  );
}
