import { test, expect } from "@playwright/test";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Resume", href: "#resume" },
];

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the nav bar with logo", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Site navigation" });
    await expect(nav).toBeVisible();
    const logo = nav.getByRole("link", { name: "Back to top" });
    await expect(logo).toBeVisible();
    await expect(logo).toContainText("NR");
    await expect(logo).toHaveAttribute("href", "#");
  });

  test("renders all four nav links", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Site navigation" });
    for (const { label } of NAV_LINKS) {
      await expect(nav.getByRole("link", { name: label })).toBeVisible();
    }
  });

  test("each link points to the correct section anchor", async ({ page }) => {
    const nav = page.getByRole("navigation", { name: "Site navigation" });
    for (const { label, href } of NAV_LINKS) {
      await expect(nav.getByRole("link", { name: label })).toHaveAttribute(
        "href",
        href
      );
    }
  });

  test("About link becomes active when About section scrolls into view", async ({
    page,
  }) => {
    await page.locator("#about").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "About" })
    ).toHaveAttribute("aria-current", "true", { timeout: 3000 });
  });

  test("Experience link becomes active when Experience section scrolls into view", async ({
    page,
  }) => {
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await expect(
      page.getByRole("navigation").getByRole("link", { name: "Experience" })
    ).toHaveAttribute("aria-current", "true", { timeout: 3000 });
  });

  test("Resume link scrolls to the resume CTA section when clicked", async ({
    page,
  }) => {
    await page
      .getByRole("navigation")
      .getByRole("link", { name: "Resume" })
      .click();
    await expect(page.getByTestId("resume-cta")).toBeInViewport();
  });
});
