import { supabase, Car } from "@/lib/supabase";

export class CarService {
  // Получить все автомобили
  static async getAllCars(): Promise<Car[]> {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Ошибка загрузки автомобилей:", error);
      return this.getFallbackCars();
    }
  }

  // Получить рекомендуемые автомобили
  static async getFeaturedCars(): Promise<Car[]> {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("is_available", true)
        .limit(3)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Ошибка загрузки рекомендуемых автомобилей:", error);
      return this.getFallbackCars().slice(0, 3);
    }
  }

  // Создать предзаказ
  static async createPreOrder(
    orderData: Omit<PreOrder, "id" | "created_at" | "status">,
  ) {
    try {
      const { data, error } = await supabase
        .from("pre_orders")
        .insert([{ ...orderData, status: "pending" }])
        .select();

      if (error) throw error;
      return data?.[0];
    } catch (error) {
      console.error("Ошибка создания предзаказа:", error);
      throw error;
    }
  }

  // Резервные данные (пока БД не подключена)
  private static getFallbackCars(): Car[] {
    return [
      {
        id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2023,
        price: 2850000,
        image:
          "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&h=300&fit=crop",
        mileage: 15000,
        fuel: "Бензин",
        transmission: "Автомат",
        body_type: "Седан",
        color: "Белый",
        description: "Надежный японский седан в отличном состоянии",
        is_available: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        make: "BMW",
        model: "X5",
        year: 2022,
        price: 5200000,
        image:
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&h=300&fit=crop",
        mileage: 25000,
        fuel: "Дизель",
        transmission: "Автомат",
        body_type: "Внедорожник",
        color: "Черный",
        description: "Премиальный немецкий внедорожник",
        is_available: true,
        created_at: new Date().toISOString(),
      },
      {
        id: 3,
        make: "LADA",
        model: "Vesta",
        year: 2024,
        price: 1450000,
        image:
          "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&h=300&fit=crop",
        mileage: 5000,
        fuel: "Бензин",
        transmission: "Механика",
        body_type: "Седан",
        color: "Серый",
        description: "Новый отечественный автомобиль",
        is_available: true,
        created_at: new Date().toISOString(),
      },
    ];
  }
}
