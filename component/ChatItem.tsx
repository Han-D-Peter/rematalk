"use client";

import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function ChatItem({
  isMine = false,
  content,
  name,
  icon,
}: {
  isMine?: boolean;
  content: string;
  name: string;
  icon: string;
}) {
  return (
    <div>
      {isMine ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "end",
            flexDirection: "column",
            gap: "5px",
          }}
        >
          <Box
            sx={{
              background: "rgb(255, 244, 91)",
              width: "fit-content",
              padding: "4px 7px",
              borderRadius: "10px",
            }}
          >
            <Typography>{content}</Typography>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ display: "flex", alignItems: "start", gap: "5px" }}>
            <div>
              <Avatar
                alt="Remy Sharp"
                src={icon}
                sx={{ width: 24, height: 24 }}
              />
            </div>
            <Typography fontWeight={700} sx={{ fontSize: "12px" }}>
              {name}
            </Typography>
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
        </>
      )}
    </div>
  );
}
