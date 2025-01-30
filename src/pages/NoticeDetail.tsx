import {
  Button,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { dateFormatter, theme } from "../utils";
import { Link, useLocation } from "react-router";
import SectionHeader from "../components/SectionHeader";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";

const NoticeDetail = () => {
  const location = useLocation();

  return (
    <ThemeProvider theme={theme}>
      <Stack className="page-root">
        <Stack className="base-layout" gap={5}>
          {/* 페이지명 */}
          <Stack direction="row">
            <Link
              to="/notice"
              css={{
                textDecoration: "none",
                color: "black",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronLeftRoundedIcon fontSize="large" color="secondary" />
              <Typography variant="h2" fontWeight="bold">
                공지사항
              </Typography>
            </Link>
          </Stack>

          <Stack
            gap={{
              xs: 5,
              md: 7,
            }}
            flex={1}
          >
            {/* 상단 */}
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              gap={{
                xs: 5,
                md: 10,
              }}
            >
              {/* 제목 */}
              <Stack gap={2} flex={1}>
                <SectionHeader title="제목" />
                <Typography variant="subtitle1">
                  공지사항 제목 어쩌구 저쩌구
                </Typography>
              </Stack>

              {/* 작성자 */}
              <Stack
                gap={2}
                width={{
                  md: "250px",
                }}
              >
                <SectionHeader title="작성자" />
                <Typography variant="subtitle1">홍길동</Typography>
              </Stack>

              {/* 태블릿, 모바일용 작성일 */}
              <Stack
                gap={2}
                display={{
                  xs: "flex",
                  md: "none",
                }}
              >
                <SectionHeader title="작성일" />
                <Typography variant="subtitle1">
                  {dateFormatter.format(new Date())}
                </Typography>
              </Stack>
            </Stack>

            {/* 하단 */}
            <Stack
              direction={{
                xs: "column",
                md: "row",
              }}
              gap={{
                xs: 5,
                md: 10,
              }}
              flex={1}
            >
              {/* 내용 */}
              <Stack gap={2} flex={1}>
                <SectionHeader title="내용" />
                <TextField
                  placeholder="내용을 입력해주세요."
                  multiline
                  rows={18}
                />
              </Stack>

              <Stack
                width={{
                  md: "250px",
                }}
                gap={5}
                justifyContent="space-between"
              >
                {/* 작성일 */}
                <Stack
                  gap={2}
                  display={{
                    xs: "none",
                    md: "flex",
                  }}
                >
                  <SectionHeader title="작성일" />
                  <Typography variant="subtitle1">
                    {dateFormatter.format(new Date())}
                  </Typography>
                </Stack>

                {/* 버튼 */}
                {location.pathname === "/notice/new" && (
                  // 등록
                  <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{
                      borderRadius: "30px",
                    }}
                  >
                    <Typography variant="h2">등록</Typography>
                  </Button>
                )}
                {location.pathname !== "/notice/new" && (
                  <Stack direction="row" gap={3}>
                    {/* 수정 */}
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      sx={{
                        borderRadius: "30px",
                      }}
                    >
                      <Typography variant="h2">수정</Typography>
                    </Button>

                    {/* 삭제 */}
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      sx={{
                        borderRadius: "30px",
                      }}
                    >
                      <Typography variant="h2">삭제</Typography>
                    </Button>
                  </Stack>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default NoticeDetail;
