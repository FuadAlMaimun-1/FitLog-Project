import Link from "next/link";
import Image from "next/image";
import { Check, X, Clock, Flame, Star } from "lucide-react";

const MyPlanCard = ({ workout, activeTab, onRemove, onMarkDone }) => {
  return (
    <div className="bg-[#18181b] border border-zinc-800/80 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors hover:border-zinc-700">
      
      <div className="flex items-center gap-4">
        {/* Image */}
        <div className="w-20 h-16 relative rounded-lg overflow-hidden bg-zinc-800 flex-shrink-0">
          <Image
            src={workout.image || workout.thumbnail || "/placeholder.jpg"}
            alt={workout.name || workout.title || "Workout"}
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        {/* Workout Info */}
        <div>
          {/* Name */}
          <h3 className="font-oswald font-extrabold text-base md:text-lg uppercase text-white tracking-wide">
            {workout.name || workout.title || "Workout"}
          </h3>

          {/* Equipment */}
          <p className="text-xs text-zinc-400 font-medium mb-1">
            {workout.equipment || "Bodyweight"}
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-400">
            {/* Duration */}
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              {workout.duration || workout.durationMinutes || 0} min
            </span>

            <span>•</span>

            {/* Calories */}
            <span className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-zinc-500" />
              {workout.calories || workout.caloriesBurned || 0} kcal
            </span>

            <span>•</span>

            {/* Rating */}
            <span className="flex items-center gap-1 text-zinc-300 font-semibold">
              <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />

              {workout.rating || 4.5}
            </span>
          </div>
        </div>
      </div>

      {/* =========================
          RIGHT SIDE
      ========================== */}
      <div className="flex items-center gap-2 self-end md:self-auto">
        {/* View Details */}
        <Link
          href={`/workout/${workout.id}`}
          className="px-4 py-2 border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 text-xs font-semibold rounded-lg transition-colors"
        >
          View Details
        </Link>

        {/* Mark as Done */}
        {activeTab === "today" && (
          <button
            type="button"
            onClick={() => onMarkDone(workout)}
            className="bg-[#ccff00] text-black hover:bg-[#b8e600] px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />

            <span>Mark as Done</span>
          </button>
        )}

        {/* Remove */}
        <button
          type="button"
          onClick={() => onRemove(workout)}
          className="p-2 text-zinc-500 hover:text-red-300 transition-colors rounded-lg hover:bg-zinc-800"
          title="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default MyPlanCard;
