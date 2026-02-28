import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

interface DatePickerProps {
  value: string;
  onChange: (dateStr: string) => void;
  placeholder?: string;
  disabled?: { before?: Date; after?: Date; };
}

export function DatePicker({ value, onChange, placeholder, disabled }: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const selected = value ? new Date(value + "T00:00:00") : undefined;

  const handleSelect = (day: Date | undefined) => {
    if (day) {
      onChange(format(day, "yyyy-MM-dd"));
      setOpen(false);
    }
  };

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const displayValue = selected
    ? format(selected, "dd MMM yyyy")
    : "";

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full bg-white rounded-[8px] border border-[#c6c6c6] p-[12px] pr-[40px] text-left cursor-pointer flex items-center"
        style={fontInstrument}
      >
        <span
          className={`text-[16px] ${displayValue ? "text-[#333]" : "text-[#999]"}`}
        >
          {displayValue || placeholder || t("screening.datePlaceholder")}
        </span>
        <Calendar
          className="absolute right-[12px] top-1/2 -translate-y-1/2 text-[#c6c6c6] pointer-events-none"
          size={24}
        />
      </button>

      {/* Calendar Dropdown */}
      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 bg-white rounded-[12px] shadow-[0px_8px_24px_rgba(0,0,0,0.15)] border border-[#e5e5e5] p-[12px]">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={handleSelect}
            defaultMonth={selected || new Date()}
            disabled={disabled ? disabled : { before: new Date() }}
            showOutsideDays
            classNames={{
              months: "flex flex-col",
              month: "flex flex-col gap-[8px]",
              caption: "flex items-center justify-between px-[4px] pb-[8px]",
              caption_label: "text-[15px] font-semibold text-[#333]",
              nav: "flex gap-[4px]",
              nav_button:
                "size-[32px] flex items-center justify-center rounded-full hover:bg-[#f0f0f0] transition-colors border-none bg-transparent cursor-pointer",
              nav_button_previous: "",
              nav_button_next: "",
              table: "w-full border-collapse",
              head_row: "flex",
              head_cell:
                "flex-1 text-center text-[12px] font-medium text-[#999] pb-[8px]",
              row: "flex w-full",
              cell: "flex-1 text-center p-0",
              day: "size-[36px] mx-auto text-[14px] rounded-full border-none bg-transparent cursor-pointer hover:bg-[#e0f2f2] transition-colors text-[#333]",
              day_selected:
                "!bg-[#008080] !text-white hover:!bg-[#006b6b] font-semibold",
              day_today: "font-bold text-[#008080]",
              day_outside: "text-[#ccc]",
              day_disabled: "text-[#ddd] cursor-not-allowed hover:bg-transparent",
            }}
            components={{
              IconLeft: () => <ChevronLeft size={18} color="#333" />,
              IconRight: () => <ChevronRight size={18} color="#333" />,
            }}
            styles={{
              caption: fontInstrument,
              head_cell: fontInstrument,
              day: fontInstrument,
            }}
          />
        </div>
      )}
    </div>
  );
}
