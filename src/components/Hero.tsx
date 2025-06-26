import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Автосалон <span className="text-blue-400">ПИРАТ</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Ваш надежный партнер в мире автомобилей. Доставка по региону,
            трейд-ин и страхование.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/catalog"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="Car" size={20} />
              Посмотреть каталог
            </Link>
            <Link
              to="/contacts"
              className="border border-white/30 hover:bg-white/10 text-white px-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <Icon name="Phone" size={20} />
              Связаться с нами
            </Link>
          </div>

          {/* Key Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Truck" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Доставка по региону
              </h3>
              <p className="text-gray-300 text-sm">
                Быстрая и безопасная доставка автомобиля в любую точку региона
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="RefreshCw" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Трейд-ин</h3>
              <p className="text-gray-300 text-sm">
                Выгодный обмен вашего автомобиля на новый с доплатой
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Страхование</h3>
              <p className="text-gray-300 text-sm">
                Полное страхование автомобиля на выгодных условиях
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
