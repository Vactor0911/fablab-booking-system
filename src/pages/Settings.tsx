import { Box, Stack, Tab, Tabs, Typography } from "@mui/material";
import AdminPage from "../components/AdminPage";
import { ReactNode, useCallback, useState } from "react";
import TokenRefresher from "../components/TokenRefresher";
import CommonTabPanel from "../components/tabs/CommonTabPanel";
import SeatInfoTabPanel from "../components/tabs/SeatInfoTabPanel";

export interface TabPanelProps {
  value: string;
  index: string;
  children?: ReactNode;
}

const Settings = () => {
  // 탭 메뉴
  const [tabIndex, setTabIndex] = useState("common"); // 탭 메뉴 인덱스
  const handleTabIndexChange = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      setTabIndex(newValue);
    },
    []
  );

  return (
    <TokenRefresher>
      <AdminPage>
        <Stack className="page-root">
          <Stack className="base-layout" gap={3}>
            {/* 페이지명 */}
            <Typography variant="h2">기본 설정</Typography>

            {/* 탭 메뉴 */}
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                position: "relative",
              }}
            >
              {/* 탭 메뉴 */}
              <Tabs value={tabIndex} onChange={handleTabIndexChange}>
                <Tab
                  label="공통"
                  value="common"
                  sx={{ fontSize: "1.17em", fontWeight: "bold" }}
                />
                <Tab
                  label="좌석 정보"
                  value="seat-info"
                  sx={{ fontSize: "1.17em", fontWeight: "bold" }}
                />
              </Tabs>
            </Box>

            {/* 탭 패널 (공통) */}
            <CommonTabPanel value={tabIndex} index="common" />

            {/* 탭 패널 (좌석 정보) */}
            <SeatInfoTabPanel value={tabIndex} index="seat-info" />
          </Stack>
        </Stack>
      </AdminPage>
    </TokenRefresher>
  );
};

export default Settings;
