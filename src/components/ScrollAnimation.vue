<template lang="pug">
.animation-wrapper
  .animated(
    :style="{ transition: `all ${duration}s ease` }",
    :class="animationType"
  )
    slot
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  animationType: {
    type: String,
    default: "fade-in",
  },
  duration: {
    type: Number,
    default: 1,
  },
});
</script>

<style scoped lang="scss">
%block {
  width: 100%;
  height: auto;
}

.animation-wrapper {
  overflow: visible;

  @extend %block;
}
.animated {
  @extend %block;
  &.fade-in {
    opacity: 0;
  }
  &.zoom {
    transform: translate3d(0, 100px, 0) scale(0.6);
  }
  &.flip {
    transform: rotateY(90deg);
  }
  &.linear-bottom {
    opacity: 0;
    transform: translate(0, 100px);
  }
  &.to-corner {
    opacity: 0;
    transform: scale(0) translate(50%, 50%);
  }
  &.slide-right {
    opacity: 0;
    transform: translate(-100%);
  }
  &.slide-left {
    opacity: 0;
    transform: translate(100%);
  }
}
.fade-in,
.flip,
.linear-bottom,
.to-corner,
.slide-right {
  @extend %block;
}
</style>
