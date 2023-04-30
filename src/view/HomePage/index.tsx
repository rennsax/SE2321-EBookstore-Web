import "css/HomePage.css";

import { createContext, useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import HeaderInfo from "components/HeaderInfo";
import SideBar from "components/SideBar";
import BookDetailPage from "view/BookDetailPage";
import CartPage from "view/CartPage";

import { useQuery } from "@tanstack/react-query";
import { getUserInfo } from "service/UserServer";

export const UserInfoContext = createContext<UserInfo | undefined>(undefined);

function HomePage({ account }: { account: string }) {
  // TODO remove this all!!!

  // handle: when switching routes, scroll to the top
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  const { data: userInfo } = useQuery({
    queryKey: ["userInfo", account],
    queryFn: async () => {
      return await getUserInfo(account);
    },
  });

  return (
    <UserInfoContext.Provider value={userInfo}>
      <div className="home">
        <div className="header">
          <HeaderInfo />
        </div>
        <div className="main">
          <div className="main-container">
            <div className="main__left">
              <SideBar />
            </div>
            <div className="main__hr">
              <hr />
            </div>
            <div className="main__right">
              {/* Routes here */}
              <Routes>
                <Route path="cart" element={<CartPage />} />
                <Route path="bd/:uuid" element={<BookDetailPage />} />
              </Routes>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </UserInfoContext.Provider>
  );
}

export default HomePage;
