import { supabase, Car, PreOrder } from "@/lib/supabase";

export class CarService {
  // Получить все автомобили с фильтрацией
  static async getAllCars(filters?: {
    country?: "domestic" | "foreign";
    minPrice?: number;
    maxPrice?: number;
    make?: string;
  }): Promise<Car[]> {
    try {
      let query = supabase
        .from("cars")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: false });

      if (filters?.country) {
        query = query.eq("country", filters.country);
      }
      if (filters?.minPrice) {
        query = query.gte("price", filters.minPrice);
      }
      if (filters?.maxPrice) {
        query = query.lte("price", filters.maxPrice);
      }
      if (filters?.make) {
        query = query.ilike("make", `%${filters.make}%`);
      }

      const { data, error } = await query;

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
        .eq("is_featured", true)
        .limit(6)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data && data.length > 0
        ? data
        : this.getFallbackCars().slice(0, 6);
    } catch (error) {
      console.error("Ошибка загрузки рекомендуемых автомобилей:", error);
      return this.getFallbackCars().slice(0, 6);
    }
  }

  // Получить автомобиль по ID
  static async getCarById(id: number): Promise<Car | null> {
    try {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Ошибка загрузки автомобиля:", error);
      return this.getFallbackCars().find((car) => car.id === id) || null;
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

  // Добавить автомобиль (для админки)
  static async addCar(
    carData: Omit<Car, "id" | "created_at">,
  ): Promise<Car | null> {
    try {
      const { data, error } = await supabase
        .from("cars")
        .insert([carData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Ошибка добавления автомобиля:", error);
      throw error;
    }
  }

  // Инициализация БД с тестовыми данными
  static async initializeWithTestData(): Promise<void> {
    try {
      const cars = this.getFallbackCars();
      const { error } = await supabase
        .from("cars")
        .upsert(cars, { onConflict: "id" });

      if (error) throw error;
      console.log("Тестовые данные загружены в БД");
    } catch (error) {
      console.error("Ошибка инициализации БД:", error);
    }
  }

  // Расширенные резервные данные
  private static getFallbackCars(): Car[] {
    return [
      {
        id: 1,
        make: "Toyota",
        model: "Camry",
        year: 2023,
        price: 2850000,
        image:
          "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&h=400&fit=crop",
        mileage: 15000,
        fuel: "Бензин",
        transmission: "Автомат",
        body_type: "Седан",
        color: "Белый",
        description:
          "Надежный японский седан в отличном состоянии. Полная комплектация.",
        is_available: true,
        is_featured: true,
        country: "foreign",
        created_at: new Date().toISOString(),
      },
      {
        id: 2,
        make: "BMW",
        model: "X5",
        year: 2022,
        price: 5200000,
        image:
          "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop",
        mileage: 25000,
        fuel: "Дизель",
        transmission: "Автомат",
        body_type: "Внедорожник",
        color: "Черный",
        description: "Премиальный немецкий внедорожник с полным приводом",
        is_available: true,
        is_featured: true,
        country: "foreign",
        created_at: new Date().toISOString(),
      },
      {
        id: 3,
        make: "LADA",
        model: "Vesta",
        year: 2024,
        price: 1450000,
        image:
          "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&h=400&fit=crop",
        mileage: 5000,
        fuel: "Бензин",
        transmission: "Механика",
        body_type: "Седан",
        color: "Серый",
        description: "Новый отечественный автомобиль с гарантией",
        is_available: true,
        is_featured: true,
        country: "domestic",
        created_at: new Date().toISOString(),
      },
      {
        id: 4,
        make: "Volkswagen",
        model: "Polo",
        year: 2023,
        price: 1950000,
        image:
          "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop",
        mileage: 12000,
        fuel: "Бензин",
        transmission: "Автомат",
        body_type: "Хэтчбек",
        color: "Красный",
        description: "Компактный немецкий автомобиль для города",
        is_available: true,
        is_featured: false,
        country: "foreign",
        created_at: new Date().toISOString(),
      },
      {
        id: 5,
        make: "LADA",
        model: "Granta",
        year: 2023,
        price: 890000,
        image:
          "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=600&h=400&fit=crop",
        mileage: 8000,
        fuel: "Бензин",
        transmission: "Механика",
        body_type: "Седан",
        color: "Синий",
        description: "Доступный отечественный автомобиль",
        is_available: true,
        is_featured: false,
        country: "domestic",
        created_at: new Date().toISOString(),
      },
      {
        id: 6,
        make: "Mercedes-Benz",
        model: "C-Class",
        year: 2021,
        price: 3800000,
        image:
          "https://images.unsplash.com/photo-1563720223185-11003d516935?w=600&h=400&fit=crop",
        mileage: 35000,
        fuel: "Бензин",
        transmission: "Автомат",
        body_type: "Седан",
        color: "Серебристый",
        description: "Элегантный немецкий седан премиум-класса",
        is_available: true,
        is_featured: true,
        country: "foreign",
        created_at: new Date().toISOString(),
      },
    ];
  }
}

export { Car, PreOrder };
