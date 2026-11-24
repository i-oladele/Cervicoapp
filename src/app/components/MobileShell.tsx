import React, { useState, useEffect } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

export function MobileShell({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    // On real mobile devices: full-screen, no phone frame
    return (
      <main className={`w-full h-dvh overflow-hidden ${className}`}>
        {children}
      </main>
    );
  }

  // On desktop: show the decorative iPhone shell
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <main
        className={`relative w-[393px] overflow-hidden ${className}`}
        // Never taller than the browser window, so buttons stay reachable on laptops
        style={{ height: "min(852px, calc(100dvh - 32px))", borderRadius: "40px", boxShadow: "0 0 60px rgba(0,0,0,0.3)" }}
      >
        {children}
      </main>
    </div>
  );
}