import Icon from "@/components/ui/icon";

const Services = () => {
  const services = [
    {
      icon: "Truck",
      title: "Доставка по региону",
      description:
        "Доставляем автомобили по всему региону быстро и безопасно. Собственная служба доставки гарантирует сохранность транспорта.",
      features: [
        "Доставка в течение 24 часов",
        "Страховка во время транспортировки",
        "Бесплатная доставка от 2 млн ₽",
      ],
    },
    {
      icon: "RefreshCw",
      title: "Трейд-ин",
      description:
        "Обменяйте свой автомобиль на новый с доплатой. Честная оценка, прозрачные условия и быстрое оформление.",
      features: [
        "Оценка за 30 минут",
        "Зачет до 80% стоимости",
        "Помощь с документами",
      ],
    },
    {
      icon: "Shield",
      title: "Страхование",
      description:
        "Полный спектр страховых услуг для вашего автомобиля. КАСКО, ОСАГО и дополнительные опции защиты.",
      features: ["КАСКО от 3,5%", "ОСАГО онлайн", "Страхование жизни водителя"],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Наши услуги
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Полный комплекс услуг для комфортной покупки автомобиля
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon
                  name={service.icon as any}
                  size={28}
                  className="text-white"
                />
              </div>

              <h3 className="text-xl font-semibold text-slate-800 mb-4">
                {service.title}
              </h3>

              <p className="text-gray-600 mb-6">{service.description}</p>

              <ul className="space-y-2 text-sm text-gray-700">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center justify-center gap-2"
                  >
                    <Icon name="Check" size={16} className="text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-slate-800 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold mb-4">Нужна консультация?</h3>
            <p className="text-gray-300 mb-6">
              Наши специалисты помогут выбрать автомобиль и оформить все услуги
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+74951234567"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                <Icon name="Phone" size={20} />
                +7 (495) 123-45-67
              </a>
              <a
                href="mailto:info@pirat-auto.ru"
                className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
              >
                <Icon name="Mail" size={20} />
                info@pirat-auto.ru
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
