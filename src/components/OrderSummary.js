import React from "react";
import model from "../assets/images/model.jpg";
import { ArrowLeft } from "react-feather";
import phones from "../assets/images/phones.png";
import shirt from "../assets/images/shirt.png";
import logo from "../assets/images/logo.png";

const OrderSummary = () => {
  return (
    <div className="w-2/4 w- bg-green-50 h-full flex items-center justify-between">
      <div className="w-2/4 h-full relative">
        <img src={model} className="object-cover h-full relative" alt="model" />
        <div
          className="absolute w-full h-full top-0 text-white flex flex-col justify-between px-7 pt-12 pb-8"
          style={{ background: "rgba(170, 19, 75, 0.65)" }}
        >
          <span className="flex items-center">
            <ArrowLeft className="mr-1" size="19" />
            Back To Store
          </span>
          <img className="mx-auto" src={logo} alt="logo" />
          <ul className="list-disc list-inside text-sm">
            <li>
              <span className="relative" style={{ left: "-10px" }}>
                Get pre-approved instantly.
              </span>
            </li>
            <li>
              <span className="relative" style={{ left: "-10px" }}>
                Spread payment for up to six months.
              </span>
            </li>
            <li>
              <span className="relative" style={{ left: "-10px" }}>
                Provide some basic information to get started.
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-2/4 bg-gray-200 h-full px-9 pt-12 pb-8">
        <h4 className="uppercase mb-7 text-sm">Order summary</h4>
        <div className="bg-white shadow-lg rounded-lg p-4 text-sm text-gray-500">
          <ul className="space-y-4">
            <li className="flex items-center">
              <div
                className="bg-white shadow-md rounded-lg flex items-center justify-center"
                style={{ height: "90px", width: "80px" }}
              >
                <img src={phones} alt="cart-item" />
              </div>
              <div className="flex flex-col ml-3 text-xs">
                <span>Meeysoo p45 pro</span>
                <span>₦67,900</span>
                <span>Qty: 1</span>
              </div>
            </li>
            <li className="flex items-center">
              <div
                className="bg-white shadow-md rounded-lg flex items-center justify-center"
                style={{ height: "90px", width: "80px" }}
              >
                <img src={shirt} alt="cart-item" />
              </div>
              <div className="flex flex-col ml-3 text-xs">
                <span>Men's Long Sleeve Shirt</span>
                <span>₦12,600</span>
                <span>Qty: 2</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="bg-white shadow-lg mt-5 rounded-lg p-4 flex items-center justify-between text-sm">
          <span className="text-gray-500">Total amount:</span>
          <span>₦80,500</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
