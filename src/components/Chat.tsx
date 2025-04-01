import { type ChatMessage, type User } from "@/types";
import { useEffect, useState, type FormEvent } from "react";
import { io } from "socket.io-client";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";

const socket = io(import.meta.env.PUBLIC_API_URL || "http://localhost:3000");

export const Chat = ({ from, to }: { from: User; to: User }) => {
  const [message, setMessage] = useState<ChatMessage>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    socket.on("previousMessages", (prevMessages: ChatMessage[]) => {
      setMessages(prevMessages);
    });

    socket.emit("join", from._id);

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
      from: from._id,
      to: to._id,
    });

    setMessage({
      content: "",
      from: from._id,
      to: to._id,
    });
  };

  return (
    <section>
      <h1>Chat</h1>
      <ScrollArea className="h-72 rounded-md border">
        {messages.map((msg, index) => {
          if (msg.from === from._id) {
            return (
              <li className="flex justify-end px-3 py-1" key={index}>
                <Badge
                  variant="secondary"
                  className="items-end bg-[#708a6b] hover:bg-[#708a6b]"
                >
                  <span className="px-1">
                    {msg.content} {" - "}
                    {msg.createdAt &&
                      new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                  </span>
                </Badge>
              </li>
            );
          }

          return (
            <li className="flex justify-start px-3 py-1" key={index}>
              <Badge variant="secondary" className="flex flex-col items-start">
                <span className="px-1">{from.name}</span>
                <span className="px-1">
                  {msg.content} {" - "}
                  {msg.createdAt &&
                    new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
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
              from: from._id,
              to: to._id,
            });
          }}
        />
        <Button type="submit">Send</Button>
      </form>
    </section>
  );
};
