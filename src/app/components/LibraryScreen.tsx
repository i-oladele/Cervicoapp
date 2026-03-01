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
      title: "Unit 1: Introduction to Cervical Cancer",
      content: [
        { heading: "Definition", text: "Cervical cancer is a disease that occurs when abnormal cells grow uncontrollably in the cervix and form a tumor." },
        { heading: "Basic Anatomy of the Cervix", text: "The cervix is the lower, narrow part of the uterus (womb).\n\nIt connects the uterus to the vagina and plays an important role in:\n\n• Menstruation\n• Pregnancy\n• Childbirth" },
        { heading: "What is Cervical Cancer?", text: "Cervical cancer develops when cells in the cervix change (become abnormal) and continue growing without control. These changes usually happen slowly over many years." },
        { heading: "Why is Cervical Cancer a Public Health Problem (Especially in Nigeria)?", text: "• It is one of the most common cancers affecting women.\n• Many women are diagnosed at late stages.\n• Screening services are not widely accessed.\n• Awareness is still low in many communities.\n• Early detection can prevent most deaths." },
        { heading: "", text: "" }
      ],
    },
    {
      title: "Unit 2: Causes and Risk Factors",
      content: [
        { heading: "Main Cause", text: "Cervical cancer is mainly caused by persistent infection with Human Papillomavirus (HPV)." },
        { heading: "Key Risk Factors", text: "• Persistent HPV Infection\n  - HPV is a common virus spread through sexual contact.\n  - Long-term infection can lead to cervical cancer.\n\n• Early Sexual Debut\n  - Starting sexual activity at a very young age increases risk.\n\n• Multiple Sexual Partners\n  - Increases exposure to HPV.\n\n• Smoking\n  - Weakens the immune system and increases cancer risk.\n\n• Immunosuppression (e.g., HIV)\n  - Reduced immunity makes it harder to fight HPV infection.\n\n• Lack of Screening\n  - Without regular screening, abnormal changes go undetected." },
        { heading: "Myth vs Fact", text: "Myth: Cervical cancer is caused by witchcraft or spiritual attacks.\nFact: Cervical cancer is caused mainly by persistent HPV infection.\n\nMyth: Only women with many partners get cervical cancer.\nFact: Any sexually active woman can be at risk.\n\nMyth: If I feel fine, I cannot have cervical cancer.\nFact: Early stages usually have no symptoms." }
      ],
    },
    {
      title: "Unit 3: Signs and Symptoms",
      content: [
        { heading: "Important Note", text: "In early stages, cervical cancer usually has no symptoms. This is why screening is important." },
        { heading: "Possible Symptoms (Later Stages)", text: "• Abnormal vaginal bleeding\n  - Between periods\n  - After menopause\n  - After sexual intercourse\n\n• Post-coital bleeding\n  - Bleeding after sexual activity.\n\n• Foul-smelling vaginal discharge\n\n• Pelvic pain" },
        { heading: "Key Message", text: "Symptoms often appear late.\nDo not wait for symptoms before going for screening." }
      ],
    },
    {
      title: "Unit 4: Prevention Strategies",
      content: [
        { heading: "Prevention Overview", text: "Cervical cancer is largely preventable." },
        { heading: "1. HPV Vaccination", text: "• Protects against the main types of HPV that cause cervical cancer.\n• Most effective before sexual activity begins.\n• Available in many health facilities and immunization programs." },
        { heading: "2. Regular Screening", text: "• Detects early cell changes before they become cancer.\n• Can prevent cancer completely if treated early." },
        { heading: "3. Safe Sexual Practices", text: "• Limiting number of sexual partners.\n• Using protection (condoms reduce risk but do not eliminate it)." },
        { heading: "4. Smoking Cessation", text: "• Avoid tobacco use." }
      ],
    },
    {
      title: "Unit 5: Screening Methods",
      content: [
        {heading: "Screening Methods", text: ""},
        { heading: "1. Pap Smear (Cytology)", text: "What it is:\nA screening test that checks cervical cells for precancerous or cancerous changes.\n\nHow it is done:\nA healthcare provider inserts a speculum to visualize the cervix.\nCells are gently collected using a brush or spatula.\nThe sample is sent to a laboratory for analysis.\n\nWho should be screened in Nigeria:\nWomen aged 21–65 years\nScreening is recommended regardless of marital status or sexual history once age eligibility is met.\nWomen with HIV or other immunocompromising conditions may require more frequent screening as advised by a clinician.\n\nFrequency:\nEvery 3 years if results are normal.\nMay vary depending on results and clinical history." }
      ],
    },
    {
      title: "Unit 6: HPV DNA Test (Primary HPV Screening)",
      content: [
        {heading: "Screening Methods", text: ""},
        { heading: "2. HPV DNA Test (Primary HPV Screening)", text: "What it is:\nA test that detects high-risk HPV types responsible for most cervical cancers.\n\nHow it is done:\nSame sampling procedure as a Pap smear (speculum examination).\nThe cervical sample is tested for HPV DNA in a laboratory.\n\nWho should be screened in Nigeria:\nWomen within the recommended screening age group (commonly 25–65 years, depending on program availability).\nIncreasingly recommended as the preferred primary screening method where resources allow.\n\nFrequency:\nEvery 5 years if result is negative.\nFollow-up depends on results." }
      ],
    },
    {
      title: "Unit 7: Visual Inspection with Acetic Acid (VIA)",
      content: [
        {heading: "Screening Methods", text: ""},
        { heading: "3. Visual Inspection with Acetic Acid (VIA)", text: "What it is:\nA low-cost cervical cancer screening method widely used in Nigeria, especially in primary healthcare settings.\n\nHow it is done:\nA trained healthcare provider applies diluted acetic acid (vinegar solution) to the cervix.\nAfter a short waiting period, the cervix is inspected visually.\nAreas that turn white (acetowhite lesions) may indicate abnormal changes.\n\nWho should be screened in Nigeria:\nWomen within the national recommended screening age group (commonly 30–49 years in many public screening programs).\nVIA is often used in settings where laboratory services are limited.\n\nWho performs VIA:\nTrained healthcare workers (nurses, midwives, doctors) within approved screening programs.\n\nFrequency:\nTypically every 3–5 years, depending on screening program and national/state protocol." }
      ],
    },
    {
      title: "Unit 8: Overcoming Barriers",
      content: [
        { heading: "Common Barriers", text: "• Fear of pain\n  - Screening may cause mild discomfort, but it is not usually painful.\n\n• Embarrassment\n  - Healthcare providers are trained professionals.\n\n• Cost concerns\n  - Some facilities offer free or subsidized screening.\n\n• Cultural beliefs\n  - Cervical cancer is a medical condition, not spiritual.\n\n• Lack of time\n  - Screening takes only a few minutes." },
        { heading: "Be Motivated", text: "• Your health matters.\n• Early detection saves lives.\n• Screening today can prevent cancer tomorrow.\n• Do not wait for symptoms." }
      ],
    },
    {
      title: "Unit 9: Call to Action (Cues to Action)",
      content: [
        { heading: "Now that you are aware...", text: "Cervical cancer is preventable.\nIt develops slowly.\nIt often has no early symptoms.\nRegular screening and vaccination can save lives.\n\nTake action today." },
        { heading: "Pick a screening date today", text: "" },
        { heading: "Complete Your Learning", text: "Click the Complete button when you are done reading all the educational content." }
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
            disabled={isLastSlide && slidesCompleted}
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