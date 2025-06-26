import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import Services from "@/components/Services";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCars />
      <Services />
    </Layout>
  );
};

export default Index;
