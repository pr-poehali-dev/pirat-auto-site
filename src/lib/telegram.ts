import TelegramService from "@/services/telegramService";

// Конфигурация Telegram бота
const telegramConfig = {
  botToken: import.meta.env.VITE_TELEGRAM_BOT_TOKEN || "your-bot-token",
  chatId: import.meta.env.VITE_TELEGRAM_CHAT_ID || "",
  webhookUrl: import.meta.env.VITE_TELEGRAM_WEBHOOK_URL || "",
};

// Создание единственного экземпляра сервиса
export const telegramService = new TelegramService(telegramConfig);

// Типы для Telegram интеграции
export interface TelegramOrder {
  orderId: number;
  customerName: string;
  customerPhone: string;
  carInfo: string;
  totalPrice: number;
  timestamp: Date;
}

export interface TelegramNotification {
  type: "order" | "inquiry" | "status";
  message: string;
  priority: "low" | "medium" | "high";
}

// Вспомогательные функции
export const formatPrice = (price: number): string => {
  return price.toLocaleString("ru-RU") + " ₽";
};

export const formatDate = (date: Date): string => {
  return date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};
