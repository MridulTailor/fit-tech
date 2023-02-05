import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const dataPath = "./products.json";
    fetch(dataPath)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error(err));
  }, []);
  const handleBuyNow = (product) => {
    // add the product to the cart
    // ...

    // navigate to the OrderConfirmation page
    navigate("/order-confirmation", { state: { product } });
  };

  return (
    <Layout
      children={
        <div className="space-y-2 mt-5">
          <h1 className="text-3xl font-medium text-center text-gray-800 mb-8">
            Our Products
          </h1>
          <div className="grid grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full"
                />
                <div className="px-6 py-4">
                  <h2 className="text-lg font-medium text-gray-800 mb-2">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleBuyNow(product)}
                      className="px-4 py-2 font-medium text-white bg-[#008dff] rounded-lg hover:bg-[#008dff]"
                    >
                      Buy Now
                    </button>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      }
    />
  );
};

export default Products;
