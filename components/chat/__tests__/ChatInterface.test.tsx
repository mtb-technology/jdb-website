import * as chatStream from "@/lib/chat-stream";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Image from "next/image";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ChatInterface } from "../ChatInterface";

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <Image src={src} alt={alt} width={100} height={100} />
  ),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => "/chat/test",
}));

// Mock the tracking provider
vi.mock("@/app/components/providers/tracking-provider", () => ({
  useTracking: () => ({
    trackingData: {
      trackingId: "test-id",
      leadSource: "test-source",
    },
  }),
}));

// Mock the chat-stream module
vi.mock("@/lib/chat-stream", () => ({
  sendMessage: vi.fn(),
}));

// Mock canvas-confetti
vi.mock("canvas-confetti", () => ({
  default: vi.fn(),
}));

// Mock scrollTo for JSDOM
Element.prototype.scrollTo = vi.fn();

const mockDict = {
  assistantId: 123,
  assistantName: "Test Assistant",
  assistantDescription: "Test Description",
  id: "test-id",
  name: "Test Name",
  description: "Test Description",
};

describe("ChatInterface", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders initial welcome message", () => {
    render(
      <ChatInterface
        initialMessage={undefined}
        onReset={vi.fn()}
        assistantId={123}
        dict={mockDict}
      />
    );

    expect(screen.getByText("Welkom bij Jan de Belastingman")).toBeDefined();
  });

  it("renders textarea for user input", () => {
    render(
      <ChatInterface
        initialMessage={undefined}
        onReset={vi.fn()}
        assistantId={123}
        dict={mockDict}
      />
    );

    expect(screen.getAllByPlaceholderText("Stel je vraag...")[0]).toBeDefined();
  });

  it("handles user input and message sending", async () => {
    const mockSendMessage = vi.fn(async function* () {
      yield [{ answer_piece: "Test response" }];
    });

    vi.spyOn(chatStream, "sendMessage").mockImplementation(mockSendMessage);

    render(
      <ChatInterface
        initialMessage={undefined}
        onReset={vi.fn()}
        assistantId={123}
        dict={mockDict}
      />
    );

    const textarea = screen.getAllByPlaceholderText("Stel je vraag...")[0];
    fireEvent.change(textarea, { target: { value: "Test question" } });

    // Find the send button by its aria-label
    const sendButton = screen.getAllByRole("button", {
      name: "Send message",
    })[0];
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Test response")).toBeDefined();
    });
  });

  it("shows feedback buttons after assistant response", async () => {
    const mockSendMessage = vi.fn(async function* () {
      yield [{ answer_piece: "Test response" }];
    });

    vi.spyOn(chatStream, "sendMessage").mockImplementation(mockSendMessage);

    render(
      <ChatInterface
        initialMessage={undefined}
        onReset={vi.fn()}
        assistantId={123}
        dict={mockDict}
      />
    );

    const textarea = screen.getAllByPlaceholderText("Stel je vraag...")[0];
    fireEvent.change(textarea, { target: { value: "Test question" } });

    // Find the send button by its aria-label
    const sendButton = screen.getAllByRole("button", {
      name: "Send message",
    })[0];
    fireEvent.click(sendButton);

    await waitFor(() => {
      expect(screen.getByText("Nuttig")).toBeDefined();
      expect(screen.getByText("Niet nuttig")).toBeDefined();
      expect(screen.getByText("Kopiëren")).toBeDefined();
    });
  });

  it("handles feedback button clicks", async () => {
    const mockSendMessage = vi.fn(async function* () {
      yield [{ answer_piece: "Test response" }];
    });

    vi.spyOn(chatStream, "sendMessage").mockImplementation(mockSendMessage);

    render(
      <ChatInterface
        initialMessage={undefined}
        onReset={vi.fn()}
        assistantId={123}
        dict={mockDict}
      />
    );

    // Send a message first to get the assistant response
    const textarea = screen.getAllByPlaceholderText("Stel je vraag...")[0];
    fireEvent.change(textarea, { target: { value: "Test question" } });

    // Find the send button by its aria-label
    const sendButton = screen.getAllByRole("button", {
      name: "Send message",
    })[0];
    fireEvent.click(sendButton);

    await waitFor(() => {
      const usefulButton = screen.getByText("Nuttig");
      fireEvent.click(usefulButton);
      expect(screen.getByText("Bedankt!")).toBeDefined();
    });
  });
});
