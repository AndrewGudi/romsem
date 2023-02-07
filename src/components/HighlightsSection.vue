<template lang="pug">
.highlights-section(v-if="content")
  .title-section
    .title-section--section-name {{ content.title.name }}
    .title-section--section-logo {{ content.title.logo }}
    .title-section--section-description {{ content.title.description }}
  .image-section
    .image-section--item(v-for="item in content.images")
      .image-section--image(:style="{ backgroundImage: `url(${item.src})` }")
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
      (el: any) => el.type === "content_highlights"
    );
  }
  return "";
});
</script>

<style scoped lang="scss">
.highlights-section {
  display: flex;
  flex-direction: column;
  padding: 80px 8%;
  background-color: #f6f6f6;
  color: #221f1f;
  .title-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-bottom: 50px;
    &--section {
      &-name {
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
    gap: 1px;
    &--item {
      display: flex;
      flex-direction: column;
      width: 33.33%;
    }
    &--image {
      margin-bottom: 25px;
      aspect-ratio: 1/1;
      background-size: contain;
      background-repeat: no-repeat;
    }
    &--description {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    &--title {
      margin-bottom: 10px;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.1px;
    }
    &--text {
      width: 60%;
      text-align: center;
      font-size: 13px;
      line-height: 20px;
      letter-spacing: 0.5px;
    }
  }
}
</style>
