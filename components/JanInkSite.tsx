"use client";

import Image from "next/image";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Clipboard,
  Facebook,
  Menu,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { categories, portfolio, PortfolioCategory, PortfolioProject } from "@/data/portfolio";

const FB_PAGE = "https://www.facebook.com/profile.php?id=61550938171124";
const FB_PERSONAL = "https://www.facebook.com/john.salceda.590330";

const heroProjects = portfolio.filter((item) => item.featured).slice(0, 4);

const styles = [
  { num: "01", title: "Japanese", body: "Masks, waves, warriors, red sun motifs, and larger compositions with movement." },
  { num: "02", title: "Black & Grey", body: "Portraits, statues, illustrative shading, and high-contrast pieces built to read on skin." },
  { num: "03", title: "Color", body: "Selective color accents or full-color compositions with controlled contrast and saturation." },
  { num: "04", title: "Anime & Custom", body: "Character work and custom illustrative concepts adapted for tattoo placement." },
  { num: "05", title: "Minimal", body: "Smaller floral, script, and clean symbolic pieces when the idea calls for restraint." },
];

const faq = [
  ["How do I ask for a quote?", "Send the concept, placement, approximate size, and reference images. John can assess the piece more accurately with those details."],
  ["Can I bring a reference design?", "Yes. References are useful for direction. The final piece can be adjusted for placement, scale, and a more personal result."],
  ["Do you do color and black & grey?", "Yes. The portfolio includes black & grey, full color, selective red accents, Japanese-inspired work, anime, geometric, and minimal pieces."],
  ["How do I book?", "Use the inquiry builder below, copy the generated brief, then message the Jan Ink Tattoo Facebook page. Booking details can be confirmed directly with John."],
];

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function JanInkSite() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 150, damping: 28, mass: 0.2 });
  const [heroIndex, setHeroIndex] = useState(0);
  const [category, setCategory] = useState<"All" | PortfolioCategory>("All");
  const [lightbox, setLightbox] = useState<PortfolioProject | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const [inquiry, setInquiry] = useState({
    name: "",
    idea: "",
    placement: "",
    size: "",
    style: "Not sure yet",
    schedule: "",
  });

  const filtered = useMemo(
    () => (category === "All" ? portfolio : portfolio.filter((item) => item.categories.includes(category))),
    [category],
  );

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => setHeroIndex((current) => (current + 1) % heroProjects.length), 5200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (!lightbox || lightbox.images.length < 2) return;
      if (event.key === "ArrowRight") setLightboxIndex((i) => (i + 1) % lightbox.images.length);
      if (event.key === "ArrowLeft") setLightboxIndex((i) => (i - 1 + lightbox.images.length) % lightbox.images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  const activeHero = heroProjects[heroIndex];

  const buildInquiry = () => [
    "Hi Jan Ink Tattoo, I’d like to ask about a tattoo.",
    "",
    `Name: ${inquiry.name || "—"}`,
    `Idea: ${inquiry.idea || "—"}`,
    `Placement: ${inquiry.placement || "—"}`,
    `Approx. size: ${inquiry.size || "—"}`,
    `Style: ${inquiry.style}`,
    `Preferred schedule: ${inquiry.schedule || "—"}`,
    "",
    "I can send reference images in Messenger.",
  ].join("\n");

  const copyInquiry = async () => {
    try {
      await navigator.clipboard.writeText(buildInquiry());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  const copyAndOpen = async () => {
    await copyInquiry();
    window.open(FB_PAGE, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="grain" aria-hidden="true" />

      <header className="nav-wrap">
        <a className="brand-lockup" href="#top" aria-label="Jan Ink Tattoo home">
          <span>JAN INK</span>
          <small>TATTOO</small>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#styles">Styles</a>
          <a href="#artist">Artist</a>
          <a href="#process">Process</a>
        </nav>
        <div className="nav-actions">
          <a className="text-link" href={FB_PAGE} target="_blank" rel="noreferrer">Facebook</a>
          <a className="button button-small" href="#book">Book a tattoo <ArrowDownRight size={16} /></a>
          <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
            {["work", "styles", "artist", "process", "book"].map((item, index) => (
              <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{item}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <section id="top" className="hero">
        <div className="hero-copy">
          <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
            Tattoo work by John Salceda
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
            INK THAT<br /><em>HOLDS</em> A STORY.
          </motion.h1>
          <motion.div className="hero-bottom" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <p>Custom tattoo work across Japanese-inspired, black & grey, color, anime, geometric, and minimal pieces.</p>
            <div className="hero-ctas">
              <a className="button" href="#work">Explore work <ArrowDownRight size={18} /></a>
              <a className="button button-ghost" href="#book">Build an inquiry</a>
            </div>
          </motion.div>
        </div>

        <div className="hero-visual">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHero.id}
              className="hero-image"
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.8 }}
            >
              <Image src={activeHero.cover} alt={`${activeHero.title} tattoo`} fill priority sizes="(max-width: 900px) 100vw, 48vw" />
            </motion.div>
          </AnimatePresence>
          <div className="hero-image-shade" />
          <div className="hero-counter">
            <span>{String(heroIndex + 1).padStart(2, "0")}</span>
            <div className="hero-lines">{heroProjects.map((item, index) => <button key={item.id} className={index === heroIndex ? "active" : ""} onClick={() => setHeroIndex(index)} aria-label={`Show ${item.title}`} />)}</div>
            <span>{String(heroProjects.length).padStart(2, "0")}</span>
          </div>
          <div className="hero-caption">
            <span>{activeHero.kicker}</span>
            <strong>{activeHero.title}</strong>
          </div>
        </div>
      </section>

      <div className="marquee" aria-hidden="true"><div>JAPANESE • BLACK & GREY • COLOR • ANIME • CUSTOM • MINIMAL • GEOMETRIC • JAPANESE • BLACK & GREY • COLOR • ANIME • CUSTOM •</div></div>

      <section id="work" className="section work-section">
        <Reveal className="section-heading">
          <div><span className="section-index">01</span><p className="eyebrow">Selected work</p></div>
          <h2>THE WORK<br />SPEAKS FIRST.</h2>
          <p className="section-copy">A curated view of John’s work. Multiple photos of the same tattoo are grouped as one project so you can inspect the piece from more than one angle.</p>
        </Reveal>

        <div className="filter-row" role="tablist" aria-label="Portfolio categories">
          {categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}
        </div>

        <motion.div layout className="portfolio-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.button
                layout
                key={project.id}
                className={`project-card aspect-${project.aspect ?? "portrait"}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.035, 0.18) }}
                onClick={() => { setLightbox(project); setLightboxIndex(0); }}
              >
                <Image src={project.cover} alt={`${project.title} tattoo`} fill sizes="(max-width: 720px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                <span className="project-shade" />
                <span className="project-meta"><small>{project.categories.join(" · ")}</small><strong>{project.title}</strong><em>{project.placement}</em></span>
                <span className="project-open"><ArrowDownRight /></span>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <AnimatePresence>
        {lightbox && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={`${lightbox.title} gallery`}>
            <button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Close gallery"><X /></button>
            <div className="lightbox-copy"><span>{lightbox.kicker}</span><h3>{lightbox.title}</h3><p>{lightbox.categories.join(" · ")}<br />{lightbox.placement}</p></div>
            <div className="lightbox-image-wrap">
              <AnimatePresence mode="wait">
                <motion.div key={lightbox.images[lightboxIndex]} className="lightbox-image" initial={{ opacity: 0, x: 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -18 }}>
                  <Image src={lightbox.images[lightboxIndex]} alt={`${lightbox.title} view ${lightboxIndex + 1}`} fill sizes="90vw" />
                </motion.div>
              </AnimatePresence>
              {lightbox.images.length > 1 && <div className="lightbox-controls"><button onClick={() => setLightboxIndex((i) => (i - 1 + lightbox.images.length) % lightbox.images.length)}><ArrowLeft /></button><span>{lightboxIndex + 1} / {lightbox.images.length}</span><button onClick={() => setLightboxIndex((i) => (i + 1) % lightbox.images.length)}><ArrowRight /></button></div>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <section id="styles" className="section styles-section">
        <Reveal className="section-heading compact">
          <div><span className="section-index">02</span><p className="eyebrow">Styles</p></div>
          <h2>RANGE WITHOUT<br />LOSING IDENTITY.</h2>
        </Reveal>
        <div className="style-list">
          {styles.map((style) => <Reveal key={style.num} className="style-row"><span>{style.num}</span><h3>{style.title}</h3><p>{style.body}</p><ArrowDownRight /></Reveal>)}
        </div>
      </section>

      <section id="artist" className="artist-section">
        <div className="artist-photo"><Image src="/images/artist/artist-working-tiny.webp" alt="John Salceda working on a tattoo" fill sizes="(max-width: 900px) 100vw, 50vw" /></div>
        <Reveal className="artist-copy">
          <span className="section-index">03</span>
          <p className="eyebrow">The artist</p>
          <h2>JOHN<br /><em>SALCEDA.</em></h2>
          <p>Jan Ink Tattoo is John Salceda’s portfolio and direct booking point. The work ranges from high-contrast black & grey to Japanese-inspired compositions, vivid color, anime, geometric, and smaller personal pieces.</p>
          <p>The site keeps the process simple: look through the work, build a clear tattoo brief, then continue the conversation directly through Facebook.</p>
          <div className="artist-links"><a className="button" href={FB_PAGE} target="_blank" rel="noreferrer"><Facebook size={17} /> Jan Ink Tattoo</a><a className="text-link" href={FB_PERSONAL} target="_blank" rel="noreferrer">John on Facebook <ArrowDownRight size={16} /></a></div>
        </Reveal>
      </section>

      <section id="process" className="section process-section">
        <Reveal className="section-heading compact"><div><span className="section-index">04</span><p className="eyebrow">Process</p></div><h2>FROM IDEA<br />TO SKIN.</h2></Reveal>
        <div className="process-grid">
          {[
            ["01", "Send the idea", "Share the concept, placement, approximate size, and references."],
            ["02", "Shape the piece", "John reviews the direction and can adjust the design for placement and readability."],
            ["03", "Confirm details", "Discuss availability, final scope, and any booking requirements directly."],
            ["04", "Tattoo session", "Show up prepared, follow the agreed session plan, and use the aftercare instructions John provides."],
          ].map(([num, title, body]) => <Reveal key={num} className="process-card"><span>{num}</span><Sparkles size={20} /><h3>{title}</h3><p>{body}</p></Reveal>)}
        </div>
      </section>

      <section id="book" className="booking-section">
        <Reveal className="booking-intro"><span className="section-index">05</span><p className="eyebrow">Tattoo inquiry builder</p><h2>MAKE THE FIRST<br />MESSAGE <em>USEFUL.</em></h2><p>Fill in the basics. The site formats a clean brief you can copy and send to Jan Ink Tattoo on Facebook. Reference photos can be attached in Messenger.</p></Reveal>
        <Reveal className="booking-form">
          <label><span>Your name</span><input value={inquiry.name} onChange={(e) => setInquiry({ ...inquiry, name: e.target.value })} placeholder="Name" /></label>
          <label className="full"><span>Tattoo idea</span><textarea value={inquiry.idea} onChange={(e) => setInquiry({ ...inquiry, idea: e.target.value })} placeholder="Describe the piece, subject, mood, or reference direction." rows={4} /></label>
          <label><span>Placement</span><input value={inquiry.placement} onChange={(e) => setInquiry({ ...inquiry, placement: e.target.value })} placeholder="Forearm, shoulder, thigh…" /></label>
          <label><span>Approximate size</span><input value={inquiry.size} onChange={(e) => setInquiry({ ...inquiry, size: e.target.value })} placeholder="e.g. 6 in / palm-size" /></label>
          <label><span>Style</span><select value={inquiry.style} onChange={(e) => setInquiry({ ...inquiry, style: e.target.value })}><option>Not sure yet</option>{categories.filter((x) => x !== "All").map((x) => <option key={x}>{x}</option>)}</select></label>
          <label><span>Preferred schedule</span><input value={inquiry.schedule} onChange={(e) => setInquiry({ ...inquiry, schedule: e.target.value })} placeholder="Any preferred date / week" /></label>
          <div className="inquiry-preview full"><span className="eyebrow">Message preview</span><pre>{buildInquiry()}</pre></div>
          <div className="booking-actions full"><button className="button button-ghost" onClick={copyInquiry}>{copied ? <Check size={17} /> : <Clipboard size={17} />}{copied ? "Copied" : "Copy inquiry"}</button><button className="button" onClick={copyAndOpen}><MessageCircle size={17} /> Copy + open Facebook</button></div>
        </Reveal>
      </section>

      <section className="section faq-section">
        <Reveal className="section-heading compact"><div><span className="section-index">06</span><p className="eyebrow">Quick answers</p></div><h2>BEFORE YOU<br />MESSAGE.</h2></Reveal>
        <div className="faq-list">
          {faq.map(([question, answer], index) => <div className={`faq-item ${openFaq === index ? "open" : ""}`} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>0{index + 1}</span><strong>{question}</strong><ChevronDown /></button><AnimatePresence initial={false}>{openFaq === index && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}><p>{answer}</p></motion.div>}</AnimatePresence></div>)}
        </div>
      </section>

      <footer className="footer">
        <div><span className="footer-mark">JAN<br />INK.</span><p>Tattoo work by John Salceda.<br />Built around the work, not a template.</p></div>
        <div className="footer-links"><a href="#work">Work</a><a href="#artist">Artist</a><a href="#book">Book</a><a href={FB_PAGE} target="_blank" rel="noreferrer">Facebook Page</a><a href={FB_PERSONAL} target="_blank" rel="noreferrer">John Salceda</a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Jan Ink Tattoo</span><span>Bookings via Facebook</span></div>
      </footer>

      <div className="mobile-dock"><a href="#work">Portfolio</a><a href="#book">Book / Message <ArrowDownRight size={16} /></a></div>
    </main>
  );
}