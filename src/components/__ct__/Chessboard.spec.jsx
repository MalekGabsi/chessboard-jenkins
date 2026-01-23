import { test, expect } from "@playwright/experimental-ct-react";
import ChessboardStory from "./Chessboard.story.jsx";

test.describe("Chessboard (Playwright CT)", () => {
  test("affiche 64 cases et 32 pièces au départ", async ({ mount }) => {
    const component = await mount(<ChessboardStory />);

    await expect(component.getByTestId("sq-a1")).toBeVisible();
    await expect(component.locator('[data-testid^="sq-"]')).toHaveCount(64);
    await expect(component.locator('[data-testid^="piece-"]')).toHaveCount(32);

    await expect(component.getByTestId("piece-e1")).toHaveAttribute("data-piece", "wK");
    await expect(component.getByTestId("piece-e8")).toHaveAttribute("data-piece", "bK");
  });

  test("drag & drop : déplace une pièce vers une case vide", async ({ mount }) => {
    const component = await mount(<ChessboardStory />);

    await html5DragAndDrop(component, "piece-e2", "sq-e4");
    await expect(component.getByTestId("piece-e2")).toHaveCount(0);
    await expect(component.getByTestId("piece-e4")).toBeVisible();
    await expect(component.getByTestId("piece-e4")).toHaveAttribute("data-piece", "wP");
  });

  test("drag & drop : remplacer une pièce si case occupée (capture logique)", async ({ mount }) => {
    const component = await mount(<ChessboardStory />);

    await component.getByTestId("piece-a2").dragTo(component.getByTestId("sq-a7"));

    await expect(component.getByTestId("piece-a2")).toHaveCount(0);
    await expect(component.getByTestId("piece-a7")).toBeVisible();
    await expect(component.getByTestId("piece-a7")).toHaveAttribute("data-piece", "wP");

    await expect(component.locator('[data-testid^="piece-"]')).toHaveCount(31);
  });

  test("clic sur case vide ne sélectionne rien (pas de crash)", async ({ mount }) => {
    const component = await mount(<ChessboardStory />);
    await component.getByTestId("sq-e4").click();
    await expect(component.getByTestId("sq-a1")).toBeVisible();
});

  async function html5DragAndDrop(component, fromTestId, toTestId) {
  const from = component.getByTestId(fromTestId);
  const to = component.getByTestId(toTestId);

  await from.evaluate((el) => {
    const dt = new DataTransfer();
    el.dispatchEvent(new DragEvent("dragstart", { dataTransfer: dt, bubbles: true }));
    // stocker pour le drop
    window.__dt = dt;
  });

  await to.evaluate((el) => {
    const dt = window.__dt;
    el.dispatchEvent(new DragEvent("dragover", { dataTransfer: dt, bubbles: true, cancelable: true }));
    el.dispatchEvent(new DragEvent("drop", { dataTransfer: dt, bubbles: true }));
  });
}

});
