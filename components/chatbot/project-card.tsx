'use client';

import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  github: string;
  live: string;
}

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <h3 className="project-card-title">{project.title}</h3>
      </div>
      <p className="project-card-desc">{project.description}</p>
      <div className="project-card-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>
      <div className="project-card-links">
        <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
          <Github size={14} />
          Code
        </a>
        <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link project-link-live">
          <ExternalLink size={14} />
          Live
        </a>
      </div>
    </div>
  );
}

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="project-grid">
      {projects.map((p) => (
        <ProjectCard key={p.id} project={p} />
      ))}
    </div>
  );
}
