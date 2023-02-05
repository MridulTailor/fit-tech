import React from "react";
import Home from "./pages/Home";
import Products from "./pages/Products";
import OrderConfirmation from "./pages/OrderConfirmation";
import About from "./pages/About";
import CaloryBurntForm from "./pages/CaloryBurntForm";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import PredictFace from "./pages/PredictFace";
import WebCam from "./pages/Ai_trainer";

function App() {
  return (
    <div className="App bg-[url('../public/bg.png')] bg-no-repeat bg-cover bg-center bg-fixed">
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="home" element={<Home />} />
        <Route path="predict-face" element={<PredictFace />} />
        <Route path="prediction" element={<CaloryBurntForm />} />
        <Route path="products" element={<Products />} />
        <Route path="order-confirmation" element={<OrderConfirmation />} />
        <Route path="ai-trainer" element={<WebCam />} />
        <Route path="about" element={<About />} />
      </Routes>
    </div>
  );
}
export default App;
