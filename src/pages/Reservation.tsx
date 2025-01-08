import SeatLayout from "../components/SeatLayout";

const Reservation = () => {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 70px)",
      }}
    >
      <div className="notice-banner-container">

      </div>
      <div className="seat-layout-root" css={{ padding: "40px", border: "1px solid black", width: "100%", height: "100%" }}>
        <SeatLayout />
      </div>
    </div>
  );
};

export default Reservation;
