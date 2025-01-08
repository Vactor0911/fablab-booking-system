interface NoticeBannerProps {
  message: string;
  moreCount?: number;
}

const NoticeBanner = (props: NoticeBannerProps) => {
  const { message, moreCount = 0 } = props;
  return (
    <div
      css={{
        width: "100%",
        height: "70px",
        padding: "3px 0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#c90f0f",
        color: "white",
        cursor: "pointer",
        "& > span": {
            width: "100%",
            height: "3px",
            backgroundColor: "white",
        }
      }}
    >
      <span />
      <h2>{message + (moreCount ? ` +${moreCount}` : "")}</h2>
      <span />
    </div>
  );
};

export default NoticeBanner;
