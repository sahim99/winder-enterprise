-- Categories
create table public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null
);

-- Products
create table public.products (
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

-- Orders
create table public.orders (
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

-- Indexes
create index products_category_id_idx on public.products(category_id);
create index products_slug_idx on public.products(slug);
create index products_is_published_idx on public.products(is_published);
create index orders_status_idx on public.orders(status);
create index orders_created_at_idx on public.orders(created_at desc);

-- RLS
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

-- Categories: public read
create policy "categories_public_read" on public.categories
  for select using (true);

-- Products: public read for published only
create policy "products_public_read" on public.products
  for select using (is_published = true);

-- Products: service role full access (admin)
create policy "products_service_all" on public.products
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Orders: service role only (no customer can read others' orders)
create policy "orders_service_all" on public.orders
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

-- Seed categories
insert into public.categories (name, slug) values
  ('Sofas', 'sofas'),
  ('Beds', 'beds'),
  ('Chairs', 'chairs'),
  ('Tables', 'tables'),
  ('Wardrobes', 'wardrobes'),
  ('Dining Sets', 'dining-sets'),
  ('Office Chairs', 'office-chairs'),
  ('Televisions', 'televisions'),
  ('Air Conditioners', 'air-conditioners'),
  ('Refrigerators', 'refrigerators'),
  ('Washing Machines', 'washing-machines');
