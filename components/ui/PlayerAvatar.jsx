export default function PlayerAvatar({
  initials,
  colorClass = "avatar-gradient-5",
  size = "md",
  ringClass = "",
}) {
  const sizes = {
    sm: "w-9 h-9 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl",
  };

  return (
    <div
      className={`${sizes[size]} ${colorClass} ${ringClass} rounded-full flex items-center justify-center font-bold text-white shadow-soft flex-shrink-0`}
    >
      {initials}
    </div>
  );
}
