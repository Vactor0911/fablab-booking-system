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
import { Link } from "react-router";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";

const LinkCss = {
  textDecoration: "none",
};

const Login = () => {
  const [studentId, setStudentId] = useState(""); // 학번
  const [password, setPassword] = useState(""); // 비밀번호
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // 비밀번호 표시 여부
  const [isLoginStateSave, setIsLoginStateSave] = useState(false); // 로그인 상태 유지 여부

  // 비밀번호 표시/숨김
  const handlePasswordVisibleClick = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  // 로그인 상태 유지/해제
  const handleLoginStateSaveChange = useCallback(() => {
    setIsLoginStateSave((prev) => !prev);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        className="page-root"
        direction="row"
        minHeight={{
          xs: "calc(100vh - 60px)",
          sm: "calc(100vh - 80px)",
        }}
        justifyContent="center"
        alignItems="center"
      >
        <Stack
          width={{
            xs: "90%",
            sm: "65%",
          }}
          maxWidth="600px"
          gap={3}
        >
          {/* 페이지명 */}
          <Typography variant="h4" fontWeight="bold">
            로그인
          </Typography>

          {/* 학번 입력란 */}
          <TextField
            placeholder="학번"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            fullWidth
          />

          <Stack>
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
              onClick={() => {}}
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
              <Link to="/" css={LinkCss}>
                <Typography variant="subtitle1" color="secondary">
                  비밀번호 찾기
                </Typography>
              </Link>
              <Link to="/register" css={LinkCss}>
                <Typography variant="subtitle1" color="secondary">
                  회원가입
                </Typography>
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default Login;
