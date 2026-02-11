import { test, expect } from "@playwright/experimental-ct-react";
import ChessboardStory from "./Chessboard.story.jsx";

test.describe("Chessboard (Playwright CT) - chess.js rules", () => {
  test("affiche 64 cases et 32 pièces au départ", async ({ mount }) => {
    const component = await mount(<ChessboardStory />);

    await expect(component.getByTestId("sq-a1")).toBeVisible();
    await expect(component.locator('[data-testid^="sq-"]')).toHaveCount(64);
    await expect(component.locator('[data-testid^="piece-"]')).toHaveCount(32);

    await expect(component.getByTestId("piece-e1")).toHaveAttribute("data-piece", "wK");
    await expect(component.getByTestId("piece-e8")).toHaveAttribute("data-piece", "bK");
  });

  test("déplace un pion légalement : e2 -> e4", async ({ mount }) => {
    const component = await mount(<ChessboardStory />);

    await component.getByTestId("piece-e2").dragTo(component.getByTestId("sq-e4"));

    await expect(component.getByTestId("piece-e2")).toHaveCount(0);
    await expect(component.getByTestId("piece-e4")).toBeVisible();
    await expect(component.getByTestId("piece-e4")).toHaveAttribute("data-piece", "wP");
  });

  test("refuse un coup illégal : fou c1 -> c3 (bloqué)", async ({ mount }) => {
    const component = await mount(<ChessboardStory />);

    await component.getByTestId("piece-c1").dragTo(component.getByTestId("sq-c3"));

    // doit rester en c1
    await expect(component.getByTestId("piece-c1")).toBeVisible();
    await expect(component.getByTestId("piece-c3")).toHaveCount(0);
  });

  test("capture légale : e2->e4, d7->d5, e4xd5", async ({ mount }) => {
    const component = await mount(<ChessboardStory />);

    // White
    await component.getByTestId("piece-e2").dragTo(component.getByTestId("sq-e4"));
    // Black
    await component.getByTestId("piece-d7").dragTo(component.getByTestId("sq-d5"));
    // White capture
    await component.getByTestId("piece-e4").dragTo(component.getByTestId("sq-d5"));

    await expect(component.getByTestId("piece-d5")).toBeVisible();
    await expect(component.getByTestId("piece-d5")).toHaveAttribute("data-piece", "wP");

    // le pion noir de d7 doit être capturé (donc plus visible)
    await expect(component.getByTestId("piece-d7")).toHaveCount(0);
  });

  test("clic sur case vide ne sélectionne rien (pas de crash)", async ({ mount }) => {
    const component = await mount(<ChessboardStory />);
    await component.getByTestId("sq-e4").click();
    await expect(component.getByTestId("sq-a1")).toBeVisible();
  });
});
