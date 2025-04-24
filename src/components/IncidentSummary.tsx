import { PlusCircle } from "lucide-react";
import SummarySkeleton from "./SummarySkeleton";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "@/components/ui/badge";
import { Incident } from "@/lib/types";

function IncidentSummary({
  incidents,
  loading,
  setIsFormOpen,
}: {
  incidents: Incident[];
  loading: boolean;
  setIsFormOpen: (isOpen: boolean) => void;
}) {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700 p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Incident Summary</h2>
          <Badge
            variant="outline"
            className="bg-slate-700 text-slate-300 border-slate-600"
          >
            {loading ? "..." : incidents.length} Total
          </Badge>
        </div>

        {loading ? (
          <SummarySkeleton />
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between items-center p-2 rounded-md bg-slate-800/70">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <span className="text-slate-300">High</span>
              </div>
              <Badge
                variant="outline"
                className="bg-slate-700 text-slate-300 border-slate-600"
              >
                {incidents.filter((i) => i.severity === "High").length}
              </Badge>
            </div>

            <div className="flex justify-between items-center p-2 rounded-md bg-slate-800/70">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                <span className="text-slate-300">Medium</span>
              </div>
              <Badge
                variant="outline"
                className="bg-slate-700 text-slate-300 border-slate-600"
              >
                {incidents.filter((i) => i.severity === "Medium").length}
              </Badge>
            </div>

            <div className="flex justify-between items-center p-2 rounded-md bg-slate-800/70">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
                <span className="text-slate-300">Low</span>
              </div>
              <Badge
                variant="outline"
                className="bg-slate-700 text-slate-300 border-slate-600"
              >
                {incidents.filter((i) => i.severity === "Low").length}
              </Badge>
            </div>
          </div>
        )}
      </Card>

      <Card className="bg-slate-800/50 border-slate-700 p-4">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-white">
            Report New Incident
          </h2>
          <p className="text-sm text-slate-300">
            Observed an AI safety issue? Report it immediately to help improve
            our systems.
          </p>
          <Button
            onClick={() => setIsFormOpen(true)}
            className="bg-slate-700 hover:bg-slate-600 text-white"
            disabled={loading}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Report Incident
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default IncidentSummary;
