import React, { useState, useRef, useEffect } from "react";
import { TerminalLine } from "../types";

export const TerminalSandbox: React.FC = () => {
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "output", text: "Kehinde interface console · ready" },
    { type: "output", text: "Choose a quick command or type 'help' to explore the work." }
  ]);
  const [inputVal, setInputVal] = useState<string>("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const presets = [
    { label: "help", cmd: "help" },
    { label: "about", cmd: "about" },
    { label: "skills", cmd: "skills" },
    { label: "timeline", cmd: "timeline" },
    { label: "metrics", cmd: "metrics" },
    { label: "academics", cmd: "education" }
  ];

  const handleRunCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    let output = "";

    switch (cmd) {
      case "help":
        output = `Available system parameters:
  help         - Lists all functional commands
  about        - Short professional narrative of Kehinde
  skills       - Prints the full engineering stack
  timeline     - Showcases engineering positions
  metrics      - Outputs critical key-metric optimizations (+40% UX)
  education    - School credentials from the CV
  clear        - Clears the active console dashboard`;
        break;
      case "about":
        output = `Kehinde Ajibade is a Senior Frontend Engineer with 4+ years of experience architecting scalable, performant applications across AI, FinTech, SaaS, and PropTech using React, Next.js, Vue.js, and TypeScript.`;
        break;
      case "skills":
        output = `LANGUAGES: JavaScript, TypeScript
FRONTEND: React, Next.js, Vue.js, Nuxt.js, Capacitor
BACKEND: Node.js, Express.js
DATABASES: MongoDB, PostgreSQL
TESTING: Jest, Vue Test Utils, Test-Driven Development
DELIVERY: Agile, Scrum, Technical Leadership, Cross-functional Collaboration`;
        break;
      case "timeline":
        output = `CHRONOLOGICAL JOURNAL:
  - Enyata (Nov 2025-Present): AI/RAG interfaces, frontend architecture, credit metering, and workflow automation
  - SMC DAO (Apr 2026-Present): Peniremit bill-payment administration and AI recruitment workflows
  - Pertinence Group (Mar 2023-Nov 2025): Enterprise product architecture and shared component systems
  - Pertinence Group, Intern (Jan 2022-Feb 2023): OneApp features and performance improvements
  - Dwayremit (Jan 2022-Mar 2023): Cross-border remittance and payment applications`;
        break;
      case "metrics":
        output = `SELECTED DELIVERY:
  - Led architecture across user and admin applications
  - Built AI chat, RAG discovery, credit metering, and visual workflow automation
  - Established shared component systems across four enterprise products
  - Reduced OneApp's bundle size by 100KB
  - Packaged web applications for Android and iOS with Capacitor`;
        break;
      case "education":
        output = `ACADEMIC SUMMARY:
  - Obafemi Awolowo University (Graduated February 2022) - B.Sc. Microbiology
  - Relevant coursework: Introduction to Java Programming (CSC201)
  - Certifications: JavaScript, Node.js and MongoDB, Algorithms and Data Structures`;
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      default:
        output = `Command '${raw}' not found. Type 'help' to review list of active controllers.`;
    }

    setHistory((prev) => [
      ...prev,
      { type: "input", text: raw },
      { type: "output", text: output }
    ]);
    setInputVal("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  return (
    <section className="core-console" aria-label="Interactive portfolio console">
      <div>
        <header className="console-header">
          <div className="console-title">
            <span className="console-prompt-mark">~/</span>
            <strong>kehinde.console</strong>
          </div>
          <span className="console-status">interactive</span>
        </header>

        <div className="console-log custom-terminal-scroll">
          {history.map((h, i) => (
            <div key={i} className={`console-line ${h.type}`}>
              {h.type === "input" ? (
                <div className="console-command">
                  <span aria-hidden="true">$</span>
                  <span>{h.text}</span>
                </div>
              ) : (
                <div className="console-output">{h.text}</div>
              )}
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </div>

      <div className="console-controls">
        <div className="console-presets">
          <span className="console-presets-label">Quick commands</span>
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => handleRunCommand(p.cmd)}
              className="console-preset focus-ring"
            >
              {p.label}
            </button>
          ))}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRunCommand(inputVal);
          }}
          className="console-input-row"
        >
          <span className="console-input-prompt" aria-hidden="true">$</span>
          <input
            type="text"
            aria-label="Terminal command"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Run a command…"
            className="console-input"
          />
        </form>
      </div>
    </section>
  );
};
