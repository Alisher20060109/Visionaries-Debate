import teamDebate from "../../public/img/team debate.jpg";

function InfoSection({ t }) {
  return (
    <section className="relative h-screen overflow-hidden">

      {/* FIXED BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-center bg-cover bg-fixed"
        style={{
          backgroundImage: `url(${teamDebate})`,
        }}
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/45" />

      {/* CONTENT */}
      <div className="relative z-10 h-full flex items-center justify-center px-6">
        <div className="text-center text-white max-w-4xl">
          
          <p className="uppercase tracking-[0.35em] text-lg text-white/70 mb-2">
            Visionaries 
          </p>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-black mb-6 text-gray-400 leading-tight">
            TEAM DEBATE
          </h2>
 
        </div>
      </div>
    </section>
  );
}

export default InfoSection;