"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: "fade-in" | "slide-up" | "slide-in-left" | "slide-in-right" | "scale-in" | "flip-in";
  delay?: number;
  className?: string;
}

export default function AnimatedSection({
  children,
  animation = "slide-up",
  delay = 0,
  className = "",
}: AnimatedSectionProps) {
  const { isVisible, elementRef } = useScrollAnimation();

  const delayClass = delay > 0 ? `delay-${delay}` : "";
  const animationClass = isVisible ? `animate-${animation}` : "opacity-0";

  return (
    <div
      ref={elementRef}
      className={`${animationClass} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}
