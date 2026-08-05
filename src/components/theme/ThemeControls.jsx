import ThemeToggle from "./ThemeToggle";
import AccentPicker from "./AccentPicker";
import GlassToggle from "./GlassToggle";

// Drop this into your Navbar
export default function ThemeControls() {
  return (
    <div className="flex items-center gap-3">
      <AccentPicker />
      <GlassToggle />
      <ThemeToggle />
    </div>
  );
}