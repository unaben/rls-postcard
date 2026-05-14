import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PostcardCard from "./PostcardCard";
import { Postcard } from "./PostcardCard.types";

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ alt }: { alt: string }) => <img alt={alt} />,
}));

const mockPostcard: Postcard = {
  id: "test-1",
  title: "Hello from London",
  content: "Having a wonderful time here.",
  avatarSrc: "https://api.dicebear.com/7.x/adventurer/svg?seed=Felix",
  avatarLabel: "Felix",
  ownerId: "user-alice",
  ownerName: "Alice",
  createdAt: new Date("2025-05-01").toISOString(),
};

describe("PostcardCard", () => {
  it("renders the postcard title and content", () => {
    render(
      <PostcardCard
        postcard={mockPostcard}
        index={0}
        isOwner={false}
        onDelete={jest.fn()}
        onUpdate={jest.fn()}
      />
    );
    expect(screen.getByText("Hello from London")).toBeInTheDocument();
    expect(screen.getByText("Having a wonderful time here.")).toBeInTheDocument();
  });

  it("shows owner name for other users cards", () => {
    render(
      <PostcardCard
        postcard={mockPostcard}
        index={0}
        isOwner={false}
        onDelete={jest.fn()}
        onUpdate={jest.fn()}
      />
    );
    expect(screen.getByText("by Alice")).toBeInTheDocument();
  });

  it("does not render edit/delete buttons when not owner", () => {
    render(
      <PostcardCard
        postcard={mockPostcard}
        index={0}
        isOwner={false}
        onDelete={jest.fn()}
        onUpdate={jest.fn()}
      />
    );
    expect(screen.queryByLabelText("Edit postcard")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Delete postcard")).not.toBeInTheDocument();
  });

  it("renders edit and delete buttons when owner", () => {
    render(
      <PostcardCard
        postcard={mockPostcard}
        index={0}
        isOwner={true}
        onDelete={jest.fn()}
        onUpdate={jest.fn()}
      />
    );
    expect(screen.getByLabelText("Edit postcard")).toBeInTheDocument();
    expect(screen.getByLabelText("Delete postcard")).toBeInTheDocument();
  });

  it("opens confirm dialog when delete is clicked", async () => {
    render(
      <PostcardCard
        postcard={mockPostcard}
        index={0}
        isOwner={true}
        onDelete={jest.fn()}
        onUpdate={jest.fn()}
      />
    );
    await userEvent.click(screen.getByLabelText("Delete postcard"));
    expect(screen.getByText("Delete this postcard?")).toBeInTheDocument();
  });

  it("opens edit modal when edit is clicked", async () => {
    render(
      <PostcardCard
        postcard={mockPostcard}
        index={0}
        isOwner={true}
        onDelete={jest.fn()}
        onUpdate={jest.fn()}
      />
    );
    await userEvent.click(screen.getByLabelText("Edit postcard"));
    expect(screen.getByText("Update your card")).toBeInTheDocument();
  });

  it("does not call onDelete if cancel is clicked in confirm dialog", async () => {
    const onDelete = jest.fn();
    render(
      <PostcardCard
        postcard={mockPostcard}
        index={0}
        isOwner={true}
        onDelete={onDelete}
        onUpdate={jest.fn()}
      />
    );
    await userEvent.click(screen.getByLabelText("Delete postcard"));
    await userEvent.click(screen.getByRole("button", { name: /cancel/i }));
    expect(onDelete).not.toHaveBeenCalled();
  });
});