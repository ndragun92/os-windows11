import { test, expect } from "@playwright/test";

test("SEO Title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Windows 11 ❤️ | by Nemanja Dragun/);
});
