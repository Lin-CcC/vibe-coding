import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { slides } from "../slides";
import SlideFrame from "./SlideFrame.jsx";
import SlideContent from "./SlideContent.jsx";

export default function SlidePage() {
  const { id } = useParams();
  const slideId = String(id || "");

  const slideIndex = useMemo(() => slides.findIndex((s) => s.id === slideId), [slideId]);
  const safeIndex = slideIndex >= 0 ? slideIndex : 0;
  const slide = slides[safeIndex] || slides[0];

  return (
    <SlideFrame slide={slide} index={safeIndex} total={slides.length}>
      <SlideContent slide={slide} />
    </SlideFrame>
  );
}

