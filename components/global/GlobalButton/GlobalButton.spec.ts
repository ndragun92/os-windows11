import { test, describe, expect } from "vitest";
import { mount } from "@vue/test-utils";
import GlobalButton from "./components/global/GlobalButton/GlobalButton.vue";

describe("GlobalButton", () => {
  test("renders name", async () => {
    const buttonText = "Hello, world!";
    const wrapper = await mount(GlobalButton, {
      slots: {
        name: buttonText,
      },
    });
    expect(wrapper.text()).toBe(buttonText);
  });
});
