"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateSlots, getProject, saveProject } from "@/lib/storage";
import { WebSlots } from "@/lib/slots";

function parseSlots(text: string): Partial<WebSlots> {
  const match = text.match(/<slots>([\s\S]*?)<\/slots>/);
  if (!match) return {};
  try { return JSON.parse(match[1].trim()); } catch { return {}; }
}

function cleanText(text: string): string {
  return text.replace(/<slots>[\s\S]*?<\/slots>/g, "").trim();
}

const FIRST_MSG =
  "¡Hola! Soy la IA de LAARK.\n\nVamos a construir tu web juntas. Cuéntame sobre ti y tu negocio como si me lo explicaras en una reunión tranquila: qué haces, a quién ayudas, cómo trabajas y qué hace que tenga sentido elegirte a ti. Yo ya me encargo de ir sacando lo importante y de ordenarlo.";

interface Message { role: "user" | "assistant"; content: string; }

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: FIRST_MSG },
  ]);
  const [input, setInput]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [userMsgCount, setCount]    = useState(0);
  const [complete, setComplete]     = useState(false);
  const bottomRef   = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const p = getProject();
    if (p.chatHistory?.length) {
      const restored: Message[] = [
        { role: "assistant", content: FIRST_MSG },
        ...p.chatHistory.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
      ];
      setMessages(restored);
      setCount(p.chatHistory.filter(m => m.role === "user").length);
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const resizeTextarea = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px";
  };

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";

    const newMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(newMessages);
    const newCount = userMsgCount + 1;
    setCount(newCount);
    setLoading(true);

    const p = getProject();
    p.chatHistory = [
      ...(p.chatHistory || []),
      { role: "user", content: text, timestamp: new Date().toISOString() },
    ];
    saveProject(p);

    const apiMessages = newMessages.slice(1).map(m => ({ role: m.role, content: m.content }));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!res.ok || !res.body) throw new Error("API error");

      const reader  = res.body.getReader();
      const decoder = new TextDecoder();
      let full    = "";
      let started = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        full += decoder.decode(value);
        if (!started) {
          started = true;
          setMessages(prev => [...prev, { role: "assistant", content: full }]);
        } else {
          setMessages(prev => {
            const u = [...prev];
            u[u.length - 1] = { role: "assistant", content: full };
            return u;
          });
        }
      }

      const slots = parseSlots(full);
      if (Object.keys(slots).length > 0) updateSlots(slots);

      const p2 = getProject();
      p2.chatHistory = [
        ...(p2.chatHistory || []),
        { role: "assistant", content: cleanText(full), timestamp: new Date().toISOString() },
      ];
      saveProject(p2);

      if (full.includes("Tu web tiene contenido")) {
        setComplete(true);
        setTimeout(() => router.push("/photos"), 3200);
      }
    } catch {
      setMessages(prev => {
        const u = [...prev];
        u[u.length - 1] = { role: "assistant", content: "Ha ocurrido un error. Por favor, inténtalo de nuevo." };
        return u;
      });
    } finally {
      setLoading(false);
    }
  };

  const showContinue = userMsgCount >= 5 || complete;

  return (
    <div className="chat-root">
      <div className="chat-top">
        <span className="chat-top-logo">LAARK</span>
        <span className="chat-top-step">· Paso 1 de 4 · Contenido</span>
        <div className="chat-top-actions">
          <button
            className={`chat-continue-btn${showContinue ? " visible" : ""}`}
            onClick={() => router.push("/photos")}
          >
            Continuar a las fotos →
          </button>
          <button className="chat-pause-btn" onClick={() => router.push("/dashboard?chat=pending")}>
            Pausar y continuar más tarde
          </button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((msg, i) =>
          msg.role === "assistant" ? (
            <div key={i} className="chat-msg-ia">
              <div className="chat-msg-ia-name">LAARK</div>
              <p>{cleanText(msg.content)}</p>
            </div>
          ) : (
            <div key={i} className="chat-msg-user">
              <p>{msg.content}</p>
            </div>
          )
        )}

        {loading && messages[messages.length - 1]?.role === "user" && (
          <div className="chat-msg-ia">
            <div className="chat-msg-ia-name">LAARK</div>
            <div className="chat-typing">
              <span /><span /><span />
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <p className="chat-hint">Responde con naturalidad · Tu progreso se guarda automáticamente</p>

      <div className="chat-input-area">
        <div className="chat-input-row">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            placeholder="Escribe tu respuesta..."
            value={input}
            rows={1}
            onChange={e => { setInput(e.target.value); resizeTextarea(); }}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            disabled={loading}
          />
          <button
            className="chat-send-btn"
            onClick={send}
            disabled={loading || !input.trim()}
            aria-label="Enviar"
          >
            <svg viewBox="0 0 18 18" fill="none" width={18} height={18}>
              <path d="M2 9h14M10 3l6 6-6 6" stroke="#F2EDE3" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
