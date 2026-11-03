import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/currency";
import { getProductPricing } from "../../utils/productPricing";
import "./ProductCard.scss";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

function ProductCard({ product, onSelect }: ProductCardProps) {
  const { previousPrice, installmentPrice, hasFreeShipping } =
    getProductPricing(product.price);

  return (
    <article className='product-card'>
      <button
        className='product-card__image-trigger'
        type='button'
        aria-label={`Ver detalhes de ${product.productName}`}
        onClick={() => onSelect(product)}
      >
        <img className='product-card__image' src={product.photo} alt='' width={278} height={228} loading='lazy' />
      </button>

      <h3 className='product-card__name'>
        <button className='product-card__name-trigger' type='button' onClick={() => onSelect(product)}>
          {product.productName}
        </button>
      </h3>

      <div className='product-card__pricing'>
        <p className='product-card__previous-price'>
          <s>{formatPrice(previousPrice)}</s>
        </p>

        <p className='product-card__price'>{formatPrice(product.price)}</p>

        {installmentPrice !== null && (
          <p className='product-card__installments'>
            ou 10x de {formatPrice(installmentPrice)} sem juros no cartão
          </p>
        )}

        {hasFreeShipping && (
          <p className='product-card__shipping'>Frete grátis</p>
        )}
      </div>

      <button
        className='product-card__button'
        type='button'
        onClick={() => onSelect(product)}
      >
        Comprar
      </button>
    </article>
  );
}

export default ProductCard;
