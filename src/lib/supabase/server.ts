import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Service client bypasses RLS for admin operations
export async function createServiceClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch (error) {
            // Ignored
          }
        },
      },
    }
  )
}

/*
SUPABASE SCHEMA

-- categories
create table categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  image_url text,
  created_at timestamptz default now()
);

-- products
create table products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric not null,
  compare_price numeric,
  images text[] default '{}',
  category_id uuid references categories(id),
  stock_count integer default 0,
  is_published boolean default false,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- orders
create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  shipping_address jsonb not null,
  items jsonb not null,
  subtotal numeric not null,
  total numeric not null,
  status text default 'Pending',
  payment_method text default 'COD',
  created_at timestamptz default now()
);

-- profiles
create table profiles (
  id uuid primary key references auth.users(id),
  role text default 'customer',
  full_name text,
  phone text,
  default_address jsonb,
  created_at timestamptz default now()
);

-- RLS Policies:
alter table products enable row level security;
alter table orders enable row level security;
alter table profiles enable row level security;

-- products: public can SELECT where is_published = true
create policy "Public products are viewable by everyone." on products for select using (is_published = true);

-- orders: users can SELECT/INSERT their own; admin can SELECT all
create policy "Users can insert their own orders." on orders for insert with check (auth.uid() = user_id OR user_id IS NULL);
create policy "Users can view their own orders." on orders for select using (auth.uid() = user_id OR user_id IS NULL);

-- profiles: users can SELECT/UPDATE their own
create policy "Users can view own profile." on profiles for select using (auth.uid() = id);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

*/
