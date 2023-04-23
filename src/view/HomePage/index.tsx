import "css/HomePage.css";

import React, { createContext, useEffect } from "react";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import HeaderInfo from "components/HeaderInfo";
import SideBar from "components/SideBar";
import BookDetailPage from "view/BookDetailPage";
import CartPage from "view/CartPage";

import config from "config/front.json";

export const UserIdContext = createContext<number>(1);

// Profile bar control
const hideProfile = (e: ButtonEvent) => {
  if (e.target === document.getElementById("active-profile")) return;
  const profile = document.getElementById("profile-bar");
  if (profile?.contains(e.target as Node))
    profile.classList.remove("profile-bar--display");
};

function HomePage() {
  // state: the books in cart
  // TODO synchronize with backend
  const [booksInCart, setBooksInCart] = React.useState<BookInCart[]>(
    config["cart.originalBooks"]
  );

  // handle: when switch routes, scroll to the top
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  return (
    <UserIdContext.Provider value={1}>
      <div className="home" onClick={hideProfile}>
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
                <Route
                  path="cart"
                  element={
                    <CartPage
                      booksInCart={booksInCart}
                      setBooksInCart={setBooksInCart}
                    />
                  }
                />
                <Route
                  path="bd/:uuid"
                  element={
                    <BookDetailPage
                      booksInCart={booksInCart}
                      setBooksInCart={setBooksInCart}
                    />
                  }
                />
              </Routes>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </UserIdContext.Provider>
  );
}

export default HomePage;
