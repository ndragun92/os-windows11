import { test, describe, expect, vi } from "vitest";
import log from "./log";

describe("GlobalButton", () => {
  test("it shows allert", () => {
    window.alert = vi.fn();
    const message = "Hello from alert!";
    const wrapper = log().onAlert(message);
    console.log("wrapper", wrapper);
    expect(window.alert).toBeCalledWith(message);
  });
});
