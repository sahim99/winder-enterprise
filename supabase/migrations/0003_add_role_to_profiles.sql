-- Step 2: Add role column to profiles table
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'customer'
  CHECK (role IN ('customer', 'developer'));
