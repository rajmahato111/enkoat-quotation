# EnKoat Quote Vision - Frontend

This is the frontend application for EnKoat Quote Vision, an interactive dashboard application for managing quotes and visualizing project performance data for IntelliKoat™ roofing solutions.

## Technologies

- React 18 with TypeScript
- Vite
- React Router DOM for routing
- TanStack Query for data fetching
- Shadcn/UI Components
- Tailwind CSS with custom theming
- Recharts for data visualization
- React Leaflet for map visualization
- React Hook Form with Zod validation
- Radix UI primitives
- Lucide React icons
- Sonner for toast notifications

## Architecture

The frontend follows a modern React architecture optimized for scalability and maintainability:

![Frontend Architecture](../screenshot/Frontend%20architecture%20.png)

For a detailed breakdown of the architecture, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, or bun package manager

### Installation

1. Clone the repository
2. Navigate to the frontend directory
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

The application will be available at http://localhost:8080 by default.

### Build

To build the application for production:

```bash
npm run build
# or
yarn build
# or 
bun run build
```

## Features

### Quote Management
- Interactive quote submission form
- Form validation with Zod schemas
- State and roof type selection
- Project details capture

### Dashboard Analytics
- Real-time performance metrics
- Project statistics visualization
- Interactive charts and graphs
- Geographic performance map
- Filtering by state, roof type, and date range
- CSV report export functionality

### User Interface
- Responsive design for all screen sizes
- Modern component library with Shadcn/UI
- Dynamic theming support
- Toast notifications
- Loading states and error handling
- Interactive data filters

## Project Structure

- `/src` - Source code
  - `/api` - API service layer and types
  - `/components` - Reusable UI components
    - `/ui` - Shadcn UI components
    - `/dashboard` - Dashboard-specific components
  - `/hooks` - Custom React hooks
  - `/lib` - Utility functions
  - `/pages` - Page components
    - `Dashboard.tsx` - Performance dashboard
    - `Quote.tsx` - Quote submission
    - `Index.tsx` - Landing page
  - `/types` - TypeScript type definitions

## Environment Variables

| Name | Description | Default |
|------|-------------|---------|
| VITE_API_URL | URL of the backend API | http://localhost:5000/api |

## Development Guidelines

- Use TypeScript for all new components
- Follow the existing component structure
- Utilize Shadcn/UI components for consistency
- Implement proper error handling
- Add loading states for async operations
- Keep components modular and reusable
- Use TanStack Query for data fetching
- Follow the established theming system

## Available Scripts

- `dev` - Start development server
- `build` - Build for production
- `lint` - Run ESLint
- `preview` - Preview production build locally