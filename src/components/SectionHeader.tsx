import { Box, BoxProps, Typography, useColorScheme } from "@mui/material";
import { theme } from "../utils";

interface SectionHeaderProps extends BoxProps {
  title: string;
  underline?: boolean;
}

const SectionHeader = ({ title, underline = false }: SectionHeaderProps) => {
  const { mode } = useColorScheme();

  return (
    <Box
      sx={{
        borderBottom: underline ? `2px solid ${theme.palette.divider}` : "none",
        borderColor:
          mode === "light" ? theme.palette.divider : "rgba(255, 255, 255, 0.5)",
      }}
    >
      <Typography
        variant="h3"
        padding="5px"
        sx={{
          display: "inline-block",
          position: "relative",
          "&:after": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "2px",
            bottom: "-2px",
            left: "0",
            backgroundColor: theme.palette.primary.main,
          },
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default SectionHeader;
