<template lang="pug">
.performance-section(v-if="content")
  .title-section
    .title-section--section-image
      img(:src="content.preview", alt="#")
    .title-section--section-text(
      :style="{ color: content.color ? content.color : '' }"
    )
      .title-section--section-name {{ content.title.name }}
      .title-section--section-logo {{ content.title.logo }}
      .title-section--section-description {{ content.title.description }}
  .image-section
    .image-section--item(v-for="item in content.images")
      .image-section--image
        img(:src="item.src", alt="#")
      .image-section--description
        .image-section--title {{ item.description.title }}
        .image-section--text {{ item.description.text }}
</template>

<script setup lang="ts">
import { computed, defineProps } from "vue";

const props = defineProps({
  clustersData: Object,
});

const content = computed(() => {
  if (props.clustersData && props.clustersData.content) {
    return props.clustersData!.content.find(
      (el: any) => el.type === "content_performance"
    );
  }
  return "";
});
</script>

<style scoped lang="scss">
.performance-section {
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
  color: #221f1f;
  .title-section {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 25px;
    color: #f6f6f6;
    &--section {
      &-text {
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
      }
      &-image {
        width: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      &-name {
        margin-top: 80px;
        text-transform: uppercase;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 2.75px;
      }
      &-logo {
        text-transform: uppercase;
        font-size: 39px;
        line-height: 48px;
        letter-spacing: -0.1px;
      }
      &-description {
        width: 80%;
        font-size: 16px;
        line-height: 26px;
        letter-spacing: 0.5px;
        text-align: center;
      }
    }
  }
  .image-section {
    display: flex;
    flex-direction: column;
    gap: 25px;
    &--item {
      display: flex;
      &:nth-child(even) {
        flex-direction: row-reverse;
      }
    }
    &--image {
      width: 70%;
      img {
        max-height: 1000px;
        width: 100%;
        height: 100%;
      }
    }
    &--description {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 30%;
    }
    &--title {
      margin-bottom: 10px;
      font-size: 28px;
      line-height: 37px;
      letter-spacing: -0.1px;
    }
    &--text {
      width: 60%;
      text-align: center;
      font-size: 16px;
      line-height: 26px;
      letter-spacing: 0.5px;
    }
  }
}
</style>
