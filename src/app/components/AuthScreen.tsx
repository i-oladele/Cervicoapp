import { useState } from "react";
import { toast } from "sonner";
import { BackgroundLogo } from "./BackgroundLogo";
import { useLanguage } from "./LanguageContext";
import { useUser } from "./UserContext";
import { registerUser, loginUser } from "./api";

type AuthTab = "register" | "login";

export function AuthScreen({ onAuth }: { onAuth: () => void }) {
  const [tab, setTab] = useState<AuthTab>("register");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [pin, setPin] = useState(["", "", "", ""]);
  const [confirmPin, setConfirmPin] = useState(["", "", "", ""]);
  const [phoneError, setPhoneError] = useState("");
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [cityError, setCityError] = useState("");
  const [cityTouched, setCityTouched] = useState(false);
  const [pinError, setPinError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t, language } = useLanguage();
  const { setUser, setProgress } = useUser();

  const isPhoneValid = (value: string): boolean => {
    const cleaned = value.replace(/\s/g, "");
    return /^\+234\d{10}$/.test(cleaned);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    if (phoneTouched) {
      setPhoneError(isPhoneValid(value) ? "" : t("auth.phoneError"));
    }
  };

  const handlePhoneBlur = () => {
    setPhoneTouched(true);
    if (phone && !isPhoneValid(phone)) {
      setPhoneError(t("auth.phoneError"));
    } else {
      setPhoneError("");
    }
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    if (cityTouched) {
      setCityError(value.trim() ? "" : t("auth.cityError"));
    }
  };

  const handleCityBlur = () => {
    setCityTouched(true);
    setCityError(city.trim() ? "" : t("auth.cityError"));
  };

  const handleSubmit = async () => {
    if (!isPhoneValid(phone)) {
      setPhoneTouched(true);
      setPhoneError(t("auth.phoneError"));
      return;
    }
    if (tab === "register" && !city.trim()) {
      setCityTouched(true);
      setCityError(t("auth.cityError"));
      return;
    }

    const pinStr = pin.join("");

    if (tab === "register") {
      const confirmPinStr = confirmPin.join("");
      if (pinStr.length < 4) {
        setPinError(t("auth.pinIncomplete"));
        return;
      }
      if (pinStr !== confirmPinStr) {
        setPinError(t("auth.pinMismatch"));
        return;
      }
      setPinError("");
    } else {
      if (pinStr.length < 4) {
        setPinError(t("auth.pinIncomplete"));
        return;
      }
      setPinError("");
    }

    setLoading(true);
    try {
      if (tab === "register") {
        const cleanedPhone = phone.replace(/\s/g, "");
        const res = await registerUser(cleanedPhone, city.trim(), pinStr, language);
        setUser(res.user);
        setProgress({
          baselineCompleted: false,
          modulesCompleted: false,
          endlineCompleted: false,
        });
        toast.success(t("auth.registerSuccess"));
      } else {
        const cleanedPhone = phone.replace(/\s/g, "");
        const res = await loginUser(cleanedPhone, pinStr);
        setUser(res.user);
        if (res.progress) {
          setProgress(res.progress);
        }
        toast.success(t("auth.loginSuccess"));
      }
      onAuth();
    } catch (err: any) {
      console.error("Auth error:", err);
      toast.error(err.message || t("auth.genericError"));
    } finally {
      setLoading(false);
    }
  };

  const handlePinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newPin = [...pin];
    newPin[index] = value;
    setPin(newPin);
    if (value && index < 3) {
      const next = document.getElementById(`pin-${tab}-${index + 1}`);
      next?.focus();
    }
  };

  const handleConfirmPinChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newConfirmPin = [...confirmPin];
    newConfirmPin[index] = value;
    setConfirmPin(newConfirmPin);
    if (value && index < 3) {
      const next = document.getElementById(`confirm-pin-${tab}-${index + 1}`);
      next?.focus();
    }
  };

  const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

  return (
    <div className="bg-[#f8fafc] size-full relative flex flex-col overflow-hidden">
      <BackgroundLogo />

      {/* Tabs - fixed at top */}
      <div className="shrink-0 pt-[120px] pb-[16px] flex justify-center relative z-[1]">
        <div className="flex items-center">
          <button
            onClick={() => setTab("register")}
            className="flex items-center justify-center px-[10px] py-[8px] w-[108px] bg-transparent border-none cursor-pointer relative"
          >
            {tab === "register" && (
              <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#008080]" />
            )}
            <p
              className={`text-[24px] text-center tracking-[-1.2px] ${
                tab === "register" ? "text-[#008080]" : "text-[#1e1e1e]"
              }`}
              style={{ ...fontInstrument, fontWeight: tab === "register" ? 600 : 400 }}
            >
              {t("auth.register")}
            </p>
          </button>
          <button
            onClick={() => setTab("login")}
            className="flex items-center justify-center px-[10px] py-[8px] w-[108px] bg-transparent border-none cursor-pointer relative"
          >
            {tab === "login" && (
              <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-[#008080]" />
            )}
            <p
              className={`text-[24px] text-center tracking-[-1.2px] ${
                tab === "login" ? "text-[#008080]" : "text-[#1e1e1e]"
              }`}
              style={{ ...fontInstrument, fontWeight: tab === "login" ? 600 : 400 }}
            >
              {t("auth.login")}
            </p>
          </button>
        </div>
      </div>

      {/* Scrollable form content */}
      <div className="flex-1 overflow-y-auto px-[24px] pb-[40px] relative z-[1]">
        {tab === "register" ? (
          <div className="flex flex-col gap-[20px]">
            {/* Phone */}
            <div className="flex flex-col gap-[12px]">
              <p className="text-[14px] text-[#333]" style={fontInstrument}>{t("auth.phone")}</p>
              <div className={`bg-white rounded-[8px] border ${phoneTouched && phoneError ? "border-[#e53e3e]" : "border-[#c6c6c6]"}`}>
                <input
                  type="tel"
                  placeholder={t("auth.phonePlaceholder")}
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={handlePhoneBlur}
                  className="w-full p-[12px] text-[16px] border-none outline-none bg-transparent"
                  style={fontInstrument}
                />
              </div>
              {phoneTouched && phoneError && (
                <p className="text-[12px] text-[#e53e3e]" style={fontInstrument}>{phoneError}</p>
              )}
            </div>

            {/* City */}
            <div className="flex flex-col gap-[12px]">
              <p className="text-[14px] text-[#333]" style={fontInstrument}>{t("auth.city")}</p>
              <div className={`bg-white rounded-[8px] border ${cityTouched && cityError ? "border-[#e53e3e]" : "border-[#c6c6c6]"}`}>
                <input
                  type="text"
                  placeholder={t("auth.cityPlaceholder")}
                  value={city}
                  onChange={(e) => handleCityChange(e.target.value)}
                  onBlur={handleCityBlur}
                  className="w-full p-[12px] text-[16px] border-none outline-none bg-transparent"
                  style={fontInstrument}
                />
              </div>
              {cityTouched && cityError && (
                <p className="text-[12px] text-[#e53e3e]" style={fontInstrument}>{cityError}</p>
              )}
            </div>

            {/* PIN */}
            <div className="flex flex-col gap-[12px]">
              <p className="text-[14px] text-[#333]" style={fontInstrument}>{t("auth.pin")}</p>
              <div className="flex gap-[12px]">
                {pin.map((digit, i) => (
                  <div key={i} className="bg-white rounded-[8px] border border-[#c6c6c6] size-[44px]">
                    <input
                      id={`pin-register-${i}`}
                      type="password"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handlePinChange(i, e.target.value)}
                      className="w-full h-full text-center text-[20px] border-none outline-none bg-transparent"
                      style={fontInstrument}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Confirm PIN */}
            <div className="flex flex-col gap-[12px]">
              <p className="text-[14px] text-[#333]" style={fontInstrument}>{t("auth.confirmPin")}</p>
              <div className="flex gap-[12px]">
                {confirmPin.map((digit, i) => (
                  <div key={i} className="bg-white rounded-[8px] border border-[#c6c6c6] size-[44px]">
                    <input
                      id={`confirm-pin-register-${i}`}
                      type="password"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleConfirmPinChange(i, e.target.value)}
                      className="w-full h-full text-center text-[20px] border-none outline-none bg-transparent"
                      style={fontInstrument}
                    />
                  </div>
                ))}
              </div>
              {pinError && (
                <p className="text-[12px] text-[#e53e3e]" style={fontInstrument}>{pinError}</p>
              )}
            </div>

            {/* Register Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#008080] p-[16px] rounded-[12px] border-none cursor-pointer mt-[4px]"
            >
              <p className="text-[24px] text-center text-white tracking-[-1.2px]" style={{ ...fontInstrument, fontWeight: 600 }}>
                {loading ? t("auth.loading") : t("auth.register")}
              </p>
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-[20px]">
            {/* Phone */}
            <div className="flex flex-col gap-[12px]">
              <p className="text-[14px] text-[#333]" style={fontInstrument}>{t("auth.phone")}</p>
              <div className={`bg-white rounded-[8px] border ${phoneTouched && phoneError ? "border-[#e53e3e]" : "border-[#c6c6c6]"}`}>
                <input
                  type="tel"
                  placeholder={t("auth.phonePlaceholder")}
                  value={phone}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  onBlur={handlePhoneBlur}
                  className="w-full p-[12px] text-[16px] border-none outline-none bg-transparent"
                  style={fontInstrument}
                />
              </div>
              {phoneTouched && phoneError && (
                <p className="text-[12px] text-[#e53e3e]" style={fontInstrument}>{phoneError}</p>
              )}
            </div>

            {/* PIN */}
            <div className="flex flex-col gap-[12px]">
              <p className="text-[14px] text-[#333]" style={fontInstrument}>{t("auth.pin")}</p>
              <div className="flex gap-[12px]">
                {pin.map((digit, i) => (
                  <div key={i} className="bg-white rounded-[8px] border border-[#c6c6c6] size-[44px]">
                    <input
                      id={`pin-login-${i}`}
                      type="password"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handlePinChange(i, e.target.value)}
                      className="w-full h-full text-center text-[20px] border-none outline-none bg-transparent"
                      style={fontInstrument}
                    />
                  </div>
                ))}
              </div>
              {pinError && (
                <p className="text-[12px] text-[#e53e3e]" style={fontInstrument}>{pinError}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-[#008080] p-[16px] rounded-[8px] border-none cursor-pointer mt-[4px]"
            >
              <p className="text-[24px] text-center text-white tracking-[-1.2px]" style={{ ...fontInstrument, fontWeight: 600 }}>
                {loading ? t("auth.loading") : t("auth.login")}
              </p>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
