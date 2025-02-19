/** @format */

"use client";

import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import ChatItem from "./ChatItem";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import SendIcon from "@mui/icons-material/Send";
import { Message } from "./Studio";

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
  const chatListRef = useRef<HTMLDivElement>(null);
  const chatBox = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [isLast, setIsLast] = useState(true);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    if (inputRef.current) inputRef.current.value = value;
  };

  const onSubmit = async (event: FormEvent) => {
    if (!inputRef.current?.value) return;
    const { data, error } = await supabase
      .from("Message")
      .insert({
        name,
        content: inputRef.current!.value,
        uuid,
        icon: iconNumber,
      })
      .select();

    inputRef.current!.value = "";
    moveToLast();
    inputRef.current!.focus();

    refreshAll();
  };

  const refreshAll = async () => {
    const { data } = await supabase
      .from("Message")
      .select<"*", Message>()
      .order("created_at", { ascending: true });

    if (data) {
      setMessages(data);

      if (data.find((item) => item.selected && item.uuid === uuid)) {
        alert("내 메세지를 보고 있어요!");
      }
    }
  };

  const moveToLast = () => {
    if (chatListRef.current) {
      chatListRef.current.scrollTo({
        top: chatListRef.current.scrollHeight,
        behavior: "smooth", // 스무스한 스크롤 효과 추가
      });
    }
  };

  useEffect(() => {
    document.body.style.background = "#B4C8D9";
    refreshAll();
    moveToLast();
  }, []);

  useEffect(() => {
    if (isLast) moveToLast();
  }, [messages, isLast]);

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
  }, [isLast]);

  //   useEffect(() => {
  //     const lastBox = new IntersectionObserver((entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           setIsLast(true);
  //         } else {
  //           setIsLast(false);
  //         }
  //       });
  //     });

  //     lastBox.observe(chatBox.current!);
  //   }, []);

  useEffect(() => {
    function checkLast() {
      if (
        chatListRef.current!.scrollTop + chatListRef.current!.clientHeight ===
        chatListRef.current!.scrollHeight
      ) {
        setIsLast(true);
      } else {
        setIsLast(false);
      }
    }

    if (chatListRef.current)
      chatListRef.current.addEventListener("scroll", checkLast);

    return () => {
      if (chatListRef.current)
        chatListRef.current!.removeEventListener("scroll", checkLast);
    };
  }, []);

  return (
    <Box
      ref={chatListRef}
      sx={{
        height: "100svh",
        overflowY: "scroll",

        padding: "15px",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Box
          sx={{
            background: "rgb(252, 252, 252)",
            padding: "10px 10px 30px 10px",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <Typography fontWeight={800}>공지</Typography>
          <ChatItem
            size="sm"
            isMine={false}
            content={`안녕하세요. 예비 중 1과 예비 고 1 친구들의 고민에 부평중고등부 선배들이 지혜를 더해주는 토크 콘서트! '틴스톡' 채팅방입니다.`}
            name={"부평중고등부 방장"}
            icon={`/icons/59.png`}
          />
          <ChatItem
            size="sm"
            isMine={false}
            content={`꼭 '학년과실명' 으로 들어와주세요.`}
            name={"부평중고등부 방장"}
            icon={`/icons/59.png`}
          />
          <ChatItem
            size="sm"
            isMine={false}
            content={
              "'고3-베드로' 처럼 학년과 실명으로 해주셔야 선물을 드릴 수 있습니다."
            }
            name={"부평중고등부 방장"}
            icon={`/icons/59.png`}
          />
          <ChatItem
            size="sm"
            isMine={false}
            content={"선생님이 소개해주시는 사연에 나의 경험들을 올려주세요!"}
            name={"부평중고등부 방장"}
            icon={`/icons/59.png`}
          />
        </Box>
        {messages.map((msg, index) => {
          return (
            <ChatItem
              key={index}
              size="sm"
              isMine={msg.uuid === uuid}
              content={msg.content}
              name={msg.name}
              icon={`/icons/${msg.icon}.png`}
            />
          );
        })}

        <Box ref={chatBox} sx={{ height: "50px" }}></Box>
      </Box>
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
            padding: "0 0 0 10px",
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
