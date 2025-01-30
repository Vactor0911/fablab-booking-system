import {
  Button,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { dateFormatter, theme } from "../utils";
import { Link, useLocation, useNavigate } from "react-router";
import SectionHeader from "../components/SectionHeader";

import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import { useAtomValue } from "jotai";
import { loginStateAtom, Permission } from "../states";
import { useCallback, useEffect, useState } from "react";

const NoticeDetail = () => {
  const location = useLocation();

  // 관리자가 아닐 경우 새 공지사항 등록 페이지 접근 불가
  const navigate = useNavigate();
  const loginState = useAtomValue(loginStateAtom);

  useEffect(() => {
    if (location.pathname === "/notice/new") {
      if (!loginState.isLoggedIn || loginState.permission === Permission.USER) {
        alert("잘못된 접근입니다.");
        navigate("/");
      }
    }
  }, [
    location.pathname,
    loginState.isLoggedIn,
    loginState.permission,
    navigate,
  ]);

  // 수정 모드
  const [isEditing, setIsEditing] = useState(false);

  // 제목
  const [title, setTitle] = useState("");
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  // 내용
  const [content, setContent] = useState("");
  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  // 등록 버튼 클릭
  const handlePostButtonClick = useCallback(() => {
    // TODO: 등록 처리
  }, []);

  // 수정 버튼 클릭
  const handleEditButtonClick = useCallback(() => {
    setIsEditing(true);
  }, []);

  // 삭제 버튼 클릭
  const handleDeleteButtonClick = useCallback(() => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      // 삭제 처리
    }
  }, []);

  // 수정 취소 버튼 클릭
  const handleCancelButtonClick = useCallback(() => {
    setIsEditing(false);
  }, []);

  // 수정 확인 버튼 클릭
  const handleConfirmButtonClick = useCallback(() => {
    setIsEditing(false);
  }, []);

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
                {isEditing ? (
                  <TextField
                    placeholder="제목"
                    fullWidth
                    value={title}
                    onChange={handleTitleChange}
                  />
                ) : (
                  <Typography variant="subtitle1">
                    {title}
                  </Typography>
                )}
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

                {isEditing ? (
                  <TextField
                    placeholder="내용"
                    multiline
                    rows={18}
                    value={content}
                    onChange={handleContentChange}
                  />
                ) : (
                  <Typography component="pre" variant="subtitle1">{content}</Typography>
                )}
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
                {loginState.isLoggedIn &&
                  loginState.permission !== Permission.USER &&
                  (location.pathname === "/notice/new" ? (
                    // 등록
                    <Button
                      variant="outlined"
                      color="secondary"
                      fullWidth
                      sx={{
                        borderRadius: "30px",
                      }}
                      onClick={handlePostButtonClick}
                    >
                      <Typography variant="h2">등록</Typography>
                    </Button>
                  ) : isEditing ? (
                    // 수정 모드
                    <Stack direction="row" gap={3}>
                      {/* 취소 */}
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        sx={{
                          borderRadius: "30px",
                        }}
                        onClick={handleCancelButtonClick}
                      >
                        <Typography variant="h2">취소</Typography>
                      </Button>

                      {/* 확인 */}
                      <Button
                        variant="outlined"
                        color="error"
                        fullWidth
                        sx={{
                          borderRadius: "30px",
                        }}
                        onClick={handleConfirmButtonClick}
                      >
                        <Typography variant="h2">확인</Typography>
                      </Button>
                    </Stack>
                  ) : (
                    // 일반 모드
                    <Stack direction="row" gap={3}>
                      {/* 수정 */}
                      <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        sx={{
                          borderRadius: "30px",
                        }}
                        onClick={handleEditButtonClick}
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
                        onClick={handleDeleteButtonClick}
                      >
                        <Typography variant="h2">삭제</Typography>
                      </Button>
                    </Stack>
                  ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default NoticeDetail;
