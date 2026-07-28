import { useEffect, useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import LoadingIcon from "../assets/icon2.png";

function ChatInput({ chatMessages, setChatMessage }) {
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const setTime = () => {
    const time = dayjs().valueOf();
    return dayjs(time).format("h:mma");
  };

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {
    if (inputText && !isLoading) {
      setIsLoading(true);
      const newChatMessages = [
        ...chatMessages,
        {
          message: inputText,
          time: setTime(),
          sender: "user",
          key: crypto.randomUUID(),
        },
      ];

      const waitingMessage = [
        ...newChatMessages,
        {
          message: <img src={LoadingIcon} className="animate-spin w-8" />,
          sender: "robot",
          key: crypto.randomUUID(),
        },
      ];

      setChatMessage(waitingMessage);
      setInputText("");

      const response = await Chatbot.getResponseAsync(inputText);

      setChatMessage([
        ...newChatMessages,
        {
          message: response,
          time: setTime(),
          sender: "robot",
          key: crypto.randomUUID(),
        },
      ]);
      setIsLoading(false);
    }
  }

  function onKeyDown(event) {
    if (event.key === "Enter") {
      sendMessage();
    }

    if (event.key === "Escape") {
      setInputText("");
    }
  }

  useEffect(() => {
    Chatbot.addResponses({ ["what is my name"]: "opeyemi" });
  });

  return (
    <section className="flex gap-3 mt-5">
      <input
        className="border grow rounded-xl px-3 outline-none"
        placeholder="Send a message to chatbot"
        size="30"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={onKeyDown}
      />
      <button
        className="bg-green-700 py-4 rounded-lg text-white pointer-cursor hover:bg-green-600 active:bg-green-500 px-6 transition-colors"
        onClick={sendMessage}
      >
        Send
      </button>
      <button
        className="bg-gray-300 py-4 rounded-lg text-black pointer-cursor hover:bg-gray-200 active:bg-gray-100 px-6 transition-colors"
        onClick={() => {
          localStorage.removeItem("messages");
          setChatMessage([]);
        }}
      >
        Clear
      </button>
    </section>
  );
}

export default ChatInput;
