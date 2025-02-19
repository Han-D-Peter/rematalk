/** @format */

import Entrance from "@/component/Entrance";
import { Box } from "@mui/material";
import { createClient } from "@supabase/supabase-js";

export default async function Home() {
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100dvh",
          zIndex: -1,
        }}
      >
        <img
          src="/background.png"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Entrance />
    </>
  );
}
