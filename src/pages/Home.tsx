import { Button, Divider } from "@mui/material";
import FabLabImage from "../assets/FabLabImage.jpg";
import { Link } from "react-router";
import { color } from "../utils/theme";

import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CampaignRoundedIcon from "@mui/icons-material/CampaignRounded";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import SampleImage from "../assets/SampleImage.png";
import { CSSObject } from "@emotion/react";

const NavLinkCss = {
  display: "flex",
  justifyContent: "space-between",
  textDecoration: "none",
  color: "black",
  ".title": {
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
  ".title > h4, .title > svg": {
    color: "#666",
  },
};

const MobileNavLinkCss = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "5px",
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
        "@media (max-width: 480px)": {
          padding: "0 20px",
          height: "auto",
        },
      }}
    >
      {/* 메인 배너 */}
      <div
        className="banner"
        css={{
          height: "45%",
          minHeight: "200px",
          maxHeight: "600px",
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
          "@media (max-width: 480px)": {
            display: "none",
          },
        }}
      >
        <h1
          css={{
            padding: "0 30px",
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
          width: "100%",
          height: "auto",
          padding: "20px 0",
          display: "flex",
          ".notice-container, .my-reservation-container": {
            height: "100%",
            padding: "20px 40px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          },
          "@media (max-width: 768px)": {
            flexDirection: "column",
            ".notice-container, .my-reservation-container": { height: "auto" },
          },
          "@media (max-width: 480px)": {
            height: "100%",
            padding: "0",
            flexDirection: "column-reverse",
            justifyContent: "flex-end",
            ".notice-container, .my-reservation-container": {
              padding: "20px 0",
            },
          },
        }}
      >
        {/* 공지사항 */}
        <div
          className="notice-container"
          css={{
            width: "55%",
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          <Link to="/notice" css={NavLinkCss}>
            <div className="title">
              <h2>공지사항</h2>
              <h4
                css={{
                  display: "none",
                  "@media (max-width: 480px)": {
                    marginLeft: "auto",
                    display: "block",
                  },
                }}
              >
                더보기
              </h4>
              <ChevronRightRoundedIcon fontSize="large" />
            </div>
          </Link>
          <div
            className="notice-items"
            css={{
              display: "flex",
              flexDirection: "column",
              gap: "30px",
              "@media (max-width: 480px)": {
                padding: "20px 10px",
                gap: "20px",
                border: "1px solid #afafaf",
                borderRadius: "10px",
                backgroundColor: "white",
              },
            }}
          >
            {[
              "공지사항1",
              "공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2공지사항2",
              "공지사항3",
              "공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4공지사항4",
              "공지사항5",
              "공지사항6",
            ].map((notice, index) => (
              <Link
                to="/notice"
                key={`notice${index}`}
                css={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: "10px",
                  overflow: "hidden",
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <span
                  css={{
                    width: "1em",
                    height: "1em",
                    borderRadius: "50%",
                    backgroundColor: color.primary,
                    flexShrink: "0",
                    "@media (max-width: 480px)": {
                      display: "none",
                    },
                  }}
                />
                <CampaignRoundedIcon
                  sx={{
                    display: "none",
                    "@media (max-width: 480px)": {
                      display: "inline",
                    },
                  }}
                />
                <span
                  css={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {notice}
                </span>
              </Link>
            ))}
          </div>
          <Link
            to="/notice"
            css={{
              display: "flex",
              justifyContent: "flex-end",
              textDecoration: "none",
              color: "#666",
              "@media (max-width: 480px)": {
                display: "none",
              },
            }}
          >
            <h4>더보기</h4>
          </Link>
        </div>
        {/* PC용 세로 구분선 */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            borderWidth: "2px",
            borderRadius: "10px",
            "@media (max-width: 768px)": {
              display: "none",
            },
          }}
        />
        {/* 모바일용 컴포넌트 */}
        <div
          className="mobile-only"
          css={{
            margin: "10px 0",
            display: "none",
            flexDirection: "column",
            gap: "30px",
            "@media (max-width: 480px)": {
              display: "flex",
            },
          }}
        >
          {/* 모바일용 네비게이션 메뉴 */}
          <div
            className="mobile-nav"
            css={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link to="/reservation" css={MobileNavLinkCss as CSSObject}>
              <CalendarMonthRoundedIcon />
              <h3>예약하기</h3>
            </Link>
            <Link to="/about" css={MobileNavLinkCss as CSSObject}>
              <ImportContactsRoundedIcon />
              <h3>팹랩소개</h3>
            </Link>
            <a
              href="https://www.mokwon.ac.kr/"
              css={MobileNavLinkCss as CSSObject}
            >
              <LanguageRoundedIcon />
              <h3>목원홈</h3>
            </a>
            <a
              href="https://www.mokwon.ac.kr/computer/"
              css={MobileNavLinkCss as CSSObject}
            >
              <LanguageRoundedIcon />
              <h3>컴공홈</h3>
            </a>
          </div>
          {/* 모바일용 종정시 링크 버튼 */}
          <a
            href="https://i.mokwon.ac.kr/"
            css={{
              width: "100%",
              height: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
              border: "1px solid #afafaf",
              borderRadius: "15px",
              backgroundColor: color.primary,
              textDecoration: "none",
              color: "white",
            }}
          >
            {/* TODO: 목원대 로고 추가 필요 */}
            <img src="" alt="목원대학교" />
            <h3>종합정보시스템</h3>
          </a>
        </div>
        {/* 내 예약현황 */}
        <div
          className="my-reservation-container"
          css={{
            width: "45%",
            "@media (max-width: 768px)": {
              width: "100%",
            },
          }}
        >
          <Link to="/my-reservation" css={NavLinkCss}>
            <div className="title">
              <h2>내 예약현황</h2>
              <ChevronRightRoundedIcon fontSize="large" />
            </div>
          </Link>
          <Link
            to="my-reservation"
            css={{ textDecoration: "none", color: "black" }}
          >
            <div
              className="my-reservation"
              css={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                gap: "10px",
                "@media (max-width: 480px)": {
                  padding: "20px",
                  flexDirection: "row-reverse",
                  border: "1px solid #afafaf",
                  borderRadius: "10px",
                },
              }}
            >
              {/* 좌석 사진 */}
              <div
                className="image-wrapper"
                css={{
                  width: "20%",
                  maxWidth: "150px",
                  minWidth: "100px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  img: {
                    width: "100%",
                    aspectRatio: "1 / 1",
                    borderRadius: "10px",
                  },
                  "@media (max-width: 480px)": {
                    width: "10%",
                    minWidth: "80px",
                  },
                }}
              >
                <img src={SampleImage} alt="좌석 사진" />
              </div>
              {/* 예약 정보 */}
              <div
                className="detail"
                css={{
                  width: "75%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "10px",
                  ".column": {
                    display: "flex",
                    flexWrap: "wrap",
                    h4: {
                      width: "4em",
                      color: "#555",
                    },
                  },
                }}
              >
                <div className="title">
                  <h3>예약 좌석</h3>
                </div>
                <div className="column">
                  <h4
                    css={{
                      "@media (max-width: 480px)": {
                        display: "none",
                      },
                    }}
                  >
                    예약 날짜
                  </h4>
                  <p>1월 13일 (월) 13:00 ~ 22:00</p>
                </div>
                <div className="column">
                  <h4>선택 좌석</h4>
                  <p>A11</p>
                </div>
                <div className="column">
                  <h4>PC 지원</h4>
                  <p>Windows 11</p>
                </div>
              </div>
            </div>
          </Link>
          <Button
            fullWidth
            variant="outlined"
            color="error"
            startIcon={<ExitToAppRoundedIcon />}
            sx={{
              marginTop: "20px",
              ".MuiSvgIcon-root": {
                fontSize: "2em",
              },
              "@media (max-width: 480px)": {
                display: "none",
              },
            }}
          >
            <h2>퇴실하기</h2>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
