import { test, expect } from "@playwright/test";

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the footer", async ({ page }) => {
    await expect(page.getByTestId("footer")).toBeVisible();
  });

  test("logo links back to the top of the page", async ({ page }) => {
    const logo = page.getByTestId("footer").getByRole("link", {
      name: "Back to top",
    });
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute("href", "#");
    await expect(logo).toContainText("NR");
  });

  test("GitHub link opens to the correct profile", async ({ page }) => {
    const gh = page.getByTestId("footer").getByRole("link", {
      name: "GitHub",
    });
    await expect(gh).toBeVisible();
    await expect(gh).toHaveAttribute(
      "href",
      "https://github.com/nicorithner"
    );
    await expect(gh).toHaveAttribute("target", "_blank");
    await expect(gh).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("LinkedIn link opens to the correct profile", async ({ page }) => {
    const li = page.getByTestId("footer").getByRole("link", {
      name: "LinkedIn",
    });
    await expect(li).toBeVisible();
    await expect(li).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/nicorithner"
    );
    await expect(li).toHaveAttribute("target", "_blank");
    await expect(li).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("shows copyright text with the current year", async ({ page }) => {
    const year = new Date().getFullYear().toString();
    await expect(page.getByTestId("footer")).toContainText(year);
    await expect(page.getByTestId("footer")).toContainText("Nico Rithner");
  });
});
