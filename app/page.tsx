/** @format */

import Entrance from "@/component/Entrance";
import { Box } from "@mui/material";
import { createClient } from "@supabase/supabase-js";

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
      <Entrance />
    </Box>
  );
}
