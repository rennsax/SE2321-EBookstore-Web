import { useQuery } from "@tanstack/react-query";
import { Dayjs } from "dayjs";
import { EChartsOption } from "echarts";
import ReactEcharts from "echarts-for-react";
import React from "react";
import { getAllUsers } from "service/Admin/UserServer";
import { getUserStatistic } from "service/UserServer";
import { defaultQueryOptions } from "service/defaultQueryOptions";

interface UserGraphProps {
  isFilter: boolean;
  beginDate?: Dayjs;
  endDate?: Dayjs;
}

const UserGraph: React.FC<UserGraphProps> = ({
  isFilter,
  beginDate,
  endDate,
}) => {
  const { data: userRank, isSuccess } = useQuery<Array<[string, number]>>({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: [
      "user information for statistic",
      ...(isFilter ? [isFilter, beginDate, endDate] : [isFilter]),
    ],
    queryFn: async (): Promise<Array<[string, number]>> => {
      const users = await getAllUsers();
      const statisticList: UserStatistic[] = [];
      for (const user of users) {
        statisticList.push(await getUserStatistic(user.id, beginDate, endDate));
      }
      const result: Array<[string, number]> = statisticList.map((stat) => [
        users.find((u) => u.id === stat.userId)?.name as string,
        parseFloat(stat.totalCost),
      ]);
      return result.slice(0, 5).sort((a, b) => b[1] - a[1]);
    },
    ...defaultQueryOptions,
    refetchOnWindowFocus: false,
  });

  if (!isSuccess) {
    return null;
  }

  const options: EChartsOption = {
    grid: { top: 8, right: 8, bottom: 200, left: 60 },
    xAxis: {
      type: "category",
      data: userRank.map((o) => o[0]),
    },
    yAxis: {
      type: "value",
      name: "Cost",
      nameLocation: "middle",
      nameTextStyle: {
        fontSize: 16
      },
      nameGap: 40
    },
    series: [
      {
        data: userRank.map((o) => o[1]),
        type: "bar",
        color: "#ffafcc",
        // smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
    },
  };
  return <ReactEcharts option={options} style={{ height: "520px" }} />;
};

export default UserGraph;
