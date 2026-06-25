import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";

beforeEach(() => {
  global.fetch = jest.fn(url => {
    const href = String(url);

    if (href.includes("/catalog/categories")) {
      return Promise.resolve({
        ok: true,
        headers: { get: () => "application/json" },
        json: async () => [],
      });
    }

    if (href.includes("/catalog/products")) {
      return Promise.resolve({
        ok: true,
        headers: { get: () => "application/json" },
        json: async () => [],
      });
    }

    return Promise.resolve({
      ok: true,
      headers: { get: () => "application/json" },
      json: async () => ({}),
    });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});

test("renders SweetHand brand", async () => {
  render(<App />);

  await waitFor(() => {
    expect(screen.getAllByText(/SweetHand/i)[0]).toBeInTheDocument();
  });
});
