import FitLogCard from './FitLogCard'; 

const getFitLog = async () => {
  const res = await fetch('https://api.abcz.workers.dev/api/fitlog', 
  {
    cache: 'no-store', 
  });

  if (!res.ok) {
    throw new Error('Failed to fetch workouts');
  }
  
  return res.json();
};

const FitLog = async () => {
  const fitLogData = await getFitLog();

  return (
    <section id="library" className="w-full py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Section Header */}
        <div className="mb-8 space-y-1">
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-wider text-white">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-sm md:text-base">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* 3x4 Grid of Workouts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {fitLogData.map((fitLog) => (
            <FitLogCard key={fitLog.id} fitLog={fitLog} />
          ))}
        </div>  

      </div>
    </section>
  );
};

export default FitLog;