import { test, describe, expect, vi } from "vitest";
import log from "./log";

describe("GlobalButton", () => {
  test("it shows alert", () => {
    window.alert = vi.fn();
    const message = "Hello from alert!";
    log().onAlert(message);
    expect(window.alert).toBeCalledWith(message);
  });
});
