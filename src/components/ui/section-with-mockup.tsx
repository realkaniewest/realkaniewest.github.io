import type { ReactNode } from "react";

export function SectionWithMockup({
  id,
  title,
  description,
  primary,
  secondary,
  reverseLayout = false,
}: {
  id?: string;
  title: ReactNode;
  description: ReactNode;
  primary: ReactNode;
  secondary: ReactNode;
  reverseLayout?: boolean;
}) {
  return (
    <section className="mockup-section" id={id}>
      <div className={reverseLayout ? "mockup-section__grid is-reversed" : "mockup-section__grid"}>
        <div className="section-copy">
          <p className="eyebrow">proof</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="mockup-stack" aria-hidden="true">
          <div className="mockup-stack__back">{secondary}</div>
          <div className="mockup-stack__front">{primary}</div>
        </div>
      </div>
    </section>
  );
}
