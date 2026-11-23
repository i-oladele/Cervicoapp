import anatomyImage from "../../assets/uterineAnatomy.png";
import { useState, useEffect, useRef } from "react";
import imgRectangle9 from "figma:asset/11e9dc8cfd91c7f92bfa51da10baea8e03cc9379.png";
import { BackgroundLogo } from "./BackgroundLogo";
import { BottomNav } from "./BottomNav";
import { useLanguage } from "./LanguageContext";
import { useUser } from "./UserContext";
import { VideoCard } from "./VideoCard";
import { toast } from "sonner";
import { ChevronDown } from "lucide-react";
import { completeModules } from "./api";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

interface LibraryScreenProps {
  onNavigate: (tab: string) => void;
}

export function LibraryScreen({ onNavigate }: LibraryScreenProps) {
  const [saving,setSaving]=useState(false);
  const [currentModule, setCurrentModule] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [slidesCompleted, setSlidesCompleted] = useState(false);
  const [videosWatched, setVideosWatched] = useState<Set<string>>(new Set());
  const { t, language } = useLanguage();
  const entered=useRef(Date.now());
  const timing=useRef<Record<string,number>>({});
  useEffect(()=>{entered.current=Date.now();return ()=>{timing.current[currentModule]=(timing.current[currentModule]||0)+Date.now()-entered.current;if ('speechSynthesis' in window) speechSynthesis.cancel();};},[currentModule]);
  const { progress, setProgress, user } = useUser();

  const faqKeys = [1, 2, 3, 4, 5, 6, 7, 8];

  const modules = [1,2,3].flatMap(n => Array.from({length:n===1?6:n===2?4:3},(_,i)=>({title:t(`library.m${n}.title`),content:[{heading:t(`library.m${n}.h${i+1}`),text:t(`library.m${n}.t${i+1}`)}]})));

  modules.push(...(language==='yo' ? [
 {title:'Ìmúrasílẹ̀',content:[{heading:'Ṣáájú àyẹ̀wò',text:'Béèrè lọ́wọ́ ilé ìwòsàn bí o ṣe yẹ kí o múra sílẹ̀ fún irú àyẹ̀wò rẹ. Sọ bí o bá lóyún tàbí tí o ń rí ẹ̀jẹ̀. O lè béèrè fún àṣírí, àlàyé tàbí kí wọ́n dákẹ́ dúró nígbàkúgbà.'}]},
 {title:'Àbájáde',content:[{heading:'Lẹ́yìn àyẹ̀wò',text:'Àbájáde tí kò déédé kò túmọ̀ sí pé o ní jẹjẹrẹ. Ó lè nílò àyẹ̀wò mìíràn tàbí ìtọ́jú. Béèrè nígbà tí àbájáde yóò dé, kí o sì padà fún ìtọ́jú tí wọ́n bá ní kí o ṣe.'}]},
 {title:'Ibi àyẹ̀wò',content:[{heading:'Ilé ìwòsàn ìwádìí',text:'State Specialist Hospital, Asubiaro, Osogbo àti State Hospital, Oke-Ogbo, Ile-Ife. Béèrè lọ́wọ́ olùrànlọ́wọ́ ìwádìí nípa owó, ọjọ́ àti àkókò àyẹ̀wò. VIA ń lo acetic acid; VILI ń lo Lugol’s iodine láti wo àyípadà ọrùn ilé-ọmọ.'}]}
 ] : [
 {title:'Prepare for screening',content:[{heading:'Before your visit',text:'Ask the clinic how to prepare for your particular test. Tell staff if you are pregnant or bleeding. You can ask for privacy, an explanation or a pause at any time.'}]},
 {title:'After screening',content:[{heading:'Understanding results',text:'An abnormal result does not mean you have cancer. You may need further tests or treatment. Ask when results will be ready and attend the follow-up recommended by the clinic.'}]},
 {title:'Where to get screened',content:[{heading:'Study facilities and visual inspection',text:'State Specialist Hospital, Asubiaro, Osogbo and State Hospital, Oke-Ogbo, Ile-Ife. Ask your research assistant to confirm costs, clinic days and opening hours before travelling. VIA uses acetic acid; VILI uses Lugol’s iodine to look for cervical changes.'}]}
 ]));
  const module = modules[currentModule];
  const isLastSlide = currentModule === modules.length - 1;

  const markModulesComplete = async () => {
    if(saving)return;setSaving(true);
    const updated = { ...progress, modulesCompleted: true };

    // Persist to server
    if (user) {
      try {
        const result = await completeModules(user.phone, {...timing.current,[currentModule]:(timing.current[currentModule]||0)+Date.now()-entered.current});
        setProgress({...updated,...result.progress});
        setSlidesCompleted(true);
      } catch (err) {
        toast.error(language === "yo" ? "A kò lè fi ìparí pamọ́. Tún gbìyànjú." : "Could not save completion. Please retry.");
      } finally {setSaving(false);}
    } else {setSaving(false);}
  };

  const handleCompleteSlides = () => {
    markModulesComplete();
  };

  const handleVideoPlay = (videoId: string) => {
    const updated = new Set(videosWatched);
    updated.add(videoId);
    setVideosWatched(updated);
    // Check if slides are also completed

  };

  if (!progress.baselineCompleted) return <div className="size-full flex flex-col p-6 justify-center"><p>Complete your baseline assessment before opening the learning library.</p><button onClick={()=>onNavigate('assessment')}>{t('assessment.takeBaseline')}</button><BottomNav active="library" onNavigate={onNavigate}/></div>;
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

        <div className="px-6 mt-4"><h2 className="font-semibold">{module.title}</h2><img src={anatomyImage} alt={language==='yo'?'Àwòrán ilé-ọmọ àti ọrùn ilé-ọmọ':'Anatomy of the uterus and cervix'} className="max-h-40 mx-auto"/><button className="p-3 border rounded" onClick={()=>{if(!('speechSynthesis' in window))return;const utterance=new SpeechSynthesisUtterance(module.content.map(s=>s.heading+'. '+s.text).join(' '));utterance.lang=language==='yo'?'yo-NG':'en-NG';speechSynthesis.cancel();speechSynthesis.speak(utterance);}}>{language==='yo'?'Gbọ́':'Listen'}</button></div>
        {/* Content */}
        <div className="px-[24px] mt-[16px]">
          <div
            className="text-[16px] text-black tracking-[-0.8px]"
            style={{ ...fontInstrument, fontWeight: 400 }}
          >
            {module.content.map((section, idx) => {
              // Hide the instruction section when slides are completed
              if (section.heading === "Complete Your Learning" && slidesCompleted) {
                return null;
              }
              return (
                <div key={idx} className="mb-[16px]">
                  <p className="mb-[4px]" style={{ fontWeight: 700 }}>
                    {section.heading}
                  </p>
                  <p className="whitespace-pre-line">{section.text}</p>
                  {section.heading === "Pick a screening date today" && (
                    <button
                      onClick={() => onNavigate("screening")}
                      className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer mt-[12px]"
                    >
                      <p className="text-[18px] text-center text-[#8ffc86] tracking-[-0.9px]" style={{ ...fontInstrument, fontWeight: 600 }}>
                        Book Screening Appointment
                      </p>
                    </button>
                  )}
                </div>
              );
            })}
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
            className={`p-[8px] rounded-[8px] border-none cursor-pointer flex items-center justify-center gap-[4px] ${
              isLastSlide && slidesCompleted ? "bg-black" : "bg-[#9fe29a]"
            }`}
            disabled={saving || (isLastSlide && slidesCompleted)}
          >
            {isLastSlide && slidesCompleted && (
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
            <p
              className={`text-[15px] text-center w-[84px] ${
                isLastSlide && slidesCompleted ? "text-white" : "text-black"
              }`}
              style={{ ...fontInstrument, fontWeight: 600 }}
            >
              {isLastSlide && slidesCompleted ? "Completed" : (isLastSlide ? t("library.complete") : t("library.next"))}
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