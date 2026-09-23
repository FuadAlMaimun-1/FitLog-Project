import Image from 'next/image';
import banner from '@/assets/banner.png';
import React from 'react';

const Banner = () => {
    return (
    <div className="m-10">
         <section className="w-full bg-[#18181b] border border-zinc-800/80 rounded-2xl my-6 p-5 md:p-12 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-8">
        
        {/* Left Side: Content */}
        <div className="flex-1 space-y-4 max-w-2xl text-left">
          {/* Eyebrow Text */}
          <span className="text-[#ccff00] text-xs md:text-sm font-extrabold tracking-widest uppercase">
            WORKOUT LIBRARY
          </span>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-wide leading-tight uppercase font-sans">
            TRAIN WITH INTENT. <br className="hidden sm:inline" />
            LOG EVERY SET.
          </h1>

          {/* Subtitle */}
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-xl">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <div className="pt-2">
            <button
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black text-xs sm:text-sm font-bold uppercase px-6 py-3.5 rounded-lg hover:bg-[#b8e600] transition-all duration-200 shadow-lg shadow-[#ccff00]/10"
            >
              <span>BROWSE WORKOUTS</span>
            </button>
          </div>
        </div>

        {/* Right Side: Hero Image */}
        <div className="flex-1 flex justify-center lg:justify-end w-full max-w-md lg:max-w-lg">
          <div className="relative w-full aspect-square max-w-[380px]">
            <Image
              src={banner}
              alt="Gym Equipment Illustration"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </section>
    </div> 
    );
};

export default Banner;