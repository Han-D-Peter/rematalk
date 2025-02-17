"use client";

import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import ChatItem from "./ChatItem";
import { Box, Button, IconButton, TextField } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import SendIcon from "@mui/icons-material/Send";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
export default function ChatRoom({
  name = "anon",
  uuid,
  iconNumber,
}: {
  name?: string;
  uuid: string;
  iconNumber: number;
}) {
  const chatBox = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<
    {
      name: string;
      content: string;
      createdAt: string;
      uuid: string;
    }[]
  >([]);

  const [isLast, setIsLast] = useState(false);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    if (inputRef.current) inputRef.current.value = value;
  };

  const onSubmit = async (event: FormEvent) => {
    const { data, error } = await supabase
      .from("Message")
      .insert({ name, content: inputRef.current!.value, uuid });
    // moveToLast();
    inputRef.current!.value = "";
  };

  const moveToLast = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  useEffect(() => {
    const handleInserts = (payload: any) => {
      const { content, created_at, name, uuid } = payload.new;

      setMessages((prev) => [
        ...prev,
        { content, createdAt: created_at, name, uuid },
      ]);

      // Scroll to the bottom
    };

    // Listen to inserts
    supabase
      .channel("Message")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "Message" },
        handleInserts
      )
      .subscribe();
  }, []);

  useEffect(() => {
    const lastBox = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsLast(true);
        } else {
          setIsLast(false);
        }
      });
    });

    lastBox.observe(chatBox.current!);
  });

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "scroll",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <ChatItem content={"hello"} name="peter" icon={`/icons/1.png`} />
        <ChatItem
          content={
            "안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요안녕하세요"
          }
          name="재성"
          icon={`/icons/2.png`}
        />
        <ChatItem
          isMine={true}
          content={"hello"}
          name="peter"
          icon={`/icons/1.png`}
        />
        <ChatItem content={"안녕하세요"} name="재성" icon={`/icons/2.png`} />
        <ChatItem
          isMine={true}
          content={"hello"}
          name="peter"
          icon={`/icons/1.png`}
        />
        <ChatItem content={"안녕하세요"} name="재성" icon={`/icons/2.png`} />
        <ChatItem
          isMine={true}
          content={"hello"}
          name="peter"
          icon={`/icons/1.png`}
        />
        <ChatItem content={"안녕하세요"} name="재성" icon={`/icons/2.png`} />
        <ChatItem
          isMine={true}
          content={"hello"}
          name="peter"
          icon={`/icons/1.png`}
        />
        <ChatItem content={"안녕하세요"} name="재성" icon={`/icons/2.png`} />
        <ChatItem content={"hello"} name="peter" icon={`/icons/1.png`} />
        <ChatItem content={"안녕하세요"} name="재성" icon={`/icons/2.png`} />
        <ChatItem content={"hello"} name="peter" icon={`/icons/1.png`} />
        <ChatItem content={"안녕하세요"} name="재성" icon={`/icons/2.png`} />
        <ChatItem
          isMine={true}
          content={"hello"}
          name="peter"
          icon={`/icons/1.png`}
        />
        <ChatItem content={"안녕하세요"} name="재성" icon={`/icons/2.png`} />
        <ChatItem
          isMine={true}
          content={"hello"}
          name="peter"
          icon={`/icons/1.png`}
        />
        <ChatItem content={"안녕하세요"} name="재성" icon={`/icons/2.png`} />
        <ChatItem content={"hello"} name="peter" icon={`/icons/1.png`} />
        <ChatItem content={"안녕하세요"} name="재성" icon={`/icons/2.png`} />
        <ChatItem content={"hello"} name="peter" icon={`/icons/1.png`} />
        <ChatItem
          isMine={true}
          content={"안녕하세요"}
          name="재성"
          icon={`/icons/2.png`}
        />
        <ChatItem content={"hello"} name="peter" icon={`/icons/1.png`} />
        <ChatItem
          isMine={true}
          content={"안녕하세요"}
          name="재성"
          icon={`/icons/2.png`}
        />
        <ChatItem content={"hello"} name="peter" icon={`/icons/1.png`} />
        <ChatItem content={"안녕하세요"} name="재성" icon={`/icons/2.png`} />

        {messages.map((msg, index) => {
          return (
            <ChatItem
              key={index}
              isMine={msg.uuid === uuid}
              content={msg.content}
              name={msg.name}
              icon={`/icons/${iconNumber}.png`}
            />
          );
        })}
      </Box>
      <Box sx={{ height: "50px" }}></Box>
      <Box ref={chatBox} sx={{ height: "50px" }}></Box>
      {!isLast && (
        <Box
          sx={{
            position: "fixed",
            left: "47%",
            bottom: "50px",
            width: "100%",
          }}
        >
          <IconButton onClick={moveToLast} sx={{ background: "white" }}>
            <ArrowCircleDownIcon />
          </IconButton>
        </Box>
      )}
      <Box
        sx={{
          position: "fixed",
          left: "0",
          bottom: "0",
          width: "100%",
          background: "white",
          height: "fit-content",
          display: "flex",
          alignItems: "end",
        }}
      >
        <TextField
          sx={{
            background: "white",
            padding: "0",
            width: "calc(100% - 64px)",
            border: "none",
          }}
          multiline
          inputRef={inputRef}
          variant="standard"
          onChange={onChange}
        />
        <Button
          sx={{ background: "rgb(55, 94, 211)" }}
          variant="contained"
          onClick={onSubmit}
        >
          <SendIcon />
        </Button>
      </Box>
    </Box>
  );
}
