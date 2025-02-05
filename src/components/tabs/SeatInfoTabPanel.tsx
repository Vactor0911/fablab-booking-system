import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { TabPanelProps } from "../../pages/Settings";
import SectionHeader from "../SectionHeader";
import SeatSelecter from "../SeatSelecter";
import SmapleImage from "../../assets/SampleImage.png";
import { useCallback, useEffect, useMemo, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const SeatInfoTabPanel = (props: TabPanelProps) => {
  const { value, index } = props;

  // 좌석 사진 변경
  const [image, setImage] = useState<string | null>(null);
  const [imageRaw, setImageRaw] = useState<File | null>(null);
const handleSeatImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            const newImage = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(newImage);
            reader.onload = () => {
                const img = new Image();
                img.src = reader.result as string;
                img.onload = () => {
                    const canvas = document.createElement("canvas");
                    const ctx = canvas.getContext("2d");
                    if (ctx) {
                        const MAX_SIZE = 200 * 1024; // 200KB
                        const width = img.width;
                        const height = img.height;
                        let quality = 0.7; // Initial quality

                        canvas.width = width;
                        canvas.height = height;
                        ctx.drawImage(img, 0, 0, width, height);

                        let dataUrl = canvas.toDataURL("image/jpeg", quality);
                        while (dataUrl.length > MAX_SIZE && quality > 0.1) {
                            quality -= 0.1;
                            dataUrl = canvas.toDataURL("image/jpeg", quality);
                        }

                        setImage(dataUrl); // URL로 이미지 저장
                        setImageRaw(newImage); // 파일 객체를 그대로 저장
                    }
                };
            };
        }
    },
    []
);

  // PC 지원
  const [pcSupport, setPcSupport] = useState("none");
  const handlePcSupportChange = useCallback(
    (event: SelectChangeEvent<string>) => {
      setPcSupport(event.target.value as string);
    },
    []
  );

  // 주의 사항
  const [caution, setCaution] = useState("");
  const handleCautionChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCaution(event.target.value);
    },
    []
  );

  // 좌석 선택기
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedSeatsOld, setSelectedSeatsOld] = useState<string>("");

  // 열별 좌석 수
  const seatsPerRow = useMemo(
    () => ({
      A: 12,
      B: 32,
      C: 5,
      D: 4,
    }),
    []
  );

  // 좌석 전체 선택 버튼 클릭
  const handleSeatSelectAllButtonClick = useCallback(() => {
    const newSelectedSeats: string[] = [];

    Array.from({ length: seatsPerRow["A"] }, (_, i) => `A${i + 1}`).map(
      (seatName) => {
        newSelectedSeats.push(seatName);
      }
    );
    Array.from({ length: seatsPerRow["B"] }, (_, i) => `B${i + 1}`).map(
      (seatName) => {
        newSelectedSeats.push(seatName);
      }
    );
    Array.from({ length: seatsPerRow["C"] }, (_, i) => `C${i + 1}`).map(
      (seatName) => {
        newSelectedSeats.push(seatName);
      }
    );
    Array.from({ length: seatsPerRow["D"] }, (_, i) => `D${i + 1}`).map(
      (seatName) => {
        newSelectedSeats.push(seatName);
      }
    );

    setSelectedSeats(newSelectedSeats);
  }, [seatsPerRow]);

  // 좌석 전체 취소 버튼 클릭
  const handleSeatCancelAllButtonClick = useCallback(() => {
    setSelectedSeats([]);
  }, []);

  // 열 선택 버튼 클릭
  const handleSeatRowButtonClick = useCallback(
    (row: keyof typeof seatsPerRow) => {
      let newSelectedSeats: string[] = [...selectedSeats];
      if (
        newSelectedSeats.filter((name) => name.startsWith(row)).length <
        seatsPerRow[row]
      ) {
        Array.from(
          { length: seatsPerRow[row] },
          (_, i) => `${row}${i + 1}`
        ).map((seatName) => {
          if (!newSelectedSeats.includes(seatName)) {
            newSelectedSeats.push(seatName);
          }
        });
      } else {
        newSelectedSeats = newSelectedSeats.filter(
          (seatName) => !seatName.startsWith(row)
        );
      }
      setSelectedSeats(newSelectedSeats);
    },
    [seatsPerRow, selectedSeats]
  );

  interface ParsedSelectedSeats {
    A: string[];
    B: string[];
    C: string[];
    D: string[];
  }
  const [parsedSelectedSeats, setParsedSelectedSeats] =
    useState<ParsedSelectedSeats>({} as ParsedSelectedSeats);

  useEffect(() => {
    const newParsedSelectedSeats = selectedSeats.reduce((acc, seat) => {
      acc["A"] = acc["A"] || [];
      acc["B"] = acc["B"] || [];
      acc["C"] = acc["C"] || [];
      acc["D"] = acc["D"] || [];

      if (seat.startsWith("A")) {
        acc["A"].push(seat);
      } else if (seat.startsWith("B")) {
        acc["B"].push(seat);
      } else if (seat.startsWith("C")) {
        acc["C"].push(seat);
      } else if (seat.startsWith("D")) {
        acc["D"].push(seat);
      }

      return acc;
    }, {} as ParsedSelectedSeats);

    setParsedSelectedSeats(newParsedSelectedSeats);
  }, [selectedSeats]);

  // 좌석 정보 불러오기
  const fetchSeatInfo = useCallback(async (seatName: string) => {
    try {
      const response = await axiosInstance.get(`/admin/seats/${seatName}`);

      setImage(response.data.seat.image);
      setPcSupport(response.data.seat.pc_support);
      setCaution(response.data.seat.warning);
    } catch (err) {
      console.error("좌석 데이터를 가져오는 중 오류 발생:", err);
    }
  }, []);

  useEffect(() => {
    if (value !== index) {
      return;
    }

    if (selectedSeats[0] !== selectedSeatsOld) {
      setSelectedSeatsOld(selectedSeats[0]);

      if (selectedSeats[0]) {
        fetchSeatInfo(selectedSeats[0]);
      } else {
        setImage(null);
        setPcSupport("none");
        setCaution("");
      }
    }
  }, [fetchSeatInfo, index, selectedSeats, selectedSeatsOld, value]);

  // 수정하기 버튼 클릭
  const handleSeatInfoEditButtonClick = useCallback(async () => {
    // 좌석 미선택
    if (!selectedSeats) {
      alert("좌석을 선택해주세요.");
      return;
    }

    // 이미지 미선택
    if (!image) {
      alert("좌석 사진을 업로드해주세요.");
      return;
    }

    // PC 지원 미선택
    if (!pcSupport) {
      alert("PC 지원 정보를 선택해주세요.");
      return;
    }

    // 주의사항 미입력
    if (!caution) {
      alert("주의사항을 입력해주세요.");
      return;
    }

    // 좌석 정보 수정 요청
    try {
      const csrfResponse = await axiosInstance.get("/csrf-token");
      const csrfToken = csrfResponse.data.csrfToken;

      // FormData 생성
      const formData = new FormData();
      formData.append("selectedSeats", selectedSeats.join(",")); // JSON 문자열로 변환하여 추가
      formData.append("pcUsage", pcSupport || "none");
      formData.append("warning", caution || "");
      if (imageRaw) {
        formData.append("image", imageRaw); // 파일 객체 추가
      }

      await axiosInstance.patch("/admin/update-seat", formData, {
        headers: {
          "X-CSRF-Token": csrfToken,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("좌석 정보가 수정되었습니다.");
    } catch (err) {
      console.error("좌석 정보 수정 중 오류 발생:", err);
      alert("좌석 정보 수정 중 오류가 발생했습니다.");
    }
  }, [caution, image, imageRaw, pcSupport, selectedSeats]);

  return (
    <Box role="tabpanel" hidden={value !== index}>
      <Stack
        direction={{
          xs: "column-reverse",
          md: "row",
        }}
        justifyContent="space-between"
        flex={1}
      >
        {/* 좌측 컨테이너 */}
        <Stack
          gap={5}
          width={{
            xs: "100%",
            md: "33%",
          }}
        >
          {/* 좌석명 */}
          <Stack gap={1} overflow="hidden">
            <SectionHeader title="선택 좌석" underline />
            {selectedSeats[0] ? (
              <Stack gap={1}>
                {(["A", "B", "C", "D"] as Array<keyof ParsedSelectedSeats>).map(
                  (row, index) =>
                    parsedSelectedSeats[row]?.length > 0 ? (
                      <Stack direction="row" gap={1} key={index}>
                        <Typography
                          variant="subtitle1"
                          fontWeight="bold"
                          color="primary"
                        >
                          {row}열
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          flex={1}
                          sx={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {parsedSelectedSeats[row]
                            ?.sort((a, b) => +a.slice(1) - +b.slice(1))
                            .join(", ")}
                        </Typography>
                        <Typography variant="subtitle1">
                          ({parsedSelectedSeats[row]?.length})
                        </Typography>
                      </Stack>
                    ) : null
                )}
              </Stack>
            ) : (
              <Typography variant="subtitle1">없음</Typography>
            )}
          </Stack>

          {/* 좌석 사진 */}
          <Stack gap={2}>
            <SectionHeader title="좌석 사진" underline />

            <Box
              component="img"
              alt="좌석 사진"
              src={image ?? SmapleImage}
              alignSelf="center"
              sx={{
                width: "150px",
                borderRadius: "10px",
                boxShadow: 3,
              }}
            />

            {/* 업로드 버튼 */}
            <Box alignSelf="center">
              <Button
                variant="outlined"
                color="secondary"
                role={undefined}
                tabIndex={-1}
                disabled={!selectedSeats[0]}
                sx={{
                  borderRadius: "30px",
                  padding: "5px 30px",
                  position: "relative",
                }}
              >
                업로드
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleSeatImageChange}
                  css={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    bottom: 0,
                    left: 0,
                    opacity: 0,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                />
              </Button>
            </Box>
          </Stack>

          {/* PC 지원 정보 */}
          <Stack gap={1}>
            <SectionHeader title="PC 지원" underline />
            <Select
              value={pcSupport}
              onChange={handlePcSupportChange}
              disabled={!selectedSeats[0]}
            >
              <MenuItem value="없음">없음</MenuItem>
              <MenuItem value="Windows 11">Windows 11</MenuItem>
              <MenuItem value="iMac">iMac</MenuItem>
            </Select>
          </Stack>

          {/* 주의사항 */}
          <Stack gap={1}>
            <SectionHeader title="주의사항" underline />
            <TextField
              variant="filled"
              value={caution}
              onChange={handleCautionChange}
              disabled={!selectedSeats[0]}
              sx={{
                "& .MuiFilledInput-root input": {
                  padding: "12px",
                },
              }}
            />
          </Stack>

          {/* 수정 버튼 */}
          <Button
            variant="contained"
            onClick={handleSeatInfoEditButtonClick}
            fullWidth
            disabled={!selectedSeats[0]}
          >
            <Typography variant="h2">수정하기</Typography>
          </Button>
        </Stack>

        {/* 우측 컨테이너 */}
        <Stack
          gap={2}
          width={{
            xs: "100%",
            md: "63%",
          }}
        >
          {/* 전체 선택기 */}
          <Stack direction="row" justifyContent="flex-end" gap={2}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleSeatSelectAllButtonClick}
            >
              전체 선택
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleSeatCancelAllButtonClick}
            >
              전체 취소
            </Button>
          </Stack>

          {/* 좌석 선택기 */}
          <Box overflow="auto">
            <SeatSelecter
              multiple
              minWidth="600px"
              minHeight="400px"
              selectedseats={selectedSeats}
              setselectedseats={setSelectedSeats}
            />
          </Box>

          {/* 좌석 열 선택기 */}
          <Stack direction="row" justifyContent="space-evenly">
            <Button
              color={
                selectedSeats.filter((name) => name.startsWith("A")).length >=
                seatsPerRow["A"]
                  ? "primary"
                  : "secondary"
              }
              onClick={() => handleSeatRowButtonClick("A")}
            >
              <Typography variant="h1">A 좌석</Typography>
            </Button>
            <Button
              color={
                selectedSeats.filter((name) => name.startsWith("B")).length >=
                seatsPerRow["B"]
                  ? "primary"
                  : "secondary"
              }
              onClick={() => handleSeatRowButtonClick("B")}
            >
              <Typography variant="h1">B 좌석</Typography>
            </Button>
            <Button
              color={
                selectedSeats.filter((name) => name.startsWith("C")).length >=
                seatsPerRow["C"]
                  ? "primary"
                  : "secondary"
              }
              onClick={() => handleSeatRowButtonClick("C")}
            >
              <Typography variant="h1">C 좌석</Typography>
            </Button>
            <Button
              color={
                selectedSeats.filter((name) => name.startsWith("D")).length >=
                seatsPerRow["D"]
                  ? "primary"
                  : "secondary"
              }
              onClick={() => handleSeatRowButtonClick("D")}
            >
              <Typography variant="h1">D 좌석</Typography>
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default SeatInfoTabPanel;
