import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useQuery } from "@tanstack/react-query";
import MyDatePicker from "components/MyDatePicker";
import "css/OrderPage.css";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { getAllOrderInfo } from "service/OrderService";
import { defaultQueryOptions } from "service/defaultQueryOptions";
import useUserInfo from "utils/useUserInfo";
import OrderCard from "./OrderCard";
import OrderInfo from "./OrderInfo";

const getOrderIdFromLocation = (location: string): string => {
  const index = location.lastIndexOf("/");
  return location.substring(index + 1);
};

export default function OrderPage() {
  const { id: userId, name } = useUserInfo();
  const [beginDate, setBeginDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [keyword, setKeyword] = useState("");
  const [isFilter, setIsFilter] = useState(false);

  const { data: orderInfoList, isSuccess } = useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["order", userId, isFilter && [beginDate, endDate, keyword]],
    queryFn: async () => {
      if (userId === undefined) throw new Error("userId isn't provided yet");
      if (!isFilter) return await getAllOrderInfo(userId);
      return await getAllOrderInfo(
        userId,
        keyword,
        beginDate as Dayjs,
        endDate as Dayjs
      );
    },
    ...defaultQueryOptions,
  });

  const { pathname } = useLocation();
  const nowOrderId = getOrderIdFromLocation(pathname);

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
      <div className="order-filter">
        <Stack direction={"row"}>
          <MyDatePicker
            value={beginDate}
            onChange={(newValue) => setBeginDate(newValue)}
            label="Begin Day"
            sx={{ mr: "10px" }}
          />
          <MyDatePicker
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            label="End Day"
            sx={{ mr: "20px" }}
          />
          <TextField
            variant="outlined"
            label="Book Contain"
            sx={{ mr: "20px" }}
            value={keyword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setKeyword(e.target.value)
            }
          />
          <Button
            variant={isFilter ? "contained" : "outlined"}
            onClick={() => setIsFilter((f) => !f)}
            sx={{ width: "50px" }}
            className="order-filter__btn"
          >
            {isFilter ? "Reset" : "Filter"}
          </Button>
        </Stack>
      </div>
      <Routes>{routerElementList}</Routes>
    </div>
  );
}
