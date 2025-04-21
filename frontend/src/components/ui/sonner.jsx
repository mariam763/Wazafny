import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme}
      className="toaster group"
      style={{
        "--normal-bg": "#1a002b", // Dark purple background
        "--normal-text": "#ffffff", // White text
        "--normal-border": "#6a0dad", // Purple border
      }}
      {...props}
    />
  );
};

export { Toaster };
