import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { Project } from "../data.tsx";

interface Props {
  project: Project | null;
  isDay: boolean;
  onClose: () => void;
}

const ACCENT: Record<string, { pill: string; glow: string; dot: string; bar: string }> = {
  cyan:    { pill: "bg-cyan-400/12 border-cyan-400/25 text-cyan-400",       glow: "rgba(34,211,238,0.14)",   dot: "bg-cyan-400",    bar: "rgba(34,211,238,0.85)"   },
  yellow:  { pill: "bg-yellow-400/12 border-yellow-400/25 text-yellow-400", glow: "rgba(250,204,21,0.14)",   dot: "bg-yellow-400",  bar: "rgba(250,204,21,0.85)"   },
  blue:    { pill: "bg-blue-400/12 border-blue-400/25 text-blue-400",       glow: "rgba(96,165,250,0.14)",   dot: "bg-blue-400",    bar: "rgba(96,165,250,0.85)"   },
  emerald: { pill: "bg-emerald-400/12 border-emerald-400/25 text-emerald-400", glow: "rgba(52,211,153,0.14)", dot: "bg-emerald-400", bar: "rgba(52,211,153,0.85)"   },
  purple:  { pill: "bg-purple-400/12 border-purple-400/25 text-purple-400", glow: "rgba(192,132,252,0.14)",  dot: "bg-purple-400",  bar: "rgba(192,132,252,0.85)"  },
  orange:  { pill: "bg-orange-400/12 border-orange-400/25 text-orange-400", glow: "rgba(251,146,60,0.14)",   dot: "bg-orange-400",  bar: "rgba(251,146,60,0.85)"   },
};

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } } },
  item: {
    hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
    show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.5, ease: [0.22,1,0.36,1] } },
  },
};

const IconInfo  = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
const IconCode  = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const IconCheck = () => <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;

const getProjectLinkLabel = (url?: string, compact = false) => {
  if (url?.includes("github.com")) return compact ? "Repo" : "View GitHub Repo";
  return compact ? "Live Site" : "View Live Site";
};

