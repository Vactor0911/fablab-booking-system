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
} from "@mui/material";
import { theme } from "../utils";
import { useCallback, useState } from "react";
import { useAtomValue } from "jotai";
import { loginStateAtom } from "../states";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";

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
}

const DialogTextField = ({
  value,
  disabled = false,
  onChange,
  placeholder,
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
    />
  );
};

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
}

const UserDialog = (props: UserDialogProps) => {
  const { open, onClose } = props;

  // 이메일
  const [email, setEmail] = useState("test@mokwon.ac.kr");

  // 권한
  const [permission, setPermission] = useState("사용자");
  const handlePermissionChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      return setPermission(event.target.value as string);
    },
    []
  );
  const loginState = useAtomValue(loginStateAtom);

  // 비밀번호
  const [password, setPassword] = useState("");

  // 수정하기 버튼 클릭
  const handleEditButtonClick = useCallback(() => {
    onClose();
  }, [onClose]);

  return (
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
                <DialogTextField value="2051000" disabled />
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
                <DialogTextField value="홍길동" disabled />
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
                  onChange={(e) => setEmail(e.target.value)}
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
                  }}
                >
                  <RadioGroup row>
                    <FormControlLabel
                      value="활성화"
                      control={
                        <Radio
                          sx={{
                            padding: "4px",
                          }}
                        />
                      }
                      label="활성화"
                    />
                    <FormControlLabel
                      value="비활성화"
                      control={
                        <Radio
                          sx={{
                            padding: "4px",
                          }}
                        />
                      }
                      label="비활성화"
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="새 비밀번호"
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
                        display: password.length >= 8 ? "block" : "none",
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
                          /[a-zA-Z]/.test(password) &&
                          /[0-9]/.test(password) &&
                          /[~!@#$%?]/.test(password)
                            ? "block"
                            : "none",
                      }}
                    />
                  </Stack>
                </Stack>
              </UserDialogContent>
            </Grid2>
          </Grid2>

          {/* 수정하기 버튼 */}
          <Button variant="contained" color="primary" onClick={handleEditButtonClick}>
            <Typography variant="h2">수정하기</Typography>
          </Button>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default UserDialog;
