"use client";

import { useQRCode } from "next-qrcode";

export default function ChatRoomQR() {
  const { Canvas } = useQRCode();
  return (
    <Canvas
      text={process.env.NEXT_PUBLIC_VERCEL_URL as string}
      options={{ margin: 1, scale: 5 }}
    />
  );
}
