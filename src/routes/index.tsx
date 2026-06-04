import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import heroLighting from "@/assets/hero-middle.png.asset.json";
import float1 from "@/assets/hero-left.jpg.asset.json";
import float2 from "@/assets/hero-right.jpg.asset.json";
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

type HeroImageProps = {
  src: string;
  alt: string;
  caption: string;
  className: string;
  glowClass: string;
  scrollY: MotionValue<number> | number;
  floatY?: number;
  mouseX: number;
  mouseY: number;
  parallaxStrength: number;
  reveal: { delay: number };
  reduce: boolean;
  captionAlign?: "left" | "right";
};

function HeroImage({
  src, alt, caption, className, glowClass, scrollY, floatY = 0,
  mouseX, mouseY, parallaxStrength, reveal, reduce, captionAlign = "left",
}: HeroImageProps) {
  const px = reduce ? 0 : mouseX * parallaxStrength;
  const py = reduce ? 0 : mouseY * parallaxStrength;
  return (
    <motion.figure
      className={`absolute group ${className}`}
      style={{
        y: scrollY,
        translateY: floatY,
        willChange: "transform",
      }}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay: reveal.delay }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ x: px, y: py }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      >
        {/* Soft glow behind */}
        <div
          aria-hidden
          className={`absolute -inset-8 md:-inset-12 rounded-full blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-700 ${glowClass}`}
        />
        {/* Shadow layer */}
        <div
          aria-hidden
          className="absolute inset-0 translate-y-3 blur-xl bg-black/60 -z-[1]"
        />
        {/* Image wrapper */}
        <div className="relative overflow-hidden w-full h-full transition-transform duration-700 ease-out group-hover:scale-[1.03]">
          <img
            src={src}
            alt={alt}
            className="block w-full h-full object-cover transition-[filter] duration-700 ease-out group-hover:brightness-110 group-hover:contrast-105"
          />
          {/* Grain overlay */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
              backgroundSize: "160px 160px",
            }}
          />
          {/* Floating light reflection */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-y-1/4 -left-1/3 w-1/2 rotate-12 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
              animation: reduce ? undefined : "heroSheen 9s ease-in-out infinite",
            }}
          />
          {/* Always-on subtle sheen */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(120deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)",
              animation: reduce ? undefined : "heroSheen 14s ease-in-out infinite",
            }}
          />
        </div>
      </motion.div>
      <figcaption
        className={`mt-3 ${serif} text-[10px] md:text-[11px] tracking-wide text-foreground/45 ${
          captionAlign === "right" ? "text-right" : "text-left"
        }`}
      >
        — {caption}
      </figcaption>
    </motion.figure>
  );
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const titleScale = useTransform(scrollYProgress, [0.15, 0.5], [0.68, 1], { clamp: true });
  const yLeftScroll = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yCenterScroll = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const yRightScroll = useTransform(scrollYProgress, [0, 1], [0, 160]);

  // Slow floating motion (side images only)
  const [tFloat, setTFloat] = useState(0);
  useEffect(() => {
    if (reduce) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      setTFloat((now - start) / 1000);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  const floatLeft = reduce ? 0 : Math.sin(tFloat * 0.5) * 8;
  const floatRight = reduce ? 0 : Math.sin(tFloat * 0.4 + 1.7) * 10;

  // Mouse-based micro parallax (normalized -0.5..0.5)
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (reduce) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setMouse({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduce]);

  const mv = (v: MotionValue<number>) => (reduce ? 0 : (v as MotionValue<number> | number));
  const scale = reduce ? 1 : titleScale;

  return (
    <section ref={ref} id="about" className="relative pt-28 md:pt-36 pb-8">
      <div className="relative mx-auto max-w-[1400px] h-[62vh] min-h-[420px] md:h-[78vh] md:min-h-[600px]">
        <HeroImage
          src={float1.url}
          alt="Architectural wall light"
          caption="Mumbai, India"
          className="left-[4%] md:left-[8%] top-[12%] w-[120px] sm:w-[160px] md:w-[220px] aspect-[3/2] grayscale"
          glowClass="bg-[radial-gradient(closest-side,rgba(255,236,180,0.35),transparent)]"
          scrollY={mv(yLeftScroll)}
          floatY={floatLeft}
          mouseX={mouse.x}
          mouseY={mouse.y}
          parallaxStrength={6}
          reveal={{ delay: 0.05 }}
          reduce={!!reduce}
          captionAlign="left"
        />
        <HeroImage
          src={heroLighting.url}
          alt="Luxury lobby lighting installation"
          caption="Hospitality Project"
          className="left-1/2 -translate-x-1/2 top-[2%] w-[220px] sm:w-[300px] md:w-[440px] aspect-[3/2]"
          glowClass="bg-[radial-gradient(closest-side,rgba(200,255,77,0.18),transparent)]"
          scrollY={mv(yCenterScroll)}
          mouseX={mouse.x}
          mouseY={mouse.y}
          parallaxStrength={3}
          reveal={{ delay: 0.25 }}
          reduce={!!reduce}
          captionAlign="left"
        />
        <HeroImage
          src={float2.url}
          alt="Architectural spotlight detail"
          caption="Custom Installation"
          className="right-[4%] md:right-[6%] top-[50%] w-[110px] sm:w-[140px] md:w-[200px] aspect-[3/2]"
          glowClass="bg-[radial-gradient(closest-side,rgba(255,220,150,0.3),transparent)]"
          scrollY={mv(yRightScroll)}
          floatY={floatRight}
          mouseX={mouse.x}
          mouseY={mouse.y}
          parallaxStrength={7}
          reveal={{ delay: 0.45 }}
          reduce={!!reduce}
          captionAlign="right"
        />
      </div>

      <motion.h1
        className="font-sans font-black lowercase leading-[0.82] tracking-[-0.05em] text-center px-2 mt-16 md:mt-28"
        style={{ fontSize: "clamp(72px, 26vw, 460px)", scale, transformOrigin: "50% 50%", willChange: "transform" }}
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
    <section id="process" className="relative px-6 pt-24 pb-24 md:pb-40">
      <Reveal className={`text-center ${serif} text-accent text-xl md:text-2xl`}>
        <span className="inline-block w-2 h-2 rounded-full bg-accent align-middle mr-2" />
        process.
      </Reveal>

      {/* Mobile: stacked list with vertical accent line */}
      <div className="md:hidden mt-12 max-w-[520px] mx-auto relative pl-6">
        <div className="absolute left-2 top-2 bottom-2 w-px bg-accent/70" />
        <div className="space-y-10">
          {steps.map((s) => (
            <Reveal key={s.n}>
              <div className="relative">
                <span className="absolute -left-[18px] top-2 w-2 h-2 rounded-full bg-accent" />
                <div className={`${serif} text-accent text-sm mb-2`}>{s.n}.</div>
                <h3 className="text-[20px] font-bold lowercase leading-tight">{s.title}</h3>
                <p className="mt-3 text-[13px] leading-[1.55] text-foreground/70">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Desktop/tablet: serpentine path */}
      <div ref={ref} className="relative mx-auto mt-16 max-w-[1200px] hidden md:block" style={{ height: "1700px" }}>
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

      <section className="px-6 pt-24 md:pt-40 pb-20 md:pb-32">
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

        <Reveal className="mt-12 md:mt-16 mx-auto max-w-[1100px] flex md:justify-end">
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

      <section id="why" className="px-6 md:px-10 py-24 md:py-32 max-w-[1400px] mx-auto">

        <Reveal>
          <h2
            className="font-sans font-black lowercase leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: "clamp(56px, 12vw, 180px)" }}
          >
            why plevid.
          </h2>
        </Reveal>

        <div className="mt-16 md:mt-24 grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-20 gap-y-14 md:gap-y-20">
          {why.map((w, i) => (
            <Reveal key={w.n} delay={i * 0.08}>
              <div className="border-t border-foreground/15 pt-6">
                <div className={`${serif} text-accent text-sm mb-3`}>{w.n}</div>
                <h3 className="text-[24px] md:text-[34px] font-bold lowercase leading-[1.05] tracking-tight">

                  {w.title}
                </h3>
                <p className="mt-4 text-[14px] leading-[1.6] text-foreground/70 max-w-[420px]">{w.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-6 py-28 md:py-48 flex flex-col items-center justify-center text-center">
        <Reveal y={24}>
          <h2
            className="font-sans font-black lowercase leading-[0.88] tracking-[-0.045em]"
            style={{ fontSize: "clamp(52px, 13vw, 220px)" }}
          >
            we don't<br />sell lights.
          </h2>
        </Reveal>
        <Reveal y={24}>
          <h2
            className="mt-6 md:mt-8 font-sans font-black lowercase leading-[0.88] tracking-[-0.045em] text-foreground/70"
            style={{ fontSize: "clamp(52px, 13vw, 220px)" }}
          >
            we shape<br />
            <span className="text-accent">experiences.</span>
          </h2>
        </Reveal>
      </section>


      <footer id="contact" className="border-t border-foreground/15 px-6 md:px-10 pt-20 pb-10">
        <div className="max-w-[1400px] mx-auto">
          <div className={`text-accent ${serif} text-lg`}>
            <span className="inline-block w-2 h-2 rounded-full bg-accent align-middle mr-2" />
            contact us.
          </div>
          <h2
            className="mt-6 font-sans font-black lowercase leading-[0.9] tracking-[-0.04em]"
            style={{ fontSize: "clamp(48px, 10vw, 140px)" }}
          >
            let's talk<br />light.
          </h2>

          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-[14px]">
            <div>
              <div className={`${serif} text-accent text-sm mb-3`}>01 — studio</div>
              <p className="text-foreground/80 leading-[1.6]">
                Plevid Group<br />
                Lower Parel<br />
                Mumbai 400013, India
              </p>
            </div>
            <div>
              <div className={`${serif} text-accent text-sm mb-3`}>02 — enquiries</div>
              <p className="text-foreground/80 leading-[1.6]">
                <a href="mailto:hello@plevid.com" className="hover:text-accent transition-colors">hello@plevid.com</a><br />
                <a href="mailto:projects@plevid.com" className="hover:text-accent transition-colors">projects@plevid.com</a>
              </p>
            </div>
            <div>
              <div className={`${serif} text-accent text-sm mb-3`}>03 — direct</div>
              <p className="text-foreground/80 leading-[1.6]">
                <a href="tel:+912240000000" className="hover:text-accent transition-colors">+91 22 4000 0000</a><br />
                Mon — Sat, 10:00 — 19:00 IST
              </p>
            </div>
          </div>

          <div className="mt-20 pt-6 border-t border-foreground/15 flex flex-col md:flex-row items-center justify-between gap-4 text-[12px] text-foreground/60">
            <img src={plevidLogo} alt="PLEVID" className="h-4 w-auto" />
            <div>Based in Mumbai · Lighting across India</div>
            <div>© {new Date().getFullYear()} Plevid Group</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
