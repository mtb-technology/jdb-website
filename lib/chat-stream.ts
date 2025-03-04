const API_URL = process.env.NEXT_PUBLIC_AI_API_URL || "http://localhost:8080";
const API_KEY = process.env.NEXT_PUBLIC_AI_API_KEY || "";

type NonEmptyObject = { [k: string]: any };

const processSingleChunk = <T extends NonEmptyObject>(
  chunk: string,
  currPartialChunk: string | null,
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
  previousPartialChunk: string | null,
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
      currPartialChunk,
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
  streamingResponse: Response,
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
      previousPartialChunk,
    );
    if (!completedChunks.length && !partialChunk) {
      break;
    }
    previousPartialChunk = partialChunk as string | null;

    yield await Promise.resolve(completedChunks);
  }
}

export async function* sendMessage({
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
      },
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

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  chatSessionId?: number;
  parentMessageId?: number;
}; 