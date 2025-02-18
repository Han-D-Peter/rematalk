"use client";

import { Box, Button, IconButton } from "@mui/material";
import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import { Message } from "./Studio";
import { supabase } from "./ChatRoom";
import ChatItem from "./ChatItem";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

export default function TeachersRoom() {
  const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const refreshAll = async () => {
    const { data } = await supabase
      .from("Message")
      .select<"*", Message>()
      .order("created_at", { ascending: false });

    if (data) {
      setMessages(data);
    }
  };

  const isOffBtnEnabled = messages.find((msg) => msg.selected);

  async function deleteMsg(id: number) {
    const hasConfirmed = confirm("이 메세지를 지울까요?");
    if (hasConfirmed) {
      const { data, error } = await supabase
        .from("Message")
        .delete()
        .eq("id", id);
    }
  }

  async function showMsgToDisplay(id: number) {
    await supabase
      .from("Message")
      .update({ selected: false })
      .eq("selected", true);

    await supabase.from("Message").update({ selected: true }).eq("id", id);
  }

  async function offMsgToDisplay() {
    const { data, error } = await supabase
      .from("Message")
      .update({ selected: false })
      .eq("selected", true);
  }

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

  useLayoutEffect(() => {
    document.body.style.background = "rgb(207, 206, 206)";
  }, []);

  useEffect(() => {
    refreshAll();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "20px",
        }}
      >
        {messages.map((msg, index) => {
          return (
            <Box key={index} sx={{ display: "flex", alignItems: "center" }}>
              <IconButton onClick={() => deleteMsg(msg.id)}>
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Box
                onClick={() => setSelectedMsg(msg)}
                sx={{
                  width: "100%",
                  background: selectedMsg === msg ? "pink" : "none",
                  padding: "8px",
                }}
              >
                <ChatItem
                  size="sm"
                  isMine={false}
                  content={msg.content}
                  name={msg.name}
                  icon={`/icons/${msg.icon}.png`}
                />
              </Box>
            </Box>
          );
        })}

        <Box
          sx={{
            position: "fixed",
            bottom: "0",
            left: "0",
            width: "100%",
            display: "flex",
            background: "grey",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Button
              disabled={!selectedMsg}
              onClick={() => showMsgToDisplay(selectedMsg!.id)}
              sx={{ width: "100%", height: "100px" }}
              variant="contained"
            >
              올리기
            </Button>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Button
              sx={{ width: "100%", background: "red", height: "100px" }}
              variant="contained"
              onClick={offMsgToDisplay}
              disabled={!isOffBtnEnabled}
            >
              내리기
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={{ height: "100px" }}></Box>
    </>
  );
}
