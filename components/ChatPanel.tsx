"use client";
import { useState, useRef, useEffect } from "react";
import { WebSlots } from "@/lib/slots";
import { addChatMessage, updateSlots, getProject } from "@/lib/storage";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function parseSlots(text: string): Partial<WebSlots> {
  const match = text.match(/<slots>([\s\S]*?)<\/slots>/);
  if (!match) return {};
  try {
    return JSON.parse(match[1].trim());
  } catch {
    return {};
  }
}

function cleanText(text: string): string {
  return text.replace(/<slots>[\s\S]*?<\/slots>/g, "").trim();
}

const FIRST_MSG = `¡Hola! Soy tu asistente de contenido, con el criterio de Elena detrás.

Para empezar, cuéntame todo sobre tu negocio: **a quién ayudas, qué haces y por qué eres la mejor opción.** No te preocupes por el orden — habla con libertad, como si me lo contaras en un café.`;

interface Props {
  onSlotsUpdate: (slots: Partial<WebSlots>) => void;
}

export default function ChatPanel({ onSlotsUpdate }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: FIRST_MSG },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    addChatMessage("user", text);
    setLoading(true);

    const aiMessages = newMessages.filter(m => m.role !== "assistant" || m.content !== FIRST_MSG);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: aiMessages }),
      });

      if (!res.ok) throw new Error("API error");

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = "";
      setMessages(prev => [...prev, { role: "assistant", content: "" }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value, { stream: true });
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: "assistant", content: full };
          return updated;
        });
      }

      const extracted = parseSlots(full);
      if (Object.keys(extracted).length > 0) {
        updateSlots(extracted);
        onSlotsUpdate(extracted);
      }
      addChatMessage("assistant", cleanText(full));
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: "Ha habido un error. Inténtalo de nuevo." }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--cream)" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--success)" }} />
          <span style={{ fontSize: 13, fontWeight: 500 }}>Asistente Laark</span>
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-muted)", marginTop: 2 }}>con el criterio de Elena</div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 14 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 4 }}>
              {m.role === "user" ? "Tú" : "Laark IA"}
            </div>
            <div style={{
              padding: "11px 15px", maxWidth: "90%", fontSize: 13, lineHeight: 1.65,
              borderRadius: m.role === "user" ? "12px 2px 12px 12px" : "2px 12px 12px 12px",
              background: m.role === "user" ? "var(--ink)" : "white",
              color: m.role === "user" ? "var(--cream)" : "var(--ink)",
              border: m.role === "user" ? "none" : "1px solid var(--border)",
              whiteSpace: "pre-wrap",
            }}>
              {cleanText(m.content) || (loading && i === messages.length - 1 ? (
                <span style={{ opacity: 0.5 }}>...</span>
              ) : "")}
            </div>
          </div>
        ))}
        {loading && messages[messages.length - 1]?.role !== "assistant" && (
          <div style={{ display: "flex", gap: 4, padding: 14 }}>
            {[0, 1, 2].map(j => (
              <span key={j} style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ink-muted)", display: "inline-block", animation: `typing-dot 1s infinite ${j * 0.2}s` }} />
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border)" }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
            placeholder="escribe aquí..."
            style={{
              flex: 1, padding: "10px 14px", fontFamily: "var(--font-dm-sans)",
              fontSize: 13, border: "1px solid var(--border)", borderRadius: 20,
              background: "white", color: "var(--ink)", outline: "none",
            }}
          />
          <button onClick={send} disabled={loading} style={{
            padding: "10px 18px", borderRadius: 20, fontSize: 13, fontWeight: 500,
            background: "var(--ink)", color: "var(--cream)", border: "none",
            cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1,
          }}>→</button>
        </div>
        <div style={{ fontSize: 11, color: "var(--ink-muted)", marginTop: 8, textAlign: "center" }}>
          Habla con libertad · la IA extrae lo que necesita
        </div>
      </div>
    </div>
  );
}
