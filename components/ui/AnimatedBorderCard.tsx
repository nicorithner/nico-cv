"use client";
import React from "react";
import { cn } from "@/lib/utils";

export default function AnimatedBorderCard({
  borderRadius = "1.75rem",
  children,
  as: Component = "div",
  containerClassName,
  borderClassName,
  className,
  duration = "6s",
  trailSize = 20,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  className?: string;
  duration?: string;
  trailSize?: number;
  [key: string]: any;
}) {
  return (
    <Component
      className={cn(
        "relative p-[3px]",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      {/* Border background */}
      <div
        className={cn(
          "absolute inset-0 bg-slate-800/50 z-0",
          borderClassName
        )}
        style={{
          borderRadius: borderRadius,
          clipPath: `inset(0 0 0 0 round ${borderRadius})`,
          containerType: "inline-size",
        }}
      >
        {/* Traveling trail element */}
        <div
          className="absolute"
          style={{
            width: `${trailSize}%`,
            aspectRatio: "2 / 1",
            background: "radial-gradient(100% 100% at right, #CBACF9, #8B5CF6 30%, transparent 50%)",
            offsetPath: "border-box",
            offsetAnchor: "100% 50%",
            animation: `travel-border ${duration} infinite linear`,
          }}
        />
      </div>

      {/* Inner content container */}
      <div
        className={cn(
          "relative bg-slate-900/80 border-[3px] border-slate-800 backdrop-blur-xl text-white flex items-center justify-center w-full h-full text-sm antialiased z-10",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} - 3px)`,
          background: `linear-gradient(rgb(4,7,29), rgb(4,7,29)) padding-box, transparent`,
        }}
      >
        {children}
      </div>

      <style jsx>{`
        @keyframes travel-border {
          to {
            offset-distance: 100%;
          }
        }
      `}</style>
    </Component>
  );
}
