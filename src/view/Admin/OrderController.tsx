import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import TimeFilter from "components/TimeFilter";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { getAllOrderInfo } from "service/OrderService";
import { defaultQueryOptions } from "service/defaultQueryOptions";

interface OrderTableProps {
  isFilter: boolean;
  beginDate: Dayjs;
  endDate: Dayjs;
  keyword: string;
}

const OrderTable: React.FC<OrderTableProps> = ({
  isFilter,
  beginDate,
  endDate,
  keyword,
}) => {
  const columnDefs: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 100,
    },
    // TODO: show the user's avatar
    {
      field: "userId",
      headerName: "User Id",
      width: 100,
    },
    {
      field: "time",
      headerName: "Time",
      width: 300,
      renderCell: (params) => {
        return dayjs(params.value as Date).format("YYYY-MM-DD HH:mm:ss");
      },
    },
  ];

  const { data: orderInfoList, isSuccess } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["order admin", ...(isFilter ? [isFilter, beginDate, endDate, keyword] : [isFilter])],
    queryFn: async () => {
      if (!isFilter) return await getAllOrderInfo();
      return await getAllOrderInfo(
        keyword,
        beginDate as Dayjs,
        endDate as Dayjs
      );
    },
    ...defaultQueryOptions,
    refetchOnWindowFocus: false,
  });

  if (!isSuccess) return null;
  return (
    <DataGrid
      columns={columnDefs}
      rows={orderInfoList}
      loading={false}
      rowHeight={100}
      // getRowId={(row: OrderInfo) => row.id}
      disableRowSelectionOnClick
    />
  );
};

export default function OrderController() {
  const [beginDate, setBeginDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [keyword, setKeyword] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  return (
    <>
      <TimeFilter
        {...{
          beginDate,
          endDate,
          isFilter,
          keyword,
          onBeginDateChange: (newValue) => setBeginDate(newValue),
          onEndDateChange: (newValue) => setEndDate(newValue),
          onIsFilterReverse: () => setIsFilter((f) => !f),
          onKeywordChange: (e) => setKeyword(e.target.value),
        }}
      />
      <OrderTable
        {...{
          isFilter,
          keyword,
          beginDate: beginDate as Dayjs,
          endDate: endDate as Dayjs,
        }}
      />
    </>
  );
}
