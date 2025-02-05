import { Stack, Tooltip, Typography } from "@mui/material";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import HelpCenterRoundedIcon from "@mui/icons-material/HelpCenterRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { isPasswordCombinationValid, isPasswordLengthValid } from "../utils";

interface PasswordValidationProps {
  password: string;
}

const PasswordValidation = ({ password }: PasswordValidationProps) => {
  return (
    <Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <CircleRoundedIcon color="primary" sx={{ fontSize: "0.8em" }} />
        <Typography variant="subtitle1">8글자 이상</Typography>
        <CheckRoundedIcon
          color="success"
          sx={{
            display: isPasswordLengthValid(password) ? "block" : "none",
          }}
        />
      </Stack>
      <Stack direction="row" alignItems="center" gap={1}>
        <CircleRoundedIcon color="primary" sx={{ fontSize: "0.8em" }} />{" "}
        <Typography variant="subtitle1">영문, 숫자, 특수문자 포함</Typography>
        <CheckRoundedIcon
          color="success"
          sx={{
            display: isPasswordCombinationValid(password) ? "block" : "none",
          }}
        />
        <Tooltip
          title={
            <Stack gap={2} padding={1} alignItems="center">
              <Typography variant="subtitle2">사용 가능한 특수문자</Typography>
              <Typography variant="subtitle2">! @ # $ % ^ & * ?</Typography>
            </Stack>
          }
          arrow
        >
          <HelpCenterRoundedIcon color="primary" />
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default PasswordValidation;
