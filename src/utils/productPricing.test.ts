import { describe, expect, it } from "vitest";
import { formatPrice } from "./currency";
import { getProductPricing } from "./productPricing";

describe("formatação e regras de preço", () => {
  it("formata valores em reais", () => {
    expect(formatPrice(1999.9)).toBe("R$ 1.999,90");
  });

  it("calcula o preço anterior com acréscimo de 15% e arredonda centavos", () => {
    expect(getProductPricing(100.01).previousPrice).toBe(115.01);
  });

  it("aplica frete grátis somente acima de R$ 200", () => {
    expect(getProductPricing(200).hasFreeShipping).toBe(false);
    expect(getProductPricing(200.01).hasFreeShipping).toBe(true);
  });

  it("aplica 10 parcelas somente acima de R$ 3.000", () => {
    expect(getProductPricing(3000).installmentPrice).toBeNull();
    expect(getProductPricing(3000.01).installmentPrice).toBeCloseTo(300.001);
  });
});
