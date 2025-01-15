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
import { theme } from "../utils";
import { useCallback, useState } from "react";
import { Link } from "react-router";

import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import { color } from "../utils/theme";

const LinkCss = {
  textDecoration: "none",
  color: "#6e6e6e",
};

const Register = () => {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isPasswordConfirmVisible, setIsPasswordConfirmVisible] =
    useState(false);
  const [email, setEmail] = useState("");
  const [isPrivacyConsentAgreed, setIsPrivacyConsentAgreed] = useState(false);
  const [isEtiquetteConfirmationAgreed, setIsEtiquetteConfirmationAgreed] =
    useState(false);

  // 비밀번호 표시/숨김
  const handlePasswordVisibleClick = useCallback(() => {
    setIsPasswordVisible((prev) => !prev);
  }, []);

  // 비밀번호 재입력력 표시/숨김
  const handlePasswordConfirmVisibleClick = useCallback(() => {
    setIsPasswordConfirmVisible((prev) => !prev);
  }, []);

  // 개인정보 동의서 동의/거부
  const handlePrivacyConsentAgreedChange = useCallback(() => {
    setIsPrivacyConsentAgreed((prev) => !prev);
  }, []);

  // 사전 주의 및 기본 예절 확인서서 동의/거부
  const handleEtiqutteConfirmationAgreedChange = useCallback(() => {
    setIsEtiquetteConfirmationAgreed((prev) => !prev);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div
        css={{
          minHeight: "100%",
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
          <h1 css={{ textAlign: "center", marginBottom: "20px" }}>회원가입</h1>

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
          </div>

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
                  {isPasswordVisible ? (
                    <VisibilityRoundedIcon />
                  ) : (
                    <VisibilityOffRoundedIcon />
                  )}
                </IconButton>
              </InputAdornment>
            }
          />

          {/* 이메일 입력란 */}
          <TextField
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />

          {/* 개인정보 동의서 */}
          <div
            className="privacy-consent-container"
            css={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              p: {
                maxHeight: "200px",
                padding: "10px 20px",
                backgroundColor: "#f4f4f4",
                borderRadius: "10px",
                overflowY: "auto",
                lineHeight: "1.5em",
              },
            }}
          >
            <h3
              css={{
                color: color.primary,
                marginBottom: "10px",
              }}
            >
              개인정보 동의서
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium, alias maxime odit asperiores obcaecati ea, inventore
              modi magni excepturi sunt architecto doloribus totam culpa. Libero
              vitae sed quasi pariatur id. Eos quam commodi aut? Perspiciatis
              assumenda eaque voluptate reiciendis distinctio quo pariatur
              cumque. Quod molestias neque, laborum amet quasi rem veritatis
              tenetur? Ut sed quidem natus nobis placeat minima dicta! Voluptate
              praesentium excepturi nostrum dolorum fugit odit obcaecati quidem
              maxime, assumenda, facilis quia eum, ad enim ipsam. Esse atque
              sint officiis rem pariatur fuga, nulla itaque, fugiat maxime
              provident architecto! Explicabo aliquid omnis, corporis iste
              fugiat animi magnam architecto soluta tenetur culpa. Rerum iste
              quaerat ullam necessitatibus, soluta officia facilis asperiores.
              Beatae dolores quisquam, dolore eius rem quibusdam maxime. Error?
              Modi adipisci consequatur natus quod soluta, voluptates voluptatum
              beatae odit tempora fugiat asperiores necessitatibus blanditiis
              neque dolores sunt nostrum ut quia incidunt sequi, molestiae
              facilis. Odit corporis doloremque natus quaerat. Sint vero, modi
              quidem, optio placeat at beatae fugiat eaque hic eos corporis
              ducimus! Praesentium corporis fuga blanditiis. Molestiae fugiat
              est incidunt aliquid ut eos nulla dolorum exercitationem vitae
              temporibus. Velit iure facilis itaque dolor, unde doloribus rem
              obcaecati ex fuga consequatur facere quas officiis quibusdam
              magnam nostrum eos in incidunt ullam provident. Ipsum qui,
              veritatis incidunt eius quos officia! Voluptates alias labore
              quasi quod magnam libero, consectetur omnis laborum quia
              voluptatem temporibus voluptas? Adipisci provident necessitatibus
              explicabo sequi error in unde deleniti. Fugiat ipsam vitae
              temporibus doloribus assumenda debitis?
            </p>
            <div className="checkbox-wrapper" css={{
                alignSelf: "flex-end",
            }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isPrivacyConsentAgreed}
                    onChange={handlePrivacyConsentAgreedChange}
                    color="primary"
                  />
                }
                label="동의합니다."
              />
            </div>
          </div>

          {/* 사전 주의 및 기본 예절 확인서 */}
          <div
            className="etiquette-confirmation-container"
            css={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              p: {
                maxHeight: "200px",
                padding: "10px 20px",
                backgroundColor: "#f4f4f4",
                borderRadius: "10px",
                overflowY: "auto",
                lineHeight: "1.5em",
              },
            }}
          >
            <h3
              css={{
                color: color.primary,
                marginBottom: "10px",
              }}
            >
              사전 주의 및 기본 예절 확인서
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium, alias maxime odit asperiores obcaecati ea, inventore
              modi magni excepturi sunt architecto doloribus totam culpa. Libero
              vitae sed quasi pariatur id. Eos quam commodi aut? Perspiciatis
              assumenda eaque voluptate reiciendis distinctio quo pariatur
              cumque. Quod molestias neque, laborum amet quasi rem veritatis
              tenetur? Ut sed quidem natus nobis placeat minima dicta! Voluptate
              praesentium excepturi nostrum dolorum fugit odit obcaecati quidem
              maxime, assumenda, facilis quia eum, ad enim ipsam. Esse atque
              sint officiis rem pariatur fuga, nulla itaque, fugiat maxime
              provident architecto! Explicabo aliquid omnis, corporis iste
              fugiat animi magnam architecto soluta tenetur culpa. Rerum iste
              quaerat ullam necessitatibus, soluta officia facilis asperiores.
              Beatae dolores quisquam, dolore eius rem quibusdam maxime. Error?
              Modi adipisci consequatur natus quod soluta, voluptates voluptatum
              beatae odit tempora fugiat asperiores necessitatibus blanditiis
              neque dolores sunt nostrum ut quia incidunt sequi, molestiae
              facilis. Odit corporis doloremque natus quaerat. Sint vero, modi
              quidem, optio placeat at beatae fugiat eaque hic eos corporis
              ducimus! Praesentium corporis fuga blanditiis. Molestiae fugiat
              est incidunt aliquid ut eos nulla dolorum exercitationem vitae
              temporibus. Velit iure facilis itaque dolor, unde doloribus rem
              obcaecati ex fuga consequatur facere quas officiis quibusdam
              magnam nostrum eos in incidunt ullam provident. Ipsum qui,
              veritatis incidunt eius quos officia! Voluptates alias labore
              quasi quod magnam libero, consectetur omnis laborum quia
              voluptatem temporibus voluptas? Adipisci provident necessitatibus
              explicabo sequi error in unde deleniti. Fugiat ipsam vitae
              temporibus doloribus assumenda debitis?
            </p>
            <div
              className="checkbox-wrapper"
              css={{
                alignSelf: "flex-end",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isEtiquetteConfirmationAgreed}
                    onChange={handleEtiqutteConfirmationAgreedChange}
                    color="primary"
                  />
                }
                label="동의합니다."
              />
            </div>
          </div>

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

          {/* 페이지 링크 */}
          <div
            className="link-container"
            css={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Link to="/login" css={LinkCss}>
              로그인
            </Link>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Register;
