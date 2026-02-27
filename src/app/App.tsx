import { useState, useEffect } from "react";
import { Toaster } from "sonner";
import { MobileShell } from "./components/MobileShell";
import { SplashScreen } from "./components/SplashScreen";
import { WelcomeScreen } from "./components/WelcomeScreen";
import { ConsentScreen } from "./components/ConsentScreen";
import { AuthScreen } from "./components/AuthScreen";
import { HomeScreen } from "./components/HomeScreen";
import { LibraryScreen } from "./components/LibraryScreen";
import { ScreeningScreen } from "./components/ScreeningScreen";
import { AssessmentScreen } from "./components/AssessmentScreen";
import { LanguageProvider } from "./components/LanguageContext";
import { UserProvider } from "./components/UserContext";

type Screen = "splash" | "welcome" | "consent" | "auth" | "home" | "library" | "screening" | "assessment";

export default function App() {
  const [screen, setScreen] = useState<Screen>("splash");

  // Auto-advance from splash after 3 seconds
  useEffect(() => {
    if (screen === "splash") {
      const timer = setTimeout(() => setScreen("welcome"), 3000);
      return () => clearTimeout(timer);
    }
  }, [screen]);

  const handleNavigate = (tab: string) => {
    setScreen(tab as Screen);
  };

  const renderScreen = () => {
    switch (screen) {
      case "splash":
        return <SplashScreen onFinish={() => setScreen("welcome")} />;
      case "welcome":
        return <WelcomeScreen onGetStarted={() => setScreen("consent")} />;
      case "consent":
        return <ConsentScreen onContinue={() => setScreen("auth")} />;
      case "auth":
        return <AuthScreen onAuth={() => setScreen("home")} />;
      case "home":
        return <HomeScreen onNavigate={handleNavigate} />;
      case "library":
        return <LibraryScreen onNavigate={handleNavigate} />;
      case "screening":
        return <ScreeningScreen onNavigate={handleNavigate} />;
      case "assessment":
        return <AssessmentScreen onNavigate={handleNavigate} />;
      default:
        return <SplashScreen onFinish={() => setScreen("welcome")} />;
    }
  };

  return (
    <LanguageProvider>
      <UserProvider>
        <Toaster position="top-center" richColors />
        <MobileShell className={screen === "splash" ? "bg-black" : "bg-[#f8fafc]"}>
          {renderScreen()}
        </MobileShell>
      </UserProvider>
    </LanguageProvider>
  );
}