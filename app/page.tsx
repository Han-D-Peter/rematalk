/** @format */

import Entrance from "@/component/Entrance";
import { Box } from "@mui/material";
import { createClient } from "@supabase/supabase-js";
import { Suspense } from "react";

export default async function Home() {
  console.log("deploy", process.env.VERCEL_URL);
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "auto",
        overflowY: "auto",
      }}
    >
      <Suspense fallback={<div>로딩 중...</div>}>
        <Entrance />
      </Suspense>
    </Box>
  );
}
