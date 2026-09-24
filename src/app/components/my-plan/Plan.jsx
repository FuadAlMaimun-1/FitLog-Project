"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useFitLog } from "@/context/FitLogContext";
import MyPlanCard from "./PlanCard";
import { Bounce, toast } from "react-toastify";

const Plan = () => {

  const { plan, saved, togglePlan, toggleSaved } = useFitLog();
  
  const [sortBy, setSortBy] = useState("default");
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [activeTab, setActiveTab] = useState(
    tab === "saved" ? "saved" : "today",
  );

  const currentList = activeTab === "today" ? plan : saved;

  const sortedList = [...currentList];

  // Sort only when user selects a sorting option
  if (sortBy === "Rating") {
    sortedList.sort((a, b) => Number(b.rating) - Number(a.rating));
  } else if (sortBy === "Duration") {
    sortedList.sort((a, b) => Number(b.duration) - Number(a.duration));
  } else if (sortBy === "Calories") {
    sortedList.sort(
      (a, b) => Number(b.caloriesBurned) - Number(a.caloriesBurned),
    );
  }

  // Total minutes
  const totalMinutes = currentList.reduce(
    (total, workout) => total + Number(workout.duration),
    0,
  );

  // Total calories
  const totalCalories = currentList.reduce(
    (total, workout) => total + Number(workout.caloriesBurned),
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
          <div className="flex items-center gap-3 whitespace-nowrap">
            <span className="text-gray-400 font-medium">Sort By</span>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select select-success select-sm"
            >
              <option value="default" className="text-gray-500">
                Sort By
              </option>

              <option value="Duration">Duration</option>

              <option value="Calories">Calories</option>

              <option value="Rating">Rating</option>
            </select>
          </div>
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
              className="bg-[#ccff00] text-black font-extrabold text-xs uppercase px-6 py-2.5 rounded-full hover:bg-[#b8e600] transition"
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

export default Plan;
