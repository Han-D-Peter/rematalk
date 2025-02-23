/** @format */

import { Avatar, Box, Typography } from "@mui/material";

export default function DisplayedChat({
  content,
  name,
  icon,
}: {
  content: string;
  name: string;
  icon: string;
}) {
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <div>
          <Avatar
            alt="Remy Sharp"
            src={icon}
            sx={{
              width: 72,
              height: 72,
            }}
          />
        </div>
        <Typography
          fontWeight={900}
          sx={{ fontSize: "45px", WebkitTextStroke: "3px white" }}
        >
          {name}
        </Typography>
      </Box>
      <Box sx={{ marginLeft: "80px" }}>
        <Box
          sx={{
            background: "white",
            width: "fit-content",
            padding: "6px 17px",
            borderRadius: "10px",
          }}
        >
          <Typography
            sx={{
              fontSize: "45px",
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
    </Box>
  );
}
