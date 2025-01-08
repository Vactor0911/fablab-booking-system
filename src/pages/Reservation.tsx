import NoticeBanner from "../components/NoticeBanner";
import SeatLayout from "../components/SeatLayout";

const Reservation = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 80px)",
        paddingTop: "10px",
      }}
    >
      <NoticeBanner
        message="공지사항 어쩌구 저쩌구... 대충 내일까지 이러 저러한 이유로 팹랩 못쓴단 안내문"
        moreCount={3}
      />
      <div
        className="seat-layout-root"
        css={{
          padding: "10px 40px",
          width: "100%",
          height: "100%",
        }}
      >
        <SeatLayout />
      </div>
    </div>
  );
};

export default Reservation;
