import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Github,
} from "lucide-react";

import { InquiryForm } from "./components/InquiryForm";
import { PageLoader } from "./components/PageLoader";
import { ProjectModal } from "./components/ProjectModal";
import { TerminalSandbox } from "./components/TerminalSandbox";
import {
  EXPERIENCE_DATA,
  PROJECTS_DATA,
  SKILL_COMMENTARY,
  type Project,
} from "./data";

const NAV_ITEMS = [
  ["Work", "work"],
  ["Experience", "experience"],
  ["Skills", "skills"],
  ["Contact", "contact"],
] as const;

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function App() {
  const prefersReducedMotion = useReducedMotion();
  const pageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const isDay = true;
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const skillEntries = useMemo(() => Object.entries(SKILL_COMMENTARY).slice(0, 12), []);

  useGSAP(() => {
    if (prefersReducedMotion || !heroRef.current) return;

    const heroTimeline = gsap.timeline({
      defaults: { duration: 0.85, ease: "power4.out" },
    });

    gsap.from(".nav-shell", {
      opacity: 0,
      y: -32,
      duration: 0.8,
      ease: "power4.out",
    });

    gsap.to(".nav-shell", {
      y: -4,
      scale: 0.985,
      ease: "none",
      scrollTrigger: {
        trigger: pageRef.current,
        start: "top -40",
        end: "top -180",
        scrub: 0.45,
      },
    });

    heroTimeline
      .from(".hero-identity", { opacity: 0, y: 20 })
      .from(".hero-word", {
        opacity: 0,
        yPercent: 85,
        filter: "blur(10px)",
        stagger: 0.045,
      }, "-=0.55")
      .from(".hero-aside", { opacity: 0, y: 28 }, "-=0.52")
      .from(".hero-focus-list li", { opacity: 0, y: 12, stagger: 0.08 }, "-=0.5");

    gsap.to(".hero-outline-word", {
      "--hero-fill": "100%",
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "70% top",
        scrub: 0.8,
      },
    });

    gsap.to(".hero-ambient", {
      scale: 1.08,
      yPercent: -6,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.utils.toArray<HTMLElement>(".experience-card").forEach((card) => {
      gsap.from(card, {
        opacity: 0,
        y: 70,
        scale: 0.97,
        ease: "power3.out",
        scrollTrigger: {
          trigger: card,
          start: "top 88%",
          end: "top 58%",
          scrub: 0.7,
        },
      });
    });

    gsap.from(".skills-title > *", {
      opacity: 0,
      y: 42,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".skills-section",
        start: "top 78%",
        end: "top 48%",
        scrub: 0.6,
      },
    });

    gsap.from(".contact-copy > *", {
      opacity: 0,
      y: 34,
      stagger: 0.07,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-section",
        start: "top 80%",
        end: "top 48%",
        scrub: 0.6,
      },
    });

  }, { scope: pageRef, dependencies: [prefersReducedMotion] });

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const sections = ["hero", ...NAV_ITEMS.map(([, id]) => id)]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible?.target.id) setActiveSection(visible.target.id);
    }, { rootMargin: "-24% 0px -58%", threshold: [0.05, 0.2, 0.45] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
    setMenuOpen(false);
  };

  return (
    <div ref={pageRef} className="portfolio-shell is-day">
      <PageLoader />
      <ProjectModal
        project={selectedProject}
        isDay={isDay}
        onClose={() => setSelectedProject(null)}
      />

      <a className="skip-link" href="#main-content">Skip to content</a>

      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-shell">
          <button className="wordmark focus-ring" onClick={() => scrollTo("hero")} aria-label="Go to the top">
            <span className="wordmark-monogram">KA</span>
            <span className="wordmark-copy"><strong>Kehinde Ajibade</strong><small>Senior frontend engineer</small></span>
          </button>

          <div className="nav-links">
            {NAV_ITEMS.map(([label, id]) => (
              <button
                key={id}
                className={`nav-link focus-ring ${activeSection === id ? "is-active" : ""}`}
                onClick={() => scrollTo(id)}
                aria-current={activeSection === id ? "page" : undefined}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            <button className="nav-cta focus-ring" onClick={() => scrollTo("contact")}>Let’s work <ArrowUpRight size={16} /></button>
            <button
              className={`menu-toggle focus-ring ${menuOpen ? "is-open" : ""}`}
              onClick={() => setMenuOpen((value) => !value)}
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <span /><span />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="mobile-menu-heading">
              <span>Navigate</span>
              <span>Kehinde Ajibade</span>
            </div>
            <div className="mobile-menu-links">
              {NAV_ITEMS.map(([label, id]) => (
                <button
                  key={id}
                  className={activeSection === id ? "is-active" : ""}
                  onClick={() => scrollTo(id)}
                  aria-current={activeSection === id ? "page" : undefined}
                >
                  <strong>{label}</strong>
                  <ArrowUpRight size={20} />
                </button>
              ))}
            </div>
            <div className="mobile-menu-footer">
              <span>Scalable frontend systems for ambitious products.</span>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ajibadekehinde1%40gmail.com&su=Portfolio%20inquiry"
                target="_blank"
                rel="noreferrer"
              >
                Email Kehinde <ArrowUpRight size={18} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main id="main-content" className="main-content">
        <header ref={heroRef} id="hero" className="hero-stage">
          <div className="hero-ambient" aria-hidden="true" />
          <div className="hero-minimal">
            <div className="hero-content">
              <p className="hero-identity">
                <span>Kehinde Ajibade</span>
                <span>Senior frontend engineer · Lagos, Nigeria</span>
              </p>

              <div className="hero-layout">
              <h1 aria-label="Frontend systems built to scale.">
                <span className="hero-line" aria-hidden="true">
                  <span className="hero-word">Frontend</span>{" "}
                  <span className="hero-word">systems</span>
                </span>
                <span className="hero-line" aria-hidden="true">
                  <span className="hero-word">built</span>{" "}
                  <span className="hero-word">to</span>
                </span>
                <span className="hero-line hero-outline-word" aria-hidden="true">
                  <span className="hero-word">scale.</span>
                </span>
              </h1>

                <aside className="hero-aside">
                  <p className="hero-summary">
                    I architect performant web applications, reusable component systems, and complex API-driven experiences across AI, FinTech, SaaS, and PropTech.
                  </p>

                  <div className="hero-actions">
                    <button className="button-primary focus-ring" onClick={() => scrollTo("work")}>
                      View work <ArrowUpRight size={17} />
                    </button>
                    <a className="hero-contact-link focus-ring" href="/info">
                      Read about me <ArrowUpRight size={17} />
                    </a>
                  </div>

                  <ul className="hero-focus-list">
                    <li><span>Built with</span> React, Next.js, Vue, TypeScript</li>
                    <li><span>Focused on</span> Architecture, AI, FinTech, SaaS</li>
                  </ul>
                </aside>
              </div>
            </div>
          </div>
        </header>

        <section id="work" className="work-section section-shell">
          <div className="work-intro">
            <p>Selected production work</p>
            <p className="work-count">({String(PROJECTS_DATA.length).padStart(2, "0")})</p>
            <h2>Systems built for real scale.</h2>
            <p className="experience-summary">
              Frontend architecture across AI, bill payments, remittance, real estate, and enterprise SaaS—designed for complex workflows and long-term maintainability.
            </p>
          </div>

          <div className="project-list" role="list">
            {PROJECTS_DATA.map((project, index) => (
              <article className="project-row" key={project.id} role="listitem">
                <button
                  className="project-row-button focus-ring"
                  onClick={() => setSelectedProject(project)}
                  aria-label={`View ${project.title} case study`}
                >
                  <span className="project-row-number">{String(index + 1).padStart(2, "0")}</span>
                  <span className="project-row-copy">
                    <strong>{project.title}</strong>
                  </span>
                  <span className="project-row-meta">
                    <span>{project.year}</span>
                    <span className="project-row-view">View <ArrowUpRight size={14} /></span>
                  </span>
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="experience-section section-shell">
          <div className="experience-lead">
            <p className="experience-intro">Production experience</p>
            <h2>Built where the work gets complex.</h2>
            <p>
              The work spans AI-assisted workflows, bill-payment operations, cross-border remittance, shared design systems, and customer-facing product platforms.
            </p>
            <div className="experience-tenure" aria-label="Career timeline">
              <span>2022</span>
              <span aria-hidden="true"></span>
              <span>2026</span>
            </div>
          </div>

          <ol className="experience-list">
            {EXPERIENCE_DATA.map((experience, index) => (
              <li className="experience-card" key={experience.id}>
                <div className="experience-card-meta">
                  <span className="experience-year">{experience.duration}</span>
                  <span className="experience-order" aria-label={`Position ${index + 1}`}>{String(index + 1).padStart(2, "0")}</span>
                </div>
                <div className="experience-body">
                  <h3>{experience.role}</h3>
                  <p className="experience-company">
                    <span className="experience-company-name">{experience.company}</span>
                    <span className="experience-location">{experience.location}</span>
                  </p>
                  <p className="experience-outcome">{experience.metrics}</p>
                  <ul className="experience-kpis" aria-label={`${experience.company} results`}>
                    {experience.kpis.map((kpi) => (
                      <li key={kpi}>{kpi}</li>
                    ))}
                  </ul>
                  <ul className="experience-points" aria-label={`${experience.company} contributions`}>
                    {experience.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="skills-section section-shell">
          <div className="skills-title">
            <h2>
              Engineering that
              <span className="skills-inline-image" aria-hidden="true"><img src="/hero-workspace.png" alt="" /></span>
              scales.
            </h2>
            <p>From frontend architecture and reusable component systems to complex API integration, testing, performance, and cross-functional delivery.</p>
          </div>

          <div className="skill-marquee" aria-label="Technical skills">
            <div className="skill-track">
              {[...skillEntries, ...skillEntries].map(([skill], index) => (
                <span key={`${skill}-${index}`}>{skill}</span>
              ))}
            </div>
          </div>

          <div className="skills-grid">
            <div className="skills-copy">
              <p>
                Strongest at turning complex product requirements into maintainable frontend systems:
                architecture, reusable components, API-driven workflows, testing, and performance.
              </p>
              <a className="text-link focus-ring" href="https://github.com/kennydageek" target="_blank" rel="noreferrer">
                View GitHub <Github size={17} />
              </a>
            </div>
            <TerminalSandbox />
          </div>
        </section>

        <section id="contact" className="contact-section section-shell">
          <div className="contact-copy">
            <p className="contact-availability">Open to senior frontend opportunities, product contracts, and technical collaborations.</p>
            <h2>Let’s build the frontend foundation your product needs.</h2>
            <p>
              If you need scalable architecture, reusable UI foundations, reliable API integration, or a frontend team that can move with confidence, let’s talk.
            </p>
            <div className="contact-links">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=ajibadekehinde1%40gmail.com&su=Portfolio%20inquiry"
                target="_blank"
                rel="noreferrer"
              >
                ajibadekehinde1@gmail.com <span aria-hidden="true">↗</span>
              </a>
              <a href="https://github.com/kennydageek" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a>
              <a href="https://linkedin.com/in/kehinde-ajibade" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <InquiryForm isDay={isDay} />
        </section>
      </main>

      <footer className="site-footer">
        <span>Kehinde Ajibade · Senior frontend engineer</span>
        <span>Lagos, Nigeria · Building scalable product interfaces</span>
        <button className="focus-ring" onClick={() => scrollTo("hero")}>Back to top ↑</button>
      </footer>
    </div>
  );
}
