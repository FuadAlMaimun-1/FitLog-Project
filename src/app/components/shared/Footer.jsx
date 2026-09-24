import Image from 'next/image';
import logo from '@/assets/logo.png';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-[#000] border-t border-zinc-800 px-6 py-7 text-zinc-400 text-xs mt-12">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 relative flex items-center justify-center">
            <Image
              src={logo}
              alt="FitLog Logo"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          <span className="font-extrabold text-sm tracking-wider text-white">FITLOG</span>
        </Link>

        {/* Copyright Line */}
        <p className="text-zinc-500 text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;