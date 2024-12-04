import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home", () => {
  it("renders without crashing", () => {
    render(<Home />);
  });

  it("has the correct navigation links", () => {
    render(<Home />);
    const dashboardLink = screen.getByText(/View My Stats/i);
    const signupLink = screen.getByText(/Sign Up Now/i);

    expect(dashboardLink).toHaveAttribute("href", "/dashboard");
    expect(signupLink).toHaveAttribute("href", "/sign-in");
  });
});
