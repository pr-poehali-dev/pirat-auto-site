import { useEffect, useState } from "react";
import { CarService } from "@/services/carService";
import { Button } from "@/components/ui/button";

const DatabaseInit = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [loading, setLoading] = useState(false);

  const initializeDatabase = async () => {
    setLoading(true);
    try {
      await CarService.initializeWithTestData();
      setIsInitialized(true);
    } catch (error) {
      console.error("Ошибка инициализации:", error);
    } finally {
      setLoading(false);
    }
  };

  if (isInitialized) {
    return (
      <div className="fixed bottom-4 right-4 bg-green-100 border border-green-300 rounded-lg p-3">
        <p className="text-green-800 text-sm">
          ✅ База данных инициализирована
        </p>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
      <div className="text-sm text-blue-800 mb-2">
        Для работы с реальной БД нажмите кнопку ниже:
      </div>
      <Button
        onClick={initializeDatabase}
        disabled={loading}
        size="sm"
        className="w-full"
      >
        {loading ? "Загрузка..." : "Инициализировать БД"}
      </Button>
    </div>
  );
};

export default DatabaseInit;
