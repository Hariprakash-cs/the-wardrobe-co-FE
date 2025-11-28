// Logo import removed
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Productdescscreen from "./screens/Productdescscreen";
import Cartscreen from "./screens/Cartscreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import Ordersscreen from "./screens/Ordersscreen";
import Orderinfo from "./screens/Orderinfo";
import Profilescreen from "./screens/Profilescreen";
// Admin screens removed - products now managed in Contentstack CMS

function App() {
  return (
    <div className="App">
      <Navbar />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homescreen />} />
          <Route path="/home" element={<Homescreen />} />

          <Route path="/product/:id" element={<Productdescscreen />} />

          <Route path="/cart" element={<Cartscreen />} />

          <Route path="/register" element={<Registerscreen />} />

          <Route path="/login" element={<Loginscreen />} />

          <Route path="/orders" element={<Ordersscreen />} />

          <Route path="/orderinfo/:orderid" element={<Orderinfo />} />

          <Route path="/profile" element={<Profilescreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
