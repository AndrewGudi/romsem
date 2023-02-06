<template lang="pug">
.item-block
  .item-block--content
    .user-bar(:class="{ 'user-bar--for-image': item.src }")
      .user-bar--name {{ item.name }}
    .preview-clusters(v-if="item.cars")
      .preview-clusters--image(
        :style="{ backgroundImage: `url(${item.preview ? item.preview : item.src})` }"
      )
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  item: Object,
});
</script>

<style scoped lang="scss">
.item-block {
  position: relative;
  box-sizing: border-box;

  padding: 4px;
  height: 100%;
  width: 100%;
  background: white;
  transition: width 0.5s ease-in, height 0.5s ease-in, left 0.5s ease-in,
    top 0.5s ease-in;

  &--content {
    overflow: hidden;
    height: 100%;
    background: $bunting;
  }

  .user-bar {
    position: absolute;
    box-sizing: border-box;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    top: -1px;

    padding: 12px;
    width: 100%;
    height: 48px;

    &--name {
      color: white;
    }
  }
  .preview-clusters {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    height: 100%;
    &--image {
      background-size: cover;
      background-repeat: no-repeat;
      width: 100%;
      height: 100%;
      transition: 0.2s;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
}
.slide.active {
  .item-block {
    .preview-clusters {
      &--image {
        transform: scale(1.1);
      }
    }
  }
}
</style>
