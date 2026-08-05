import { useEffect, useRef, useState } from 'react'
import {
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Trash2,
  ChevronDown,
} from 'lucide-react'
import { generateReplyStream, MODELS, suggestedPrompts } from '../lib/chatEngine.js'
import useSpeechRecognition from '../hooks/useSpeechRecognition.js'
import useSpeechSynthesis from '../hooks/useSpeechSynthesis.js'
import useChatHistory from '../hooks/useChatHistory.js'
import { person } from '../data/assistantKnowledge.js'

const WELCOME_MESSAGE = {
  role: 'assistant',
  text: `Hi! I'm ${person.name}'s AI assistant. Ask me about his background, skills, or projects — try "Explain HouseHunt" or "Show his skills".`,
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [modelId, setModelId] = useState('fast')
  const [modelMenuOpen, setModelMenuOpen] = useState(false)
  const [voiceReplyEnabled, setVoiceReplyEnabled] = useState(false)

  const { messages, addMessage, updateLastMessage, clearHistory } = useChatHistory()
  const { isSpeaking, isSupported: ttsSupported, speak, cancel: cancelSpeech } =
    useSpeechSynthesis()

  const handleVoiceResult = (transcript) => {
    setInput(transcript)
    sendMessage(transcript)
  }
  const {
    isListening,
    isSupported: sttSupported,
    start: startListening,
    stop: stopListening,
  } = useSpeechRecognition({ onResult: handleVoiceResult })

  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isStreaming])

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || isStreaming) return

    addMessage({ role: 'user', text: trimmed })
    addMessage({ role: 'assistant', text: '' })
    setInput('')
    setIsStreaming(true)

    let accumulated = ''
    for await (const chunk of generateReplyStream(trimmed, { modelId })) {
      accumulated += chunk
      updateLastMessage((msg) => ({ ...msg, text: accumulated }))
    }

    setIsStreaming(false)
    if (voiceReplyEnabled) speak(accumulated)
  }

  function handleSubmit(e) {
    e.preventDefault()
    sendMessage(input)
  }

  function toggleVoiceReply() {
    if (voiceReplyEnabled) cancelSpeech()
    setVoiceReplyEnabled((v) => !v)
  }

  const displayMessages = messages.length ? messages : [WELCOME_MESSAGE]

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setIsOpen((v) => !v)}
        aria-label={isOpen ? 'Close AI assistant' : 'Open AI assistant'}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-blueprint-amber text-blueprint-bg shadow-[0_0_30px_-6px_rgba(255,169,77,0.7)] flex items-center justify-center hover:brightness-110 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blueprint-amber focus-visible:ring-offset-2 focus-visible:ring-offset-blueprint-bg"
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[92vw] max-w-sm h-[70vh] max-h-[600px] flex flex-col rounded-xl border border-blueprint-line bg-blueprint-panel/95 backdrop-blur-md shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between gap-2 px-4 py-3 border-b border-blueprint-line bg-blueprint-bg/60">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-full bg-blueprint-amber/20 border border-blueprint-amber/50 flex items-center justify-center shrink-0">
                <Bot size={16} className="text-blueprint-amber" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-blueprint-text truncate">
                  {person.name}'s Assistant
                </p>
                <p className="text-[11px] text-blueprint-muted truncate">
                  {isStreaming ? 'typing…' : 'online'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {/* Model selector */}
              <div className="relative">
                <button
                  onClick={() => setModelMenuOpen((v) => !v)}
                  className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-wide text-blueprint-muted border border-blueprint-line rounded-md px-2 py-1 hover:text-blueprint-amber hover:border-blueprint-amber transition"
                >
                  {MODELS[modelId].label}
                  <ChevronDown size={12} />
                </button>
                {modelMenuOpen && (
                  <div className="absolute right-0 mt-1 w-40 rounded-md border border-blueprint-line bg-blueprint-bg shadow-xl overflow-hidden z-10">
                    {Object.entries(MODELS).map(([id, m]) => (
                      <button
                        key={id}
                        onClick={() => {
                          setModelId(id)
                          setModelMenuOpen(false)
                        }}
                        className={`w-full text-left px-3 py-2 text-xs hover:bg-blueprint-panel transition ${
                          id === modelId ? 'text-blueprint-amber' : 'text-blueprint-text'
                        }`}
                      >
                        <span className="font-semibold">{m.label}</span>
                        <span className="block text-[10px] text-blueprint-muted">
                          {m.description}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Voice reply toggle */}
              {ttsSupported && (
                <button
                  onClick={toggleVoiceReply}
                  aria-label="Toggle voice reply"
                  className={`p-1.5 rounded-md border border-blueprint-line hover:border-blueprint-amber transition ${
                    voiceReplyEnabled ? 'text-blueprint-amber' : 'text-blueprint-muted'
                  }`}
                >
                  {voiceReplyEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
                </button>
              )}

              {/* Clear history */}
              <button
                onClick={clearHistory}
                aria-label="Clear chat history"
                className="p-1.5 rounded-md border border-blueprint-line text-blueprint-muted hover:text-blueprint-amber hover:border-blueprint-amber transition"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {displayMessages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-lg text-sm leading-relaxed whitespace-pre-line ${
                  m.role === 'user'
                    ? 'ml-auto bg-blueprint-amber text-blueprint-bg font-medium'
                    : 'mr-auto bg-blueprint-bg border border-blueprint-line text-blueprint-text'
                }`}
              >
                {m.text || (
                  <span className="inline-flex gap-1">
                    <Dot /> <Dot delay="0.15s" /> <Dot delay="0.3s" />
                  </span>
                )}
              </div>
            ))}

            {/* Suggested prompt chips — only show before the conversation grows */}
            {messages.length === 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {suggestedPrompts.map((p) => (
                  <button
                    key={p}
                    onClick={() => sendMessage(p)}
                    className="text-xs px-3 py-1.5 rounded-full border border-blueprint-line text-blueprint-muted hover:text-blueprint-amber hover:border-blueprint-amber transition"
                  >
                    {p}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 px-3 py-3 border-t border-blueprint-line bg-blueprint-bg/60"
          >
            {sttSupported && (
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                aria-label={isListening ? 'Stop voice input' : 'Start voice input'}
                className={`p-2 rounded-md border transition ${
                  isListening
                    ? 'border-blueprint-amber text-blueprint-amber animate-pulse'
                    : 'border-blueprint-line text-blueprint-muted hover:text-blueprint-amber hover:border-blueprint-amber'
                }`}
              >
                {isListening ? <MicOff size={16} /> : <Mic size={16} />}
              </button>
            )}

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Raju's work…"
              className="flex-1 bg-transparent text-sm text-blueprint-text placeholder-blueprint-muted focus:outline-none"
            />

            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              aria-label="Send message"
              className="p-2 rounded-md bg-blueprint-amber text-blueprint-bg disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 transition"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}

function Dot({ delay = '0s' }) {
  return (
    <span
      className="w-1.5 h-1.5 rounded-full bg-blueprint-muted inline-block animate-bounce"
      style={{ animationDelay: delay }}
    />
  )
}