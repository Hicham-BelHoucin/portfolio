'use client';

import React from 'react';

export function TechCloud({ techs }: { techs: string[] }) {
  return (
    <div className="tech-cloud">
      {techs.map((tech, i) => (
        <span
          key={tech}
          className="tech-pill"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
