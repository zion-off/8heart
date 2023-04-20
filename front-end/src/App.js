import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from './pages/welcome';
import Login from './pages/login';
import Ranking from './pages/ranking';
import Home from './pages/home';
import Register from './pages/signup';
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/ranking" element={<Ranking/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
