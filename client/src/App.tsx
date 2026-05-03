import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { MusicProvider } from "./contexts/MusicContext";
import HackerCodeEffect from "./components/HackerCodeEffect";
import Home from "./pages/Home";
import TurningPoint from "./pages/TurningPoint";
import Milestones from "./pages/Milestones";
import FeishengZheXingdong from "./pages/FeishengZheXingdong";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/turning-point"} component={TurningPoint} />
      <Route path={"/milestones"} component={Milestones} />
      <Route path={"/milestones/feisheng-zhe-xingdong"} component={FeishengZheXingdong} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <HackerCodeEffect />
      <MusicProvider>
        <ThemeProvider
          defaultTheme="dark"
          // switchable
        >
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </MusicProvider>
    </ErrorBoundary>
  );
}

export default App;
