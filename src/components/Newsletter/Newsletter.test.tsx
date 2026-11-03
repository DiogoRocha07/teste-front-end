import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Newsletter from "./Newsletter";

describe("Newsletter", () => {
  it("exige campos e consentimento e mostra confirmação demonstrativa ao enviar", async () => {
    const user = userEvent.setup();
    render(<Newsletter />);
    const form = screen.getByRole("form", { name: "Inscreva-se na nossa newsletter" });
    expect(screen.getByLabelText("Nome")).toBeRequired();
    expect(screen.getByLabelText("E-mail")).toBeRequired();
    expect(screen.getByRole("checkbox")).toBeRequired();

    await user.type(screen.getByLabelText("Nome"), "Ana");
    await user.type(screen.getByLabelText("E-mail"), "ana@example.com");
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("button", { name: "Inscrever" }));
    expect(form).toHaveTextContent("demonstrativo");
  });
});
