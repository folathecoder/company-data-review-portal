"use client";

import type { UseFieldArrayReturn } from "react-hook-form";
import { UserPlus } from "lucide-react";
import { SectionCard, DirectorCard } from "@/components/cards";
import { EmptyState } from "@/components/ui";
import { SECTION_IDS } from "@/lib/constants";
import type { CompanyFormValues } from "@/lib/schemas";

interface DirectorsSectionProps {
  fieldArray: UseFieldArrayReturn<CompanyFormValues, "directors">;
  onAdd: () => void;
}

export const DirectorsSection = ({ fieldArray, onAdd }: DirectorsSectionProps) => {
  const { fields, remove } = fieldArray;

  return (
    <div id={SECTION_IDS.DIRECTORS} className="scroll-mt-44">
      <SectionCard
        title="Directors"
        description="Key personnel and decision makers"
      >
        {fields.length === 0 ? (
          <EmptyState
            icon={UserPlus}
            title="No directors added"
            description="Add at least one director to continue. Directors are key personnel responsible for company governance."
            actionLabel="Add First Director"
            onAction={onAdd}
          />
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <DirectorCard
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
                canDelete={fields.length > 1}
              />
            ))}
            <button type="button" onClick={onAdd} className="btn-add">
              <UserPlus className="h-4 w-4" />
              Add Director
            </button>
          </div>
        )}
      </SectionCard>
    </div>
  );
};
