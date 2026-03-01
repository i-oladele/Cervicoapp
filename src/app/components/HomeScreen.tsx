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
import FigmaCheckCircleHome from "../../imports/CheckCircle-10-491";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

interface HomeScreenProps {
  onNavigate: (tab: string) => void;
}

export function HomeScreen({ onNavigate }: HomeScreenProps) {
  const { t } = useLanguage();
  const { user, progress } = useUser();

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
            <p
              className="text-[28px] text-[#008080] tracking-[-1.4px]"
              style={{ ...fontInstrument, fontWeight: 600 }}
            >
              {t("home.welcome")}
            </p>
            <p
              className="text-[24px] text-black tracking-[-1.2px] mt-[4px]"
              style={{ ...fontInstrument, fontWeight: 500 }}
            >
              {t("home.letsStart")}
            </p>
          </div>
          <NotificationCenter />
        </div>

        {/* Progress Section */}
        <div className="px-[24px] mt-[20px]">
          <p
            className="text-[16px] text-black tracking-[-0.48px] mb-[8px]"
            style={{ ...fontInstrument, fontWeight: 500 }}
          >
            {t("home.progress")}
          </p>
          <div className="flex gap-[16px] items-center">
            <div className="flex-1 bg-black rounded-[12px] h-[6px]">
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
                <FigmaCheckCircleHome />
              </div>
            ) : (
              <Circle size={18} color="#008080" strokeWidth={1.5} />
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
                <FigmaCheckCircleHome />
              </div>
            ) : (
              <Circle size={18} color="#008080" strokeWidth={1.5} />
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
                <FigmaCheckCircleHome />
              </div>
            ) : (
              <Circle size={18} color="#008080" strokeWidth={1.5} />
            )}
          </div>
        </div>

        {/* Continue Button */}
        <div className="px-[24px] mt-[16px]">
          <button
            onClick={() => onNavigate("library")}
            className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer"
          >
            <p className="text-[18px] text-center text-[#8ffc86] tracking-[-0.9px]" style={{ ...fontInstrument, fontWeight: 600 }}>
              {t("home.continue")}
            </p>
          </button>
        </div>

        {/* Screening CTA */}
        <div className="px-[24px] mt-[16px]">
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
            <VideoCard videoId="rTViRKW4PIU" thumbnail={imgFrame193} />

            <VideoCard videoId="5ClJI3CeK_Q" thumbnail={imgFrame193} />

            <button
              onClick={() => onNavigate("library")}
              className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer"
            >
              <p className="text-[18px] text-center text-[#8ffc86] tracking-[-0.9px]" style={{ ...fontInstrument, fontWeight: 600 }}>
                {t("home.learnMore")}
              </p>
            </button>
          </div>
        </div>
      </div>

      <BottomNav active="home" onNavigate={onNavigate} />
    </div>
  );
}