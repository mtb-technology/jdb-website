"use client";

import { Send } from "lucide-react";
import Image from "next/image";
import React, { FormEvent, KeyboardEvent, useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const API_URL = process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8080";
const API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY || "";

type NonEmptyObject = { [k: string]: any };

const processSingleChunk = <T extends NonEmptyObject>(
  chunk: string,
  currPartialChunk: string | null
): [T | null, string | null] => {
  const completeChunk = (currPartialChunk || "") + chunk;
  try {
    const chunkJson = JSON.parse(completeChunk);
    return [chunkJson, null];
  } catch (err) {
    return [null, completeChunk];
  }
};

const processRawChunkString = <T extends NonEmptyObject>(
  rawChunkString: string,
  previousPartialChunk: string | null
): [T[], string | null] => {
  if (!rawChunkString) {
    return [[], null];
  }
  const chunkSections = rawChunkString
    .split("\n")
    .filter((chunk) => chunk.length > 0);
  let parsedChunkSections: T[] = [];
  let currPartialChunk = previousPartialChunk;
  chunkSections.forEach((chunk) => {
    const [processedChunk, partialChunk] = processSingleChunk<T>(
      chunk,
      currPartialChunk
    );
    if (processedChunk) {
      parsedChunkSections.push(processedChunk);
      currPartialChunk = null;
    } else {
      currPartialChunk = partialChunk;
    }
  });

  return [parsedChunkSections, currPartialChunk];
};

async function* handleStream<T extends NonEmptyObject>(
  streamingResponse: Response
): AsyncGenerator<T[], void, unknown> {
  const reader = streamingResponse.body?.getReader();
  const decoder = new TextDecoder("utf-8");

  let previousPartialChunk: string | null = null;
  while (true) {
    const rawChunk = await reader?.read();
    if (!rawChunk) {
      throw new Error("Unable to process chunk");
    }
    const { done, value } = rawChunk;
    if (done) {
      break;
    }

    const [completedChunks, partialChunk] = processRawChunkString<T>(
      decoder.decode(value, { stream: true }),
      previousPartialChunk
    );
    if (!completedChunks.length && !partialChunk) {
      break;
    }
    previousPartialChunk = partialChunk as string | null;

    yield await Promise.resolve(completedChunks);
  }
}

async function* sendMessage({
  message,
  chatSessionId,
  parentMessageId,
}: {
  message: string;
  chatSessionId?: number;
  parentMessageId?: number;
}) {
  if (!chatSessionId || !parentMessageId) {
    const createSessionResponse = await fetch(
      `${API_URL}/chat/create-chat-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          persona_id: 0,
        }),
      }
    );

    if (!createSessionResponse.ok) {
      const errorJson = await createSessionResponse.json();
      const errorMsg = errorJson.message || errorJson.detail || "";
      throw Error(`Failed to create chat session - ${errorMsg}`);
    }

    const sessionData = await createSessionResponse.json();
    chatSessionId = sessionData.chat_session_id;
  }

  const sendMessageResponse = await fetch(`${API_URL}/chat/send-message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      chat_session_id: chatSessionId,
      parent_message_id: parentMessageId || null,
      message: message,
      prompt_id: null,
      search_doc_ids: null,
      file_descriptors: [],
      retrieval_options: {
        run_search: "always",
        filters: null,
      },
      query_override: null,
    }),
  });

  if (!sendMessageResponse.ok) {
    const errorJson = await sendMessageResponse.json();
    const errorMsg = errorJson.message || errorJson.detail || "";
    throw Error(`Failed to send message - ${errorMsg}`);
  }

  yield* handleStream<NonEmptyObject>(sendMessageResponse);
}

interface ChatWindowProps {
  dict: any;
}

