# Quick Deployment Guide - Vercel

## 🚀 Deploy to Vercel in 5 Minutes

### Option 1: Web Interface (Recommended for beginners)

#### Step 1: Prepare Your Repository

1. Fork or clone this repository to your GitHub account
2. Ensure all files are committed and pushed to GitHub

#### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **"New Project"**
3. Import your repository from the list
4. Vercel will automatically detect it's a Vite project

#### Step 3: Configure Build Settings

Vercel should auto-detect these settings, but verify:

- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

#### Step 4: Deploy

1. Click **"Deploy"**
2. Wait for the build to complete (usually 2-3 minutes)
3. Your app will be live at `https://your-project-name.vercel.app`

### Option 2: Vercel CLI (For developers)

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Login to Vercel

```bash
vercel login
```

#### Step 3: Deploy

```bash
# Navigate to your project directory
cd ffmpeg-web

# Deploy (creates preview deployment)
vercel

# Deploy to production
vercel --prod
```

#### Step 4: Follow CLI Prompts

The CLI will ask you a few questions:

- **Set up and deploy?** → `Y`
- **Which scope?** → Select your account
- **Link to existing project?** → `N` (for first deployment)
- **What's your project's name?** → `ffmpeg-web` (or press Enter for default)
- **In which directory is your code located?** → `./` (press Enter for current directory)

#### Step 5: Automatic Deployments

For future deployments, you can use:

```bash
# Deploy to production with automatic confirmation
vercel --prod --yes

# Deploy with custom domain
vercel --prod --yes --name your-custom-name
```

## ✅ What's Already Configured

The project includes a `vercel.json` file with the necessary headers for FFmpeg.wasm:

- Cross-Origin-Embedder-Policy: require-corp
- Cross-Origin-Opener-Policy: same-origin
- Cross-Origin-Resource-Policy: same-origin

These headers are required for SharedArrayBuffer support, which FFmpeg.wasm needs.

## 🔧 Custom Domain (Optional)

1. In your Vercel dashboard, go to **Settings** → **Domains**
2. Add your custom domain
3. Follow the DNS configuration instructions

## 📝 Environment Variables

No environment variables are required for basic functionality. The app works entirely in the browser.

## 🐛 Troubleshooting

### Build Fails

- Check that all dependencies are in `package.json`
- Ensure Node.js version is 16+ in Vercel settings

### App Doesn't Work

- Verify the `vercel.json` headers are applied
- Check browser console for errors
- Ensure you're using HTTPS (required for SharedArrayBuffer)

### CLI Issues

```bash
# If vercel command not found
npm install -g vercel

# If login fails
vercel logout
vercel login

# If deployment fails, try with verbose output
vercel --debug

# Check your Vercel account status
vercel whoami
```

### Performance Issues

- Vercel automatically optimizes static assets
- Consider enabling Vercel's Edge Network for faster global delivery

## 🔄 Automatic Deployments

### Web Interface

Vercel automatically deploys when you push to:

- `main` branch → Production
- Any other branch → Preview deployment

### CLI Commands

```bash
# List all deployments
vercel ls

# View deployment details
vercel inspect [deployment-url]

# Remove a deployment
vercel remove [deployment-url]

# Pull environment variables
vercel env pull .env.local

# Add environment variables
vercel env add VARIABLE_NAME

# View project settings
vercel project ls
```

## 📊 Analytics (Optional)

Enable Vercel Analytics in your dashboard to track:

- Page views
- Performance metrics
- User behavior

---

**That's it!** Your FFmpeg Web app should be live and working. 🎉
