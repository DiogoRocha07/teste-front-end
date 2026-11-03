import { afterEach, describe, expect, it, vi } from "vitest";
import { getProducts } from "./products";

const validProduct = {
  productName: "Celular",
  descriptionShort: "Produto de teste",
  photo: "/celular.png",
  price: 120,
};

afterEach(() => vi.unstubAllGlobals());

describe("getProducts", () => {
  it("retorna os produtos quando a resposta é válida", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, products: [validProduct] }),
    }));

    await expect(getProducts()).resolves.toEqual([validProduct]);
  });

  it("aceita uma lista vazia", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, products: [] }),
    }));

    await expect(getProducts()).resolves.toEqual([]);
  });

  it("lança erro para respostas HTTP malsucedidas", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 503 }));
    await expect(getProducts()).rejects.toThrow("HTTP 503");
  });

  it("lança erro para formato inválido", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, products: [{ ...validProduct, price: "120" }] }),
    }));
    await expect(getProducts()).rejects.toThrow();
  });

  it("propaga falhas de rede e cancelamento", async () => {
    const networkError = new Error("rede offline");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(networkError));
    await expect(getProducts()).rejects.toBe(networkError);

    const controller = new AbortController();
    controller.abort();
    const fetchMock = vi.fn().mockRejectedValue(new DOMException("Aborted", "AbortError"));
    vi.stubGlobal("fetch", fetchMock);
    await expect(getProducts(controller.signal)).rejects.toMatchObject({ name: "AbortError" });
    expect(fetchMock).toHaveBeenCalledWith("/api/produtos", { signal: controller.signal });
  });
});
