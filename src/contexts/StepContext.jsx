import React, { useState } from "react";

export const StepContext = React.createContext();

export default function StepProvider(props) {
  const [step, setStep] = useState(0);

  return (
    <StepContext.Provider value={{ setStep, step }}>
      {props.children}
    </StepContext.Provider>
  );
}
