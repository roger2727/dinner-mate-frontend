import { render } from "@testing-library/react";
import { describe, it } from "vitest";

import App from "../main.jsx";

describe("app component", () => {
  it("show headings", () => {
    render(<App />);
  });
});
