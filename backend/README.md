# EnKoat Quote Vision - Backend API

This is the backend API for EnKoat Quote Vision, providing data services for quote management and project analytics.

## Technologies

- Node.js
- Express
- TypeScript
- MongoDB (with Mongoose)
- Morgan (for request logging)
- CORS

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, or bun package manager
- MongoDB (local or Atlas cloud instance)

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:

```bash
npm install
# or
yarn install
# or
bun install
```

4. Copy `.env.example` to `.env` and update the variables as needed:

```bash
cp .env.example .env
```

### Development

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
bun dev
```

The API server will be available at http://localhost:5000 by default.

### Build

To build the application for production:

```bash
npm run build
# or
yarn build
# or 
bun run build
```

To run the production build:

```bash
npm start
# or
yarn start
# or
bun start
```

## API Endpoints

### Health Check
- `GET /health` - Check API health status
- `GET /` - Welcome endpoint with API information

### Quotes

- `GET /api/quotes` - Get all quotes (supports filtering)
- `GET /api/quotes/:id` - Get a specific quote by ID
- `POST /api/quotes` - Create a new quote
- `PUT /api/quotes/:id` - Update an existing quote
- `DELETE /api/quotes/:id` - Delete a quote
- `GET /api/quotes/filter-options` - Get available filter options (states, roof types)

### Projects

- `GET /api/projects` - Get all projects (supports filtering)
- `GET /api/projects/:id` - Get a specific project by ID
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update an existing project
- `DELETE /api/projects/:id` - Delete a project
- `GET /api/projects/stats` - Get aggregated project statistics

## Architecture

The backend follows a layered architecture pattern for clean separation of concerns:

![Backend Architecture](../screenshot/Backend%20architecture%20.png)

### Key Components:

- Express Server & Middleware Layer
- Route Handlers & Controllers
- Data Access Layer (MongoDB/Mongoose)
- Error Handling & Logging
- Type Definitions & Validation

## Project Structure

- `/src` - Source code
  - `/config` - Configuration files (database connection)
  - `/controllers` - Request handlers
  - `/models` - Database models
  - `/routes` - API route definitions
  - `/utils` - Utility functions and database seeding

## Environment Variables

| Name | Description | Default |
|------|-------------|---------|
| PORT | Port for the API server | 5000 |
| MONGO_URI | MongoDB connection string | mongodb://localhost:27017/enkoat-quote-vision |
| NODE_ENV | Environment (development, production) | development |