import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { theme } from "../utils";
import { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import axiosInstance, { getCsrfToken } from "../utils/axiosInstance";
import { setAccessToken } from "../utils/accessToken";
import { loginStateAtom, Permission } from "../states";
import { useSetAtom } from "jotai";
import axios from "axios";
import TokenRefresher from "../components/TokenRefresher";

const LinkCss = {
  textDecoration: "none",
};

const Login = () => {
  const [studentId, setStudentId] = useState(""); // 학번
  const [password, setPassword] = useState(""); // 비밀번호
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 표시 여부
  const [isLoginStateSave, setIsLoginStateSave] = useState(false); // 로그인 상태 유지 여부
  const setLoginState = useSetAtom(loginStateAtom); // 로그인 상태

  // 학번 입력
  const handleStudentIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStudentId(e.target.value.replace(" ", ""));
    },
    []
  );

  // 비밀번호 입력
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value.replace(" ", ""));
    },
    []
  );

  // 비밀번호 표시/숨김
  const handlePasswordVisibleClick = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  // 로그인 상태 유지/해제
  const handleLoginStateSaveChange = useCallback(() => {
    setIsLoginStateSave((prev) => !prev);
  }, []);

  // 로그인 버튼 클릭
  const navigate = useNavigate();
  const handleLoginButtonClick = useCallback(async () => {
    // 입력값 검증
    if (!studentId || !password) {
      alert("학번과 비밀번호를 입력해 주세요.");
      return;
    }

    try {
      // Step 1: CSRF 토큰 가져오기
      const csrfToken = await getCsrfToken();

      // Step 2: 서버에 로그인 요청
      const response = await axiosInstance.post(
        "/users/login",
        {
          id: studentId,
          password: password,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken, // CSRF 토큰 추가
          },
        }
      );

      // Step 3: 로그인 성공 처리
      const { name, userId, permissions } = response.data;
      setAccessToken(response.data.accessToken); // Access Token 저장
      // 로그인 성공 메시지
      alert(`[ ${name} ]님 환영합니다!`);

      let enumPermission = Permission.USER;
      switch (permissions) {
        case "admin":
          enumPermission = Permission.ADMIN;
          break;
        case "superadmin":
          enumPermission = Permission.SUPER_ADMIN;
          break;
      }

      // 로그인 상태 업데이트
      const newLoginState = {
        isLoggedIn: true, // 로그인 상태 boolean
        userId: userId, // 사용자 ID number
        permission: enumPermission, // 사용자 권한  string
        userName: name,
      };

      // Jotai 상태 업데이트
      setLoginState(newLoginState);

      // 로그인 상태 유지 체크시, 로컬 스토리지에 저장
      if (isLoginStateSave) {
        localStorage.setItem("FabLabLoginState", JSON.stringify(newLoginState));
      }

      // 성공 후 메인 페이지 이동
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("서버 오류:", error.response.data.message);
        alert(error.response.data.message || "로그인 실패");
      } else {
        console.error("요청 오류:", (error as Error).message);
        alert("예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.");
      }

      // 로그인 실패 시 비밀번호 초기화
      setPassword("");
    }
  }, [isLoginStateSave, navigate, password, setLoginState, studentId]);

  return (
    <TokenRefresher>
      <ThemeProvider theme={theme}>
        <Stack className="page-root" justifyContent="center">
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
              로그인
            </Typography>

            {/* 학번 입력란 */}
            <TextField
              placeholder="학번"
              value={studentId}
              onChange={handleStudentIdChange}
              fullWidth
            />

            <Stack>
              {/* 비밀번호 입력란 */}
              <OutlinedInput
                type={isPasswordVisible ? "text" : "password"}
                placeholder="비밀번호"
                value={password}
                onChange={handlePasswordChange}
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

              {/* 로그인 상태 유지 체크박스 */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isLoginStateSave}
                    onChange={handleLoginStateSaveChange}
                    color="primary"
                  />
                }
                label="로그인 상태 유지"
                sx={{
                  marginTop: "5px",
                }}
              />
            </Stack>

            <Stack gap={1}>
              {/* 로그인 버튼 */}
              <Button
                variant="contained"
                color="secondary"
                onClick={handleLoginButtonClick}
                fullWidth
                sx={{
                  fontSize: "1.5em",
                  fontWeight: "bold",
                  textTransform: "none",
                }}
              >
                FabLab 로그인
              </Button>

              {/* 하단 링크 */}
              <Stack direction="row" justifyContent="space-between">
                <Link to="/find-password" css={LinkCss}>
                  <Typography variant="subtitle1" color="secondary">
                    비밀번호 찾기
                  </Typography>
                </Link>
                <Link to="/register" css={LinkCss}>
                  <Typography variant="subtitle1" color="primary">
                    회원가입
                  </Typography>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </ThemeProvider>
    </TokenRefresher>
  );
};

export default Login;
