import ProductCard from "../ProductCard/ProductCard";
import ProductModal from "../ProductModal/ProductModal";
import { useEffect, useRef, useState } from "react";
import type { Product } from "../../types/product";

const productCategories = [
  "Celular",
  "Acessórios",
  "Tablets",
  "Notebooks",
  "TVs",
  "Ver todos",
];

interface ProductSectionProps {
  id: string;
  products: Product[];
  isLoading: boolean;
  error: string | null;
  showCategories?: boolean;
}

function ProductSection({
  id,
  products,
  isLoading,
  error,
  showCategories = true,
}: ProductSectionProps) {
  const titleId = `${id}-title`;
  const carouselId = `${id}-carousel`;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [canScroll, setCanScroll] = useState({
    previous: false,
    next: false,
  });

  useEffect(() => {
    const list = listRef.current;

    if (!list) return;

    function updateNavigation() {
      if (!list) return;

      setCanScroll({
        previous: list.scrollLeft > 1,
        next: list.scrollLeft + list.clientWidth < list.scrollWidth - 1,
      });
    }

    const observer = new ResizeObserver(updateNavigation);

    observer.observe(list);
    list.addEventListener("scroll", updateNavigation, { passive: true });

    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", updateNavigation);
    };
  }, [products]);

  function scrollProducts(direction: -1 | 1) {
    const list = listRef.current;
    const firstItem = list?.firstElementChild;

    if (!list || !(firstItem instanceof HTMLElement)) return;

    const itemWidth = firstItem.getBoundingClientRect().width;
    const gap = Number.parseFloat(getComputedStyle(list).columnGap);

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    list.scrollBy({
      left: direction * (itemWidth + gap),
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }

  return (
    <section id={id} className='products-section' aria-labelledby={titleId}>
      <div className='products-section__heading'>
        <h2 id={titleId}>Produtos relacionados</h2>
      </div>

      {showCategories ? (
        <div className='products-section__category-bar'>
          <ul
            className='products-section__categories'
            aria-label='Categorias da vitrine'
          >
            {productCategories.map((category) => (
              <li
                key={category}
                className={
                  category === "Celular"
                    ? "products-section__category products-section__category--highlight"
                    : "products-section__category"
                }
              >
                <span>{category}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <a className='products-section__view-all' href='#produtos'>
          Ver todos
        </a>
      )}

      {isLoading && <p role='status'>Carregando produtos...</p>}

      {!isLoading && error && <p role='alert'>{error}</p>}

      {!isLoading && !error && products.length === 0 && (
        <p>Nenhum produto disponível no momento.</p>
      )}

      {!isLoading && !error && products.length > 0 && (
        <div className='products-section__carousel'>
          <button
            className='products-section__arrow products-section__arrow--previous'
            type='button'
            aria-label='Mostrar produtos anteriores'
            aria-controls={carouselId}
            disabled={!canScroll.previous}
            onClick={() => scrollProducts(-1)}
          >
            <span aria-hidden='true'>‹</span>
          </button>

          <ul
            id={carouselId}
            ref={listRef}
            className='products-section__list'
            aria-label='Lista de produtos relacionados'
            tabIndex={0}
          >
            {products.map((product, index) => (
              <li key={`${product.productName}-${index}`}>
                <ProductCard product={product} onSelect={setSelectedProduct} />
              </li>
            ))}
          </ul>

          <button
            className='products-section__arrow products-section__arrow--next'
            type='button'
            aria-label='Mostrar próximos produtos'
            aria-controls={carouselId}
            disabled={!canScroll.next}
            onClick={() => scrollProducts(1)}
          >
            <span aria-hidden='true'>›</span>
          </button>
        </div>
      )}

      {selectedProduct !== null && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

export default ProductSection;
