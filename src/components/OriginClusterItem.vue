<template lang="pug">
.item-block(
  v-for="(dataSet_item, key) in clustersData.cars",
  :key="`cluster_${key}`",
  :style="itemStyles(key)",
  v-on:wheel="selectItem(dataSet_item, key, $event)",
  @click="selectItem(dataSet_item, key)"
)
  template(v-if="!isOpen(dataSet_item.name)")
    .item-block--content(:class="{ 'preview-car': dataSet_item.images }")
      .user-bar(:class="{ 'user-bar--for-image': dataSet_item.src }")
        .item-block--car-preview(
          v-if="dataSet_item.images",
          :style="{ backgroundImage: `url(${dataSet_item.images[1].src})` }"
        )
        .user-bar--name {{ dataSet_item.name }}
        .user-bar--price(v-if="dataSet_item.images") {{ `Starting MSRP ${dataSet_item.price}` }}
      .preview-clusters(
        v-if="dataSet_item.cars && dataSet_item.type === 'cluster'"
      )
        .preview-clusters--image(
          :style="{ backgroundImage: `url(${dataSet_item.preview ? dataSet_item.preview : dataSet_item.src})` }"
        )
  template(v-else)
    origin-cluster-item(
      :clustersData="dataSet_item",
      :useKey="useKey",
      :blockScroll="blockScroll",
      :columnCount="columnCount",
      :rowCount="rowCount",
      :itemWidth="itemWidth",
      :itemHeight="itemHeight",
      :contentBlockRef="contentBlockRef",
      @pushActiveClusterToStore="$emit('pushActiveClusterToStore', $event)",
      @updateOpenedLastSection="openedLastSection = $event"
    )
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from "vue";

const emit = defineEmits([
  "pushActiveClusterToStore",
  "updateOpenedLastSection",
]);

const props = defineProps({
  clustersData: Object,
  useKey: Boolean,
  blockScroll: Boolean,
  columnCount: Number,
  rowCount: Number,
  itemWidth: Number,
  itemHeight: Number,
  animationKey: Number,
  contentBlockRef: Object,
});

const animationKey = ref(-1);
const activeItem = ref();
const openClusters = ref("");
const openedLastSection = ref(true);

const isOpen = (name: string) => {
  return openClusters.value === name;
};

const selectItem = (item: any, key: number, zoom?: any) => {
  const openMouse = zoom ? zoom.wheelDelta > 0 : true;
  const useMouse = zoom ? props.useKey && props.blockScroll : true;
  if (!isOpen(item.name) && !item.images && useMouse && openMouse) {
    animationKey.value = key;
    activeItem.value = item;
    openClusters.value = item.name;
    openedLastSection.value = true;
    emit("pushActiveClusterToStore", item);
    emit("updateOpenedLastSection", false);
  }
  if (isOpen(item.name) && useMouse && !openMouse && openedLastSection.value) {
    animationKey.value = -1;
    setTimeout(() => {
      openClusters.value = "";
    }, 700);
    emit("pushActiveClusterToStore", props.clustersData);
    emit("updateOpenedLastSection", true);
  }
};

watch(
  () => props.rowCount,
  () => {
    itemStyles(animationKey.value);
  }
);

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
      animationHeight = props.itemHeight! * props.rowCount!;
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
  cursor: pointer;
  position: absolute;
  overflow: hidden;
  box-sizing: border-box;

  padding: 4px;
  background: white;
  transition: width 0.5s ease-in, height 0.5s ease-in, left 0.5s ease-in,
    top 0.5s ease-in;

  &--content {
    overflow: hidden;
    position: relative;
    height: 100%;
    background: $bunting;
    border-radius: 10px;
    &.preview-car {
      background: white;
      .user-bar {
        flex-direction: column;
        align-items: center;
        justify-content: flex-end;
        &--name {
          font-weight: 600;
          font-size: 18px;
          line-height: 22px;
          letter-spacing: -0.1px;
          color: black;
        }
        &--price {
          font-size: 13px;
          line-height: 16px;
          letter-spacing: 0.25px;
        }
      }
    }
  }

  .user-bar {
    position: absolute;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    &--name {
      color: white;
    }
  }
  &--car-preview {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    top: -10%;
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
