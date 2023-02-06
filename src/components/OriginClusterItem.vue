<template lang="pug">
.item-block(
  v-for="(dataSet_item, key) in clustersData.cars",
  :key="`cluster_${key}`",
  :style="itemStyles(key)",
  @click="startAnimation(key, dataSet_item)"
)
  .item-block--content
    .user-bar(:class="{ 'user-bar--for-image': dataSet_item.src }")
      .user-bar--name {{ dataSet_item.name }}
    .preview-clusters(v-if="dataSet_item.cars")
      .preview-clusters--image(
        :style="{ backgroundImage: `url(${dataSet_item.preview ? dataSet_item.preview : dataSet_item.src})` }"
      )
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from "vue";

const emit = defineEmits(["activeCluster"]);

const props = defineProps({
  clustersData: Object,
  columnCount: Number,
  itemWidth: Number,
  itemHeight: Number,
  animationKey: Number,
  contentBlockRef: Object,
});

const openClusters = ref([] as string[]);
const animationKey = ref(-1);

const isOpen = (name: string) => {
  return openClusters.value.includes(name);
};

const startAnimation = (key: number, dataSet_item: any) => {
  if (dataSet_item.cars) {
    emit("activeCluster", dataSet_item);
  }
};

const itemStyles = (key: number) => {
  const rowPosition = Math.floor(key / props.columnCount!);
  const columnPosition = key - rowPosition * props.columnCount!;
  let left = columnPosition * props.itemWidth!;
  let top = rowPosition * props.itemHeight!;
  let animationWidth = 0;
  let animationHeight = 0;
  if (animationKey.value !== -1) {
    const animationColumnPosition =
      animationKey.value - rowPosition * props.columnCount!;
    const animationRowPosition = Math.floor(
      animationKey.value / props.columnCount!
    );
    const topPredicator = animationRowPosition * props.itemHeight!;
    if (animationRowPosition === rowPosition) {
      left +=
        animationColumnPosition < columnPosition
          ? (props.columnCount! - columnPosition) * props.itemWidth!
          : -((columnPosition + 1) * props.itemWidth!);
    }
    top -= topPredicator;
    if (rowPosition > animationRowPosition) {
      top += 2 * props.itemHeight!;
    }
    setTimeout(() => {
      props.contentBlockRef!.scrollTo({ top: 0, behavior: "smooth" });
    }, 150 / rowPosition);
    if (key === animationKey.value) {
      animationWidth = props.contentBlockRef!.offsetWidth;
      animationHeight = props.itemHeight! * 3;
      left = 0;
      top = 0;
    }
  }
  return {
    width: `${animationWidth ? animationWidth : props.itemWidth!}px`,
    height: `${animationHeight ? animationHeight : props.itemHeight!}px`,
    left: `${left}px`,
    top: `${top}px`,
  };
};
</script>

<style scoped lang="scss">
.item-block {
  position: absolute;
  box-sizing: border-box;

  padding: 4px;
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
    display: flex;
    justify-content: space-between;
    top: -1px;

    padding: 12px 0;
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
</style>
