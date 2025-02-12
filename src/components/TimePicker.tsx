import {
  Button,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { theme } from "../utils";
import dayjs from "dayjs";

// 시간 입력 필드
interface TimeTextFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const TimeTextField = (props: TimeTextFieldProps) => {
  const { value, onChange } = props;

  return (
    <TextField
      slotProps={{
        htmlInput: {
          inputMode: "numeric",
          sx: {
            width: "2em",
            padding: "0",
            fontSize: "3em",
            textAlign: "center",
            backgroundColor: "#f4f4f4",
            "&:focus": {
              color: theme.palette.primary.main,
              backgroundColor: "#f0dce3",
            },
          },
        },
      }}
      value={value}
      onChange={onChange}
    />
  );
};

// 시간 선택기
interface TimePickerProps {
  label?: string;
  value?: dayjs.Dayjs | null;
  setValue?: (value: dayjs.Dayjs | null) => void;
  minTime?: dayjs.Dayjs | null;
  maxTime?: dayjs.Dayjs | null;
}

const TimePicker = (props: TimePickerProps) => {
  const { label, value, setValue, minTime, maxTime } = props;

  const [hour, setHour] = useState("00");
  const [minute, setMinute] = useState("00");
  const [localValue, setLocalValue] = useState("00:00");
  const [open, setOpen] = useState(false);

  const anchorElem = useRef<HTMLInputElement | null>(null);

  // 초기값 설정
  useEffect(() => {
    if (value) {
      const [newHour, newMinute] = value.format("HH:mm").split(":");
      setLocalValue(`${newHour}:${newMinute}`);
      setHour(newHour.padStart(2, "0"));
      setMinute(newMinute.padStart(2, "0"));
    }
  }, [value]);

  const handleOpen = useCallback(() => {
    setOpen(true);
  }, []);

  // 취소
  const handleClose = useCallback(() => {
    setOpen(false);
    anchorElem.current?.blur();
  }, []);

  // 확인
  const handleConfirm = useCallback(() => {
    setLocalValue(`${hour}:${minute}`);
    if (setValue) {
      setValue(dayjs(`${hour}:${minute}`, "HH:mm"));
    }

    handleClose();
  }, [handleClose, hour, minute, setValue]);

  // 시
  const handleHourChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.match(/[^0-9]/)) {
        return;
      }

      const minHour = minTime ? minTime.hour() : 0;
      const maxHour = maxTime ? maxTime.hour() : 23;

      const newHour = Number(e.target.value.slice(-2));
      const newClampedHour = Math.min(Math.max(newHour, minHour), maxHour);
      setHour(newClampedHour.toString().padStart(2, "0"));
    },
    [maxTime, minTime]
  );

  // 분
  const handleMinuteChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.value.match(/[^0-9]/)) {
        return;
      }

      const minMinute = minTime ? minTime.minute() : 0;
      const maxMinute = maxTime ? maxTime.minute() : 59;

    const newMinute = Number(e.target.value.slice(-2));
      const newClampedMinute = Math.min(
        Math.max(newMinute, minMinute),
        maxMinute
      );
      setMinute(newClampedMinute.toString().padStart(2, "0"));
    },
    [maxTime, minTime]
  );

  return (
    <>
      {/* 텍스트필드 */}
      <FormControl variant="outlined">
        {/* 라벨 */}
        <InputLabel>{label}</InputLabel>

        {/* 텍스트필드 */}
        <OutlinedInput
          label={label}
          value={localValue}
          placeholder="HH:mm"
          spellCheck={false}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={() => {
                  anchorElem.current?.focus();
                }}
              >
                <AccessTimeIcon />
              </IconButton>
            </InputAdornment>
          }
          inputRef={anchorElem}
          onClick={handleOpen}
        />
      </FormControl>

      {/* 팝업 대화상자 */}
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorElem.current}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleConfirm();
          }
        }}
      >
        {/* 시간 선택기 */}
        <Stack padding={2} gap={3}>
          {/* 제목 */}
          <Typography fontSize="1em" fontWeight="bold">
            {label ? label : "시간 선택"}
          </Typography>

          {/* 시간 입력 필드 */}
          <Stack direction="row" alignItems="center" gap={1}>
            <TimeTextField value={hour} onChange={handleHourChange} />
            <Typography variant="h4">:</Typography>
            <TimeTextField value={minute} onChange={handleMinuteChange} />
          </Stack>
        </Stack>

        {/* 구분선 */}
        <Divider />

        {/* 버튼 */}
        <Stack
          direction="row"
          justifyContent="space-between"
          padding={"5px 10px"}
        >
          {/* 취소 버튼 */}
          <Button onClick={handleClose}>
            <Typography fontSize="1em" fontWeight="bold">
              취소
            </Typography>
          </Button>

          {/* 확인 버튼 */}
          <Button onClick={handleConfirm}>
            <Typography fontSize="1em" fontWeight="bold">
              확인
            </Typography>
          </Button>
        </Stack>
      </Popover>
    </>
  );
};

export default TimePicker;
