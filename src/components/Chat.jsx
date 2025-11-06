import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Send, Loader2, Bot, User } from 'lucide-react';

const WS_URL = (import.meta.env.VITE_BACKEND_URL || '').replace('http', 'ws');

export default function Chat() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am your realtime AI. Ask me anything.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Attempt to connect to a backend websocket if available
    try {
      if (WS_URL) {
        const ws = new WebSocket(`${WS_URL.replace(/\/$/, '')}/ws`);
        wsRef.current = ws;
        ws.onmessage = (ev) => {
          const data = JSON.parse(ev.data);
          if (data.type === 'partial') {
            setLoading(true);
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.role === 'assistant' && last.streaming) {
                return [...prev.slice(0, -1), { ...last, content: last.content + data.text }];
              }
              return [...prev, { role: 'assistant', content: data.text, streaming: true }];
            });
          } else if (data.type === 'final') {
            setLoading(false);
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last && last.role === 'assistant' && last.streaming) {
                return [...prev.slice(0, -1), { role: 'assistant', content: last.content }];
              }
              return prev;
            });
          }
        };
        ws.onclose = () => setLoading(false);
      }
    } catch (e) {
      // ignore connection errors for demo
    }
  }, []);

  const send = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput('');
    setMessages((m) => [...m, { role: 'user', content: text }]);

    // If websocket exists, send through it
    if (wsRef.current && wsRef.current.readyState === 1) {
      wsRef.current.send(JSON.stringify({ text }));
      return;
    }

    // Fallback to HTTP demo echo
    setLoading(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: 'assistant', content: `You said: ${text}` }]);
      setLoading(false);
    }, 600);
  };

  return (
    <section id="chat" className="py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold">Realtime AI Chat</h2>
          <p className="text-slate-300 mt-2">Type or speak, get answers instantly with smooth streaming.</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur overflow-hidden">
          <div ref={listRef} className="h-[420px] overflow-y-auto p-4 space-y-3">
            <AnimatePresence initial={false}>
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className={`flex items-start gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'assistant' && (
                    <div className="shrink-0 rounded-full p-2 bg-gradient-to-br from-purple-500 via-blue-500 to-orange-400">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-xl px-4 py-3 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-white text-slate-900 rounded-br-sm shadow'
                      : 'bg-slate-800 text-slate-100 rounded-bl-sm border border-white/10'
                  }`}>
                    {m.content}
                  </div>
                  {m.role === 'user' && (
                    <div className="shrink-0 rounded-full p-2 bg-white text-slate-900">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className="border-t border-white/10 p-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Voice input"
                className="p-2 rounded-lg border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition"
              >
                <Mic className="w-5 h-5" />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') send();
                }}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent px-4 py-2 outline-none placeholder:text-slate-500"
              />
              <button
                onClick={send}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-slate-900 hover:bg-slate-100 transition disabled:opacity-50"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
