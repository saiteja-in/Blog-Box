import {
    motion,
    useMotionValue,
    useTransform,
    useMotionValueEvent,
  } from "framer-motion";
  import { useState } from "react";
  import "./styles.css";
  
  const FoldableMap = () => {
    // Create a motion value to track the drag position
    const xDrag = useMotionValue(0);
    // State to track whether the map is folded or not
    const [isFolded, setIsFolded] = useState(true);
  
    // Transformations for the left, right, and center sections based on drag position
    const xLeftSection = useTransform(xDrag, [0, 150], ["100%", "0%"]);
    const xRightSection = useTransform(xDrag, [0, 150], ["-100%", "0%"]);
    const centerScale = useTransform(xDrag, [75, 150], [0, 1]);
    const centerBrightness = useTransform(xDrag, [75, 150], [0.2, 1]);
  
    // Update the isFolded state based on the drag position
    useMotionValueEvent(xDrag, "change", (currentX) => {
      if (currentX > 130) {
        setIsFolded(false);
      } else {
        setIsFolded(true);
      }
    });
  
    return (
        <>
        <div className="">Open it</div>
      <div className="overflow-x-clip">
        <motion.div
          animate={isFolded ? "folded" : "open"}
          variants={{
              open: { scale: 1 },
              folded: { scale: 0.9 },
              }}
              initial="folded"
              className="relative flex flex-col items-center"
              >
          <motion.div
            variants={{ open: { rotate: 0 }, hovering: { rotate: 0 } }}
            whileHover="hovering"
            initial={{ rotate: 3 }}
            className="grid aspect-video max-h-[50vh] w-full min-w-[400px] p-4"
            >
            <div className="grid grid-cols-3 [grid-area:1/1]">
              <motion.div
                style={{ x: xLeftSection, skewY: "-1deg" }}
                className="map-image origin-bottom-right border-r border-[rgba(255,255,255,.1)] shadow-lg"
                />
              <motion.div
                style={{
                    scaleX: centerScale,
                    "--brightness": centerBrightness,
                    }}
                    className="map-image brightness-[--brightness]"
                    />
              <motion.div
                style={{ x: xRightSection, skewY: "1deg" }}
                className="map-image origin-bottom-left border-l border-[rgba(255,255,255,.1)] shadow-lg"
                />
            </div>
            <motion.div
              drag="x"
              _dragX={xDrag}
              dragConstraints={{ left: 0, right: 150 }}
              dragTransition={{
                  modifyTarget: (target) => {
                      return target > 75 ? 150 : 0;
                },
                timeConstant: 45,
              }}
              className="relative z-10 cursor-grab [grid-area:1/1] active:cursor-grabbing"
              />
          </motion.div>
          <motion.div
            variants={{
                folded: {
                    opacity: 0,
                    scale: 0.9,
                    y: 30,
                    },
                    open: {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        },
                        }}
                        className="flex w-full justify-center text-lg font-semibold md:text-2xl"
                        >
            <p className="rounded-xl bg-white px-6 py-3 text-[hsl(73_69%_26%)]">
              Welcome to my blog
            </p>
          </motion.div>
        </motion.div>
      </div>
              </>
    );
  };
  
  export default FoldableMap;
  