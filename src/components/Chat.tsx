import { type ChatMessage } from "@/types";
import { useEffect, useState, type FormEvent } from "react";
import { io } from "socket.io-client";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const socket = io(import.meta.env.PUBLIC_API_URL || "http://localhost:3000");

socket.on("connect", () => {
  console.log("connected", socket.id);
});

const Chat = ({ userId }: { userId: string | null }) => {
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

    if (!userId) return;
    if (message?.content.trim() === "") return;

    socket.emit("message", message);
    setMessage({
      content: "",
      from: userId,
    });
  };

  return (
    <section>
      <h1>Chat</h1>
      <ScrollArea className="h-72 rounded-md border">
        {messages.map((msg, index) => {
          if (msg.from === userId) {
            return (
              <li className="flex justify-end px-3 py-1" key={index}>
                <Badge variant="secondary">
                  {msg.content} {" - "}
                  {msg.createdAt &&
                    new Date(msg.createdAt).toLocaleTimeString()}
                </Badge>
              </li>
            );
          }

          return (
            <li className="flex justify-start" key={index}>
              <span>
                {msg.content} {" - "}
                {msg.createdAt && new Date(msg.createdAt).toLocaleTimeString()}
              </span>
            </li>
          );
        })}
      </ScrollArea>
      <form onSubmit={handleSend}>
        <Input
          type="text"
          autoComplete="off"
          value={message?.content}
          onChange={(e) => {
            if (!userId) return;

            setMessage({
              content: e.target.value,
              from: userId,
              createdAt: new Date().toUTCString(),
            });
          }}
        />
        <Button type="submit">Send</Button>
      </form>
    </section>
  );
};

export default Chat;
