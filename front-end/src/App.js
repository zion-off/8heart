import { BrowserRouter, Routes, Route } from "react-router-dom";
import SetCookie from "./pages/SetCookie"
import GetCookie from "./pages/GetCookie"
import SetLocalStorage from "./pages/SetLocalStorage"
import GetLocalStorage from "./pages/GetLocalStorage"
import Protected from "./pages/Protected"
import Welcome from './pages/welcome';
import Login from './pages/login';
import Ranking from './pages/ranking';
import Home from './pages/home';
import Register from './pages/signup';
import SignupMessage from "./pages/signupmessage";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/set-cookie" element={<SetCookie />} />
          <Route path="/get-cookie" element={<GetCookie />} />
          <Route path="/set-local-storage" element={<SetLocalStorage />} />
          <Route path="/get-local-storage" element={<GetLocalStorage />} />
          <Route path="/protected" element={<Protected />} />
          <Route path="/" element={<Welcome/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/users/:uniqueLink" element={<Ranking/>}></Route>
          <Route path="/home" element={<Home/>}></Route>
          <Route path="/register" element={<Register/>}></Route>
          <Route path="/signupmessage" element={<SignupMessage/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
