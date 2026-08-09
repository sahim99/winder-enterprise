-- 1. Create reviews table
CREATE TABLE public.reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES public.products(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(product_id, user_id)
);

-- Indexes for efficient querying
CREATE INDEX reviews_product_id_idx ON public.reviews(product_id);
CREATE INDEX reviews_user_id_idx ON public.reviews(user_id);
CREATE INDEX reviews_created_at_idx ON public.reviews(created_at DESC);

-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policy: Public read access
CREATE POLICY "reviews_public_read" ON public.reviews
  FOR SELECT USING (true);

-- Policy: Authenticated users can insert if they purchased the product
-- Note: 'pending' status is allowed since most orders are COD. We just exclude 'cancelled'.
CREATE POLICY "reviews_purchased_insert" ON public.reviews
  FOR INSERT WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
      SELECT 1 FROM public.orders o, jsonb_array_elements(o.items) item 
      WHERE o.user_id = auth.uid() 
      AND o.status != 'cancelled'
      AND (item->>'product_id')::uuid = NEW.product_id
    )
  );

-- Computed columns for the products query
-- 2. Average rating function
CREATE OR REPLACE FUNCTION average_rating(p public.products) RETURNS numeric AS $$
  SELECT COALESCE(ROUND(AVG(rating), 1), 0) FROM public.reviews WHERE product_id = p.id;
$$ LANGUAGE sql STABLE;

-- 3. Review count function
CREATE OR REPLACE FUNCTION review_count(p public.products) RETURNS bigint AS $$
  SELECT COUNT(*) FROM public.reviews WHERE product_id = p.id;
$$ LANGUAGE sql STABLE;
