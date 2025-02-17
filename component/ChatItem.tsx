/** @format */

"use client";

import { Box, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

export default function ChatItem({
  isMine = false,
  content,
  name,
  icon,
  size,
}: {
  isMine?: boolean;
  content: string;
  name: string;
  icon: string;
  size: "sm" | "lg";
}) {
  const avatarSize = size === "sm" ? 24 : 72;
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
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: size === "sm" ? "5px" : "20px",
            }}
          >
            <div>
              <Avatar
                alt="Remy Sharp"
                src={icon}
                sx={{ width: avatarSize, height: avatarSize }}
              />
            </div>
            <Typography
              fontWeight={700}
              sx={{ fontSize: size === "sm" ? "12px" : "36px" }}
            >
              {name}
            </Typography>
          </Box>
          <Box sx={{ marginLeft: size === "sm" ? "30px" : "80px" }}>
            <Box
              sx={{
                background: "white",
                width: "fit-content",
                padding: "4px 7px",
                borderRadius: "10px",
              }}
            >
              <Typography sx={{ fontSize: size === "sm" ? "12px" : "70px" }}>
                {content}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </div>
  );
}
