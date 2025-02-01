import { Tooltip } from "@mui/material";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

const MedicalDevices = () => {
  const color = "#26d661";

  return (
    <Tooltip
      title="안전보호구"
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
      <MedicalServicesIcon
        sx={{
          color: color,
        }}
      />
    </Tooltip>
  );
};

export default MedicalDevices;
