import { Tooltip } from "@mui/material";
import { theme } from "../../utils";
import FireExtinguisherIcon from "@mui/icons-material/FireExtinguisher";

const FireExtinguisher = () => {
  const color = theme.palette.error.main;

  return (
    <Tooltip
      title="소화기"
      arrow
      slotProps={{
        tooltip: {
          sx: {
            backgroundColor: color,
          },
        },
        arrow: {
          sx: {
            color: color,
          },
        },
      }}
    >
      <FireExtinguisherIcon
        sx={{
          color: color,
        }}
      />
    </Tooltip>
  );
};

export default FireExtinguisher;
