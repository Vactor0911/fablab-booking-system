import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  Grid2,
  IconButton,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  useColorScheme,
} from "@mui/material";
import {
  isEmailValid,
  isNameValid,
  isPasswordCombinationValid,
  isPasswordLengthValid,
  theme,
} from "../utils";
import { useCallback, useEffect, useState } from "react";
import { useAtomValue } from "jotai";
import { loginStateAtom, Permission } from "../states";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import { User } from "../pages/Users";
import axiosInstance from "../utils/axiosInstance";
import TokenRefresher from "./TokenRefresher";
import PasswordValidation from "./PasswordValidation";

interface UserDialogContentProps {
  title: string;
  children: React.ReactNode;
}

const UserDialogContent = (props: UserDialogContentProps) => {
  const { title, children } = props;

  return (
    <Stack gap={2}>
      <Box>
        <Typography
          variant="h3"
          padding="5px"
          sx={{
            display: "inline-block",
            position: "relative",
            "&:after": {
              content: "''",
              position: "absolute",
              width: "100%",
              height: "2px",
              bottom: "-2px",
              left: "0",
              backgroundColor: theme.palette.primary.main,
            },
          }}
        >
          {title}
        </Typography>
      </Box>
      {children}
    </Stack>
  );
};

interface DialogTextFieldProps {
  value: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}

