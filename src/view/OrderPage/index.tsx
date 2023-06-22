import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { CircularProgress } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useQuery } from "@tanstack/react-query";
import TimeFilter from "components/TimeFilter";
import "css/OrderPage.css";
import dayjs, { Dayjs } from "dayjs";
import React, { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { getOrderInfoByUserId } from "service/OrderService";
import { defaultQueryOptions } from "service/defaultQueryOptions";
import useUserInfo from "utils/useUserInfo";
import OrderCard from "./OrderCard";
import OrderInfo from "./OrderInfo";

const getOrderIdFromLocation = (location: string): string => {
  const index = location.lastIndexOf("/");
  return location.substring(index + 1);
};

interface OrderListProps {
  isFilter: boolean;
  beginDate: Dayjs;
  endDate: Dayjs;
  keyword: string;
}

const OrderList: React.FC<OrderListProps> = ({
  isFilter,
  beginDate,
  endDate,
  keyword,
}) => {
  const { id: userId } = useUserInfo();
  const { data: orderInfoList, isSuccess } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["order", userId, isFilter && [beginDate, endDate, keyword]],
    queryFn: async () => {
      if (userId === undefined) throw new Error("userId isn't provided yet");
      if (!isFilter) return await getOrderInfoByUserId(userId);
      return await getOrderInfoByUserId(
        userId,
        keyword,
        beginDate as Dayjs,
        endDate as Dayjs
      );
    },
    ...defaultQueryOptions,
  });

  if (!isSuccess) {
    return (
      <div className="order-page--loading">
        <CircularProgress size={80} />
      </div>
    );
  }

  const routerElementList = orderInfoList.map((orderInfo) => {
    return (
      <Route
        path={`${orderInfo.id}`}
        element={<OrderInfo {...orderInfo} />}
        key={`orderRoute${orderInfo.id}`}
      />
    );
  });

  const orderCardList: JSX.Element[] = orderInfoList.map((orderInfo) => {
    const { id: orderNumber, time, state } = orderInfo;
    const props = { orderNumber, time, state };
    return <OrderCard {...props} key={`order-card${orderNumber}`} />;
  });

  routerElementList.push(
    <Route
      path={""}
      key={"order-navigate"}
      element={<div className="order-card-list">{orderCardList}</div>}
    />
  );

  return <Routes>{routerElementList}</Routes>;
};

export default function OrderPage() {
  const { name } = useUserInfo();
  const [beginDate, setBeginDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [keyword, setKeyword] = useState("");
  const [isFilter, setIsFilter] = useState(false);

  const { pathname } = useLocation();
  const nowOrderId = getOrderIdFromLocation(pathname);

  return (
    <div className="order-page">
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="medium" />}
        aria-label="breadcrumb"
        sx={{ fontSize: "18px" }}
      >
        <h4>{name}</h4>
        <Link to="/home/orders">All Orders</Link>
        {/^\d+$/.test(nowOrderId) ? (
          <h5 style={{ margin: 0 }}>{`ID ${nowOrderId}`}</h5>
        ) : null}
      </Breadcrumbs>
      <Routes>
        <Route
          path=""
          element={
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
          }
        />
      </Routes>
      <OrderList
        {...{
          isFilter,
          keyword,
          beginDate: beginDate as Dayjs,
          endDate: endDate as Dayjs,
        }}
      />
    </div>
  );
}
