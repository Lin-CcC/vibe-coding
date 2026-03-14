<script setup>
import { computed } from "vue";

const props = defineProps({
  slide: { type: Object, required: true },
  index: { type: Number, required: true },
  total: { type: Number, required: true },
  thumbnail: { type: Boolean, default: false },
});

const pillText = computed(() => {
  const a = props.index + 1;
  const b = props.total;
  const aa = a < 10 ? `0${a}` : String(a);
  const bb = b < 10 ? `0${b}` : String(b);
  return `${aa} / ${bb}`;
});

const titleHtml = computed(() => props.slide?.titleHtml);
</script>

<template>
  <div class="slide" :class="`slide-theme--${slide.theme || 'simple'}`" :data-slide-id="slide.id">
    <div class="s">
      <div class="frame">
        <div class="frame__top">
          <div class="chip">
            <span class="chip__dot" aria-hidden="true"></span>
            <span class="chip__text">{{ slide.routeTitle || "页面" }}</span>
          </div>
          <div class="pill">{{ pillText }}</div>
        </div>
        <div class="frame__main">
          <div class="s__title" v-if="titleHtml" v-html="titleHtml"></div>
          <div class="s__title" v-else>{{ slide.title }}</div>
          <div class="s__body">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

