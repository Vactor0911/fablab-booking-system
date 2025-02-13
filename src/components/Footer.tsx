import { Avatar, Divider, Link, Stack, Typography } from "@mui/material";

// Divider 객체
const StyledDivider = () => {
  return (
    <Divider
      orientation="vertical"
      flexItem
      sx={{
        borderWidth: 1,
        borderRadius: 10,
      }}
    />
  );
};

// Link 객체
interface StyledLinkProps {
  href: string;
  label: string;
}

const StyledLink = (props: StyledLinkProps) => {
  const { href, label } = props;

  return (
    <Link
      href={href}
      sx={{
        textDecoration: "none",
      }}
    >
      <Typography variant="subtitle2" color="secondary">
        {label}
      </Typography>
    </Link>
  );
};

const Footer = () => {
  return (
    <Stack
      component="footer"
      gap={2}
      padding={{
        xs: "30px 20px",
        sm: "30px",
      }}
    >
      <Divider />
      <Stack
        direction={{
          xs: "column",
          md: "row",
        }}
        justifyContent={{
          xs: "center",
          md: "space-between",
        }}
        alignItems="center"
        gap={2}
      >
        <Stack gap={2}>
          {/* 링크 */}
          <Stack direction="row" gap={1} flexWrap="wrap">
            <StyledLink
              href="https://www.mokwon.ac.kr/kr/"
              label="목원대학교"
            />
            <StyledDivider />
            <StyledLink
              href="https://www.mokwon.ac.kr/computer/"
              label="목원대학교 컴퓨터공학과"
            />
            <StyledDivider />
            <StyledLink
              href="https://www.mokwon.ac.kr/kr/html/sub09/090501.html"
              label="개인정보 이용약관"
            />
            <StyledDivider />
            <StyledLink href="/" label=" 오류 제보" />
          </Stack>

          <Typography variant="subtitle2" color="secondary">
            [35349] 대전광역시 서구 도안북로88(도안동, 목원대학교) 공학관(D)
            337호
          </Typography>
        </Stack>

        {/* 아이콘 버튼 */}
        <Stack direction="row" gap={2}>
          <Link href="https://www.mokwon.ac.kr/kr/">
            <Avatar alt="목원대학교" />
          </Link>
          <Link href="https://www.youtube.com/@mw_computer">
            <Avatar alt="컴퓨터공학과 유튜브" />
          </Link>
          <Link href="https://github.com/Vactor0911/fablab-booking-system">
            <Avatar alt="깃허브 리포지토리" />
          </Link>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;
