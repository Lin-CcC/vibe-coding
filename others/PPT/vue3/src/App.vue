<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { slides } from "./slides";
import SidebarThumb from "./components/SidebarThumb.vue";

const router = useRouter();
const route = useRoute();

const sidebarCollapsed = ref(false);
const viewportEl = ref(null);
const scale = ref(1);

const currentId = computed(() => String(route.params.id || slides[0]?.id || "1"));
const currentIndex = computed(() => slides.findIndex((s) => s.id === currentId.value));
const safeIndex = computed(() => (currentIndex.value >= 0 ? currentIndex.value : 0));
const total = computed(() => slides.length);

function goToIndex(nextIndex) {
  const s = slides[nextIndex];
  if (!s) return;
  router.push(`/slide/${s.id}`);
}

function goDelta(delta) {
  const idx = safeIndex.value;
  const next = Math.max(0, Math.min(slides.length - 1, idx + delta));
  if (next !== idx) goToIndex(next);
}

function setViewportScale() {
  const el = viewportEl.value;
  if (!el) return;
  const rect = el.getBoundingClientRect();
  if (!rect.width) return;
  scale.value = rect.width / 1280;
}

let ro;
function bindResize() {
  setViewportScale();
  if ("ResizeObserver" in window) {
    ro = new ResizeObserver(setViewportScale);
    ro.observe(viewportEl.value);
  } else {
    window.addEventListener("resize", setViewportScale);
  }
}

function unbindResize() {
  if (ro) {
    ro.disconnect();
    ro = undefined;
  } else {
    window.removeEventListener("resize", setViewportScale);
  }
}

function onKeydown(e) {
  const tag = (e.target && e.target.tagName) || "";
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

onMounted(() => {
  bindResize();
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  unbindResize();
  window.removeEventListener("keydown", onKeydown);
});

watch(
  currentIndex,
  (idx) => {
    if (idx < 0 && slides[0]) router.replace(`/slide/${slides[0].id}`);
  },
  { immediate: true }
);
</script>

<template>
  <div class="app" :class="{ 'is-sidebar-collapsed': sidebarCollapsed }">
    <aside class="sidebar" :class="{ 'is-collapsed': sidebarCollapsed }">
      <div class="sidebar__top">
        <div class="brand">
          <div class="brand__title">网页PPT（Vue3）</div>
        </div>
        <button class="btn btn--ghost" type="button" @click="sidebarCollapsed = !sidebarCollapsed">
          侧边栏
        </button>
      </div>
      <div class="thumbs">
        <SidebarThumb
          v-for="(s, idx) in slides"
          :key="s.id"
          :slide="s"
          :index="idx"
          :total="total"
          :active="s.id === currentId"
          @open="router.push(`/slide/${s.id}`)"
        />
      </div>
    </aside>

    <main class="main">
      <header class="topbar">
        <div class="topbar__left">
          <button class="btn" type="button" @click="goDelta(-1)">上一页</button>
          <button class="btn" type="button" @click="goDelta(1)">下一页</button>
          <button class="btn btn--ghost" type="button" @click="goToIndex(0)">首页</button>
        </div>
        <div class="topbar__right">
          <div class="status">
            第 {{ safeIndex + 1 }} / {{ total }} 页 · {{ slides[safeIndex]?.routeTitle }}
          </div>
        </div>
      </header>

      <section class="stage">
        <div class="viewport" ref="viewportEl">
          <div class="slideRoot" :style="{ transform: `scale(${scale})` }">
            <RouterView />
          </div>
        </div>
      </section>

      <footer class="hint">键盘：←/→ 或 ↑/↓ 切页；点击左侧缩略图切换。</footer>
    </main>
  </div>
</template>
