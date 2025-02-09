import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Link as MuiLink,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
  useColorScheme,
} from "@mui/material";
import {
  isPasswordCombinationValid,
  isPasswordLengthValid,
  theme,
} from "../utils";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import axios from "axios";
import axiosInstance, { getCsrfToken } from "../utils/axiosInstance";
import TokenRefresher from "../components/TokenRefresher";
import PasswordValidation from "../components/PasswordValidation";
import SectionHeader from "../components/SectionHeader";

// 스크롤 있는 Stack 요소
interface ScrollBoxProps {
  children: React.ReactNode;
  height: string;
}

const ScrollBox = ({ children, height }: ScrollBoxProps) => {
  const { mode } = useColorScheme();

  return (
    <Box
      height={height}
      padding={2}
      sx={{
        backgroundColor:
          mode === "light"
            ? theme.palette.secondary.light
            : theme.palette.secondary.dark,
        overflowY: "auto",
      }}
    >
      {children}
    </Box>
  );
};

// 리스트 아이템 객체
const korChars = ["가", "나", "다", "라"];

interface OrderedListItemProps {
  text: string;
  index?: number;
}

const OrderedListItem = ({ text, index = -1 }: OrderedListItemProps) => {
  return (
    <Stack direction="row" paddingLeft={2} key={`${text}`} gap={1}>
      <Typography
        variant="subtitle1"
        color="primary"
        fontWeight="bold"
        display={index >= 0 ? "block" : "none"}
      >
        {`${index >= 0 ? korChars[index] : ""})`}
      </Typography>
      <Typography variant="subtitle1">{text}</Typography>
    </Stack>
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
  const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 확인
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false); // 비밀번호 확인 표시 여부
  const [isPersonalInfoAgreed, setIsPersonalInfoAgreed] = useState(false); // 개인정보 동의 여부
  const [isGuidelineAgreed, setIsGuidelineAgreed] = useState(false); // 주의사항 확인 여부

  // 학번 입력
  const handleStudentIdChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setStudentId(e.target.value.replace(" ", ""));
    },
    []
  );

  // 이름 입력
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  // 이메일 입력
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  // 인증번호 입력
  const handleConfirmCodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmCode(e.target.value.replace(" ", ""));
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

  // 비밀번호 확인 입력
  const handlePasswordConfirmChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(e.target.value.replace(" ", ""));
    },
    []
  );

  // 비밀번호 표시/숨김
  const handlePasswordVisibleClick = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  // 비밀번호 확인 표시/숨김
  const handlePasswordConfirmVisibleClick = useCallback(() => {
    setIsPasswordConfirmVisible((prev) => !prev);
  }, []);

  // 인증번호 요청 버튼 클릭
  const [isConfirmCodeSending, setIsConfirmCodeSending] = useState(false);
  const handleConfirmCodeSendButtonClick = useCallback(async () => {
    if (isConfirmCodeChecked) {
      return;
    }

    // 인증번호 요청 API 호출
    try {
      setIsConfirmCodeSending(true);

      // Step 1: CSRF 토큰 가져오기
      const csrfToken = await getCsrfToken();

      // Step 2: 인증번호 요청
      await axiosInstance.post(
        "/users/verify-email",
        {
          email,
          purpose: "verifyAccount", // 계정 복구용 인증번호 요청
          id: studentId,
          name,
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
      alert("인증번호가 이메일로 발송되었습니다.");
    } catch (error) {
      // 요청 실패 시 알림
      if (axios.isAxiosError(error) && error.response) {
        alert(
          "이메일 전송 실패\n" +
            (error.response.data?.message || "알 수 없는 오류")
        );
      } else {
        console.error("요청 오류:", (error as Error).message);
        alert("예기치 않은 오류가 발생했습니다. 다시 시도해 주세요.");
      }
    } finally {
      setIsConfirmCodeSending(false);
    }
  }, [email, isConfirmCodeChecked, name, studentId]);

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
      alert("인증번호 확인이 완료되었습니다.");
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

  // 개인정보 동의 버튼 클릭
  const handlePersonalInfoAgreeButtonClick = useCallback(() => {
    setIsPersonalInfoAgreed((prev) => !prev);
  }, []);

  // 주의사항 확인 버튼 클릭
  const handleGuidelineAgreeButtonClick = useCallback(() => {
    setIsGuidelineAgreed((prev) => !prev);
  }, []);

  // 회원가입 버튼 클릭
  const navigate = useNavigate();
  const handleRegisterButtonClick = useCallback(async () => {
    // 학번이 부적절하다면 종료
    if (!/[0-9]/.test(studentId)) {
      alert("학번의 형식이 올바르지 않습니다.");
      return;
    }

    // 비밀번호가 일치하지 않는다면
    if (password !== passwordConfirm) {
      alert("학번의 형식이 올바르지 않습니다.");
      return;
    }

    // 비밀번호가 부적절하다면 종료
    if (
      !isPasswordLengthValid(password) ||
      !isPasswordCombinationValid(password)
    ) {
      alert("비밀번호가 너무 짧거나 형식이 올바르지 않습니다.");
      return;
    }

    // 이메일 인증을 하지 않았다면 종료
    if (!isConfirmCodeChecked) {
      alert("이메일 인증을 완료해주세요.");
      return;
    }

    // 개인정보 동의 버튼 클릭하지 않았다면 종료
    if (!isPersonalInfoAgreed) {
      alert("개인정보 처리방침에 동의해주세요.");
      return;
    }

    // 주의사항 확인 버튼 클릭하지 않았다면 종료
    if (!isGuidelineAgreed) {
      alert("사전 주의 및 기본 예절 확인서에 동의해주세요.");
      return;
    }

    try {
      // Step 1: CSRF 토큰 가져오기
      const csrfToken = await getCsrfToken();

      // Step 2: 서버로 회원가입 요청 전송
      await axiosInstance.post(
        "/users/register",
        {
          name: name,
          id: studentId,
          password: password,
          email: email,
        },
        {
          headers: {
            "X-CSRF-Token": csrfToken, // CSRF 토큰 추가
          },
        }
      );

      // 사용자에게 성공 메시지 보여주기 (UI 반영)
      alert("회원가입이 성공적으로 완료되었습니다.");
      navigate("/login"); // 회원가입 성공 시 로그인 페이지로 이동
    } catch (error) {
      // 서버로부터 반환된 에러 메시지 확인
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "서버가 오류를 반환했습니다:",
          error.response.data.message
        );
        alert(
          `회원가입 중 오류가 발생했습니다.\n${error.response.data.message}`
        );
      } else {
        if (error instanceof Error) {
          console.error("요청을 보내는 중 오류가 발생했습니다:", error.message);
        } else {
          console.error("요청을 보내는 중 알 수 없는 오류가 발생했습니다.");
        }
        alert("예기치 않은 오류가 발생했습니다. 나중에 다시 시도해 주세요.");
      }
    }
  }, [
    email,
    isConfirmCodeChecked,
    isGuidelineAgreed,
    isPersonalInfoAgreed,
    name,
    navigate,
    password,
    passwordConfirm,
    studentId,
  ]);

  const { mode } = useColorScheme();

  return (
    <TokenRefresher>
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
            회원가입
          </Typography>

          {/* 학번 입력란 */}
          <TextField
            placeholder="학번"
            value={studentId}
            onChange={handleStudentIdChange}
            fullWidth
          />

          {/* 이름 입력란 */}
          <TextField
            placeholder="이름"
            value={name}
            onChange={handleNameChange}
            fullWidth
          />

          {/* 이메일 */}
          <Stack direction="row" gap={1}>
            {/* 이메일 입력란 */}
            <TextField
              placeholder="이메일"
              type="email"
              value={email}
              onChange={handleEmailChange}
              sx={{
                flex: "1",
              }}
            />

            {/* 인증 요청 버튼 */}
            <Button
              variant="outlined"
              onClick={handleConfirmCodeSendButtonClick}
              loading={isConfirmCodeSending}
              loadingPosition="start"
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
              onChange={handleConfirmCodeChange}
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
              disabled={isConfirmCodeChecked}
            >
              {isConfirmCodeChecked ? "인증 완료" : "인증 확인"}
            </Button>
          </Stack>

          <Stack gap={1}>
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

            {/* 비밀번호 필요 조건 */}
            <PasswordValidation password={password} />
          </Stack>

          {/* 비밀번호 재입력 입력란 */}
          <OutlinedInput
            type={isPasswordConfirmVisible ? "text" : "password"}
            placeholder="비밀번호 재입력"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
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
                variant="h3"
                color="primary"
                marginBottom={1}
                fontWeight="bold"
              >
                개인정보 처리방침
              </Typography>

              {/* 개인정보 동의서 본문 */}
              <Stack
                gap={2}
                padding={2}
                sx={{
                  backgroundColor:
                    mode === "light"
                      ? theme.palette.secondary.light
                      : theme.palette.secondary.dark,
                }}
              >
                <Typography variant="subtitle1">
                  목원대학교는 「개인정보 보호법」 및 관계 법령이 정한 바를
                  준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고
                  있습니다.
                </Typography>
                <Stack direction="row">
                  <MuiLink
                    href="https://www.mokwon.ac.kr/kr/html/sub09/090501.html"
                    target="_blank"
                    underline="hover"
                  >
                    <Typography variant="h3" color="primary">
                      전문 보기
                    </Typography>
                  </MuiLink>
                </Stack>
              </Stack>

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
                variant="h3"
                color="primary"
                marginBottom={1}
                fontWeight="bold"
              >
                사전 주의 및 기본예절 확인서
              </Typography>

              {/* 주의사항 확인서 본문 */}
              <ScrollBox height="600px">
                <Stack gap={5}>
                  {/* 운영 시간 및 출입 관리 */}
                  <Stack gap={1}>
                    <SectionHeader title="운영 시간 및 출입 관리" underline />
                    <Box marginBottom="5px" />
                    {[
                      "운영 시간: 월~금(공휴일 제외), 09:00 ~ 22:00",
                      "입실시 반드시 출입관리 장치(지문)를 사용하여 출입합니다.",
                      "입실 기록이 누락되거나 무단 출입이 3회 이상 확인될 경우, 사용 권한이 취소됩니다.",
                      "시험기간 및 졸업과제, 경진대회 출품 등의 사유로 운영 시간 연장이 필요할 시에는 컴퓨터공학과 과사무실로 신청하시기 바랍니다.",
                    ].map((text, index) => (
                      <OrderedListItem text={text} index={index} />
                    ))}
                  </Stack>

                  {/* 공용 공간 매너 */}
                  <Stack gap={1}>
                    <SectionHeader title="공용 공간 매너" underline />
                    <Box marginBottom="5px" />
                    {[
                      "조용한 환경 유지: 큰 소리로 대화하거나 소음을 발생시키는 행동은 삼가세요.",
                      "공용 물품 관리: 컴퓨터, 책상, 교탁 등 공용 물품은 신중히 다루며, 손상시 서포터즈에게 즉시 보고합니다.",
                      "음식물 취식: 음료 및 초콜릿, 사탕 등의 간식은 취식 가능하나, 식사류 및 주류 반입은 불가합니다. 취식 후 쓰레기 처리 및 뒷정리를 깔끔하게 해주시기 바랍니다.",
                    ].map((text, index) => (
                      <OrderedListItem text={text} index={index} />
                    ))}
                  </Stack>

                  {/* 좌석 및 시설 사용 */}
                  <Stack gap={1}>
                    <SectionHeader title="좌석 및 시설 사용" underline />
                    <Box marginBottom="5px" />
                    {[
                      "장기 점유 금지: 자리를 비우고 1시간 이상 미이용 시 서포터즈가 해당 좌석의 예약을 취소할 수 있습니다.",
                    ].map((text, index) => (
                      <OrderedListItem text={text} index={index} />
                    ))}
                  </Stack>

                  {/* 정리 및 청소 */}
                  <Stack gap={1}>
                    <SectionHeader title="정리 및 청소" underline />
                    <Box marginBottom="5px" />
                    {[
                      "사용한 기기 및 자리를 깨끗이 정리하고, 개인 쓰레기는 팹랩 외부 쓰레기통 및 지정된 장소에 버립니다.",
                      "다음 사용자를 위해 공간을 청결히 유지합니다.",
                    ].map((text, index) => (
                      <OrderedListItem text={text} index={index} />
                    ))}
                  </Stack>

                  {/* 수업 및 특강 우선 사용 */}
                  <Stack gap={1}>
                    <SectionHeader title="수업 및 특강 우선 사용" underline />
                    <Box marginBottom="5px" />
                    {[
                      "학기별 수업(예: 캡스톤디자인2) 및 학과 행사 일정이 우선 적용됩니다.",
                      "1인석(A좌석)의 경우 팹랩 서포터즈에 우선 배정 예정이며, 미배정 좌석의 경우 자유롭게 사용 가능합니다.",
                    ].map((text, index) => (
                      <OrderedListItem text={text} index={index} />
                    ))}
                  </Stack>

                  {/* 팹랩 내 기기 및 기구의 이용 */}
                  <Stack gap={1}>
                    <SectionHeader
                      title="팹랩 내 기기 및 기구의 이용"
                      underline
                    />
                    <Box marginBottom="5px" />
                    {[
                      "팹랩 실습도구장에 비치되어 있는 노트북 및 실습용 로봇, 아이맥을 포함한 어떤 기기 및 기구도 팹랩 외부 반출 사용을 금합니다.",
                      "팹랩 내 기기 및 기구의 사용은 팹랩 서포터즈 또는 학과 사무실로 문의하시기 바랍니다.",
                    ].map((text, index) => (
                      <OrderedListItem text={text} index={index} />
                    ))}
                  </Stack>

                  {/* 위반 시 조치 */}
                  <Stack gap={1}>
                    <SectionHeader title="위반 시 조치" underline />
                    <Box marginBottom="5px" />
                    {[
                      "위의 내용을 반복적으로 위반하거나, 공용 물품을 고의로 훼손하는 경우 팹랩 사용 권한이 제한될 수 있습니다.",
                      "팹랩 서포터즈는 좌석 및 시설 관리 권한을 가지며, 사용자 간 문제 발생 시 중재할 수 있습니다.",
                    ].map((text, index) => (
                      <OrderedListItem text={text} index={index} />
                    ))}
                  </Stack>

                  {/* 팹랩 이용을 위한 다짐 */}
                  <Stack gap={1}>
                    <SectionHeader title="팹랩 이용을 위한 다짐" underline />
                    <Box marginBottom="5px" />
                    {[
                      "모든 사용자는 본 확인서 내용을 숙지하고 준수함으로써 팹랩의 쾌적한 운영에 협조하겠습니다.",
                    ].map((text, index) => (
                      <OrderedListItem text={text} index={index} />
                    ))}
                  </Stack>
                </Stack>
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
              onClick={handleRegisterButtonClick}
              fullWidth
              sx={{
                fontSize: "1.5em",
                fontWeight: "bold",
                textTransform: "none",
              }}
              disabled={
                !studentId ||
                !name ||
                !email ||
                !isConfirmCodeChecked ||
                !password ||
                password !== passwordConfirm ||
                !isPersonalInfoAgreed ||
                !isGuidelineAgreed
              }
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
              <Typography variant="subtitle1" color="primary">
                로그인으로 돌아가기
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </TokenRefresher>
  );
};

export default Register;
