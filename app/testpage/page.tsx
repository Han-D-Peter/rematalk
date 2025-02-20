"use client";

import { Box } from "@mui/material";

export default function TestPage() {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "200px",
        overflowY: "auto",
        background: "yellow",
      }}
    >
      <Box sx={{ width: "100%", height: "auto", background: "blue" }}>
        <input />
      </Box>
      <Box
        sx={{
          position: "absolute",
          left: 0,
          width: "1px",
          height: "calc(100% + 1px)",
        }}
      ></Box>
    </Box>
  );
}
