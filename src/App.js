import React, { useState } from "react";

import { OrderSummary } from "./components";
import { PREAPPROVAL_ONE, PREAPPROVAL_TWO } from "./pages";

function App() {
  const [cartValue, setCartValue] = useState(80500);
  const [stepOneSuccess, updateStepOneSuccess] = useState(false);
  const [stepOneResponse, setStepOneResponse] = useState({});
  const [submitting, updateSubmitting] = useState(false);

  return (
    <div className="h-full fixed w-full flex items-center justify-between">
      <OrderSummary setCartValue={setCartValue} />

      {!stepOneSuccess ? (
        <PREAPPROVAL_ONE
          cartValue={cartValue}
          updateSubmitting={updateSubmitting}
          updateStepOneSuccess={updateStepOneSuccess}
          setStepOneResponse={setStepOneResponse}
        />
      ) : (
        <PREAPPROVAL_TWO
          cartValue={cartValue}
          stepOneResponse={stepOneResponse}
          setStepOneResponse={setStepOneResponse}
          updateStepOneSuccess={updateStepOneSuccess}
        />
      )}
    </div>
  );
}

export default App;
