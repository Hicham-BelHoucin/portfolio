'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowUp } from 'lucide-react';

interface InputBarProps {
  onSend: (text: string) => void;
  suggestions: string[];
  disabled?: boolean;
}

export function InputBar({ onSend, suggestions, disabled }: InputBarProps) {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 160)}px`;
  };

  // Focus on mount
  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <div className="input-area">
      {suggestions.length > 0 && (
        <div className="suggestions-row" id="suggestions-row">
          {suggestions.map((s) => (
            <button
              key={s}
              className="suggestion-chip"
              onClick={() => onSend(s)}
              disabled={disabled}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <div className="input-box-wrapper">
        <div className="input-box">
          <textarea
            ref={textareaRef}
            id="chat-input"
            className="chat-textarea"
            placeholder="Message Hicham AI..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleInput}
            rows={1}
            disabled={disabled}
          />
          <button
            id="send-btn"
            className={`send-btn ${value.trim() && !disabled ? 'send-btn-active' : ''}`}
            onClick={handleSubmit}
            disabled={!value.trim() || disabled}
            aria-label="Send message"
          >
            <ArrowUp size={18} />
          </button>
        </div>
        <p className="input-disclaimer">
          Hicham&apos;s AI portfolio — powered by OpenAi API and trained entirely on Hicham's real engineering data.
        </p>
      </div>
    </div>
  );
}
