import { X, Check } from "lucide-react";

export default function YesNoSelector({ value, onChange, error }) {
  return (
    <div className="space-y-2">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => onChange("Yes")}
          className={`flex-1 relative overflow-hidden rounded-xl px-6 py-4 text-center font-semibold transition-all duration-300 transform hover:scale-105 ${
            value === "Yes"
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/25"
              : "bg-white border-2 border-gray-200 text-gray-700 hover:border-green-300 hover:bg-green-50"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {value === "Yes" && <Check size={20} />}
            <span className="text-lg">Yes</span>
          </div>
          {value === "Yes" && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 animate-pulse"></div>
          )}
        </button>

        <button
          type="button"
          onClick={() => onChange("No")}
          className={`flex-1 relative overflow-hidden rounded-xl px-6 py-4 text-center font-semibold transition-all duration-300 transform hover:scale-105 ${
            value === "No"
              ? "bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-lg shadow-red-500/25"
              : "bg-white border-2 border-gray-200 text-gray-700 hover:border-red-300 hover:bg-red-50"
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            {value === "No" && <X size={20} />}
            <span className="text-lg">No</span>
          </div>
          {value === "No" && (
            <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-rose-400/20 animate-pulse"></div>
          )}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 mt-2 animate-shake">{error}</p>
      )}
    </div>
  );
}
