const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgres://postgres:Sahim@700109@db.nmzkohrohnxuwsjfmgjt.supabase.co:5432/postgres'
});

const sql = `
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric(10,2) not null,
  stock integer not null default 0,
  category_id uuid references public.categories(id) on delete set null,
  images text[] default '{}',
  is_published boolean default false,
  created_at timestamptz default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  address text not null,
  pin_code text not null,
  city text not null,
  state text not null,
  items jsonb not null,
  total numeric(10,2) not null,
  status text not null default 'pending',
  created_at timestamptz default now()
);

create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_slug_idx on public.products(slug);
create index if not exists products_is_published_idx on public.products(is_published);
create index if not exists orders_status_idx on public.orders(status);
create index if not exists orders_created_at_idx on public.orders(created_at desc);

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

do $$ begin
  if not exists (select 1 from pg_policies where tablename = 'categories' and policyname = 'categories_public_read') then
    create policy "categories_public_read" on public.categories for select using (true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'products' and policyname = 'products_public_read') then
    create policy "products_public_read" on public.products for select using (is_published = true);
  end if;
  if not exists (select 1 from pg_policies where tablename = 'products' and policyname = 'products_service_all') then
    create policy "products_service_all" on public.products using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
  if not exists (select 1 from pg_policies where tablename = 'orders' and policyname = 'orders_service_all') then
    create policy "orders_service_all" on public.orders using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
  end if;
end $$;

insert into public.categories (name, slug)
values
  ('Sofas', 'sofas'),
  ('Beds', 'beds'),
  ('Chairs', 'chairs'),
  ('Tables', 'tables'),
  ('Wardrobes', 'wardrobes'),
  ('Dining Sets', 'dining-sets'),
  ('Office Chairs', 'office-chairs')
on conflict (slug) do nothing;
`;

async function run() {
  try {
    await client.connect();
    console.log('Connected to Postgres.');
    await client.query(sql);
    console.log('Migration completed successfully!');
    
    // Verify
    const tables = await client.query(`select table_name from information_schema.tables where table_schema = 'public' order by table_name;`);
    console.log('Tables:', tables.rows);
    
    await client.end();
  } catch (err) {
    console.error('Migration failed:', err);
  }
}
run();
