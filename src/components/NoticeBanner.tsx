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
        backgroundColor: "#c90f0f",
        color: "white",
        cursor: "pointer",
        "& > span": {
          width: "100%",
          height: "3px",
          backgroundColor: "white",
        },
      }}
    >
      <span />
      <div
        className="text-wrapper"
        css={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          width: "100%",
          height: "100%",
          padding: "0 20px",
        }}
      >
        <h2
          css={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {message}
        </h2>
        {moreCount && <h2>{`+${moreCount}`}</h2>}
      </div>
      <span />
    </div>
  );
};

export default NoticeBanner;
