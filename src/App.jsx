import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/product/:id" element={<ProductDetail />}/>
        <Route path="/auth" element={<Auth />}/>
        <Route path="/checkout" element={<Checkout />}/>
      </Routes>
    </div>
  );
}


export default App;
