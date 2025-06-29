import { useState } from "react";
import Icon from "@/components/ui/icon";
import { CarItem } from "@/contexts/CartContext";
import { CarService } from "@/services/carService";
import { Car } from "@/lib/supabase";

interface PreOrderFormProps {
  car: Omit<CarItem, "quantity">;
  onClose: () => void;
}

const PreOrderForm = ({ car, onClose }: PreOrderFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    comment: "",
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await CarService.createPreOrder({
        car_id: car.id,
        customer_name: formData.name,
        customer_phone: formData.phone,
        customer_email: formData.email || undefined,
        comment: formData.comment || undefined,
      });

      alert(
        "Заявка на предзаказ отправлена! Мы свяжемся с вами в ближайшее время.",
      );
      onClose();
    } catch (error) {
      alert("Произошла ошибка при отправке заявки. Попробуйте еще раз.");
      console.error("Ошибка создания предзаказа:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Предзаказ автомобиля</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-3 mb-4 p-3 bg-gray-50 rounded-lg">
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-16 h-12 object-cover rounded"
            />
            <div>
              <h3 className="font-medium">
                {car.make} {car.model}
              </h3>
              <p className="text-sm text-gray-600">{car.year}</p>
              <p className="font-semibold text-blue-600">
                {formatPrice(car.price)}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Имя *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Телефон *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Комментарий
              </label>
              <textarea
                value={formData.comment}
                onChange={(e) =>
                  setFormData({ ...formData, comment: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-20"
                placeholder="Дополнительные пожелания..."
              />
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
              >
                Отправить заявку
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PreOrderForm;
