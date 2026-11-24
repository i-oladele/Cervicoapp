import { narrate } from "../speech";
import anatomyImage from "../../assets/uterineAnatomy.webp";
import { useState, useEffect, useRef } from "react";
import imgRectangle9 from "figma:asset/11e9dc8cfd91c7f92bfa51da10baea8e03cc9379.png";
import { BackgroundLogo } from "./BackgroundLogo";
import { BottomNav } from "./BottomNav";
import { useLanguage } from "./LanguageContext";
import { useUser } from "./UserContext";
import { VideoCard } from "./VideoCard";
import { toast } from "sonner";
import {
  Activity, CalendarCheck, ChevronDown, ClipboardList, FileText, HeartHandshake, Info, Lightbulb,
  MapPin, Microscope, ShieldAlert, ShieldCheck, Smile, Stethoscope, TrendingUp, Users, Volume2, Bug,
} from "lucide-react";
import { completeModules } from "./api";
import { librarySlides, type LibraryIcon } from "../libraryContent";
import { screeningFacilities } from "../studyInfo";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

const icons: Record<LibraryIcon, typeof Info> = {
  info: Info, trend: TrendingUp, virus: Bug, risk: ShieldAlert, myth: Lightbulb, symptoms: Activity,
  prevent: ShieldCheck, who: Users, via: Stethoscope, lab: Microscope, prepare: ClipboardList,
  results: FileText, barriers: HeartHandshake, motivate: Smile, place: MapPin, book: CalendarCheck,
};

export const FAQ_COUNT = 9;

interface LibraryScreenProps {
  onNavigate: (tab: string) => void;
}

