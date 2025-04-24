import { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Incident } from "@/lib/types";

interface IncidentCardProps {
  incident: Incident;
  isActive: boolean;
  onToggle: () => void;
}

export function IncidentCard({
  incident,
  isActive,
  onToggle,
}: IncidentCardProps) {
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight + 10);
    }
  }, [incident.description]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High":
        return "bg-red-600 text-white border-red-700";
      case "Medium":
        return "bg-amber-600 text-white border-amber-700";
      case "Low":
        return "bg-emerald-600 text-white border-emerald-700";
      default:
        return "bg-slate-600 text-white border-slate-700";
    }
  };

  return (
    <Card
      className={`
    bg-slate-800 border-slate-700 overflow-hidden transition-all duration-300
    ${isActive ? "ring-1 ring-slate-500" : "hover:bg-slate-750"}
  `}
    >
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Badge
                className={`${getSeverityColor(incident.severity)} px-2 py-0.5`}
              >
                {incident.severity}
              </Badge>
              <h3 className="text-lg font-medium text-white">
                {incident.title}
              </h3>
            </div>
            <p className="text-sm text-slate-400 mt-1">
              Reported: {formatDate(incident.reported_at)}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-slate-300 hover:text-white hover:bg-slate-700 self-start"
          >
            {isActive ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                View Details
              </>
            )}
          </Button>
        </div>

        <div
          className="overflow-hidden transition-all duration-300"
          style={{ maxHeight: isActive ? `${contentHeight}px` : "0" }}
        >
          <div
            ref={contentRef}
            className="pt-3 text-slate-300 border-t border-slate-700 mt-3"
          >
            {incident.description}
          </div>
        </div>
      </div>
    </Card>
  );
}
