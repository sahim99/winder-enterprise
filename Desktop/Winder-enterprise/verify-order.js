const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres:Sahim@700109@db.nmzkohrohnxuwsjfmgjt.supabase.co:5432/postgres'
});

const sql = `
select customer_name, phone, city, total, status
from public.orders
order by created_at desc
limit 1;
`;

async function run() {
  try {
    await client.connect();
    const result = await client.query(sql);
    console.log('Last order:', result.rows);
    await client.end();
  } catch (err) {
    console.error('Query failed:', err.message);
  }
}
run();
