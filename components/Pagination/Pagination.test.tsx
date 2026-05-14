import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Pagination", () => {
  it("renders current page and total pages", () => {
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={jest.fn()} />
    );
    expect(screen.getByText("2 / 5")).toBeInTheDocument();
  });

  it("calls onPageChange with next page when Next is clicked", async () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />
    );
    await userEvent.click(screen.getByLabelText("Next page"));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it("calls onPageChange with previous page when Prev is clicked", async () => {
    const onPageChange = jest.fn();
    render(
      <Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />
    );
    await userEvent.click(screen.getByLabelText("Previous page"));
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it("disables Prev button on first page", () => {
    render(
      <Pagination currentPage={1} totalPages={5} onPageChange={jest.fn()} />
    );
    expect(screen.getByLabelText("Previous page")).toBeDisabled();
  });

  it("disables Next button on last page", () => {
    render(
      <Pagination currentPage={5} totalPages={5} onPageChange={jest.fn()} />
    );
    expect(screen.getByLabelText("Next page")).toBeDisabled();
  });

  it("renders the correct number of dot indicators", () => {
    render(
      <Pagination currentPage={1} totalPages={4} onPageChange={jest.fn()} />
    );
    const dots = screen.getAllByRole("button", { name: /go to page/i });
    expect(dots).toHaveLength(4);
  });
});
