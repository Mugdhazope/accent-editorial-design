import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
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
const EASE = [0.22, 1, 0.36, 1] as const;

const steps = [
  { n: "01", title: "research", side: "left", top: "6%", text: "We analyse architectural requirements, user behaviour, project goals, and environmental conditions to establish the ideal lighting strategy." },
  { n: "02", title: "design concept", side: "right", top: "22%", text: "We develop lighting concepts that align with architectural intent, functionality, sustainability, and visual impact." },
  { n: "03", title: "lighting plan", side: "left", top: "39%", text: "Detailed planning ensures every fixture, beam angle, intensity level, and interaction works seamlessly within the environment." },
  { n: "04", title: "project execution", side: "right", top: "55%", text: "Working closely with architects, designers, contractors, and stakeholders, we oversee implementation to achieve the intended experience." },
  { n: "05", title: "customisation", side: "left", top: "72%", text: "We offer product customisation and tailored lighting solutions that help projects achieve a distinctive identity." },
  { n: "06", title: "delivery", side: "right", top: "88%", text: "Final testing, optimisation, and handover ensure long-term performance and lasting impact." },
] as const;

const why = [
  { n: "01", title: "International Lighting Brands", text: "We exclusively represent leading global lighting manufacturers for the Indian market." },
  { n: "02", title: "Architectural Expertise", text: "Lighting solutions developed around architecture, experience, and functionality." },
  { n: "03", title: "Customisation", text: "Tailored products and solutions for unique project requirements." },
  { n: "04", title: "Sustainable Thinking", text: "Design-led lighting focused on efficiency and long-term value." },
];

function Reveal({ children, className, delay = 0, y = 30 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

function CursorLight() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 2;
    let x = tx, y = ty;
    let raf = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    const tick = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 180}px, ${y - 180}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    el.style.opacity = "1";
    window.addEventListener("mousemove", onMove);
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("mousemove", onMove); };
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[1] h-[360px] w-[360px] rounded-full opacity-0"
      style={{
        background: "radial-gradient(closest-side, #C8FF4D, transparent)",
        filter: "blur(80px)",
        mixBlendMode: "screen",
        opacity: 0.025,
      }}
    />
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const titleScale = useTransform(scrollYProgress, [0, 0.25], [0.68, 1], { clamp: true });
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const yCenter = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 48]);

  const mv = (v: MotionValue<number>) => (reduce ? 0 : v);
  const scale = reduce ? 1 : titleScale;

  return (
    <section ref={ref} id="about" className="relative pt-40 pb-8">
      <div className={`text-center text-accent ${serif} text-lg`}>
        main <span className="text-foreground/60 not-italic font-sans">/</span> about us
      </div>

      <div className="relative mx-auto mt-10 max-w-[1400px] h-[58vh] min-h-[460px]">
        <motion.img
          src={float1}
          alt="Architectural wall light"
          width={512}
          height={640}
          style={{ y: mv(yLeft), willChange: "transform" }}
          className="absolute left-[8%] top-[6%] w-[140px] md:w-[180px] aspect-[4/5] object-cover grayscale"
        />
        <motion.img
          src={heroLighting}
          alt="Luxury lobby lighting installation"
          width={800}
          height={1024}
          style={{ y: mv(yCenter), willChange: "transform" }}
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[260px] md:w-[360px] aspect-[4/5] object-cover"
        />
        <motion.img
          src={float2}
          alt="Architectural spotlight detail"
          width={512}
          height={640}
          loading="lazy"
          style={{ y: mv(yRight), willChange: "transform" }}
          className="absolute right-[6%] top-[42%] w-[110px] md:w-[150px] aspect-[4/5] object-cover"
        />
      </div>

      <motion.h1
        className="font-sans font-black lowercase leading-[0.82] tracking-[-0.05em] text-center px-2"
        style={{ fontSize: "clamp(96px, 26vw, 460px)", scale, transformOrigin: "50% 50%", willChange: "transform" }}
      >
        about us
      </motion.h1>
    </section>
  );
}

function RevealStatement({ text }: { text: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.25"] });
  const words = text.split(" ");
  return (
    <h2
      ref={ref}
      className="mt-20 mx-auto max-w-[1100px] text-center font-sans font-bold lowercase leading-[1.02] tracking-[-0.025em]"
      style={{ fontSize: "clamp(36px, 6vw, 88px)" }}
    >
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} index={i} total={words.length} reduce={!!reduce}>
          {w}
        </Word>
      ))}
    </h2>
  );
}

function Word({ children, progress, index, total, reduce }: { children: ReactNode; progress: MotionValue<number>; index: number; total: number; reduce: boolean }) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.12, 1]);
  return (
    <motion.span style={{ opacity: reduce ? 1 : opacity }} className="inline-block mr-[0.25em]">
      {children}
    </motion.span>
  );
}

function ProcessTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reduce = useReducedMotion();
  const [length, setLength] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const offset = useTransform(scrollYProgress, [0, 1], [length, 0]);

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength());
  }, []);

  return (
    <section id="process" className="relative px-6 pt-24 pb-40">
      <Reveal className={`text-center ${serif} text-accent text-2xl`}>
        <span className="inline-block w-2 h-2 rounded-full bg-accent align-middle mr-2" />
        process.
      </Reveal>

      <div ref={ref} className="relative mx-auto mt-16 max-w-[1200px]" style={{ height: "1700px" }}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 1700"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
          style={{ color: "var(--accent)" }}
        >
          <motion.path
            ref={pathRef}
            d="M 500 0 C 520 80, 540 140, 480 200 C 400 280, 600 340, 560 420 C 520 500, 380 520, 360 600 C 340 700, 600 720, 600 820 C 600 920, 360 940, 360 1040 C 360 1140, 620 1160, 580 1260 C 540 1360, 360 1380, 380 1480 C 400 1560, 540 1600, 520 1700"
            style={
              reduce || length === 0
                ? undefined
                : { strokeDasharray: length, strokeDashoffset: offset }
            }
          />
        </svg>

        {steps.map((s) => (
          <motion.div
            key={s.n}
            className="absolute"
            style={{
              top: s.top,
              left: s.side === "left" ? "4%" : "auto",
              right: s.side === "right" ? "4%" : "auto",
              maxWidth: "280px",
            }}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className={`${serif} text-accent text-sm mb-2`}>{s.n}.</div>
            <div className="flex items-baseline gap-2">
              <motion.span
                className="w-2 h-2 rounded-full bg-accent inline-block"
                initial={reduce ? false : { opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
              />
              <h3 className="text-[20px] font-bold lowercase">{s.title}</h3>
            </div>
            <p className="mt-3 text-[13px] leading-[1.55] text-foreground/70">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <CursorLight />

      <header className="fixed top-0 inset-x-0 z-50 px-6 md:px-10 pt-5">
        <div className="flex items-center justify-between">
          <img src={plevidLogo} alt="PLEVID" className="h-5 md:h-6 w-auto" />
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-foreground/85">
            <a href="#about">about us</a>
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

      <Hero />

      <section className="px-6 pt-40 pb-32">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            <div className="text-accent text-xl leading-none">+</div>
            <div className="mt-4 h-10 w-px bg-foreground/30" />
            <p className="mt-4 text-[12px] text-foreground/70 leading-snug">
              Based in Mumbai.
              <br />
              Lighting across India.
            </p>
          </div>
        </Reveal>

        <RevealStatement text="we illuminate spaces through architectural lighting, global design partnerships, and thoughtful execution." />

        <Reveal className="mt-16 mx-auto max-w-[1100px] flex justify-end">
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
        </Reveal>
      </section>

      <ProcessTimeline />

      <section id="why" className="px-6 md:px-10 py-32 max-w-[1400px] mx-auto">
        <Reveal>
          <h2
            className="font-sans font-black lowercase leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: "clamp(56px, 12vw, 180px)" }}
          >
            why plevid.
          </h2>
        </Reveal>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20">
          {why.map((w, i) => (
            <Reveal key={w.n} delay={i * 0.08}>
              <div className="border-t border-foreground/15 pt-6">
                <div className={`${serif} text-accent text-sm mb-3`}>{w.n}</div>
                <h3 className="text-[28px] md:text-[34px] font-bold lowercase leading-[1.05] tracking-tight">
                  {w.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.6] text-foreground/70 max-w-[420px]">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-48 flex flex-col items-center justify-center text-center">
        <Reveal y={24}>
          <h2
            className="font-sans font-black lowercase leading-[0.88] tracking-[-0.045em]"
            style={{ fontSize: "clamp(64px, 13vw, 220px)" }}
          >
            we don't<br />sell lights.
          </h2>
        </Reveal>
        <Reveal y={24}>
          <h2
            className="mt-8 font-sans font-black lowercase leading-[0.88] tracking-[-0.045em] text-foreground/70"
            style={{ fontSize: "clamp(64px, 13vw, 220px)" }}
          >
            we shape<br />
            <span className="text-accent">experiences.</span>
          </h2>
        </Reveal>
      </section>

      <footer id="contact" className="border-t border-foreground/15 px-6 md:px-10 py-10 flex items-center justify-between text-[12px] text-foreground/60">
        <img src={plevidLogo} alt="PLEVID" className="h-4 w-auto" />
        <div>Mumbai · India</div>
        <div>© {new Date().getFullYear()} Plevid Group</div>
      </footer>
    </div>
  );
}
