"use client";

import { useEffect, useState } from "react";
import { TbMoon, TbSun } from "react-icons/tb";

export default function ColorSchemeToggler() {
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    if (window === undefined || !window.localStorage) {
      return;
    }

    // is darkMode enabled in ls
    const ls = localStorage.getItem("darkMode");
    if (ls) {
      switch (ls) {
        case "enabled":
          document.body.classList.add("dark");
          setDarkModeEnabled(true);
          return;
        case "disabled":
          document.body.classList.remove("dark");
          setDarkModeEnabled(false);
          return;
        default:
          console.log("Ivalid value for darkMode in localStorage");
          localStorage.removeItem("darkMode");
          break;
      }
    }

    // prefers-color-scheme
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.classList.add("dark");
      console.log("prefered darkMode");
      setDarkModeEnabled(true);
    }
  }, []);

  return (
    <button
      onClick={() =>
        setDarkModeEnabled((prev) => {
          if (!prev) {
            document.body.classList.add("dark");
            localStorage.setItem("darkMode", "enabled");
          } else {
            document.body.classList.remove("dark");
            localStorage.setItem("darkMode", "disabled");
          }
          return !prev;
        })
      }
    >
      {darkModeEnabled ? <TbSun /> : <TbMoon />}
    </button>
  );
}
