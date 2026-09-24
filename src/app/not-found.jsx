import Link from "next/link";
import { ArrowLeft, Dumbbell } from "lucide-react";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-[#121212] text-white flex items-center justify-center px-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-72 h-72 bg-[#ccff00]/10 blur-[120px] rounded-full top-1/4 left-1/2 -translate-x-1/2" />

      <div className="relative z-10 text-center max-w-xl">

        

        <h1 className="font-oswald text-6xl md:text-8xl font-black uppercase tracking-tight leading-none">
             404
          <span className="block text-zinc-600">
            NOT FOUND
          </span>
        </h1>

        {/* Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 mt-8 bg-[#ccff00] text-black px-6 py-3 rounded-full text-sm font-black uppercase tracking-wide hover:bg-[#b8e600] hover:scale-105 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Workouts
        </Link>

      </div>
    </main>
  );
};

export default NotFound;

