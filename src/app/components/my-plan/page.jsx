"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, X, Clock, Flame, Star } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

const MyPlan = () => {
  const { plan, saved, togglePlan, toggleSaved } = useFitLog();
  const [activeTab, setActiveTab] = useState("today");

  const currentList = activeTab === "today" ? plan : saved;

  const totalMinutes = currentList.reduce(
    (acc, curr) => acc + (Number(curr.duration || curr.durationMinutes) || 0),
    0,
  );
  const totalCalories = currentList.reduce(
    (acc, curr) => acc + (Number(curr.calories || curr.caloriesBurned) || 0),
    0,
  );

  const handleRemove = (item) => {
    if (activeTab === "today") {
      togglePlan(item);
    } else {
      toggleSaved(item);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white px-4 md:px-8 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="font-oswald font-black text-3xl md:text-4xl uppercase tracking-wider text-white">
            MY PLAN
          </h1>
          <p className="text-zinc-400 text-xs md:text-sm mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Metrics Summary Row (3 Stat Cards) */}
        <div className="grid grid-cols-3 bg-[#151518] border border-zinc-800/80 rounded-xl px-6 py-4 md:px-8 md:py-5 mb-8 max-w-7xl mx-auto">
  {/* Exercises Stat */}
  <div className="flex flex-col justify-center">
    <p className="text-zinc-400 text-[11px] md:text-xs font-semibold uppercase tracking-wider mb-1">
      Exercises
    </p>
    <h2 className="font-oswald text-3xl md:text-5xl font-black text-[#ccff00] leading-none">
      {currentList.length}
    </h2>
  </div>

  {/* Minutes Stat */}
  <div className="flex flex-col justify-center border-x border-zinc-800/80 px-6 md:px-10">
    <p className="text-zinc-400 text-[11px] md:text-xs font-semibold uppercase tracking-wider mb-1">
      Minutes
    </p>
    <h2 className="font-oswald text-3xl md:text-5xl font-black text-white leading-none">
      {totalMinutes}
    </h2>
  </div>

  {/* Calories Stat */}
  <div className="flex flex-col justify-center pl-6 md:pl-10">
    <p className="text-zinc-400 text-[11px] md:text-xs font-semibold uppercase tracking-wider mb-1">
      Calories
    </p>
    <h2 className="font-oswald text-3xl md:text-5xl font-black text-white leading-none">
      {totalCalories}
    </h2>
  </div>
</div>

        {/* Tabs & Filter Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="bg-zinc-900 p-1 rounded-lg border border-zinc-800/80 flex gap-1">
            <button
              onClick={() => setActiveTab("today")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === "today"
                  ? "bg-zinc-800 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Today's Plan
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                activeTab === "saved"
                  ? "bg-zinc-800 text-white shadow"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Saved
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span>Sort By</span>
            <select className="bg-zinc-900 border border-zinc-800 rounded-md px-3 py-1 text-white focus:outline-none">
              <option>Duration</option>
              <option>Calories</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {currentList.length === 0 ? (
          /* Empty State */
          <div className="border border-dashed border-zinc-800 rounded-2xl py-20 flex flex-col items-center justify-center text-center bg-[#151515]/40">
            <h3 className="font-oswald font-extrabold text-lg uppercase tracking-wide text-white mb-2">
              NOTHING HERE YET
            </h3>
            <p className="text-zinc-500 text-xs mb-6 max-w-xs">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="bg-[#ccff00] text-black font-extrabold text-xs uppercase px-6 py-2.5 rounded-full hover:bg-[#b8e600] transition-colors"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          /* Workout Cards List (Horizontal Layout matching Figma) */
          <div className="flex flex-col gap-4">
            {currentList.map((workout) => (
              <div
                key={workout.id}
                className="bg-[#18181b] border border-zinc-800/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:border-zinc-700"
              >
                {/* Left: Thumbnail & Info */}
                <div className="flex items-center gap-4">
                  <div className="w-20 h-16 relative rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
                    <Image
                      src={
                        workout.image || workout.thumbnail || "/placeholder.jpg"
                      }
                      alt={workout.title || workout.name || "Workout"}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-oswald font-extrabold text-base md:text-lg uppercase text-white tracking-wide">
                      {workout.title || workout.name}
                    </h3>
                    <p className="text-xs text-zinc-400 font-medium mb-1">
                      {workout.equipment || "Bodyweight"}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3 text-xs text-zinc-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-500" />
                        {workout.duration || workout.durationMinutes || 0} min
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Flame className="w-3.5 h-3.5 text-zinc-500" />
                        {workout.calories || workout.caloriesBurned || 0} kcal
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-zinc-300 font-semibold">
                        <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                        {workout.rating || 4.5}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions Buttons */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                  <Link
                    href={`/workout/${workout.id}`}
                    className="px-4 py-2 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 text-xs font-semibold rounded-lg transition-colors"
                  >
                    View Details
                  </Link>

                  <button className="bg-[#ccff00] text-black hover:bg-[#b8e600] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Mark as Done</span>
                  </button>

                  <button
                    onClick={() => handleRemove(workout)}
                    className="p-2 text-zinc-500 hover:text-red-300 transition-colors rounded-lg hover:bg-zinc-800"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPlan;
