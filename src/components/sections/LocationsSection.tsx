"use client";

import type { UseFieldArrayReturn } from "react-hook-form";
import { MapPin } from "lucide-react";
import { SectionCard, LocationCard } from "@/components/cards";
import { EmptyState } from "@/components/ui";
import { SECTION_IDS } from "@/lib/constants";
import type { CompanyFormValues } from "@/lib/schemas";

interface LocationsSectionProps {
  fieldArray: UseFieldArrayReturn<CompanyFormValues, "locations">;
  onAdd: () => void;
}

export const LocationsSection = ({ fieldArray, onAdd }: LocationsSectionProps) => {
  const { fields, remove } = fieldArray;

  return (
    <div id={SECTION_IDS.LOCATIONS} className="scroll-mt-44">
      <SectionCard
        title="Office Locations"
        description="Physical addresses and regional presence"
      >
        {fields.length === 0 ? (
          <EmptyState
            icon={MapPin}
            title="No locations added"
            description="Add at least one office location. Include headquarters and any regional offices or branches."
            actionLabel="Add First Location"
            onAction={onAdd}
          />
        ) : (
          <div className="space-y-4">
            {fields.map((field, index) => (
              <LocationCard
                key={field.id}
                index={index}
                onRemove={() => remove(index)}
                canDelete={fields.length > 1}
              />
            ))}
            <button type="button" onClick={onAdd} className="btn-add">
              <MapPin className="h-4 w-4" />
              Add Location
            </button>
          </div>
        )}
      </SectionCard>
    </div>
  );
};
