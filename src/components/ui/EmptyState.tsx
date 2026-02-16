"use client";

import type { LucideIcon } from "lucide-react";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) => (
  <div className="empty-state">
    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 mb-4">
      <Icon className="h-6 w-6 text-primary" />
    </div>
    <h3 className="text-base font-semibold text-foreground mb-1">{title}</h3>
    <p className="text-sm text-muted-foreground mb-5 max-w-sm">{description}</p>
    <button type="button" onClick={onAction} className="btn-primary">
      {actionLabel}
    </button>
  </div>
);
