'use client';

import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
}

export function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div className="exp-card">
      <div className="exp-card-header">
        <div>
          <h3 className="exp-role">{exp.role}</h3>
          <p className="exp-company">{exp.company}</p>
        </div>
        <span className="exp-period">{exp.period}</span>
      </div>
      <p className="exp-desc">{exp.description}</p>
      <ul className="exp-highlights">
        {exp.highlights.map((h, i) => (
          <li key={i} className="exp-highlight-item">
            <CheckCircle2 size={13} className="exp-check" />
            <span>{h}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ExperienceList({ items }: { items: Experience[] }) {
  return (
    <div className="exp-list">
      {items.map((e) => (
        <ExperienceCard key={e.id} exp={e} />
      ))}
    </div>
  );
}
