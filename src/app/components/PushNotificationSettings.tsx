import { useState, useEffect } from "react";
import { Bell, BellOff, Check, Send, Smartphone } from "lucide-react";
import { useUser } from "./UserContext";
import { usePushNotifications } from "./PushNotificationManager";
import { sendPushNotification } from "./api";
import { toast } from "sonner";
import { useLanguage } from "./LanguageContext";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

// iPhones and iPads only allow web reminders once the app is added to the Home Screen (iOS 16.4+).
const isAppleMobile = () =>
  typeof navigator !== "undefined" &&
  (/iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1));
const isInstalled = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(display-mode: standalone)").matches || (navigator as any).standalone === true);

export function PushNotificationSettings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [testing, setTesting] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const { user } = useUser();
  const { t } = useLanguage();
  const { isSupported, requestPermission, unsubscribe, getPermissionStatus } = usePushNotifications();
  const needsHomeScreen = isAppleMobile() && !isInstalled();

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = async () => {
    if (!isSupported) return;
    const status = await getPermissionStatus();
    setBlocked(status === "denied");
    const registration = await navigator.serviceWorker.getRegistration();
    const subscription = await registration?.pushManager.getSubscription();
    setIsEnabled(status === "granted" && !!subscription);
  };

  const handleToggle = async () => {
    if (!isSupported) {
      toast.error(t("push.unsupported"));
      return;
    }
    if (!user) {
      toast.error(t("screening.loginFirst"));
      return;
    }
    setIsLoading(true);
    try {
      if (isEnabled) {
        await unsubscribe();
        setIsEnabled(false);
        toast.success(t("push.disabled"));
      } else {
        const granted = await requestPermission();
        if (granted) {
          toast.success(t("push.enabled"));
          setIsEnabled(true);
          setBlocked(false);
        } else {
          setBlocked(typeof Notification !== "undefined" && Notification.permission === "denied");
          toast.error(t("push.denied"));
        }
      }
    } catch (error) {
      console.error("Failed to toggle push notifications:", error);
      toast.error(t("push.failed"));
    } finally {
      setIsLoading(false);
    }
  };

  // Sends a reminder through the real server and push service to this account's phone only,
  // so delivery can be confirmed on an actual device.
  const sendTest = async () => {
    if (!user || testing) return;
    setTesting(true);
    try {
      await sendPushNotification(user.phone, t("push.testTitle"), t("push.testBody"), { url: "/" });
      toast.success(t("push.testSent"));
    } catch {
      toast.error(t("push.testFailed"));
    } finally {
      setTesting(false);
    }
  };

  if (!isSupported) {
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200" style={fontInstrument}>
        <div className="flex items-start gap-3">
          {needsHomeScreen ? <Smartphone className="text-[#008080] shrink-0" size={20} aria-hidden="true" /> : <BellOff className="text-gray-400 shrink-0" size={20} aria-hidden="true" />}
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{needsHomeScreen ? t("push.iosTitle") : t("push.title")}</p>
            <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{needsHomeScreen ? t("push.iosSteps") : t("push.unsupported")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200" style={fontInstrument}>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {isEnabled ? <Bell className="text-[#008080]" size={20} aria-hidden="true" /> : <BellOff className="text-gray-400" size={20} aria-hidden="true" />}
          <div>
            <p className="text-sm font-medium text-gray-900" id="push-title">{t("push.title")}</p>
            <p className="text-xs text-gray-600 mt-1">{isEnabled ? t("push.on") : t("push.off")}</p>
          </div>
        </div>
        <button
          role="switch"
          aria-checked={isEnabled}
          aria-labelledby="push-title"
          onClick={handleToggle}
          disabled={isLoading}
          className={`relative shrink-0 w-12 h-6 rounded-full transition-colors ${isEnabled ? "bg-[#008080]" : "bg-gray-300"} ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isEnabled ? "translate-x-6" : "translate-x-1"}`} />
        </button>
      </div>

      {blocked && !isEnabled && <p className="mt-3 text-sm text-[#b42318]" role="alert">{t("push.blocked")}</p>}

      {isEnabled && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-700">{t("push.youWillReceive")}</p>
          <ul className="mt-1 space-y-1 text-xs text-gray-700">
            {[t("push.twoDays"), t("push.oneDay"), t("push.morning")].map((item) => (
              <li key={item} className="flex items-center gap-1">
                <Check size={12} className="text-[#008080]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={sendTest}
            disabled={testing}
            className="mt-3 inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-[#008080] bg-white text-[#008080] text-sm font-semibold cursor-pointer disabled:opacity-50"
          >
            <Send size={16} aria-hidden="true" />
            {testing ? t("assessment.saving") : t("push.test")}
          </button>
        </div>
      )}
    </div>
  );
}
