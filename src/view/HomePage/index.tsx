import "css/HomePage.css";

import React, { useEffect } from "react";
import { Routes, Route, Outlet, useLocation } from "react-router-dom";

import SideBar from "components/SideBar";
import CartPage from "view/CartPage";
import BookDetailPage from "view/BookDetailPage";
import HeaderInfo from "components/HeaderInfo";
import myFetch, { FetchProps } from "utils/ajax";
import timer from "utils/timer";

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
  const [booksInCart, setBooksInCart] = React.useState<BookInCart[]>(
    configurations["cart.originalBooks"]
  );

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
    const fetchBookPops: FetchProps = {
      method: "GET",
      url: "http://localhost:8080/book?number=8",
    };

    let fetching = true;
    const requestBook = async () => {
      while (fetching && times--) {
        await timer(1000);
        try {
          const data: BookContent[] = await myFetch(fetchBookPops).then(
            (res) => {
              return res.json();
            }
          );
          setBookInfoList(data);
          fetching = false;
        } catch (err) {
          console.error(err);
        }
      }
    };

    requestBook();

    return () => {
      fetching = false;
    };
  }, []);

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
    </BookInfoListContext.Provider>
  );
}

export default HomePage;
