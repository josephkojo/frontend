import './App.css';
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import User from './Pages/User';
import ActiveKey from './Pages/ActiveKey';
import ForgotPassword from './Pages/ForgotPassword';
import Code from './Pages/Code';
import ChangePassword from './Pages/ChangePassword';


import Admin from "./Pages/Admin";

import Nav from "./Pages/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <main className="form-signin w-100 m-auto">
          <Routes>
          
            <Route path="/" element={<Login />} />
            <Route path="/s/:userId" element={<User />} />
            <Route path="/ss" element={<User />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/soluble" element={<ActiveKey />} />
            <Route path="/forgotPassword" element={<ForgotPassword />} />
            <Route path="/code" element={<Code />} />
            <Route path="/changePassword" element={<ChangePassword />} />
            

            
            
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
