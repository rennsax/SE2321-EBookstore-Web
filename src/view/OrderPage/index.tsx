import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { CircularProgress } from "@mui/material";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { useQuery } from "@tanstack/react-query";
import "css/OrderPage.css";
import { useContext } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { getAllOrderInfo } from "service/OrderService";
import config from "service/configuration.json";
import { UserInfoContext } from "view/HomePage";
import OrderInfo from "./OrderInfo";

const getOrderIdFromLocation = (location: string): string => {
  const index = location.lastIndexOf("/");
  return location.substring(index + 1);
};

export default function OrderPage() {
  const userId = useContext(UserInfoContext)?.id;

  const { data: orderInfoList, isSuccess } = useQuery({
    queryKey: ["order", userId],
    queryFn: async () => {
      if (userId === undefined) throw new Error("userId isn't provided yet");
      return await getAllOrderInfo(userId);
    },
    retry: config["ajax.retry.maxTimes"],
    retryDelay: config["ajax.retry.delay"],
    refetchOnMount: false,
  });

  const location = useLocation();
  const nowOrderId = getOrderIdFromLocation(location.pathname);

  if (isSuccess) {
    const routerElementList = orderInfoList.map((orderInfo) => {
      return (
        <Route
          path={`${orderInfo.id}`}
          element={<OrderInfo {...orderInfo} />}
          key={`orderRoute${orderInfo.id}`}
        />
      );
    });

    return (
      <div className="order-page">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="medium" />}
          aria-label="breadcrumb"
          sx={{ fontSize: "18px" }}
        >
          <h4>Cauchy</h4>
          <Link to="/home/orders">All Orders</Link>
          {/^\d+$/.test(nowOrderId) ? (
            <h5 style={{ margin: 0 }}>{nowOrderId}</h5>
          ) : null}
        </Breadcrumbs>
        <Routes>{routerElementList}</Routes>
      </div>
    );
  }
  return (
    <div className="order-page--loading">
      <CircularProgress size={80} />
    </div>
  );
}
