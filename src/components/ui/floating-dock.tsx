"use client";

import { cn } from "@/lib/utils";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  return (
    <div className={cn("flex justify-center items-center w-full", className)}>
      <FloatingDockUniversal items={items} />
    </div>
  );
};

// ✅ Single Component for Both Mobile & Desktop
const FloatingDockUniversal = ({
  items,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
}) => {
  const mouseX = useMotionValue(Infinity);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full bg-green-300 dark:bg-neutral-800 flex md:hidden items-center justify-center mb-2"
      >
        <IconLayoutNavbarCollapse className="h-5 w-5 text-green-500 dark:text-neutral-900" />
      </button>

      {/* Floating Dock (Visible on all screen sizes) */}
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 gap-4 items-end rounded-2xl bg-gray-100 dark:bg-neutral-900 px-4 pb-3"
      >
        {items.map((item) => (
          <IconContainer mouseX={mouseX} key={item.title} {...item} />
        ))}
      </motion.div>
    </div>
  );
};

// Icon Component with Hover Effect
function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Smooth hover effect
  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const widthIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  const heightIconTransform = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

  const width = useSpring(widthTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const height = useSpring(heightTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const widthIcon = useSpring(widthIconTransform, { mass: 0.1, stiffness: 150, damping: 12 });
  const heightIcon = useSpring(heightIconTransform, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="aspect-square rounded-full bg-green-200 dark:bg-neutral-800 flex items-center justify-center relative"
      >
        {/* Tooltip on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="px-2 py-0.5 rounded-md bg-green-300 border dark:bg-neutral-800 border-gray-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Icon inside button */}
        <motion.div style={{ width: widthIcon, height: heightIcon }} className="flex items-center justify-center">
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}
