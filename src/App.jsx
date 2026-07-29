import { useEffect, useState } from "react";
import ChatMessages from "./Components/ChatMessages";
import ChatInput from "./Components/ChatInput";
import cancelIcone from "../src/assets/cancel.png";

function App() {
  const messages = JSON.parse(localStorage.getItem("messages")) || [];
  const [chatMessages, setChatMessages] = useState(messages);
  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(chatMessages));
  }, [chatMessages]);

  return (
    <div className="flex flex-col h-dvh px-2 pt-3 pb-6 md:max-w-2xl md:mx-auto md:pb-7">
      {chatMessages.length === 0 ? (
        <p className="text-center text-gray-400">
          Welcome to chatbot project! Send a message using the textbox below
        </p>
      ) : (
        ""
      )}

      {showMenu && (
        <div className="absolute inset-0 flex justify-center items-center bg-black/20 z-50 backdrop-blur-sm px-4">
          <div className="bg-gray-300 inline-flex flex-col justify-center items-center shadow-2xl m-auto w-[90%] py-10 rounded-2xl space-y-2 relative text-nowrap sm:w-[40%]">
            <h1 className="uppercase text-white font-extrabold text-xl">
              here are what i can do
            </h1>

            <button
              className="absolute top-2 right-2 cursor-pointer"
              onClick={() => {
                setShowMenu(false);
              }}
            >
              <img src={cancelIcone} className="w-5" />
            </button>

            <ul className="list-disc list-inside  marker:text-green-400 text-gray-700 text-base">
              <li>I can reply a message "hello"</li>
              <li>I can tell you todays date</li>
              <li>I can flip a coin</li>
              <li>I tell you the name of my creator</li>
            </ul>
          </div>
        </div>
      )}

      <ChatMessages chatMessages={chatMessages} />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessage={setChatMessages}
        setShowMenu={setShowMenu}
      />
    </div>
  );
}

export default App;
