import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MusicProvider } from "./contexts/MusicContext";
import { RouteProvider, useRoute } from "./contexts/RouteContext";
import HackerCodeEffect from "./components/HackerCodeEffect";
import Home from "./pages/Home";
import TurningPoint from "./pages/TurningPoint";
import Milestones from "./pages/Milestones";
import FeishengZheXingdong from "./pages/FeishengZheXingdong";
import ErrorBoundary from "./components/ErrorBoundary";

function PageRenderer() {
  const { currentPage } = useRoute();

  return (
    <div className="relative">
      {/* Home Page */}
      <div
        className={`transition-opacity duration-500 ${
          currentPage === "home" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-0"
        }`}
      >
        <Home />
      </div>

      {/* Milestones Page */}
      <div
        className={`transition-opacity duration-500 ${
          currentPage === "milestones" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-0"
        }`}
      >
        <Milestones />
      </div>

      {/* Turning Point Page */}
      <div
        className={`transition-opacity duration-500 ${
          currentPage === "turning-point" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-0"
        }`}
      >
        <TurningPoint />
      </div>

      {/* Feisheng Zhe Xingdong Page */}
      <div
        className={`transition-opacity duration-500 ${
          currentPage === "feisheng-zhe-xingdong" ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none absolute inset-0"
        }`}
      >
        <FeishengZheXingdong />
      </div>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <HackerCodeEffect />
      <MusicProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <RouteProvider>
              <PageRenderer />
            </RouteProvider>
          </TooltipProvider>
        </ThemeProvider>
      </MusicProvider>
    </ErrorBoundary>
  );
}

export default App;
