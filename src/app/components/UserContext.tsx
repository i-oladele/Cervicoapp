import { createContext, useContext, useState } from "react";

export interface UserProfile {
  phone: string;
  city: string;
  language: string;
  registeredAt: string;
}

export interface UserProgress {
  baselineCompleted: boolean;
  modulesCompleted: boolean;
  endlineCompleted: boolean;
}

interface UserContextType {
  user: UserProfile | null;
  progress: UserProgress;
  setUser: (user: UserProfile | null) => void;
  setProgress: (progress: UserProgress) => void;
  isLoggedIn: boolean;
}

const defaultProgress: UserProgress = {
  baselineCompleted: false,
  modulesCompleted: false,
  endlineCompleted: false,
};

const UserContext = createContext<UserContextType>({
  user: null,
  progress: defaultProgress,
  setUser: () => {},
  setProgress: () => {},
  isLoggedIn: false,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  return (
    <UserContext.Provider
      value={{
        user,
        progress,
        setUser,
        setProgress,
        isLoggedIn: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
