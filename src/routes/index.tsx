import { createFileRoute } from "@tanstack/react-router";
import heroLighting from "@/assets/hero-lighting.jpg";
import float1 from "@/assets/float-1.jpg";
import float2 from "@/assets/float-2.jpg";
import plevidLogo from "@/assets/plevid-logo.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PLEVID — About" },
      {
        name: "description",
        content:
          "PLEVID is an architectural lighting collective based in Mumbai, delivering bespoke lighting across India in partnership with leading international brands.",
      },
      { property: "og:title", content: "PLEVID — About" },
      {
        property: "og:description",
        content:
          "Architectural lighting. Global partnerships. Thoughtful execution. Based in Mumbai, lighting across India.",
      },
    ],
  }),
  component: AboutPage,
});

const serif = "font-serif italic";
const steps = [
  { n: "01", title: "research", side: "left", top: "8%", text: "We analyse architectural requirements, user behaviour, project goals, and environmental conditions to establish the ideal lighting strategy." },
  { n: "02", title: "design concept", side: "right", top: "23%", text: "We develop lighting concepts that align with architectural intent, functionality, sustainability, and visual impact." },
  { n: "03", title: "lighting plan", side: "left", top: "40%", text: "Detailed planning ensures every fixture, beam angle, intensity level, and interaction works seamlessly within the environment." },
  { n: "04", title: "project execution", side: "right", top: "56%", text: "Working closely with architects, designers, contractors, and stakeholders, we oversee implementation to achieve the intended experience." },
  { n: "05", title: "customisation", side: "left", top: "72%", text: "We offer product customisation and tailored lighting solutions that help projects achieve a distinctive identity." },
  { n: "06", title: "delivery", side: "right", top: "88%", text: "Final testing, optimisation, and handover ensure long-term performance and lasting impact." },
] as const;

