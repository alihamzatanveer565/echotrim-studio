# EchoTrim Studio

EchoTrim Studio is a modern browser app that removes silence from audio files using FFmpeg.wasm.  
It is designed as a portfolio-ready project with an eye-catching neon UI, smooth motion, and fully local processing.

## Features

- Upload up to 8 audio files and reorder them before processing
- Configure silence threshold and minimum silence duration
- Process entirely in-browser (no server-side audio upload)
- Track progress with visual feedback
- Review before/after duration and file size stats
- Download cleaned WAV output

## Tech Stack

- React + Vite
- Tailwind CSS
- Framer Motion
- FFmpeg.wasm

## Local Development

```bash
npm install
npm run dev
```

App runs on `http://localhost:5173`.

## Build

```bash
npm run build
npm run preview
```

## Deploy To Your Own Vercel

This repository already includes `vercel.json` with headers required by FFmpeg.wasm.

### Option A: Vercel Dashboard

1. Push this code to your own GitHub repository.
2. In Vercel, click **Add New Project**.
3. Import your repository and deploy with defaults:
   - Framework: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`

### Option B: Vercel CLI

```bash
npm i -g vercel
vercel login
vercel
vercel --prod
```

## Push To Your Own GitHub Repository

If you cloned someone else's repository and want your own remote:

```bash
git remote remove origin
git remote add origin git@github.com:<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

## Portfolio Notes

- Project type: Audio utility / productivity
- Key value: Privacy-first processing and practical creator workflow
- UI direction: Modern dark-neon gradient with subtle grid pattern and motion

## Privacy

All audio processing happens inside your browser. Files are not uploaded to any backend service.
