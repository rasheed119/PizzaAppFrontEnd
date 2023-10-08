import "./App.css";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Cart from "./Pages/Cart";
import Verify from "./Pages/Verify";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import Checkout from "./Pages/Checkout";
import Ordereditem from "./Pages/Ordereditem";
import Myorders from "./Pages/Myorders";
import Nopagefound from "./Pages/Nopagefound";
import Editpizza from "./Pages/Editpizza";
import Addpizza from "./Pages/Addpizza";

function App() {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/addpizza" element={<Addpizza />} />
      <Route path="/editpizza/:id" element={<Editpizza />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Signup />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/verify/:email" element={<Verify />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/ordereditem" element={<Ordereditem />} />
      <Route path="/myorders" element={<Myorders />} />
      <Route path="*" element={<Nopagefound />} />
    </Routes>
  );
}

export default App;
