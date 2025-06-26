import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";
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
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Рекомендуемые автомобили
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Лучшие предложения нашего автосалона с проверенной историей и
            гарантией качества
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
            >
              <img
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-slate-800">
                    {car.make} {car.model}
                  </h3>
                  <span className="text-sm text-gray-500">{car.year}</span>
                </div>

                <div className="text-2xl font-bold text-blue-600 mb-4">
                  {formatPrice(car.price)}
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Icon name="Gauge" size={16} />
                    <span>{car.mileage.toLocaleString()} км</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Fuel" size={16} />
                    <span>{car.fuel}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Settings" size={16} />
                    <span>{car.transmission}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Car" size={16} />
                    <span>
                      {car.body_type} • {car.color}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(car)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    В корзину
                  </button>
                  <button
                    onClick={() => setShowPreOrder(car.id)}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Предзаказ
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/catalog"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-lg font-medium transition-colors"
          >
            Смотреть все автомобили
            <Icon name="ArrowRight" size={20} />
          </Link>
        </div>

        {showPreOrder && (
          <PreOrderForm
            car={featuredCars.find((car) => car.id === showPreOrder)!}
            onClose={() => setShowPreOrder(null)}
          />
        )}
      </div>
    </section>
  );
};

export default FeaturedCars;
