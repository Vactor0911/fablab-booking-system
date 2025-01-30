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

const MyPage = () => {
  const [email, setEmail] = useState(""); // 이메일
  const [confirmCode, setConfirmCode] = useState(""); // 인증번호
  const [isConfirmCodeSent, setIsConfirmCodeSent] = useState(false); // 인증번호 전송 여부
  const [confirmTimeLeft, setConfirmTimeLeft] = useState(300); // 인증번호 입력 남은 시간
  const [isConfirmCodeChecked, setIsConfirmCodeChecked] = useState(false); // 인증번호 확인 여부

  // 인증번호 요청 버튼 클릭
  const handleConfirmCodeSendButtonClick = useCallback(() => {
    if (isConfirmCodeChecked) {
      return;
    }

    setIsConfirmCodeSent(true);
    setConfirmTimeLeft(300);
  }, [isConfirmCodeChecked]);

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
  const handleConfirmCodeCheckButtonClick = useCallback(() => {
    setIsConfirmCodeChecked(true);
  }, []);

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

  return (
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
                <TextField value="홍길동" disabled fullWidth />
              </Stack>

              {/* 학번 */}
              <Stack gap={1}>
                <SectionHeader title="학번" />
                <TextField value="2051001" disabled fullWidth />
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

            <Stack gap={1} flex={1} paddingBottom={{
                xs: "100px",
                sm: "0",
            }} position="relative">
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
                        /[~!@#$%?]/.test(newPassword)
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
                    <IconButton onClick={handleNewPasswordConfirmVisibleClick}>
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
              <Box position="absolute" bottom="0" right="0" width={{
                xs: "100%",
                sm: "auto",
              }}>
                <Button variant="contained" fullWidth>
                  <Typography variant="h2">수정하기</Typography>
                </Button>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default MyPage;
