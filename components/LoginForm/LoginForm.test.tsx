import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";
import { signIn } from "@/utils/auth";

jest.mock("@/utils/auth", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginForm", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders email and password fields", () => {
    render(<LoginForm />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    render(<LoginForm />);
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
  });

  it("shows error for invalid email format", async () => {
    render(<LoginForm />);
    await userEvent.type(screen.getByLabelText(/email/i), "notanemail");
    await userEvent.type(screen.getByLabelText(/password/i), "password123");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
  });

  it("calls signIn with correct credentials on valid submit", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({});
    render(<LoginForm />);
    await userEvent.type(
      screen.getByLabelText(/email/i),
      "alice@postcards.app"
    );
    await userEvent.type(screen.getByLabelText(/password/i), "Alice@1234!");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith("alice@postcards.app", "Alice@1234!")
    );
  });
  it("shows error message on failed login", async () => {
    (signIn as jest.Mock).mockRejectedValueOnce(
      new Error("Invalid credentials")
    );
    render(<LoginForm />);
    await userEvent.type(
      screen.getByLabelText(/email/i),
      "alice@postcards.app"
    );
    await userEvent.type(screen.getByLabelText(/password/i), "wrongpassword");
    await userEvent.click(screen.getByRole("button", { name: /sign in/i }));
    await waitFor(() =>
      expect(screen.getByText("Invalid email or password.")).toBeInTheDocument()
    );
  });
});
