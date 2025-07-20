import { execSync } from 'child_process';

if (process.env.NEXT_PUBLIC_VERCEL_ENV) {
  execSync('npx prisma generate', { stdio: 'inherit' });
}
