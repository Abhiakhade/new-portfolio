import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gallery from "../data/gallery";

export default function Gallery() {
return ( <section
   id="gallery"
   className="relative overflow-hidden bg-[#030712] py-24"
 >
{/* Background Blur */} <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" /> <div className="absolute -right-32 bottom-20 h-72 w-72 rounded-full bg-purple-500/10 blur-[120px]" />

```
  <div className="relative mx-auto max-w-7xl px-6">

    {/* Heading */}
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: .6 }}
      className="mb-16 text-center"
    >
      <p className="mb-3 tracking-[0.3em] uppercase text-cyan-400">
        Gallery
      </p>

      <h2 className="text-4xl font-bold text-white md:text-5xl">
        Creative Showcase
      </h2>

      <p className="mx-auto mt-5 max-w-2xl text-gray-400">
        A collection of projects, UI designs and development work.
      </p>
    </motion.div>

    {/* Grid */}
    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
      {gallery.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: .5,
            delay: index * .08,
          }}
          className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
        >
          {/* Image */}
          <div className="overflow-hidden">
            <img
              src={item.image}
              alt={item.title}
              className="
              h-80
              w-full
              object-cover
              grayscale
              transition-all
              duration-700
              group-hover:scale-110
              group-hover:grayscale-0
            "
            />
          </div>

          {/* Dark Overlay */}
          <div
            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/90
            via-black/20
            to-transparent
            opacity-70
            transition-all
            duration-500
            group-hover:opacity-20
          "
          />

          {/* Content */}
          <div
            className="
            absolute
            bottom-0
            left-0
            right-0
            p-6
          "
          >
            <span className="text-xs uppercase tracking-widest text-cyan-400">
              {item.category}
            </span>

            <div className="mt-2 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                {item.title}
              </h3>

              <motion.div
                whileHover={{
                  rotate: 45,
                  scale: 1.1,
                }}
                className="
                rounded-full
                bg-white/10
                p-2
                backdrop-blur
              "
              >
                <ArrowUpRight
                  size={18}
                  className="text-white"
                />
              </motion.div>
            </div>
          </div>

          {/* Hover Border */}
          <div
            className="
            pointer-events-none
            absolute
            inset-0
            rounded-3xl
            border-2
            border-cyan-400
            opacity-0
            transition-all
            duration-500
            group-hover:opacity-100
          "
          />
        </motion.div>
      ))}
    </div>
  </div>
</section>
);
}
