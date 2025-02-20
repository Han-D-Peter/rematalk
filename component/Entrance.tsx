/** @format */

"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";
import ChatRoom from "./ChatRoom";
import { Box, Button, TextField } from "@mui/material";

export default function Entrance() {
  const [uuid, setUuid] = useState<string>("");
  const [name, setName] = useState<string | null>(null);
  const [iconNumber, setIconNumber] = useState<number>(1);

  const inputRef = useRef<HTMLInputElement>(null);

  function onSubmit(event: FormEvent) {
    event.preventDefault();

    setName(inputRef.current!.value);
  }

  useEffect(() => {
    setUuid(v4());
    setIconNumber(Math.floor(Math.random() * 62) + 1);
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
