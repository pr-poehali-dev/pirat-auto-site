import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import { telegramService } from "@/lib/telegram";

export default function TelegramIntegration() {
  const [botToken, setBotToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [stats, setStats] = useState("");

  useEffect(() => {
    // Проверяем подключение при загрузке
    checkConnection();
  }, []);

  const checkConnection = () => {
    const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
    const chat = import.meta.env.VITE_TELEGRAM_CHAT_ID;

    setIsConnected(!!(token && token !== "your-bot-token" && chat));
    setBotToken(token || "");
    setChatId(chat || "");
  };

  const handleTestConnection = async () => {
    try {
      const statsMessage = await telegramService.getStats();
      setStats(statsMessage);
    } catch (error) {
      console.error("Ошибка тестирования:", error);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="MessageSquare" size={24} />
            Telegram Bot Integration
          </CardTitle>
          <CardDescription>
            Подключите Telegram бота для получения уведомлений о заказах и
            управления каталогом
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant={isConnected ? "default" : "secondary"}>
              {isConnected ? "Подключен" : "Не подключен"}
            </Badge>
            {isConnected && (
              <Icon name="CheckCircle" size={16} className="text-green-500" />
            )}
          </div>

          <div className="grid gap-4">
            <div>
              <Label htmlFor="botToken">Bot Token</Label>
              <Input
                id="botToken"
                type="password"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                placeholder="1234567890:ABCDEF1234567890..."
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Получите токен у @BotFather в Telegram
              </p>
            </div>

            <div>
              <Label htmlFor="chatId">Chat ID</Label>
              <Input
                id="chatId"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                placeholder="-1001234567890"
                className="font-mono"
              />
              <p className="text-sm text-muted-foreground mt-1">
                ID чата для уведомлений (используйте @userinfobot)
              </p>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleTestConnection} disabled={!isConnected}>
                <Icon name="Zap" size={16} className="mr-2" />
                Тест подключения
              </Button>
            </div>
          </div>

          {stats && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Статистика</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-sm whitespace-pre-wrap">{stats}</pre>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Доступные команды бота</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded">/cars</code>
              <span className="text-sm text-muted-foreground">
                Показать рекомендуемые автомобили
              </span>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded">/search марка</code>
              <span className="text-sm text-muted-foreground">
                Поиск по марке автомобиля
              </span>
            </div>
            <div className="flex items-center gap-2">
              <code className="bg-muted px-2 py-1 rounded">/stats</code>
              <span className="text-sm text-muted-foreground">
                Статистика автосалона
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <Icon
              name="AlertCircle"
              size={20}
              className="text-orange-600 mt-0.5"
            />
            <div>
              <h4 className="font-medium text-orange-900">
                Настройка переменных окружения
              </h4>
              <p className="text-sm text-orange-700 mt-1">
                Добавьте в ваш .env файл:
              </p>
              <pre className="text-xs bg-orange-100 p-2 rounded mt-2 overflow-x-auto">
                {`VITE_TELEGRAM_BOT_TOKEN=ваш_токен_бота
VITE_TELEGRAM_CHAT_ID=ваш_chat_id`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
