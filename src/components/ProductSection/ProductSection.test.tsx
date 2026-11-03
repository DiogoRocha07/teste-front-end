import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import ProductSection from "./ProductSection";
import type { Product } from "../../types/product";

const products: Product[] = [
  { productName: "Celular de teste", descriptionShort: "Detalhes do celular", photo: "/celular.png", price: 3500 },
  { productName: "Produto com nome bastante extenso para verificar quebra de linha sem estourar o cartão", descriptionShort: "Outro detalhe", photo: "/produto.png", price: 200 },
];

describe("ProductSection", () => {
  it("exibe estados de carregamento, erro e lista vazia", () => {
    const { rerender } = render(<ProductSection id="loading" products={[]} isLoading error={null} />);
    expect(screen.getByRole("status")).toHaveTextContent("Carregando");
    rerender(<ProductSection id="error" products={[]} isLoading={false} error="Falha" />);
    expect(screen.getByRole("alert")).toHaveTextContent("Falha");
    rerender(<ProductSection id="empty" products={[]} isLoading={false} error={null} />);
    expect(screen.getByText(/Nenhum produto/)).toBeInTheDocument();
  });

  it("mostra produtos, nomes longos e abre o modal pela imagem, nome e botão", async () => {
    const user = userEvent.setup();
    render(<ProductSection id="catalogo" products={products} isLoading={false} error={null} />);

    expect(screen.getByText(products[1].productName)).toBeInTheDocument();
    const list = screen.getByRole("list", { name: "Lista de produtos relacionados" });
    const firstCard = within(list).getAllByRole("article")[0];
    await user.click(within(firstCard).getByRole("button", { name: "Ver detalhes de Celular de teste" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Detalhes do celular");
    await user.click(screen.getByRole("button", { name: "Fechar detalhes do produto" }));

    const nameButton = within(list).getByRole("button", { name: products[0].productName });
    await user.click(nameButton);
    expect(screen.getByRole("dialog")).toHaveTextContent("Celular de teste");
    await user.click(screen.getByRole("button", { name: "Fechar detalhes do produto" }));

    await user.click(within(firstCard).getByRole("button", { name: "Ver detalhes de Celular de teste" }));
    const dialog = screen.getByRole("dialog");
    expect(document.body.style.overflow).toBe("hidden");
    const decrease = within(dialog).getByRole("button", { name: "Diminuir quantidade" });
    expect(decrease).toBeDisabled();
    await user.click(within(dialog).getByRole("button", { name: "Aumentar quantidade" }));
    expect(within(dialog).getByLabelText("Quantidade")).toHaveTextContent("02");
    expect(within(dialog).getByRole("button", { name: "Comprar" })).toBeDisabled();

    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("");

    const imageButton = within(firstCard).getByRole("button", { name: "Ver detalhes de Celular de teste" });
    await user.click(imageButton);
    await user.click(within(screen.getByRole("dialog")).getByRole("button", { name: "Fechar detalhes do produto" }));
    expect(imageButton).toHaveFocus();

    await user.click(within(firstCard).getByRole("button", { name: "Comprar" }));
    expect(screen.getByRole("dialog")).toHaveTextContent("Celular de teste");
    fireEvent.click(screen.getByRole("dialog"), { clientX: 999, clientY: 999 });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
