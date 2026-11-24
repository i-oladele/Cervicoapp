import { RecoverySettings } from "./RecoveryCode";
import { useState, useEffect } from "react";
import img3DiconsFileTextDynamicColor from "../../assets/3b2c1ffa27c5ea87c5bf8baa40559c17cefa558d.png";
import img3DiconsNotebookDynamicColor from "figma:asset/daa3b4e3a939e95bb002892d86e013e60c242b18.png";
import img3DiconsCopyDynamicColor from "figma:asset/15c0a9c33d08ea2f8ec0afb10ad1d88796ddb2e5.png";
import imgIstockphoto from "figma:asset/86dbc51e2c0e72a85706bfbd9962dfd792e02e28.png";
import imgFrame193 from "figma:asset/11e9dc8cfd91c7f92bfa51da10baea8e03cc9379.png";
import { BackgroundLogo } from "./BackgroundLogo";
import { BottomNav } from "./BottomNav";
import { Circle } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import { useUser } from "./UserContext";
import { VideoCard } from "./VideoCard";
import { NotificationCenter } from "./NotificationCenter";
import { getScreeningData, updateScreeningCompletion, clearSession } from "./api";
import { LogOut } from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "./ui/alert-dialog";
import { toast } from "sonner";
import { ScreeningCompletionModal } from "./ScreeningCompletionModal";
import FigmaCheckCircleHome from "../../imports/CheckCircle-10-491";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
  onLogout?: () => void;
}