const DialogTextField = ({
  value,
  disabled = false,
  onChange,
  placeholder,
  ...props
}: DialogTextFieldProps) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      size="small"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      {...props}
    />
  );
};

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const UserDialog = (props: UserDialogProps) => {
  const { open, onClose, user } = props;

  // 이름
  const [name, setName] = useState("");
  const handleNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
    },
    []
  );

  // 이메일
  const [email, setEmail] = useState("");
  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  // 권한
  const [permission, setPermission] = useState("사용자");
  const handlePermissionChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      return setPermission(event.target.value as string);
    },
    []
  );
  const loginState = useAtomValue(loginStateAtom);

  // 상태
  const [state, setState] = useState("활성");
  const handleStateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
    },
    []
  );

  // 비밀번호
  const [password, setPassword] = useState("");
  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value.replace(" ", ""));
    },
    []
  );

  // 사용자 정보 불러오기
  const [studentId, setStudentId] = useState("");

  // 수정 불가 여부
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setStudentId(user?.studentId || "");
    setName(user?.name || "");
    setEmail(user?.email || "");
    setState(user?.state || "활성");
    setPermission(user?.permission || "사용자");

    setIsDisabled(
      loginState.permission === Permission.ADMIN &&
        user?.permission !== "사용자"
    );
  }, [loginState.permission, user]);

  // 수정하기 버튼 클릭
  const handleEditButtonClick = useCallback(async () => {
    try {
      const csrfTokenResponse = await axiosInstance.get("/csrf-token");
      const csrfToken = csrfTokenResponse.data.csrfToken;

      // 사용자 정보가 부적합하면 종료
      if (!user) {
        return;
      }

      // 수정 권한이 없을 경우 종료
      if (isDisabled) {
        alert("해당 사용자의 정보를 수정할 권한이 없습니다.");
        return;
      }

      // 비밀번호가 조건에 맞지 않을 경우 종료
      if (password) {
        if (
          !isPasswordLengthValid(password) ||
          !isPasswordCombinationValid(password)
        ) {
          alert("비밀번호가 너무 짧거나 형식이 올바르지 않습니다.");
          return;
        }
      }

      // 권한
      let fixedPermission = null;
      if (loginState.permission === Permission.SUPER_ADMIN) {
        switch (permission) {
          case "관리자":
            fixedPermission = "admin";
            break;
          case "최고 관리자":
            fixedPermission = "superadmin";
            break;
          default:
            fixedPermission = "user";
            break;
        }
      }

      // 값 추출
      const params = {
        name: name,
        email: email,
        permission: fixedPermission,
        state: state === "활성" ? "active" : "inactive",
        newPassword: password,
      };

      await axiosInstance.patch(`/admin/users/${user.id}`, params, {
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      });

      alert("사용자 정보가 수정되었습니다.");
    } catch (error) {
      console.error("사용자 정보 수정 중 오류가 발생하였습니다:", error);
      alert("사용자 정보 수정 중 오류가 발생하였습니다.");
    } finally {
      onClose();
    }
  }, [
    email,
    isDisabled,
    loginState.permission,
    name,
    onClose,
    password,
    permission,
    state,
    user,
  ]);

  const { mode } = useColorScheme();

  return (
    <TokenRefresher>
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={onClose}
          sx={{
            padding: "20px",
            "& .MuiDialog-paper": {
              margin: "0",
              width: "100%",
            },
          }}
          fullWidth
        >
          <DialogTitle
            variant="h2"
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* 대화상자 제목 */}
            FabLab
            {/* 닫기 버튼 */}
            <IconButton aria-label="close" onClick={onClose}>
              <CloseRoundedIcon />
            </IconButton>
          </DialogTitle>

          {/* 구분선 */}
          <Divider variant="middle" />

          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* 대화상자명 */}
            <Stack direction="row" gap={1}>
              <SettingsRoundedIcon />
              <Typography variant="h3">관리</Typography>
            </Stack>

            <Grid2 container spacing={2}>
              {/* 학번 */}
              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <UserDialogContent title="학번">
                  <DialogTextField value={studentId} disabled />
                </UserDialogContent>
              </Grid2>

              {/* 이름 */}
              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <UserDialogContent title="이름">
                  <DialogTextField
                    value={name}
                    onChange={handleNameChange}
                    disabled={isDisabled}
                    error={!!name && !isNameValid(name)}
                    helperText={!!name && !isNameValid(name) ? "이름이 올바르지 않습니다." : ""}
                  />
                </UserDialogContent>
              </Grid2>

              {/* 이메일 */}
              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <UserDialogContent title="이메일">
                  <DialogTextField
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isDisabled}
                    error={!!email && !isEmailValid(email)}
                    helperText={!!email && !isEmailValid(email) ? "이메일이 올바르지 않습니다." : ""}
                  />
                </UserDialogContent>
              </Grid2>

              {/* 권한 */}
              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <UserDialogContent title="권한">
                  <Select
                    value={permission}
                    onChange={handlePermissionChange}
                    size="small"
                    disabled={loginState.permission !== "superadmin"}
                  >
                    <MenuItem value={"사용자"}>
                      <Typography variant="subtitle1">사용자</Typography>
                    </MenuItem>
                    <MenuItem value={"관리자"}>
                      <Typography variant="subtitle1">관리자</Typography>
                    </MenuItem>
                    <MenuItem value={"최고 관리자"}>
                      <Typography variant="subtitle1">최고 관리자</Typography>
                    </MenuItem>
                  </Select>
                </UserDialogContent>
              </Grid2>

              {/* 계정 상태 */}
              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <UserDialogContent title="상태">
                  <Paper
                    elevation={0}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      padding: "3px 14px",
                      border: "1px solid rgba(0, 0, 0, 0.23)",
                      borderColor:
                        mode === "light"
                          ? "rgba(0, 0, 0, 0.23)"
                          : "rgba(255, 255, 255, 0.23)",
                      backgroundColor: "inherit",
                    }}
                  >
                    <RadioGroup row value={state} onChange={handleStateChange}>
                      <FormControlLabel
                        value="활성"
                        control={
                          <Radio
                            sx={{
                              padding: "4px",
                            }}
                          />
                        }
                        label="활성"
                        disabled={isDisabled}
                      />
                      <FormControlLabel
                        value="비활성"
                        control={
                          <Radio
                            sx={{
                              padding: "4px",
                            }}
                          />
                        }
                        label="비활성"
                        disabled={isDisabled}
                      />
                    </RadioGroup>
                  </Paper>
                </UserDialogContent>
              </Grid2>

              {/* 비밀번호 */}
              <Grid2
                size={{
                  xs: 12,
                  sm: 6,
                }}
              >
                <UserDialogContent title="비밀번호">
                  <DialogTextField
                    value={password}
                    onChange={handlePasswordChange}
                    placeholder="새 비밀번호"
                    disabled={isDisabled}
                  />

                  {/* 비밀번호 필요 조건 */}
                  <PasswordValidation password={password} />
                </UserDialogContent>
              </Grid2>
            </Grid2>

            {/* 수정하기 버튼 */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditButtonClick}
              disabled={isDisabled}
            >
              <Typography variant="h2">수정하기</Typography>
            </Button>
          </DialogContent>
        </Dialog>
      </ThemeProvider>
    </TokenRefresher>
  );
};

export default UserDialog;
