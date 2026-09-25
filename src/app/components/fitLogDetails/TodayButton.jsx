"use client";
import React from "react";
import { toast } from "react-toastify";
import { useFitLog } from "@/context/FitLogContext";

const TodayButton = ({ workout }) => {
  const { plan, togglePlan } = useFitLog();

  const handleAddToPlan = () => {
    const isExist = plan.find((item) => item.id === workout.id);

    // Already exists
    if (isExist) {
      toast.info("Workout is already in today's plan");
      return;
    }
    // Maximum 5 workouts
    if (plan.length >= 5) {
      return;
    }

    togglePlan(workout);
    toast.success("Workout added to today's plan");
  };

  return (
    <div>
      <button
        onClick={handleAddToPlan}
        disabled={plan.length >= 5}
        className="bg-[#ccff00] text-black font-extrabold text-xs uppercase px-5 py-3 rounded-xl hover:bg-[#b8e600] transition-colors flex items-center cursor-pointer gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg
          className="w-4 h-4 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="12" y1="14" x2="12" y2="18" />
          <line x1="10" y1="16" x2="14" y2="16" />
        </svg>

        <span>Add to today&apos;s plan</span>
      </button>
    </div>
  );
};

export default TodayButton;