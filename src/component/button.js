// Generic Button Component
export function Button({
  variant = "primary",
  label,
  colors = "",
  other = "",
  onClick,
}) {
  // Determine buttonClass based on the variant
  const buttonClass = (() => {
    switch (variant) {
      case "primary":
        return "btn-primary bg-orange-600";
      case "secondary":
        return "btn-secondary bg-gray-300";
      case "ghost":
        return "btn-ghost border border-gray-300 bg-transparent text-gray-600";
      default:
        return ""; // Default case if no variant matches
    }
  })();

  // Combine the buttonClass with additional colors and other styles
  const combinedClass = `${buttonClass} ${colors} ${other}`.trim();

  return (
    <button className={combinedClass} onClick={onClick}>
      {label}
    </button>
  );
}
