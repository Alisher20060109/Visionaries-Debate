import teamDebate from "../../public/img/team debate.jpg";
import teamDebate2 from "../../public/img/team debate2.jpg";

function InfoSection({ t }) {
  return (
    <section className="w-full bg-black">

      {/* ================= MOBILE VERSION ================= */}
      <div className="block sm:hidden">

        {/* IMAGE 1 */}
        <div className="relative">
          <img
            src={teamDebate}
            alt="Team Debate 1"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

        {/* TEXT */}
        <div className="absolute z-10 ml-28 mb-5 text-center">
          <h2 className="text-slate-900 text-4xl font-black leading-tight">
            {t?.teamDebate1 || "TEAM"} <br />
            {t?.teamDebate2 || "DEBATE"}
          </h2>
        </div>

        {/* IMAGE 2 */}
        <div className="relative">
          <img
            src={teamDebate2}
            alt="Team Debate 2"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
        </div>

      </div>

      {/* ================= DESKTOP VERSION ================= */}
      <div className="hidden sm:block relative">

        <div className="relative h-[100vh] md:h-[180vh]">

          {/* IMAGE 1 */}
          <div
            className="h-1/2 bg-center bg-cover bg-fixed"
            style={{
              backgroundImage: `url(${teamDebate})`,
            }}
          >
            <div className="w-full h-full bg-black/45" />
          </div>

          {/* IMAGE 2 */}
          <div
            className="h-1/2 bg-center bg-cover bg-fixed"
            style={{
              backgroundImage: `url(${teamDebate2})`,
            }}
          >
            <div className="w-full h-full bg-black/45" />
          </div>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <h2 className="text-slate-900 text-6xl md:text-7xl font-black text-center drop-shadow-2xl">
              {t?.teamDebate1 || "TEAM"} {t?.teamDebate2 || "DEBATE"}
            </h2>
          </div>

        </div>
      </div>

    </section>
  );
}

export default InfoSection;