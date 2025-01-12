import { Button, Divider } from "@mui/material";
import FabLabImage from "../assets/FabLabImage.jpg";
import { Link } from "react-router";
import { color } from "../utils/theme";

import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SampleImage from "../assets/SampleImage.png";

const LinkCss = {
  textDecoration: "none",
  color: "black",
};

const Home = () => {
  return (
    <div
      css={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* 메인 배너 */}
      <div
        className="banner"
        css={{
          height: "45%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "2em",
          color: "white",
          position: "relative",
          overflow: "hidden",
          "&:before, &:after": {
            content: '""',
            position: "absolute",
            width: "100%",
            height: "100%",
            top: "0",
            left: "0",
          },
          "&:before": {
            background: "linear-gradient(black, transparent)",
            backgroundImage: `url(${FabLabImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            filter: "blur(5px)",
            transform: "scale(1.1)",
            zIndex: "-3",
          },
          "&:after": {
            background: "linear-gradient(rgba(0, 0, 0, 0.7), transparent 50%)",
            zIndex: "-2",
          },
        }}
      >
        <h1
          css={{
            textAlign: "center",
          }}
        >
          깔끔하고 공부하기 좋은 공간
        </h1>
      </div>
      {/* 하단 메뉴 */}
      <div
        className="content"
        css={{
          height: "55%",
          padding: "50px 0",
          display: "flex",
          ".notice-container, .my-reservation-container": {
            height: "100%",
            padding: "0 7%",
            display: "flex",
            flexDirection: "column",
            gap: "10%",
          },
        }}
      >
        {/* 공지사항 */}
        <div
          className="notice-container"
          css={{
            width: "55%",
          }}
        >
          <Link to="/notice" css={LinkCss}>
            <h2>공지사항</h2>
          </Link>
          <div
            className="notice"
            css={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {[
              "공지사항1",
              "공지사항2",
              "공지사항3",
              "공지사항4",
              "공지사항5",
              "공지사항6",
            ].map((notice, index) => (
              <Link
                to={"/"}
                key={`notice${index}`}
                css={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <div
                  className="notice-item"
                  css={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <span
                    css={{
                      width: "1em",
                      height: "1em",
                      backgroundColor: color.primary,
                      borderRadius: "50%",
                    }}
                  />
                  <p css={{ flex: "1" }}>{notice}</p>
                  <p>2025-01-13</p>
                </div>
              </Link>
            ))}
          </div>
          <Link
            to="/notice"
            css={{
              textDecoration: "none",
              color: "#404040",
              alignSelf: "flex-end",
            }}
          >
            <h3>더보기</h3>
          </Link>
        </div>
        {/* 구분선 */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderWidth: "1px",
          }}
        />
        {/* 내 예약현황 */}
        <div
          className="my-reservation-container"
          css={{
            width: "45%",
          }}
        >
          <Link to="/my-reservation" css={LinkCss}>
            <h2>내 예약현황</h2>
          </Link>
          <Link to="/" css={LinkCss}>
            <div
              className="my-reservation"
              css={{
                width: "100%",
                display: "flex",
                gap: "30px",
                img: {
                  width: "30%",
                  borderRadius: "10px",
                },
              }}
            >
              <img src={SampleImage} />
              <div
                className="info"
                css={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  alignItems: "center",
                  color: "#404040",
                }}
              >
                <h3>선택 좌석</h3>
                <p>A11</p>
                <h3>예약 날짜</h3>
                <p>2025-01-13</p>
                <h3>PC 지원</h3>
                <p>Windows 11</p>
              </div>
            </div>
          </Link>
          <Button
            variant="outlined"
            color="error"
            startIcon={<LogoutRoundedIcon />}
          >
            <h2>퇴실하기</h2>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
