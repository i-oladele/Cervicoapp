import img3DiconsFileTextDynamicColor from "figma:asset/3b2c1ffa27c5ea87c5bf8baa40559c17cefa558d.png";
import img3DiconsCopyDynamicColor from "figma:asset/15c0a9c33d08ea2f8ec0afb10ad1d88796ddb2e5.png";
import { BackgroundLogo } from "./BackgroundLogo";
import { BottomNav } from "./BottomNav";
import { Circle, Calendar } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "./LanguageContext";
import { useUser } from "./UserContext";
import { saveAssessment } from "./api";
import { toast } from "sonner";
import FigmaCheckCircle from "../../imports/CheckCircle";
import FigmaCheckCircleSmall from "../../imports/CheckCircle-10-465";
import { DatePicker } from "./DatePicker";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

interface AssessmentScreenProps {
  onNavigate: (tab: string) => void;
}

export function AssessmentScreen({ onNavigate }: AssessmentScreenProps) {
  const [activeAssessment, setActiveAssessment] = useState<"none" | "baseline" | "endline">("none");
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [textAnswers, setTextAnswers] = useState<Record<string, string>>({});
  const [dropdownAnswers, setDropdownAnswers] = useState<Record<string, string>>({});
  const [dateAnswers, setDateAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const { t } = useLanguage();
  const { user, progress, setProgress } = useUser();

  // Section A: Socio-demographic Questions (no scoring)
  const sectionAQuestions = [
    {
      id: "age",
      type: "text",
      question: t("sectionA.age"),
      placeholder: t("sectionA.agePlaceholder")
    },
    {
      id: "religion",
      type: "dropdown",
      question: t("sectionA.religion"),
      options: [t("sectionA.religion.christian"), t("sectionA.religion.islam"), t("sectionA.religion.traditional")]
    },
    {
      id: "maritalStatus",
      type: "dropdown",
      question: t("sectionA.maritalStatus"),
      options: [t("sectionA.marital.single"), t("sectionA.marital.married"), t("sectionA.marital.cohabitating"), t("sectionA.marital.separated"), t("sectionA.marital.divorced"), t("sectionA.marital.widow")]
    },
    {
      id: "education",
      type: "dropdown",
      question: t("sectionA.education"),
      options: [t("sectionA.education.none"), t("sectionA.education.primary"), t("sectionA.education.secondary"), t("sectionA.education.tertiary")]
    },
    {
      id: "occupation",
      type: "dropdown",
      question: t("sectionA.occupation"),
      options: [t("sectionA.occupation.unemployed"), t("sectionA.occupation.trader"), t("sectionA.occupation.artisan"), t("sectionA.occupation.civilServant"), t("sectionA.occupation.professional"), t("sectionA.occupation.others")]
    },
    {
      id: "residence",
      type: "text",
      question: t("sectionA.residence"),
      placeholder: t("sectionA.residencePlaceholder")
    },
    {
      id: "lga",
      type: "text",
      question: t("sectionA.lga"),
      placeholder: t("sectionA.lgaPlaceholder")
    },
    {
      id: "children",
      type: "text",
      question: t("sectionA.children"),
      placeholder: t("sectionA.childrenPlaceholder")
    },
    {
      id: "income",
      type: "dropdown",
      question: t("sectionA.income"),
      options: [t("sectionA.income.none"), t("sectionA.income.below50k"), t("sectionA.income.range50k70k"), t("sectionA.income.above70k")]
    },
    {
      id: "mobilePhone",
      type: "dropdown",
      question: t("sectionA.mobilePhone"),
      options: [t("sectionA.phone.yes"), t("sectionA.phone.no")]
    }
  ];

  // Knowledge assessment questions (for other sections)
  const knowledgeQuestions = [
    { id: 1, question: t("assessment.q1"), options: [t("assessment.q1.a"), t("assessment.q1.b"), t("assessment.q1.c"), t("assessment.q1.d")], correct: 1 },
    { id: 2, question: t("assessment.q2"), options: [t("assessment.q2.a"), t("assessment.q2.b"), t("assessment.q2.c"), t("assessment.q2.d")], correct: 1 },
    { id: 3, question: t("assessment.q3"), options: [t("assessment.q3.a"), t("assessment.q3.b"), t("assessment.q3.c"), t("assessment.q3.d")], correct: 2 },
    { id: 4, question: t("assessment.q4"), options: [t("assessment.q4.a"), t("assessment.q4.b"), t("assessment.q4.c"), t("assessment.q4.d")], correct: 1 },
    { id: 5, question: t("assessment.q5"), options: [t("assessment.q5.a"), t("assessment.q5.b"), t("assessment.q5.c"), t("assessment.q5.d")], correct: 0 },
  ];

  // Section B: Knowledge of Cervical Cancer (Yes/No questions with scoring)
  const sectionBQuestions = [
    {
      id: 11,
      type: "multipleChoice",
      question: t("sectionB.q11"),
      options: [t("sectionB.yes"), t("sectionB.no")],
      correct: 0 // Yes is correct
    },
    {
      id: 12,
      type: "multipleChoice",
      question: t("sectionB.q12"),
      options: [t("sectionB.yes"), t("sectionB.no")],
      correct: 0 // Yes is correct
    },
    {
      id: 13,
      type: "multipleChoice",
      question: t("sectionB.q13"),
      options: [t("sectionB.yes"), t("sectionB.no")],
      correct: 0 // Yes is correct
    },
    {
      id: 14,
      type: "multipleChoice",
      question: t("sectionB.q14"),
      options: [t("sectionB.yes"), t("sectionB.no")],
      correct: 0 // Yes is correct
    },
    {
      id: 15,
      type: "multipleChoice",
      question: t("sectionB.q15"),
      options: [t("sectionB.yes"), t("sectionB.no")],
      correct: 0 // Yes is correct
    },
    {
      id: 16,
      type: "multipleChoice",
      question: t("sectionB.q16"),
      options: [t("sectionB.yes"), t("sectionB.no")],
      correct: 0 // Yes is correct
    },
    {
      id: 17,
      type: "multipleChoice",
      question: t("sectionB.q17"),
      options: [t("sectionB.yes"), t("sectionB.no")],
      correct: 0 // Yes is correct
    },
    {
      id: 18,
      type: "multipleChoice",
      question: t("sectionB.q18"),
      options: [t("sectionB.yes"), t("sectionB.no")],
      correct: 0 // Yes is correct
    }
  ];

  // Section C: Perceptions Toward Cervical Cancer Screening (5-point Likert scale)
  const sectionCQuestions = [
    {
      id: 19,
      type: "multipleChoice",
      question: t("sectionC.q19"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0 // Strongly Agree is most positive
    },
    {
      id: 20,
      type: "multipleChoice",
      question: t("sectionC.q20"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 21,
      type: "multipleChoice",
      question: t("sectionC.q21"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 22,
      type: "multipleChoice",
      question: t("sectionC.q22"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 23,
      type: "multipleChoice",
      question: t("sectionC.q23"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 24,
      type: "multipleChoice",
      question: t("sectionC.q24"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 25,
      type: "multipleChoice",
      question: t("sectionC.q25"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    }
  ];

  // Section D: Intentions to Undergo Cervical Cancer Screening (5-point Likert scale)
  const sectionDQuestions = [
    {
      id: 26,
      type: "multipleChoice",
      question: t("sectionD.q26"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0 // Strongly Agree is most positive
    },
    {
      id: 27,
      type: "multipleChoice",
      question: t("sectionD.q27"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 28,
      type: "multipleChoice",
      question: t("sectionD.q28"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 29,
      type: "multipleChoice",
      question: t("sectionD.q29"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 30,
      type: "multipleChoice",
      question: t("sectionD.q30"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    }
  ];

  // Section E: Uptake of Cervical Cancer Screening (Yes/No and text inputs)
  const sectionEQuestions = [
    {
      id: 31,
      type: "dropdown",
      question: t("sectionE.q31"),
      options: [t("sectionE.yes"), t("sectionE.no")]
    },
    {
      id: 32,
      type: "date",
      question: t("sectionE.q32"),
      placeholder: t("sectionE.q32Placeholder")
    },
    {
      id: 34,
      type: "text",
      question: t("sectionE.q34"),
      placeholder: t("sectionE.q34Placeholder")
    },
    {
      id: 35,
      type: "dropdown",
      question: t("sectionE.q35"),
      options: [t("sectionE.yes"), t("sectionE.no")]
    }
  ];

  // Section F: Perceived Sociocultural Influence on Cervical Cancer Screening (5-point Likert scale)
  const sectionFQuestions = [
    {
      id: 36,
      type: "multipleChoice",
      question: t("sectionF.q36"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0 // Strongly Agree is most positive
    },
    {
      id: 37,
      type: "multipleChoice",
      question: t("sectionF.q37"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 38,
      type: "multipleChoice",
      question: t("sectionF.q38"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 39,
      type: "multipleChoice",
      question: t("sectionF.q39"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 40,
      type: "multipleChoice",
      question: t("sectionF.q40"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 41,
      type: "multipleChoice",
      question: t("sectionF.q41"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    },
    {
      id: 42,
      type: "multipleChoice",
      question: t("sectionF.q42"),
      options: [t("sectionC.stronglyAgree"), t("sectionC.agree"), t("sectionC.undecided"), t("sectionC.disagree"), t("sectionC.stronglyDisagree")],
      correct: 0
    }
  ];

  const allSections = [sectionAQuestions, sectionBQuestions, sectionCQuestions, sectionDQuestions, sectionEQuestions, sectionFQuestions];

  const startAssessment = (type: "baseline" | "endline") => {
    setActiveAssessment(type);
    setCurrentSection(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTextAnswers({});
    setDropdownAnswers({});
    setScore(0);
    setCompleted(false);
    setAnswers([]);
  };

  const getCurrentQuestions = () => {
    return allSections[currentSection] || [];
  };

  const getCurrentQuestion = () => {
    const questions = getCurrentQuestions();
    return questions[currentQuestion] || null;
  };

  const handleNext = () => {
    const currentQ = getCurrentQuestion();
    if (!currentQ) return;

    if (currentQ.type === "text") {
      if (!textAnswers[currentQ.id]) return;
    } else if (currentQ.type === "dropdown") {
      if (!dropdownAnswers[currentQ.id]) return;
    } else if (currentQ.type === "date") {
      if (!dateAnswers[currentQ.id]) return;
    } else {
      if (selectedAnswer === null) return;
      setAnswers([...answers, selectedAnswer]);
      if (selectedAnswer === currentQ.correct) {
        setScore(score + 1);
      }
    }

    const questions = getCurrentQuestions();
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      // Move to next section or complete assessment
      if (currentSection < allSections.length - 1) {
        setCurrentSection(currentSection + 1);
        setCurrentQuestion(0);
        setSelectedAnswer(null);
      } else {
        setCompleted(true);
      }
    }
  };

  const handleTextChange = (id: string, value: string) => {
    setTextAnswers({ ...textAnswers, [id]: value });
  };

  const handleDropdownChange = (id: string, value: string) => {
    setDropdownAnswers({ ...dropdownAnswers, [id]: value });
  };

  const handleDateChange = (id: string, value: string) => {
    setDateAnswers({ ...dateAnswers, [id]: value });
  };

  const saveAndNavigate = async () => {
    if (!user) {
      setActiveAssessment("none");
      setCompleted(false);
      return;
    }
    setSaving(true);
    try {
      // Calculate total scorable questions from Sections B, C, D, and F
      const totalKnowledgeQuestions = sectionBQuestions.length + sectionCQuestions.length + sectionDQuestions.length + sectionFQuestions.length;
      const res = await saveAssessment(user.phone, activeAssessment as "baseline" | "endline", score, totalKnowledgeQuestions, answers);
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
    const currentQ = getCurrentQuestion();
    const currentQuestions = getCurrentQuestions();
    let sectionTitle = "";
    
    if (currentSection === 0) {
      sectionTitle = t("sectionA.title");
    } else if (currentSection === 1) {
      sectionTitle = t("sectionB.title");
    } else if (currentSection === 2) {
      sectionTitle = t("sectionC.title");
    } else if (currentSection === 3) {
      sectionTitle = t("sectionD.title");
    } else if (currentSection === 4) {
      sectionTitle = t("sectionE.title");
    } else if (currentSection === 5) {
      sectionTitle = t("sectionF.title");
    } else {
      sectionTitle = (activeAssessment === "baseline" ? t("assessment.baseline") : t("assessment.endline")) + " " + t("assessment.assessmentLabel");
    }
    
    return (
      <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
        <BackgroundLogo />

        <div className="flex-1 overflow-y-auto pt-[60px] pb-[24px] relative z-[1]">
          <p
            className="px-[24px] text-[28px] text-[#008080] tracking-[-1.4px]"
            style={{ ...fontInstrument, fontWeight: 600 }}
          >
            {sectionTitle} {currentSection === 0 ? "" : t("assessment.assessmentLabel")}
          </p>

          <p
            className="px-[24px] mt-[16px] text-[14px] text-[#a6a6a6] tracking-[-0.3px]"
            style={fontInstrument}
          >
            {t("assessment.question")} {currentQuestion + 1} {t("assessment.of")} {currentQuestions.length}
          </p>

          {/* Progress bar */}
          <div className="mx-[24px] mt-[8px] h-[4px] bg-[#e0e0e0] rounded-full">
            <div
              className="h-full bg-[#008080] rounded-full transition-all"
              style={{ width: `${((currentQuestion + 1) / currentQuestions.length) * 100}%` }}
            />
          </div>

          <p
            className="px-[24px] mt-[20px] text-[18px] text-black tracking-[-0.36px]"
            style={{ ...fontInstrument, fontWeight: 600 }}
          >
            {currentQ?.question}
          </p>

          {/* Question Input */}
          <div className="px-[24px] mt-[24px]">
            {currentQ?.type === "text" && (currentQ.id === "age" || currentQ.id === "children") ? (
              <div className="bg-white rounded-[8px] border border-[#c6c6c6]">
                <input
                  type="number"
                  value={textAnswers[currentQ.id] || ""}
                  onChange={(e) => handleTextChange(currentQ.id, e.target.value)}
                  placeholder={currentQ.placeholder}
                  className="w-full p-[12px] text-[16px] border-none outline-none bg-transparent"
                  style={fontInstrument}
                />
              </div>
            ) : currentQ?.type === "text" && (
              <input
                type="text"
                value={textAnswers[currentQ.id] || ""}
                onChange={(e) => handleTextChange(currentQ.id, e.target.value)}
                placeholder={currentQ.placeholder}
                className="w-full p-[16px] rounded-[8px] border border-[#c6c6c6] bg-white text-black"
                style={fontInstrument}
              />
            )}
            
            {currentQ?.type === "date" && (
              <DatePicker
                value={dateAnswers[currentQ.id] || ""}
                onChange={(d) => handleDateChange(currentQ.id, d)}
                placeholder={currentQ.placeholder}
                disabled={{
                  before: (() => {
                    // Get user's age from Section A (question ID "age")
                    const userAge = parseInt(textAnswers["age"] || "0");
                    if (userAge && userAge > 0) {
                      // Calculate minimum date: January 1st of birth year
                      const currentYear = new Date().getFullYear();
                      const birthYear = currentYear - userAge;
                      return new Date(birthYear, 0, 1); // January 1st of birth year
                    }
                    return new Date(); // Default to today if no age
                  })(),
                  after: new Date() // Prevent selection of dates after today
                }}
              />
            )}
            
            {currentQ?.type === "dropdown" && (
              <select
                value={dropdownAnswers[currentQ.id] || ""}
                onChange={(e) => handleDropdownChange(currentQ.id, e.target.value)}
                className="w-full p-[16px] rounded-[8px] border border-[#c6c6c6] bg-white text-black"
                style={fontInstrument}
              >
                <option value="">{t("sectionA.selectOption")}</option>
                {currentQ.options?.map((option: string, idx: number) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
            
            {(!currentQ?.type || currentQ.type === "multipleChoice") && (
              <div className="flex flex-col gap-[12px]">
                {currentQ?.options?.map((option: string, idx: number) => (
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
            )}
          </div>

          <div className="px-[24px] mt-[32px] flex flex-col gap-[8px]">
            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => {
                  if (currentQuestion > 0) {
                    setCurrentQuestion(currentQuestion - 1);
                    setSelectedAnswer(null);
                  }
                }}
                className={`p-[8px] rounded-[8px] border-none cursor-pointer ${
                  currentQuestion === 0 ? "bg-[#c6c6c6]" : "bg-[#9fe29a]"
                }`}
                disabled={currentQuestion === 0}
              >
                <p
                  className={`text-[15px] text-center w-[84px] ${
                    currentQuestion === 0 ? "text-[#f6f6f6]" : "text-black"
                  }`}
                  style={{ ...fontInstrument, fontWeight: 600 }}
                >
                  {t("library.previous")}
                </p>
              </button>
              <button
                onClick={handleNext}
                disabled={
                  (currentQ?.type === "text" && !textAnswers[currentQ.id]) ||
                  (currentQ?.type === "dropdown" && !dropdownAnswers[currentQ.id]) ||
                  (currentQ?.type === "date" && !dateAnswers[currentQ.id]) ||
                  ((currentQ?.type === "multipleChoice" || !currentQ?.type) && selectedAnswer === null)
                }
                className={`p-[8px] rounded-[8px] border-none cursor-pointer ${
                  (currentQ?.type === "text" && textAnswers[currentQ.id]) ||
                  (currentQ?.type === "dropdown" && dropdownAnswers[currentQ.id]) ||
                  (currentQ?.type === "date" && dateAnswers[currentQ.id]) ||
                  ((currentQ?.type === "multipleChoice" || !currentQ?.type) && selectedAnswer !== null)
                    ? "bg-[#9fe29a]"
                    : "bg-[#c6c6c6]"
                }`}
              >
                <p
                  className={`text-[15px] text-center w-[84px] ${
                    (currentQ?.type === "text" && textAnswers[currentQ.id]) ||
                    (currentQ?.type === "dropdown" && dropdownAnswers[currentQ.id]) ||
                    (currentQ?.type === "date" && dateAnswers[currentQ.id]) ||
                    ((currentQ?.type === "multipleChoice" || !currentQ?.type) && selectedAnswer !== null)
                      ? "text-black"
                      : "text-[#f6f6f6]"
                  }`}
                  style={{ ...fontInstrument, fontWeight: 600 }}
                >
                  {currentQuestion < currentQuestions.length - 1 ? t("library.next") : t("assessment.submit")}
                </p>
              </button>
            </div>
          </div>

          {/* Back Button */}
          <div className="px-[24px] mt-[16px]">
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
            Well done! You have completed the baseline assessment, you can continue to learn more about cervical cancer
          </p>
          <button
            onClick={() => onNavigate("library")}
            className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer mt-[24px]"
          >
            <p className="text-[18px] text-center text-[#8ffc86] tracking-[-0.9px]" style={{ ...fontInstrument, fontWeight: 600 }}>
              Continue to Library
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
