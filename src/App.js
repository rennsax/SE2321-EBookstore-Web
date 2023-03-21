import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { SideBar } from './components/SideBar';
import HeaderInfo from './components/HeaderInfo';
import CartPage from './view/CartPage';
import BookPage from './view/BookPage';
import OrderPage from './view/OrderPage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="header">
          <HeaderInfo />
        </div>
        <div className="main">
          <div className="main-container clearfix">
            <SideBar />
            <Route path="/books" component={BookPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/orders" component={OrderPage} />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
