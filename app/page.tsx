'use client';

import { useState, useRef, useEffect } from 'react';
import styles from './page.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your McDonald's AI assistant. How can I help you today? Would you like to order something, learn about our menu, find nutrition information, or ask about deals?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.'
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.message
        }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <div className={styles.arches}>M</div>
          <h1>McDonald's AI Assistant</h1>
        </div>
      </header>

      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${styles.message} ${
                message.role === 'user' ? styles.userMessage : styles.assistantMessage
              }`}
            >
              <div className={styles.messageContent}>
                {message.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <div className={styles.messageContent}>
                <div className={styles.typing}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about McDonald's..."
            className={styles.input}
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className={styles.sendButton}
          >
            Send
          </button>
        </form>
      </div>

      <footer className={styles.footer}>
        <p>Powered by AI • Not affiliated with McDonald's Corporation</p>
      </footer>
    </div>
  );
}
