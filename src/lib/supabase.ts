import { createClient } from "@supabase/supabase-js";

// Временные заглушки - будут заменены на реальные значения
const supabaseUrl = "https://your-project.supabase.co";
const supabaseKey = "your-anon-key";

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Car {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  image: string;
  mileage: number;
  fuel: string;
  transmission: string;
  body_type: string;
  color: string;
  description: string;
  is_available: boolean;
  created_at: string;
}

export interface PreOrder {
  id: number;
  car_id: number;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  comment?: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at: string;
}
