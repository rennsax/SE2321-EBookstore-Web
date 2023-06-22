import { Stack } from "@mui/material";
import TimeFilter from "components/TimeFilter";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import OrderGraph from "./OrderGraph";
import UserGraph from "./UserGraph";

export default function Statistic() {
  const [beginDate, setBeginDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [isFilter, setIsFilter] = useState(false);

  return (
    <Stack>
      <TimeFilter
        {...{
          beginDate,
          endDate,
          isFilter,
          onBeginDateChange: (newValue) => setBeginDate(newValue),
          onEndDateChange: (newValue) => setEndDate(newValue),
          onIsFilterReverse: () => setIsFilter((f) => !f),
        }}
      />
      <h1 className="stat__graph__title">Hottest Books</h1>
      <OrderGraph
        {...{
          isFilter,
          ...(isFilter && {
            beginDate: beginDate as Dayjs,
            endDate: endDate as Dayjs,
          }),
        }}
      />
      <h1 className="stat__graph__title">User Rank</h1>
      <UserGraph
        {...{
          isFilter,
          ...(isFilter && {
            beginDate: beginDate as Dayjs,
            endDate: endDate as Dayjs,
          }),
        }}
      />
    </Stack>
  );
}
