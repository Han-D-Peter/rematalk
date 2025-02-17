"use client";

import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function ChatItem({
  content,
  name,
  icon,
}: {
  content: string;
  name: string;
  icon: string;
}) {
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "start", gap: "5px" }}>
        <div>
          <Avatar alt="Remy Sharp" src={icon} sx={{ width: 24, height: 24 }} />
        </div>
        <Typography sx={{ fontSize: "12px" }}>{name}</Typography>
      </Box>
      <Box sx={{ marginLeft: "30px" }}>
        <Box
          sx={{
            background: "white",
            width: "fit-content",
            padding: "4px 7px",
            borderRadius: "10px",
          }}
        >
          <Typography>{content}</Typography>
        </Box>
      </Box>
    </div>
  );
}
