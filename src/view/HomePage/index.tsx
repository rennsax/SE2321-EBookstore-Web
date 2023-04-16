import "css/HomePage.css";

import React, { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";

import SideBar from "components/SideBar";
import CartPage from "view/CartPage";
import BookDetailPage from "view/BookDetailPage";
import HeaderInfo from "components/HeaderInfo";
import sendAjax from "utils/ajax";

import configurations from "config/front.json";

export const BookInfoListContext = React.createContext<BookContent[]>([]);

// Profile bar control
const hideProfile = (e: ButtonEvent) => {
  if (e.target === document.getElementById("active-profile")) return;
  const profile = document.getElementById("profile-bar");
  if (profile?.contains(e.target as Node))
    profile.classList.remove("profile-bar--display");
};

function HomePage() {
  // state: the books in cart
  const [booksInCart, setBooksInCart] = React.useState<BookInCart[]>([
    { bookID: "csapp", count: 1 },
    { bookID: "core_java", count: 1 },
  ]);

  // handle: when switch routes, scroll to the top
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [pathname]);

  // handle: send ajax, receive the json and provide it as a context
  // I used to try to use reducer hook, ending to find that `useReducer` doesn't support async function
  const [bookInfoList, setBookInfoList] = React.useState<BookContent[]>([]);

  useEffect(() => {
    let times: number = configurations["ajax.maxTryTimes"];
    let isSuccess = false;
    while (!isSuccess && times--) {
      sendAjax<BookContent[]>("GET", "http://127.0.0.1/books")
        .then((data) => {
          setBookInfoList(data); // just update, i.e. alter
          isSuccess = true;
        })
        .catch((reason) => {
          console.warn(reason);
        });
    }
  }, []);

  console.log("rendered!"); // TODO debug
  return (
    <BookInfoListContext.Provider value={bookInfoList}>
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
                  path="bd/:name"
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
    </BookInfoListContext.Provider>
  );
}

export default HomePage;
