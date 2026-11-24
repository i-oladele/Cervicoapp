import { useState, useEffect } from "react";
import { Bell, BellOff, Check, X } from "lucide-react";
import { useUser } from "./UserContext";
import { usePushNotifications } from "./PushNotificationManager";
import { toast } from "sonner";
import { useLanguage } from "./LanguageContext";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

export function PushNotificationSettings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { t } = useLanguage();
  const { isSupported, requestPermission, unsubscribe, getPermissionStatus } = usePushNotifications();

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = async () => {
    if (isSupported) {
      const status = await getPermissionStatus();
      const registration = await navigator.serviceWorker.getRegistration();
      const subscription = await registration?.pushManager.getSubscription();
      setIsEnabled(status === 'granted' && !!subscription);
    }
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
        // Enable notifications
        const granted = await requestPermission();
        if (granted) {
          // The PushNotificationManager will handle subscription
          toast.success(t("push.enabled"));
          setIsEnabled(true);
        } else {
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

  if (!isSupported) {
    return (
      <div className="bg-white rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-3">
          <BellOff className="text-gray-400" size={20} />
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900" style={fontInstrument}>
              {t("push.title")}
            </p>
            <p className="text-xs text-gray-500 mt-1" style={fontInstrument}>
              {t("push.unsupported")}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-4 border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isEnabled ? (
            <Bell className="text-[#008080]" size={20} />
          ) : (
            <BellOff className="text-gray-400" size={20} />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900" style={fontInstrument}>
              {t("push.title")}
            </p>
            <p className="text-xs text-gray-500 mt-1" style={fontInstrument}>
              {isEnabled ? t("push.on") : t("push.off")}
            </p>
          </div>
        </div>
        
        <button
          role="switch" aria-checked={isEnabled} aria-label={t("push.title")} onClick={handleToggle}
          disabled={isLoading}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            isEnabled ? "bg-[#008080]" : "bg-gray-300"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <div
            className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
              isEnabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {isEnabled && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-600" style={fontInstrument}>
            {t("push.youWillReceive")}
          </p>
          <ul className="mt-1 space-y-1 text-xs text-gray-600" style={fontInstrument}>
            <li className="flex items-center gap-1">
              <Check size={12} className="text-green-500" />
              {t("push.twoDays")}
            </li>
            <li className="flex items-center gap-1">
              <Check size={12} className="text-green-500" />
              {t("push.oneDay")}
            </li>
            <li className="flex items-center gap-1">
              <Check size={12} className="text-green-500" />
              {t("push.morning")}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
