import Image from "next/image";
import Link from "next/link";

const FitLogCard = ({ fitLog }) => {
  const {
    id,
    name,
    image,
    muscleGroups,
    equipment,
    duration,
    caloriesBurned,
    rating,
  } = fitLog;

  return (
    <Link href={`/workout/${id}`} className="group">
      <div className="bg-[#18181b] border border-zinc-800 rounded-2xl overflow-hidden hover:border-zinc-700 transition-all duration-300 flex flex-col h-full">

        <div className="relative w-full aspect-[4/3] bg-zinc-900 overflow-hidden">
          <Image
            src={image}
            alt={name}
            width={400}
            height={300}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col justify-between flex-1 gap-4">
          <div className="space-y-3">
            {/* Muscle Groups */}
            <div className="flex flex-wrap gap-2">
              {muscleGroups?.map((muscle) => (
                <span
                  key={muscle}
                  className="bg-[#ccff00] text-black font-extrabold text-[10px] tracking-wider px-2.5 py-1 rounded-full uppercase"
                >
                  {muscle}
                </span>
              ))}
            </div>

            {/* Name */}
            <h3 className="text-white font-black text-lg tracking-wide uppercase line-clamp-1 group-hover:text-[#ccff00] transition-colors">
              {name}
            </h3>

            {/* Equipment */}
            <p className="text-zinc-400 text-xs font-medium line-clamp-1">
              {equipment || "No equipment required"}
            </p>
          </div>

          {/* Stats */}
          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-zinc-400 text-xs font-medium">
            {/* Duration */}
            <div className="flex items-center gap-1.5">
              <span>⏱</span>
              <span>{duration || 0} min</span>
            </div>

            {/* Calories */}
            <div className="flex items-center gap-1.5">
              <span>🔥</span>
              <span>{caloriesBurned || 0} kcal</span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5">
              <span className="text-[#ccff00]">★</span>
              <span className="text-white font-semibold">{rating || "0"}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FitLogCard;
