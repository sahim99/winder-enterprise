-- Create a function to atomically place an order and decrement product stock
CREATE OR REPLACE FUNCTION public.place_order_and_decrement_stock(
  p_customer_name text,
  p_phone text,
  p_address text,
  p_pin_code text,
  p_city text,
  p_state text,
  p_items jsonb,
  p_total numeric,
  p_user_id uuid DEFAULT NULL
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_item jsonb;
  v_product_id uuid;
  v_quantity int;
  v_current_stock int;
  v_inserted_order jsonb;
BEGIN
  -- Loop through each item to verify and decrement stock
  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_product_id := (v_item->>'product_id')::uuid;
    v_quantity := (v_item->>'quantity')::int;
    
    -- Check and lock the product row to avoid race conditions
    SELECT stock INTO v_current_stock
    FROM public.products
    WHERE id = v_product_id
    FOR UPDATE;
    
    IF v_current_stock IS NULL THEN
      RAISE EXCEPTION 'Product % not found', v_product_id;
    END IF;
    
    IF v_current_stock < v_quantity THEN
      RAISE EXCEPTION 'Insufficient stock for product. Available: %, Requested: %', v_current_stock, v_quantity;
    END IF;
    
    -- Decrement the stock
    UPDATE public.products
    SET stock = stock - v_quantity
    WHERE id = v_product_id;
  END LOOP;
  
  -- Insert the order record
  INSERT INTO public.orders (
    customer_name,
    phone,
    address,
    pin_code,
    city,
    state,
    items,
    total,
    user_id
  ) VALUES (
    p_customer_name,
    p_phone,
    p_address,
    p_pin_code,
    p_city,
    p_state,
    p_items,
    p_total,
    p_user_id
  )
  RETURNING row_to_json(public.orders.*)::jsonb INTO v_inserted_order;
  
  RETURN v_inserted_order;
END;
$$;
