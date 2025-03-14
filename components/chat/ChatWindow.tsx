"use client";

import { Send } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ChatInterface } from "./ChatInterface";

export default function ChatWindow({ dict }: { dict: any }) {
  const [chatStarted, setChatStarted] = useState(false);
  const [initialMessage, setInitialMessage] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStartChat = (message?: string) => {
    if (message || (inputRef.current && inputRef.current.value)) {
      setInitialMessage(message || inputRef.current?.value);
      setChatStarted(true);
    }
  };

  const handleResetChat = () => {
    setChatStarted(false);
    setInitialMessage(undefined);
  };

  console.log(dict);

  return (
    <div className="w-full h-full md:px-4 pt-[83px]">
      <div className="flex flex-col h-full max-w-4xl mx-auto w-full justify-center">
        {chatStarted ? (
          <div className="w-full h-full">
            <ChatInterface
              initialMessage={initialMessage}
              onReset={handleResetChat}
              assistantId={dict.assistantId}
              dict={dict}
            />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-6 text-center">
            <div className="mb-8">
              <Image
                src="/logo-small.svg"
                alt="Tax Assistant Avatar"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-[#1a1a1a] mb-6 md:mb-2">
              {dict.helpQuestion}
            </h1>

            {dict.helpQuestionSubtitle && (
              <h2 className="text-[#1a1a1a] mb-6 md:mb-10">
                {dict.helpQuestionSubtitle}
              </h2>
            )}

            <div className="relative mb-10">
              <Input
                ref={inputRef}
                type="text"
                placeholder={dict.inputPlaceholder}
                className="w-full pl-4 pr-12 py-6 rounded-xl shadow-lg text-base"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputRef.current?.value) {
                    handleStartChat();
                  }
                }}
              />
              <button
                className="absolute right-4 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors"
                onClick={() => handleStartChat()}
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 justify-center mb-12 text-sm">
              {dict.commonQuestions.map(
                (question: { title: string; question: string }) => (
                  <Button
                    key={question.title}
                    variant="outline"
                    className="rounded-full"
                    onClick={() => handleStartChat(question.question)}
                  >
                    {question.title}
                  </Button>
                )
              )}
            </div>

            <p className="text-gray-500 mb-12 text-xs whitespace-pre-line hidden md:block">
              {dict.disclaimer}
            </p>

            <div className="text-center">
              <p className="text-gray-500 mb-4 text-sm">{dict.knownFrom}</p>
              <div className="flex justify-center items-center gap-4 md:gap-8 grayscale opacity-60 flex-wrap">
                {[
                  {
                    src: "/storage/media/b96c2cde-845a-4d93-93e9-4992fa9635f7.svg",
                    alt: "De Jurist",
                    url: "https://dejurist.com/nieuws/50008411/kortgedingrechter-jan-de-belastingman-maakt-geen-inbreuk-op-handelsnaam-jan",
                    width: 100,
                  },
                  {
                    src: "/storage/media/9ca66407-c491-4096-8a53-a97625154fd4.svg",
                    alt: "Accountant",
                    url: "https://www.accountant.nl/nieuws/2020/8/jan-moet-jan-de-belastingman-dulden",
                    width: 120,
                  },
                  {
                    src: "/storage/media/59b82e88-c24d-41c0-8380-6ae3d3420e48.svg",
                    url: "https://www.quotenet.nl/nieuws/a33495849/sneu-accountantskantoor-jan-eist-duizenden-euros-student",
                    alt: "Quote",
                    width: 90,
                  },
                  {
                    src: "/storage/media/1284cf24-5e7b-43aa-87cb-2ceb73ba7323.svg",
                    alt: "FD",
                    url: "https://www.fd.nl/nieuws/2020/10/jan-de-belastingman-krijgt-kortgeding-van-student-die-zijn-naam-gebruikt-heeft~b4441f2b/?referrer=https%3A%2F%2Fjandebelastingman.test%2F&referrer=https%3A%2F%2Fjandebelastingman.nl%2F",
                    width: 60,
                  },
                ].map((image, index) => (
                  <div key={index} className="h-6">
                    <Link href={image.url} target="_blank">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={image.width}
                        height={24}
                        className="h-full w-auto"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
