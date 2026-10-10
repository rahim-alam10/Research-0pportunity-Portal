# Research Opportunity Portal

A full-stack research opportunity portal for browsing, creating, editing, and managing university research opportunities.

- **Frontend:** React 19, React Router, Vite, Bootstrap, and Tailwind CSS
- **Backend:** Node.js, Express, and Mongoose
- **Database:** MongoDB
- **Repository:** [github.com/rahim-alam10/Research-0pportunity-Portal](https://github.com/rahim-alam10/Research-0pportunity-Portal)

## Features

- Landing page with an overview of the portal and featured opportunities
- Opportunity listing page with research opportunity cards
- Opportunity detail page with research description, supervisor, department, skills, positions, deadline, and status
- Create new research opportunities
- Edit existing opportunities
- Close open opportunities
- Delete opportunities
- Search and filter support through the backend API
- MongoDB references for departments, supervisors, and opportunities
- Seed script for loading sample opportunity data
- Responsive layout for desktop, tablet, and mobile screens

## Project Structure

```text
Project/
├── frontend/
│   ├── src/
│   │   ├── components/       # React page and UI components
│   │   ├── data/             # API client and frontend data helpers
│   │   ├── App.jsx           # Application routes
│   │   └── index.css         # Global styling
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── config/           # Database connection
│   │   ├── controllers/      # Request handlers
│   │   ├── data/             # Seed data and seed script
│   │   ├── models/           # Mongoose models
│   │   ├── routes/           # Express routes
│   │   └── index.js          # API server entry point
│   └── package.json
└── README.md
```

## Requirements

Install the following before running the project:

- Node.js 18 or newer
- npm
- MongoDB running locally or a MongoDB Atlas connection string

## Configuration

Create a `.env` file in the `backend` directory:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/research-opportunity-portal
```

For MongoDB Atlas, replace `MONGODB_URI` with the Atlas connection string.

The frontend uses `http://localhost:8000/api` by default. Because the backend runs on port `3000` by default, create `frontend/.env` with:

```env
VITE_API_URL=http://localhost:3000/api
```

If the backend is running on another host or port, update `VITE_API_URL` accordingly.

## Installation

Install dependencies separately for the frontend and backend:

```bash
cd frontend
npm install

cd ../backend
npm install
```

## Running the Application

Start the backend in one terminal:

```bash
cd backend
npm run dev
```

The API will be available at `http://localhost:3000`.

Start the frontend in a second terminal:

```bash
cd frontend
npm run dev
```

Vite will display the local frontend URL, normally `http://localhost:5173`.

## Loading Sample Data

Make sure MongoDB is running and `backend/.env` is configured, then run:

```bash
cd backend
npm run seed
```

The seed script creates or updates departments, supervisors, and research opportunities without creating duplicate records for the same opportunity title and department.

## Frontend Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/opportunities` | Browse all opportunities |
| `/opportunities/:id` | View opportunity details |
| `/add-opportunity` | Create an opportunity |
| `/add-opportunity/:id` | Edit an opportunity |
| `/add-opportunities` | Alternate route for creating an opportunity |
| `/test-plan` | View the project test plan |

## API Reference

All API routes are prefixed with `/api`.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/opportunities` | List all opportunities |
| `GET` | `/api/opportunities/:id` | Get one opportunity |
| `POST` | `/api/opportunities` | Create an opportunity |
| `PUT` | `/api/opportunities/:id` | Update an opportunity |
| `PATCH` | `/api/opportunities/:id/status` | Toggle an opportunity between Open and Closed |
| `DELETE` | `/api/opportunities/:id` | Delete an opportunity |

### Query Parameters

The list endpoint supports:

```text
GET /api/opportunities?status=Open
GET /api/opportunities?department=<department-id>
GET /api/opportunities?search=machine learning
```

### Create or Update Payload

```json
{
  "title": "Research opportunity title",
  "description": "A description containing at least 20 characters.",
  "researchArea": "Computer Networks",
  "department": "Computer Science",
  "supervisor": "Dr. Example Supervisor",
  "requiredSkills": "Python, research methods",
  "positionsAvailable": 2,
  "duration": "8 weeks",
  "deadline": "2026-12-01",
  "status": "Open"
}
```

The backend resolves department and supervisor names into MongoDB references and converts comma-separated skills into an array.

## Data Validation

- Opportunity titles must contain 5 to 150 characters.
- Descriptions must contain at least 20 characters.
- At least one position is required, with a maximum of 100.
- Status must be `Open` or `Closed`.
- Deadlines must be future dates when provided.
- Duplicate opportunity titles are not allowed within the same department.

## Available Scripts

### Frontend

Run these commands from `frontend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

### Backend

Run these commands from `backend/`:

| Command | Description |
| --- | --- |
| `npm run dev` | Start the API with Node watch mode |
| `npm start` | Start the API normally |
| `npm run seed` | Seed sample data into MongoDB |

## Verification

Before submitting changes, run:

```bash
cd frontend
npm run lint
npm run build
```

For backend changes, start the backend and verify the API using a browser, Postman, or `curl`.

## Troubleshooting

### Frontend cannot reach the API

Confirm that:

1. MongoDB is running.
2. The backend is running on port `3000`.
3. `frontend/.env` contains `VITE_API_URL=http://localhost:3000/api`.
4. The frontend development server was restarted after changing `.env`.

### Database connection fails

Check the `MONGODB_URI` value in `backend/.env` and confirm that the MongoDB service or Atlas cluster is available.

### Port already in use

Set a different `PORT` in `backend/.env`, then update `VITE_API_URL` to use the same backend port.

## License

This project is intended for academic and educational use.
