import { cn } from "../../utils/cn.js";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);
  const navigate = useNavigate();
  const handleButton = () => {};

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10", className)}>
      {items.map((item, idx) => (
        <Link
          to={`/post/${item.slug}`}
          key={idx}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => {
            setHoveredIndex(idx);
          }}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] bg-slate-200/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.15 } }}
                exit={{ opacity: 0, transition: { duration: 0.15, delay: 0.2 } }}
              />
            )}
          </AnimatePresence>
          <Card className="bg-blue-100 relative z-10"> {/* Ensure z-index is lower */}
            <motion.img
              src={item.image}
              alt="post cover"
              className="w-full h-[200px] rounded-2xl"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            <CardTitle className="text-2xl text-center">{item.title}</CardTitle>
            <div className="flex justify-center pt-2">
            <button
  onClick={handleButton}
  className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block"
>
  <span className="absolute inset-0 overflow-hidden rounded-full">
    <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
  </span>
  <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
    <span>{item.category}</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-4 h-4"
    >
      <path d="M10.75 8.75L14.25 12L10.75 15.25" />
    </svg>
  </div>
  <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
</button>

            </div>
            <CardDescription>
              <div
                className="p-1 text-base dark:text-gray-400 text-gray-900 text-center max-w-4xl mx-auto w-full post-content line-clamp-1"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                }}
                dangerouslySetInnerHTML={{ __html: item && item.content }}
              ></div>
            </CardDescription>
            <span className="italic text-[13px] text-gray-400 flex justify-end ">
              {item && (item.content.length / 1000).toFixed(0)} mins read
            </span>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden dark:bg-black border border-teal-500 dark:border-white/[0.2] group-hover:border-slate-700",
        className
      )}
    >
      <div className="relative">
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export const CardTitle = ({ className, children }) => {
  return (
    <h4 className={cn("dark:text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>
  );
};

export const CardDescription = ({ className, children }) => {
  return (
    <div className={cn("mt-8 dark:text-zinc-600 tracking-wide leading-relaxed text-sm", className)}>
      <div className="p-1 text-base dark:text-gray-400 text-gray-900 text-center max-w-4xl mx-auto w-full post-content line-clamp-1">
        {children}
      </div>
    </div>
  );
};
