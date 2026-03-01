import { useState, useEffect } from "react";
import { Bell, BellOff, Check, X } from "lucide-react";
import { useUser } from "./UserContext";
import { usePushNotifications } from "./PushNotificationManager";
import { savePushSubscription } from "./api";
import { toast } from "sonner";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

export function PushNotificationSettings() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const { isSupported, requestPermission, getPermissionStatus } = usePushNotifications();

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = async () => {
    if (isSupported) {
      const status = await getPermissionStatus();
      setIsEnabled(status === 'granted');
    }
  };

  const handleToggle = async () => {
    if (!isSupported) {
      toast.error("Push notifications are not supported in your browser");
      return;
    }

    if (!user) {
      toast.error("Please log in first");
      return;
    }

    setIsLoading(true);

    try {
      if (isEnabled) {
        // Disable notifications
        // Note: Browser doesn't support programmatic unsubscription
        // User would need to disable through browser settings
        toast.info("To disable notifications, please use your browser settings");
      } else {
        // Enable notifications
        const granted = await requestPermission();
        if (granted) {
          // The PushNotificationManager will handle subscription
          toast.success("Push notifications enabled!");
          setIsEnabled(true);
        } else {
          toast.error("Permission denied for push notifications");
        }
      }
    } catch (error) {
      console.error("Failed to toggle push notifications:", error);
      toast.error("Failed to enable push notifications");
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
              Push Notifications
            </p>
            <p className="text-xs text-gray-500 mt-1" style={fontInstrument}>
              Not supported in your browser
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
            <Bell className="text-blue-600" size={20} />
          ) : (
            <BellOff className="text-gray-400" size={20} />
          )}
          <div>
            <p className="text-sm font-medium text-gray-900" style={fontInstrument}>
              Push Notifications
            </p>
            <p className="text-xs text-gray-500 mt-1" style={fontInstrument}>
              {isEnabled ? "Enabled - You'll receive screening reminders" : "Disabled - Enable to receive reminders"}
            </p>
          </div>
        </div>
        
        <button
          onClick={handleToggle}
          disabled={isLoading}
          className={`relative w-12 h-6 rounded-full transition-colors ${
            isEnabled ? "bg-green-500" : "bg-gray-300"
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
            You'll receive notifications:
          </p>
          <ul className="mt-1 space-y-1 text-xs text-gray-600" style={fontInstrument}>
            <li className="flex items-center gap-1">
              <Check size={12} className="text-green-500" />
              2 days before screening
            </li>
            <li className="flex items-center gap-1">
              <Check size={12} className="text-green-500" />
              1 day before screening
            </li>
            <li className="flex items-center gap-1">
              <Check size={12} className="text-green-500" />
              Morning of screening
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
