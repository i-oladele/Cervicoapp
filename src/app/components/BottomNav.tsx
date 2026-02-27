import { Home, BookMarked, Building2, FileEdit } from "lucide-react";
import { useLanguage } from "./LanguageContext";
import svgPaths from "../../imports/svg-bvxajhv6xg";
import svgBookPaths from "../../imports/svg-ulgupos6ff";
import svgHospitalPaths from "../../imports/svg-iwlg5vjkva";
import svgNotePencilPaths from "../../imports/svg-fne5h1kfn0";

const navItems = [
  { id: "home", labelKey: "nav.home", icon: Home },
  { id: "library", labelKey: "nav.library", icon: BookMarked },
  { id: "screening", labelKey: "nav.screening", icon: Building2 },
  { id: "assessment", labelKey: "nav.assessment", icon: FileEdit },
];

interface BottomNavProps {
  active: string;
  onNavigate: (id: string) => void;
}

export function BottomNav({ active, onNavigate }: BottomNavProps) {
  const { t } = useLanguage();

  return (
    <div className="shrink-0 bg-white flex items-center justify-between px-[24px] pt-[12px] shadow-[0px_-4px_16px_0px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom, 12px))' }}
    >
      {navItems.map((item) => {
        const isActive = active === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="flex flex-col gap-[6px] items-center w-[76px] bg-transparent border-none cursor-pointer"
          >
            {item.id === "home" && isActive ? (
              <div className="size-[24px]">
                <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                  <path d={svgPaths.pf1a2200} fill="#008080" />
                </svg>
              </div>
            ) : item.id === "library" && isActive ? (
              <div className="size-[24px]">
                <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                  <path d={svgBookPaths.p24daa000} fill="#008080" />
                </svg>
              </div>
            ) : item.id === "screening" && isActive ? (
              <div className="size-[24px]">
                <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                  <path d={svgHospitalPaths.p1c590b70} fill="#008080" />
                </svg>
              </div>
            ) : item.id === "assessment" && isActive ? (
              <div className="size-[24px]">
                <svg className="block size-full" fill="none" viewBox="0 0 24 24">
                  <path d={svgNotePencilPaths.p18600900} fill="#008080" />
                </svg>
              </div>
            ) : (
              <item.icon
                size={24}
                color={isActive ? "#008080" : "#A6A6A6"}
                fill={isActive ? "#008080" : "none"}
                strokeWidth={isActive ? 2.5 : 2}
              />
            )}
            <span
              className="text-[12px] text-center"
              style={{
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "#008080" : "#a6a6a6",
              }}
            >
              {t(item.labelKey)}
            </span>
          </button>
        );
      })}
    </div>
  );
}