import { Button, Stack, TextField } from "@mui/material";
import MyDatePicker from "components/MyDatePicker";
import { Dayjs } from "dayjs";
import { CSSProperties, ChangeEvent } from "react";

interface OrderFilterProps {
  beginDate: Dayjs | null;
  endDate: Dayjs | null;
  isFilter: boolean;
  onIsFilterReverse: () => void;
  onBeginDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
  keyword?: string;
  onKeywordChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  style?: CSSProperties
}

export default function TimeFilter({
  beginDate,
  endDate,
  onBeginDateChange,
  onEndDateChange,
  isFilter,
  onIsFilterReverse,
  keyword,
  onKeywordChange,
  style
}: OrderFilterProps) {
  return (
    <div className="order-filter" style={style}>
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
        {keyword !== undefined ? (
          <TextField
            variant="outlined"
            label="Book Contain"
            sx={{ mr: "20px" }}
            value={keyword}
            onChange={onKeywordChange}
          />
        ) : null}
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
