import { useState } from "react";
import imgRectangle9 from "figma:asset/11e9dc8cfd91c7f92bfa51da10baea8e03cc9379.png";
import { BackgroundLogo } from "./BackgroundLogo";
import { BottomNav } from "./BottomNav";
import { useLanguage } from "./LanguageContext";
import { useUser } from "./UserContext";
import { VideoCard } from "./VideoCard";
import { ChevronDown } from "lucide-react";
import { completeModules } from "./api";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

interface LibraryScreenProps {
  onNavigate: (tab: string) => void;
}

export function LibraryScreen({ onNavigate }: LibraryScreenProps) {
  const [currentModule, setCurrentModule] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [slidesCompleted, setSlidesCompleted] = useState(false);
  const [videosWatched, setVideosWatched] = useState<Set<string>>(new Set());
  const { t } = useLanguage();
  const { progress, setProgress, user } = useUser();

  const faqKeys = [1, 2, 3, 4, 5, 6, 7, 8];

  const modules = [
    {
      title: t("library.m1.title"),
      content: [
        { heading: t("library.m1.h1"), text: t("library.m1.t1") },
        { heading: t("library.m1.h2"), text: t("library.m1.t2") },
        { heading: t("library.m1.h3"), text: t("library.m1.t3") },
        { heading: t("library.m1.h4"), text: t("library.m1.t4") },
        { heading: t("library.m1.h5"), text: t("library.m1.t5") },
        { heading: t("library.m1.h6"), text: t("library.m1.t6") },
      ],
    },
    {
      title: t("library.m2.title"),
      content: [
        { heading: t("library.m2.h1"), text: t("library.m2.t1") },
        { heading: t("library.m2.h2"), text: t("library.m2.t2") },
        { heading: t("library.m2.h3"), text: t("library.m2.t3") },
        { heading: t("library.m2.h4"), text: t("library.m2.t4") },
      ],
    },
    {
      title: t("library.m3.title"),
      content: [
        { heading: t("library.m3.h1"), text: t("library.m3.t1") },
        { heading: t("library.m3.h2"), text: t("library.m3.t2") },
        { heading: t("library.m3.h3"), text: t("library.m3.t3") },
      ],
    },
  ];

  const module = modules[currentModule];
  const isLastSlide = currentModule === modules.length - 1;

  const markModulesComplete = async () => {
    const updated = { ...progress, modulesCompleted: true };
    setProgress(updated);
    // Persist to server
    if (user) {
      try {
        await completeModules(user.phone);
      } catch (err) {
        console.error("Failed to persist modules completion:", err);
      }
    }
  };

  const handleCompleteSlides = () => {
    setSlidesCompleted(true);
    // Check if both videos are also watched
    if (videosWatched.size >= 2) {
      markModulesComplete();
    }
  };

  const handleVideoPlay = (videoId: string) => {
    const updated = new Set(videosWatched);
    updated.add(videoId);
    setVideosWatched(updated);
    // Check if slides are also completed
    if (slidesCompleted && updated.size >= 2) {
      markModulesComplete();
    }
  };

  return (
    <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
      <BackgroundLogo />

      <div className="flex-1 overflow-y-auto pt-[60px] pb-[24px] relative z-[1]">
        {/* Title */}
        <p
          className="px-[24px] text-[28px] text-[#008080] tracking-[-1.4px] w-[342px]"
          style={{ ...fontInstrument, fontWeight: 600 }}
        >
          {t("library.title")}
        </p>

        {/* Content */}
        <div className="px-[24px] mt-[16px]">
          <div
            className="text-[16px] text-black tracking-[-0.8px]"
            style={{ ...fontInstrument, fontWeight: 400 }}
          >
            {module.content.map((section, idx) => (
              <div key={idx} className="mb-[16px]">
                <p className="mb-[4px]" style={{ fontWeight: 700 }}>
                  {section.heading}
                </p>
                <p className="whitespace-pre-line">{section.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="px-[24px] flex justify-between items-center mt-[16px]">
          <button
            onClick={() => setCurrentModule(Math.max(0, currentModule - 1))}
            className={`p-[8px] rounded-[8px] border-none cursor-pointer ${
              currentModule === 0 ? "bg-[#c6c6c6]" : "bg-[#9fe29a]"
            }`}
            disabled={currentModule === 0}
          >
            <p
              className={`text-[15px] text-center w-[84px] ${
                currentModule === 0 ? "text-[#f6f6f6]" : "text-black"
              }`}
              style={{ ...fontInstrument, fontWeight: 600 }}
            >
              {t("library.previous")}
            </p>
          </button>
          <button
            onClick={() => {
              if (isLastSlide) {
                handleCompleteSlides();
              } else {
                setCurrentModule(currentModule + 1);
              }
            }}
            className={`p-[8px] rounded-[8px] border-none cursor-pointer ${
              isLastSlide && slidesCompleted ? "bg-[#c6c6c6]" : "bg-[#9fe29a]"
            }`}
            disabled={isLastSlide && slidesCompleted}
          >
            <p
              className={`text-[15px] text-center w-[84px] ${
                isLastSlide && slidesCompleted ? "text-[#f6f6f6]" : "text-black"
              }`}
              style={{ ...fontInstrument, fontWeight: 600 }}
            >
              {isLastSlide ? t("library.complete") : t("library.next")}
            </p>
          </button>
        </div>

        {/* Module indicator */}
        <div className="px-[24px] mt-[12px] flex justify-center gap-[8px]">
          {modules.map((_, i) => (
            <div
              key={i}
              className={`w-[8px] h-[8px] rounded-full ${
                i === currentModule ? "bg-[#008080]" : "bg-[#c6c6c6]"
              }`}
            />
          ))}
        </div>

        {/* Watch Videos Section */}
        <div className="px-[24px] mt-[24px]">
          <p
            className="text-[24px] text-[#008080] tracking-[-1.2px] mb-[12px]"
            style={{ ...fontInstrument, fontWeight: 600 }}
          >
            {t("library.watchVideos")}
          </p>
          <div className="flex flex-col gap-[16px]">
            <VideoCard videoId="rTViRKW4PIU" thumbnail={imgRectangle9} onPlay={() => handleVideoPlay("rTViRKW4PIU")} />
            <VideoCard videoId="5ClJI3CeK_Q" thumbnail={imgRectangle9} onPlay={() => handleVideoPlay("5ClJI3CeK_Q")} />
          </div>
        </div>

        {/* FAQs Section */}
        <div className="px-[24px] mt-[24px] pb-[24px]">
          <p
            className="text-[24px] text-[#008080] tracking-[-1.2px] mb-[12px]"
            style={{ ...fontInstrument, fontWeight: 600 }}
          >
            {t("library.faqTitle")}
          </p>
          <div className="flex flex-col gap-[8px]">
            {faqKeys.map((num) => {
              const isOpen = openFaq === num;
              return (
                <div
                  key={num}
                  className="bg-white rounded-[10px] border border-[#e5e5e5] overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : num)}
                    className="w-full flex items-center justify-between p-[14px] bg-transparent border-none cursor-pointer text-left"
                    style={fontInstrument}
                  >
                    <span
                      className="text-[14px] text-[#333] pr-[8px] flex-1"
                      style={{ fontWeight: 600 }}
                    >
                      {t(`library.faq${num}.q`)}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`text-[#008080] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-[14px] pb-[14px]">
                      <p
                        className="text-[13px] text-[#555] leading-[1.6]"
                        style={fontInstrument}
                      >
                        {t(`library.faq${num}.a`)}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav active="library" onNavigate={onNavigate} />
    </div>
  );
}