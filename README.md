# 21M Reasons — 21mreasons.com

The definitive case for Bitcoin. 236 reasons and counting.

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173` — use your phone on the same WiFi to test mobile by visiting `http://YOUR_IP:5173`

## Build for Production

```bash
npm run build
```

Output goes to `/dist` folder — ready to deploy.

## Deploy to Vercel (Recommended — Free)

### Option A: One-click (easiest)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your GitHub repo
4. Vercel auto-detects Vite — just click Deploy
5. Add your domain: Settings → Domains → add `21mreasons.com`
6. Update DNS at your registrar:
   - Type: `CNAME` → Name: `@` → Value: `cname.vercel-dns.com`
   - Type: `CNAME` → Name: `www` → Value: `cname.vercel-dns.com`

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel --prod
vercel domains add 21mreasons.com
```

### Option C: Netlify
```bash
npm run build
# Drag /dist folder to netlify.com/drop
# Add custom domain in Site Settings → Domain Management
```

## Deploy to Cloudflare Pages (Also Free)
1. Push to GitHub
2. Go to Cloudflare Dashboard → Pages → Create Project
3. Connect GitHub repo
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add `21mreasons.com` as custom domain

## Test on Mobile (Local)

1. Run `npm run dev -- --host`
2. Find your computer's local IP (e.g. `192.168.1.100`)
3. On your phone, open `http://192.168.1.100:5173`

## Structure

```
21mreasons/
├── index.html          # Entry HTML with meta tags & OG data
├── package.json        # Dependencies & scripts
├── vite.config.js      # Vite configuration
├── src/
│   ├── main.jsx        # React mount point
│   └── App.jsx         # Main app component (all-in-one)
└── dist/               # Production build output (after npm run build)
```

## Content

- 236 REASON posts covering sovereignty, scarcity, adoption, energy, AI, space, robotics
- Power Law Model visualisation
- 6 rotating on-chain metrics (TMMP, MVRV, NUPL, SOPR, MVRV-Z, STH-MVRV)
- 16 fundamental value proposition cards
- 27 famous quotes
- Champions ticker with 31 advocates + 9 heads of state
- 15 essential reading recommendations + 8 resource links
- Live BTC/USD price display
- Fully responsive: desktop, tablet, mobile, small mobile
