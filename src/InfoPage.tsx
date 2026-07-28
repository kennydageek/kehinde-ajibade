import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowUpRight, BookOpen, CircleDot, Crown, Guitar } from "lucide-react";

const passengerSongs = [
  "Riptide",
  "Let Her Go",
  "Staring at the Stars",
  "Wrong Direction",
  "Life’s for the Living",
];

type ChessStats = {
  rating: number;
  mode: string;
  wins: number;
  losses: number;
  draws: number;
};

const CHESS_STATS_URL = "https://api.chess.com/pub/player/kennyractural/stats";
const CHESS_STATS_CACHE_KEY = "kennyractural-chess-stats";

export default function InfoPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [chessStats, setChessStats] = useState<ChessStats | null>(() => {
    try {
      const cached = window.localStorage.getItem(CHESS_STATS_CACHE_KEY);
      return cached ? JSON.parse(cached) as ChessStats : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const previousTitle = document.title;
    document.title = "About Kehinde Ajibade — Frontend engineer, guitarist & chess beginner";

    return () => {
      document.title = previousTitle;
    };
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadChessStats() {
      try {
        const response = await fetch(CHESS_STATS_URL, {
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
        if (!response.ok) throw new Error(`Chess.com returned ${response.status}`);

        const data = await response.json() as {
          chess_rapid?: {
            last?: { rating?: number };
            record?: { win?: number; loss?: number; draw?: number };
          };
        };
        const rapid = data.chess_rapid;
        if (!rapid?.last?.rating) return;

        const nextStats: ChessStats = {
          rating: rapid.last.rating,
          mode: "Rapid",
          wins: rapid.record?.win ?? 0,
          losses: rapid.record?.loss ?? 0,
          draws: rapid.record?.draw ?? 0,
        };

        setChessStats(nextStats);
        window.localStorage.setItem(CHESS_STATS_CACHE_KEY, JSON.stringify(nextStats));
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    void loadChessStats();
    return () => controller.abort();
  }, []);

  return (
    <div className="portfolio-shell is-day info-page">
      <a className="skip-link" href="#main-content">Skip to content</a>

      <nav className="site-nav" aria-label="Primary navigation">
        <div className="nav-shell">
          <a className="wordmark focus-ring" href="/" aria-label="Kehinde Ajibade, go to the portfolio">
            <span className="wordmark-monogram">KA</span>
            <span className="wordmark-copy"><strong>Kehinde Ajibade</strong><small>Senior frontend engineer</small></span>
          </a>

          <div className="nav-links info-nav-links">
            <a className="nav-link focus-ring" href="/#work">Work</a>
            <a className="nav-link focus-ring" href="/#experience">Experience</a>
            <a className="nav-link focus-ring" href="/#skills">Skills</a>
            <a className="nav-link is-active focus-ring" href="/info" aria-current="page">About</a>
          </div>

          <div className="nav-actions">
            <a
              className="nav-cta focus-ring"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ajibadekehinde1%40gmail.com&su=Portfolio%20inquiry"
              target="_blank"
              rel="noreferrer"
            >
              Let’s work <ArrowUpRight size={16} />
            </a>
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
              <a href="/#work"><strong>Work</strong><ArrowUpRight size={20} /></a>
              <a href="/#experience"><strong>Experience</strong><ArrowUpRight size={20} /></a>
              <a href="/#skills"><strong>Skills</strong><ArrowUpRight size={20} /></a>
              <a className="is-active" href="/info" aria-current="page"><strong>About</strong><ArrowUpRight size={20} /></a>
              <a href="/#contact"><strong>Contact</strong><ArrowUpRight size={20} /></a>
            </div>
            <div className="mobile-menu-footer">
              <span>Scalable frontend systems, plus a few excellent hobbies.</span>
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
        <section className="info-hero">
          <div className="info-hero-copy">
            <a className="info-back focus-ring" href="/"><ArrowLeft size={15} /> Back to work</a>
            <p className="info-label">The human behind the components</p>
            <h1>The story,<br />with fewer bugs.</h1>
            <div className="info-intro">
              <p>
                I’m Kehinde Ajibade, a senior frontend engineer in Lagos. I build scalable
                interfaces, reusable systems, and the occasional feature whose requirements
                begin with “it should be simple.”
              </p>
              <p>
                I studied Microbiology, so technically I never stopped dealing with bugs.
                They just moved from petri dishes into browsers and became much more opinionated.
              </p>
            </div>
          </div>

          <figure className="info-hero-visual">
            <img src="/info/fingerstyle-acoustic-guitar.jpg" alt="A hand playing an acoustic guitar fingerstyle" />
            <figcaption>
              <Guitar size={18} />
              <span><strong>Fingerstyle department</strong> Currently overplaying “Riptide” with confidence.</span>
            </figcaption>
          </figure>
        </section>

        <section className="info-section info-music">
          <div className="info-section-heading">
            <span>01 · After the laptop closes</span>
            <h2>Six strings.<br />Several feelings.</h2>
          </div>
          <div className="music-copy">
            <p>
              I play fingerstyle acoustic guitar—the art of making one instrument do several
              jobs because apparently delegation is optional.
            </p>
            <p>
              Passenger is the default setting, Johnny Drille is always welcome, and any song
              that tells a proper story gets my attention.
            </p>
          </div>
          <ol className="song-list" aria-label="Favourite songs to play">
            {passengerSongs.map((song, index) => (
              <li key={song}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{song}</strong>
                <small>{index === 0 ? "Current favourite" : "Passenger rotation"}</small>
              </li>
            ))}
          </ol>
        </section>

        <section className="info-section info-chess">
          <figure className="info-photo-panel">
            <img src="/info/wooden-chessboard.jpg" alt="Wooden chess pieces facing each other on a chessboard" loading="lazy" />
          </figure>
          <div className="chess-copy">
            <span className="info-label">
              The {chessStats ? `${chessStats.rating}-${chessStats.mode.toLowerCase()}` : "live-rating"} department
            </span>
            <h2>Still learning.<br />Still blundering.</h2>
            <p>
              With Black, I trust the Caro-Kann. With White, I choose the Scotch Gambit.
              Is that a coherent chess philosophy? Ask me again after I stop hanging pieces.
            </p>
            <dl className="chess-stats">
              <div>
                <dt>Chess.com rating</dt>
                <dd>{chessStats ? `${chessStats.rating} ${chessStats.mode}` : "Syncing…"}</dd>
              </div>
              <div>
                <dt>Rapid record</dt>
                <dd>
                  {chessStats
                    ? `${chessStats.wins}W · ${chessStats.losses}L · ${chessStats.draws}D`
                    : "Fetching live data"}
                </dd>
              </div>
              <div><dt>As Black</dt><dd>Caro-Kann</dd></div>
              <div><dt>As White</dt><dd>Scotch Gambit</dd></div>
              <div><dt>Chess.com</dt><dd><a href="https://www.chess.com/member/kennyractural" target="_blank" rel="noreferrer">kennyractural ↗</a></dd></div>
            </dl>
            <Crown className="chess-ghost" aria-hidden="true" />
          </div>
        </section>

        <section className="info-section info-sport">
          <div className="sport-copy">
            <span className="info-label">Match-day operating system</span>
            <h2>Chelsea,<br />for better or worse.</h2>
            <p>
              I love football and support Chelsea FC—an excellent long-term exercise in hope,
              tactical analysis, and pretending the table is temporary.
            </p>
            <p className="sport-aside">
              I played basketball too. The game and I eventually had creative differences
              about minimum height requirements.
            </p>
          </div>
          <figure className="sport-photo">
            <img src="/info/football-on-pitch.jpg" alt="A football resting on a grass pitch" loading="lazy" />
            <figcaption><CircleDot size={16} /> Football first. Optimism second.</figcaption>
          </figure>
        </section>

        <section className="info-section info-culture">
          <div className="info-section-heading">
            <span>02 · Stories worth disappearing into</span>
            <h2>What I consume<br />when code compiles.</h2>
          </div>
          <div className="culture-shelf">
            <article>
              <span>TV · 01</span>
              <h3>Prison Break</h3>
              <p>A masterclass in planning, commitment, and requirements changing every season.</p>
            </article>
            <article>
              <span>TV · 02</span>
              <h3>Game of Thrones</h3>
              <p>Complex systems, competing stakeholders, catastrophic deployment decisions.</p>
            </article>
            <article>
              <span>Book · 01</span>
              <h3>Mastery</h3>
              <p>Robert Greene on the unfashionable magic of staying with the work long enough.</p>
            </article>
          </div>
          <div className="culture-note"><BookOpen size={20} /> Good stories have architecture too.</div>
        </section>

        <section className="info-cta">
          <p>You now know the important things.</p>
          <h2>Ask me about frontend architecture, chess openings, or songs worth learning.</h2>
          <div>
            <a
              className="button-primary focus-ring"
              href="https://mail.google.com/mail/?view=cm&fs=1&to=ajibadekehinde1%40gmail.com&su=Portfolio%20inquiry"
              target="_blank"
              rel="noreferrer"
            >
              Start a conversation <ArrowUpRight size={17} />
            </a>
            <a className="info-text-link focus-ring" href="/#work">View my work <ArrowUpRight size={16} /></a>
          </div>
        </section>
      </main>

      <footer className="info-footer">
        <span>Kehinde Ajibade · Lagos, Nigeria</span>
        <a href="/">Back to portfolio ↑</a>
      </footer>
    </div>
  );
}
