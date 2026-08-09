-- Migration: 0007_live_chat_messages
-- Description: Creates the chat_messages table for Real-Time Customer-Seller Live Chat

CREATE TABLE IF NOT EXISTS public.chat_messages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    sender_type VARCHAR(20) NOT NULL, -- 'customer' or 'admin'
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

ALTER TABLE public.chat_messages ENABLE ROW LEVEL SECURITY;

-- Customers can view their own chat messages
CREATE POLICY "Users can view their own chat messages" 
ON public.chat_messages FOR SELECT 
USING (auth.uid() = user_id);

-- Customers can insert their own chat messages (where they are the customer)
CREATE POLICY "Users can insert their own chat messages" 
ON public.chat_messages FOR INSERT 
WITH CHECK (auth.uid() = user_id AND sender_type = 'customer');

-- Note: Admin access bypasses RLS using the service_role key.
