# Portfolio v2

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org) [![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev) [![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)](https://www.typescriptlang.org) [![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

A modern, feature-rich developer portfolio built with **Next.js 16**, **React 19**, and **TypeScript**. Showcase your projects, write about your journey, and connect real-time integrations with GitHub, Spotify, Codewars, WakaTime, and more—all powered by AI chat and a beautiful, responsive design.

**Live demo:** https://portfolio-v2-psi-ecru.vercel.app/](https://zidvsd.site/
## Table of Contents

- [What You Get](#what-you-get)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Core Features & Integrations](#core-features--integrations)
- [Customization](#customization)
- [API Routes](#api-routes)
- [Database](#database)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## What You Get

### Modern Tech Stack

- **Next.js 16** App Router with streaming and optimized performance
- **React 19** Server & Client Components
- **TypeScript** for type safety across the codebase
- **Tailwind CSS** + **shadcn/ui** for beautiful, accessible components
- **Mongoose + MongoDB** for reliable data persistence
- **ESLint + Prettier** for consistent code quality

### Real-time Data Integrations

- **GitHub** — Fetch repositories, contribution stats, and profile activity
- **Spotify** — Display currently playing tracks and personalized playlists
- **Codewars** — Showcase coding challenge progress and rankings
- **WakaTime** — Visualize coding activity breakdown by language
- **Google Gemini** — AI-powered chat assistant for visitor interactions
- **Resend** — Reliable email delivery for contact form submissions

### Pre-built Portfolio Sections

- **Projects** — GitHub-synced projects with featured showcase and detail pages
- **Blog** — Markdown-powered blog with filtering, search, and admin dashboard
- **Dashboard** — Real-time stats and integrations widget gallery
- **Achievements** — Track milestones, certifications, and accomplishments
- **Contact** — Form with email validation and AI-assisted responses
- **About** — Personalized profile with skills, experience, and status

### Polished User Experience

- Dark/Light theme support with persistent preference
- Mobile-first responsive design
- Smooth page transitions and animations with Framer Motion
- Skeleton loaders for perceived performance
- Toast notifications (Sonner)
- Image carousels with keyboard navigation (Embla)

## Quick Start

### Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** and npm/yarn/pnpm
- **MongoDB Atlas account** (free tier available) OR local MongoDB instance via Docker
- API keys for the integrations you want to use (optional for local development)

### Installation

1. **Clone and install**

   ```bash
   git clone https://github.com/yourusername/portfolio-v2.git
   cd portfolio-v2
   npm install
   ```

2. **Set up environment variables**

   ```bash
   # Copy the template
   cp .env.example .env.local
   # Edit with your API keys
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser. The app auto-reloads on file changes thanks to Turbopack.

## Configuration

### Environment Variables

Create a `.env.local` file in the project root. Here's a complete template:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# GitHub (optional - for project fetching)
NEXT_PUBLIC_GITHUB_USERNAME=your-username
GITHUB_API_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

# Spotify (optional - for music integration)
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token

# Google Gemini (optional - for AI chat)
GEMINI_API_KEY=your_gemini_api_key

# WakaTime (optional - for activity stats)
WAKATIME_API_KEY=your_wakatime_api_key

# Codewars (optional - for coding challenges)
CODEWARS_USERNAME=your_codewars_username

# Email (Resend - for contact form)
RESEND_API_KEY=your_resend_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Getting API Keys

| Service       | Link                                                                         | Required?             |
| ------------- | ---------------------------------------------------------------------------- | --------------------- |
| GitHub        | [Create Personal Access Token](https://github.com/settings/tokens?type=beta) | No                    |
| Spotify       | [Developer Dashboard](https://developer.spotify.com/dashboard)               | No                    |
| Google Gemini | [Create API Key](https://ai.google.dev/)                                     | No                    |
| WakaTime      | [Settings → API Key](https://wakatime.com/settings/account)                  | No                    |
| Codewars      | [Public API](https://docs.codewars.com/api)                                  | No                    |
| Resend        | [Get API Key](https://resend.com/keys)                                       | Only for contact form |
| MongoDB       | [Create Atlas Cluster](https://www.mongodb.com/cloud/atlas)                  | Yes                   |

**Note:** All integrations except MongoDB are optional. The portfolio works great with just MongoDB for local development.

### Development & Build Commands

```bash
npm run dev          # Start dev server with Turbopack (instant HMR)
npm run build        # Build for production
npm start            # Run production server locally
npm run typecheck    # Full TypeScript type checking
npm run lint         # ESLint + Next.js lint check
npm run format       # Prettier code formatting
```

## Project Structure

```
portfolio-v2/
├── app/                              # Next.js App Router (server-rendered)
│   ├── page.tsx                      # Home page with hero & projects
│   ├── layout.tsx                    # Root layout & providers
│   ├── globals.css                   # Global styles & CSS variables
│   ├── (auth)/                       # Auth group
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── (admin)/                      # Protected admin routes
│   │   └── studio/
│   ├── about/page.tsx                # About section
│   ├── achievements/page.tsx         # Achievements showcase
│   ├── projects/                     # Projects section
│   │   ├── page.tsx
│   │   └── [projectId]/page.tsx
│   ├── blog/                         # Blog section
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── dashboard/page.tsx            # Integrations dashboard
│   ├── contact/page.tsx              # Contact form
│   └── api/                          # API routes
│       ├── auth/route.ts
│       ├── chat/route.ts             # AI chat endpoint (Gemini)
│       ├── contact/route.ts          # Email submission (Resend)
│       └── blog/route.ts
│
├── components/                       # React components (UI & features)
│   ├── layout/
│   │   ├── MainLayout.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileMenuDrawer.tsx
│   ├── dashboard/                    # Integration cards
│   │   ├── GitHubCard.tsx
│   │   ├── SpotifyCard.tsx
│   │   ├── CodewarsCard.tsx
│   │   ├── WakaTimeCard.tsx
│   │   └── ...
│   ├── blog/
│   │   ├── BlogCard.tsx
│   │   ├── BlogList.tsx
│   │   ├── BlogSinglePage.tsx
│   │   └── BlogFilterBar.tsx
│   ├── forms/
│   │   ├── LoginForm.tsx
│   │   ├── SignUpForm.tsx
│   │   ├── ContactForm.tsx
│   │   └── BlogForm.tsx
│   ├── ui/                           # shadcn/ui & custom components
│   ├── themes/                       # Theme provider
│   ├── motion/                       # Animation wrappers
│   │   ├── MotionWrapper.tsx
│   │   ├── StaggerWrapper.tsx
│   │   └── InView.tsx
│   ├── skeleton/                     # Loading skeletons
│   └── sections/
│       ├── home/
│       ├── blog/
│       ├── projects/
│       └── achievements/
│
├── lib/                              # Utilities & configuration
│   ├── services/                     # External API integrations
│   │   ├── github.ts                 # GitHub API
│   │   ├── spotify.ts                # Spotify API
│   │   ├── codewars.ts               # Codewars API
│   │   ├── wakatime.ts               # WakaTime API
│   │   ├── resend.ts                 # Email service
│   │   ├── queries.ts                # Database queries
│   │   └── gemini.ts                 # Google Gemini AI
│   ├── constants/
│   │   ├── projects-config.ts        # Featured projects
│   │   └── tech-data.ts              # Technology metadata
│   ├── types/                        # TypeScript definitions
│   │   └── index.ts
│   ├── schemas/                      # Zod validation schemas
│   ├── db.ts                         # MongoDB connection
│   ├── auth.ts                       # Authentication setup (Better Auth)
│   ├── utils.ts                      # Utility functions
│   └── markdown-parser.ts            # Markdown → HTML conversion
│
├── models/                           # Mongoose schemas
│   ├── Profile.ts                    # User profile
│   ├── Blogs.ts                      # Blog posts
│   ├── Achievements.ts               # Achievements
│   └── Experiences.ts                # Work experience
│
├── hooks/                            # Custom React hooks
│   └── useBlogFilters.ts
│
├── public/                           # Static assets
│   ├── images/
│   ├── icons/
│   └── ...
│
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
└── postcss.config.mjs
```

## Core Features & Integrations

### GitHub Integration

Automatically fetch and display your repositories with real-time data:

```tsx
// app/projects/page.tsx
import { getProjects } from "@/lib/services/github"

export default async function ProjectsPage() {
  const projects = await getProjects()
  return <ProjectList projects={projects} />
}
```

**Configure featured projects** in [lib/constants/projects-config.ts](lib/constants/projects-config.ts):

```ts
export const MY_PROJECTS = [
  {
    name: "Portfolio v2",
    slug: "portfolio-v2",
    deployUrl: "https://portfolio.dev",
    image: "/images/projects/portfolio-v2.png",
    isFeatured: true,
  },
]
```

**Features:**

- Auto-synced repository list
- Contribution graph visualization
- Profile stats (followers, stars, etc.)

### Spotify Integration

Display your music taste in real-time:

```tsx
// components/dashboard/SpotifyCard.tsx
import { SpotifyPlayingCard } from "@/components/dashboard/SpotifyPlayingCard"
import { SpotifyPlaylistCarousel } from "@/components/dashboard/SpotifyPlaylistCarousel"

export default function SpotifySection() {
  return (
    <>
      <SpotifyPlayingCard />
      <SpotifyPlaylistCarousel />
    </>
  )
}
```

**Setup:**

1. Create a [Spotify Developer App](https://developer.spotify.com/dashboard)
2. Get Client ID, Client Secret, and Refresh Token
3. Add to `.env.local`

### AI Chat Assistant

Google Gemini powers an intelligent chat assistant on your portfolio:

```tsx
// POST /api/chat
const response = await fetch("/api/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ message: "Tell me about your projects" }),
})
const { reply } = await response.json()
```

The AI uses a personalized system prompt to answer questions about your portfolio, projects, and experience.

### WakaTime & Codewars Integration

Track your coding activity:

- **WakaTime** — Languages, projects, and time spent coding
- **Codewars** — Challenge rating, completed katas, language leaderboards

```tsx
// components/dashboard/WakaTimeCard.tsx & CodewarsCard.tsx
<WakaTimeWrapper />
<CodewarsCardWrapper />
```

### Contact Form with Email

Submit contact requests with automatic email delivery via Resend:

```tsx
// POST /api/contact
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss..."
}
```

Responses are validated with Zod and sent to your email instantly.

## Customization

### Update Your Profile

Edit your profile information via MongoDB. The profile model includes:

```ts
// models/Profile.ts
{
  name: "Your Name",
  headline: "Full Stack Developer",
  location: "San Francisco, CA",
  workStatus: "Open to opportunities",
  bio: "I build web apps and love open source",
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    twitter: "https://twitter.com/yourhandle",
    email: "you@example.com"
  },
  skills: ["React", "Next.js", "TypeScript", "MongoDB", "Tailwind CSS"],
}
```

### Customize Styling

Modify Tailwind configuration in [tailwind.config.ts](tailwind.config.ts):

```ts
export default {
  theme: {
    extend: {
      colors: {
        primary: "#your-color",
        accent: "#highlight-color",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
    },
  },
}
```

### Add Blog Posts

Blog posts are stored in MongoDB. Create a new blog via:

1. Admin dashboard at `/admin/studio` (or manually via MongoDB)
2. Use the [BlogForm component](components/forms/BlogForm.tsx)
3. Write in Markdown with syntax highlighting support

```ts
// Example blog document structure
{
  title: "Getting Started with Next.js 16",
  slug: "getting-started-nextjs-16",
  content: "# Next.js 16\n\n...",
  category: "Web Development",
  featured: true,
  createdAt: Date.now(),
}
```

### Add Dashboard Cards

Create new integration cards by following the component pattern:

```tsx
// components/dashboard/YourCard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function YourIntegrationCard() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Fetch data from API
  }, [])

  return (
    <Card className="backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Your Integration</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Render your data */}
      </CardContent>
    </Card>
  )
}
```

Then import and use in [app/dashboard/page.tsx](app/dashboard/page.tsx).

## API Routes

All API routes enforce request validation with Zod and return JSON responses.

### POST `/api/chat`

Send a message to the AI chat assistant powered by Google Gemini.

**Request:**

```json
{
  "message": "What technologies do you use?"
}
```

**Response:**

```json
{
  "reply": "I use Next.js, React, TypeScript, MongoDB, and Tailwind CSS..."
}
```

**Error Response:**

```json
{ "error": "Invalid message" }
```

### POST `/api/contact`

Submit a contact form with automatic email delivery.

**Request:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to collaborate on..."
}
```

**Response:**

```json
{ "success": true, "message": "Email sent successfully" }
```

### GET/POST `/api/blog`

Fetch or create blog posts (protected with authentication).

**GET Response:**

```json
{
  "blogs": [
    {
      "_id": "...",
      "title": "My First Blog",
      "slug": "my-first-blog",
      "content": "...",
      "createdAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

## Database

This project uses **MongoDB** with **Mongoose** for schema validation and queries.

### Mongoose Models

#### Profile

Stores user profile information and settings.

#### Blogs

Blog posts with markdown content, categories, and metadata.

#### Achievements

Milestones, certifications, and accomplishments.

#### Experiences

Work history and professional experience.

### Local MongoDB Setup

**Option 1: Docker (Recommended)**

```bash
docker run -d \
  -p 27017:27017 \
  --name mongodb \
  mongo:latest
```

**Option 2: MongoDB Atlas (Free)**

1. Create account at [mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a free M0 cluster
3. Get connection string and add to `.env.local`

### Seeding Data

Create initial data by connecting to MongoDB:

```ts
import { connectDB } from "@/lib/db"
import Profile from "@/models/Profile"

async function seed() {
  await connectDB()

  const profile = await Profile.create({
    name: "Your Name",
    headline: "Full Stack Developer",
    // ... other fields
  })

  console.log("Profile created:", profile)
}

seed()
```

## Development

### Code Quality

This project uses modern tooling for consistency and reliability:

```bash
# Type checking
npm run typecheck

# Linting
npm run lint

# Code formatting (auto-fix)
npm run format

# All checks before commit
npm run typecheck && npm run lint && npm run format
```

### Project Structure Best Practices

- **Server Components by Default** — Use Server Components in App Router for data fetching
- **TypeScript Everywhere** — Full type coverage, no `any` types
- **Component Separation** — Isolate client-side interactivity with `"use client"`
- **Utility Functions** — Keep logic in `lib/` for reusability
- **API Organization** — Group related API routes by feature

## Troubleshooting

### Integrations Not Showing Data

- Verify all required API keys are in `.env.local`
- Check for API rate limits on external services
- Review browser console for error messages
- Ensure tokens haven't expired (especially Spotify refresh token)

### Build Fails

- Run `npm install` again to ensure all dependencies are installed
- Clear Next.js cache: `rm -rf .next`
- Verify Node.js version: `node --version` (requires 18+)
- Check for TypeScript errors: `npm run typecheck`

### MongoDB Connection Issues

```bash
# Test connection string is valid
mongosh "your-connection-string"

# Ensure network access is allowed in MongoDB Atlas
# (IP Whitelist includes your machine's IP)
```

### Port Already in Use

```bash
# Use a different port
npm run dev -- -p 3001
```

## Contributing

We welcome contributions! Whether it's bug fixes, feature additions, or documentation improvements, your help makes this portfolio better for everyone.

### How to Contribute

1. **Fork** the repository
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and ensure code quality
   ```bash
   npm run format
   npm run lint
   npm run typecheck
   ```
4. **Commit with a clear message**
   ```bash
   git commit -m "feat: add new integration card"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Open a Pull Request** with a description of your changes

### Development Guidelines

- Use **TypeScript** for all new code
- Follow the **existing code style** — run `npm run format` before committing
- Keep components **small and reusable**
- Add **proper type annotations** (no `any` types)
- Test **responsive design** on mobile and desktop

### Areas for Contribution

- UI/UX improvements and design enhancements
- New integrations (Twitch, YouTube, BookStack, etc.)
- Better documentation and guides
- Bug fixes and performance optimizations
- Accessibility improvements

## License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

You're free to use this portfolio as a template for your own projects!

---

**Questions or Found an Issue?**

- [Report a Bug](../../issues/new)
- [Request a Feature](../../issues/new)
- [Start a Discussion](../../discussions)
- Contact via the portfolio's contact form

