import { useEffect, useRef, useState } from "react";
import type { Product } from "../../types/product";
import { formatPrice } from "../../utils/currency";
import "./ProductModal.scss";

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

function ProductModal({ product, onClose }: ProductModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;

    dialog.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus();
      }
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className='product-modal'
      aria-labelledby='product-modal-title'
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;

        const bounds = event.currentTarget.getBoundingClientRect();

        const clickedOutside =
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom;

        if (clickedOutside) {
          onClose();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <button
        className='product-modal__close'
        type='button'
        aria-label='Fechar detalhes do produto'
        onClick={onClose}
      />

      <div className='product-modal__content'>
        <img
          className='product-modal__image'
          src={product.photo}
          alt={product.productName}
          width={247}
          height={192}
        />

        <div className='product-modal__info'>
          <div>
            <h2 id='product-modal-title' className='product-modal__title'>
              {product.productName}
            </h2>

            <p className='product-modal__price'>{formatPrice(product.price)}</p>
          </div>

          <div className='product-modal__details'>
            <p className='product-modal__description'>
              {product.descriptionShort}
            </p>

            <button
              className='product-modal__details-button'
              type='button'
              disabled
            >
              Veja mais detalhes do produto <span aria-hidden='true'>&gt;</span>
            </button>
          </div>

          <div className='product-modal__actions'>
            <div
              className='product-modal__quantity'
              role='group'
              aria-label='Quantidade do produto'
            >
              <button
                type='button'
                aria-label='Diminuir quantidade'
                disabled={quantity === 1}
                onClick={() => {
                  setQuantity((value) => Math.max(1, value - 1));
                }}
              >
                <span aria-hidden='true'>−</span>
              </button>

              <output aria-live='polite' aria-label='Quantidade'>
                {String(quantity).padStart(2, "0")}
              </output>

              <button
                type='button'
                aria-label='Aumentar quantidade'
                onClick={() => setQuantity((value) => value + 1)}
              >
                <span aria-hidden='true'>+</span>
              </button>
            </div>

            <button className='product-modal__buy' type='button' disabled>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default ProductModal;
