<script setup>
const props = defineProps({
  slide: { type: Object, required: true },
});
</script>

<template>
  <template v-if="slide.layout === 'cover'">
    <div class="cover__subtitle">{{ slide.subtitle }}</div>
    <div class="cover__meta">
      <span>{{ slide.meta }}</span>
    </div>
  </template>

  <template v-else>
    <template v-for="(block, i) in slide.blocks" :key="i">
      <div v-if="block.kind === 'cardHtml'" class="card" v-html="block.html"></div>

      <ul
        v-else-if="block.kind === 'list'"
        class="list"
        :class="{ cols2: block.columns === 2 }"
      >
        <li v-for="(item, idx) in block.items" :key="idx" v-html="item"></li>
      </ul>
    </template>
  </template>
</template>

