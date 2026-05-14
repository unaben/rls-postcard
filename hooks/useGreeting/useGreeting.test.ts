import { renderHook } from "@testing-library/react";
import { useGreeting } from "./useGreeting";

describe("useGreeting", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns Good morning between 5am and 12pm", () => {
    jest.setSystemTime(new Date("2025-05-01T08:00:00"));
    const { result } = renderHook(() => useGreeting());
    expect(result.current).toBe("Good morning");
  });

  it("returns Good afternoon between 12pm and 5pm", () => {
    jest.setSystemTime(new Date("2025-05-01T14:00:00"));
    const { result } = renderHook(() => useGreeting());
    expect(result.current).toBe("Good afternoon");
  });

  it("returns Good evening between 5pm and 9pm", () => {
    jest.setSystemTime(new Date("2025-05-01T19:00:00"));
    const { result } = renderHook(() => useGreeting());
    expect(result.current).toBe("Good evening");
  });

  it("returns Good night after 9pm", () => {
    jest.setSystemTime(new Date("2025-05-01T23:00:00"));
    const { result } = renderHook(() => useGreeting());
    expect(result.current).toBe("Good night");
  });
});