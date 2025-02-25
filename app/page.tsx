/** @format */

import Entrance from "@/component/Entrance";
import { Box } from "@mui/material";
import { Suspense } from "react";

export default async function Home() {
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
