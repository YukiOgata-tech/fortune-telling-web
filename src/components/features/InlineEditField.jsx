import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, CheckIcon, XIcon } from "lucide-react";

export const InlineEditField = ({
  label,
  value,
  type = "text",
  minLength,
  maxLength,
  placeholder,
  validate,
  onSave,
  disabled,
  className = "",
}) => {
  const [editing, setEditing] = useState(false);
  const [input, setInput] = useState(value ?? "");
  const [error, setError] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    setInput(value ?? "");
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  const handleSave = async () => {
    setError("");
    if (validate && !validate(input)) {
      setError("入力内容を確認してください");
      return;
    }
    await onSave(input);
    setEditing(false);
  };

  return (
    <div
      className={`flex items-center gap-2 group py-2 px-2 hover:bg-white/10 rounded-xl transition ${className}`}
    >
      <div className="font-semibold w-28">{label}</div>
      <div className="flex-1 min-w-0">
        <AnimatePresence initial={false}>
          {!editing ? (
            <motion.div
              key="display"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex items-center"
            >
              <span className={`truncate ${!value ? "text-white/40" : ""}`}>
                {value || <span>未登録</span>}
              </span>
              {!disabled && (
                <button
                  className="ml-2 p-1 opacity-0 group-hover:opacity-100 transition"
                  onClick={() => setEditing(true)}
                  tabIndex={-1}
                  aria-label="編集"
                  type="button"
                >
                  <PencilIcon className="w-4 h-4 text-indigo-300" />
                </button>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="edit"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type={type}
                value={input}
                minLength={minLength}
                maxLength={maxLength}
                onChange={e => setInput(e.target.value)}
                placeholder={placeholder}
                className="rounded bg-white/30 px-2 py-1 text-black focus:outline-none"
                disabled={disabled}
                max={type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
                style={{ minWidth: type === "date" ? 130 : 100 }}
              />
              <button
                className="text-green-400 p-1"
                onClick={handleSave}
                disabled={disabled}
                aria-label="保存"
                type="button"
              >
                <CheckIcon className="w-4 h-4" />
              </button>
              <button
                className="text-gray-400 p-1"
                onClick={() => { setEditing(false); setInput(value ?? ""); setError(""); }}
                aria-label="キャンセル"
                type="button"
                disabled={disabled}
              >
                <XIcon className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {error && <div className="text-xs text-red-400 mt-1">{error}</div>}
      </div>
    </div>
  );
};

export default InlineEditField;
