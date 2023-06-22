import { useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import React from "react";
import { getBookRank } from "service/BookService";
import { getAllOrderInfo } from "service/OrderService";
import { defaultQueryOptions } from "service/defaultQueryOptions";

interface OrderGraphProps {
  isFilter: boolean;
  beginDate?: Dayjs;
  endDate?: Dayjs;
}
const OrderGraph: React.FC<OrderGraphProps> = ({
  isFilter,
  beginDate,
  endDate,
}) => {
  const { data: bookRank, isSuccess } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      "order for statistic",
      ...(isFilter ? [isFilter, beginDate, endDate] : [isFilter]),
    ],
    queryFn: async () => {
      let orderInfoList: OrderInfo[] | undefined = undefined;
      if (!isFilter) orderInfoList = await getAllOrderInfo();
      else
        orderInfoList = await getAllOrderInfo(
          undefined,
          beginDate as Dayjs,
          endDate as Dayjs
        );
      return await getBookRank(orderInfoList);
    },
    ...defaultQueryOptions,
    refetchOnWindowFocus: false,
  });

  if (!isSuccess) {
    return null;
  }

  bookRank.sort((a, b) => b[1] - a[1]);
  const options: EChartsOption = {
    grid: { top: 8, right: 8, bottom: 200, left: 60 },
    xAxis: {
      type: "category",
      data: bookRank.slice(0, 5).map((info) => info[0].title),
      // show: false
      axisLabel: {
        show: true,
        rotate: 45,
      },
    },
    yAxis: {
      type: "value",
      interval: 1,
      name: "Sold",
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 16
      },
      nameGap: 30
    },
    series: [
      {
        data: bookRank.slice(0, 5).map((info) => info[1]),
        type: "bar",
        color: "#a2d2ff",
        // smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };

  return <ReactEcharts option={options} style={{ height: "520px" }} />;
};
export default OrderGraph;
