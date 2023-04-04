import 'css/HomePage.css';

import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { SideBar } from 'components/SideBar';
import HeaderInfo from 'components/HeaderInfo';

function HomePage() {

  const hideProfile = (e) => {
    if (e.target === document.getElementById('active-profile'))
      return;
    let profile = document.getElementById('profile-bar');
    if (!profile.contains(e.target))
      profile.classList.remove('profile-bar--display');
  };

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant"
    });
  }, [pathname]);

  return (
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
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;