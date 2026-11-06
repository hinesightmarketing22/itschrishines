import { useEffect, useState } from "react";

type Path = "founders" | "creators" | null;

const LINKEDIN = { label: "LinkedIn", handle: "thecoachchris", href: "https://www.linkedin.com/in/thecoachchris/" };

const FOUNDER_LINKS = [
  { label: "YouTube", handle: "@nextroundvc", href: "https://youtube.com/@nextroundvc" },
  { label: "Instagram", handle: "@nextroundvc", href: "https://instagram.com/nextroundvc" },
  { label: "TikTok", handle: "@nextroundvc", href: "https://tiktok.com/@nextroundvc" },
  LINKEDIN,
];

const CREATOR_LINKS = [
  { label: "YouTube", handle: "@itschrishines", href: "https://youtube.com/@itschrishines" },
  { label: "Instagram", handle: "@itschrishines", href: "https://instagram.com/itschrishines" },
  { label: "TikTok", handle: "@itschrishines", href: "https://tiktok.com/@itschrishines" },
  LINKEDIN,
];

const readPath = (): Path => {
  const h = window.location.hash.replace("#", "");
  return h === "founders" || h === "creators" ? h : null;
};

const track = (name: string) => {
  try {
    // Works with GoatCounter or Plausible if either script is added to index.html
    const w = window as unknown as {
      goatcounter?: { count: (o: { path: string; title: string; event: boolean }) => void };
      plausible?: (e: string) => void;
    };
    w.goatcounter?.count({ path: name, title: name, event: true });
    w.plausible?.(name);
  } catch {
    /* analytics are optional */
  }
};

function LinkRows({ links, accent }: { links: typeof FOUNDER_LINKS; accent: string }) {
  return (
    <ul className="mt-8 border-t border-[#E5E5E5]">
      {links.map((l) => (
        <li key={l.href}>
          <a
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between border-b border-[#E5E5E5] py-4"
          >
            <span className="text-[15px] font-medium text-[#0A0A0A]">{l.label}</span>
            <span className="flex items-center gap-3 text-[14px] text-[#6B6B6B]">
              {l.handle}
              <span
                aria-hidden
                className="transition-transform duration-200 group-hover:translate-x-1"
                style={{ color: accent }}
              >
                →
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

function SubstackForm({ src, title }: { src: string; title: string }) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-[#E5E5E5] bg-white">
      <iframe
        src={src}
        title={title}
        width="100%"
        height="180"
        style={{ border: 0, background: "white", display: "block" }}
        scrolling="no"
        loading="lazy"
      />
    </div>
  );
}

export default function Index() {
  const [path, setPath] = useState<Path>(readPath);

  useEffect(() => {
    const onHash = () => setPath(readPath());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const choose = (p: Exclude<Path, null>) => {
    setPath(p);
    const url = new URL(window.location.href);
    url.hash = p;
    window.history.replaceState(null, "", url.toString());
    track(`path-${p}`);
    setTimeout(() => document.getElementById("path")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  const topBar = path === "founders" ? "#2BB487" : path === "creators" ? "#003594" : "#0A0A0A";

  return (
    <div className="min-h-screen bg-white text-[#0A0A0A] font-sans antialiased">
      <div className="h-1.5 w-full transition-colors duration-500" style={{ background: topBar }} />

      <main className="mx-auto w-full max-w-[520px] px-5 pb-16 pt-12 sm:pt-16">
        {/* Header */}
        <header className="flex flex-col items-center text-center">
          <img
            src="/chris.jpg"
            alt="Chris Hines"
            className="h-28 w-28 rounded-full object-cover grayscale"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              document.getElementById("avatar-fallback")?.removeAttribute("hidden");
            }}
          />
          <div
            id="avatar-fallback"
            hidden
            className="flex h-28 w-28 items-center justify-center rounded-full bg-[#0A0A0A] font-serif text-4xl text-white"
          >
            CH
          </div>
          <h1 className="mt-6 font-serif text-[52px] leading-none tracking-[-0.01em]">Chris Hines</h1>
          <p className="mt-4 text-[17px] text-[#6B6B6B]">I work with founders and creators.</p>
        </header>

        {/* Path picker */}
        <div className="mt-10 grid grid-cols-2 gap-3" role="tablist" aria-label="Choose your path">
          <button
            role="tab"
            aria-selected={path === "founders"}
            onClick={() => choose("founders")}
            className={`rounded-full border px-4 py-4 text-[15px] font-semibold transition-colors duration-300 ${
              path === "founders"
                ? "border-[#0C0C0B] bg-[#0C0C0B] text-white"
                : "border-[#0A0A0A] bg-white text-[#0A0A0A] hover:bg-[#F5F5F5]"
            }`}
          >
            I'm a founder
          </button>
          <button
            role="tab"
            aria-selected={path === "creators"}
            onClick={() => choose("creators")}
            className={`rounded-full border px-4 py-4 text-[15px] font-semibold transition-colors duration-300 ${
              path === "creators"
                ? "border-[#0A1630] bg-[#0A1630] text-white"
                : "border-[#0A0A0A] bg-white text-[#0A0A0A] hover:bg-[#F5F5F5]"
            }`}
          >
            I'm a creator
          </button>
        </div>

        <div id="path" className="scroll-mt-6" />

        {/* Founder path */}
        {path === "founders" && (
          <section className="mt-10 animate-in fade-in slide-in-from-bottom-2 duration-500" aria-label="Founders">
            <div className="rounded-3xl bg-[#0C0C0B] px-7 py-9 text-[#EDE8DF]">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8FA79C]">For founders</p>
              <h2 className="mt-3 font-serif text-[40px] leading-[1.02]">Next Round Ready</h2>
              <p className="mt-3 font-serif text-[24px] leading-[1.2] text-[#EDE8DF]">
                For founders building real businesses, funded or <em className="text-[#2BB487]">not</em>.
              </p>
            </div>

            <SubstackForm src="https://nextroundready.substack.com/embed" title="Subscribe to Next Round Ready" />

            <a
              href="https://nextroundready.substack.com/survey/10271646"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("founder-profile")}
              className="mt-4 flex w-full items-center justify-center rounded-full bg-[#1A9E72] px-6 py-4 text-[15px] font-semibold text-white transition-opacity hover:opacity-90"
            >
              Take the 90-second founder profile
            </a>

            <LinkRows links={FOUNDER_LINKS} accent="#1A9E72" />
          </section>
        )}

        {/* Creator path */}
        {path === "creators" && (
          <section className="mt-10 animate-in fade-in slide-in-from-bottom-2 duration-500" aria-label="Creators">
            <div className="rounded-3xl bg-[#0A1630] px-7 py-9 text-[#F1F3F8]">
              <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-[#8B9CC8]">For creators</p>
              <h2 className="mt-3 font-serif text-[40px] leading-[1.02]">
                It's Chris Hines<span className="text-[#FFA300]">.</span>
              </h2>
              <p className="mt-3 font-serif text-[24px] leading-[1.2]">
                Helping podcasters and creators get discovered and grow.
              </p>
            </div>

            <SubstackForm src="https://itschrishines.substack.com/embed" title="Subscribe to It's Chris Hines" />

            <LinkRows links={CREATOR_LINKS} accent="#003594" />
          </section>
        )}

        {!path && (
          <p className="mt-8 text-center text-[14px] text-[#6B6B6B]">Pick one to see where to follow along.</p>
        )}

        <footer className="mt-16 text-center text-[13px] text-[#6B6B6B]">© Chris Hines</footer>
      </main>
    </div>
  );
}
