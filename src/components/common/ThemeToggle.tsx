import React from "react";
import { Sun, Moon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../store";
import { toggleTheme } from "../../store/api/themeApi";

export const ThemeToggle: React.FC<{ className?: string }> = ({
  className = "",
}) => {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((state) => state.theme.theme);

  return (
    <button
      type="button"
      onClick={() => dispatch(toggleTheme())}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`p-2 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0 ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4" />
      ) : (
        <Moon className="w-4 h-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
