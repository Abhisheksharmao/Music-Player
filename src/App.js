import './App.css';
import Home from './Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Stream from './stream';
import Notfound from './notfound';
import Login from './login';
/* import Login from './components/login'; */

function App() {
  return (
    <div className="App">
{/*       <Login/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}>home</Route>
          <Route path="/home" element={<Home />}>home</Route>
          <Route path='/stream' element={<Stream />}></Route>
          <Route path='*' element={<Notfound />}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
