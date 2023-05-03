import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { CircularProgress } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useQuery } from "@tanstack/react-query";
import "css/OrderPage.css";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { getAllOrderInfo } from "service/OrderService";
import { defaultQueryOptions } from "service/queryOptions";
import useUserInfo from "utils/useUserInfo";
import OrderCard from "./OrderCard";
import OrderInfo from "./OrderInfo";

const getOrderIdFromLocation = (location: string): string => {
  const index = location.lastIndexOf("/");
  return location.substring(index + 1);
};

export default function OrderPage() {
  const { id: userId, name } = useUserInfo();

  const { data: orderInfoList, isSuccess } = useQuery({
    queryKey: ["order", userId],
    queryFn: async () => {
      if (userId === undefined) throw new Error("userId isn't provided yet");
      return await getAllOrderInfo(userId);
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
      <Routes>{routerElementList}</Routes>
    </div>
  );
}
