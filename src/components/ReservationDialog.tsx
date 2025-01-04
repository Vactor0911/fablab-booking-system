import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  ThemeProvider,
} from "@mui/material";
import Logo from "../assets/logo.png";
import SampleImage from "../assets/SampleImage.png";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { color } from "../utils/theme";
import { theme } from "../utils";

interface ReservationDialogProps {
  open: boolean;
  onClose: () => void;
}

const ReservationDialog = (props: ReservationDialogProps) => {
  const open = props.open;
  const onClose = props.onClose;
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={onClose}
        sx={{
          padding: "20px",
        }}
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            css={{
              height: "40px",
            }}
          />
          <IconButton aria-label="close" onClick={onClose}>
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <Divider variant="middle" />
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          <h1>A1 좌석</h1>
          <div
            className="info-container"
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap-reverse",
              gap: "20px",
            }}
          >
            <Stack direction="row" spacing={2}>
              <Stack direction="column" spacing={2} sx={{
                "& span": {
                  color: color.primary,
                  fontWeight: "bold",
                }
              }}>
                <span>예약좌석</span>
                <span>예약날짜</span>
                <span>예약시간</span>
                <span>PC 지원</span>
              </Stack>
              <Stack direction="column" spacing={2}>
                <span>A1</span>
                <span>2025.01.05</span>
                <span>08:00~22:00</span>
                <span>Windows10</span>
              </Stack>
            </Stack>
            <div
              css={{
                borderRadius: "10px",
                boxShadow: "3px 3px 3px rgba(0,0,0,0.4)",
                overflow: "hidden",
              }}
            >
              <img
                src={SampleImage}
                alt="A1 좌석"
                css={{
                  height: "100px",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
          <div
            className="rules-container"
            css={{
              backgroundColor: "#f4f4f4",
            }}
          >
            <ol
              css={{
                padding: "10px",
                paddingLeft: "30px",
                "& li::marker": {
                  fontWeight: "bold",
                },
                "& li span": {
                  color: color.primary,
                  fontWeight: "bold",
                },
              }}
            >
              <li>
                좌석 사용시 <span>자리 정돈</span> 기본 매너
              </li>
              <li>
                다른 사람에게 <span>피해 주지 않기</span>
              </li>
              <li>
                사용자끼리 <span>존중</span> 해주기
              </li>
              <li>
                음식물 <span>취식 불가</span>
              </li>
            </ol>
          </div>
          <Button variant="contained">동의 후 예약</Button>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
};

export default ReservationDialog;
