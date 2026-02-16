'use client';

import { Save, Download } from 'lucide-react';

interface HeaderProps {
  isDirty: boolean;
  onSave: () => void;
  onExport: () => void;
}

export const Header = ({ isDirty, onSave, onExport }: HeaderProps) => (
  <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md">
    <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-250">
      <h1 className="text-base font-semibold tracking-tight text-foreground">
        Company Data Review Portal
      </h1>

      <div className="flex items-center gap-3">
        <div className="status-chip">
          <div
            className={`h-2 w-2 rounded-full transition-colors duration-200 ${
              isDirty ? 'bg-warning' : 'bg-success'
            }`}
          />
          <span className="hidden md:flex">
            {isDirty ? 'Unsaved changes' : 'All saved'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button type="button" onClick={onSave} className="btn-secondary">
            <Save className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Save</span>
          </button>
          <button type="button" onClick={onExport} className="btn-primary">
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Export JSON</span>
          </button>
        </div>
      </div>
    </div>
  </header>
);
