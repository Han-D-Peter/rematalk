/** @format */

"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { supabase } from "./ChatRoom";
import ChatItem from "./ChatItem";

export default function StudioPage() {
  const [messages, setMessages] = useState<
    {
      name: string;
      content: string;
      createdAt: string;
      uuid: string;
    }[]
  >([]);
  const refreshAll = async () => {
    const { data } = await supabase
      .from("Message")
      .select<
        "*",
        {
          name: string;
          content: string;
          createdAt: string;
          uuid: string;
        }
      >()
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
        { event: "INSERT", schema: "public", table: "Message" },
        handleInserts
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "Message" },
        handleInserts
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  useEffect(() => {
    refreshAll();
  }, []);

  console.log("messages", messages);
  return (
    <Box sx={{ width: "100vw", height: "100vh", display: "flex" }}>
      <Box
        sx={{
          zIndex: "100",
          width: "65%",
          height: "100%",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "50px",
          zIndex: "100",
          width: "35%",
          maxHeight: "100%",
          overflowY: "scroll",
          padding: "30px",
        }}
      >
        {messages.map((msg, index) => (
          <ChatItem
            key={index}
            size={"lg"}
            name={msg.name}
            content={msg.content}
            icon={`/icons/${1}.png`}
          />
        ))}
      </Box>
      {/* <img
        src="/sample.png"
        alt="back wall"
        style={{
          zIndex: "1",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      /> */}
    </Box>
  );
}
