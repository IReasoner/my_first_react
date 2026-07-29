import { useEffect, useState } from "react";
import { Chatbot } from "supersimpledev";
import dayjs from "dayjs";
import LoadingIcon from "../assets/icon2.png";

function ChatInput({ chatMessages, setChatMessage, setShowMenu }) {
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
    Chatbot.addResponses({ ["who is your creator"]: "IReasoner" });
  });

  return (
    <section className="flex gap-2 px-1 md:gap-3">
      <input
        className="border rounded-xl px-3 outline-none min-w-0 flex-1"
        placeholder="Type your message"
        onChange={saveInputText}
        value={inputText}
        onKeyDown={onKeyDown}
      />
      <button
        className="bg-green-700 rounded-lg text-white pointer-cursor hover:bg-green-600 active:bg-green-500 transition-colors py-2.5 px-3 md:px-6 md:py-3"
        onClick={sendMessage}
      >
        Send
      </button>
      <button
        className="disabled:bg-gray-200 disabled:cursor-not-allowed disabled:hover:bg-gray-200 bg-gray-300 rounded-lg text-black pointer-cursor hover:bg-gray-200 active:bg-gray-100 transition-colors py-1.5 px-3 md:px-6 md:py-3"
        disabled={!chatMessages.length && true}
        onClick={() => {
          localStorage.removeItem("messages");
          setChatMessage([]);
          setShowMenu(true);
        }}
      >
        Clear
      </button>
    </section>
  );
}

export default ChatInput;
