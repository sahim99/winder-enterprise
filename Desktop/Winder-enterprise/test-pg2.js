const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres:Sahim@7001@db.nmzkohrohnxuwsjfmgjt.supabase.co:5432/postgres'
});

async function run() {
  try {
    await client.connect();
    console.log('Connected to Postgres directly!');
    await client.end();
  } catch (err) {
    console.error('Connection failed:', err.message);
  }
}
run();
