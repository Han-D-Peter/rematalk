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
  const adaptiveSize = {
    avatarSize: size === "sm" ? 24 : 65,
    avatarGap: size === "sm" ? "5px" : "17px",
    nameFontSize: size === "sm" ? "12px" : "33px",
    contentLeftGap: size === "sm" ? "30px" : "80px",
    contentFontSize: size === "sm" ? "12px" : "30px",
    contentPadding: size === "sm" ? "4px 7px" : "6px 17px",
  };
  return (
    <Box sx={{ width: "100%" }}>
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
              gap: adaptiveSize.avatarGap,
            }}
          >
            <div>
              <Avatar
                alt="Remy Sharp"
                src={icon}
                sx={{
                  width: adaptiveSize.avatarSize,
                  height: adaptiveSize.avatarSize,
                }}
              />
            </div>
            <Typography
              fontWeight={700}
              sx={{
                fontSize: adaptiveSize.nameFontSize,
                WebkitTextStroke: size === "sm" ? "0px" : "1px white",
              }}
            >
              {name}
            </Typography>
          </Box>
          <Box sx={{ marginLeft: adaptiveSize.contentLeftGap }}>
            <Box
              sx={{
                background: "white",
                width: "fit-content",
                padding: adaptiveSize.contentPadding,
                borderRadius: "10px",
              }}
            >
              <Typography
                sx={{
                  fontSize: adaptiveSize.contentFontSize,
                  overflow: "hidden", // 추가
                  textOverflow: "ellipsis", // 추가
                  whiteSpace: "normal", // 추가
                  wordBreak: "break-all", // 추가
                }}
              >
                {content}
              </Typography>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
}
