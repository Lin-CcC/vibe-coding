export default function SlideContent({ slide }) {
  if (slide?.layout === "cover") {
    return (
      <>
        <div className="cover__subtitle">{slide.subtitle}</div>
        <div className="cover__meta">
          <span>{slide.meta}</span>
        </div>
      </>
    );
  }

  const blocks = slide?.blocks || [];
  return (
    <>
      {blocks.map((block, i) => {
        if (block.kind === "cardHtml") {
          return <div key={i} className="card" dangerouslySetInnerHTML={{ __html: block.html }} />;
        }

        if (block.kind === "list") {
          const cols2 = block.columns === 2;
          return (
            <ul key={i} className={`list ${cols2 ? "cols2" : ""}`}>
              {block.items.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          );
        }

        return null;
      })}
    </>
  );
}

