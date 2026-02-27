import { useState } from "react";
import { BackgroundLogo } from "./BackgroundLogo";
import { Square } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import svgPaths from "../../imports/svg-34anl4iwwi";

export function ConsentScreen({ onContinue }: { onContinue: () => void }) {
  const [agreed, setAgreed] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
      <BackgroundLogo />

      <div className="flex-1 overflow-y-auto pt-[60px] pb-[24px] px-[24px] relative z-[1]">
        {/* Title */}
        <p
          className="text-[28px] text-black text-left tracking-[-1.4px]"
          style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600 }}
        >
          {t("consent.title")}
        </p>

        {/* Content */}
        <div
          className="mt-[16px] text-[15px] text-black tracking-[-0.3px]"
          style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 400 }}
        >
          <p className="mb-4">{t("consent.intro")}</p>

          <p className="mb-1" style={{ fontWeight: 700 }}>{t("consent.purposeTitle")}</p>
          <p className="mb-4 whitespace-pre-line">{t("consent.purposeText")}</p>

          <p className="mb-1" style={{ fontWeight: 700 }}>{t("consent.benefitsTitle")}</p>
          <p className="mb-1">{t("consent.benefitsIntro")}</p>
          <ul className="list-disc pl-6 mb-4">
            <li>{t("consent.benefit1")}</li>
            <li>{t("consent.benefit2")}</li>
            <li>{t("consent.benefit3")}</li>
          </ul>
          <p className="mb-4">{t("consent.benefitsNote")}</p>

          <p className="mb-1" style={{ fontWeight: 700 }}>{t("consent.risksTitle")}</p>
          <p className="mb-1">{t("consent.risksIntro")}</p>
          <p className="mb-1">{t("consent.risksSubIntro")}</p>
          <ul className="list-disc pl-6 mb-1">
            <li>{t("consent.risk1")}</li>
            <li>{t("consent.risk2")}</li>
          </ul>
          <p className="mb-4">{t("consent.risksNote")}</p>

          <p className="mb-1" style={{ fontWeight: 700 }}>{t("consent.confidentialityTitle")}</p>
          <p className="mb-1">{t("consent.confidentiality1")}</p>
          <p className="mb-1">{t("consent.confidentiality2")}</p>
          <p className="mb-1">{t("consent.confidentiality3")}</p>
          <p className="mb-1">{t("consent.confidentiality4")}</p>
          <p className="mb-1">{t("consent.confidentiality5")}</p>
          <p className="mb-4">{t("consent.confidentiality6")}</p>

          <p className="mb-1" style={{ fontWeight: 700 }}>{t("consent.voluntaryTitle")}</p>
          <p className="mb-1">{t("consent.voluntary1")}</p>
          <p className="mb-1">{t("consent.voluntary2")}</p>
          <p className="mb-1">{t("consent.voluntary3")}</p>
          <p className="mb-1">{t("consent.voluntary4")}</p>
          <p>{t("consent.voluntary5")}</p>
        </div>

        {/* Checkbox */}
        <div className="mt-[24px] flex gap-[8px] items-start">
          <button
            onClick={() => setAgreed(!agreed)}
            className="bg-transparent border-none cursor-pointer p-0 shrink-0"
          >
            {agreed ? (
              <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path d={svgPaths.pf54c400} fill="#008080" />
              </svg>
            ) : (
              <Square size={24} color="#c6c6c6" />
            )}
          </button>
          <p
            className="text-[15px] text-[#333] tracking-[-0.3px]"
            style={{ fontFamily: "'Instrument Sans', sans-serif" }}
          >
            {t("consent.checkbox")}
          </p>
        </div>

        {/* Continue Button */}
        <button
          onClick={() => agreed && onContinue()}
          className={`w-full mt-[16px] p-[16px] rounded-[8px] border-none cursor-pointer transition-opacity ${
            agreed ? "bg-[#008080] opacity-100" : "bg-[#008080] opacity-50"
          }`}
          disabled={!agreed}
        >
          <p
            className="text-[24px] text-center text-white tracking-[-1.2px]"
            style={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600 }}
          >
            {t("consent.continue")}
          </p>
        </button>
      </div>
    </div>
  );
}
