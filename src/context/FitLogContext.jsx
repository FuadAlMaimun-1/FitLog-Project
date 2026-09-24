"use client";
import { createContext, useContext, useState } from "react";
export const FitLogContext = createContext(null);

const FitLogProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);


  const togglePlan = (item) => {
    const isExist = plan.find((i) => i.id === item.id);

    if (isExist) {
      setPlan(plan.filter((i) => i.id !== item.id));
      return;
    }

    setPlan([...plan, item]);
  };


  const toggleSaved = (item) => {
    const isExist = saved.find((i) => i.id === item.id);

  
    if (isExist) {
      setSaved(saved.filter((i) => i.id !== item.id));
      return;
    }

    setSaved([...saved, item]);
  };

  const shareData = {
    plan,
    saved,
    togglePlan,
    toggleSaved,
  };

  return (
    <FitLogContext.Provider value={shareData}>
      {children}
    </FitLogContext.Provider>
  );
};

export const useFitLog = () => {
  const context = useContext(FitLogContext);

  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }

  return context;
};

export default FitLogProvider;