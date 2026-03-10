# Dashboard Finance Monorepo Testing

A modern corporate finance dashboard built with React, Express, and PostgreSQL.

## 🚀 Tech Stack

### Frontend (apps/web)
- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4
- **State Management**: TanStack Query (React Query)
- **Icons**: Lucide React
- **Authentication**: Better Auth

### Backend (apps/server)
- **Framework**: Express.js (v5)
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Validation**: Zod
- **Runtime**: Node.js (with tsx for development)

## 📁 Project Structure

```text
.
├── apps/
│   ├── server/       # Express API & Database Schema
│   └── web/          # React Frontend Application
├── docker-compose.yml # PostgreSQL Database Infrastructure
├── package.json       # Monorepo Workspace Configuration
└── README.md          # Project Documentation
```

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- Docker (for PostgreSQL)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd 26-dashboard-finance
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the Database**
   ```bash
   npm run db:up
   ```

4. **Environment Variables**
   - Copy `apps/server/.env.example` to `apps/server/.env` and configure your database credentials.
   - Copy `apps/web/.env.example` (if exists) or create `apps/web/.env`.

5. **Start Development Servers**

   In separate terminals:
   
   **Server:**
   ```bash
   cd apps/server
   npm run dev
   ```

   **Web:**
   ```bash
   cd apps/web
   npm run dev
   ```

## 📜 Available Scripts

### Root
- `npm run db:up`: Start PostgreSQL via Docker Compose.
- `npm run db:down`: Stop the database.
- `npm run db:restart`: Restart the database.

### Server (`apps/server`)
- `npm run dev`: Start development server with tsx watch.
- `npm run db:generate`: Generate Drizzle migrations.
- `npm run db:push`: Push schema changes directly to DB.
- `npm run db:studio`: Open Drizzle Studio UI.

### Web (`apps/web`)
- `npm run dev`: Start Vite development server.
- `npm run build`: Build for production.
- `npm run lint`: Run ESLint.

## 📄 License
This project is private and for internal use.
