import { Stack, Typography, useColorScheme } from "@mui/material";
import { Link } from "react-router";

interface NoticeBannerProps {
  message: string;
  moreCount?: number;
}

const NoticeBanner = (props: NoticeBannerProps) => {
  const { message, moreCount = 0 } = props;

  const { mode } = useColorScheme();

  return (
    <Stack
      component={Link}
      to="/notice"
      direction="row"
      width="100%"
      justifyContent="center"
      alignItems="center"
      padding="10px 20px"
      color="white"
      gap={1}
      overflow="hidden"
      sx={{
        backgroundColor: mode === "light" ? "#c90f0f" : "#8e0b0b",
        textDecoration: "none",
      }}
    >
      <Typography
        variant="h3"
        fontWeight="bold"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {message}
      </Typography>
      <Typography variant="h3" fontWeight="bold">
        {moreCount > 0 && `+${moreCount}`}
      </Typography>
    </Stack>
  );
};

export default NoticeBanner;
