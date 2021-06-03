import React, { useEffect, useState } from "react";
import { ArrowLeft } from "react-feather";
import axios from "axios";
import Stepper from "react-stepper-horizontal";

const SERVER = "https://payqart-assessment-api.herokuapp.com";

const PREAPPROVAL_TWO = ({
  cartValue,
  stepOneResponse,
  setStepOneResponse,
  updateStepOneSuccess
}) => {
  const [plan, setPlan] = useState(null);
  const [downPayment, setDownPayment] = useState(null);
  const [shoppingCredit, setShoppingCredit] = useState(null);
  const [monthlyInstallment, setMonthlyInstallment] = useState(null);
  const [customizedDownPayment, setCustomizedDownPayment] = useState("");

  const minDownPayment = stepOneResponse.downPayment;

  useEffect(() => {
    setPlan(stepOneResponse.plan);
    setDownPayment(stepOneResponse.downPayment);
    setShoppingCredit(stepOneResponse.shoppingCredit);
    setMonthlyInstallment(stepOneResponse.monthlyInstallment);
  }, [
    stepOneResponse.plan,
    stepOneResponse.downPayment,
    stepOneResponse.shoppingCredit,
    stepOneResponse.monthlyInstallment
  ]);

  async function planHandler(num) {
    const requestObj = { cartValue, plan: num, downPayment };
    try {
      const resp = await axios.post(`${SERVER}/customize`, requestObj);
      const { downPayment, shoppingCredit, monthlyInstallment, plan } =
        resp.data;
      setPlan(plan);
      setDownPayment(downPayment);
      setShoppingCredit(shoppingCredit);
      setMonthlyInstallment(monthlyInstallment);
    } catch (err) {
      console.log(err);
    }
  }

  function pageBackHandler() {
    updateStepOneSuccess(false);
    setStepOneResponse({});
  }

  function customizedDownPaymentInputHandler(e) {
    const re = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:(\.|,)\d+)?$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setCustomizedDownPayment(e.target.value);
    }
  }

  async function customizedDownPaymentFormHandler(e) {
    e.preventDefault();

    if (
      !customizedDownPayment ||
      customizedDownPayment >= cartValue ||
      customizedDownPayment < minDownPayment
    ) {
      return;
    }

    const requestObj = { cartValue, plan, downPayment: customizedDownPayment };
    try {
      const resp = await axios.post(`${SERVER}/customize`, requestObj);
      const { downPayment, shoppingCredit, monthlyInstallment, plan } =
        resp.data;
      setPlan(plan);
      setDownPayment(downPayment);
      setShoppingCredit(shoppingCredit);
      setMonthlyInstallment(monthlyInstallment);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      className="w-2/4 h-full px-2 select-none"
      style={{ background: "#fff" }}
    >
      <div
        className="h-full mx-auto pt-12 pb-8 text-xs flex flex-col justify-between"
        style={{ color: "#b4028a", width: "80%" }}
      >
        <div className="relative flex flex-col items-center justify-between">
          <span
            className="flex items-center cursor-pointer absolute left-0"
            style={{ color: "#ff005e" }}
          >
            <ArrowLeft
              className="mr-1 cursor-pointer"
              size="19"
              onClick={pageBackHandler}
            />
            Back
          </span>
          <div className="w-1/2 text-center mb-4 -mt-6">
            <Stepper
              steps={[
                { title: "" },
                { title: "" },
                { title: "" },
                { title: "" }
              ]}
              activeStep={1}
              size={22}
              circleFontSize={10}
              activeColor="#ff005e"
              completeColor="#ff005e"
            />
          </div>

          <div className="w-full">
            <h2 className="text-center text-2xl font-semibold mt-6 mb-4">
              Choose Your Plan
            </h2>
            <div className="flex items-center justify-between w-full">
              <div
                className={
                  plan === 1
                    ? "relative plan-select h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                    : "relative h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                }
                style={{ width: "15%", color: "#720056" }}
                onClick={() => planHandler(1)}
              >
                <span
                  className={
                    plan === 1
                      ? "h-2 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                      : "h-3 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                  }
                  style={{ background: "#fd4753" }}
                ></span>
                <span className="mt-2" style={{ fontSize: "10px" }}>
                  Agressive
                </span>
                <span
                  className="font-semibold my-2"
                  style={{ fontSize: "2.5rem" }}
                >
                  1
                </span>
                <span style={{ fontSize: "10px" }}>Month</span>
              </div>
              <div
                className={
                  plan === 2
                    ? "relative plan-select h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                    : "relative h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                }
                style={{ width: "15%", color: "#720056" }}
                onClick={() => planHandler(2)}
              >
                <span
                  className={
                    plan === 2
                      ? "h-2 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                      : "h-3 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                  }
                  style={{ background: "#ff51f3" }}
                ></span>
                <span className="mt-2" style={{ fontSize: "10px" }}>
                  Stretching
                </span>
                <span
                  className="font-semibold my-2"
                  style={{ fontSize: "2.5rem" }}
                >
                  2
                </span>
                <span style={{ fontSize: "10px" }}>Months</span>
              </div>
              <div
                className={
                  plan === 3
                    ? "relative plan-select h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                    : "relative h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                }
                style={{ width: "15%", color: "#720056" }}
                onClick={() => planHandler(3)}
              >
                <span
                  className={
                    plan === 3
                      ? "h-2 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                      : "h-3 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                  }
                  style={{ background: "#6751ff" }}
                ></span>
                <span className="mt-2" style={{ fontSize: "10px" }}>
                  Focused
                </span>
                <span
                  className="font-semibold my-2"
                  style={{ fontSize: "2.5rem" }}
                >
                  3
                </span>
                <span style={{ fontSize: "10px" }}>Months</span>
              </div>
              <div
                className={
                  plan === 4
                    ? "relative plan-select h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                    : "relative h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                }
                style={{ width: "15%", color: "#720056" }}
                onClick={() => planHandler(4)}
              >
                <span
                  className={
                    plan === 4
                      ? "h-2 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                      : "h-3 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                  }
                  style={{ background: "#51ffed" }}
                ></span>
                <span className="mt-2" style={{ fontSize: "10px" }}>
                  Casual
                </span>
                <span
                  className="font-semibold my-2"
                  style={{ fontSize: "2.5rem" }}
                >
                  4
                </span>
                <span style={{ fontSize: "10px" }}>Months</span>
              </div>
              <div
                className={
                  plan === 5
                    ? "relative plan-select h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                    : "relative h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                }
                style={{ width: "15%", color: "#720056" }}
                onClick={() => planHandler(5)}
              >
                <span
                  className={
                    plan === 5
                      ? "h-2 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                      : "h-3 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                  }
                  style={{ background: "#ffae51" }}
                ></span>
                <span className="mt-2" style={{ fontSize: "10px" }}>
                  Mid
                </span>
                <span
                  className="font-semibold my-2"
                  style={{ fontSize: "2.5rem" }}
                >
                  5
                </span>
                <span style={{ fontSize: "10px" }}>Months</span>
              </div>
              <div
                className={
                  plan === 6
                    ? "relative plan-select h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                    : "relative h-20 py-1 rounded-xl shadow-lg cursor-pointer flex flex-col items-center justify-between hover:opacity-80 transition-all duration-75 ease-in-out"
                }
                style={{ width: "15%", color: "#720056" }}
                onClick={() => planHandler(6)}
              >
                <span
                  className={
                    plan === 6
                      ? "h-2 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                      : "h-3 text-xs w-full absolute top-0 z-10 rounded-tl-xl rounded-tr-xl"
                  }
                  style={{ background: "#6dff51" }}
                ></span>
                <span className="mt-2" style={{ fontSize: "10px" }}>
                  Gentle
                </span>
                <span
                  className="font-semibold my-2"
                  style={{ fontSize: "2.5rem" }}
                >
                  6
                </span>
                <span style={{ fontSize: "10px" }}>Months</span>
              </div>
            </div>
          </div>
          <div className="mt-11 w-full h-auto">
            <h2 className="text-center text-2xl font-semibold mb-1">
              Payment Breakdown
            </h2>
            <div className="w-full shadow-lg rounded-xl flex items-center justify-between">
              <div className="h-full w-3/5 px-10 flex items-center justify-between">
                <ul className="space-y-3 text-sm font-medium">
                  <li>Shopping Credit</li>
                  <li>Down Payment</li>
                  <li>Monthly Installment</li>
                  <li>Tenure</li>
                </ul>
                <div class="vertical"></div>
                <ul className="space-y-3 text-sm">
                  <li className="font-semibold">
                    ₦ {parseFloat(shoppingCredit).toLocaleString("en")}
                  </li>
                  <li className="font-semibold">
                    ₦ {parseFloat(downPayment).toLocaleString("en")}
                  </li>
                  <li className="font-semibold">
                    ₦ {parseFloat(monthlyInstallment).toLocaleString("en")}
                  </li>
                  <li className="font-semibold">
                    {plan > 1 ? `${plan} months` : `${plan} month`}
                  </li>
                </ul>
              </div>
              <div className="w-2/5 rounded-xl p-6 h-full customized-block flex flex-col items-center justify-between text-center">
                <span>Customize down payments</span>
                <div className="space-y-3 my-4 ">
                  <div className="w-full flex items-center">
                    <span
                      className="px-2 py-2 text-white"
                      style={{
                        background: "#fff",
                        color: "#720056",
                        fontSize: "18px"
                      }}
                    >
                      ₦
                    </span>
                    <input
                      type="text"
                      className="outline-none w-full h-full px-1 py-2 font-semibold"
                      onChange={customizedDownPaymentInputHandler}
                      value={customizedDownPayment}
                      style={{ color: "#720056" }}
                    />
                  </div>

                  <button
                    className="border border-white px-3 py-1 rounded-xl focus:outline-none hover:opacity-80 transition-all duration-75 ease-in-out"
                    onClick={customizedDownPaymentFormHandler}
                  >
                    Update Breakdown
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            className="mx-auto my-12 px-8 py-3 rounded-3xl outline-none focus:outline-none"
            style={{
              fontSize: "1.1rem",
              color: "rgba(255, 80, 144, 1)",
              border: "2px solid rgba(255, 128, 175, 1)"
            }}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default PREAPPROVAL_TWO;