export function LibraryScreen({ onNavigate }: LibraryScreenProps) {
  const [saving, setSaving] = useState(false);
  const [currentModule, setCurrentModule] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [slidesCompleted, setSlidesCompleted] = useState(false);
  const { t, language } = useLanguage();
  const { progress, setProgress, user } = useUser();
  const entered = useRef(Date.now());
  const timing = useRef<Record<string, number>>({});

  useEffect(() => {
    entered.current = Date.now();
    return () => {
      timing.current[currentModule] = (timing.current[currentModule] || 0) + Date.now() - entered.current;
      if ("speechSynthesis" in window) speechSynthesis.cancel();
    };
  }, [currentModule]);

  const slide = librarySlides[currentModule];
  const isLastSlide = currentModule === librarySlides.length - 1;
  const done = slidesCompleted || progress.modulesCompleted;
  const SlideIcon = icons[slide.icon];
  const facilityText = (f: (typeof screeningFacilities)[number]) => f.details[language] || f.details.en || t("library.facilityFallback");

  const listen = async () => {
    if (!("speechSynthesis" in window)) {
      toast.error(t("library.listenUnsupported"));
      return;
    }
    const parts = [slide.heading[language], slide.body[language]];
    if (slide.action === "facilities") screeningFacilities.forEach((f) => parts.push(f.name, facilityText(f)));
    try {await narrate(parts.join(". "),language);} catch {toast.error(t('library.listenUnsupported'));}
  };

  const markModulesComplete = async () => {
    if (saving || !user) return;
    setSaving(true);
    try {
      const result = await completeModules(user.phone, {
        ...timing.current,
        [currentModule]: (timing.current[currentModule] || 0) + Date.now() - entered.current,
      });
      setProgress({ ...progress, modulesCompleted: true, ...result.progress });
      setSlidesCompleted(true);
      toast.success(t("library.completedToast"));
    } catch {
      toast.error(t("library.saveError"));
    } finally {
      setSaving(false);
    }
  };

  if (!progress.baselineCompleted) {
    return (
      <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
        <BackgroundLogo />
        <div className="flex-1 flex flex-col justify-center gap-[16px] px-[24px] relative z-[1]" style={fontInstrument}>
          <p className="text-[24px] text-[#008080] tracking-[-1px]" style={{ fontWeight: 600 }}>{t("library.title")}</p>
          <p className="text-[16px] text-[#333]">{t("library.lockedBaseline")}</p>
          <button
            onClick={() => onNavigate("assessment")}
            className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer"
          >
            <span className="text-[18px] text-[#8ffc86]" style={{ fontWeight: 600 }}>{t("assessment.takeBaseline")}</span>
          </button>
        </div>
        <BottomNav active="library" onNavigate={onNavigate} />
      </div>
    );
  }

  return (
    <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
      <BackgroundLogo />

      <div className="flex-1 overflow-y-auto pt-[60px] pb-[24px] relative z-[1]">
        <p className="px-[24px] text-[28px] text-[#008080] tracking-[-1.4px]" style={{ ...fontInstrument, fontWeight: 600 }}>
          {t("library.title")}
        </p>

        {/* Slide */}
        <section className="mx-[24px] mt-[16px] bg-white rounded-[12px] p-[16px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)]" style={fontInstrument} aria-live="polite">
          <p className="text-[13px] text-[#008080] uppercase tracking-[0.4px]" style={{ fontWeight: 600 }}>
            {slide.unit[language]} · {t("library.slideOf").replace("{n}", String(currentModule + 1)).replace("{total}", String(librarySlides.length))}
          </p>
          <div className="flex items-start gap-[12px] mt-[8px]">
            <div className="shrink-0 size-[40px] rounded-full bg-[#e6f4f4] flex items-center justify-center" aria-hidden="true">
              <SlideIcon size={22} color="#008080" />
            </div>
            <h2 className="text-[20px] text-black tracking-[-0.6px] leading-[1.25] pt-[6px]" style={{ fontWeight: 700 }}>
              {slide.heading[language]}
            </h2>
          </div>

          {slide.image === "anatomy" && (
            <a href={anatomyImage} target="_blank" rel="noreferrer" className="block mt-[12px]">
              <img
                src={anatomyImage}
                alt={t("library.anatomyAlt")}
                className="w-full rounded-[8px] border border-[#e5e5e5]"
                loading="lazy"
                width={1400}
                height={764}
              />
              <span className="block text-[12px] text-[#555] mt-[4px]">{t("library.enlarge")}</span>
            </a>
          )}

          <button
            onClick={listen}
            className="mt-[12px] inline-flex items-center gap-[6px] px-[12px] py-[8px] rounded-[8px] border border-[#008080] bg-white text-[#008080] cursor-pointer"
          >
            <Volume2 size={18} aria-hidden="true" />
            <span className="text-[15px]" style={{ fontWeight: 600 }}>{t("library.listen")}</span>
          </button>

          <p className="mt-[12px] text-[16px] text-black leading-[1.5] whitespace-pre-line">{slide.body[language]}</p>

          {slide.action === "facilities" && (
            <ul className="mt-[12px] flex flex-col gap-[10px]">
              {screeningFacilities.map((f) => (
                <li key={f.id} className="rounded-[8px] bg-[#f6f6f6] p-[12px]">
                  <p className="text-[15px] text-black" style={{ fontWeight: 600 }}>{f.name}</p>
                  <p className="text-[14px] text-[#444] mt-[2px]">{facilityText(f)}</p>
                </li>
              ))}
            </ul>
          )}

          {slide.action === "book" && (
            <button
              onClick={() => onNavigate("screening")}
              className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer mt-[16px]"
            >
              <span className="text-[18px] text-[#8ffc86] tracking-[-0.6px]" style={{ fontWeight: 600 }}>{t("library.book")}</span>
            </button>
          )}

          {isLastSlide && !done && (
            <p className="mt-[16px] text-[14px] text-[#555]">{t("library.completeHint")}</p>
          )}
        </section>

        {/* Navigation */}
        <div className="px-[24px] flex justify-between items-center mt-[16px]">
          <button
            onClick={() => setCurrentModule(Math.max(0, currentModule - 1))}
            className={`p-[8px] rounded-[8px] border-none cursor-pointer ${currentModule === 0 ? "bg-[#c6c6c6]" : "bg-[#9fe29a]"}`}
            disabled={currentModule === 0}
          >
            <span className={`block text-[15px] text-center min-w-[84px] ${currentModule === 0 ? "text-[#f6f6f6]" : "text-black"}`} style={{ ...fontInstrument, fontWeight: 600 }}>
              {t("library.previous")}
            </span>
          </button>
          <button
            onClick={() => (isLastSlide ? markModulesComplete() : setCurrentModule(currentModule + 1))}
            className={`p-[8px] rounded-[8px] border-none cursor-pointer flex items-center justify-center gap-[4px] ${isLastSlide && done ? "bg-black" : "bg-[#9fe29a]"}`}
            disabled={saving || (isLastSlide && done)}
          >
            {isLastSlide && done && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
            <span className={`block text-[15px] text-center min-w-[84px] ${isLastSlide && done ? "text-white" : "text-black"}`} style={{ ...fontInstrument, fontWeight: 600 }}>
              {isLastSlide && done ? t("library.completed") : saving ? t("assessment.saving") : isLastSlide ? t("library.complete") : t("library.next")}
            </span>
          </button>
        </div>

        {/* Slide indicator */}
        <div className="px-[24px] mt-[12px] flex justify-center flex-wrap gap-[8px]" aria-hidden="true">
          {librarySlides.map((s, i) => (
            <div key={s.id} className={`w-[8px] h-[8px] rounded-full ${i === currentModule ? "bg-[#008080]" : "bg-[#c6c6c6]"}`} />
          ))}
        </div>

        {/* Videos */}
        <div className="px-[24px] mt-[24px]">
          <p className="text-[24px] text-[#008080] tracking-[-1.2px] mb-[12px]" style={{ ...fontInstrument, fontWeight: 600 }}>
            {t("library.watchVideos")}
          </p>
          <div className="flex flex-col gap-[16px]">
            <VideoCard videoId="rTViRKW4PIU" thumbnail={imgRectangle9} />
            <VideoCard videoId="5ClJI3CeK_Q" thumbnail={imgRectangle9} />
          </div>
        </div>

        {/* FAQs */}
        <div className="px-[24px] mt-[24px] pb-[24px]">
          <p className="text-[24px] text-[#008080] tracking-[-1.2px] mb-[12px]" style={{ ...fontInstrument, fontWeight: 600 }}>
            {t("library.faqTitle")}
          </p>
          <div className="flex flex-col gap-[8px]">
            {Array.from({ length: FAQ_COUNT }, (_, i) => i + 1).map((num) => {
              const isOpen = openFaq === num;
              return (
                <div key={num} className="bg-white rounded-[10px] border border-[#e5e5e5] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : num)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-[14px] bg-transparent border-none cursor-pointer text-left"
                    style={fontInstrument}
                  >
                    <span className="text-[14px] text-[#333] pr-[8px] flex-1" style={{ fontWeight: 600 }}>
                      {t(`library.faq${num}.q`)}
                    </span>
                    <ChevronDown size={18} className={`text-[#008080] shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-[14px] pb-[14px]">
                      <p className="text-[13px] text-[#555] leading-[1.6]" style={fontInstrument}>
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
