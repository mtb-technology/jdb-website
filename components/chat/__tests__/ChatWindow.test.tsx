import { fireEvent, render, screen } from "@testing-library/react";
import Image from "next/image";
import { describe, expect, it, vi } from "vitest";
import ChatWindow from "../ChatWindow";

// Mock the ChatInterface component since we'll test it separately
vi.mock("../ChatInterface", () => ({
  ChatInterface: () => (
    <div data-testid="mock-chat-interface">Mock Chat Interface</div>
  ),
}));

// Mock next/image
vi.mock("next/image", () => ({
  default: ({ src, alt }: { src: string; alt: string }) => (
    <Image src={src} alt={alt} width={100} height={100} />
  ),
}));

// Mock next/link
vi.mock("next/link", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

const mockDict = {
  helpQuestion: "How can I help you?",
  commonQuestions: [
    {
      title: "What deductions can I apply?",
      question: "What deductions can I apply?",
    },
  ],
  disclaimer: "Test disclaimer",
  knownFrom: "Known from",
  assistantId: "12",
};

describe("ChatWindow", () => {
  it("renders initial state correctly", () => {
    render(<ChatWindow dict={mockDict} />);

    // Check if the main elements are rendered
    expect(screen.getByText(mockDict.helpQuestion)).toBeDefined();
    expect(screen.getAllByPlaceholderText("Stel je vraag")[0]).toBeDefined();
    expect(
      screen.getAllByRole("button", {
        name: mockDict.commonQuestions[0].title,
      })[0]
    ).toBeDefined();
  });

  it("starts chat when clicking a common question button", () => {
    render(<ChatWindow dict={mockDict} />);

    const deductionsButton = screen.getAllByRole("button", {
      name: mockDict.commonQuestions[0].title,
    })[0];
    fireEvent.click(deductionsButton);

    // Check if ChatInterface is rendered
    expect(screen.getByTestId("mock-chat-interface")).toBeDefined();
  });

  it("starts chat when entering a custom message and pressing Enter", () => {
    render(<ChatWindow dict={mockDict} />);

    const input = screen.getAllByPlaceholderText("Stel je vraag")[0];
    fireEvent.change(input, { target: { value: "Custom question" } });
    fireEvent.keyDown(input, { key: "Enter" });

    // Check if ChatInterface is rendered
    expect(screen.getByTestId("mock-chat-interface")).toBeDefined();
  });

  it("starts chat when entering a custom message and clicking send button", () => {
    render(<ChatWindow dict={mockDict} />);

    const input = screen.getAllByPlaceholderText("Stel je vraag")[0];
    fireEvent.change(input, { target: { value: "Custom question" } });

    // Find the send button by its aria-label
    const sendButton = screen.getAllByRole("button", {
      name: "Send message",
    })[0];
    fireEvent.click(sendButton);

    // Check if ChatInterface is rendered
    expect(screen.getByTestId("mock-chat-interface")).toBeDefined();
  });
});
