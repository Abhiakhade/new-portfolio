import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Images, X } from "lucide-react";
import gallery from "../data/gallery";

/* ---------- Palette (same as the rest of the site) ----------
   gold    #FFCB56  brand colour
   amber   #F59E0B  deeper accent
   butter  #FFE29A  soft accent
   ink     #120E06  page background
   cream   #FFF7E3  main text
-------------------------------------------------------------- */

const EASE = [0.22, 1, 0.36, 1];

/* Two rows that drift in opposite directions, pause on hover,
   and fade out softly at both edges. */
const marqueeCSS = `
@keyframes galleryLeft  { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
@keyframes galleryRight { from { transform: translateX(-50%) } to { transform: translateX(0) } }
.gallery-track { animation: galleryLeft 55s linear infinite; }
.gallery-track.reverse { animation-name: galleryRight; animation-duration: 65s; }
.gallery-row:hover .gallery-track { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) {
  .gallery-track { animation: none; }
  .gallery-row { overflow-x: auto; }
}`;

/* make sure one half of the track is wider than the screen */
const fill = (items, min = 6) => {
  if (!items.length) return [];
  let out = [...items];
  while (out.length < min) out = [...out, ...items];
  return out;
};

function GalleryImage({ item, onOpen }) {
  const [failed, setFailed] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      aria-label={`Open ${item.title}`}
      className="group relative mr-5 block h-[290px] w-[250px] shrink-0 overflow-hidden rounded-2xl border border-[#FFF7E3]/10 bg-[#FFF7E3]/5 text-left transition-[border-color,box-shadow] duration-500 hover:border-[#FFCB56]/60 hover:shadow-[0_20px_60px_rgba(255,203,86,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FFCB56] sm:h-[310px] sm:w-[300px]"
    >
      {failed || !item.image ? (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#FFCB56]/25 via-[#F59E0B]/10 to-[#120E06]">
          <span className="text-4xl font-bold text-[#FFCB56]/80">
            {item.title.slice(0, 2).toUpperCase()}
          </span>
        </div>
      ) : (
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
          className="h-full w-full select-none object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}

      {/* caption slides up on hover */}
      <div id="gallary" className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#120E06]/90 via-[#120E06]/10 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="translate-y-3 transition-transform duration-500 ease-out group-hover:translate-y-0">
          {item.category && (
            <span className="text-xs font-medium text-[#FFCB56]">
              {item.category}
            </span>
          )}
          <div className="mt-1 flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-[#FFF7E3]">
              {item.title}
            </h3>
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFCB56] to-[#F59E0B] text-[#120E06] transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}

function MarqueeRow({ items, reverse, onOpen }) {
  const row = useMemo(() => fill(items), [items]);
  if (!row.length) return null;

  return (
    <div
      className="gallery-row overflow-hidden py-3"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      <div className={`gallery-track flex w-max ${reverse ? "reverse" : ""}`}>
        {/* the list twice = seamless loop */}
        {[...row, ...row].map((item, i) => (
          <GalleryImage key={`${item.id}-${i}`} item={item} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}

export default function Gallery() {
  const [active, setActive] = useState(null);

  const rows = useMemo(
    () => [
      gallery.filter((_, i) => i % 2 === 0),
      gallery.filter((_, i) => i % 2 === 1),
    ],
    [],
  );
  // with only a few images, show them in both rows
  const [top, bottom] = rows[1].length ? rows : [gallery, gallery];

  // close lightbox with Escape + lock scroll
  useEffect(() => {
    if (!active) return;
    const onKey = (e) => e.key === "Escape" && setActive(null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#120E06] py-24 sm:py-32"
    >
      <style>{marqueeCSS}</style>

      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#FFCB56]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-[#F59E0B]/10 blur-[120px]" />

      <div className="relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto mb-14 max-w-7xl px-6 text-center"
        >
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFCB56]/30 bg-[#FFCB56]/5 px-4 py-1.5 text-sm text-[#FFE29A]">
            <Images size={14} />
            Gallery
          </p>
          <h2 className="bg-gradient-to-r from-[#FFF7E3] via-[#FFCB56] to-[#F59E0B] bg-clip-text text-4xl font-bold text-transparent sm:text-5xl">
            Creative Showcase
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
            className="mx-auto mt-5 h-[3px] w-20 origin-center rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B]"
          />
          <p className="mx-auto mt-5 max-w-2xl text-[#FFF7E3]/65">
            A collection of projects, UI designs and development work. Hover to
            pause, click to open.
          </p>
        </motion.div>

        {/* Two drifting rows */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="space-y-2"
        >
          <MarqueeRow items={top} onOpen={setActive} />
          <MarqueeRow items={bottom} reverse onOpen={setActive} />
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-[#120E06]/90 p-4 backdrop-blur-md sm:p-10"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-[#FFF7E3]/20 bg-[#FFF7E3]/10 text-[#FFF7E3] transition-colors hover:border-[#FFCB56]/70 hover:text-[#FFCB56]"
            >
              <X size={20} />
            </button>

            <motion.figure
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-4xl overflow-hidden rounded-3xl border border-[#FFCB56]/30 bg-[#120E06] shadow-[0_30px_100px_rgba(255,203,86,0.2)]"
            >
              <img
                src={active.image}
                alt={active.title}
                className="max-h-[75vh] w-full object-contain"
              />
              <figcaption className="flex items-center justify-between gap-4 px-6 py-4">
                <span className="font-semibold text-[#FFF7E3]">
                  {active.title}
                </span>
                {active.category && (
                  <span className="rounded-full bg-gradient-to-r from-[#FFCB56] to-[#F59E0B] px-3 py-0.5 text-xs font-semibold text-[#120E06]">
                    {active.category}
                  </span>
                )}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
