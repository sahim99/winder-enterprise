const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres.nmzkohrohnxuwsjfmgjt:Sahim@7001@aws-0-ap-south-1.pooler.supabase.com:6543/postgres'
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to Postgres!');
    await client.end();
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
}
run();
