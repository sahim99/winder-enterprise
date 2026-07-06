<div align="center">
  <a href="https://winder-enterprise.vercel.app/">
    <img src="https://image.thum.io/get/width/1200/crop/800/https://winder-enterprise.vercel.app/" alt="Winder Enterprise Website Screenshot" width="100%" />
  </a>

  <br />
  <br />

  <h1>Winder Enterprise</h1>
  <p>
    A modern, scalable enterprise e-commerce platform built with Next.js, Supabase, and Tailwind CSS.
  </p>

  <p>
    <a href="https://winder-enterprise.vercel.app/"><strong>Live Demo</strong></a> ·
    <a href="#getting-started"><strong>Getting Started</strong></a> ·
    <a href="#tech-stack"><strong>Tech Stack</strong></a>
  </p>
</div>

---

## 🚀 Overview

**Winder Enterprise** is a full-stack web application designed for performance and scalability. It leverages the latest features of **Next.js (App Router)** alongside **Supabase** for a robust backend and authentication system.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15+](https://nextjs.org/) (App Router, React 19)
- **Database & Auth**: [Supabase](https://supabase.com/) & PostgreSQL
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Deployment**: [Vercel](https://vercel.com/)

## 💻 Getting Started

Follow these instructions to run the project locally.

### Prerequisites

- Node.js 18+ and `npm`, `yarn`, or `pnpm` installed.
- A Supabase project set up.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/sahim99/winder-enterprise.git
   cd winder-enterprise
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Set up environment variables:**
   Copy the example environment file and fill in your Supabase credentials.
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 📂 Project Structure

- `src/` - Next.js App Router source code, pages, and components.
- `public/` - Static assets and images.
- `supabase/` - Database migrations and configurations.
- `components.json` - Shadcn UI configuration.

## 📜 Available Scripts

- `pnpm dev` - Starts the development server.
- `pnpm build` - Builds the application for production.
- `pnpm start` - Starts the production server.
- `pnpm lint` - Runs ESLint to find and fix problems.

## 🌐 Deployment

This project is configured and ready to be deployed on [Vercel](https://vercel.com/new).
