import { useRef, useEffect } from "react";
import ChatMessage from "./ChatMessage";

function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const chatElement = chatMessagesRef.current;
    if (chatElement) chatElement.scrollTop = chatElement.scrollHeight;
  }, [chatMessages]);

  return (
    <section
      className="space-y-5 grow overflow-scroll [&::-webkit-scrollbar]:hidden"
      ref={chatMessagesRef}
    >
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            time={chatMessage.time}
            key={chatMessage.key}
          />
        );
      })}
    </section>
  );
}

export default ChatMessages;
