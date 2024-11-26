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
        return "btn-secondary bg-gray-400";
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



export function Back() {
  return <button className="btn-primary bg-orange-600">Back</button>;
}

export function BackToHome() {
  return <button className="btn-primary bg-orange-600">Back to Home</button>;
}

export function BookNow() {
  return <button className="btn-primary bg-orange-600">Book Now</button>;
}

export function ChangeDate() {
  return <button className="btn-primary bg-orange-600">Change Date</button>;
}

export function ConfirmBooking() {
  return <button className="btn-primary bg-orange-600">Confirm Booking</button>;
}

export function ConfirmChangeDate() {
  return (
    <button className="btn-primary bg-orange-600">Confirm Change Date</button>
  );
}

export function LoginPrimary() {
  return <button className="btn-primary bg-orange-600">Log in</button>;
}

export function LoginSecondary() {
  return <button className="btn-secondary">Log in</button>;
}

export function Next() {
  return <button className="btn-primary bg-orange-600">Next</button>;
}

export function RegisterPrimary() {
  return <button className="btn-primary bg-orange-600">Resgister</button>;
}

export function RegisterSec() {
  return <button className="btn-secondary">Resgister</button>;
}

export function SearchPri() {
  return <button className="btn-primary bg-orange-600">Search</button>;
}

export function SearchSec() {
  return <button className="btn-secondary">Search</button>;
}

export function UpdatePayment() {
  return <button className="btn-primary bg-orange-600">Update Payment</button>;
}
