// eslint-disable-next-line @typescript-eslint/no-require-imports
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: "postgresql://neondb_owner:nonaz-boutique-2004@ep-mute-meadow-aete2g45-pooler.c-2.us-east-2.aws.neon.tech:5432/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false }
});

async function test() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT NOW()');
    console.log('✅ الاتصال ناجح:', res.rows[0]);
  } finally {
    client.release();
    await pool.end();
  }
}

test().catch(console.error);