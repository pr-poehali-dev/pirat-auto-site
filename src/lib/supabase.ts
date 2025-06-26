import { createClient } from "@supabase/supabase-js";

// Конфигурация Supabase - замените на ваши реальные данные
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://your-project.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "your-anon-key";

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
  is_featured: boolean;
  country: "domestic" | "foreign";
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

// SQL для создания таблиц в Supabase
export const createTablesSQL = `
-- Таблица автомобилей
CREATE TABLE IF NOT EXISTS cars (
  id BIGSERIAL PRIMARY KEY,
  make VARCHAR(50) NOT NULL,
  model VARCHAR(50) NOT NULL,
  year INTEGER NOT NULL,
  price BIGINT NOT NULL,
  image TEXT,
  mileage INTEGER DEFAULT 0,
  fuel VARCHAR(20) DEFAULT 'Бензин',
  transmission VARCHAR(20) DEFAULT 'Автомат',
  body_type VARCHAR(30),
  color VARCHAR(30),
  description TEXT,
  is_available BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  country VARCHAR(20) DEFAULT 'foreign',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Таблица предзаказов
CREATE TABLE IF NOT EXISTS pre_orders (
  id BIGSERIAL PRIMARY KEY,
  car_id BIGINT REFERENCES cars(id),
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_email VARCHAR(100),
  comment TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Индексы для оптимизации
CREATE INDEX IF NOT EXISTS idx_cars_available ON cars(is_available);
CREATE INDEX IF NOT EXISTS idx_cars_featured ON cars(is_featured);
CREATE INDEX IF NOT EXISTS idx_cars_country ON cars(country);
CREATE INDEX IF NOT EXISTS idx_preorders_status ON pre_orders(status);
`;
