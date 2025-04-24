import { Skeleton } from "./ui/skeleton";
import { Card } from "./ui/card";

const IncidentSkeleton = () => (
  <Card className="bg-slate-800/50 border-slate-700 p-4">
    <div className="flex justify-between">
      <div className="space-y-2">
        <Skeleton className="h-4 w-24 bg-slate-700" />
        <Skeleton className="h-6 w-64 bg-slate-700" />
        <Skeleton className="h-4 w-40 bg-slate-700" />
      </div>
      <Skeleton className="h-8 w-24 bg-slate-700" />
    </div>
  </Card>
);

export default IncidentSkeleton;
