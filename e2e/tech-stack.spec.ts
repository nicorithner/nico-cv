import { test, expect } from "@playwright/test";

const TECH_TILES = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "CSS",
  "Java",
  "Ruby",
  "AWS",
];

const CAREER_START_YEAR = 2021;

test.describe("Tech Stack section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the skills section", async ({ page }) => {
    await expect(page.getByTestId("skills-section")).toBeVisible();
  });

  test("renders all 8 tech tiles", async ({ page }) => {
    const section = page.getByTestId("skills-section");
    for (const name of TECH_TILES) {
      await expect(section.getByText(name, { exact: true })).toBeVisible();
    }
  });

  test("stat tile shows correct years of experience", async ({ page }) => {
    const expected = new Date().getFullYear() - CAREER_START_YEAR;
    const tile = page.getByTestId("stat-tile");
    await expect(tile).toContainText(String(expected));
    await expect(tile).toContainText("Years of Professional Experience");
  });
});
