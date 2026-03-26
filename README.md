# Portfolio v2

A modern, full-stack developer portfolio built with **Next.js 16**, **React 19**, and **TypeScript**. Showcase your projects, blog posts, and real-time integrations with GitHub, Spotify, Codewars, and more.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Development](#development)
  - [Production Build](#production-build)
- [Project Structure](#project-structure)
- [Key Integrations](#key-integrations)
- [Customization](#customization)
- [API Routes](#api-routes)
- [Database](#database)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Features

✨ **Modern Tech Stack**

- Next.js 16 with App Router and TypeScript
- React 19 server and client components
- Tailwind CSS with responsive design
- shadcn/ui components

📊 **Real-time Integrations**

- **GitHub API** — Display repositories, contributions, and profile stats
- **Spotify API** — Show currently playing tracks and playlists
- **Codewars API** — Showcase coding challenge statistics
- **WakaTime API** — Display coding activity and languages
- **Google Gemini** — AI-powered chat assistant on your portfolio

💻 **Portfolio Sections**

- **Projects** — Featured projects with GitHub integration
- **Blog** — Markdown-based blog with filtering and search
- **Dashboard** — Real-time stats and activity feeds
- **Achievements** — Track milestones and accomplishments
- **Contact Form** — Email submissions via Resend
- **About** — Personalized profile and work status

🎨 **UX Features**

- Dark/Light theme support with `next-themes`
- Responsive mobile-first design
- Smooth animations with Framer Motion
- Toast notifications with Sonner
- Skeleton loading states
- Carousel galleries with Embla

## Quick Start

### Prerequisites

- **Node.js** 18+ and npm/yarn/pnpm
- **MongoDB** instance (local or Atlas)
- Environment variables for API integrations

### Installation

1. **Clone and install dependencies**

```bash
git clone https://github.com/yourusername/portfolio-v2.git
cd portfolio-v2
npm install
```

2. **Configure environment variables** (see [Configuration](#configuration))

3. **Set up your MongoDB database data** (optional for local development)

4. **Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app reloads on file changes.

### Configuration

Create a `.env.local` file in the project root with the following variables:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@your-cluster.mongodb.net/portfolio

# GitHub API
NEXT_PUBLIC_GITHUB_USERNAME=yourusername
GITHUB_API_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxx

# Spotify API
NEXT_PUBLIC_SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret
SPOTIFY_REFRESH_TOKEN=your_spotify_refresh_token

# Google Gemini
GEMINI_API_KEY=your_gemini_api_key

# WakaTime
WAKATIME_API_KEY=your_wakatime_api_key

# Codewars
CODEWARS_USERNAME=your_codewars_username

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**Getting API Keys:**

- **GitHub**: [Create Personal Access Token](https://github.com/settings/tokens)
- **Spotify**: [Register App](https://developer.spotify.com/dashboard)
- **Google Gemini**: [Create API Key](https://ai.google.dev/)
- **WakaTime**: [API Settings](https://wakatime.com/settings/account)
- **Codewars**: [API Documentation](https://docs.codewars.com/)
- **Resend**: [Get API Key](https://resend.com/)
- **MongoDB**: [Create Atlas Cluster](https://www.mongodb.com/cloud/atlas)

### Development

```bash
npm run dev       # Start dev server with Turbopack
npm run typecheck # Type checking
npm run lint      # ESLint checks
npm run format    # Prettier formatting
```

### Production Build

```bash
npm run build  # Build for production
npm start      # Run production server
```

## Project Structure

```
portfolio-v2/
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Home page
│   ├── about/page.tsx            # About page
│   ├── projects/
│   │   ├── page.tsx              # Projects listing
│   │   └── [projectId]/page.tsx  # Project detail
│   ├── blog/
│   │   ├── page.tsx              # Blog listing
│   │   └── [slug]/page.tsx       # Blog post
│   ├── dashboard/page.tsx        # Integrations dashboard
│   ├── achievements/page.tsx     # Achievements page
│   ├── contact/page.tsx          # Contact page
│   ├── api/
│   │   ├── chat/route.ts         # AI chat endpoint
│   │   └── contact/route.ts      # Contact form endpoint
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles
├── components/                   # React components
│   ├── layout/                   # Layout components (Sidebar, Nav)
│   ├── dashboard/                # Dashboard cards (GitHub, Spotify, etc.)
│   ├── blog/                     # Blog components
│   ├── ui/                       # shadcn/ui components
│   ├── icons/                    # Custom icon components
│   └── themes/                   # Theme provider
├── lib/                          # Utilities and services
│   ├── services/                 # API integrations
│   │   ├── github.ts             # GitHub API
│   │   ├── spotify.ts            # Spotify API
│   │   ├── gemini.ts             # Gemini AI
│   │   ├── codewars.ts           # Codewars API
│   │   ├── wakatime.ts           # WakaTime API
│   │   └── queries.ts            # Database queries
│   ├── constants/
│   │   ├── projects-config.ts    # Project configuration
│   │   └── tech-data.ts          # Technology data
│   ├── types/                    # TypeScript type definitions
│   ├── schema.ts                 # Zod validation schemas
│   ├── auth.ts                   # Authentication setup
│   ├── db.ts                     # Database connection
│   └── utils.ts                  # Utility functions
├── models/                       # Mongoose schemas
│   ├── Profile.ts
│   ├── Blogs.ts
│   ├── Achievements.ts
│   └── Experiences.ts
├── public/                       # Static assets
│   ├── images/
│   ├── icons/
│   └── ...
├── hooks/                        # Custom React hooks
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.mjs               # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
└── postcss.config.mjs            # PostCSS configuration
```

## Key Integrations

### GitHub Integration

Automatically fetch and display your GitHub repositories:

```tsx
import { getProjects } from "@/lib/services/github"

const projects = await getProjects()
```

Configure which projects are featured in [lib/constants/projects-config.ts](lib/constants/projects-config.ts):

```ts
export const MY_PROJECTS = [
  {
    name: "Portfolio v2",
    slug: "portfolio-v2",
    deployUrl: "https://example.com",
    image: "/images/projects/portfolio-v2.png",
    isFeatured: true,
  },
  // ...
]
```

### Spotify Integration

Display real-time now playing track and playlists:

```tsx
import { SpotifyPlayingCard } from "@/components/dashboard/SpotifyPlayingCard"
import { SpotifyPlaylistCarousel } from "@/components/dashboard/SpotifyPlaylistCarousel"

export default function Dashboard() {
  return (
    <>
      <SpotifyPlayingCard />
      <SpotifyPlaylistCarousel />
    </>
  )
}
```

### AI Chat Assistant

The chat endpoint uses Google Gemini with a personalized system prompt:

```ts
// POST /api/chat
const response = await fetch("/api/chat", {
  method: "POST",
  body: JSON.stringify({ message: "Tell me about your projects" }),
})
```

### Contact Form

Submit contact form data via Resend:

```tsx
import { ContactForm } from "@/components/ContactForm"

export default function Contact() {
  return <ContactForm />
}
```

## Customization

### Update Profile Information

Edit [models/Profile.ts](models/Profile.ts) and populate MongoDB with your profile:

```ts
{
  name: "Your Name",
  headline: "Your Professional Headline",
  location: "Your Location",
  workStatus: "Open to opportunities",
  bio: "Your bio",
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourprofile",
    email: "your.email@example.com"
  },
  skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"]
}
```

### Add Blog Posts

Create Markdown files in your blog source and they'll be automatically indexed. Edit [lib/services/queries.ts](lib/services/queries.ts) to configure blog fetching.

### Theme Customization

Modify [tailwind.config.ts](tailwind.config.ts) to customize colors, fonts, and design tokens:

```ts
export default {
  theme: {
    extend: {
      colors: {
        primary: "#your-color",
      },
    },
  },
}
```

### Add New Dashboard Cards

Create new card components in [components/dashboard/](components/dashboard/) following the pattern:

```tsx
// components/dashboard/YourCard.tsx
export function YourCard() {
  return (
    <Card>
      <CardContent>
        {/* Your content */}
      </CardContent>
    </Card>
  )
}
```

Then add to dashboard page.

## API Routes

### POST /api/chat

Send a message to the AI chat assistant:

**Request:**

```json
{
  "message": "What technologies do you use?"
}
```

**Response:**

```json
{
  "reply": "AI response..."
}
```

### POST /api/contact

Submit a contact form:

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss..."
}
```

**Response:**

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

## Database

Uses **MongoDB** with **Mongoose** for data persistence. Models include:

- **Profile** — User profile information
- **Blogs** — Blog posts with timestamps
- **Achievements** — Milestones and accomplishments
- **Experiences** — Work experience history

### Local Development

For local MongoDB setup:

```bash
# Using Docker (recommended)
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Connection string
MONGODB_URI=mongodb://localhost:27017/portfolio
```

## Contributing

We welcome contributions! Here's how to get involved:

1. **Fork** the repository
2. **Create a feature branch** (`git checkout -b feature/your-feature`)
3. **Make your changes** and commit (`git commit -m 'Add feature'`)
4. **Push** to the branch (`git push origin feature/your-feature`)
5. **Open a Pull Request**

### Development Guidelines

- Use TypeScript for all new code
- Follow the existing code style (`npm run format`)
- Keep components modular and reusable
- Add proper type annotations
- Test responsive design on mobile

## Support

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)

### Getting Help

- **Issues** — Report bugs or request features via [GitHub Issues](../../issues)
- **Discussions** — Ask questions in [GitHub Discussions](../../discussions)
- **Documentation** — Check related service APIs for integration issues

### Troubleshooting

**Integrations not showing?**

- Verify all API keys are correctly set in `.env.local`
- Check rate limits on external APIs
- Review console for error messages

**Build fails?**

- Run `npm install` again
- Clear `.next` cache: `rm -rf .next`
- Ensure Node.js version is 18+

## License

This project is open source and available under the MIT License.

---

**Made with ❤️ by [Your Name](https://github.com/yourusername)**

Have a question? Feel free to [contact me](contact) or reach out on [GitHub](https://github.com/yourusername).
