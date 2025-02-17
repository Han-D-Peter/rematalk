"use client";

import { useEffect, useState } from "react";
import { v4 } from "uuid";
import ChatRoom from "./ChatRoom";

export default function Entrance() {
  const [uuid, setUuid] = useState<string>("");
  const [iconNumber, setIconNumber] = useState<number>(1);

  useEffect(() => {
    setUuid(v4());
    setIconNumber(Math.floor(Math.random() * 62) + 1);
  }, []);

  return <ChatRoom uuid={uuid} iconNumber={iconNumber} />;
}
