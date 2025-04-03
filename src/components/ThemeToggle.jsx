import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme} className="btn btn-outline-primary">
      {theme === "dark" ? "Light Mode 🌞" : "Dark Mode 🌙"}
    </button>
  );
};

export default ThemeToggle;
