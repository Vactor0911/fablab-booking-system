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
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

const FindPassword = () => {
  const [studentId, setStudentId] = useState(""); // 학번
  const [email, setEmail] = useState(""); // 이메일
  const [confirmCode, setConfirmCode] = useState(""); // 인증번호
  const [isConfirmCodeSent, setIsConfirmCodeSent] = useState(false); // 인증번호 전송 여부
  const [confirmTimeLeft, setConfirmTimeLeft] = useState(300); // 인증번호 입력 남은 시간
  const [isConfirmCodeChecked, setIsConfirmCodeChecked] = useState(false); // 인증번호 확인 여부
  const [password, setPassword] = useState(""); // 비밀번호
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 표시 여부
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false); // 비밀번호 표시 여부

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

  // 비밀번호 표시/숨김
  const handlePasswordVisibleClick = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  // 비밀번호 확인 표시/숨김
  const handlePasswordConfirmVisibleClick = useCallback(() => {
    setIsPasswordConfirmVisible((prev) => !prev);
  }, []);

  // 비밀번호 재설정 버튼 클릭
  const handlePasswordResetButtonClick = useCallback(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <Stack className="page-root">
        <Stack
          width={{
            xs: "90%",
            sm: "65%",
          }}
          maxWidth="600px"
          padding="80px 0"
          gap={3}
        >
          {/* 페이지명 */}
          <Typography variant="h2" fontWeight="bold">
            비밀번호 찾기
          </Typography>

          {/* 학번 입력란 */}
          <TextField
            placeholder="학번"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            fullWidth
          />

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
              {isConfirmCodeChecked && <CheckRoundedIcon color="success" />}
            </Box>

            {/* 인증 확인 버튼 */}
            <Button
              variant="contained"
              onClick={handleConfirmCodeCheckButtonClick}
            >
              인증 확인
            </Button>
          </Stack>

          {/* 비밀번호 재설정 */}
          <Box display={isConfirmCodeChecked ? "block" : "none"}>
            {/* 비밀번호 재설정 제목 */}
            <Typography
              variant="h3"
              color="primary"
              marginBottom={1}
              fontWeight="bold"
            >
              새 비밀번호 입력
            </Typography>

            <Stack gap={3}>
              <Stack gap={1}>
                {/* 비밀번호 입력란 */}
                <OutlinedInput
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="비밀번호"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  // 비밀번호 보임/안보임
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibleClick}>
                        {isPasswordVisible ? (
                          <VisibilityRoundedIcon />
                        ) : (
                          <VisibilityOffRoundedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                {/* 비밀번호 필요 조건 */}
                <Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <CircleRoundedIcon
                      color="primary"
                      sx={{ fontSize: "0.8em" }}
                    />
                    <Typography variant="subtitle1">8글자 이상</Typography>
                    <CheckRoundedIcon
                      color="success"
                      sx={{
                        display: password.length >= 8 ? "block" : "none",
                      }}
                    />
                  </Stack>
                  <Stack direction="row" alignItems="center" gap={1}>
                    <CircleRoundedIcon
                      color="primary"
                      sx={{ fontSize: "0.8em" }}
                    />
                    <Typography variant="subtitle1">
                      영문, 숫자, 특수문자 포함
                    </Typography>
                    <CheckRoundedIcon
                      color="success"
                      sx={{
                        display:
                          /[a-zA-Z]/.test(password) &&
                          /[0-9]/.test(password) &&
                          /[~!@#$%?]/.test(password)
                            ? "block"
                            : "none",
                      }}
                    />
                  </Stack>
                </Stack>
              </Stack>

              {/* 비밀번호 재입력 입력란 */}
              <OutlinedInput
                type={isPasswordConfirmVisible ? "text" : "password"}
                placeholder="비밀번호 재입력"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required
                // 비밀번호 보임/안보임
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={handlePasswordConfirmVisibleClick}>
                      {isPasswordConfirmVisible ? (
                        <VisibilityRoundedIcon />
                      ) : (
                        <VisibilityOffRoundedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Stack>
          </Box>

          <Stack gap={1}>
            {/* 비밀번호 재설정 버튼 */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handlePasswordResetButtonClick}
              fullWidth
              sx={{
                fontSize: "1.5em",
                fontWeight: "bold",
                textTransform: "none",
              }}
            >
              비밀번호 재설정
            </Button>

            <Link
              to="/login"
              css={{
                textDecoration: "none",
                color: theme.palette.secondary.main,
              }}
            >
              <Typography variant="subtitle1" color="primary">
                로그인으로 돌아가기
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default FindPassword;
