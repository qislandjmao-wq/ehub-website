import React, { createContext, useContext, useState, useCallback } from "react";

export type PageType = "home" | "milestones" | "turning-point" | "feisheng-zhe-xingdong";

interface RouteContextType {
  currentPage: PageType;
  navigateTo: (page: PageType) => void;
  previousPage: PageType | null;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [previousPage, setPreviousPage] = useState<PageType | null>(null);

  const navigateTo = useCallback((page: PageType) => {
    setPreviousPage(currentPage);
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <RouteContext.Provider value={{ currentPage, navigateTo, previousPage }}>
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error("useRoute must be used within RouteProvider");
  }
  return context;
}
