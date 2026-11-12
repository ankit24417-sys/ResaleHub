import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load unified root .env file so frontend and backend share one configuration source
function loadRootEnv() {
  const rootEnvPath = path.resolve(__dirname, '../.env');
  if (!fs.existsSync(rootEnvPath)) return;

  const lines = fs.readFileSync(rootEnvPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex === -1) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    let val = trimmed.slice(eqIndex + 1).trim();

    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = val;
    }
  }
}

loadRootEnv();

// Normalize API URL so values like "https://resale-hub-tau.vercel.app/" or ".../api" both resolve cleanly
const rawApiUrl = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api')
  .trim()
  .replace(/\/+$/, '');
const apiUrl = rawApiUrl.endsWith('/api') ? rawApiUrl : `${rawApiUrl}/api`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: apiUrl,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
