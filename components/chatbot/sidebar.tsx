'use client';

import React from 'react';
import { Bot, Github, Linkedin, Mail, Code2, Briefcase, Layers, FlaskConical, Phone } from 'lucide-react';
import { STARTER_SUGGESTIONS } from '@/lib/bot-engine';

const QUICK_TOPICS = [
  { label: 'About Me', icon: Bot, query: 'Tell me about yourself' },
  { label: 'Projects', icon: Code2, query: 'Show me your projects' },
  { label: 'Experience', icon: Briefcase, query: "What's your experience?" },
  { label: 'Tech Stack', icon: Layers, query: "What's your tech stack?" },
  { label: 'Labs', icon: FlaskConical, query: 'Show me your labs' },
  { label: 'Contact', icon: Phone, query: 'How can I contact you?' },
];

interface SidebarProps {
  onQuery: (query: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ onQuery, isOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}

      <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`} id="sidebar">
        {/* Identity card */}
        <div className="sidebar-identity">
          <div className="sidebar-avatar">
            <span>HB</span>
          </div>
          <div className="sidebar-identity-text">
            <h2 className="sidebar-name">Hicham Bel Houcin</h2>
            <p className="sidebar-title">Full-Stack Engineer</p>
            <p className="sidebar-location">📍 Casablanca, Morocco</p>
          </div>
          <div className="sidebar-status">
            <span className="status-dot" />
            <span className="status-label">Open to work</span>
          </div>
        </div>

        {/* Quick topics */}
        <div className="sidebar-section">
          <p className="sidebar-section-label">Quick Topics</p>
          <nav className="sidebar-nav">
            {QUICK_TOPICS.map(({ label, icon: Icon, query }) => (
              <button
                key={label}
                className="sidebar-nav-item"
                onClick={() => { onQuery(query); onClose(); }}
              >
                <Icon size={15} className="sidebar-nav-icon" />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Social links */}
        <div className="sidebar-footer">
          <a href="https://github.com/Hicham-BelHoucin" target="_blank" rel="noopener noreferrer" className="sidebar-social">
            <Github size={16} />
          </a>
          <a href="https://www.linkedin.com/in/hicham-bel-houcin/" target="_blank" rel="noopener noreferrer" className="sidebar-social">
            <Linkedin size={16} />
          </a>
          <a href="mailto:belhoucin.hicham@gmail.com" className="sidebar-social">
            <Mail size={16} />
          </a>
        </div>
      </aside>
    </>
  );
}
