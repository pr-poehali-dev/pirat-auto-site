import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import Services from "@/components/Services";
import { CartProvider } from "@/contexts/CartContext";

const Index = () => {
  return (
    <CartProvider>
      <Layout>
        <Hero />
        <FeaturedCars />
        <Services />
      </Layout>
    </CartProvider>
  );
};

export default Index;
