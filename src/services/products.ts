import type { Product } from "../types/product";

const PRODUCTS_URL = "/api/produtos";

function isProduct(value: unknown): value is Product {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  return (
    "productName" in value &&
    typeof value.productName === "string" &&
    "descriptionShort" in value &&
    typeof value.descriptionShort === "string" &&
    "photo" in value &&
    typeof value.photo === "string" &&
    "price" in value &&
    typeof value.price === "number" &&
    Number.isFinite(value.price) &&
    value.price >= 0
  );
}

export async function getProducts(signal?: AbortSignal): Promise<Product[]> {
  const response = await fetch(PRODUCTS_URL, { signal });

  if (!response.ok) {
    throw new Error(`Erro ao buscar produtos: HTTP ${response.status}`);
  }

  const data: unknown = await response.json();

  if (
    typeof data !== "object" ||
    data === null ||
    !("success" in data) ||
    data.success !== true ||
    !("products" in data) ||
    !Array.isArray(data.products) ||
    !data.products.every(isProduct)
  ) {
    throw new Error("A resposta recebida possui um formato inválido.");
  }

  return data.products;
}
