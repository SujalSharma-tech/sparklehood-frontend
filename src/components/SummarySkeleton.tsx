import { Skeleton } from "./ui/skeleton";

const SummarySkeleton = () => (
  <div className="space-y-3">
    <div className="flex justify-between items-center p-2">
      <Skeleton className="h-4 w-16 bg-slate-700" />
      <Skeleton className="h-6 w-8 bg-slate-700" />
    </div>
    <div className="flex justify-between items-center p-2">
      <Skeleton className="h-4 w-16 bg-slate-700" />
      <Skeleton className="h-6 w-8 bg-slate-700" />
    </div>
    <div className="flex justify-between items-center p-2">
      <Skeleton className="h-4 w-16 bg-slate-700" />
      <Skeleton className="h-6 w-8 bg-slate-700" />
    </div>
  </div>
);

export default SummarySkeleton;
