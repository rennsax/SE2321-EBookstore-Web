import { useQuery } from "@tanstack/react-query";
import TimeFilter from "components/TimeFilter";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { getUserStatistic } from "service/UserServer";
import { defaultQueryOptions } from "service/defaultQueryOptions";
import useUserInfo from "utils/useUserInfo";
import OrderItem from "view/OrderPage/OrderItem";

export default function FavoritePage() {
  const { id: userId } = useUserInfo();
  const [beginDate, setBeginDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [isFilter, setIsFilter] = useState(false);

  const { data: userStatistic, isSuccess } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      "user statistic",
      userId,
      isFilter,
      ...(isFilter ? [beginDate, endDate] : []),
    ],
    queryFn: async () => {
      if (!isFilter) return await getUserStatistic(userId);
      return await getUserStatistic(
        userId,
        beginDate as Dayjs,
        endDate as Dayjs
      );
    },
    ...defaultQueryOptions,
  });

  return (
    <>
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
      {isSuccess ? (
        <div style={{ fontSize: "24px", margin: "10px 0" }}>
          Total cost: {userStatistic.totalCost}
        </div>
      ) : null}
      {userStatistic?.bookOrderedList.map((bookOrdered, index) => (
        <OrderItem {...bookOrdered} key={`user statistic ${index}`} />
      ))}
    </>
  );
}
