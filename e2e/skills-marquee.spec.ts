import { test, expect } from "@playwright/test";

// Mirrors the skills list in components/techStack/SkillsMarquee.tsx.
const SKILL_NAMES = [
  "HTML",
  "SASS",
  "Spring Boot",
  "Ruby on Rails",
  "SQL",
  "PostgreSQL",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "CSS",
  "Java",
  "Ruby",
  "AWS",
];

test.describe("Additional Skills marquee", () => {
  test("renders every skill, duplicated three times for a seamless loop", async ({
    page,
  }) => {
    await page.goto("/");
    const track = page.getByTestId("skills-marquee-track");

    await expect(track.locator("> div")).toHaveCount(SKILL_NAMES.length * 3);

    for (const name of SKILL_NAMES) {
      await expect(track.getByTitle(name, { exact: true })).toHaveCount(3);
    }
  });

  test("scrolls continuously by default", async ({ page }) => {
    await page.goto("/");
    const track = page.getByTestId("skills-marquee-track");

    const animationName = await track.evaluate(
      (el) => getComputedStyle(el).animationName
    );
    expect(animationName).not.toBe("none");
  });

  test("disables the animation when prefers-reduced-motion is set", async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const track = page.getByTestId("skills-marquee-track");

    const animationName = await track.evaluate(
      (el) => getComputedStyle(el).animationName
    );
    expect(animationName).toBe("none");
  });
});
