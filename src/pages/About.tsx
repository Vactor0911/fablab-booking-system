import { Box, Divider, Stack, ThemeProvider, Typography } from "@mui/material";
import { theme } from "../utils";

const About = () => {
  return (
    <ThemeProvider theme={theme}>
      <Stack className="page-root">
        <Stack className="base-layout" gap={7}>
          {/* 팹랩 소개 */}
          <Stack gap={2}>
            <Typography variant="h2" fontWeight="bold">
              팹랩 소개
            </Typography>
            <Divider
              sx={{
                borderWidth: "1px",
                borderRadius: "2px",
              }}
            />
            <Box
              minHeight="300px"
              sx={{
                border: `7px double ${theme.palette.primary.main}`,
              }}
            >
              {/* 팹랩 소개 내용 */}
            </Box>
          </Stack>

          {/* 팹랩 관리자 */}
          <Stack gap={2}>
            <Typography variant="h2" fontWeight="bold">
              팹랩 관리자
            </Typography>
            <Divider
              sx={{
                borderWidth: "1px",
                borderRadius: "2px",
              }}
            />
            <Box
              minHeight="300px"
              sx={{
                border: `7px double ${theme.palette.primary.main}`,
              }}
            >
              {/* 팹랩 관리자 내용 */}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default About;
