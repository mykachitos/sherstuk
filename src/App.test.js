import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders SweetHand brand", () => {
  render(<App />);
  expect(screen.getAllByText(/SweetHand/i)[0]).toBeInTheDocument();
});
