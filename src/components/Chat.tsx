import { useEffect, useState, type FormEvent } from "react";
import { io } from "socket.io-client";
import { Input } from "./ui/input";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("connected", socket.id);
});

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    socket.on("message", (newMessage: string) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;
    socket.emit("message", message);
    setMessage("");
  };

  return (
    <section>
      <h1>Chat</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <form onSubmit={handleSend}>
        <Input
          type="text"
          autoComplete="off"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default Chat;
