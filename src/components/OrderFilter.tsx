import { Button, Stack, TextField } from "@mui/material";
import MyDatePicker from "components/MyDatePicker";
import { Dayjs } from "dayjs";
import { ChangeEvent } from "react";

interface OrderFilterProps {
  beginDate: Dayjs | null;
  endDate: Dayjs | null;
  keyword: string;
  isFilter: boolean;
  onBeginDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
  onKeywordChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onIsFilterReverse: () => void;
}

export default function OrderFilter({
  beginDate,
  endDate,
  onBeginDateChange,
  onEndDateChange,
  keyword,
  onKeywordChange,
  isFilter,
  onIsFilterReverse,
}: OrderFilterProps) {
  return (
    <div className="order-filter">
      <Stack direction={"row"}>
        <MyDatePicker
          value={beginDate}
          onChange={onBeginDateChange}
          label="Begin Day"
          sx={{ mr: "10px" }}
        />
        <MyDatePicker
          value={endDate}
          onChange={onEndDateChange}
          label="End Day"
          sx={{ mr: "20px" }}
        />
        <TextField
          variant="outlined"
          label="Book Contain"
          sx={{ mr: "20px" }}
          value={keyword}
          onChange={onKeywordChange}
        />
        <Button
          variant={isFilter ? "contained" : "outlined"}
          onClick={onIsFilterReverse}
          sx={{ width: "50px" }}
          className="order-filter__btn"
        >
          {isFilter ? "Reset" : "Filter"}
        </Button>
      </Stack>
    </div>
  );
}
