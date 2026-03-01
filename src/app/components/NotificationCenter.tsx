import { useState } from "react";
import { Bell, X, Check } from "lucide-react";
import { useNotifications, Notification } from "./NotificationContext";
import { useLanguage } from "./LanguageContext";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

export function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const { t } = useLanguage();

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };

  const handleMarkAllAsRead = async () => {
    const unreadNotifications = notifications.filter(n => !n.read);
    await Promise.all(unreadNotifications.map(n => markAsRead(n.id)));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return minutes === 0 ? "Just now" : `${minutes}m ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <Bell size={20} className="text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-12 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-semibold text-gray-900" style={fontInstrument}>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800"
                  style={fontInstrument}
                >
                  Mark all read
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell size={32} className="mx-auto mb-2 text-gray-300" />
                  <p style={fontInstrument}>No notifications</p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                    formatDate={formatDate}
                  />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function NotificationItem({ 
  notification, 
  onMarkAsRead, 
  formatDate 
}: { 
  notification: Notification; 
  onMarkAsRead: (id: string) => Promise<void>;
  formatDate: (date: string) => string;
}) {
  const isScreeningReminder = notification.type === "screening_reminder";
  
  return (
    <div
      className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
        !notification.read ? "bg-blue-50" : ""
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-2 h-2 rounded-full ${
              isScreeningReminder ? "bg-orange-500" : "bg-blue-500"
            }`} />
            <span className="text-xs text-gray-500" style={fontInstrument}>
              {formatDate(notification.createdAt)}
            </span>
          </div>
          <p className="text-sm text-gray-900" style={fontInstrument}>
            {notification.message}
          </p>
        </div>
        
        <div className="flex items-center gap-1 ml-2">
          {!notification.read && (
            <button
              onClick={() => onMarkAsRead(notification.id)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Mark as read"
            >
              <Check size={14} className="text-gray-600" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
