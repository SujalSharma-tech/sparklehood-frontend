# Sparklehood Frontend Documentation

## Project Overview
Sparklehood Frontend is a React.js application that provides a dashboard for tracking and managing AI safety incidents. The application connects to a REST API backend  to fetch, create, and delete incident records.

For setting up the backend please check the repository below
```
https://github.com/SujalSharma-tech/sparklehood-backend
```

## Features
- Interactive dashboard displaying AI safety incidents
- Filter incidents by severity (Low, Medium, High, or All)
- Sort incidents by date (newest or oldest first)
- View detailed descriptions of each incident
- Report new incidents with customizable severity levels
- Delete existing incidents
- Visual indicators for incident severity levels
- Loading states with skeleton UI
- Error handling with toast notifications

## Tech Stack
- **React**: UI library
- **TypeScript**: Type safety
- **Axios**: API requests
- **React Hot Toast**: Toast notifications
- **Tailwind CSS**: Styling
- **Shadcn UI**: UI components
- **Lucide Icons**: Icon library

## API Routes

The application interacts with the following API endpoints:

### 1. Get All Incidents
```
GET /incidents
```

**Description**: Retrieves all incident records from the database.

**Response**: An array of incident objects with the following structure:
```typescript
{
  _id: string;
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
  reported_at: string;
}
```


### 2. Create New Incident
```
POST /incidents
```

**Description**: Creates a new incident record in the database.

**Request Body**:
```typescript
{
  title: string;
  description: string;
  severity: "Low" | "Medium" | "High";
}
```

**Response**: The created incident object including the generated ID and timestamp.

### 3. Delete Incident
```
DELETE /incidents/:id
```

**Description**: Deletes a specific incident by its ID.

**URL Parameter**:
- `id`: The unique identifier of the incident to delete.

**Response**: Success confirmation or error message.

## Component Structure

1. **Dashboard.tsx**: Main container component that manages state and API interactions
2. **IncidentCard.tsx**: Displays individual incident details with expand/collapse functionality
3. **NewIncidentForm.tsx**: Form for creating new incidents with validation
4. **IncidentSummary.tsx**: Shows statistics about incidents by severity
5. **IncidentSkeleton.tsx**: Loading placeholder for incidents
6. **SummarySkeleton.tsx**: Loading placeholder for summary statistics

## Getting Started

### Prerequisites
- Node.js
- npm
- Backend API running on http://localhost:3000

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```

### Configuration
The Backend API base URL is configured in constants.ts and can be modified if your backend is running on a different host or port.

## Error Handling
The application includes comprehensive error handling with toast notifications for:
- Failed API requests
- Form validation errors
- Successful operations

## State Management
The application uses React's useState and useEffect hooks for state management, with the following key states:
- `incidents`: All fetched incidents
- `filteredIncidents`: Incidents filtered by severity and sort order
- `loading`: Loading status for API operations
- `error`: Error messages from API operations
- `activeIncident`: Currently expanded incident
- `severityFilter`: Current severity filter setting
- `sortOrder`: Current sort order setting

