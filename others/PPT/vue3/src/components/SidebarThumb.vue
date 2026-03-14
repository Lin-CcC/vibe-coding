<script setup>
import SlideFrame from "./SlideFrame.vue";
import SlideContent from "./SlideContent.vue";

defineProps({
  slide: { type: Object, required: true },
  index: { type: Number, required: true },
  total: { type: Number, required: true },
  active: { type: Boolean, default: false },
});

const emit = defineEmits(["open"]);
</script>

<template>
  <button class="thumb" :class="{ 'is-active': active }" type="button" @click="emit('open')">
    <div class="thumb__preview">
      <div class="thumb__scale">
        <SlideFrame :slide="slide" :index="index" :total="total" thumbnail>
          <SlideContent :slide="slide" />
        </SlideFrame>
      </div>
    </div>
    <div class="thumb__label">
      <strong>{{ index + 1 }}</strong>
      <span>{{ slide.routeTitle }}</span>
    </div>
  </button>
</template>

