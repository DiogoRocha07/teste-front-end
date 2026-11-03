import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import HeroBanner from "./components/HeroBanner/HeroBanner";
import CategoryGrid from "./components/CategoryGrid/CategoryGrid";
import ProductSection from "./components/ProductSection/ProductSection";
import PartnerBanners from "./components/PartnerBanners/PartnerBanners";
import BrandShowcase from "./components/BrandShowcase/BrandShowcase";
import Newsletter from "./components/Newsletter/Newsletter";
import { getProducts } from "./services/products";
import type { Product } from "./types/product";
import "./App.scss";
import Footer from "./components/Footer/Footer";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    getProducts(controller.signal)
      .then((loadedProducts) => {
        if (controller.signal.aborted) return;

        setProducts(loadedProducts);
        setIsLoading(false);
      })
      .catch(() => {
        if (controller.signal.aborted) return;

        setError(
          "Não foi possível carregar os produtos. Tente novamente mais tarde.",
        );
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Header />

      <main className='app'>
        <HeroBanner />
        <CategoryGrid />

        <ProductSection
          id='produtos'
          products={products}
          isLoading={isLoading}
          error={error}
        />

        <PartnerBanners />

        <ProductSection
          id='produtos-parceiros'
          products={products}
          isLoading={isLoading}
          error={error}
          showCategories={false}
        />

        <PartnerBanners />
        <BrandShowcase />

        <ProductSection
          id='produtos-marcas'
          products={products}
          isLoading={isLoading}
          error={error}
          showCategories={false}
        />
      </main>

      <Newsletter />
      <Footer />
    </>
  );
}

export default App;
