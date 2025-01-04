import { createTheme } from "@mui/material";
import { color } from "./theme";

export const theme = createTheme({
  palette: {
    primary: { main: color.primary },
    secondary: { main: "#fff" },
  },
});
