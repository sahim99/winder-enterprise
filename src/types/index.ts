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
          description?: string | null
          image_url?: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          image_url?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          image_url?: string | null
          created_at?: string | null
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
          compare_price: number | null
          stock_count: number
          category_id: string | null
          images: string[]
          is_published: boolean | null
          is_featured: boolean | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          price: number
          compare_price?: number | null
          stock_count?: number
          category_id?: string | null
          images?: string[]
          is_published?: boolean | null
          is_featured?: boolean | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          price?: number
          compare_price?: number | null
          stock_count?: number
          category_id?: string | null
          images?: string[]
          is_published?: boolean | null
          is_featured?: boolean | null
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
          user_id: string | null
          customer_name: string
          customer_phone: string
          customer_email: string | null
          shipping_address: Json
          items: Json
          subtotal: number
          total: number
          status: string
          payment_method: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          customer_name: string
          customer_phone: string
          customer_email?: string | null
          shipping_address: Json
          items: Json
          subtotal: number
          total: number
          status?: string
          payment_method?: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          customer_name?: string
          customer_phone?: string
          customer_email?: string | null
          shipping_address?: Json
          items?: Json
          subtotal?: number
          total?: number
          status?: string
          payment_method?: string
          created_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          id: string
          role: string
          name: string | null
          phone: string | null
          saved_address: Json | null
          created_at: string | null
        }
        Insert: {
          id: string
          role?: string
          name?: string | null
          phone?: string | null
          saved_address?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          role?: string
          name?: string | null
          phone?: string | null
          saved_address?: Json | null
          created_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

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

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  slug: string
}
