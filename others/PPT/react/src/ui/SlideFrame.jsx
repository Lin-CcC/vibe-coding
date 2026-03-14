export default function SlideFrame({ slide, index, total, children, thumbnail = false }) {
  const a = index + 1;
  const b = total;
  const aa = a < 10 ? `0${a}` : String(a);
  const bb = b < 10 ? `0${b}` : String(b);

  return (
    <div className={`slide slide-theme--${slide?.theme || "simple"}`} data-slide-id={slide?.id}>
      <div className="s">
        <div className="frame">
          {!thumbnail && (
            <div className="frame__top">
              <div className="chip">
                <span className="chip__dot" aria-hidden="true"></span>
                <span className="chip__text">{slide?.routeTitle || "页面"}</span>
              </div>
              <div className="pill">
                {aa} / {bb}
              </div>
            </div>
          )}

          <div className="frame__main">
            {slide?.titleHtml ? (
              <div className="s__title" dangerouslySetInnerHTML={{ __html: slide.titleHtml }} />
            ) : (
              <div className="s__title">{slide?.title}</div>
            )}
            <div className="s__body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

