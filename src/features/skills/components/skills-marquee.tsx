import { getMarqueeItems } from '../services/skills.service';

const MARQUEE_COPIES = 2;

export function SkillsMarquee() {
  const items = getMarqueeItems();

  return (
    <div
      aria-hidden
      className="overflow-hidden border-y border-border bg-surface [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] py-5"
    >
      <div className="flex w-max motion-safe:animate-marquee">
        {Array.from({ length: MARQUEE_COPIES }, (_, copy) => (
          <ul key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <li
                key={item}
                className="flex items-center gap-10 pr-10 font-mono text-sm tracking-[0.18em] text-muted uppercase"
              >
                {item}
                <span className="h-1 w-1 rounded-full bg-primary" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
