import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "./LanguageContext";
import { useUser } from "./UserContext";
import { useNotifications } from "./NotificationContext";
import { usePushNotifications } from "./PushNotificationManager";
import { saveScreening, getScreening, getAssessment, createScreeningReminder } from "./api";
import { DatePicker } from "./DatePicker";
import { BackgroundLogo } from "./BackgroundLogo";
import { BottomNav } from "./BottomNav";
import { PushNotificationSettings } from "./PushNotificationSettings";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

interface ScreeningScreenProps {
  onNavigate: (tab: string) => void;
}

export function ScreeningScreen({ onNavigate }: ScreeningScreenProps) {
  const [age, setAge] = useState("");
  const [center, setCenter] = useState("");
  const [date, setDate] = useState("");
  const [reminder, setReminder] = useState(true);
  const [saving, setSaving] = useState(false);
  const { t } = useLanguage();
  const { user } = useUser();
  const { addNotification } = useNotifications();

  // Fetch baseline assessment to get age and saved screening data
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          // Fetch saved screening data first
          const screening = await getScreening(user.phone);
          if (screening) {
            setAge(screening.age || "");
            setCenter(screening.center || "");
            setDate(screening.date || "");
            setReminder(screening.reminder !== false); // Default to true
          }
          
          // If no age from screening, try to get from assessment
          if (!screening?.age || screening.age === "") {
            const assessment = await getAssessment(user.phone, "baseline");
            if (assessment && assessment.answers && assessment.answers.length > 0) {
              const ageAnswer = assessment.answers[0];
              if (ageAnswer) {
                setAge(ageAnswer.toString());
              }
            }
          }
        } catch (err) {
          console.log("No saved data found or error fetching:", err);
          // If no data found, fields remain empty for manual entry
        }
      }
    };

    fetchData();
  }, [user]);

  const handleSave = async () => {
    if (!user) {
      toast.error("Please log in first");
      return;
    }
    setSaving(true);
    try {
      // Save screening data
      await saveScreening(user.phone, { age, center, date, reminder });
      
      // Create screening reminders if reminder is enabled and date is set
      if (reminder && date) {
        try {
          await createScreeningReminder(user.phone, date);
          
          // Add immediate notification for user
          addNotification({
            message: `Screening appointment scheduled for ${new Date(date).toLocaleDateString()} at ${center}. You'll receive reminders before your appointment.`,
            type: "screening_reminder"
          });
        } catch (reminderErr) {
          console.error("Failed to create reminders:", reminderErr);
          // Don't fail the save if reminders fail
        }
      }
      
      toast.success(t("screening.successTitle"), {
        description: t("screening.successDesc"),
      });
    } catch (err: any) {
      console.error("Screening save error:", err);
      toast.error(err.message || "Failed to save screening");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
      <BackgroundLogo />

      <div className="flex-1 overflow-y-auto pt-[60px] pb-[24px] relative z-[1]">
        {/* Title */}
        <p
          className="px-[24px] text-[28px] text-[#008080] tracking-[-1.4px]"
          style={{ ...fontInstrument, fontWeight: 600 }}
        >
          {t("screening.title")}
        </p>

        <div className="px-[24px] mt-[32px] flex flex-col gap-[24px]">
          {/* Age */}
          <div className="flex flex-col gap-[12px]">
            <p className="text-[14px] text-[#333]" style={fontInstrument}>{t("screening.age")}</p>
            <div className="bg-white rounded-[8px] border border-[#c6c6c6]">
              <input
                type="number"
                placeholder={t("screening.agePlaceholder")}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full p-[12px] text-[16px] border-none outline-none bg-transparent"
                style={fontInstrument}
              />
            </div>
          </div>

          {/* Screening Center */}
          <div className="flex flex-col gap-[12px]">
            <p className="text-[14px] text-[#333]" style={fontInstrument}>{t("screening.center")}</p>
            <div className="relative bg-white rounded-[8px] border border-[#c6c6c6]">
              <select
                value={center}
                onChange={(e) => setCenter(e.target.value)}
                className="w-full p-[12px] pr-[40px] text-[16px] text-[#333] bg-transparent border-none appearance-none outline-none cursor-pointer"
                style={fontInstrument}
              >
                <option value="" disabled>{t("screening.centerPlaceholder")}</option>
                <option value="oauthc-ife">{t("screening.center1")}</option>
                <option value="uniosun-osogbo">{t("screening.center2")}</option>
                <option value="specialist-osogbo">{t("screening.center3")}</option>
                <option value="fountain-health">{t("screening.center4")}</option>
                <option value="iremide-annex">{t("screening.center5")}</option>
                <option value="fomwan-ogo-oluwa">{t("screening.center6")}</option>
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
              placeholder={t("screening.datePlaceholder")}
            />
          </div>

          {/* Reminder Toggle */}
          <div className="flex items-center justify-between">
            <p className="text-[16px] text-[#333]" style={fontInstrument}>{t("screening.reminder")}</p>
            <button
              onClick={() => setReminder(!reminder)}
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
            className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer mt-[8px]"
          >
            <p className="text-[18px] text-center text-[#8ffc86] tracking-[-0.9px]" style={{ ...fontInstrument, fontWeight: 600 }}>
              {saving ? t("screening.saving") : t("screening.save")}
            </p>
          </button>
        </div>
      </div>

      <BottomNav active="screening" onNavigate={onNavigate} />
    </div>
  );
}