const why = [
  { n: "01", title: "International Lighting Brands", text: "We exclusively represent leading global lighting manufacturers for the Indian market." },
  { n: "02", title: "Architectural Expertise", text: "Lighting solutions developed around architecture, experience, and functionality." },
  { n: "03", title: "Customisation", text: "Tailored products and solutions for unique project requirements." },
  { n: "04", title: "Sustainable Thinking", text: "Design-led lighting focused on efficiency and long-term value." },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 pt-5">
        <div className="flex items-center justify-between">
          <img src={plevidLogo} alt="PLEVID" className="h-5 md:h-6 w-auto" />
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-foreground/85">
            <a href="#about">about us</a>
            <a href="#works">works</a>
            <a href="#process">process</a>
            <a href="#why">why plevid</a>
            <a href="#contact">contact us</a>
          </nav>
          <a
            href="#contact"
            className="text-[12px] tracking-wide border border-foreground/60 rounded-full px-4 py-1.5 hover:bg-foreground hover:text-background transition-colors"
          >
            get in touch
          </a>
        </div>
        <div className="mt-4 h-px bg-accent/70" />
      </header>

      {/* HERO */}
      <section id="about" className="relative pt-40 pb-8">
        <div className={`text-center text-accent ${serif} text-lg`}>
          main <span className="text-foreground/60 not-italic font-sans">/</span> about us
        </div>

        <div className="relative mx-auto mt-10 max-w-[1400px] h-[58vh] min-h-[460px]">
          {/* Float 1 - top left */}
          <img
            src={float1}
            alt="Architectural wall light"
            width={512}
            height={640}
            className="absolute left-[8%] top-[6%] w-[140px] md:w-[180px] aspect-[4/5] object-cover grayscale"
          />
          {/* Center large */}
          <img
            src={heroLighting}
            alt="Luxury lobby lighting installation"
            width={800}
            height={1024}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[260px] md:w-[360px] aspect-[4/5] object-cover"
          />
          {/* Float 2 - right */}
          <img
            src={float2}
            alt="Architectural spotlight detail"
            width={512}
            height={640}
            loading="lazy"
            className="absolute right-[6%] top-[42%] w-[110px] md:w-[150px] aspect-[4/5] object-cover"
          />
        </div>

        {/* Massive title */}
        <h1
          className="font-sans font-black lowercase leading-[0.82] tracking-[-0.05em] text-center px-2"
          style={{ fontSize: "clamp(96px, 26vw, 460px)" }}
        >
          about us
        </h1>
      </section>

      {/* INTRO */}
      <section className="px-6 pt-40 pb-32">
        <div className="flex flex-col items-center text-center">
          <div className="text-accent text-xl leading-none">+</div>
          <div className="mt-4 h-10 w-px bg-foreground/30" />
          <p className="mt-4 text-[12px] text-foreground/70 leading-snug">
            Based in Mumbai.
            <br />
            Lighting across India.
          </p>
        </div>

        <h2
          className="mt-20 mx-auto max-w-[1100px] text-center font-sans font-bold lowercase leading-[1.02] tracking-[-0.025em]"
          style={{ fontSize: "clamp(36px, 6vw, 88px)" }}
        >
          we illuminate spaces through architectural lighting, global design partnerships, and thoughtful execution.
        </h2>

        <div className="mt-16 mx-auto max-w-[1100px] flex justify-end">
          <div className="max-w-[440px] text-[14px] leading-[1.6] text-foreground/75 space-y-4">
            <p>
              Plevid Group continues to be a guiding force in India's architectural lighting industry. Based in
              Mumbai, we represent leading international lighting brands and deliver lighting solutions across
              commercial, hospitality, retail, residential, educational, and urban environments.
            </p>
            <p>
              Through six years of industry experience, we have built a reputation for combining design excellence,
              technical expertise, and customised solutions that transform spaces through light.
            </p>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="relative px-6 pt-24 pb-40">
        <div className={`text-center ${serif} text-accent text-2xl`}>
          <span className="inline-block w-2 h-2 rounded-full bg-accent align-middle mr-2" />
          process.
        </div>

        <div className="relative mx-auto mt-16 max-w-[1200px]" style={{ height: "1700px" }}>
          {/* Curved path */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 1000 1700"
            preserveAspectRatio="none"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            style={{ color: "var(--accent)" }}
          >
            <path d="M 500 0 C 520 80, 540 140, 480 200 C 400 280, 600 340, 560 420 C 520 500, 380 520, 360 600 C 340 700, 600 720, 600 820 C 600 920, 360 940, 360 1040 C 360 1140, 620 1160, 580 1260 C 540 1360, 360 1380, 380 1480 C 400 1560, 540 1600, 520 1700" />
          </svg>

          {steps.map((s) => (
            <div
              key={s.n}
              className="absolute"
              style={{
                top: s.top,
                left: s.side === "left" ? "4%" : "auto",
                right: s.side === "right" ? "4%" : "auto",
                maxWidth: "280px",
              }}
            >
              <div className={`${serif} text-accent text-sm mb-2`}>{s.n}.</div>
              <div className="flex items-baseline gap-2">
                <span className="w-2 h-2 rounded-full bg-accent inline-block" />
                <h3 className="text-[20px] font-bold lowercase">{s.title}</h3>
              </div>
              <p className="mt-3 text-[13px] leading-[1.55] text-foreground/70">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHY PLEVID */}
      <section id="why" className="px-6 md:px-10 py-32 max-w-[1400px] mx-auto">
        <h2
          className="font-sans font-black lowercase leading-[0.9] tracking-[-0.04em]"
          style={{ fontSize: "clamp(56px, 12vw, 180px)" }}
        >
          why plevid.
        </h2>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20">
          {why.map((w) => (
            <div key={w.n} className="border-t border-foreground/15 pt-6">
              <div className={`${serif} text-accent text-sm mb-3`}>{w.n}</div>
              <h3 className="text-[28px] md:text-[34px] font-bold lowercase leading-[1.05] tracking-tight">
                {w.title}
              </h3>
              <p className="mt-4 text-[14px] leading-[1.6] text-foreground/70 max-w-[420px]">{w.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section className="px-6 py-48 flex flex-col items-center justify-center text-center">
        <h2
          className="font-sans font-black lowercase leading-[0.88] tracking-[-0.045em]"
          style={{ fontSize: "clamp(64px, 13vw, 220px)" }}
        >
          we don't<br />sell lights.
        </h2>
        <h2
          className="mt-8 font-sans font-black lowercase leading-[0.88] tracking-[-0.045em] text-foreground/70"
          style={{ fontSize: "clamp(64px, 13vw, 220px)" }}
        >
          we shape<br />
          <span className="text-accent">experiences.</span>
        </h2>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="border-t border-foreground/15 px-6 md:px-10 py-10 flex items-center justify-between text-[12px] text-foreground/60">
        <img src={plevidLogo} alt="PLEVID" className="h-4 w-auto" />
        <div>Mumbai · India</div>
        <div>© {new Date().getFullYear()} Plevid Group</div>
      </footer>
    </div>
  );
}
