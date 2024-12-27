export function Button({ type = "primary", name = "", style = "", onClick }) {
  // Base styles for all buttons
  const same =
    "text-center rounded leading-4 font-semibold text-base font-openSans";

  // Determine buttonClass based on the type
  const buttonClass = (() => {
    switch (type) {
      case "1":
        return "h-12 gap-2.5 text-white bg-orange-600";
      case "2":
        return "h-12 gap-2.5 text-orange-500 border-orange-500 bg-white border-2";
      case "3":
        return "h-12 text-orange-500";
      default:
        return ""; // Default case if no type matches
    }
  })();

  // Combine the buttonClass with additional styles
  const combinedClass = `${same} ${buttonClass} ${style}`.trim();

  return (
    <button className={combinedClass} onClick={onClick}>
      {name}
    </button>
  );
}
