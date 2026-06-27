import { test, expect } from "@playwright/test";

const JOBS = [
  "FyrKode Software Studio",
  "Booz Allen Hamilton",
  "Altvia Solutions",
];

test.describe("Work Experience section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the section heading", async ({ page }) => {
    const section = page.getByTestId("experience-section");
    await expect(section).toBeVisible();
    await expect(section.getByRole("heading", { level: 2 })).toContainText(
      "Experience"
    );
  });

  test("shows all three jobs", async ({ page }) => {
    const section = page.getByTestId("experience-section");
    for (const company of JOBS) {
      await expect(section).toContainText(company);
    }
  });

  test("FyrKode card shows the part-time badge", async ({ page }) => {
    await expect(page.getByTestId("experience-section")).toContainText(
      "Part-time"
    );
  });

  test("shows the education subheading and Turing School entry", async ({
    page,
  }) => {
    const section = page.getByTestId("experience-section");
    await expect(section).toContainText("Education");
    await expect(section).toContainText("Turing School of Software");
    await expect(section).toContainText("Certified Backend Software Developer");
  });

  test("resume CTA renders label, heading, and subtext", async ({ page }) => {
    const cta = page.getByTestId("resume-cta");
    await expect(cta).toContainText("Download");
    await expect(cta).toContainText("Get My CV");
    await expect(cta).toContainText("Available in Norwegian and English");
  });

  test("Norwegian CV link has correct href and opens in a new tab", async ({
    page,
  }) => {
    const link = page
      .getByTestId("resume-cta")
      .getByRole("link", { name: /Få min CV/i });
    await expect(link).toHaveAttribute(
      "href",
      "https://drive.google.com/file/d/1x5EJ1wtRdTpoy0SVLGMYxqF7xtTN98eA/view?usp=sharing"
    );
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  test("English resume link has correct href and opens in a new tab", async ({
    page,
  }) => {
    const link = page
      .getByTestId("resume-cta")
      .getByRole("link", { name: /Grab My Resume/i });
    await expect(link).toHaveAttribute(
      "href",
      "https://drive.google.com/file/d/1iPixGsLv2gI243FcHbFkPHR6r6_6wzhq/view?usp=sharing"
    );
    await expect(link).toHaveAttribute("target", "_blank");
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