export default function ChatWindow({ dict }: ChatWindowProps) {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement> | KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    if (inputText.trim()) {
      const initialPrevMessages = messages;
      setMessages([...initialPrevMessages, { text: inputText, isUser: true }]);
      setInputText("");
      setIsLoading(true);

      try {
        const messageGenerator = sendMessage({
          message: inputText,
          chatSessionId: undefined,
          parentMessageId: undefined,
        });
        let fullResponse = "";

        for await (const chunks of messageGenerator) {
          for (const chunk of chunks) {
            if ("answer_piece" in chunk) {
              fullResponse += chunk.answer_piece;
              setMessages([
                ...initialPrevMessages,
                { text: inputText, isUser: true },
                { text: fullResponse, isUser: false },
              ]);
            }
          }
        }
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "An error occurred. Please try again.", isUser: false },
        ]);
      } finally {
        setIsLoading(false);
        setTimeout(() => {
          inputRef.current?.focus();
        }, 0);
      }
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
    handleSubmit(new Event("submit") as any);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6">
      <div className="mb-8">
        <Image
          src="/logo-small.svg"
          alt="Tax Assistant Avatar"
          width={120}
          height={120}
          className="mx-auto"
        />
      </div>

      {messages.length === 0 ? (
        <>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 md:mb-8 text-center">
            {dict.helpQuestion}
          </h1>

          <div className="flex flex-wrap gap-2 justify-center mb-12 text-sm">
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() =>
                handleQuickQuestion(dict.commonQuestions.deductions)
              }
            >
              {dict.commonQuestions.deductions}
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() =>
                handleQuickQuestion(dict.commonQuestions.vatReturn)
              }
            >
              {dict.commonQuestions.vatReturn}
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => handleQuickQuestion(dict.commonQuestions.box3)}
            >
              {dict.commonQuestions.box3}
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() =>
                handleQuickQuestion(dict.commonQuestions.businessStructure)
              }
            >
              {dict.commonQuestions.businessStructure}
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => handleQuickQuestion(dict.commonQuestions.more)}
            >
              {dict.commonQuestions.more}
            </Button>
          </div>
        </>
      ) : (
        <div className="mb-6 h-[calc(100vh-600px)] w-full  min-w-3xl overflow-y-auto rounded-lg p-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"} mb-4`}
            >
              <div
                className={`max-w-[75%] p-3 rounded-lg ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <ReactMarkdown>{message.text}</ReactMarkdown>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-pulse flex space-x-2">
                <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
                <div className="w-2 h-2 bg-primary/60 rounded-full"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          ref={inputRef as any}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={dict.inputPlaceholder}
          className="w-full pl-4 pr-12 py-3 min-h-[60px] max-h-[200px] rounded-xl shadow-lg text-base resize-none overflow-auto flex items-center"
          style={{ paddingTop: "17px" }}
          disabled={isLoading}
          rows={1}
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {messages.length === 0 && (
        <>
          <p className="text-gray-500 mb-12 mt-12 text-xs w-full whitespace-pre-line text-center">
            {dict.disclaimer}
          </p>

          <div className="text-center">
            <p className="text-gray-500 mb-4 text-sm">{dict.knownFrom}</p>
            <div className="flex justify-center items-center gap-4 md:gap-8 grayscale opacity-60 flex-wrap">
              {[
                {
                  src: "https://jandebelastingman.nl/storage/media/b96c2cde-845a-4d93-93e9-4992fa9635f7.svg",
                  alt: "De Jurist",
                  width: 100,
                },
                {
                  src: "https://jandebelastingman.nl/storage/media/9ca66407-c491-4096-8a53-a97625154fd4.svg",
                  alt: "Accountant",
                  width: 120,
                },
                {
                  src: "https://jandebelastingman.nl/storage/media/59b82e88-c24d-41c0-8380-6ae3d3420e48.svg",
                  alt: "Quote",
                  width: 90,
                },
                {
                  src: "https://jandebelastingman.nl/storage/media/1284cf24-5e7b-43aa-87cb-2ceb73ba7323.svg",
                  alt: "FD",
                  width: 60,
                },
              ].map((image, index) => (
                <div key={index} className="h-6">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={24}
                    className="h-full w-auto"
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
