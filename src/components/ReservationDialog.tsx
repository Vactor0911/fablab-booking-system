import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import SampleImage from "../assets/SampleImage.png";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { theme } from "../utils";

interface ReservationDialogProps {
  seatName: string;
  open: boolean;
  onClose: () => void;
}

const ReservationDialog = (props: ReservationDialogProps) => {
  const { seatName, open, onClose } = props;
  const ettiqutte = `1. 좌석 사용시 자리 정돈 기본매너\n2. 다른 사람에게 피해 주지 않기\n3. 사용자끼리 존중 해주기\n4. 음식 취식 불가`;
  const caution = `칸막이가 따로 없는 좌석입니다.`;

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
          {/* 좌석명 */}
          <Typography variant="h2">{seatName} 좌석</Typography>

          {/* 좌석 정보 */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap-reverse"
            gap={2}
          >
            <Stack direction="row" spacing={2}>
              {/* 컬럼명 */}
              <Stack gap={0.5}>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  fontWeight="bold"
                >
                  예약좌석
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  fontWeight="bold"
                >
                  예약날짜
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  fontWeight="bold"
                >
                  예약시간
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="primary"
                  fontWeight="bold"
                >
                  PC 지원
                </Typography>
              </Stack>

              {/* 값 */}
              <Stack spacing={0.5}>
                <Typography variant="subtitle1">A1</Typography>
                <Typography variant="subtitle1">2025.01.05</Typography>
                <Typography variant="subtitle1">08:00 ~ 22:00</Typography>
                <Typography variant="subtitle1">Windows 11</Typography>
              </Stack>
            </Stack>

            {/* 좌석 사진 */}
            <Box
              component="img"
              alt="좌석 사진"
              src={SampleImage}
              width="130px"
              border="1px solid #727272"
              borderRadius="10px"
              boxShadow="3px 3px 3px rgba(0,0,0,0.4)"
            />
          </Stack>

          {/* 기본 예절 */}
          <Stack padding="5px 15px" sx={{ backgroundColor: "#f4f4f6" }}>
            <TextField
              multiline
              defaultValue={ettiqutte}
              variant="standard"
              disabled
              sx={{
                "& .MuiInput-input": {
                  WebkitTextFillColor: "black !important",
                },
                "& .MuiInputBase-root:before": {
                  content: "none",
                },
              }}
            />
          </Stack>

          {/* 주의사항 */}
          <Stack>
            {/* 주의사항 제목 */}
            <Typography variant="subtitle1" color="primary" fontWeight="bold">
              * 주의사항 *
            </Typography>

            {/* 내용 */}
            <Stack padding="5px 15px" sx={{ backgroundColor: "#f4f4f6" }}>
              <TextField
                multiline
                defaultValue={caution}
                variant="standard"
                disabled
                sx={{
                  "& .MuiInput-input": {
                    WebkitTextFillColor: "black !important",
                  },
                  "& .MuiInputBase-root:before": {
                    content: "none",
                  },
                }}
              />
            </Stack>
          </Stack>

          {/* 예약 버튼 */}
          <Button
            variant="contained"
            sx={{ fontSize: "1.5em", fontWeight: "bold" }}
          >
            동의 후 예약
          </Button>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default ReservationDialog;
