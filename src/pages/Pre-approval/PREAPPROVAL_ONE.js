import React, { useState } from "react";
import employed from "../../assets/images/employed.svg";
import buildings from "../../assets/images/buildings.svg";
import freelancer from "../../assets/images/freelancer.svg";
import axios from "axios";
import Stepper from "react-stepper-horizontal";
const SERVER = "https://payqart-assessment-api.herokuapp.com";

const PREAPPROVAL_ONE = ({
  cartValue,
  updateSubmitting,
  updateStepOneSuccess,
  setStepOneResponse
}) => {
  const [employmentType, setEmploymentType] = useState("Paid employment");
  const [salaryDate, setSalaryDate] = useState("12/06/2021");
  const [existingLoan, updateExistingLoan] = useState(false);
  const [error, updateError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function onStepOneSubmit(employmentType, salaryDate, existingLoan) {
    updateSubmitting(false);
    updateStepOneSuccess(false);
    updateError(false);
    setErrorMsg("");

    if (!cartValue || !employmentType || !salaryDate || existingLoan === null) {
      updateSubmitting(false);
      updateStepOneSuccess(false);
      updateError(true);
      setErrorMsg("Fields cannot be empty");
      return console.log("Fields cannot be empty");
    }

    if (existingLoan === true) {
      updateSubmitting(false);
      updateStepOneSuccess(false);
      updateError(true);
      setErrorMsg("Cannot proceed with existing loan");
      return console.log("Cannot proceed with existing loan");
    }

    const requestObj = { cartValue, employmentType, salaryDate, existingLoan };

    try {
      updateSubmitting(true);
      updateError(false);
      setErrorMsg("");
      const resp = await axios.post(`${SERVER}/preapproval_one`, requestObj);
      const { success, downPayment, monthlyInstallment, shoppingCredit, plan } =
        resp.data;

      if (success) {
        const responseObj = {
          downPayment,
          monthlyInstallment,
          shoppingCredit,
          plan
        };
        updateStepOneSuccess(true);
        setStepOneResponse(responseObj);
        updateSubmitting(false);
      } else {
        updateStepOneSuccess(false);
        updateSubmitting(false);
        updateError(true);
        setErrorMsg("");
      }
    } catch (err) {
      updateStepOneSuccess(false);
      updateSubmitting(false);
      updateError(true);
      setErrorMsg("Network error");
      console.log(error, errorMsg);
    }
  }

  return (
    <div className="w-2/4 h-full select-none" style={{ background: "#fff" }}>
      <div
        className="h-full w-2/4 mx-auto pt-12 pb-8 text-sm flex flex-col"
        style={{ color: "#b4028a" }}
      >
        <div>
          <div className="w-full text-center mb-4 -mt-4">
            <Stepper
              steps={[
                { title: "" },
                { title: "" },
                { title: "" },
                { title: "" }
              ]}
              activeStep={0}
              size={22}
              circleFontSize={10}
              activeColor="#ff005e"
              completeColor="#ff005e"
            />
          </div>
          <h2 className="text-center text-2xl font-semibold">
            What Do You Do?
          </h2>
          <div className="flex justify-between text-center text-xs my-5">
            <div
              className="cursor-pointer"
              style={{ width: "31%" }}
              onClick={() => setEmploymentType("Paid-employment")}
            >
              <div className="shadow-lg rounded-lg w-full h-20 mb-2 flex items-center justify-center">
                <img src={employed} alt="employed" />
              </div>
              <span className="font-semibold w-auto">Paid Employment</span>
            </div>
            <div
              className="cursor-pointer hover:opacity-80 transition-all duration-100 ease-in-out"
              style={{ width: "31%" }}
            >
              <div className="shadow-lg rounded-lg w-full h-20 mb-2 flex items-center justify-center">
                <img src={freelancer} alt="freelancer" />
              </div>
              <span className="break-words">Self Employed/Freelance</span>
            </div>
            <div
              className="cursor-pointer hover:opacity-80 transition-all duration-100 ease-in-out"
              style={{ width: "31%" }}
            >
              <div className="shadow-lg rounded-lg w-full h-20 mb-2 flex items-center justify-center">
                <img src={buildings} className="object-cover" alt="buildings" />
              </div>
              <span>Corporate Organisation</span>
            </div>
          </div>
          <div className="space-y-3 my-5">
            <label>How much do you get paid monthly?</label>
            <div className="w-full shadow-md flex items-center">
              <span
                className="px-2 py-1 text-white"
                style={{
                  background: "#720056",
                  fontSize: "18px"
                }}
              >
                ₦
              </span>
              <input type="text" className="outline-none w-full h-full px-1" />
            </div>
          </div>
          <div className="space-y-3 my-5">
            <label>When is your next salary date?</label>
            <div className="w-full shadow-md flex items-center">
              <input
                type="date"
                className="outline-none w-full h-full px-1"
                placeholder="Select day"
                onChange={(e) => setSalaryDate(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-3 my-5">
            <label>Do you have any existing loan(s)?</label>
            <div className="w-full shadow-md flex items-center py-2">
              <label className="container flex items-center justify-center w-1/2 text-sm text-black">
                <input
                  type="checkbox"
                  className="mr-3 cursor-pointer"
                  onChange={(e) => updateExistingLoan(e.target.checked)}
                />
                <span className="checkmark"></span>
                Yes
              </label>
              <span className="text-gray-300" style={{ fontSize: "1.1rem" }}>
                |
              </span>
              <label className="container flex items-center justify-center w-1/2 text-sm text-black">
                <input
                  type="checkbox"
                  className="mr-3 cursor-pointer"
                  onChange={(e) => updateExistingLoan(e.target.checked)}
                />
                <span className="checkmark"></span>
                No
              </label>
            </div>
          </div>
        </div>
        <button
          className="mx-auto px-8 py-3 rounded-3xl mt-5 focus:outline-none"
          style={{
            fontSize: "1.1rem",
            color: "rgba(255, 80, 144, 1)",
            border: "2px solid rgba(255, 128, 175, 1)"
          }}
          onClick={() => {
            onStepOneSubmit(employmentType, salaryDate, existingLoan);
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default PREAPPROVAL_ONE;
