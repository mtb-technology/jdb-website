// Add type declaration for dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

import { getChatEmployees } from "@/app/chat/dictionary";
import { useTracking } from "@/app/components/providers/tracking-provider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Message, sendMessage } from "@/lib/chat-stream";
import { chatENToDictionaryKey, chatNLToDictionaryKey } from "@/lib/routes";
import confetti from "canvas-confetti";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  Copy,
  RefreshCw,
  Send,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export interface ToolCallMetadata {
  tool_name: string;
  tool_args: Record<string, any>;
  tool_result?: Record<string, any>;
}

type ChatInterfaceProps = {
  initialMessage?: string;
  onReset: () => void;
  assistantId: number;
  dict: any;
};

export function ChatInterface({
  initialMessage,
  onReset,
  assistantId,
  dict,
}: ChatInterfaceProps) {
  const { trackingData } = useTracking();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [currentSession, setCurrentSession] = useState<{
    chatSessionId?: string;
    parentMessageId?: string;
  }>({});
  const initialMessageProcessedRef = useRef(false);
  const [isCopied, setIsCopied] = useState(false);
  const [feedbackGiven, setFeedbackGiven] = useState<
    "useful" | "not-useful" | null
  >(null);
  const router = useRouter();
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  // Get the current employee ID from the URL
  const currentEmployeeId = pathname.split("/").pop() || "not-found";

  // Get the appropriate dictionary mapping based on language
  const dictionaryMapping = isEnglish
    ? chatENToDictionaryKey
    : chatNLToDictionaryKey;

  // Create employees array from the dictionary mapping
  const chatDicts = getChatEmployees(isEnglish ? "en" : "nl");
  const employees = chatDicts;
  // Find current employee

  const currentEmployee = dict;

  const handleEmployeeChange = (value: string) => {
    const basePath = isEnglish ? "/en/" : "";
    router.push(value);
  };

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [shouldAutoScroll, setShouldAutoScroll] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialMessage && !initialMessageProcessedRef.current) {
      initialMessageProcessedRef.current = true;
      handleSendMessage(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    const handleScroll = () => {
      if (!chatContainerRef.current) return;

      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
      const isNearBottom = distanceFromBottom < 100;

      setShouldAutoScroll(isNearBottom);
      setShowScrollButton(!isNearBottom && messages.length > 2);
    };

    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [messages.length]);

  const scrollToBottom = (smooth = true) => {
    if (!chatContainerRef.current) return;

    chatContainerRef.current.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  // Auto scroll on new messages if user is near bottom
  useEffect(() => {
    if (shouldAutoScroll && messages.length > 0) {
      scrollToBottom(false); // Use instant scroll for new messages
    }
  }, [messages, shouldAutoScroll]);

  const handleSendMessage = async (messageText: string = input) => {
    if (!messageText.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
      chatSessionId: currentSession.chatSessionId,
      parentMessageId: currentSession.parentMessageId,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const messageGenerator = sendMessage({
        message: messageText,
        chatSessionId: currentSession.chatSessionId,
        parentMessageId: currentSession.parentMessageId,
        assistantId: assistantId,
      });

      let fullResponse = "";
      let hasStartedReceiving = false;
      let newMessageId: string | undefined;

      for await (const chunks of messageGenerator) {
        for (const chunk of chunks) {
          if ("answer_piece" in chunk) {
            if (!hasStartedReceiving) {
              hasStartedReceiving = true;
              const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: chunk.answer_piece,
                timestamp: new Date(),
              };
              setMessages((prev) => [...prev, assistantMessage]);
              setIsTyping(false);
            } else {
              setMessages((prev) => {
                const lastMessage = prev[prev.length - 1];
                if (
                  lastMessage?.role === "assistant" &&
                  !lastMessage.content.endsWith(chunk.answer_piece)
                ) {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    ...lastMessage,
                    content: lastMessage.content + chunk.answer_piece,
                  };
                  return newMessages;
                }
                return prev;
              });
            }
          } else if (Object.hasOwn(chunk, "message_id")) {
            newMessageId = chunk.message_id;
            // Update session state when we receive chat session info
            if (chunk.chat_session_id) {
              setCurrentSession({
                chatSessionId: chunk.chat_session_id,
                parentMessageId: chunk.message_id,
              });
            }
          } else if (Object.hasOwn(chunk, "tool_call") && chunk.tool_call) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              event: "toolCall",
              ecommerce: chunk.tool_call.tool_result,
              language: isEnglish ? "en" : "nl",
              tracking_id: trackingData?.trackingId,
              lead_source: trackingData?.leadSource,
            });
          }
        }
      }

      // Update parent message ID for next message
      if (newMessageId) {
        setCurrentSession((prev) => ({
          ...prev,
          parentMessageId: newMessageId,
        }));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "An error occurred. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
      // Focus the textarea after the stream completes
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleResetChat = () => {
    initialMessageProcessedRef.current = false;
    onReset();
  };

  // Reset copy state after 2 seconds
  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  const handleCopyMessage = async () => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "assistant") return;

    try {
      await navigator.clipboard.writeText(lastMessage.content);
      setIsCopied(true);
    } catch (err) {
      console.error("Failed to copy message:", err);
    }
  };

  const handleFeedback = async (type: "useful" | "not-useful") => {
    if (feedbackGiven || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.role !== "assistant") return;

    setFeedbackGiven(type);

    if (type === "useful") {
      // Trigger confetti animation
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#2B4EE6", "#60A5FA", "#93C5FD"],
      });
    }

    // Here you can add API call to save feedback
    // try {
    //   await fetch(`${API_URL}/feedback`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${API_KEY}`,
    //     },
    //     body: JSON.stringify({
    //       messageId: lastMessage.id,
    //       feedback: type,
    //       sessionId: currentSession.chatSessionId,
    //     }),
    //   });
    // } catch (error) {
    //   console.error('Failed to save feedback:', error);
    // }
  };

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "44px";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [input]);

  return (
    <div className="flex flex-col h-[calc(100vh-85px)] md:h-[calc(100vh-165px)] max-w-4xl mx-auto w-full relative bg-white">
      {/* Fixed Header */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 border-b bg-white/30 backdrop-blur-lg">
        {/* start employee dropdown */}
        <div className="flex items-center gap-3">
          <Image
            src="/logo-small.svg"
            alt="Jan de Belastingman"
            width={40}
            height={40}
            className="rounded-full"
          />
          <Select
            value={currentEmployeeId}
            onValueChange={handleEmployeeChange}
          >
            <SelectTrigger className="w-[200px] border-none shadow-none focus:ring-0 pl-0 cursor-pointer group">
              <SelectValue>
                <div className="flex flex-col items-start group-hover:opacity-70 transition-all duration-200">
                  <span className="font-semibold text-[#1a1a1a] group-hover:text-primary">
                    {currentEmployee.assistantName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {currentEmployee.assistantDescription}
                  </span>
                </div>
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="border border-gray-100 shadow-md">
              {employees.map((employee) => (
                <SelectItem
                  key={employee.id}
                  value={employee.id}
                  className={`cursor-pointer focus:bg-primary/5 data-[state=checked]:bg-primary/5 ${employee.id == currentEmployeeId ? "bg-primary/5" : ""}`}
                >
                  <div className="flex flex-col items-start py-1 hover:opacity-70 transition-all duration-200">
                    <span className="font-medium hover:text-primary">
                      {employee.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {employee.description}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* end employee dropdown */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleResetChat}
          className="text-gray-500 hover:text-primary"
        >
          <RefreshCw className="h-5 w-5" />
        </Button>
      </div>

      {/* Scrollable Messages Area */}
      <div className="flex-1 overflow-hidden pt-[72px] pb-[100px]">
        <div
          ref={chatContainerRef}
          className="h-full overflow-y-auto px-4 space-y-4 scroll-smooth py-12"
        >
          {/* Welcome message */}
          {messages.length === 0 && (
            <div className="flex justify-center items-center h-full">
              <div className="text-center max-w-md">
                <Image
                  src="/logo-small.svg"
                  alt="Jan de Belastingman"
                  width={80}
                  height={80}
                  className="mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  Welkom bij Jan de Belastingman
                </h3>
                <p className="text-gray-600 mb-4">
                  Stel je vraag over belastingen en ik help je direct met een
                  duidelijk antwoord.
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs"
                    onClick={() =>
                      setInput("Welke aftrekposten kan ik toepassen?")
                    }
                  >
                    Welke aftrekposten kan ik toepassen?
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full text-xs"
                    onClick={() =>
                      setInput("Hoe moet de btw-aangifte als zelfstandige?")
                    }
                  >
                    Hoe moet de btw-aangifte als zelfstandige?
                  </Button>
                </div>
              </div>
            </div>
          )}

          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`
                  rounded-2xl p-4 
                  ${
                    message.role === "user"
                      ? "bg-gray-100 text-gray-800 rounded-tr-none"
                      : " ext-gray-800 rounded-tl-none"
                  }
                `}
                >
                  <div className="flex flex-col">
                    <div className=" text-sm mb-1">
                      <div className="prose prose-sm max-w-none">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    </div>
                    {/* <div className="text-xs self-end mt-1 opacity-70">
                      {formatTime(message.timestamp)}
                    </div> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-[80%] sm:max-w-[70%]">
                <div className="flex space-x-2">
                  <div
                    className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 z-10 ">
        {/* Message actions */}
        <div className="bg-gradient-to-b from-transparent to-white px-4 py-2 flex justify-center gap-2">
          {messages.length > 0 &&
            messages[messages.length - 1].role === "assistant" && (
              <>
                <Button
                  variant={feedbackGiven === "useful" ? "default" : "outline"}
                  size="sm"
                  className={`rounded-full ${
                    feedbackGiven === "useful"
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : feedbackGiven === "not-useful"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                  }`}
                  onClick={() => handleFeedback("useful")}
                  disabled={feedbackGiven !== null}
                >
                  <ThumbsUp className="h-4 w-4 mr-1" />
                  <span className="text-xs">
                    {feedbackGiven === "useful" ? "Bedankt!" : "Nuttig"}
                  </span>
                </Button>
                <Button
                  variant={
                    feedbackGiven === "not-useful" ? "default" : "outline"
                  }
                  size="sm"
                  className={`rounded-full ${
                    feedbackGiven === "not-useful"
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : feedbackGiven === "useful"
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                  }`}
                  onClick={() => handleFeedback("not-useful")}
                  disabled={feedbackGiven !== null}
                >
                  <ThumbsDown className="h-4 w-4 mr-1" />
                  <span className="text-xs">
                    {feedbackGiven === "not-useful"
                      ? "Bedankt!"
                      : "Niet nuttig"}
                  </span>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full"
                  onClick={handleCopyMessage}
                >
                  <Copy
                    className={`h-4 w-4 mr-1 ${isCopied ? "text-green-500" : ""}`}
                  />
                  <span className="text-xs">
                    {isCopied ? "Gekopieerd!" : "Kopiëren"}
                  </span>
                </Button>
              </>
            )}
        </div>
        {/* Input area */}
        <div className="p-4 bg-white">
          <div className="relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isTyping}
              placeholder="Stel je vraag..."
              rows={1}
              className={`w-full pl-4 pr-12 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none overflow-hidden leading-[44px] align-middle transition-colors duration-200
                ${isTyping ? "bg-gray-50 text-gray-500 cursor-not-allowed placeholder-gray-400" : "bg-white"}
              `}
              style={{
                minHeight: "44px",
                maxHeight: "120px",
                paddingTop: "0",
                paddingBottom: "0",
              }}
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isTyping}
              className={`absolute right-1 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full flex items-center justify-center transition-colors duration-200
                ${
                  isTyping
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90"
                }`}
            >
              <Send className="h-4 w-4 text-white" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center hidden md:block">
            Deze dienst is een digitale assistent, geen gecertificeerde
            belastingadviseur.
          </p>
        </div>
      </div>

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <div className="fixed bottom-[200px] right-8 z-20">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-md"
            onClick={() => scrollToBottom(true)}
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
