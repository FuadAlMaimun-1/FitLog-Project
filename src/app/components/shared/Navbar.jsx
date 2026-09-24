"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu, X } from "lucide-react";
import { useFitLog } from "@/context/FitLogContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pathname = usePathname();
  const { plan, saved } = useFitLog();

  const links = (
    <>
      <li>
        <Link
          href="/"
          className={
            pathname === "/"
              ? "text-[#ccff00] font-semibold"
              : "text-zinc-400 hover:text-white"
          }
        >
          Workouts
        </Link>
      </li>

      <li>
        <Link
          href="/components/my-plan"
          onClick={() => setIsMobileMenuOpen(false)}
          className={
            pathname === "/components/my-plan"
              ? "text-[#ccff00] font-semibold"
              : "text-zinc-400 hover:text-white"
          }
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-900 bg-[#121212]/95 backdrop-blur">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-8 text-white">
        
        {/* Navbar Start */}
        <div className="navbar-start">

          <div className="dropdown md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="btn btn-ghost btn-circle text-zinc-400 hover:text-white"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#ccff00]" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {isMobileMenuOpen && (
              <ul className="menu dropdown-content bg-[#18181b] rounded-box z-50 mt-3 w-52 p-2 shadow-xl border border-zinc-800">
                {links}

                {/* Mobile Counters */}
                <li className="mt-2 border-t border-zinc-800 pt-2">
                  <Link
                    href="/my-plan"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between"
                  >
                    <span>Plan</span>

                    <span className="bg-[#ccff00] text-black w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px]">
                      {plan.length}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    href="/my-plan"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between"
                  >
                    <span>Saved</span>

                    <span className="bg-zinc-800 text-zinc-400 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] border border-zinc-700">
                      {saved.length}
                    </span>
                  </Link>
                </li>
              </ul>
            )}
          </div>

      
          <Link href="/" className="flex items-center gap-2 group">
            <Dumbbell className="w-6 h-6 text-[#ccff00] -rotate-45 group-hover:rotate-0 transition-transform duration-300" />

            <span className="text-xl font-black tracking-wider text-white uppercase">
              FITLOG
            </span>
          </Link>
        </div>

       {/* Mobile Menu */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-2">
            {links}
          </ul>
        </div>

        <div className="navbar-end gap-3">

          <Link
            href="/components/my-plan"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            <span>Plan</span>

            <span className="bg-[#ccff00] text-black w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px]">
              {plan.length}
            </span>
          </Link>

          {/* Saved */}
          <Link
            href="/components/my-plan?tab=saved"
            className="hidden sm:flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
          >
            <span>Saved</span>

            <span className="bg-zinc-800 text-zinc-400 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[11px] border border-zinc-700">
              {saved.length}
            </span>
          </Link>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;

