import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../utils";
import SectionHeader from "../components/SectionHeader";
import { useCallback, useEffect, useState } from "react";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import axiosInstance, { getCsrfToken } from "../utils/axiosInstance";
import { useAtomValue } from "jotai";
import { loginStateAtom } from "../states";
import axios from "axios";
import TokenRefresher from "../components/TokenRefresher";

const MyPage = () => {
  const [email, setEmail] = useState(""); // 이메일
  const [defaultEmail, setDefaultEmail] = useState(""); // 기존 이메일
  const [confirmCode, setConfirmCode] = useState(""); // 인증번호
  const [isConfirmCodeSent, setIsConfirmCodeSent] = useState(false); // 인증번호 전송 여부
  const [confirmTimeLeft, setConfirmTimeLeft] = useState(300); // 인증번호 입력 남은 시간
  const [isConfirmCodeChecked, setIsConfirmCodeChecked] = useState(false); // 인증번호 확인 여부
  const [studentId, setStudentId] = useState(""); // 학번
  const [name, setName] = useState(""); // 이름

  // 인증번호 요청 버튼 클릭
  const handleConfirmCodeSendButtonClick = useCallback(async () => {
    if (isConfirmCodeChecked) {
      return;
    }

    // 인증번호 요청 API 호출
    try {
      // Step 1: CSRF 토큰 가져오기
      const csrfToken = await getCsrfToken();

      // Step 2: 인증번호 요청
      await axiosInstance.post(
        "/users/verify-email",
        {
          email,
          purpose: "modifyInfo", // 계정 복구용 인증번호 요청
          id: studentId,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken, // CSRF 토큰 추가
          },
        }
      );

      // 요청 성공 시 알림
      setIsConfirmCodeSent(true);
      setConfirmTimeLeft(300);
      alert("인증번호가 이메일로 발송되었습니다!");
    } catch (error) {
      // 요청 실패 시 알림
      if (axios.isAxiosError(error) && error.response) {
        alert(
          "이메일 전송 실패\n" +
            (error.response.data?.message || "알 수 없는 오류")
        );
      } else {
        console.error("요청 오류:", (error as Error).message);
        alert("예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    }
  }, [email, isConfirmCodeChecked, studentId]);

  // 인증번호 입력 타이머
  useEffect(() => {
    if (!isConfirmCodeSent || confirmTimeLeft <= 0 || isConfirmCodeChecked) {
      return;
    }

    const confirmCodeTimer = setInterval(() => {
      setConfirmTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(confirmCodeTimer); // 컴포넌트 언마운트 시 타이머 정리
  }, [isConfirmCodeChecked, confirmTimeLeft, isConfirmCodeSent]);

  // 타이머 시간 포맷팅
  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  // 인증번호 확인 버튼 클릭
  const handleConfirmCodeCheckButtonClick = useCallback(async () => {
    try {
      // Step 1: CSRF 토큰 가져오기
      const csrfToken = await getCsrfToken();

      // Step 2: 인증번호 확인 요청
      await axiosInstance.post(
        "/users/verify-code",
        {
          email,
          code: confirmCode,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken, // CSRF 토큰 추가
          },
        }
      );

      // 요청 성공 처리
      alert("인증번호 확인 완료!");
      setIsConfirmCodeChecked(true); // 인증 성공
    } catch (error) {
      // 요청 실패 처리
      if (axios.isAxiosError(error) && error.response) {
        alert(
          "인증 실패\n" + (error.response.data?.message || "알 수 없는 오류")
        );
      } else {
        console.error("요청 오류:", (error as Error).message);
        alert("예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    }
  }, [confirmCode, email]);

  // 비밀번호
  const [oldPassword, setOldPassword] = useState(""); // 기존 비밀번호
  const [isOldPasswordVisible, setIsOldPasswordVisible] = useState(false); // 기존 비밀번호 표시 여부
  const [newPassword, setNewPassword] = useState(""); // 새 비밀번호
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false); // 새 비밀번호 표시 여부
  const [newPasswordConfirm, setNewPasswordConfirm] = useState(""); // 새 비밀번호 확인
  const [isNewPasswordConfirmVisible, setIsNewPasswordConfirmVisible] =
    useState(false); // 새 비밀번호 확인 표시 여부

  // 기존 비밀번호 표시/숨김
  const handleOldPasswordVisibleClick = useCallback(() => {
    setIsOldPasswordVisible((prev) => !prev);
  }, []);

  // 새 비밀번호 표시/숨김
  const handleNewPasswordVisibleClick = useCallback(() => {
    setIsNewPasswordVisible((prev) => !prev);
  }, []);

  // 새 비밀번호 확인 표시/숨김
  const handleNewPasswordConfirmVisibleClick = useCallback(() => {
    setIsNewPasswordConfirmVisible((prev) => !prev);
  }, []);

  // 내 정보 불러오기
  const loginState = useAtomValue(loginStateAtom);

  useEffect(() => {
    if (loginState.isLoggedIn && loginState.userId) {
      // CSRF 토큰 가져오기
      getCsrfToken()
        .then((csrfToken) => {
          // 사용자 정보 요청
          return axiosInstance.get("/users/info", {
            headers: {
              "X-CSRF-Token": csrfToken, // CSRF 토큰 헤더 추가
            },
          });
        })
        .then((response) => {
          const userData = response.data.user;
          setStudentId(userData.id); // 학번 저장
          setName(userData.name); // 이름 저장
          setEmail(userData.email); // 이메일 저장
          setDefaultEmail(userData.email); // 기존 이메일 저장
        })
        .catch((error) => {
          console.error("사용자 정보를 불러오는 중 오류 발생:", error);
        });
    }
  }, [loginState.isLoggedIn, loginState.userId]);

  // 수정하기 버튼 클릭
  const handleEditButtonClick = useCallback(() => {
    // 이메일 미인증
    if (email !== defaultEmail && !isConfirmCodeChecked) {
      alert("이메일 변경 시 인증이 필요합니다.");
      return;
    }

    // 비밀번호 불일치
    if (newPassword !== newPasswordConfirm) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 충족 조건
    if (
      newPassword.length < 8 ||
      !/[a-zA-Z]/.test(newPassword) ||
      !/[0-9]/.test(newPassword) ||
      !/[!@#$%^&*?]/.test(newPassword)
    ) {
      alert("비밀번호는 8자 이상의 영문, 숫자, 특수문자를 포함해야 합니다.");
      return;
    }

    // CSRF 토큰 가져오기
    getCsrfToken()
      .then((csrfToken) => {
        // 사용자 정보 수정 요청
        return axiosInstance.patch(
          "/users/modify",
          {
            name,
            email,
            password: oldPassword,
            newpassword: newPassword,
            isVerified: isConfirmCodeChecked,
          },
          {
            headers: {
              "X-CSRF-Token": csrfToken, // CSRF 토큰 헤더 추가
            },
          }
        );
      })
      .then((response) => {
        alert(response.data.message);
        setOldPassword(""); // 비밀번호 초기화
        setNewPassword(""); // 새 비밀번호 초기화
        setNewPasswordConfirm(""); // 새 비밀번호 확인 초기화
        setConfirmCode(""); // 인증번호 초기화
        setIsConfirmCodeSent(false);
        setIsConfirmCodeChecked(false);
      })
      .catch((error) => {
        console.error("사용자 정보 수정 중 오류 발생:", error);
        alert(error.response?.data?.message || "오류가 발생했습니다.");
      });
  }, [
    defaultEmail,
    email,
    isConfirmCodeChecked,
    name,
    newPassword,
    newPasswordConfirm,
    oldPassword,
  ]);

  return (
    <TokenRefresher>
      <ThemeProvider theme={theme}>
        <Stack className="page-root">
          <Stack className="base-layout" gap={7}>
            {/* 페이지명 */}
            <Typography variant="h2">내 정보</Typography>

            <Stack
              direction={{
                xs: "column",
                sm: "row",
              }}
              gap={{
                xs: 5,
                md: 10,
              }}
            >
              <Stack gap={5} flex={1}>
                {/* 이름 */}
                <Stack gap={1}>
                  <SectionHeader title="이름" />
                  <TextField value={name} disabled fullWidth />
                </Stack>

                {/* 학번 */}
                <Stack gap={1}>
                  <SectionHeader title="학번" />
                  <TextField value={studentId} disabled fullWidth />
                </Stack>

                {/* 이메일 */}
                <Stack gap={1}>
                  <SectionHeader title="이메일" />

                  {/* 이메일 */}
                  <Stack direction="row" gap={1}>
                    {/* 이메일 입력란 */}
                    <TextField
                      placeholder="이메일"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{
                        flex: "1",
                      }}
                    />

                    {/* 인증 요청 버튼 */}
                    <Button
                      variant="outlined"
                      onClick={handleConfirmCodeSendButtonClick}
                    >
                      인증 요청
                    </Button>
                  </Stack>

                  {/* 인증번호 */}
                  <Stack
                    direction="row"
                    gap={1}
                    display={isConfirmCodeSent ? "flex" : "none"}
                  >
                    {/* 인증번호 입력란 */}
                    <TextField
                      placeholder="인증번호 입력"
                      value={confirmCode}
                      onChange={(e) => setConfirmCode(e.target.value)}
                      sx={{
                        flex: "1",
                        minWidth: "120px",
                      }}
                    />

                    {/* 남은 시간 타이머 */}
                    <Box display="flex" alignItems="center" flex={1}>
                      {!isConfirmCodeChecked && (
                        <Typography variant="subtitle1" color="primary">
                          {formatTime(confirmTimeLeft)}
                        </Typography>
                      )}
                      {isConfirmCodeChecked && (
                        <CheckRoundedIcon color="success" />
                      )}
                    </Box>

                    {/* 인증 확인 버튼 */}
                    <Button
                      variant="contained"
                      onClick={handleConfirmCodeCheckButtonClick}
                    >
                      인증 확인
                    </Button>
                  </Stack>
                </Stack>
              </Stack>

              <Stack
                gap={1}
                flex={1}
                paddingBottom={{
                  xs: "100px",
                  sm: "0",
                }}
                position="relative"
              >
                <SectionHeader title="비밀번호" />

                {/* 기존 비밀번호 입력란 */}
                <OutlinedInput
                  type={isOldPasswordVisible ? "text" : "password"}
                  placeholder="기존 비밀번호"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleOldPasswordVisibleClick}>
                        {isOldPasswordVisible ? (
                          <VisibilityRoundedIcon />
                        ) : (
                          <VisibilityOffRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                {/* 새 비밀번호 입력란 */}
                <OutlinedInput
                  type={isNewPasswordVisible ? "text" : "password"}
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleNewPasswordVisibleClick}>
                        {isNewPasswordVisible ? (
                          <VisibilityRoundedIcon />
                        ) : (
                          <VisibilityOffRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  sx={{
                    marginTop: "30px",
                  }}
                />

                {/* 비밀번호 필요 조건 */}
                <Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <CircleRoundedIcon
                      color="primary"
                      sx={{ fontSize: "0.8em" }}
                    />{" "}
                    <Typography variant="subtitle1">8글자 이상</Typography>
                    <CheckRoundedIcon
                      color="success"
                      sx={{
                        display: newPassword.length >= 8 ? "block" : "none",
                      }}
                    />
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <CircleRoundedIcon
                      color="primary"
                      sx={{ fontSize: "0.8em" }}
                    />{" "}
                    <Typography variant="subtitle1">
                      영문, 숫자, 특수문자 포함
                    </Typography>
                    <CheckRoundedIcon
                      color="success"
                      sx={{
                        display:
                          /[a-zA-Z]/.test(newPassword) &&
                          /[0-9]/.test(newPassword) &&
                          /[!@#$%^&*?]/.test(newPassword)
                            ? "block"
                            : "none",
                      }}
                    />
                  </Stack>
                </Stack>

                {/* 새 비밀번호 확인 입력란 */}
                <OutlinedInput
                  type={isNewPasswordConfirmVisible ? "text" : "password"}
                  placeholder="새 비밀번호 재입력"
                  value={newPasswordConfirm}
                  onChange={(e) => setNewPasswordConfirm(e.target.value)}
                  required
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleNewPasswordConfirmVisibleClick}
                      >
                        {isNewPasswordConfirmVisible ? (
                          <VisibilityRoundedIcon />
                        ) : (
                          <VisibilityOffRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                {/* 수정하기 버튼 */}
                <Box
                  position="absolute"
                  bottom="0"
                  right="0"
                  width={{
                    xs: "100%",
                    sm: "auto",
                  }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleEditButtonClick}
                  >
                    <Typography variant="h2">수정하기</Typography>
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ThemeProvider>
    </TokenRefresher>
  );
};

export default MyPage;
