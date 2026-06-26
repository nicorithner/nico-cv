import { test, expect } from "@playwright/test";

test.describe("Hero section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the hero section", async ({ page }) => {
    await expect(page.getByTestId("hero")).toBeVisible();
  });

  test("shows the headshot image", async ({ page }) => {
    await expect(
      page.getByRole("img", { name: "headshot of Nico" })
    ).toBeVisible();
  });

  test("shows the full name after animation", async ({ page }) => {
    const hero = page.getByTestId("hero");
    // TextGenerateEffect animates spans from opacity 0 → 1 over ~2.2 s
    await expect(hero).toContainText("NICO", { timeout: 6000 });
    await expect(hero).toContainText("RITHNER", { timeout: 6000 });
  });

  test("shows the Fullstack Software Developer subtitle", async ({ page }) => {
    await expect(page.getByTestId("hero")).toContainText(
      "Fullstack Software Developer"
    );
  });

  test("CTA button links to the experience section", async ({ page }) => {
    const cta = page.getByTestId("hero").getByRole("link", {
      name: /experience/i,
    });
    await expect(cta).toHaveAttribute("href", "#experience");
  });
});
