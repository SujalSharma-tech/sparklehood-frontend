export type SeverityLevel = "Low" | "Medium" | "High"

export interface Incident {
  _id: string
  title: string
  description: string
  severity: SeverityLevel
  reported_at: string
}
