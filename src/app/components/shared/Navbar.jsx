'use client';
import logo from '@/assets/logo.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Navbar = ({ planCount = 0, savedCount = 0 }) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="w-full  border-b bg-black border-zinc-800 px-4 md:px-8 py-4 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 relative flex items-center justify-center">
            <Image
              src={logo}
              alt="FitLog Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-lg tracking-wider text-white">FITLOG</span>
        </Link>

        {/* Middle: Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link
            href="/"
            className={`transition-colors hover:text-white ${
              pathname === '/' ? 'text-[#ccff00] font-semibold' : 'text-zinc-400'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`transition-colors hover:text-white ${
              pathname === '/my-plan' ? 'text-[#ccff00] font-semibold' : 'text-zinc-400'
            }`}
          >
            My Plan
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-3 text-xs font-semibold">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 bg-[#ccff00] text-black px-3 py-1.5 rounded-full hover:opacity-90 transition-opacity"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 border border-zinc-700 text-zinc-300 px-3 py-1.5 rounded-full hover:border-zinc-500 transition-colors"
          >
            <span>Saved</span>
            <span className="bg-zinc-800 text-zinc-300 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">
              {savedCount}
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Plan Badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] text-black px-2.5 py-1 rounded-full text-xs font-semibold"
          >
            <span>Plan</span>
            <span className="bg-black text-[#ccff00] w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
              {planCount}
            </span>
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-zinc-400 hover:text-white p-1"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-zinc-800 mt-3 flex flex-col gap-3">
          <Link
            href="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-sm px-2 py-1 ${
              pathname === '/' ? 'text-[#ccff00] font-semibold' : 'text-zinc-400'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            onClick={() => setIsMobileMenuOpen(false)}
            className={`text-sm px-2 py-1 ${
              pathname === '/my-plan' ? 'text-[#ccff00] font-semibold' : 'text-zinc-400'
            }`}
          >
            My Plan
          </Link>
          <div className="pt-2 border-t border-zinc-800/50 flex gap-3">
            <Link
              href="/my-plan"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 border border-zinc-700 text-zinc-300 px-3 py-1 rounded-full text-xs"
            >
              <span>Saved Items</span>
              <span className=" text-zinc-300 w-4 h-4 rounded-full flex items-center justify-center text-[10px]">
                {savedCount}
              </span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;