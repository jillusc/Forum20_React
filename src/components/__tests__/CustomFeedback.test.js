import { render, screen } from "@testing-library/react";
import { SuccessMessage, ErrorMessage } from "../CustomFeedback";

test("renders success message with provided message", () => {
  const successMessage = "Your action was successfully completed.";
  render(<SuccessMessage message={successMessage} />);
  const successElement = screen.getByText(successMessage);
  expect(successElement).toBeInTheDocument();
});

test("renders error message with provided message", () => {
  const errorMessage = "There was an error.";
  render(<ErrorMessage message={errorMessage} />);
  const errorElement = screen.getByText(errorMessage);
  expect(errorElement).toBeInTheDocument();
});