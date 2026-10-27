"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { chatConfig, site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const MIN_SEND_GAP_MS = 2500; // client-side rate guard (server enforces its own)
const MAX_MESSAGES = 12;

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [fallback, setFallback] = useState(false);
  const lastSendRef = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelId = useId();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    inputRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const send = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const question = input.trim();
      if (!question || streaming) return;

      const gap = Date.now() - lastSendRef.current;
      if (gap < MIN_SEND_GAP_MS) return;
      lastSendRef.current = Date.now();

      const history = [...messages, { role: "user" as const, content: question }].slice(-MAX_MESSAGES);
      setMessages(history);
      setInput("");
      setStreaming(true);
      setFallback(false);

      // Optimistic empty assistant bubble we stream into
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

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
                if (last && last.role === "assistant") {
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
          if (last && last.role === "assistant") {
            next[next.length - 1] = { ...last, content: chatConfig.fallbackMessage };
          }
          return next;
        });
      } finally {
        setStreaming(false);
      }
    },
    [input, messages, streaming]
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close VinceVision assistant" : "Open VinceVision assistant"}
        className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 px-4 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-950 shadow-[0_14px_35px_rgba(2,6,23,0.9),0_0_30px_rgba(34,211,238,0.5)] transition-all hover:brightness-110"
      >
        <span className="flex h-2 w-2 rounded-full bg-slate-950/80" aria-hidden="true" />
        Ask VinceVision AI
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label={chatConfig.title}
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            className="vv-glass fixed bottom-24 right-5 z-50 flex h-[min(560px,calc(100vh-8rem))] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-slate-700/80 bg-slate-950/90 px-4 py-3">
              <div>
                <p className="font-display text-sm font-semibold text-slate-100">{chatConfig.title}</p>
                <p className="text-[0.66rem] text-slate-400">{chatConfig.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="flex h-8 w-8 items-center justify-center rounded-full text-slate-400 hover:bg-slate-800 hover:text-slate-200"
              >
                ✕
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.length === 0 && (
                <div className="rounded-2xl border border-slate-700/70 bg-slate-950/70 px-3.5 py-3 text-xs leading-relaxed text-slate-300">
                  {chatConfig.welcomeMessage}
                </div>
              )}
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[88%] px-3.5 py-2.5 text-xs leading-relaxed",
                      m.role === "user"
                        ? "rounded-2xl rounded-br-sm border border-cyan-400/40 bg-gradient-to-br from-cyan-500/25 to-violet-500/30 text-slate-100"
                        : "rounded-2xl rounded-bl-sm border border-slate-700/70 bg-slate-950/80 text-slate-200"
                    )}
                  >
                    {m.content || (
                      <span className="inline-flex gap-1" aria-label="Assistant is typing">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:0.2s]" />
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-300 [animation-delay:0.4s]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {fallback && (
                <div className="flex flex-wrap gap-2 pl-1">
                  <a
                    href={`mailto:${site.email}`}
                    className="rounded-full border border-cyan-400/50 bg-cyan-500/15 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-cyan-200 hover:bg-cyan-500/25"
                  >
                    Email us
                  </a>
                  <a
                    href={site.whatsapp.waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-emerald-400/50 bg-emerald-500/15 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-emerald-200 hover:bg-emerald-500/25"
                  >
                    WhatsApp
                  </a>
                </div>
              )}
            </div>

            <form
              onSubmit={send}
              className="flex items-center gap-2 border-t border-slate-700/80 bg-slate-950/90 px-3 py-2.5"
            >
              <label htmlFor="chat-input" className="sr-only">
                Ask a question
              </label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={chatConfig.placeholder}
                maxLength={500}
                autoComplete="off"
                className="flex-1 bg-transparent text-xs text-slate-100 outline-none placeholder:text-slate-500"
              />
              <Button type="submit" size="sm" disabled={streaming || !input.trim()}>
                Send
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
