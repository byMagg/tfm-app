import { type ChatMessage } from "@/types";
import { useEffect, useState, type FormEvent } from "react";
import { io } from "socket.io-client";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const socket = io(import.meta.env.PUBLIC_API_URL || "http://localhost:3000");

socket.on("connect", () => {
  console.log("connected", socket.id);
});

const Chat = () => {
  const [message, setMessage] = useState<ChatMessage>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket.on("previousMessages", (prevMessages: ChatMessage[]) => {
      console.log(typeof prevMessages[0].createdAt);
      setMessages(prevMessages);
    });

    socket.on("message", (newMessage: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message?.content.trim() === "") return;

    socket.emit("message", message);
    setMessage({
      content: "",
    });
  };

  return (
    <section className="h-96">
      <h1>Chat</h1>
      <ul className="h-full overflow-y-auto">
        {messages.map((msg, index) => (
          <li key={index}>
            {msg.content} -
            {msg.createdAt && new Date(msg.createdAt).toLocaleTimeString()}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSend}>
        <Input
          type="text"
          autoComplete="off"
          value={message?.content}
          onChange={(e) => {
            setMessage({
              content: e.target.value,
            });
          }}
        />
        <Button type="submit">Send</Button>
      </form>
    </section>
  );
};

export default Chat;
