import { test, expect } from "@playwright/test";

test.describe("About section", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders the section heading", async ({ page }) => {
    const section = page.getByTestId("about-section");
    await expect(section).toBeVisible();
    await expect(section.getByRole("heading", { level: 2 })).toContainText(
      "About"
    );
  });

  test("bio tile contains Patagonia origin and personal interests", async ({
    page,
  }) => {
    const bio = page.getByTestId("about-bio");
    await expect(bio).toContainText("Patagonia");
    await expect(bio).toContainText("Colorado Rockies");
    await expect(bio).toContainText("front-end craft");
    await expect(bio).toContainText("Volunteer");
  });

  test("USAW tile shows certification label and 19-year stat", async ({
    page,
  }) => {
    const usaw = page.getByTestId("about-usaw");
    await expect(usaw).toContainText("USAW Certified Coach");
    await expect(usaw).toContainText("19");
    await expect(usaw).toContainText("Norwegian national");
    await expect(usaw.getByRole("img", { name: "USA Weightlifting" })).toBeVisible();
  });

  test("languages tile lists all three languages", async ({ page }) => {
    const langs = page.getByTestId("about-languages");
    await expect(langs).toContainText("English");
    await expect(langs).toContainText("Español");
    await expect(langs).toContainText("Norsk Bokmål");
    await expect(langs).toContainText("Fluent");
    await expect(langs).toContainText("Native");
    await expect(langs).toContainText("Intermediate");
  });

  test("Norway photo tile renders with correct image", async ({ page }) => {
    const norway = page.getByTestId("about-norway");
    await expect(norway).toBeVisible();
    await expect(
      norway.getByRole("img", { name: "Nordsetter, Norway" })
    ).toBeVisible();
    await expect(norway).toContainText("Norway");
  });

  test("portrait tile renders the ski shop photo", async ({ page }) => {
    const portrait = page.getByTestId("about-portrait");
    await expect(portrait).toBeVisible();
    await expect(
      portrait.getByRole("img", { name: "Nico at the ski shop" })
    ).toBeVisible();
  });

  test("Nordic skiing tile renders with caption", async ({ page }) => {
    const nordic = page.getByTestId("about-nordic");
    await expect(nordic).toBeVisible();
    await expect(
      nordic.getByRole("img", { name: "Classic cross-country skiing" })
    ).toBeVisible();
    await expect(nordic).toContainText("Nordic Skiing");
    await expect(nordic).toContainText("Granåsen");
  });

  test("Colorado tile renders with location label", async ({ page }) => {
    const colorado = page.getByTestId("about-colorado");
    await expect(colorado).toBeVisible();
    await expect(
      colorado.getByRole("img", { name: "Colorado mountain hike" })
    ).toBeVisible();
    await expect(colorado).toContainText("Winter Park");
  });

  test("availability tile shows USA and Norway", async ({ page }) => {
    const avail = page.getByTestId("about-availability");
    await expect(avail).toContainText("Open to Opportunities");
    await expect(avail).toContainText("USA");
    await expect(avail).toContainText("Norway");
    await expect(avail).toContainText("hybrid");
  });

  test("renders all 8 tiles", async ({ page }) => {
    const testIds = [
      "about-bio",
      "about-usaw",
      "about-norway",
      "about-languages",
      "about-portrait",
      "about-nordic",
      "about-colorado",
      "about-availability",
    ];
    for (const id of testIds) {
      await expect(page.getByTestId(id)).toBeVisible();
    }
  });
});
