import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useCallback, useState } from "react";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { theme } from "../utils";
import { Link } from "react-router";

const LinkCss = {
  textDecoration: "none",
  color: "#6e6e6e",
};

const Login = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoginStateSave, setIsLoginStateSave] = useState(false);

  // 비밀번호 표시/숨김
  const handlePasswordVisibleClick = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  // 로그인 상태 유지/해제
  const handleLoginStateSaveChange = useCallback(() => {
    setIsLoginStateSave((prev) => !prev);
  }, []);

  // 로그인 버튼 클릭

  return (
    <ThemeProvider theme={theme}>
      <div
        css={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          className="login-container"
          css={{
            width: "50%",
            maxWidth: "600px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            "@media (max-width: 786px)": {
              width: "80%",
            },
            "@media (max-width: 480px)": {
              width: "90%",
            },
          }}
        >
          {/* 페이지명 */}
          <h1 css={{ textAlign: "center", marginBottom: "20px" }}>로그인</h1>

          {/* 학번 입력란 */}
          <TextField
            placeholder="학번"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            fullWidth
          />

          <div
            className="wrapper"
            css={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
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
            <div className="checkbox-wrapper">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isLoginStateSave}
                    onChange={handleLoginStateSaveChange}
                    color="primary"
                  />
                }
                label="로그인 상태 유지"
              />
            </div>
          </div>

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

          {/* 페이지 링크 */}
          <div
            className="link-container"
            css={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/register" css={LinkCss}>
              비밀번호 재설정
            </Link>
            <Link to="/register" css={LinkCss}>
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Login;
