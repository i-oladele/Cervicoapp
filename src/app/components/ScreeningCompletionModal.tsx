import { useState } from "react";
import { X } from "lucide-react";
import { useUser } from "./UserContext";
import { updateScreeningCompletion } from "./api";
import { toast } from "sonner";
import { useLanguage } from "./LanguageContext";

const fontInstrument = { fontFamily: "'Instrument Sans', sans-serif" };

interface ScreeningCompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnswered?: (screening: any) => void;
}

export function ScreeningCompletionModal({ isOpen, onClose, onAnswered }: ScreeningCompletionModalProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { t } = useLanguage();

  const handleConfirm = async (completed: boolean) => {
    if (!user) return;

    setLoading(true);
    try {
      const result = await updateScreeningCompletion(user.phone, completed);
      onAnswered?.(result?.screening ?? { completed });
      if (completed) {
        toast.success(t("completion.thanks"));
      } else {
        toast.info(t("completion.reschedule"));
      }
      
      onClose();
    } catch (error) {
      console.error("Error updating screening completion:", error);
      toast.error(t("home.screeningSaveError"));
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold text-black" style={fontInstrument}>
            {t("completion.title")}
          </h2>
          <button
            onClick={onClose}
            aria-label={t("completion.later")}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-gray-700 mb-4" style={fontInstrument}>
            {t("completion.question")}
          </p>
          <p className="text-sm text-gray-500" style={fontInstrument}>
            {t("completion.note")}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => handleConfirm(true)}
            disabled={loading}
            className="flex-1 bg-[#008080] text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={fontInstrument}
          >
            {loading ? t("assessment.saving") : t("completion.yes")}
          </button>
          <button
            onClick={() => handleConfirm(false)}
            disabled={loading}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={fontInstrument}
          >
            {loading ? t("assessment.saving") : t("completion.no")}
          </button>
        </div>

        {/* Skip Option */}
        <div className="mt-4 text-center">
          <button
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            style={fontInstrument}
          >
            {t("completion.later")}
          </button>
        </div>
      </div>
    </div>
  );
}
