/** @format */

import { render, screen } from "@testing-library/react";
import Name from "@/components/Name";
describe("Home", () => {
  it("renders a heading", () => {
    render(<Name></Name>);

    // const heading = screen.getByText("hello world!");

    expect(screen.getByTestId("labelnameloco")).toBeInTheDocument();
  });
});
