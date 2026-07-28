import RobotImage from "../assets/robot.png";
import UserImage from "../assets/user.png";

function ChatMessage({ message, sender, time }) {
  const position = sender === "user" ? "justify-end" : "justify-start";
  return (
    <div className={`items-center flex gap-4 py-2 px-3 ${position}`}>
      {sender === "robot" && (
        <img src={RobotImage} width="50" className="w-11" />
      )}
      <div className="bg-gray-100 py-4 px-5 max-w-sm rounded-2xl space-y-1">
        <p>{message}</p>
        <div className="text-gray-500">{time}</div>
      </div>
      {sender === "user" && (
        <img src={UserImage} className="w-11 rounded-full object-cover" />
      )}
    </div>
  );
}

export default ChatMessage;
