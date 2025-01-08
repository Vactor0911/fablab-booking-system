import { range } from "../utils";
import { color } from "../utils/theme";

// 좌석 버튼 속성
interface SeatButtonProps {
  name: string;
  isReserved?: boolean;
  onClick?: () => void;
}

// 좌석 버튼 컴포넌트
const SeatButton = (props: SeatButtonProps) => {
  const { name, isReserved = false, onClick } = props;
  return (
    <div
      onClick={onClick}
      css={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        flex: "1",
        backgroundColor: "#fffcf2",
        cursor: "pointer",
        "& > p": {
          fontWeight: "bold",
        },
      }}
    >
      {!isReserved && (
        <p
          css={{
            padding: "0 5px",
          }}
        >
          {name}
        </p>
      )}
      {isReserved && (
        <>
          <p
            css={{
              backgroundColor: "#676767",
              color: "white",
              padding: "0 5px",
            }}
          >
            {name}
          </p>
          <div
            className="content"
            css={{
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#d3d2cb",
            }}
          >
            <p>사용중</p>
          </div>
        </>
      )}
    </div>
  );
};

const SeatLayout = () => {
  return (
    <div
      css={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* 입구 및 사물함 */}
      <div
        className="top-container"
        css={{
          width: "100%",
          display: "flex",
          gap: "5%",
          height: "5%",
          "& span": {
            display: "flex",
            flex: "1",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color.primary,
            fontWeight: "bold",
            color: "white",
          },
          "& span.fullwidth": {
            flexGrow: "6",
          },
        }}
      >
        <span>출입구</span>
        <span className="fullwidth">사물함</span>
        <span>고정문</span>
      </div>

      {/* 좌석 */}
      <div
        className="layout-root"
        css={{
          height: "90%",
          display: "flex",
          justifyContent: "space-between",
          "& > div": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "2%",
          },
        }}
      >
        {/* 왼쪽 */}
        <div className="left" css={{ width: "7%" }}>
          {range(1, 7).map((index) => (
            <SeatButton
              key={`A${index}`}
              name={`A${index}`}
              isReserved={true}
            />
          ))}
          <span css={{ flexGrow: "0.5" }} />
        </div>
        {/* 중앙 */}
        <div
          className="middle"
          css={{ width: "80%", justifyContent: "space-between" }}
        >
          <span />
          {/* 중앙 */}
          <div
            className="middle"
            css={{
              width: "100%",
              height: "67%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {range(2).map((i) => (
              <div
                key={`row${i}`}
                css={{
                  width: "100%",
                  height: "40%",
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                {range(4).map((j) => (
                  <div
                    key={`column${j}`}
                    css={{
                      width: "19%",
                      display: "grid",
                      gridTemplateColumns: "repeat(2, 1fr)",
                      gridTemplateRows: "repeat(2, 1fr)",
                      gap: "2px",
                    }}
                  >
                    {range(1, 5).map((index) => (
                      <SeatButton
                        key={`B${i * 16 + j * 4 + index}`}
                        name={`B${i * 16 + j * 4 + index}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* 중앙 하단 */}
          <div
            className="bottom"
            css={{
              height: "13.5%",
              display: "flex",
              gap: "2%",
            }}
          >
            {range(1, 6).map((index) => (
              <>
                <SeatButton key={`C${index}`} name={`C${index}`} />
                {index !== 5 && (
                  <SeatButton key={`D${index}`} name={`D${index}`} />
                )}
              </>
            ))}
          </div>
        </div>
        {/* 오른쪽 */}
        <div className="right" css={{ width: "7%" }}>
          {range(7, 13).map((index) => (
            <SeatButton key={`A${index}`} name={`A${index}`} />
          ))}
          <span css={{ flexGrow: "0.5" }} />
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
