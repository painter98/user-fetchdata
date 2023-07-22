import './App.css';
import Register from './components/register';
import {Route,Routes} from 'react-router-dom';
import Data from './components/Data';

function App() {

  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<Register/>}/>
      {
        localStorage.getItem('currUser')?
         <Route path='/data' element={<Data/>}/>
         :''
      }
     </Routes>
    </div>
  );
}

export default App;
