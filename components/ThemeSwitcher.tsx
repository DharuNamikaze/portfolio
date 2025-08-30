"use client";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

// Dynamic imports for icons
const MdDarkMode = dynamic(() => import("react-icons/md").then(mod => ({ default: mod.MdDarkMode })), {
  loading: () => <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
});

const MdLightMode = dynamic(() => import("react-icons/md").then(mod => ({ default: mod.MdLightMode })), {
  loading: () => <div className="w-6 h-6 bg-gray-300 rounded animate-pulse" />
});

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Check if user has a saved theme in localStorage
    const savedTheme = (localStorage.getItem("theme") as "light" | "dark") || "light";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button type="submit" title="Theme" onClick={toggleTheme}>
      {theme === "light" ? <MdDarkMode /> : <MdLightMode />}
    </button>
  );
}