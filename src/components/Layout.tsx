import { Link, useLocation } from "react-router-dom";
import Icon from "@/components/ui/icon";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="text-2xl font-bold text-slate-800">ПИРАТ</div>
              <div className="text-sm text-blue-600 font-medium">АВТОСАЛОН</div>
            </Link>

            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors ${
                  isActive("/")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Главная
              </Link>
              <Link
                to="/catalog"
                className={`text-sm font-medium transition-colors ${
                  isActive("/catalog")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Каталог
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors ${
                  isActive("/about")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                О нас
              </Link>
              <Link
                to="/contacts"
                className={`text-sm font-medium transition-colors ${
                  isActive("/contacts")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Контакты
              </Link>
            </nav>

            <button className="md:hidden">
              <Icon name="Menu" size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ПИРАТ</h3>
              <p className="text-gray-300 text-sm">
                Надежный автосалон с доставкой по региону, услугами трейд-ин и
                страхования.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Контакты</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>+7 (495) 123-45-67</p>
                <p>info@pirat-auto.ru</p>
                <p>г. Москва, ул. Автомобильная, 1</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-4">Услуги</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Доставка по региону</p>
                <p>Трейд-ин</p>
                <p>Страхование</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © 2024 Автосалон ПИРАТ. Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
