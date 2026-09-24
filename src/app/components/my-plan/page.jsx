"use client";
import { useState } from "react";
import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";
import MyPlanCard from "./MyPlanCard";
import { Bounce, toast } from "react-toastify";

const MyPlan = () => {
  const { plan, saved, togglePlan, toggleSaved } = useFitLog();

  const [sortBy, setSortBy] = useState("Duration");
  const [activeTab, setActiveTab] = useState("today");

  // Current tab list
  const currentList = activeTab === "today" ? plan : saved;

  // Copy list for sorting
  const sortedList = [...currentList];

  // Sort
  if (sortBy === "Rating") {
    sortedList.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "Duration") {
    sortedList.sort((a, b) => b.duration - a.duration);
  } else if (sortBy === "Calories") {
    sortedList.sort((a, b) => b.caloriesBurned - a.caloriesBurned);
  }

  // Total minutes
  const totalMinutes = currentList.reduce(
    (acc, curr) => acc + Number(curr.duration || 0),
    0,
  );

  // Total calories
  const totalCalories = currentList.reduce(
    (acc, curr) => acc + Number(curr.caloriesBurned || 0),
    0,
  );

  // Remove workout
  const handleRemove = (workout) => {
    if (activeTab === "today") {
      togglePlan(workout);
    } else {
      toggleSaved(workout);
    }
    toast.error(`${workout.name} removed!`);
  };

  // Mark as done
  const handleMarkDone = (workout) => {
  toast.success(`${workout.name} marked as done!`, {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
transition: Bounce,
});
};

  return (
    <div className="min-h-screen bg-[#121212] text-white px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <h1 className="font-oswald font-black text-3xl md:text-4xl uppercase tracking-wider">
            MY PLAN
          </h1>

          <p className="text-zinc-400 text-xs md:text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 bg-[#151518] border border-zinc-800/80 rounded-xl px-6 py-4 md:px-8 md:py-5 mb-8">
          {/* Exercises */}
          <div>
            <p className="text-zinc-400 text-[11px] md:text-xs font-semibold uppercase tracking-wider mb-1">
              Exercises
            </p>

            <h2 className="font-oswald text-3xl md:text-5xl font-black text-[#ccff00]">
              {currentList.length}
            </h2>
          </div>

          {/* Minutes */}
          <div className="border-x border-zinc-800/80 px-6 md:px-10">
            <p className="text-zinc-400 text-[11px] md:text-xs font-semibold uppercase tracking-wider mb-1">
              Minutes
            </p>

            <h2 className="font-oswald text-3xl md:text-5xl font-black">
              {totalMinutes}
            </h2>
          </div>

          {/* Calories */}
          <div className="pl-6 md:pl-10">
            <p className="text-zinc-400 text-[11px] md:text-xs font-semibold uppercase tracking-wider mb-1">
              Calories
            </p>

            <h2 className="font-oswald text-3xl md:text-5xl font-black">
              {totalCalories}
            </h2>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="bg-zinc-900 p-1 rounded-lg border border-zinc-800 flex gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold ${
                activeTab === "today"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold ${
                activeTab === "saved"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-success bg-zinc-900 text-white border-zinc-700"
          >
            <option value="Duration">Duration</option>
            <option value="Calories">Calories</option>
            <option value="Rating">Rating</option>
          </select>
        </div>

        {/* Empty State */}
        {sortedList.length === 0 ? (
          <div className="border border-dashed border-zinc-800 rounded-2xl py-20 flex flex-col items-center justify-center text-center">
            <h3 className="font-oswald font-extrabold text-lg uppercase mb-2">
              NOTHING HERE YET
            </h3>

            <p className="text-zinc-500 text-xs mb-6">
              Browse the library and add a lift to get today moving.
            </p>

            <Link
              href="/"
              className="bg-[#ccff00] text-black font-extrabold text-xs uppercase px-6 py-2.5 rounded-full"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          /* Workout Cards */
          <div className="flex flex-col gap-4">
            {sortedList.map((workout) => (
              <MyPlanCard
                key={workout.id}
                workout={workout}
                activeTab={activeTab}
                onRemove={handleRemove}
                onMarkDone={handleMarkDone}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlan;
