/** @format */

"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import ChatRoom from "./ChatRoom";
import { Box, Button, TextField } from "@mui/material";

import { useRouter, useSearchParams } from "next/navigation";
import useInputScroll from "@/hooks/useInputScroll";

export default function Entrance() {
  const [uuid, setUuid] = useState<string>("");
  const [name, setName] = useState<string | null>(null);
  const [iconNumber, setIconNumber] = useState<number>(1);

  const router = useRouter();
  const searchParams = useSearchParams();

  const inputRef = useRef<HTMLInputElement>(null);
  useInputScroll(inputRef);

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    setName(inputRef.current!.value);
    if (uuid && iconNumber) {
      router.push(
        `?name=${inputRef.current!.value}&uuid=${uuid}&icon=${iconNumber}`
      );
    }
  }

  useEffect(() => {
    const name = searchParams.get("name");
    const uuid = searchParams.get("uuid");
    const icon = searchParams.get("icon");

    if (name) {
      setName(name);
    }

    if (uuid) {
      setUuid(uuid);
    } else {
      setUuid(v4());
    }

    if (icon) {
      setIconNumber(Number(icon));
    } else {
      setIconNumber(Math.floor(Math.random() * 62) + 1);
    }
  }, []);

  useEffect(() => {
    const handlePopState = () => {
      setName(null);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return (
    <>
      {name ? (
        <ChatRoom uuid={uuid} iconNumber={iconNumber} name={name} />
      ) : (
        <Box
          sx={{
            width: "100vw",
            height: "100svh",
            overflowY: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box>
            <img src="/logo.png" width={270} />
          </Box>
          <Box
            sx={{
              width: "70%",
              height: "7%",
              background: "white",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <form onSubmit={onSubmit}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  height: "40px",
                }}
              >
                <Box>
                  <TextField
                    inputRef={inputRef}
                    size="small"
                    placeholder="별명이 뭐예요?"
                  />
                </Box>
                <Box>
                  <Button
                    sx={{ height: "40px" }}
                    variant="outlined"
                    type="submit"
                  >
                    입장
                  </Button>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </>
  );
}
