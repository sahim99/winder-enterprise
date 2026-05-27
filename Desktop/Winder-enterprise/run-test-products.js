const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres:Sahim@700109@db.nmzkohrohnxuwsjfmgjt.supabase.co:5432/postgres'
});

const sql = `
insert into public.products (name, slug, description, price, stock, category_id, images, is_published)
values
(
  'Royal 3-Seater Sofa',
  'royal-3-seater-sofa',
  'Premium fabric 3-seater sofa with solid wood legs. Available in grey and brown. Dimensions: 210cm x 85cm x 95cm.',
  21999, 4,
  (select id from public.categories where slug = 'sofas'),
  '{}', true
),
(
  'King Size Storage Bed',
  'king-size-storage-bed',
  'Hydraulic storage bed with premium rexine headboard. Size: 6x6.5 feet.',
  28500, 3,
  (select id from public.categories where slug = 'beds'),
  '{}', true
),
(
  'Ergonomic Office Chair',
  'ergonomic-office-chair',
  'Mesh back ergonomic chair with lumbar support and adjustable height. Ideal for long work sessions.',
  8999, 10,
  (select id from public.categories where slug = 'office-chairs'),
  '{}', true
),
(
  'Teak Wood Dining Table Set',
  'teak-wood-dining-table-set',
  'Solid teak wood dining table with 6 cushioned chairs. Dimensions: 150cm x 90cm.',
  35000, 2,
  (select id from public.categories where slug = 'dining-sets'),
  '{}', true
)
on conflict (slug) do nothing;
`;

async function run() {
  try {
    await client.connect();
    console.log('Connected to Postgres.');
    await client.query(sql);
    console.log('Test products inserted successfully!');
    
    // Verify
    const products = await client.query(`select name, price, stock, is_published from public.products order by created_at;`);
    console.log('Products:', products.rows);
    
    await client.end();
  } catch (err) {
    console.error('Insert failed:', err);
  }
}
run();
