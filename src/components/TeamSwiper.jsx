import { useEffect, useState } from "react";

const VIDEOS = [
  "NLzj1B1PA-0",
  "qMy30dMldfs",
];

function TeamSwiper() {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [started, setStarted] = useState(false);

  const currentId = VIDEOS[currentVideo];

  // Video vaqt tugasa keyingisiga o'tadi
  const videoDurations = {
    "NLzj1B1PA-0": 26,
    "qMy30dMldfs": 19,
  };

  useEffect(() => {
    if (!started) return;

    const seconds = videoDurations[currentId] || 20;

    const timer = setTimeout(() => {
      setLoaded(false);
      setCurrentVideo((prev) => (prev + 1) % VIDEOS.length);
    }, seconds * 1000);

    return () => clearTimeout(timer);
  }, [currentVideo, started]);

  return (
    <div className="relative w-full flex justify-center md:justify-end">
      <div className="relative w-[220px] sm:w-[245px] md:w-[270px] lg:w-[290px]">

        {/* Phone */}
        <div className="relative rounded-[2.5rem] bg-black p-[8px] border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">

          {/* Side buttons */}
          <div className="absolute -left-[3px] top-[84px] h-10 w-[3px] rounded-full bg-zinc-700" />
          <div className="absolute -right-[3px] top-[96px] h-14 w-[3px] rounded-full bg-zinc-700" />
          <div className="absolute -right-[3px] top-[126px] h-10 w-[3px] rounded-full bg-zinc-600" />

          {/* Screen */}
          <div
            className="relative overflow-hidden rounded-[2rem] bg-black"
            style={{ aspectRatio: "9 / 16" }}
          >
            {/* Notch */}
            <div className="absolute top-2 left-1/2 z-30 -translate-x-1/2 w-[34%] h-5 rounded-full bg-black" />

            {/* Agar bosilmagan bo‘lsa preview */}
            {!started ? (
              <div
                className="absolute inset-0 cursor-pointer"
                onClick={() => setStarted(true)}
              >
                <img
                  src={`https://img.youtube.com/vi/${currentId}/hqdefault.jpg`}
                  alt="Preview"
                  className="h-full w-full object-cover"
                />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-16 w-16 rounded-full bg-black/60 flex items-center justify-center text-white text-2xl">
                    ▶
                  </div>
                </div>
              </div>
            ) : (
              <iframe
                key={currentId}
                onLoad={() => setLoaded(true)}
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube.com/embed/${currentId}?autoplay=1&mute=0&controls=0&playsinline=1&rel=0&modestbranding=1`}
                title="Short Video"
                allow="autoplay; encrypted-media"
              />
            )}

            {/* top gradient */}
            <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/30 to-transparent z-20" />

            {/* bottom gradient */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/40 to-transparent z-20" />

            {started && !loaded && (
              <div className="absolute inset-0 z-40 flex items-center justify-center bg-black text-white text-sm">
                Loading...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamSwiper;