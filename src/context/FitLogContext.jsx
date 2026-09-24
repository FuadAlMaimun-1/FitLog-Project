"use client";

import { createContext, useContext, useState } from "react";

export const FitLogContext = createContext(null);

const FitLogProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  // Add / Remove from today's plan
  const togglePlan = (item) => {
    const isExist = plan.find((i) => i.id === item.id);

    // Remove
    if (isExist) {
      setPlan(plan.filter((i) => i.id !== item.id));
      return;
    }

    // Maximum 5 workouts
    if (plan.length >= 5) {
      return;
    }

    // Add
    setPlan([...plan, item]);
  };

  // Add / Remove from saved
  const toggleSaved = (item) => {
    const isExist = saved.find((i) => i.id === item.id);

    // Remove
    if (isExist) {
      setSaved(saved.filter((i) => i.id !== item.id));
      return;
    }

    // Add
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