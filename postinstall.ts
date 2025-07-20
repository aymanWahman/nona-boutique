// postinstall.ts
import { execSync } from 'child_process';

console.log('Running postinstall script...');

try {
  if (process.env.VERCEL || process.env.NEXT_PUBLIC_VERCEL_ENV) {
    console.log('Generating Prisma client in Vercel environment...');
    execSync('npx prisma generate', { stdio: 'inherit' });
  } else {
    console.log('Local environment - Prisma client will be generated during development');
  }
} catch (error) {
  console.error('Postinstall error:', error);
  process.exit(1);
}