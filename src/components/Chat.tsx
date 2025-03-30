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

export const Chat = ({
  from,
  to,
}: {
  from: string | null;
  to: string | null;
}) => {
  const [message, setMessage] = useState<ChatMessage>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket.on("previousMessages", (prevMessages: ChatMessage[]) => {
      setMessages(prevMessages);
    });

    socket.emit("join", from);

    socket.on("message", (newMessage: ChatMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!from || !to) return;
    if (!message) return;
    if (message.content.trim() === "") return;

    socket.emit("message", {
      content: message.content,
      from: from,
      to: to,
    });

    setMessage({
      content: "",
      from,
      to,
    });
  };

  return (
    <section>
      <h1>Chat</h1>
      <ScrollArea className="h-72 rounded-md border">
        {messages.map((msg, index) => {
          if (msg.from === from) {
            return (
              <li className="flex justify-end px-3 py-1" key={index}>
                <Badge
                  variant="secondary"
                  className="bg-[#708a6b] hover:bg-[#708a6b]"
                >
                  {msg.content} {" - "}
                  {msg.createdAt &&
                    new Date(msg.createdAt).toLocaleTimeString()}
                </Badge>
              </li>
            );
          }

          return (
            <li className="flex justify-start" key={index}>
              <Badge variant="secondary" className="flex flex-col">
                <span>{msg.from}</span>
                <span>
                  {msg.content} {" - "}
                  {msg.createdAt &&
                    new Date(msg.createdAt).toLocaleTimeString()}
                </span>
              </Badge>
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
            if (!from || !to) return;

            setMessage({
              content: e.target.value,
              from: from,
              to: to,
            });
          }}
        />
        <Button type="submit">Send</Button>
      </form>
    </section>
  );
};
