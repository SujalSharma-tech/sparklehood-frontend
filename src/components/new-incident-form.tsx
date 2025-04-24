import type React from "react";

import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SeverityLevel } from "../lib/types";

interface NewIncidentFormProps {
  onSubmit: (incident: {
    title: string;
    description: string;
    severity: SeverityLevel;
  }) => void;
  onCancel: () => void;
}

export function NewIncidentForm({ onSubmit, onCancel }: NewIncidentFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<SeverityLevel>("Medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
    severity?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      title?: string;
      description?: string;
      severity?: string;
    } = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!severity) {
      newErrors.severity = "Severity is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit({
        title,
        description,
        severity,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">
          Report New Incident
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className="text-slate-400 hover:text-white hover:bg-slate-700"
          disabled={isSubmitting}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-slate-300">
            Incident Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a descriptive title"
            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500"
            disabled={isSubmitting}
          />
          {errors.title && (
            <p className="text-red-400 text-xs mt-1">{errors.title}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-medium text-slate-300"
          >
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide detailed information about the incident"
            className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-500 min-h-[120px]"
            disabled={isSubmitting}
          />
          {errors.description && (
            <p className="text-red-400 text-xs mt-1">{errors.description}</p>
          )}
        </div>

        <div className="space-y-2">
          <label
            htmlFor="severity"
            className="text-sm font-medium text-slate-300"
          >
            Severity Level
          </label>
          <Select
            value={severity}
            onValueChange={(value) => setSeverity(value as SeverityLevel)}
            disabled={isSubmitting}
          >
            <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
              <SelectValue placeholder="Select severity" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600 text-white max-h-[200px]">
              <SelectItem
                value="Low"
                className="hover:bg-slate-700 focus:bg-slate-700"
              >
                Low
              </SelectItem>
              <SelectItem
                value="Medium"
                className="hover:bg-slate-700 focus:bg-slate-700"
              >
                Medium
              </SelectItem>
              <SelectItem
                value="High"
                className="hover:bg-slate-700 focus:bg-slate-700"
              >
                High
              </SelectItem>
            </SelectContent>
          </Select>
          {errors.severity && (
            <p className="text-red-400 text-xs mt-1">{errors.severity}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="bg-slate-800 border-slate-600 hover:bg-slate-700 text-white"
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-slate-600 hover:bg-slate-500 text-white"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            "Submit Report"
          )}
        </Button>
      </div>
    </form>
  );
}
