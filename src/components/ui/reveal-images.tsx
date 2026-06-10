export interface RevealItem {
  text: string;
  caption: string;
}

export function RevealImageList({ items }: { items: readonly RevealItem[] }) {
  return (
    <section className="reveal-section" id="work">
      <p className="eyebrow">what I build</p>
      <div className="reveal-list">
        {items.map((item, index) => (
          <article className="reveal-item" key={item.text}>
            <h2>{item.text}</h2>
            <p>{item.caption}</p>
            <div className="reveal-preview" aria-hidden="true">
              <div className={`preview-card preview-card--${index + 1}`}>
                <span />
                <strong>{item.text}</strong>
                <i />
                <i />
                <i />
              </div>
              <div className={`preview-card preview-card--${index + 1} is-back`}>
                <span />
                <strong>{item.caption}</strong>
                <i />
                <i />
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
