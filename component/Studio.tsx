/** @format */

"use client";

import { Box } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "./ChatRoom";
import ChatItem from "./ChatItem";
import DisplayedChat from "./DisplayedChat";
import ChatRoomQR from "./ChatRoomQR";

export type Message = {
  id: number;
  name: string;
  content: string;
  createdAt: string;
  uuid: string;
  icon: number;
  selected: boolean;
};

export default function StudioPage() {
  const [messages, setMessages] = useState<Message[]>([]);

  const refreshAll = async () => {
    const { data } = await supabase
      .from("Message")
      .select<"*", Message>()
      .order("created_at", { ascending: false });

    if (data) setMessages(data);
  };
  useEffect(() => {
    const handleInserts = (payload: any) => {
      refreshAll();
    };

    // Listen to inserts
    const channel = supabase
      .channel("Message")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "Message" },
        handleInserts
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    refreshAll();
    document.body.style.background = "rgb(14, 237, 11)";
  }, []);

  const selectedMessage = useMemo(() => {
    return messages.find((msg) => msg.selected);
  }, [messages]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        display: "flex",
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100px",
          height: "100px",
        }}
      >
        <ChatRoomQR />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "end",
          zIndex: "100",
          width: "65%",
          height: "100%",
        }}
      >
        {selectedMessage && (
          <Box
            sx={{
              marginBottom: "70px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <DisplayedChat
              name={selectedMessage.name}
              content={selectedMessage.content}
              icon={`/icons/${selectedMessage.icon}.png`}
            />
          </Box>
        )}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          zIndex: "100",
          width: "35%",
          maxWidth: "35%",
          maxHeight: "100%",
          overflowY: "scroll",
          padding: "30px",
          background: "rgba(255, 255, 255, 0.59)",
        }}
      >
        {messages.map((msg, index) => (
          <ChatItem
            key={index}
            size={"lg"}
            name={msg.name}
            content={msg.content}
            icon={`/icons/${msg.icon}.png`}
          />
        ))}
      </Box>
    </Box>
  );
}
