import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { Filter, ArrowUpDown, AlertTriangle, Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IncidentCard } from "@/components/incident-card";
import { NewIncidentForm } from "@/components/new-incident-form";
import IncidentSkeleton from "./IndentSkeleton";
import { BASE_URL } from "@/lib/constants";
import type { Incident, SeverityLevel } from "@/lib/types";
import IncidentSummary from "./IncidentSummary";
const api = {
  baseUrl: BASE_URL,

  async getIncidents() {
    return axios.get<Incident[]>(`${this.baseUrl}/incidents`);
  },

  async deleteIncident(id: string) {
    return axios.delete(`${this.baseUrl}/incidents/${id}`);
  },

  async createIncident(incident: Omit<Incident, "_id" | "reported_at">) {
    return axios.post<Incident>(`${this.baseUrl}/incidents`, incident);
  },
};

function IncidentDashboard() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [filteredIncidents, setFilteredIncidents] = useState<Incident[]>([]);
  const [severityFilter, setSeverityFilter] = useState<SeverityLevel | "All">(
    "All"
  );
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeIncident, setActiveIncident] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchIncidents();
  }, []);

  useEffect(() => {
    if (!incidents.length) {
      setFilteredIncidents([]);
      return;
    }

    let filtered = [...incidents];

    if (severityFilter !== "All") {
      filtered = filtered.filter(
        (incident) => incident.severity === severityFilter
      );
    }

    filtered.sort((a, b) => {
      const dateA = new Date(a.reported_at).getTime();
      const dateB = new Date(b.reported_at).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredIncidents(filtered);
  }, [incidents, severityFilter, sortOrder]);

  const fetchIncidents = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.getIncidents();
      setIncidents(response.data);

      console.log(response.data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to fetch incidents";
      setError(errorMessage);
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIncident = async (
    incidentData: Omit<Incident, "_id" | "reported_at">
  ) => {
    try {
      const loadingToast = toast.loading("Submitting incident...");

      const response = await api.createIncident(incidentData);
      setIncidents((prev) => [...prev, response.data]);
      setIsFormOpen(false);

      toast.dismiss(loadingToast);
      toast.success("Incident reported successfully!");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to report incident";
      toast.error(`Error: ${errorMessage}`);
    }
  };

  const handleDeleteIncident = async (id: string) => {
    try {
      setDeletingId(id);
      await api.deleteIncident(id);

      setIncidents((prev) => prev.filter((incident) => incident._id !== id));

      if (activeIncident === id) {
        setActiveIncident(null);
      }

      toast.success("Incident deleted successfully");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete incident";
      toast.error(`Error: ${errorMessage}`);
    } finally {
      setDeletingId(null);
    }
  };

  const toggleIncidentDetails = (id: string) => {
    setActiveIncident(activeIncident === id ? null : id);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />

      <div className="flex flex-col gap-8">
        <header className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-slate-200" />
            </div>
            <h1 className="text-3xl font-bold text-white">
              AI Safety Incident Dashboard
            </h1>
          </div>
          <p className="text-slate-400">
            Monitor, track, and report AI safety incidents to ensure responsible
            AI development
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-slate-800/50 border-slate-700 p-4 md:col-span-2">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ">
                <div className="flex items-center gap-2 ">
                  <Filter className="h-4 w-4 text-slate-400" />
                  <div className="flex gap-2 flex-wrap">
                    {["All", "Low", "Medium", "High"].map((severity) => (
                      <Button
                        key={severity}
                        variant={
                          severityFilter === severity ? "default" : "outline"
                        }
                        size="sm"
                        onClick={() =>
                          setSeverityFilter(severity as SeverityLevel | "All")
                        }
                        className={`
                          ${
                            severityFilter === severity
                              ? "bg-slate-600 hover:bg-slate-500 text-muted-foreground"
                              : "bg-slate-800 border-slate-700 hover:bg-slate-700 text-white"
                          }
                          transition-all
                        `}
                        disabled={loading}
                      >
                        {severity}
                      </Button>
                    ))}
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
                  }
                  className="bg-slate-800 border-slate-700 hover:bg-slate-700 flex items-center gap-2 text-white"
                  disabled={loading}
                >
                  <ArrowUpDown className="h-4 w-4" />
                  {sortOrder === "newest" ? "Newest First" : "Oldest First"}
                </Button>
              </div>

              <div className="space-y-4">
                {loading ? (
                  <>
                    <IncidentSkeleton />
                    <IncidentSkeleton />
                    <IncidentSkeleton />
                  </>
                ) : error ? (
                  <div className="text-center py-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-900/30 mb-4">
                      <AlertTriangle className="h-6 w-6 text-red-400" />
                    </div>
                    <h3 className="text-lg font-medium text-red-300">
                      Error loading incidents
                    </h3>
                    <p className="text-slate-400 mt-2">{error}</p>
                    <Button
                      onClick={fetchIncidents}
                      className="mt-4 bg-slate-700 hover:bg-slate-600"
                    >
                      Retry
                    </Button>
                  </div>
                ) : filteredIncidents.length > 0 ? (
                  filteredIncidents.map((incident) => (
                    <div key={incident._id} className="relative">
                      <IncidentCard
                        incident={incident}
                        isActive={activeIncident === incident._id}
                        onToggle={() => toggleIncidentDetails(incident._id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-slate-400 hover:text-red-400 hover:bg-slate-700/50"
                        onClick={() => handleDeleteIncident(incident._id)}
                        disabled={deletingId === incident._id}
                      >
                        {deletingId === incident._id ? (
                          <div className="h-4 w-4 border-2 border-t-transparent border-slate-400 rounded-full animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 mb-4">
                      <Info className="h-6 w-6 text-slate-400" />
                    </div>
                    <h3 className="text-lg font-medium text-slate-300">
                      No incidents found
                    </h3>
                    <p className="text-slate-400 mt-2">
                      {severityFilter !== "All"
                        ? `No ${severityFilter} severity incidents found. Try changing your filter.`
                        : "No incidents found. Add a new incident to get started."}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <IncidentSummary
            incidents={incidents}
            loading={loading}
            setIsFormOpen={setIsFormOpen}
          />
        </div>
      </div>

      {isFormOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <Card className="bg-slate-800 border-slate-700 p-6 max-w-md w-full">
            <NewIncidentForm
              onSubmit={handleAddIncident}
              onCancel={() => setIsFormOpen(false)}
            />
          </Card>
        </div>
      )}
    </div>
  );
}

export default IncidentDashboard;
