import { createContext, useContext, useState, useEffect } from "react";
import { getUserNotifications, markNotificationRead } from "./api";
import { useUser } from "./UserContext";

export interface Notification {
  id: string;
  message: string;
  type: "screening_reminder" | "general";
  read: boolean;
  createdAt: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => Promise<void>;
  refreshNotifications: () => Promise<void>;
  addNotification: (notification: Omit<Notification, "id" | "createdAt" | "read">) => void;
}

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: async () => {},
  refreshNotifications: async () => {},
  addNotification: () => {},
});

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { user } = useUser();

  const refreshNotifications = async () => {
    if (user) {
      try {
        const userNotifications = await getUserNotifications(user.phone);
        setNotifications(userNotifications || []);
      } catch (err) {
        console.error("Failed to fetch notifications:", err);
      }
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await markNotificationRead(id);
      setNotifications(prev => 
        prev.map(notif => 
          notif.id === id ? { ...notif, read: true } : notif
        )
      );
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  const addNotification = (notification: Omit<Notification, "id" | "createdAt" | "read">) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications(prev => [newNotification, ...prev]);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // Load notifications when user changes
  useEffect(() => {
    refreshNotifications();
  }, [user]);

  // Check notifications periodically (every 5 minutes)
  useEffect(() => {
    const interval = setInterval(refreshNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        refreshNotifications,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}
