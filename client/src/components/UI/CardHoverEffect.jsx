import { cn } from "../../utils/cn.js";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";

export const HoverEffect = ({ items, className }) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <>
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-10",
          className
        )}
      >
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
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.15 },
                  }}
                  exit={{
                    opacity: 0,
                    transition: { duration: 0.15, delay: 0.2 },
                  }}
                />
              )}
            </AnimatePresence>
            <Card className="bg-blue-100">
              <motion.img
                src={item.image}
                alt="post cover"
                className="w-full h-[200px] rounded-2xl"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
              <CardTitle className="text-2xl text-center">{item.title}</CardTitle>
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
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export const Card = ({ className, children }) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full p-4 overflow-hidden dark:bg-black border border-teal-500 dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}
    >
      <div className="relative z-50">
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
    <div
      className={cn(
        "mt-8 dark:text-zinc-600 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      <div  className="p-1 text-base dark:text-gray-400 text-gray-900 text-center max-w-4xl mx-auto w-full post-content line-clamp-1">
        {children}
      </div>
    </div>
  );
};

