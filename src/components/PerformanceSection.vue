<template lang="pug">
scroll-animation.performance-section(
  v-if="content",
  :animation-type="'linear-bottom'"
)
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
    .image-section--item(v-for="(item, index) in content.images")
      scroll-animation.image-section--image(
        :animation-type="isRightAnimation(index)"
      )
        img(:src="item.src", alt="#")
      scroll-animation.image-section--description(
        :animation-type="isRightAnimation(index + 1)"
      )
        .image-section--title {{ item.description.title }}
        .image-section--text {{ item.description.text }}
</template>

<script setup lang="ts">
import { computed, defineProps, nextTick } from "vue";
import ScrollAnimation from "@/components/ScrollAnimation.vue";
import { UseScrollAnimation } from "@/composables/useScrollAnimation";

const props = defineProps({
  clustersData: Object,
});

const isRightAnimation = (index: number) => {
  console.log(index % 2);
  return `slide-${index % 2 === 0 ? "right" : "left"}`;
};

const content = computed(() => {
  if (props.clustersData && props.clustersData.content) {
    nextTick(() => {
      UseScrollAnimation();
    });
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
    .animation-wrapper.image-section--description::v-deep {
      .slide-left,
      .slide-right {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
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
