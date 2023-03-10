import { test, expect } from "@playwright/test";

test("About Modal has correct action text", async ({ page }) => {
  await page.goto("/");
  const aboutModalTitle = await page.locator(
    '[data-test="about-modal-understand"]'
  );
  await expect(aboutModalTitle).toContainText("Ok, I understand");
});

test("About Modal can be closed", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-test="about-modal-understand"]').click();
  await page.waitForTimeout(1000);
  await expect(page.locator('[data-test="about-modal"]')).not.toBeVisible();
});