export function HomeScreen({ onNavigate, onLogout }: HomeScreenProps) {
  const { t } = useLanguage();
  const { user, progress, setUser, setProgress } = useUser();

  const logOut = () => {
    clearSession();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    setUser(null);
    setProgress({ baselineCompleted: false, modulesCompleted: false, endlineCompleted: false });
    toast.success(t("home.loggedOut"));
    onLogout?.();
  };
  const [screeningData, setScreeningData] = useState<any>(null);
  const [hasCheckedScreening, setHasCheckedScreening] = useState<boolean | null>(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [savingAnswer, setSavingAnswer] = useState(false);

  const answerScreening = async (completed: boolean) => {
    if (!user || savingAnswer) return;
    const previous = hasCheckedScreening;
    setHasCheckedScreening(completed);
    setSavingAnswer(true);
    try {
      const result = await updateScreeningCompletion(user.phone, completed);
      if (result?.screening) setScreeningData(result.screening);
      toast.success(t("home.screeningSaved"));
    } catch {
      setHasCheckedScreening(previous);
      toast.error(t("home.screeningSaveError"));
    } finally {
      setSavingAnswer(false);
    }
  };

  // Fetch screening data on component mount
  useEffect(() => {
    const fetchScreeningData = async () => {
      if (user) {
        try {
          const screening = await getScreeningData(user.phone);
          setScreeningData(screening);
          setHasCheckedScreening(screening?.completed ? true : screening?.selfReportedAt ? false : null);
        } catch (error) {
          console.log("No screening data found:", error);
          setScreeningData(null);
        }
      }
    };

    fetchScreeningData();
  }, [user]);

  // Check for completion confirmation in URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('confirm_completion') === 'true' && screeningData && !screeningData.completed) {
      setShowCompletionModal(true);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [screeningData]);

  // Calculate progress percentage
  const completedCount = [progress.baselineCompleted, progress.modulesCompleted, progress.endlineCompleted].filter(Boolean).length;
  const progressPercent = Math.round((completedCount / 3) * 100);

  return (
    <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
      <BackgroundLogo />

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto pt-[60px] pb-[24px] relative z-[1]">
        {/* Welcome Header */}
        <div className="px-[24px] flex justify-between items-start">
          <div>
            <h1
              className="text-[28px] text-[#008080] tracking-[-1.4px]"
              style={{ ...fontInstrument, fontWeight: 600 }}
            >
              {t("home.welcome").replace(/,\s*$/, "")}
            </h1>
            <p
              className="text-[24px] text-black tracking-[-1.2px] mt-[4px]"
              style={{ ...fontInstrument, fontWeight: 500 }}
            >
              {t("home.letsStart")}
            </p>
          </div>
          <div className="flex items-start gap-[2px]">
            <NotificationCenter />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button
                  type="button"
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center gap-[2px] bg-transparent border-none cursor-pointer"
                >
                  <LogOut size={20} className="text-gray-600" aria-hidden="true" />
                  <span className="text-[11px] text-gray-600 leading-none" style={fontInstrument}>{t("home.logout")}</span>
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent style={fontInstrument}>
                <AlertDialogHeader>
                  <AlertDialogTitle>{t("home.logoutTitle")}</AlertDialogTitle>
                  <AlertDialogDescription>{t("home.logoutBody")}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>{t("home.cancel")}</AlertDialogCancel>
                  <AlertDialogAction onClick={logOut} className="bg-[#008080] hover:bg-[#006b6b] text-white">{t("home.logout")}</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <RecoverySettings />
        {/* Progress Section */}
        <div className="px-[24px] mt-[20px]">
          <p
            className="text-[16px] text-black tracking-[-0.48px] mb-[8px]"
            style={{ ...fontInstrument, fontWeight: 500 }}
          >
            {t("home.progress")}
          </p>
          <div className="flex gap-[16px] items-center">
            <div className="flex-1 bg-[#e0e0e0] rounded-[12px] h-[6px]">
              <div className="bg-[#9fe29a] h-[6px] rounded-[12px]" style={{ width: `${progressPercent}%` }} />
            </div>
            <p
              className="text-[16px] text-[#008080] tracking-[-0.48px]"
              style={{ ...fontInstrument, fontWeight: 700 }}
            >
              {progressPercent}%
            </p>
          </div>
        </div>

        {/* Task Cards */}
        <div className="px-[24px] mt-[16px] flex flex-col gap-[12px]">
          {/* Baseline Assessment */}
          <div className="bg-white rounded-[8px] p-[16px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] flex items-center justify-between">
            <div className="flex gap-[16px] items-center">
              <div className="relative shrink-0 size-[24px] overflow-hidden">
                <img alt="" className="absolute h-[113.64%] left-[-5.47%] max-w-none top-[-6.25%] w-[112.2%]" src={img3DiconsFileTextDynamicColor} />
              </div>
              <p className="text-[16px] text-black tracking-[-0.48px]" style={{ ...fontInstrument, fontWeight: 500 }}>
                {t("home.baseline")}
              </p>
            </div>
            {progress.baselineCompleted ? (
              <div className="w-[18px] h-[18px] shrink-0">
                <span aria-hidden="true" className="contents"><FigmaCheckCircleHome /></span>
                <span className="sr-only">{t("library.completed")}</span>
              </div>
            ) : (
              <>
                <Circle size={18} color="#008080" strokeWidth={1.5} aria-hidden="true" />
                <span className="sr-only">{t("home.notDone")}</span>
              </>
            )}
          </div>

          {/* Knowledge Modules */}
          <div className="bg-white rounded-[8px] p-[16px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] flex items-center justify-between">
            <div className="flex gap-[16px] items-center">
              <div className="relative shrink-0 w-[24px] h-[27px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img3DiconsNotebookDynamicColor} />
              </div>
              <p className="text-[16px] text-black tracking-[-0.48px]" style={{ ...fontInstrument, fontWeight: 500 }}>
                {t("home.modules")}
              </p>
            </div>
            {progress.modulesCompleted ? (
              <div className="w-[18px] h-[18px] shrink-0">
                <span aria-hidden="true" className="contents"><FigmaCheckCircleHome /></span>
                <span className="sr-only">{t("library.completed")}</span>
              </div>
            ) : (
              <>
                <Circle size={18} color="#008080" strokeWidth={1.5} aria-hidden="true" />
                <span className="sr-only">{t("home.notDone")}</span>
              </>
            )}
          </div>

          {/* Endline Assessment */}
          <div className="bg-white rounded-[8px] p-[16px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] flex items-center justify-between">
            <div className="flex gap-[16px] items-center">
              <div className="relative shrink-0 w-[24px] h-[30px] overflow-hidden">
                <img alt="" className="absolute h-[112.52%] left-[-23.37%] max-w-none top-[-6.05%] w-[140.6%]" src={img3DiconsCopyDynamicColor} />
              </div>
              <p className="text-[16px] text-black tracking-[-0.48px]" style={{ ...fontInstrument, fontWeight: 500 }}>
                {t("home.endline")}
              </p>
            </div>
            {progress.endlineCompleted ? (
              <div className="w-[18px] h-[18px] shrink-0">
                <span aria-hidden="true" className="contents"><FigmaCheckCircleHome /></span>
                <span className="sr-only">{t("library.completed")}</span>
              </div>
            ) : (
              <>
                <Circle size={18} color="#008080" strokeWidth={1.5} aria-hidden="true" />
                <span className="sr-only">{t("home.notDone")}</span>
              </>
            )}
          </div>
        </div>

        {/* Continue Button */}
        <div className="px-[24px] mt-[16px]">
          <button
            onClick={() => onNavigate("library")}
            className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer"
          >
            <p className="text-[20px] text-center text-[#8ffc86] tracking-[-0.9px]" style={{ ...fontInstrument, fontWeight: 700 }}>
              {t("home.continue")}
            </p>
          </button>
        </div>

        {/* Screening CTA */}
        <div className="px-[24px] mt-[16px]">
          {screeningData ? (
            // User has booked screening - show Yes/No options
            <div className="bg-[#f6f6f6] rounded-[8px] p-[16px] flex gap-px items-center">
              <div className="flex flex-col gap-[8px] w-[216px]">
                <p className="text-[16px] text-black tracking-[-0.48px]" style={{ ...fontInstrument, fontWeight: 500 }}>
                  {t("home.screeningQuestion")}
                </p>
                <div className="flex gap-[8px]">
                  <button
                    onClick={() => answerScreening(true)}
                    disabled={savingAnswer}
                    aria-pressed={hasCheckedScreening === true}
                    className={`p-[8px] rounded-[8px] border-none cursor-pointer flex-1 ${
                      hasCheckedScreening ? "bg-[#008080] text-white" : "bg-white text-black border border-gray-300"
                    }`}
                  >
                    <p className="text-[15px] text-center" style={{ ...fontInstrument, fontWeight: 600 }}>
                      {t("home.yes")}
                    </p>
                  </button>
                  <button
                    onClick={() => answerScreening(false)}
                    disabled={savingAnswer}
                    aria-pressed={hasCheckedScreening === false}
                    className={`p-[8px] rounded-[8px] border-none cursor-pointer flex-1 ${
                      hasCheckedScreening === false ? "bg-[#008080] text-white" : "bg-white text-black border border-gray-300"
                    }`}
                  >
                    <p className="text-[15px] text-center" style={{ ...fontInstrument, fontWeight: 600 }}>
                      {t("home.no")}
                    </p>
                  </button>
                </div>
                {hasCheckedScreening === false && (
                  <div className="flex flex-col gap-[6px]">
                    <p className="text-[13px] text-[#555]" style={fontInstrument}>{t("home.screeningNotYet")}</p>
                    <button
                      onClick={() => onNavigate("screening")}
                      className="bg-[#9fe29a] p-[8px] rounded-[8px] border-none cursor-pointer w-fit"
                    >
                      <span className="text-[14px] text-black" style={{ ...fontInstrument, fontWeight: 600 }}>{t("home.changeDate")}</span>
                    </button>
                  </div>
                )}
              </div>
              <div className="relative shrink-0 size-[102px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIstockphoto} />
              </div>
            </div>
          ) : (
            // User has not booked screening - show original CTA
            <div className="bg-[#f6f6f6] rounded-[8px] p-[16px] flex gap-px items-center">
              <div className="flex flex-col gap-[8px] w-[216px]">
                <p className="text-[16px] text-black tracking-[-0.48px]" style={{ ...fontInstrument, fontWeight: 500 }}>
                  {t("home.noScreening")}
                </p>
                <button
                  onClick={() => onNavigate("screening")}
                  className="bg-[#9fe29a] p-[8px] rounded-[8px] border-none cursor-pointer w-fit"
                >
                  <p className="text-[15px] text-black text-center w-[84px]" style={{ ...fontInstrument, fontWeight: 600 }}>
                    {t("home.bookNow")}
                  </p>
                </button>
              </div>
              <div className="relative shrink-0 size-[102px]">
                <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIstockphoto} />
              </div>
            </div>
          )}
        </div>

        {/* Learn Section */}
        <div className="px-[24px] mt-[24px]">
          <p
            className="text-[20px] text-black tracking-[-0.6px] mb-[16px]"
            style={{ ...fontInstrument, fontWeight: 500 }}
          >
            {t("home.learnTitle")}
          </p>

          {/* Video Cards */}
          <div className="flex flex-col gap-[16px]">
            {progress.baselineCompleted && <VideoCard videoId="rTViRKW4PIU" thumbnail={imgFrame193} />}

            {progress.baselineCompleted && <VideoCard videoId="5ClJI3CeK_Q" thumbnail={imgFrame193} />}

            <button
              onClick={() => onNavigate("library")}
              className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer"
            >
              <p className="text-[20px] text-center text-[#8ffc86] tracking-[-0.9px]" style={{ ...fontInstrument, fontWeight: 700 }}>
                {t("home.learnMore")}
              </p>
            </button>
          </div>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
      
      {/* Screening Completion Modal */}
      <ScreeningCompletionModal 
        isOpen={showCompletionModal} 
        onClose={() => setShowCompletionModal(false)}
        onAnswered={(screening) => {
          setScreeningData(screening);
          setHasCheckedScreening(screening?.completed ? true : false);
        }}
      />
    </div>
  );
}