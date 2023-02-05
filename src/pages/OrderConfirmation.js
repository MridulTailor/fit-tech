import React, { useState } from "react";
import { ethers } from "ethers";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
const OrderConfirmation = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const location = useLocation();
  const product = location.state?.product;
  const connectWallet = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          // console.log(accounts);
          accountChanged(accounts[0]);
        });
    } else {
      console.log("No ethereum object found");
    }
  };
  const accountChanged = (account) => {
    setDefaultAccount(account);
    getUserBalance(account);
  };
  const getUserBalance = (accountAddress) => {
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_getBalance",
          params: [String(accountAddress), "latest"],
        })
        .then((balance) => {
          // console.log(balance);
          setUserBalance(ethers.utils.formatEther(balance));
        });
    } else {
      console.log("No ethereum object found");
    }
  };
  async function sendTransaction() {
    let sales_value = product.price * product.quantity * 1000000000000000;
    let params = [
      {
        from: "0xF57551b4BE8C0734a9C839Fd2023E7b8602Ca876",
        to: "0xDF1914C692eFe308e1956c5FAc594DA219802807",
        gas: Number(21000).toString(16),
        gasPrice: Number(250000).toString(16),
        value: Number(1000000000000000).toString(16),
      },
    ];
    let result = await window.ethereum
      .request({
        method: "eth_sendTransaction",
        params,
      })
      .catch((error) => {
        console.log(error);
      });
  }
  const handleSubmit = () => {
    if (window.ethereum) {
      console.log("initiating transaction...");
      connectWallet();
      sendTransaction();
    } else {
      console.log("no ethereum object found");
    }
  };
  return (
    <Layout
      children={
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-medium text-center text-gray-800 mb-8">
            Order Confirmation
          </h1>
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <h2 className="text-lg font-medium text-gray-800 mb-2">
                Order Number: {product.id}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Placed on: {new Date(product.date).toLocaleString()}
              </p>
              <table className="table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2">Product</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={product.productId}>
                    <td className="px-4 py-2">{product.productName}</td>
                    <td className="px-4 py-2">${product.price}</td>
                    <td className="px-4 py-2">{product.quantity}</td>
                    <td className="px-4 py-2">
                      ${product.price * product.quantity}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center mt-4">
                <button
                  className="bg-[#008dff] hover:bg-[#008dff] text-white font-medium py-2 px-4 rounded-full"
                  onClick={handleSubmit}
                >
                  Confirm Order
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default OrderConfirmation;
