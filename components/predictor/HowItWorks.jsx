import Card from "@/components/ui/Card";

const rules = [
  {
    text: (
      <>
        Awarded to <span className="font-semibold">the player</span> who scores{" "}
        <span className="font-semibold">the most goals</span> in the tournament.
      </>
    ),
  },
  {
    text: (
      <>
        If two or more players are <span className="font-semibold">tied</span>,
        the player with <span className="font-semibold">more assists</span> is
        ranked higher.
      </>
    ),
  },
  {
    text: (
      <>
        If still tied, the player with the{" "}
        <span className="font-semibold">fewest minutes played</span> is ranked
        higher.
      </>
    ),
  },
  {
    text: (
      <>
        If the tie continues,{" "}
        <span className="font-semibold">the award is shared</span>.
      </>
    ),
  },
];

export default function HowItWorks() {
  return (
    <Card padding="md" className="relative overflow-hidden">
      <div className="absolute -bottom-4 -right-4 opacity-[0.04] pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-32 h-32">
          <path
            d="M30 20 Q35 15 50 15 Q75 15 80 30 Q85 50 75 65 L70 70 Q50 75 30 70 Q20 65 25 50 L30 20 Z"
            fill="currentColor"
          />
        </svg>
      </div>

      <h3 className="font-display font-bold text-sm mb-4">
        How the Golden Boot Works
      </h3>

      <ul className="space-y-3">
        {rules.map((rule, i) => (
          <li key={i} className="flex items-start gap-2.5 text-xs leading-relaxed text-[var(--color-text-muted)]">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--color-primary-soft)] text-primary-600 flex items-center justify-center text-[10px] font-bold mt-0.5">
              {i + 1}
            </span>
            <span>{rule.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
