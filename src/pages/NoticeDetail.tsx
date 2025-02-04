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
import TokenRefresher from "../components/TokenRefresher";
import axiosInstance, { getCsrfToken } from "../utils/axiosInstance";
import axios from "axios";

const NoticeDetail = () => {
  const location = useLocation();
  const uuid = location.pathname.split("/")[2]; // 공지사항 ID

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
  const [isEditing, setIsEditing] = useState(
    location.pathname === "/notice/new"
  );

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

  // 공지사항 정보 불러오기
  const [author, setAuthor] = useState(""); // 작성자
  const [date, setDate] = useState(""); // 작성일
  const [noticeId, setNoticeId] = useState(-1); // 공지사항 ID
  const fetchNotice = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/notice/${uuid}`); // 공지사항 ID를 기반으로 API 호출
      setTitle(response.data.notice.title);
      setContent(response.data.notice.content);
      setAuthor(response.data.notice.author_name);
      setDate(response.data.notice.created_date);
      setNoticeId(response.data.notice.notice_id);
    } catch (err) {
      console.error("공지사항 데이터를 가져오는 중 오류 발생:", err);
    }
  }, [uuid]);

  // 조회수 증가
  const increaseView = useCallback(async () => {
    // 새 공지사항 작성 페이지일 경우 종료
    if (location.pathname === "/notice/new") {
      return;
    }

    try {
      const csrfToken = await getCsrfToken();

      await axiosInstance.patch(
        `/notice/${uuid}/increment-views`,
        {},
        {
          headers: {
            "X-CSRF-Token": csrfToken, // CSRF 토큰 추가
          },
        }
      );
    } catch (err) {
      console.error("조회수 증가 중 오류 발생:", err);
    }
  }, [location.pathname, uuid]);

  useEffect(() => {
    fetchNotice();
    increaseView();
  }, [fetchNotice, increaseView]);

  // 등록 버튼 클릭
  const handlePostButtonClick = useCallback(async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    try {
      const csrfToken = await axiosInstance
        .get("/csrf-token")
        .then((res) => res.data.csrfToken);
      await axiosInstance.post(
        "/admin/notice",
        { title, content, userId: loginState.userId },
        {
          headers: { "X-CSRF-Token": csrfToken },
        }
      );
      alert("새로운 공지사항이 성공적으로 작성되었습니다.");
      navigate("/notice");
    } catch (err: unknown) {
      // 이거 해결법은 then catch로 바꾸면 될듯
      console.error("공지사항 작성 중 오류 발생:", err);
      if (axios.isAxiosError(err)) {
        alert(
          `공지사항 수정 중 오류가 발생했습니다: ${
            err.response?.data?.message || err.message
          }`
        );
      } else {
        alert(`공지사항 수정 중 오류가 발생했습니다: ${err}`);
      }
    }
  }, [content, loginState.userId, navigate, title]);

  // 수정 버튼 클릭
  const [oldData, setOldData] = useState({
    title: title,
    content: content,
  });
  const handleEditButtonClick = useCallback(() => {
    setOldData({
      title: title,
      content: content,
    });
    setIsEditing(true);
  }, [content, title]);

  // 수정 취소 버튼 클릭
  const handleCancelButtonClick = useCallback(() => {
    if (
      window.confirm("변경 사항이 모두 사라집니다.\n정말 취소하시겠습니까?")
    ) {
      setTitle(oldData.title);
      setContent(oldData.content);
      setIsEditing(false);
    }
  }, [oldData.content, oldData.title]);

  // 수정 확인 버튼 클릭
  const handleConfirmButtonClick = useCallback(() => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해주세요.");
      return;
    }

    axiosInstance
      .get("/csrf-token")
      .then((res) => res.data.csrfToken)
      .then((csrfToken) => {
        return axiosInstance.patch(
          `/admin/notice/${uuid}`,
          {
            title,
            content,
            userId: loginState.userId, // 사용자 ID 추가
            noticeId, // 공지사항 ID 추가
          },
          {
            headers: { "X-CSRF-Token": csrfToken },
          }
        );
      })
      .then(() => {
        alert("공지사항이 성공적으로 수정되었습니다.");
        setIsEditing(false);
      })
      .catch((err) => {
        console.error("공지사항 수정 중 오류 발생:", err);
        alert(
          `공지사항 수정 중 오류가 발생했습니다: ${
            err.response?.data?.message || err.message
          }`
        );
      });
  }, [content, loginState.userId, noticeId, title, uuid]);

  // 공지사항 삭제 버튼 클릭
  const handleDeleteButtonClick = useCallback(async () => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) {
      return;
    }

    try {
      const csrfToken = await axiosInstance
        .get("/csrf-token")
        .then((res) => res.data.csrfToken);

      await axiosInstance.delete(`/admin/notice/${uuid}`, {
        data: {
          userId: loginState.userId,
          noticeId, // 공지사항 ID 추가
        },
        headers: { "X-CSRF-Token": csrfToken },
      });
      alert("공지사항이 성공적으로 삭제되었습니다.");
      navigate("/notice");
    } catch (err) {
      console.error("공지사항 삭제 중 오류 발생:", err);
      alert("공지사항 삭제 중 오류가 발생했습니다.");
    }
  }, [loginState.userId, navigate, noticeId, uuid]);

  return (
    <TokenRefresher>
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
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textWrap: "wrap",
                        wordBreak: "break-all",
                      }}
                    >
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
                  <Typography variant="subtitle1">
                    {location.pathname === "/notice/new"
                      ? loginState.userName
                      : author}
                  </Typography>
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
                    {location.pathname === "/notice/new"
                      ? dateFormatter.format(new Date())
                      : date}
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
                    <Typography
                      component="pre"
                      variant="subtitle1"
                      sx={{
                        textWrap: "wrap",
                        wordBreak: "break-all",
                      }}
                    >
                      {content}
                    </Typography>
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
                      {location.pathname === "/notice/new"
                        ? dateFormatter.format(new Date())
                        : date}
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
    </TokenRefresher>
  );
};

export default NoticeDetail;
