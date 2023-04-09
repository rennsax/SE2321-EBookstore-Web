import 'css/HomePage.css';

import React, { useEffect } from 'react';
import { Routes, Route, Outlet, useLocation } from 'react-router-dom';

import { SideBar } from 'components/SideBar';
import CartPage from 'view/CartPage';
import BookDetailPage from 'view/BookDetailPage';
import HeaderInfo from 'components/HeaderInfo';
import { sendAjax } from 'utils/ajax';

export const BookInfoListContext = React.createContext<BookContent[] | undefined>(undefined);

function HomePage() {

  // Profile bar control
  const hideProfile = (e: React.SyntheticEvent | Event) => {
    if (e.target === document.getElementById('active-profile'))
      return;
    let profile = document.getElementById('profile-bar');
    if (profile && !profile.contains(e.target as any))
      profile.classList.remove('profile-bar--display');
  };

  // state: the books in cart
  const [booksInCart, setBooksInCart] = React.useState<BookInCart[]>([
    { bookID: "csapp", count: 1 },
    { bookID: "core_java", count: 1 }
  ]);

  // handle: when switch routes, scroll to the top
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "auto"
    });
  }, [pathname]);

  // handle: send ajax, receive the json and provide it as a context
  const [bookContentList, setBookContentList] = React.useState<BookContent[]>();
  useEffect(() => {
    if (bookContentList !== undefined) {
      return;
    }
    console.log("send ajax!");
    sendAjax<BookContent[]>("GET", "http://127.0.0.1:8080/book-info").then(data => {
      setBookContentList(data);
    }).catch(reason => {
      console.warn(reason);
    })
  }, []);


  return (
    <BookInfoListContext.Provider value={bookContentList}>
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
                <Route path="cart" element={<CartPage booksInCart={booksInCart} setBooksInCart={setBooksInCart} />} />
                <Route path="bd/:name" element={<BookDetailPage booksInCart={booksInCart} setBooksInCart={setBooksInCart} />} />
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