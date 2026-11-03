import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "./App";

afterEach(() => vi.unstubAllGlobals());

describe("App", () => {
  it("carrega os dados uma vez e compartilha produtos entre as três vitrines", async () => {
    const product = { productName: "Produto compartilhado", descriptionShort: "Descrição", photo: "/foto.png", price: 100 };
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, products: [product] }),
    });
    vi.stubGlobal("fetch", fetchMock);

    render(<App />);
    await waitFor(() => expect(screen.getAllByText("Produto compartilhado")).toHaveLength(3));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const carouselIds = screen
      .getAllByRole("list", { name: "Lista de produtos relacionados" })
      .map((list) => list.id);
    expect(new Set(carouselIds).size).toBe(3);
  });
});
