import img3DiconsFileTextDynamicColor from "figma:asset/3b2c1ffa27c5ea87c5bf8baa40559c17cefa558d.png";
import img3DiconsCopyDynamicColor from "figma:asset/15c0a9c33d08ea2f8ec0afb10ad1d88796ddb2e5.png";
import { BackgroundLogo } from "./BackgroundLogo";
import { BottomNav } from "./BottomNav";
import { Circle } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { useUser } from "./UserContext";
import { saveAssessment } from "./api";
import { toast } from "sonner";
import FigmaCheckCircle from "../../imports/CheckCircle";
import FigmaCheckCircleSmall from "../../imports/CheckCircle-10-465";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

interface AssessmentScreenProps {
  onNavigate: (tab: string) => void;
}

export function AssessmentScreen({ onNavigate }: AssessmentScreenProps) {
  const [activeAssessment, setActiveAssessment] = useState<"none" | "baseline" | "endline">("none");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const { t } = useLanguage();
  const { user, progress, setProgress } = useUser();

  const questions = [
    { id: 1, question: t("assessment.q1"), options: [t("assessment.q1.a"), t("assessment.q1.b"), t("assessment.q1.c"), t("assessment.q1.d")], correct: 1 },
    { id: 2, question: t("assessment.q2"), options: [t("assessment.q2.a"), t("assessment.q2.b"), t("assessment.q2.c"), t("assessment.q2.d")], correct: 1 },
    { id: 3, question: t("assessment.q3"), options: [t("assessment.q3.a"), t("assessment.q3.b"), t("assessment.q3.c"), t("assessment.q3.d")], correct: 2 },
    { id: 4, question: t("assessment.q4"), options: [t("assessment.q4.a"), t("assessment.q4.b"), t("assessment.q4.c"), t("assessment.q4.d")], correct: 1 },
    { id: 5, question: t("assessment.q5"), options: [t("assessment.q5.a"), t("assessment.q5.b"), t("assessment.q5.c"), t("assessment.q5.d")], correct: 0 },
  ];

  const startAssessment = (type: "baseline" | "endline") => {
    setActiveAssessment(type);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setCompleted(false);
    setAnswers([]);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setAnswers([...answers, selectedAnswer]);
      if (selectedAnswer === questions[currentQuestion].correct) {
        setScore(score + 1);
      }
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setCompleted(true);
      }
    }
  };

  const saveAndNavigate = async () => {
    if (!user) {
      setActiveAssessment("none");
      setCompleted(false);
      return;
    }
    setSaving(true);
    try {
      const res = await saveAssessment(user.phone, activeAssessment as "baseline" | "endline", score, questions.length, answers);
      if (res.progress) {
        setProgress({ ...progress, ...res.progress });
      }
      toast.success(t("assessment.complete"));
    } catch (err: any) {
      console.error("Assessment save error:", err);
      toast.error(err.message || "Failed to save assessment");
    } finally {
      setSaving(false);
      setActiveAssessment("none");
      setCompleted(false);
    }
  };

  // Active quiz view
  if (activeAssessment !== "none" && !completed) {
    const q = questions[currentQuestion];
    return (
      <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
        <BackgroundLogo />

        <div className="flex-1 overflow-y-auto pt-[60px] pb-[24px] relative z-[1]">
          <p
            className="px-[24px] text-[28px] text-[#008080] tracking-[-1.4px]"
            style={{ ...fontInstrument, fontWeight: 600 }}
          >
            {activeAssessment === "baseline" ? t("assessment.baseline") : t("assessment.endline")} {t("assessment.assessmentLabel")}
          </p>

          <p
            className="px-[24px] mt-[16px] text-[14px] text-[#a6a6a6] tracking-[-0.3px]"
            style={fontInstrument}
          >
            {t("assessment.question")} {currentQuestion + 1} {t("assessment.of")} {questions.length}
          </p>

          {/* Progress bar */}
          <div className="mx-[24px] mt-[8px] h-[4px] bg-[#e0e0e0] rounded-full">
            <div
              className="h-full bg-[#008080] rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          <p
            className="px-[24px] mt-[20px] text-[18px] text-black tracking-[-0.36px]"
            style={{ ...fontInstrument, fontWeight: 600 }}
          >
            {q.question}
          </p>

          <div className="px-[24px] mt-[24px] flex flex-col gap-[12px]">
            {q.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedAnswer(idx)}
                className={`w-full p-[16px] rounded-[8px] border text-left cursor-pointer transition-colors ${
                  selectedAnswer === idx
                    ? "bg-[#008080] border-[#008080] text-white"
                    : "bg-white border-[#c6c6c6] text-black"
                }`}
                style={fontInstrument}
              >
                <p className="text-[16px]">{option}</p>
              </button>
            ))}
          </div>

          <div className="px-[24px] mt-[32px] flex flex-col gap-[8px]">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={`w-full p-[16px] rounded-[8px] border-none cursor-pointer ${
                selectedAnswer !== null ? "bg-[#008080] opacity-100" : "bg-[#008080] opacity-50"
              }`}
            >
              <p className="text-[18px] text-center text-[#8ffc86] tracking-[-0.9px]" style={{ ...fontInstrument, fontWeight: 600 }}>
                {currentQuestion < questions.length - 1 ? t("assessment.next") : t("assessment.submit")}
              </p>
            </button>

            <button
              onClick={() => setActiveAssessment("none")}
              className="w-full p-[12px] bg-transparent border-none cursor-pointer"
            >
              <p className="text-[16px] text-center text-[#008080]" style={fontInstrument}>
                {t("assessment.back")}
              </p>
            </button>
          </div>
        </div>

        <BottomNav active="assessment" onNavigate={onNavigate} />
      </div>
    );
  }

  // Completion view
  if (completed) {
    return (
      <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
        <BackgroundLogo />

        <div className="flex-1 flex flex-col items-center justify-center px-[24px] relative z-[1]">
          <div className="w-[108px] h-[108px]">
            <FigmaCheckCircle />
          </div>
          <p
            className="text-[28px] text-[#008080] text-center tracking-[-1.4px] mt-[24px]"
            style={{ ...fontInstrument, fontWeight: 600 }}
          >
            {t("assessment.complete")}
          </p>
          <p
            className="text-[18px] text-black text-center mt-[12px]"
            style={fontInstrument}
          >
            {t("assessment.scored")} {score} {t("assessment.outOf")} {questions.length}
          </p>
          <button
            onClick={saveAndNavigate}
            className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer mt-[24px]"
          >
            <p className="text-[18px] text-center text-[#8ffc86] tracking-[-0.9px]" style={{ ...fontInstrument, fontWeight: 600 }}>
              {saving ? t("assessment.saving") : t("assessment.done")}
            </p>
          </button>
        </div>

        <BottomNav active="assessment" onNavigate={onNavigate} />
      </div>
    );
  }

  // Main assessment selection view
  return (
    <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
      <BackgroundLogo />

      <div className="flex-1 overflow-y-auto pt-[60px] pb-[24px] relative z-[1]">
        {/* Title */}
        <p
          className="px-[24px] text-[28px] text-[#008080] tracking-[-1.4px]"
          style={{ ...fontInstrument, fontWeight: 600 }}
        >
          {t("assessment.title")}
        </p>

        <div className="px-[24px] mt-[40px] flex flex-col gap-[16px]">
          {/* Baseline Assessment */}
          <button
            onClick={() => startAssessment("baseline")}
            className="w-full bg-white rounded-[8px] p-[16px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] flex items-center justify-between border-none cursor-pointer text-left"
          >
            <div className="flex gap-[16px] items-center">
              <div className="relative shrink-0 size-[24px] overflow-hidden">
                <img alt="" className="absolute h-[113.64%] left-[-5.47%] max-w-none top-[-6.25%] w-[112.2%]" src={img3DiconsFileTextDynamicColor} />
              </div>
              <p className="text-[16px] text-black tracking-[-0.48px]" style={{ ...fontInstrument, fontWeight: 500 }}>
                {t("assessment.takeBaseline")}
              </p>
            </div>
            {progress.baselineCompleted ? (
              <div className="w-[18px] h-[18px] shrink-0">
                <FigmaCheckCircleSmall />
              </div>
            ) : (
              <Circle size={18} color="#008080" strokeWidth={1.5} />
            )}
          </button>

          {/* Endline Assessment */}
          <button
            onClick={() => startAssessment("endline")}
            className="w-full bg-white rounded-[8px] p-[16px] shadow-[0px_4px_24px_0px_rgba(0,0,0,0.05)] flex items-center justify-between border-none cursor-pointer text-left"
          >
            <div className="flex gap-[16px] items-center">
              <div className="relative shrink-0 w-[24px] h-[30px] overflow-hidden">
                <img alt="" className="absolute h-[112.52%] left-[-23.37%] max-w-none top-[-6.05%] w-[140.6%]" src={img3DiconsCopyDynamicColor} />
              </div>
              <p className="text-[16px] text-black tracking-[-0.48px]" style={{ ...fontInstrument, fontWeight: 500 }}>
                {t("assessment.takeEndline")}
              </p>
            </div>
            {progress.endlineCompleted ? (
              <div className="w-[18px] h-[18px] shrink-0">
                <FigmaCheckCircleSmall />
              </div>
            ) : (
              <Circle size={18} color="#008080" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      <BottomNav active="assessment" onNavigate={onNavigate} />
    </div>
  );
}
