export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string
          id: number
          recipe_id: number
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: number
          recipe_id: number
          user_id: string
        }
        Update: {
          created_at?: string
          id?: number
          recipe_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "favorites_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      fridge: {
        Row: {
          count: number
          created_at: string
          product_id: number
          user_id: string
        }
        Insert: {
          count: number
          created_at?: string
          product_id: number
          user_id: string
        }
        Update: {
          count?: number
          created_at?: string
          product_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fridge_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fridge_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      ingredients: {
        Row: {
          created_at: string
          id: number
          product_id: number
          recipe_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          product_id: number
          recipe_id: number
        }
        Update: {
          created_at?: string
          id?: number
          product_id?: number
          recipe_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "ingredients_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ingredients_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      nutritions: {
        Row: {
          created_at: string
          id: number
          recipe_id: number
          type: Database["public"]["Enums"]["NutritionTypes"]
          unit: Database["public"]["Enums"]["Units"]
          value: number
        }
        Insert: {
          created_at?: string
          id?: number
          recipe_id: number
          type: Database["public"]["Enums"]["NutritionTypes"]
          unit: Database["public"]["Enums"]["Units"]
          value: number
        }
        Update: {
          created_at?: string
          id?: number
          recipe_id?: number
          type?: Database["public"]["Enums"]["NutritionTypes"]
          unit?: Database["public"]["Enums"]["Units"]
          value?: number
        }
        Relationships: [
          {
            foreignKeyName: "nutritions_recipe_id_fkey"
            columns: ["recipe_id"]
            isOneToOne: false
            referencedRelation: "recipes"
            referencedColumns: ["id"]
          },
        ]
      }
      product: {
        Row: {
          barcode: string | null
          brand: string
          code: string
          id: number
          image_url: string
          title: string
          user_id: string
        }
        Insert: {
          barcode?: string | null
          brand: string
          code: string
          id?: number
          image_url: string
          title?: string
          user_id: string
        }
        Update: {
          barcode?: string | null
          brand?: string
          code?: string
          id?: number
          image_url?: string
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      recipes: {
        Row: {
          cooking_time: number
          cover_url: string
          created_at: string
          description: string
          id: number
          kcal: number
          less_title: string
          recipe_text: string | null
          title: string
          user_id: string
        }
        Insert: {
          cooking_time: number
          cover_url: string
          created_at?: string
          description: string
          id?: number
          kcal: number
          less_title: string
          recipe_text?: string | null
          title: string
          user_id: string
        }
        Update: {
          cooking_time?: number
          cover_url?: string
          created_at?: string
          description?: string
          id?: number
          kcal?: number
          less_title?: string
          recipe_text?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_random_recipe: {
        Args: Record<PropertyKey, never>
        Returns: {
          cooking_time: number
          cover_url: string
          created_at: string
          description: string
          id: number
          kcal: number
          less_title: string
          recipe_text: string | null
          title: string
          user_id: string
        }[]
      }
    }
    Enums: {
      NutritionTypes: "carbs" | "proteins" | "fats" | "kcal"
      Units: "g" | "kcal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
