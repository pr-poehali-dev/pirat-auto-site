import TelegramBot from "node-telegram-bot-api";
import { Car, PreOrder } from "@/lib/supabase";
import { CarService } from "./carService";

export interface TelegramConfig {
  botToken: string;
  chatId?: string;
  webhookUrl?: string;
}

export class TelegramService {
  private bot: TelegramBot | null = null;
  private config: TelegramConfig;

  constructor(config: TelegramConfig) {
    this.config = config;
    this.initBot();
  }

  private initBot() {
    try {
      if (this.config.botToken && this.config.botToken !== "your-bot-token") {
        this.bot = new TelegramBot(this.config.botToken, { polling: false });
        this.setupCommands();
      }
    } catch (error) {
      console.warn("Telegram бот не настроен:", error);
    }
  }

  private setupCommands() {
    if (!this.bot) return;

    // Команда для получения списка авто
    this.bot.onText(/\/cars/, async (msg) => {
      const chatId = msg.chat.id;
      try {
        const cars = await CarService.getFeaturedCars();
        const message = this.formatCarsMessage(cars);
        await this.bot?.sendMessage(chatId, message, {
          parse_mode: "Markdown",
        });
      } catch (error) {
        await this.bot?.sendMessage(chatId, "❌ Ошибка загрузки автомобилей");
      }
    });

    // Команда для поиска авто по марке
    this.bot.onText(/\/search (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const searchTerm = match?.[1] || "";

      try {
        const cars = await CarService.getAllCars({ make: searchTerm });
        const message =
          cars.length > 0
            ? this.formatCarsMessage(cars)
            : `🔍 Автомобили "${searchTerm}" не найдены`;

        await this.bot?.sendMessage(chatId, message, {
          parse_mode: "Markdown",
        });
      } catch (error) {
        await this.bot?.sendMessage(chatId, "❌ Ошибка поиска");
      }
    });
  }

  private formatCarsMessage(cars: Car[]): string {
    if (cars.length === 0) {
      return "🚗 Автомобили не найдены";
    }

    let message = `🚗 *Найдено автомобилей: ${cars.length}*\n\n`;

    cars.slice(0, 5).forEach((car, index) => {
      message += `${index + 1}. *${car.make} ${car.model}* (${car.year})\n`;
      message += `💰 ${car.price.toLocaleString("ru-RU")} ₽\n`;
      message += `📊 ${car.mileage.toLocaleString("ru-RU")} км | ${car.fuel} | ${car.transmission}\n\n`;
    });

    if (cars.length > 5) {
      message += `... и еще ${cars.length - 5} автомобилей`;
    }

    return message;
  }

  // Отправка уведомления о новом заказе
  async notifyNewOrder(order: PreOrder, car: Car) {
    if (!this.bot || !this.config.chatId) return;

    const message = `
🎉 *Новый заказ!*

🚗 *Автомобиль:* ${car.make} ${car.model} (${car.year})
👤 *Клиент:* ${order.customer_name}
📞 *Телефон:* ${order.customer_phone}
${order.customer_email ? `📧 *Email:* ${order.customer_email}` : ""}
${order.comment ? `💬 *Комментарий:* ${order.comment}` : ""}
💰 *Цена:* ${car.price.toLocaleString("ru-RU")} ₽

📅 *Дата:* ${new Date(order.created_at).toLocaleString("ru-RU")}
    `.trim();

    try {
      await this.bot.sendMessage(this.config.chatId, message, {
        parse_mode: "Markdown",
      });
    } catch (error) {
      console.error("Ошибка отправки уведомления в Telegram:", error);
    }
  }

  // Синхронизация данных из Telegram
  async syncCarData(carData: {
    make: string;
    model: string;
    year: number;
    price: number;
    description?: string;
  }) {
    // Здесь можно добавить логику для добавления авто через Telegram
    console.log("Синхронизация данных из Telegram:", carData);
  }

  // Получение статистики для админа
  async getStats(): Promise<string> {
    try {
      const allCars = await CarService.getAllCars();
      const featuredCars = await CarService.getFeaturedCars();

      return `
📊 *Статистика автосалона*

🚗 Всего автомобилей: ${allCars.length}
⭐ Рекомендуемых: ${featuredCars.length}
🏠 Отечественных: ${allCars.filter((c) => c.country === "domestic").length}
🌍 Зарубежных: ${allCars.filter((c) => c.country === "foreign").length}

📈 Средняя цена: ${Math.round(allCars.reduce((sum, car) => sum + car.price, 0) / allCars.length).toLocaleString("ru-RU")} ₽
      `.trim();
    } catch (error) {
      return "❌ Ошибка получения статистики";
    }
  }
}

export default TelegramService;
