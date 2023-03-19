import './App.css';
import HeaderInfo from './components/HeaderInfo';
// import SideBar from './components/SideBar';
import MainPart from './components/mainPart';
import { NestedList } from './components/SideBar';

function App() {
  return (
    <div className="App">
      <HeaderInfo/>
      <NestedList/>

      <MainPart/>
    </div>
  );
}

export default App;