export function ProjectModal({ project, isDay, onClose }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = project ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [project?.id]);

  const accent = project ? (ACCENT[project.detail.accentColor] ?? ACCENT.cyan) : ACCENT.cyan;
  const compactLinkLabel = getProjectLinkLabel(project?.url, true);
  const fullLinkLabel = getProjectLinkLabel(project?.url);
  const backgroundImage = project?.detail.backgroundImage;
  const hasBackgroundImage = Boolean(backgroundImage);

  const STEPS = project ? [
    { label: "The Problem",   sublabel: "Why it needed to exist",  body: project.detail.problem,  Icon: IconInfo  },
    { label: "My Approach",   sublabel: "How I engineered it",     body: project.detail.approach, Icon: IconCode  },
    { label: "The Outcome",   sublabel: "What it delivered",       body: project.detail.outcome,  Icon: IconCheck },
  ] : [];

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] backdrop-blur-md"
            style={{ background: "rgba(0,0,0,0.72)" }}
          />

          {/* Modal sheet */}
          <motion.div
            key="modal"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0,      opacity: 1 }}
            exit={{   y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 280, mass: 0.9 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            className={`project-modal fixed inset-x-0 bottom-0 z-[70] flex flex-col rounded-t-2xl overflow-hidden ${
              isDay
                ? "bg-white/96 border-t border-black/12"
                : "bg-[#0c0c0f]/96 border-t border-white/8"
            }`}
            style={{
              height: "92vh",
              backdropFilter: "blur(22px) saturate(1.45)",
              WebkitBackdropFilter: "blur(22px) saturate(1.45)",
              boxShadow: `0 -4px 32px ${accent.glow}, 0 -1px 0 rgba(255,255,255,0.08)`,
            }}
          >
            {backgroundImage && (
              <>
                <div
                  className="absolute inset-0 pointer-events-none bg-cover bg-center"
                  style={{
                    backgroundImage: `url(${backgroundImage})`,
                    opacity: isDay ? 0.42 : 0.38,
                  }}
                />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: isDay
                      ? "linear-gradient(180deg,rgba(255,255,255,0.74) 0%,rgba(255,255,255,0.84) 42%,rgba(255,255,255,0.94) 100%)"
                      : "linear-gradient(180deg,rgba(8,14,28,0.60) 0%,rgba(6,8,18,0.74) 46%,rgba(6,6,10,0.88) 100%)",
                  }}
                />
              </>
            )}

            {/* Drag handle */}
            <div className="relative z-10 flex justify-center pt-3 pb-1 shrink-0">
              <div className={`w-10 h-1 rounded-full ${isDay ? "bg-black/15" : "bg-white/15"}`} />
            </div>

            {/* Sticky header */}
            <div className={`project-modal-header relative z-10 flex items-center justify-between px-6 md:px-10 py-4 border-b shrink-0 ${
              isDay ? "border-black/6" : "border-white/6"
            }`}>
              <button
                onClick={onClose}
                aria-label="Close project details"
                className={`project-modal-back focus-ring flex items-center gap-2 text-xs font-semibold transition-colors group cursor-pointer rounded-full ${
                  isDay ? "text-neutral-700 hover:text-neutral-950" : "text-neutral-200 hover:text-white"
                }`}
              >
                <span className="w-7 h-7 rounded-full border flex items-center justify-center transition-colors group-hover:border-current border-current/30">
                  <ArrowLeft size={13} />
                </span>
                <span>Back</span>
              </button>

              <div className="project-modal-actions flex items-center gap-2">
                <span className={`project-modal-category text-xs font-semibold px-2.5 py-1 rounded-full border ${accent.pill}`}>
                  <span className="project-modal-category-full">{project.category}</span>
                  <span className="project-modal-category-compact">{project.category.split(" · ").at(-1)}</span>
                </span>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`project-modal-live flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all hover:scale-105 ${accent.pill}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {compactLinkLabel}
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>

            {/* Scrollable body */}
            <div ref={scrollRef} className="relative z-10 flex-1 overflow-y-auto overscroll-contain">

              {/* ─── HERO ─── */}
              <div className="relative px-6 md:px-10 lg:px-16 pt-12 pb-14 overflow-hidden">
                <div
                  className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
                />
                <motion.div
                  variants={stagger.container} initial="hidden" animate="show"
                  className="relative z-10 max-w-4xl"
                >
                  <motion.div variants={stagger.item} className="project-modal-tagline-row flex items-center gap-3 mb-6">
                    <div className={`project-modal-tagline-icon w-12 h-12 rounded-xl border flex items-center justify-center ${
                      isDay ? "bg-white/70 border-black/8" : "bg-white/5 border-white/10"
                    }`}>{project.icon}</div>
                    <p className={`project-modal-tagline text-xs font-mono uppercase tracking-widest ${
                      hasBackgroundImage
                        ? isDay ? "text-neutral-700" : "text-white/90"
                        : isDay ? "text-neutral-700" : "text-neutral-200"
                    }`}>
                      {project.detail.tagline}
                    </p>
                  </motion.div>

                  <motion.h1
                    id="project-modal-title"
                    variants={stagger.item}
                    className={`font-serif italic font-light text-[clamp(2.85rem,8vw,4.9rem)] tracking-[-0.025em] leading-[0.98] mb-8 text-balance ${
                      isDay ? "text-neutral-900" : "text-white"
                    }`}
                  >{project.title}</motion.h1>

                  <motion.div variants={stagger.item} className="flex flex-wrap gap-3">
                    {project.detail.stats.map(s => (
                      <div key={s.label} className={`px-4 py-3 rounded-xl border flex flex-col min-w-[110px] ${
                        isDay ? "bg-white/60 border-black/8" : "bg-white/[0.04] border-white/8"
                      }`}>
                        <span className={`text-xl font-serif italic font-semibold leading-none ${isDay ? "text-neutral-900" : "text-white"}`}>{s.value}</span>
                        <span className={`text-xs font-mono uppercase tracking-wider mt-1.5 ${
                          hasBackgroundImage
                            ? isDay ? "text-neutral-700" : "text-white/90"
                            : isDay ? "text-neutral-700" : "text-neutral-200"
                        }`}>{s.label}</span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              </div>

              {/* ─── CONTENT BODY ─── */}
              <div className={`border-t ${isDay ? "border-black/6" : "border-white/6"}`}>
                <div className="max-w-5xl mx-auto px-6 md:px-10 lg:px-16 py-14 space-y-16">

                  {/* Tech stack */}
                  <motion.div variants={stagger.container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
                    <motion.p variants={stagger.item} className={`text-sm font-semibold mb-4 ${
                      hasBackgroundImage
                        ? isDay ? "text-neutral-800 border-neutral-500" : "text-white/90 border-white/35"
                        : isDay ? "text-neutral-700 border-neutral-400" : "text-neutral-200 border-neutral-500"
                    }`}>Tech Stack</motion.p>
                    <motion.div variants={stagger.item} className="flex flex-wrap gap-2">
                      {project.tech.map(t => (
                        <span key={t} className={`text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border ${
                          hasBackgroundImage
                            ? isDay ? "bg-white/92 border-black/14 text-neutral-900" : "bg-black/45 border-white/18 text-white"
                            : isDay ? "bg-white/88 border-black/12 text-neutral-800" : "bg-white/8 border-white/14 text-neutral-100"
                        }`}>{t}</span>
                      ))}
                    </motion.div>
                  </motion.div>

                  {/* Overview */}
                  <motion.div variants={stagger.container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="space-y-4">
                    <motion.p variants={stagger.item} className={`text-sm font-semibold ${
                      hasBackgroundImage
                        ? isDay ? "text-neutral-800 border-neutral-500" : "text-white/90 border-white/35"
                        : isDay ? "text-neutral-700 border-neutral-400" : "text-neutral-200 border-neutral-500"
                    }`}>Overview</motion.p>
                    <motion.p variants={stagger.item} className={`text-base md:text-lg leading-relaxed ${
                      hasBackgroundImage
                        ? isDay ? "rounded-2xl border border-black/12 bg-white/92 p-5 font-normal text-neutral-950 backdrop-blur-sm" : "rounded-2xl border border-white/14 bg-black/45 p-5 font-normal text-white backdrop-blur-sm"
                        : isDay ? "font-normal text-neutral-800" : "font-normal text-neutral-100"
                    }`}>{project.detail.overview}</motion.p>
                  </motion.div>

                  {/* ─── THE STORY: numbered step flow ─── */}
                  <motion.div variants={stagger.container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="space-y-4">
                    <motion.p variants={stagger.item} className={`text-sm font-semibold ${
                      hasBackgroundImage
                        ? isDay ? "text-neutral-800 border-neutral-500" : "text-white/90 border-white/35"
                        : isDay ? "text-neutral-700 border-neutral-400" : "text-neutral-200 border-neutral-500"
                    }`}>The Story</motion.p>

                    <div className="relative space-y-3">
                      {/* Vertical spine line */}
                      <div
                        className="absolute left-[2.85rem] top-8 bottom-8 w-px hidden md:block"
                        style={{ background: `linear-gradient(to bottom, ${accent.bar}, transparent)`, opacity: 0.2 }}
                      />

                      {STEPS.map((col, idx) => (
                        <motion.div
                          key={col.label}
                          variants={stagger.item}
                          className={`project-story-card group relative rounded-2xl border overflow-hidden transition-all duration-500 ${
                            hasBackgroundImage
                              ? isDay
                                ? "bg-white/92 border-black/14 hover:bg-white/96 hover:border-black/20"
                                : "bg-black/45 border-white/14 hover:bg-black/55 hover:border-white/22"
                              : isDay
                                ? "bg-white/88 border-black/12 hover:bg-white/94 hover:border-black/16 hover:shadow-lg"
                                : "bg-white/[0.08] border-white/12 hover:bg-white/[0.12] hover:border-white/18"
                          }`}
                        >
                          {/* Hover accent wash */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                            style={{ background: `linear-gradient(105deg, ${accent.glow} 0%, transparent 55%)` }}
                          />

                          {/* Soft accent wash */}
                          <div
                            className="absolute inset-x-0 top-0 h-px opacity-60 transition-opacity duration-500"
                            style={{ background: `linear-gradient(90deg, transparent, ${accent.bar}, transparent)` }}
                          />

                          <div className="project-story-inner relative flex items-start gap-5 md:gap-7 p-6 md:p-7">
                            {/* Left: ghost number + icon */}
                            <div className="project-story-icon flex flex-col items-center gap-2 shrink-0 w-16 md:w-20">
                              <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 transition-all duration-300 group-hover:scale-110 ${
                                isDay ? "bg-white/90 border-black/12 text-neutral-700" : "bg-white/8 border-white/14 text-neutral-100"
                              }`}>
                                <col.Icon />
                              </div>
                            </div>

                            {/* Right: text */}
                            <div className="project-story-copy flex-1 min-w-0 space-y-2 py-1">
                              <div className="project-story-heading">
                              <div>
                              <p className={`text-sm font-semibold ${
                                hasBackgroundImage
                                  ? isDay ? "font-semibold text-neutral-800" : "font-semibold text-white/90"
                                  : isDay ? "text-neutral-700" : "text-neutral-200"
                              }`}>
                                {col.sublabel}
                              </p>
                              <h3 className={`text-xl md:text-2xl font-serif italic font-light tracking-tight leading-snug ${isDay ? "text-neutral-900" : "text-white"}`}>
                                {col.label}
                              </h3>
                              </div>
                              <span className={`project-story-counter text-xs font-semibold px-2 py-0.5 rounded-full border ${
                                isDay ? "border-black/10 text-neutral-700" : "border-white/12 text-neutral-100"
                              }`}>
                                {idx + 1} of 3
                              </span>
                              </div>
                              <p className={`leading-[1.85] pt-1 ${
                                hasBackgroundImage
                                  ? isDay ? "text-base font-normal text-neutral-900" : "text-base font-normal text-white"
                                  : isDay ? "text-sm text-neutral-700" : "text-sm text-neutral-100"
                              }`}>
                                {col.body}
                              </p>
                            </div>

                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Key Highlights */}
                  <motion.div variants={stagger.container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="space-y-5">
                    <motion.p variants={stagger.item} className={`text-sm font-semibold ${
                      hasBackgroundImage
                        ? isDay ? "text-neutral-800 border-neutral-500" : "text-white/90 border-white/35"
                        : isDay ? "text-neutral-700 border-neutral-400" : "text-neutral-200 border-neutral-500"
                    }`}>Key Features & Highlights</motion.p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.detail.highlights.map((h, i) => (
                        <motion.div
                          key={h.title}
                          variants={stagger.item}
                          custom={i}
                          className={`p-5 rounded-2xl border group transition-all duration-300 ${
                            hasBackgroundImage
                              ? isDay
                                ? "bg-white/92 border-black/14 hover:-translate-y-1.5 hover:bg-white/96 hover:border-black/20 hover:shadow-xl"
                                : "bg-black/45 border-white/14 hover:-translate-y-1.5 hover:bg-black/55 hover:border-white/22 hover:shadow-xl hover:shadow-cyan-950/20"
                              : isDay
                                ? "bg-white/88 border-black/12 hover:bg-white/94 hover:border-black/16 hover:shadow-md"
                                : "bg-white/[0.08] border-white/12 hover:bg-white/[0.12] hover:border-white/18"
                          }`}
                        >
                          <div className="flex items-start">
                            <div>
                              <h4 className={`font-semibold mb-1.5 ${
                                hasBackgroundImage ? "text-base" : "text-sm"
                              } ${isDay ? "text-neutral-900" : "text-white"}`}>{h.title}</h4>
                              <p className={`leading-relaxed ${
                                hasBackgroundImage
                                  ? isDay ? "text-sm md:text-[15px] font-normal text-neutral-800" : "text-sm md:text-[15px] font-normal text-white"
                                  : isDay ? "text-xs text-neutral-700" : "text-xs text-neutral-100"
                              }`}>{h.body}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Challenges — pull-quote style */}
                  <motion.div variants={stagger.container} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="space-y-4">
                    <motion.p variants={stagger.item} className={`text-sm font-semibold ${
                      hasBackgroundImage
                        ? isDay ? "text-neutral-800 border-neutral-500" : "text-white/90 border-white/35"
                        : isDay ? "text-neutral-700 border-neutral-400" : "text-neutral-200 border-neutral-500"
                    }`}>Challenges Solved</motion.p>
                    <motion.div
                      variants={stagger.item}
                      className={`relative rounded-2xl border overflow-hidden p-7 md:p-9 ${
                        hasBackgroundImage
                          ? isDay ? "bg-white/92 border-black/14" : "bg-black/45 border-white/14"
                          : isDay ? "bg-white/88 border-black/12" : "bg-white/[0.08] border-white/12"
                      }`}
                    >
                      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent.bar}, transparent)` }} />
                      {/* Ghost quote mark */}
                      <div
                        className="absolute top-3 right-6 font-serif leading-none select-none pointer-events-none"
                        style={{ fontSize: "6rem", color: isDay ? "rgba(0,0,0,0.04)" : "rgba(255,255,255,0.04)" }}
                      >"</div>
                      <p className={`text-base md:text-lg leading-[1.85] relative ${
                        hasBackgroundImage
                          ? isDay ? "font-normal text-neutral-900" : "font-normal text-white"
                          : isDay ? "font-normal text-neutral-800" : "font-normal text-neutral-100"
                      }`}>
                        {project.detail.challenges}
                      </p>
                    </motion.div>
                  </motion.div>

                  {/* CTA footer */}
                  <motion.div
                    variants={stagger.container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-50px" }}
                    className={`flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t ${
                      isDay ? "border-black/8" : "border-white/8"
                    }`}
                  >
                    <motion.div variants={stagger.item}>
                      <p className={`text-sm font-semibold mb-1 ${isDay ? "text-neutral-700" : "text-neutral-100"}`}>Want to discuss this project?</p>
                      <p className={`text-sm ${isDay ? "text-neutral-700" : "text-neutral-100"}`}>I'm available for similar work. Let's talk.</p>
                    </motion.div>
                    <motion.div variants={stagger.item} className="flex items-center gap-3 flex-wrap">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noreferrer"
                          className={`flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full border transition-all hover:scale-105 ${accent.pill}`}
                        >
                          {fullLinkLabel} <ArrowUpRight size={13} />
                        </a>
                      )}
                      <button
                        onClick={() => { onClose(); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 350); }}
                        style={{ color: isDay ? "#ffffff" : "#000000" }}
                        className={`flex items-center gap-2 text-xs font-semibold px-5 py-2.5 rounded-full transition-all hover:scale-105 cursor-pointer ${
                          isDay ? "bg-neutral-900 text-white" : "bg-white text-black"
                        }`}
                      >
                        Get in Touch <ArrowUpRight size={13} />
                      </button>
                    </motion.div>
                  </motion.div>

                  <div className="h-8" />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
