import img3DiconsGirlDynamicColor from "figma:asset/53eaeca147e791fc4d417ebccdc444ef2617f9aa.png";
import { BackgroundLogo } from "./BackgroundLogo";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "./LanguageContext";

export function WelcomeScreen({ onGetStarted }: { onGetStarted: () => void }) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
      <BackgroundLogo />

      <div className="flex-1 overflow-y-auto relative z-[1]">
        {/* Welcome header */}
        <div className="pt-[73px] px-[24px] flex items-baseline gap-[8px]">
          <p
            className="text-[32px] text-black tracking-[-1.6px]"
            style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600 }}
          >
            {t("welcome.to")}
          </p>
          <p
            className="text-[36px] text-[#008080]"
            style={{ fontFamily: "'Alatsi', sans-serif" }}
          >
            {t("welcome.brand")}
          </p>
        </div>

        {/* 3D Girl Illustration */}
        <div className="flex justify-center mt-[16px]">
          <div className="relative w-[203px] h-[371px]">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <img
                alt="Woman illustration"
                className="absolute h-[115.77%] left-[-53.03%] max-w-none top-[-7.67%] w-[211.08%]"
                src={img3DiconsGirlDynamicColor}
              />
            </div>
          </div>
        </div>

        {/* Title */}
        <div
          className="px-[24px] mt-[16px] text-[22px] text-black tracking-[-1.1px]"
          style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600 }}
        >
          <p className="mb-0">{t("welcome.title1")}</p>
          <p>{t("welcome.title2")}</p>
        </div>

        {/* Subtitle */}
        <p
          className="px-[24px] mt-[8px] text-[18px] text-black tracking-[-0.36px]"
          style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400 }}
        >
          {t("welcome.subtitle")}
        </p>

        {/* Language Select */}
        <div className="px-[24px] mt-[24px] flex flex-col gap-[12px]">
          <p
            className="text-[14px] text-[#333]"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {t("welcome.selectLanguage")}
          </p>
          <div className="relative bg-white rounded-[8px] border border-[#c6c6c6]">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "yo")}
              className="w-full p-[12px] pr-[40px] text-[16px] text-[#333] bg-transparent border-none appearance-none outline-none cursor-pointer"
              style={{ fontFamily: "'Instrument Sans', sans-serif" }}
            >
              <option value="en">English</option>
              <option value="yo">Yoruba</option>
            </select>
            <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#c6c6c6] pointer-events-none" size={24} />
          </div>
        </div>

        {/* Get Started Button */}
        <div className="px-[24px] mt-[24px] pb-[40px]">
          <button
            onClick={onGetStarted}
            className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer"
          >
            <p
              className="text-[24px] text-center text-white tracking-[-1.2px]"
              style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600 }}
            >
              {t("welcome.getStarted")}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
