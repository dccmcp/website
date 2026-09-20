"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const supportsTilt = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Pointer-tracking 3D tilt. The transform is written straight to the node from
 * the event handler, so there is no React re-render and no animation library
 * on the critical path. Ignored on touch devices and for reduced-motion users.
 */
export function TiltCard({
  children,
  className,
  intensity = 6,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node || event.pointerType === "touch" || !supportsTilt()) return;
    const rect = node.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(1200px) rotateX(${(-y * intensity * 2).toFixed(2)}deg) rotateY(${(x * intensity * 2).toFixed(2)}deg)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transform-gpu transition-transform duration-200 ease-[var(--ease-out-soft)] will-change-transform",
        className,
      )}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      {children}
    </div>
  );
}
