# Acadrive

Acadrive is a college-focused anonymous academic resource sharing platform.

## Features
- 📂 **Anonymous Uploads**: Share resources without creating an account.
- 🔍 **Instant Search**: Find resources by subject, code, or filename.
- 🏷️ **Smart Filters**: Filter by resource type and semester.
- 👀 **PDF Preview**: View documents before downloading.
- ⚡ **Fast & Modern**: Built with React, Vite, and Tailwind CSS.

## Getting Started

### Prerequisites
- Node.js (v16+)
- A Supabase account

### Installation

1. **Clone the repository** (if applicable) or navigate to the project folder.

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**:
   - Go to your Supabase Project Dashboard -> SQL Editor.
   - Copy the contents of `database_schema.sql` and run it.
   - This prevents errors by setting up the required table, storage bucket, and security policies.

5. **Run Locally**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Deployment on Vercel

1. Push this code to a GitHub repository.
2. Login to Vercel and "Add New Project".
3. Import your repository.
4. In "Environment Variables", add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
5. Click **Deploy**.

## Tech Stack
- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Storage)
- **Icons**: Lucide React
