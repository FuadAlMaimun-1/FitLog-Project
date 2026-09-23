import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const getFitLog = async () => {
  const res = await fetch("https://api.abcz.workers.dev/api/fitlog", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch workouts Detail Page");
  }

  return res.json();
};

const Page = async ({ params }) => {
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const fitLogData = await getFitLog();

  const workout = fitLogData.find((item) => String(item.id) === String(id));

  if (!workout) {
    notFound();
  }

  const {
    name,
    description,
    image,
    muscleGroups,
    equipment,
    difficulty,
    sets,
    reps,
    duration,
    caloriesBurned,
    rating,
    instructions,
  } = workout;

  return (
    <main className="min-h-screen bg-[#121212] text-white py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Navbar Brand */}
       <div className="flex items-center gap-2">
  <Link 
    href="/" 
    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
  >
    <ArrowLeftIcon className="w-4 h-4" />
    <span className="text-sm font-bold tracking-wider uppercase">
      Back to Library
    </span>
  </Link>
</div>

        {/* Main Details Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Image */}
          <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800">
            <Image
              src={image || "/placeholder.png"}
              alt={name || "Workout Detail"}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Right Column: Workout Info */}
          <div className="space-y-6">
            {/* Title and Description */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
                {name}
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {description ||
                  "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
              </p>
            </div>

            {/* Muscle Groups Pills */}
            <div className="flex flex-wrap gap-2">
              {muscleGroups?.map((muscle, idx) => (
                <span
                  key={idx}
                  className="bg-[#ccff00] text-black font-extrabold text-[11px] px-3 py-1 rounded-full uppercase tracking-wider"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Specification List Table */}
            <div className="bg-[#18181b] rounded-2xl p-5 border border-zinc-800 space-y-3 text-sm">
              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase text-xs">
                  EQUIPMENT
                </span>
                <span className="font-semibold text-zinc-200">
                  {equipment || "Barbell, Bench"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase text-xs">
                  DIFFICULTY
                </span>
                <span className="font-semibold text-zinc-200">
                  {difficulty || "Intermediate"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase text-xs">
                  SETS
                </span>
                <span className="font-semibold text-zinc-200">{sets || 4}</span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase text-xs">
                  REPS
                </span>
                <span className="font-semibold text-zinc-200">
                  {reps || "6-8"}
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase text-xs">
                  DURATION
                </span>
                <span className="font-semibold text-zinc-200">
                  {duration || 25} min
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5 border-b border-zinc-800/60">
                <span className="text-zinc-500 font-bold uppercase text-xs">
                  CALORIES
                </span>
                <span className="font-semibold text-zinc-200">
                  {caloriesBurned || 180} Kcal
                </span>
              </div>

              <div className="flex justify-between items-center py-1.5">
                <span className="text-zinc-500 font-bold uppercase text-xs">
                  RATING
                </span>
                <span className="font-semibold text-zinc-200">
                  {rating || 4.8}
                </span>
              </div>
            </div>

            {/* Instructions Section */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-zinc-400">
                INSTRUCTIONS
              </h3>

              {instructions && instructions.length > 0 ? (
                <ol className="list-decimal list-inside space-y-2 text-zinc-300 text-xs md:text-sm leading-relaxed">
                  {instructions.map((step, index) => (
                    <li key={index} className="pl-1">
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <ol className="list-decimal list-inside space-y-2 text-zinc-300 text-xs md:text-sm leading-relaxed">
                  <li>
                    Lie on the bench with eyes under the bar and feet planted.
                  </li>
                  <li>
                    Unrack with locked elbows and lower the bar to mid-chest.
                  </li>
                  <li>
                    Press up in a slight arc until elbows lock without bouncing.
                  </li>
                  <li>
                    Keep shoulder blades pinched and a natural arch in the back.
                  </li>
                </ol>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              {/* Add to today's plan Button */}
              <button className="bg-[#ccff00] text-black font-extrabold text-xs uppercase px-5 py-3 rounded-xl hover:bg-[#b8e600] transition-colors flex items-center gap-2">
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
                <span>Add to today's plan</span>
              </button>

              {/* Save for later Button */}
              <button className="bg-[#18181b] border border-zinc-800 text-white font-bold text-xs uppercase px-5 py-3 rounded-xl hover:border-zinc-700 transition-colors flex items-center gap-2">
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
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
