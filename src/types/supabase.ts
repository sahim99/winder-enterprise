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
