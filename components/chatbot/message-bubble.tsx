'use client';

import React, { useEffect, useState, useRef } from 'react';
import { User, Bot, Github, Linkedin, Mail, Beaker } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import type { BotResponse } from '@/lib/bot-engine';
import { ProjectGrid, ProjectCard } from './project-card';
import { ExperienceList, ExperienceCard } from './experience-card';
import { TechCloud } from './tech-cloud';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Message {
  id: string;
  role: 'user' | 'bot';
  response?: BotResponse;
  userText?: string;
  isStreaming?: boolean;
}

// ─── Streaming text (char-by-char for local bot fallback) ─────────────────────

function StreamingText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayed('');
    setDone(false);

    const speed = Math.max(8, Math.min(20, 2000 / text.length));
    const timer = setInterval(() => {
      indexRef.current += 1;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) {
        clearInterval(timer);
        setDone(true);
        onDone?.();
      }
    }, speed);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text]);

  return (
    <>
      <MarkdownContent text={displayed} />
      {!done && <span className="cursor-blink">▋</span>}
    </>
  );
}

// ─── Markdown renderer ────────────────────────────────────────────────────────

function MarkdownContent({ text }: { text: string }) {
  return (
    <ReactMarkdown
      components={{
        // Open all links in a new tab with a beautiful chip look
        a: ({ href, children }) => {
          const isExternal = href?.startsWith('http');
          return (
            <a 
              href={href} 
              target={isExternal ? "_blank" : undefined} 
              rel={isExternal ? "noopener noreferrer" : undefined} 
              className="md-link-chip"
            >
              <span>{children}</span>
              {isExternal && <span className="md-link-arrow">↗</span>}
            </a>
          );
        },
        // Style headings
        h1: ({ children }) => <h3 className="md-h">{children}</h3>,
        h2: ({ children }) => <h3 className="md-h">{children}</h3>,
        h3: ({ children }) => <h4 className="md-h md-h-sm">{children}</h4>,
        // Style code blocks
        code: ({ children, className }) => {
          const isBlock = className?.startsWith('language-');
          return isBlock
            ? <code className="md-code-block">{children}</code>
            : <code className="md-code-inline">{children}</code>;
        },
        pre: ({ children }) => <pre className="md-pre">{children}</pre>,
        // Style lists
        ul: ({ children }) => <ul className="md-list">{children}</ul>,
        ol: ({ children }) => <ol className="md-list md-list-ol">{children}</ol>,
        li: ({ children }) => <li className="md-list-item">{children}</li>,
        // Style paragraphs
        p: ({ children }) => <p className="md-p">{children}</p>,
        // Style blockquotes
        blockquote: ({ children }) => <blockquote className="md-blockquote">{children}</blockquote>,
        // Style strong/em
        strong: ({ children }) => <strong className="md-strong">{children}</strong>,
      }}
    >
      {text}
    </ReactMarkdown>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LeadForm() {
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !contactInfo || !message) return;
    setStatus('submitting');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, contactInfo, message }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setContactInfo('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="lead-form-success">
        <div className="success-icon">✓</div>
        <div className="success-text-container">
          <h4 className="success-title">Message sent successfully!</h4>
          <p className="success-desc">Thank you for reaching out. Hicham has been notified and will get back to you shortly.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <h4 className="lead-form-title">Drop Hicham a Quick Message</h4>
      <div className="form-group">
        <input 
          type="text" 
          placeholder="Your Name" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          required 
          disabled={status === 'submitting'}
        />
      </div>
      <div className="form-group">
        <input 
          type="text" 
          placeholder="Your Email or LinkedIn" 
          value={contactInfo} 
          onChange={e => setContactInfo(e.target.value)} 
          required 
          disabled={status === 'submitting'}
        />
      </div>
      <div className="form-group">
        <textarea 
          placeholder="Your Message..." 
          value={message} 
          onChange={e => setMessage(e.target.value)} 
          required 
          rows={3}
          disabled={status === 'submitting'}
        />
      </div>
      {status === 'error' && (
        <p className="lead-form-error">⚠️ Failed to send message. Please email directly!</p>
      )}
      <button type="submit" className="lead-form-submit-btn" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

function ContactCard({ payload }: { payload: { email: string; github: string; linkedin: string } }) {
  return (
    <div className="contact-card-container">
      <div className="contact-links-grid">
        <a href={`mailto:${payload.email}`} className="contact-link">
          <Mail size={16} /> {payload.email}
        </a>
        <a href={payload.github} target="_blank" rel="noopener noreferrer" className="contact-link">
          <Github size={16} /> GitHub
        </a>
        <a href={payload.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link">
          <Linkedin size={16} /> LinkedIn
        </a>
      </div>
      <LeadForm />
    </div>
  );
}

function LabsGrid({ labs }: { labs: { title: string; tag: string; description: string }[] }) {
  return (
    <div className="labs-grid">
      {labs.map((lab, i) => (
        <div key={i} className="lab-card">
          <div className="lab-card-header">
            <div className="lab-icon"><Beaker size={14} /></div>
            <span className="tag">{lab.tag}</span>
          </div>
          <h4 className="lab-title">{lab.title}</h4>
          <p className="lab-desc">{lab.description}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Bot Content ──────────────────────────────────────────────────────────────

function BotContent({ response, streaming, onStreamDone }: {
  response: BotResponse;
  streaming: boolean;
  onStreamDone?: () => void;
}) {
  const [textDone, setTextDone] = useState(!streaming);

  useEffect(() => {
    if (!streaming) setTextDone(true);
  }, [streaming]);

  return (
    <div className="bot-content">
      <div className="bot-text">
        {streaming ? (
          <StreamingText
            text={response.text}
            onDone={() => { setTextDone(true); onStreamDone?.(); }}
          />
        ) : (
          <MarkdownContent text={response.text} />
        )}
      </div>

      {/* Rich payloads from local bot engine */}
      {textDone && (
        <>
          {response.type === 'projects' && response.payload && (
            <ProjectGrid projects={response.payload as Parameters<typeof ProjectGrid>[0]['projects']} />
          )}
          {response.type === 'single-project' && response.payload && (
            <ProjectCard project={response.payload as Parameters<typeof ProjectCard>[0]['project']} />
          )}
          {response.type === 'experience' && response.payload && (
            <ExperienceList items={response.payload as Parameters<typeof ExperienceList>[0]['items']} />
          )}
          {response.type === 'single-experience' && response.payload && (
            <ExperienceCard exp={response.payload as Parameters<typeof ExperienceCard>[0]['exp']} />
          )}
          {response.type === 'tech' && response.payload && (
            <TechCloud techs={response.payload as string[]} />
          )}
          {response.type === 'contact' && response.payload && (
            <ContactCard payload={response.payload as { email: string; github: string; linkedin: string }} />
          )}
          {response.type === 'labs' && response.payload && (
            <LabsGrid labs={response.payload as { title: string; tag: string; description: string }[]} />
          )}
        </>
      )}
    </div>
  );
}

// ─── Message Bubble ───────────────────────────────────────────────────────────

export function MessageBubble({ message, onStreamDone }: {
  message: Message;
  onStreamDone?: () => void;
}) {
  if (message.role === 'user') {
    return (
      <div className="msg-row msg-row-user">
        <div className="msg-bubble msg-user">
          <span>{message.userText}</span>
        </div>
        <div className="msg-avatar msg-avatar-user">
          <User size={16} />
        </div>
      </div>
    );
  }

  return (
    <div className="msg-row msg-row-bot">
      <div className="msg-avatar msg-avatar-bot">
        <Bot size={16} />
      </div>
      <div className="msg-bubble msg-bot">
        {message.response && (
          <BotContent
            response={message.response}
            streaming={!!message.isStreaming}
            onStreamDone={onStreamDone}
          />
        )}
      </div>
    </div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────

export function TypingIndicator() {
  return (
    <div className="msg-row msg-row-bot">
      <div className="msg-avatar msg-avatar-bot">
        <Bot size={16} />
      </div>
      <div className="msg-bubble msg-bot">
        <div className="typing-indicator">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
