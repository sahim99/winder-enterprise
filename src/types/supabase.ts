export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          price: number
          stock: number
          category_id: string | null
          images: string[]
          is_published: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          stock?: number
          category_id?: string | null
          images?: string[]
          is_published?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          stock?: number
          category_id?: string | null
          images?: string[]
          is_published?: boolean | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          }
        ]
      }
      orders: {
        Row: {
          id: string
          customer_name: string
          phone: string
          address: string
          pin_code: string
          city: string
          state: string
          items: Json
          total: number
          status: string
          user_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          customer_name: string
          phone: string
          address: string
          pin_code: string
          city: string
          state: string
          items: Json
          total: number
          status?: string
          user_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          customer_name?: string
          phone?: string
          address?: string
          pin_code?: string
          city?: string
          state?: string
          items?: Json
          total?: number
          status?: string
          user_id?: string | null
          created_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          name: string | null
          phone: string | null
          role: string
          saved_address: Json | null
          created_at: string | null
        }
        Insert: {
          id: string
          name?: string | null
          phone?: string | null
          role?: string
          saved_address?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          phone?: string | null
          role?: string
          saved_address?: Json | null
          created_at?: string | null
        }
        Relationships: []
      }
      wishlist_items: {
        Row: {
          id: string
          user_id: string | null
          product_id: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          product_id?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          product_id?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          }
        ]
      }
      payment_methods: {
        Row: {
          id: string
          user_id: string | null
          card_brand: string
          last_four: string
          exp_month: number
          exp_year: number
          is_default: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          card_brand: string
          last_four: string
          exp_month: number
          exp_year: number
          is_default?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          card_brand?: string
          last_four?: string
          exp_month?: number
          exp_year?: number
          is_default?: boolean | null
          created_at?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          id: string
          user_id: string | null
          order_id: string | null
          subject: string
          description: string
          status: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          order_id?: string | null
          subject: string
          description: string
          status?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          order_id?: string | null
          subject?: string
          description?: string
          status?: string | null
          created_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      place_order_and_decrement_stock: {
        Args: {
          p_customer_name: string
          p_phone: string
          p_address: string
          p_pin_code: string
          p_city: string
          p_state: string
          p_items: Json
          p_total: number
          p_user_id?: string | null
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Extracted types for convenience
export type Product = Database['public']['Tables']['products']['Row'] & {
  categories?: {
    id?: string
    name: string
    slug: string
  } | null
}
export type Category = Database['public']['Tables']['categories']['Row']
export type Order = Database['public']['Tables']['orders']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']
