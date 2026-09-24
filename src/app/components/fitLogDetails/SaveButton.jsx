"use client";

import React from "react";
import { toast } from "react-toastify";
import { useFitLog } from "@/context/FitLogContext";

const SaveButton = ({ workout }) => {
  const { saved, toggleSaved } = useFitLog();

  const handleSave = () => {
    const isExist = saved.find((item) => item.id === workout.id);

    if (isExist) {
      toast.info("Workout is already saved");
      return;
    }

    toggleSaved(workout);
    toast.success("Workout saved successfully");
  };

  return (
    <div>
      <button
        onClick={handleSave}
        className="bg-[#18181b] border border-zinc-800 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl hover:border-zinc-700 transition-colors flex items-center gap-2 cursor-pointer"
      >
        <svg
          className="w-4 h-4 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>

        <span>Save for later</span>
      </button>
    </div>
  );
};

export default SaveButton;