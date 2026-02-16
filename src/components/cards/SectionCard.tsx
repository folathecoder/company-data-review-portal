'use client';

import type { ReactNode } from 'react';

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const SectionCard = ({
  title,
  description,
  children,
}: SectionCardProps) => (
  <div className="section-card">
    <div className="mb-8 pb-6 border-b border-border/60">
      <h2 className="section-title">{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
    {children}
  </div>
);

interface SubSectionProps {
  label: string;
  children: ReactNode;
}

export const SubSection = ({ label, children }: SubSectionProps) => (
  <div className="space-y-4">
    <h3 className="subsection-label">{label}</h3>
    {children}
  </div>
);
