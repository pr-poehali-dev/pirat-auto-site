import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useState, useEffect } from "react";
import PreOrderForm from "@/components/PreOrderForm";
import { CarService, Car } from "@/services/carService";

const FeaturedCars = () => {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [showPreOrder, setShowPreOrder] = useState<number | null>(null);

  useEffect(() => {
    const loadCars = async () => {
      try {
        const cars = await CarService.getFeaturedCars();
        setFeaturedCars(cars);
      } catch (error) {
        console.error("Ошибка загрузки автомобилей:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCars();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Рекомендуемые автомобили
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Отобранные специалистами автомобили из нашего каталога отечественных
            и зарубежных марок
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      car.country === "domestic"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-purple-100 text-purple-800"
                    }`}
                  >
                    {car.country === "domestic"
                      ? "🇷🇺 Отечественное"
                      : "🌍 Иномарка"}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {car.make} {car.model}
                  </h3>
                  <span className="text-sm text-gray-500">{car.year}</span>
                </div>

                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {car.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Icon name="Gauge" size={16} />
                    {car.mileage.toLocaleString()} км
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Fuel" size={16} />
                    {car.fuel}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatPrice(car.price)}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => setShowPreOrder(car.id)}
                      variant="outline"
                      size="sm"
                    >
                      Предзаказ
                    </Button>
                    <Button
                      onClick={() => addToCart(car)}
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <Icon name="ShoppingCart" size={16} />В корзину
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/catalog">
            <Button size="lg" className="px-8">
              Посмотреть весь каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>

      {showPreOrder && (
        <PreOrderForm
          carId={showPreOrder}
          onClose={() => setShowPreOrder(null)}
        />
      )}
    </section>
  );
};

export default FeaturedCars;
