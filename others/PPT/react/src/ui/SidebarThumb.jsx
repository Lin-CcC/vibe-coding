import SlideFrame from "./SlideFrame.jsx";
import SlideContent from "./SlideContent.jsx";

export default function SidebarThumb({ slide, index, total, active, onOpen }) {
  return (
    <button className={`thumb ${active ? "is-active" : ""}`} type="button" onClick={onOpen}>
      <div className="thumb__preview">
        <div className="thumb__scale">
          <SlideFrame slide={slide} index={index} total={total} thumbnail>
            <SlideContent slide={slide} />
          </SlideFrame>
        </div>
      </div>
      <div className="thumb__label">
        <strong>{index + 1}</strong>
        <span>{slide.routeTitle}</span>
      </div>
    </button>
  );
}

