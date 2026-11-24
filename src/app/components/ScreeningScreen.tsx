import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "./LanguageContext";
import { useUser } from "./UserContext";
import { useNotifications } from "./NotificationContext";
import { saveScreening, getScreeningData, getAssessment } from "./api";
import { DatePicker } from "./DatePicker";
import { BackgroundLogo } from "./BackgroundLogo";
import { BottomNav } from "./BottomNav";
import { PushNotificationSettings } from "./PushNotificationSettings";
import { screeningFacilities, facilityName } from "../studyInfo";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

interface ScreeningScreenProps {
  onNavigate: (tab: string) => void;
}

export function ScreeningScreen({ onNavigate }: ScreeningScreenProps) {
  const [age, setAge] = useState("");
  const [center, setCenter] = useState("");
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState(false);
  const [saving, setSaving] = useState(false);
  const [baselineAge, setBaselineAge] = useState("");
  const { t, language } = useLanguage();
  const { user } = useUser();
  const { addNotification } = useNotifications();

  // Load the saved appointment, and the age already given in the baseline questionnaire
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const screening = await getScreeningData(user.phone);
        if (screening && !cancelled) {
          if (screening.age) setAge(String(screening.age));
          setCenter(screening.center || "");
          setDate(screening.date || "");
          setReminder(screening.reminder === true);
        }
      } catch {
        // No saved appointment yet
      }
      try {
        const baseline = await getAssessment(user.phone, "baseline");
        const baselineAnswer = baseline?.answers?.["1"];
        if (baselineAnswer && !cancelled) {
          setBaselineAge(String(baselineAnswer));
          setAge(String(baselineAnswer));
        }
      } catch {
        // Baseline not completed yet; the age field stays visible
      }
    })();
    return () => { cancelled = true; };
  }, [user]);

  const handleSave = async () => {
    const today = [new Date().getFullYear(), String(new Date().getMonth() + 1).padStart(2, "0"), String(new Date().getDate()).padStart(2, "0")].join("-");
    if (!center || !date || date < today) { toast.error(t("screening.dateError")); return; }
    if (!/^\d+$/.test(age) || Number(age) < 18 || Number(age) > 120) { toast.error(t("screening.ageError")); return; }
    if (reminder && (typeof Notification === "undefined" || Notification.permission !== "granted")) { toast.error(t("screening.enablePush")); return; }
    if (!user) {
      toast.error(t("screening.loginFirst"));
      return;
    }
    setSaving(true);
    try {
      await saveScreening(user.phone, parseInt(age), center, date, reminder);

      if (reminder && date) {
        addNotification({
          message: t("screening.scheduledNote")
            .replace("{date}", new Date(date + "T00:00:00").toLocaleDateString(language === "yo" ? "yo-NG" : "en-NG"))
            .replace("{center}", facilityName(center)),
          type: "screening_reminder"
        });
      }

      toast.success(t("screening.successTitle"), {
        description: t("screening.successDesc"),
      });
    } catch (err: any) {
      console.error("Screening save error:", err);
      toast.error(err.message || t("screening.saveError"));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
      <BackgroundLogo />

      <div className="flex-1 overflow-y-auto pt-[60px] pb-[24px] relative z-[1]">
        {/* Title */}
        <h1
          className="px-[24px] text-[28px] text-[#008080] tracking-[-1.4px]"
          style={{ ...fontInstrument, fontWeight: 600 }}
        >
          {t("screening.title")}
        </h1>

        <div className="px-[24px] mt-[32px] flex flex-col gap-[24px]">
          {/* Age: only asked when the baseline questionnaire has not already recorded it */}
          {!baselineAge && <div className="flex flex-col gap-[12px]">
            <p className="text-[14px] text-[#333]" style={fontInstrument}>{t("screening.age")}</p>
            <div className="bg-white rounded-[8px] border border-[#c6c6c6]">
              <input
                type="number" aria-label={t("screening.age")}
                placeholder={t("screening.agePlaceholder")}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-[12px] text-[16px] border-none outline-none bg-transparent"
                style={fontInstrument}
              />
            </div>
          </div>}

          {/* Screening Center */}
          <div className="flex flex-col gap-[12px]">
            <p className="text-[14px] text-[#333]" style={fontInstrument}>{t("screening.center")}</p>
            <div className="relative bg-white rounded-[8px] border border-[#c6c6c6]">
              <select aria-label={t("screening.center")}
                value={center}
                onChange={(e) => setCenter(e.target.value)}
                className="w-full p-[12px] pr-[40px] text-[16px] text-[#333] bg-transparent border-none appearance-none outline-none cursor-pointer"
                style={fontInstrument}
              >
                <option value="" disabled>{t("screening.centerPlaceholder")}</option>
                {screeningFacilities.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}
              </select>
              <ChevronDown className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#c6c6c6] pointer-events-none" size={24} />
            </div>
          </div>

          {/* Date */}
          <div className="flex flex-col gap-[12px]">
            <p className="text-[14px] text-[#333]" style={fontInstrument}>{t("screening.date")}</p>
            <DatePicker
              value={date}
              onChange={(d) => setDate(d)}
              placeholder={t("screening.datePlaceholder")} disabled={{before: new Date(new Date().setHours(0,0,0,0))}}
            />
          </div>

          {/* Reminder Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-[16px] text-[#333]" style={fontInstrument}>{t("screening.reminder")}</p>
            <button
              role="switch" aria-checked={reminder} aria-label={t("screening.reminder")} onClick={() => setReminder(!reminder)}
              className={`w-[48px] h-[28px] rounded-full border-none cursor-pointer transition-colors relative ${
                reminder ? "bg-[#008080]" : "bg-[#c6c6c6]"
              }`}
            >
              <div
                className={`absolute top-[2px] w-[24px] h-[24px] bg-white rounded-full transition-transform ${
                  reminder ? "left-[22px]" : "left-[2px]"
                }`}
              />
            </button>
          </div>

          {/* Push Notification Settings */}
          {reminder && (
            <PushNotificationSettings />
          )}

          {/* Save Button */}
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer mt-[8px]"
          >
            <p className="text-[20px] text-center text-[#8ffc86] tracking-[-0.9px]" style={{ ...fontInstrument, fontWeight: 700 }}>
              {saving ? t("screening.saving") : t("screening.save")}
            </p>
          </button>
        </div>
      </div>

      <BottomNav active="screening" onNavigate={onNavigate} />
    </div>
  );
}
