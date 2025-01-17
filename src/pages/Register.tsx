import {
  Box,
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
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

// 스크롤 있는 Stack 요소
const ScrollBox: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box
      height="250px"
      padding={2}
      sx={{
        backgroundColor: "#f4f4f4",
        overflowY: "auto",
      }}
    >
      {children}
    </Box>
  );
};

const Register = () => {
  const [studentId, setStudentId] = useState(""); // 학번
  const [name, setName] = useState(""); // 이름
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
  const [isPersonalInfoAgreed, setIsPersonalInfoAgreed] = useState(false); // 개인정보 동의 여부
  const [isGuidelineAgreed, setIsGuidelineAgreed] = useState(false); // 주의사항 확인 여부

  // 비밀번호 표시/숨김
  const handlePasswordVisibleClick = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  // 비밀번호 확인 표시/숨김
  const handlePasswordConfirmVisibleClick = useCallback(() => {
    setIsPasswordConfirmVisible((prev) => !prev);
  }, []);

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

  // 개인정보 동의 버튼 클릭
  const handlePersonalInfoAgreeButtonClick = useCallback(() => {
    setIsPersonalInfoAgreed((prev) => !prev);
  }, []);

  // 주의사항 확인 버튼 클릭
  const handleGuidelineAgreeButtonClick = useCallback(() => {
    setIsGuidelineAgreed((prev) => !prev);
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
          padding="80px 0"
          gap={3}
        >
          {/* 페이지명 */}
          <Typography variant="h4" fontWeight="bold">
            회원가입
          </Typography>

          {/* 학번 입력란 */}
          <TextField
            placeholder="학번"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            fullWidth
          />

          {/* 이름 입력란 */}
          <TextField
            placeholder="이름"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
              }}
            />

            {/* 남은 시간 타이머머 */}
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

          <Stack gap={1}>
            {/* 개인정보 동의서 */}
            <Stack>
              {/* 개인정보 동의서 제목 */}
              <Typography
                variant="h6"
                color="primary"
                marginBottom={1}
                fontWeight="bold"
              >
                개인정보 처리방침
              </Typography>

              {/* 개인정보 동의서 본문 */}
              <ScrollBox>
                <Typography variant="subtitle1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis illum, dolore repellat, in ab reprehenderit
                  sapiente, culpa sequi modi laudantium minima exercitationem
                  magnam ratione consequuntur quos voluptatem dolor alias
                  deserunt. Numquam voluptatum velit enim voluptas quis quae
                  accusantium incidunt illo, quia non suscipit sit fugiat?
                  Quisquam optio aut perferendis! Nulla dolorum aut fuga sint
                  nesciunt? Laborum ab qui suscipit placeat. Esse accusamus
                  obcaecati quam ipsa dignissimos sit neque veniam itaque nulla
                  aspernatur excepturi dolorem cupiditate eligendi, ex
                  reprehenderit, aliquam quos, ipsum sequi inventore? Saepe,
                  impedit odit perspiciatis quaerat inventore qui. Quaerat
                  nesciunt, maiores ut delectus, accusantium dolores neque
                  corporis accusamus odit, esse nisi. Eius maiores maxime, unde
                  quisquam minima ut voluptates fugiat quae omnis? Modi fuga
                  cumque odio facilis sit? Nihil cumque neque enim, aut commodi
                  dolores iusto a aliquid maiores, soluta distinctio impedit
                  ipsam officiis numquam quam odit quisquam cum incidunt
                  architecto sequi repellendus mollitia excepturi. Atque,
                  laborum dolore. Minus officiis ut et cupiditate unde expedita
                  facilis eaque, perferendis a, aliquid doloribus id tempore
                  officia fuga dicta, facere impedit molestias nisi animi velit
                  fugiat. Perferendis esse quia neque excepturi? Aut ullam,
                  consequuntur sequi, temporibus assumenda aliquam alias iure
                  iusto reprehenderit eos sint ad sunt fugit asperiores
                  provident nesciunt vel? Unde voluptate optio rerum corrupti,
                  doloribus dolor nihil voluptas? Sequi. Repudiandae recusandae
                  explicabo odio beatae! Nulla eius id non ex beatae nemo
                  veritatis delectus in debitis sapiente a tempora eum, sequi
                  laborum inventore quo corrupti rem commodi esse, ad nobis.
                </Typography>
              </ScrollBox>

              {/* 약관 동의 체크박스 */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPersonalInfoAgreed}
                    onChange={handlePersonalInfoAgreeButtonClick}
                    color="primary"
                  />
                }
                label="동의합니다"
                sx={{
                  marginTop: "5px",
                  alignSelf: "flex-end",
                }}
              />
            </Stack>

            {/* 주의사항 확인서 */}
            <Stack>
              {/* 주의사항 확인서 제목 */}
              <Typography
                variant="h6"
                color="primary"
                marginBottom={1}
                fontWeight="bold"
              >
                사전 주의 및 기본예절 확인서
              </Typography>

              {/* 주의사항 확인서 본문 */}
              <ScrollBox>
                <Typography variant="subtitle1">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Blanditiis illum, dolore repellat, in ab reprehenderit
                  sapiente, culpa sequi modi laudantium minima exercitationem
                  magnam ratione consequuntur quos voluptatem dolor alias
                  deserunt. Numquam voluptatum velit enim voluptas quis quae
                  accusantium incidunt illo, quia non suscipit sit fugiat?
                  Quisquam optio aut perferendis! Nulla dolorum aut fuga sint
                  nesciunt? Laborum ab qui suscipit placeat. Esse accusamus
                  obcaecati quam ipsa dignissimos sit neque veniam itaque nulla
                  aspernatur excepturi dolorem cupiditate eligendi, ex
                  reprehenderit, aliquam quos, ipsum sequi inventore? Saepe,
                  impedit odit perspiciatis quaerat inventore qui. Quaerat
                  nesciunt, maiores ut delectus, accusantium dolores neque
                  corporis accusamus odit, esse nisi. Eius maiores maxime, unde
                  quisquam minima ut voluptates fugiat quae omnis? Modi fuga
                  cumque odio facilis sit? Nihil cumque neque enim, aut commodi
                  dolores iusto a aliquid maiores, soluta distinctio impedit
                  ipsam officiis numquam quam odit quisquam cum incidunt
                  architecto sequi repellendus mollitia excepturi. Atque,
                  laborum dolore. Minus officiis ut et cupiditate unde expedita
                  facilis eaque, perferendis a, aliquid doloribus id tempore
                  officia fuga dicta, facere impedit molestias nisi animi velit
                  fugiat. Perferendis esse quia neque excepturi? Aut ullam,
                  consequuntur sequi, temporibus assumenda aliquam alias iure
                  iusto reprehenderit eos sint ad sunt fugit asperiores
                  provident nesciunt vel? Unde voluptate optio rerum corrupti,
                  doloribus dolor nihil voluptas? Sequi. Repudiandae recusandae
                  explicabo odio beatae! Nulla eius id non ex beatae nemo
                  veritatis delectus in debitis sapiente a tempora eum, sequi
                  laborum inventore quo corrupti rem commodi esse, ad nobis.
                </Typography>
              </ScrollBox>

              {/* 약관 동의 체크박스 */}
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isGuidelineAgreed}
                    onChange={handleGuidelineAgreeButtonClick}
                    color="primary"
                  />
                }
                label="동의합니다"
                sx={{
                  marginTop: "5px",
                  alignSelf: "flex-end",
                }}
              />
            </Stack>
          </Stack>

          <Stack gap={1}>
            {/* 회원가입 버튼 */}
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
              FabLab 회원가입
            </Button>

            <Link
              to="/login"
              css={{
                textDecoration: "none",
                color: theme.palette.secondary.main,
              }}
            >
              <Typography variant="subtitle1" color="secondary">
                이미 FabLab 회원이신가요?
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default Register;
