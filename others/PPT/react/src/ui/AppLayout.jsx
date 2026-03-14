import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { slides } from "../slides";
import SidebarThumb from "./SidebarThumb.jsx";

const SLIDE_W = 1280;

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

export default function AppLayout() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const viewportRef = useRef(null);
  const [scale, setScale] = useState(1);

  const currentId = String(id || slides[0]?.id || "1");
  const currentIndex = useMemo(
    () => slides.findIndex((s) => s.id === currentId),
    [currentId]
  );
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;

  function goToIndex(nextIndex, replace) {
    const s = slides[nextIndex];
    if (!s) return;
    navigate(`/slide/${s.id}`, { replace: Boolean(replace) });
  }

  function goDelta(delta) {
    const next = clamp(safeIndex + delta, 0, slides.length - 1);
    if (next !== safeIndex) goToIndex(next);
  }

  useEffect(() => {
    if (currentIndex < 0 && slides[0]) goToIndex(0, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  useEffect(() => {
    function onKeydown(e) {
      const tag = e.target?.tagName || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goDelta(-1);
      } else if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goDelta(1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goToIndex(0);
      }
    }
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, [safeIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    function update() {
      const rect = viewport.getBoundingClientRect();
      if (!rect.width) return;
      setScale(rect.width / SLIDE_W);
    }

    update();
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(update);
      ro.observe(viewport);
      return () => ro.disconnect();
    }
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <div className={`app ${sidebarCollapsed ? "is-sidebar-collapsed" : ""}`}>
      <aside className={`sidebar ${sidebarCollapsed ? "is-collapsed" : ""}`}>
        <div className="sidebar__top">
          <div className="brand">
            <div className="brand__title">网页PPT（React）</div>
          </div>
          <button className="btn btn--ghost" type="button" onClick={() => setSidebarCollapsed((v) => !v)}>
            侧边栏
          </button>
        </div>
        <div className="thumbs">
          {slides.map((s, idx) => (
            <SidebarThumb
              key={s.id}
              slide={s}
              index={idx}
              total={slides.length}
              active={s.id === currentId}
              onOpen={() => navigate(`/slide/${s.id}`)}
            />
          ))}
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="topbar__left">
            <button className="btn" type="button" onClick={() => goDelta(-1)}>
              上一页
            </button>
            <button className="btn" type="button" onClick={() => goDelta(1)}>
              下一页
            </button>
            <button className="btn btn--ghost" type="button" onClick={() => goToIndex(0)}>
              首页
            </button>
          </div>
          <div className="topbar__right">
            <div className="status">
              第 {safeIndex + 1} / {slides.length} 页 · {slides[safeIndex]?.routeTitle}
            </div>
          </div>
        </header>

        <section className="stage">
          <div className="viewport" ref={viewportRef}>
            <div className="slideRoot" style={{ transform: `scale(${scale})` }}>
              <Outlet />
            </div>
          </div>
        </section>

        <footer className="hint">键盘：←/→ 或 ↑/↓ 切页；点击左侧缩略图切换。</footer>
      </main>
    </div>
  );
}

