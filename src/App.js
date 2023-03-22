import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { SideBar } from './components/SideBar';
import HeaderInfo from './components/HeaderInfo';
import CartPage from './view/CartPage';
import BookPage from './view/BookPage';
import OrderPage from './view/OrderPage';
import { Route, Switch, Redirect } from 'react-router-dom';
import ProfilePage from './view/ProfilePage';


function App() {

  const hideProfile = (e) => {
    if (e.target === document.getElementById('active-profile'))
      return;
    let profile = document.getElementById('profile-bar');
    if (!profile.contains(e.target))
      profile.classList.remove('profile-bar--display');
  };

  return (
    <div className="App" onClick={hideProfile}>
      <BrowserRouter>
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
              <Switch>
                <Route path="/books" component={BookPage} />
                <Route path="/cart" component={CartPage} />
                <Route path="/orders" component={OrderPage} />
                <Route path="/profile" component={ProfilePage} />
                <Redirect to="/books" />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
