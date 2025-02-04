import { TableCell, TableCellProps } from "@mui/material";
import { ReactNode } from "react";

interface FixedTableCellProps extends TableCellProps {
  keepline?: boolean;
  children: ReactNode;
}

const FixedTableCell = ({
  keepline = false,
  children,
  ...props
}: FixedTableCellProps) => {
  return (
    <TableCell
      sx={{
        padding: "16px 10px !important",
        whiteSpace: keepline ? "nowrap" : "normal",
        wordBreak: keepline ? "keep-all" : "break-word",
        overflow: keepline ? "hidden" : "visible",
        textOverflow: keepline ? "ellipsis" : "clip",
      }}
      {...props}
    >
      {children}
    </TableCell>
  );
};

export default FixedTableCell;
