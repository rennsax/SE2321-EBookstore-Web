import { SxProps } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";

interface DataPickerProps {
  label?: string;
  value: Dayjs | null;
  onChange: (v: Dayjs | null) => void;
  sx?: SxProps;
}

export default function MyDatePicker({
  label,
  value,
  onChange,
  sx
}: DataPickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker label={label} value={value} onChange={onChange} sx={sx} />
    </LocalizationProvider>
  );
}
