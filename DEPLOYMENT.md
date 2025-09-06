# Deployment Guide

## Vercel Deployment

This quiz app is ready for deployment on Vercel! Here's what you need to do:

### 1. Database Setup ✅

**Current setup:** Neon PostgreSQL database is already configured and working!

The app is using:
- **Neon PostgreSQL** - Cloud database with free tier
- **Database URL** - Already configured in `.env`
- **Schema** - PostgreSQL provider in `prisma/schema.prisma`

### 2. Environment Variables ✅

**For Development:** `DATABASE_URL` is now optional in development mode
**For Production:** `DATABASE_URL` is required for Vercel deployment

Your `.env` file should contain:
- `DATABASE_URL` - Neon PostgreSQL connection string (optional in dev, required in production)
- `AUTH_SECRET` - Authentication secret
- `AUTH_DISCORD_ID` & `AUTH_DISCORD_SECRET` - Optional Discord auth

### 3. Database Schema ✅

**Already configured!** The schema is set to PostgreSQL:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

Database tables are created and ready!

### 4. Deploy

The build script is already configured to run `prisma generate` before building, so deployment should work automatically.

### 5. Test

After deployment, test the quiz functionality:
- Take the quiz
- Submit a score
- Check the leaderboard

## Features

✅ **Randomized Answer Order** - Each question has answers shuffled individually  
✅ **Leaderboard** - Top 10 scores displayed  
✅ **Score Submission** - Users can add their name to the leaderboard  
✅ **Responsive Design** - Works on all devices  
✅ **Modern UI** - Beautiful glass-morphism design  

## Tech Stack

- **Next.js 15** - React framework
- **tRPC** - Type-safe API
- **Prisma** - Database ORM
- **Tailwind CSS** - Styling
- **TypeScript** - Type safety
