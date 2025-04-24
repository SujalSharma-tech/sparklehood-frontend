import type { Incident } from "./types"

export const mockIncidents: Incident[] = [
  {
    id: 1,
    title: "Biased Recommendation Algorithm",
    description:
      "Algorithm consistently favored certain demographics in job recommendations, leading to potential discrimination in hiring processes. Initial analysis suggests the training data contained historical biases that were amplified in the model's outputs. Immediate action required to retrain with balanced datasets.",
    severity: "Medium",
    reported_at: "2025-03-15T10:00:00Z",
  },
  {
    id: 2,
    title: "LLM Hallucination in Critical Info",
    description:
      "Large Language Model provided incorrect safety procedure information when queried about emergency protocols in a manufacturing setting. The model confidently stated incorrect chemical handling procedures that could have resulted in serious injury. Immediate containment measures have been implemented to prevent the model from responding to safety-critical queries.",
    severity: "High",
    reported_at: "2025-04-01T14:30:00Z",
  },
  {
    id: 3,
    title: "Minor Data Leak via Chatbot",
    description:
      "Chatbot inadvertently exposed non-sensitive user metadata during conversation sessions. The information included general user preferences and non-identifying usage patterns. While no personal identifiable information was compromised, this represents a deviation from expected privacy boundaries.",
    severity: "Low",
    reported_at: "2025-03-20T09:15:00Z",
  },
  {
    id: 4,
    title: "Autonomous System Override Failure",
    description:
      "Human operator attempted to override autonomous decision-making system in warehouse operations, but the system continued its programmed task for 12 seconds before accepting the override command. No injuries occurred, but the delay represents a significant safety concern in time-sensitive scenarios.",
    severity: "High",
    reported_at: "2025-03-25T16:45:00Z",
  },
  {
    id: 5,
    title: "Facial Recognition False Positive",
    description:
      "Security system incorrectly identified an authorized employee as a restricted individual, temporarily denying access to critical infrastructure. Investigation revealed the system had an unusually high false positive rate for certain facial features and lighting conditions.",
    severity: "Medium",
    reported_at: "2025-03-18T11:20:00Z",
  },
  {
    id: 6,
    title: "Content Moderation Underfiltering",
    description:
      "AI content moderation system failed to flag several instances of policy-violating content on community platform. The content remained visible for approximately 3 hours before manual review identified the issue. Analysis suggests the moderation model had not been updated to recognize emerging patterns of policy evasion.",
    severity: "Medium",
    reported_at: "2025-03-30T08:10:00Z",
  },
  {
    id: 7,
    title: "Translation Error in Medical Context",
    description:
      "AI translation service incorrectly translated dosage instructions for medication, suggesting a frequency of 'twice daily' instead of 'once weekly' in patient materials. The error was caught during secondary human review before distribution. Root cause appears to be ambiguous phrasing in the source language.",
    severity: "High",
    reported_at: "2025-03-22T13:40:00Z",
  },
]
