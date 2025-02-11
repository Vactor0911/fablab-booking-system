import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import TokenRefresher from "./TokenRefresher";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CircleIcon from "@mui/icons-material/Circle";
import { useCallback, useState } from "react";

interface WithdrawDialogProps {
  open: boolean;
  onClose: () => void;
}

const WithdrawDialog = (props: WithdrawDialogProps) => {
  const { open, onClose } = props;

  // 주의사항 확인
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleConfirmChange = useCallback(() => {
    setIsConfirmed(!isConfirmed);
  }, [isConfirmed]);

  // 회원탈퇴 버튼 클릭
  const handleWithdrawButtonClick = useCallback(async () => {
    console.log("회원탈퇴 버튼 클릭");
  }, []);

  return (
    <TokenRefresher>
      <Dialog open={open} onClose={onClose}>
        {/* 대화상자 제목 */}
        <DialogTitle
          variant="h2"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          회원탈퇴
          {/* 닫기 버튼 */}
          <IconButton aria-label="close" onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>

        {/* 구분선 */}
        <Divider variant="middle" />

        {/* 내용 */}
        <DialogContent>
          <Stack gap={2}>
            {/* 안내 문구 */}
            <Typography variant="h4" color="primary">
              탈퇴를 진행하기 전 아래 정보를 꼭 확인해주세요.
            </Typography>

            {/* 주의사항 */}
            <List>
              {[
                `회원에서 탈퇴하시면 현재 사용 중이신 계정을 더 이상 사용할
                    수 없습니다. 또한 현재 사용 중이신 계정으로 로그인 되어 있던
                    모든 기기에서 자동으로 로그아웃 됩니다.`,
                `한 번 삭제된 계정은 복구가 불가능하며 해당 계정의 정보 및 사용 이력을 더 이상 조회할 수 없게 됩니다.`,
                `계정을 삭제한 사용자이어도 언제든 다시 FabLab 예약 시스템에 회원 가입을 할 수 있습니다.`,
              ].map((text, index) => (
                <ListItem
                  key={`withdraw-info-${index}`}
                  sx={{
                    padding: "8px",
                  }}
                >
                  <Stack direction="row">
                    <CircleIcon
                      color="primary"
                      sx={{
                        fontSize: "0.75em",
                        marginTop: "0.375em",
                        marginRight: "10px",
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      color="secondary"
                      sx={{
                        wordBreak: "keep-all",
                      }}
                    >
                      {text}
                    </Typography>
                  </Stack>
                </ListItem>
              ))}
            </List>

            {/* 주의사항 확인 체크박스 */}
            <Box alignSelf="flex-end">
              <FormControlLabel
                control={
                  <Checkbox
                    value={isConfirmed}
                    onChange={handleConfirmChange}
                  />
                }
                label="위 내용을 모두 확인했습니다."
              />
            </Box>

            {/* 회원탈퇴 버튼 */}
            <Button
              variant="contained"
              fullWidth
              disabled={!isConfirmed}
              onClick={handleWithdrawButtonClick}
            >
              <Typography variant="h2">회원탈퇴</Typography>
            </Button>
          </Stack>
        </DialogContent>
      </Dialog>
    </TokenRefresher>
  );
};

export default WithdrawDialog;
