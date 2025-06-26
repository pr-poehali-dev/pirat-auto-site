import { useCart } from "@/contexts/CartContext";
import Icon from "@/components/ui/icon";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { items, updateQuantity, removeFromCart, getTotalPrice, clearCart } =
    useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ru-RU").format(price) + " ₽";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Корзина</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Корзина пуста</p>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                  <img
                    src={item.image}
                    alt={`${item.make} ${item.model}`}
                    className="w-16 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">
                      {item.make} {item.model}
                    </h3>
                    <p className="text-sm text-gray-600">{item.year}</p>
                    <p className="font-semibold text-blue-600">
                      {formatPrice(item.price)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 rounded border flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Итого:</span>
              <span className="text-xl font-bold text-blue-600">
                {formatPrice(getTotalPrice())}
              </span>
            </div>
            <div className="space-y-2">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
                Оформить заказ
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg"
              >
                Очистить корзину
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
