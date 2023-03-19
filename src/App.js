import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { NestedList } from './components/SideBar';
import HeaderInfo from './components/HeaderInfo';
import CartPage from './view/CartPage';
import BookPage from './view/BookPage';
import OrderPage from './view/OrderPage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <HeaderInfo />
          <NestedList />
          <Route path="/books" component={BookPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/orders" component={OrderPage} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
