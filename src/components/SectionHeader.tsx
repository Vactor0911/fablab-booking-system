import { Box, Typography } from "@mui/material";
import { theme } from "../utils";

interface SectionHeaderProps {
  title: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => {
  return (
    <Box sx={{ borderBottom: `2px solid ${theme.palette.divider}` }}>
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
