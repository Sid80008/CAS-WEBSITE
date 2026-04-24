"use client";

import * as React from "react";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

interface FilterBarProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string>;
  onChange: (filterId: string, value: string) => void;
  onReset: () => void;
}

export function FilterBar({ filters, activeFilters, onChange, onReset }: FilterBarProps) {
  const hasActiveFilters = Object.values(activeFilters).some(v => v && v !== "all");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex items-center text-sm font-medium text-gray-500 gap-2">
        <Filter className="h-4 w-4" />
        Filters:
      </div>
      
      {filters.map((filter) => (
        <Select
          key={filter.id}
          value={activeFilters[filter.id] || "all"}
          onValueChange={(val) => onChange(filter.id, val)}
        >
          <SelectTrigger className="w-[140px] h-10 bg-white border-gray-200">
            <SelectValue placeholder={filter.label} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All {filter.label}s</SelectItem>
            {filter.options.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}

      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-gray-500 hover:text-indigo-600 h-10 px-3"
        >
          <X className="h-4 w-4 mr-1" />
          Reset
        </Button>
      )}
    </div>
  );
}
