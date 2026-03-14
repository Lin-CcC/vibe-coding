<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { slides } from "../slides";
import SlideFrame from "../components/SlideFrame.vue";
import SlideContent from "../components/SlideContent.vue";

const route = useRoute();
const slideId = computed(() => String(route.params.id || ""));

const slideIndex = computed(() => slides.findIndex((s) => s.id === slideId.value));
const safeIndex = computed(() => (slideIndex.value >= 0 ? slideIndex.value : 0));
const slide = computed(() => slides[safeIndex.value] || slides[0]);
</script>

<template>
  <SlideFrame :slide="slide" :index="safeIndex" :total="slides.length">
    <SlideContent :slide="slide" />
  </SlideFrame>
</template>
