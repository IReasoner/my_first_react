import { useEffect, useState } from "react";
import ChatMessages from "./Components/ChatMessages";
import ChatInput from "./Components/ChatInput";

function App() {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  const [chatMessages, setChatMessages] = useState(messages);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="mx-auto max-w-xl flex flex-col h-dvh pb-10 pt-3">
      {chatMessages.length === 0 ? (
        <p className="text-center text-gray-400">
          Welcome to chatbot project! Send a message using the textbox below
        </p>
      ) : (
        ""
      )}

      <ChatMessages chatMessages={chatMessages} />
      <ChatInput chatMessages={chatMessages} setChatMessage={setChatMessages} />
    </div>
  );
}

export default App;
