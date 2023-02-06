<template lang="pug">
.carousel
  transition-group(name="swipe")
    .slide(
      v-for="(item, index) in pictures.slice(0, itemsInRow)",
      :key="index",
      :class="isActive(item)",
      :style="itemWidth()",
      @click="selectItem(item, index)"
    )
      slot(:item="item")
  button.prev(v-if="showArrow() && currentIndex", @click="prev")
  button.next(v-if="showArrow() && !disableNextBtn()", @click="next")
template(v-if="itemForChild")
  carousel-slider(
    v-for="cluster in itemForChild",
    :items="cluster",
    :itemsInRow="itemsInRow",
    :contentBlockRef="contentBlockRef",
    :useSelect="true",
    @pushActiveClusterToStore="$emit('pushActiveClusterToStore', $event)",
    v-slot="slotProps"
  )
    car-item(:item="slotProps.item")
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits, ref } from "vue";
import CarItem from "@/components/CarItem.vue";
const emit = defineEmits(["pushActiveClusterToStore"]);
const props = defineProps({
  items: { type: Array },
  itemsInRow: { type: Number },
  contentBlockRef: { type: Object },
  useSelect: { type: Boolean },
});

const currentIndex = ref(0);
const activeItem = ref();
let pictures = ref([...props.items!]);
const itemForChild = computed(() => {
  return activeItem.value && activeItem.value.cars.length
    ? { cars: activeItem.value.cars }
    : undefined;
});

const isActive = (item: any) => {
  if (activeItem.value && activeItem.value.name !== item.name) {
    return "unactive";
  } else if (activeItem.value && activeItem.value.name === item.name) {
    return "active";
  } else return;
};

const selectItem = (item: any, index: number) => {
  if (props.useSelect) {
    if (activeItem.value && activeItem.value.name === item.name) {
      return (activeItem.value = undefined);
    } else activeItem.value = item;
    emit("pushActiveClusterToStore", activeItem.value);
  }
};

const showArrow = () => {
  return props.items!.length > props.itemsInRow!;
};

const prev = () => {
  if (currentIndex.value === 0) {
    return;
  }
  currentIndex.value--;
  const lastSlide = pictures.value.pop();
  pictures.value = [lastSlide].concat(pictures.value);
};

const itemWidth = () => {
  const width = props.contentBlockRef!.offsetWidth / props.itemsInRow!;
  const height = width / 2;
  return {
    width: width + "px",
    height: height + "px",
  };
};

const disableNextBtn = () => {
  return currentIndex.value === props.items!.length - props.itemsInRow!;
};
const next = () => {
  if (disableNextBtn()) {
    return;
  }
  currentIndex.value++;
  const firstPicture = pictures.value.shift();
  pictures.value = pictures.value.concat(firstPicture);
};
</script>

<style scoped lang="scss">
.carousel {
  display: flex;
  position: relative;
  height: 100%;
  .slide {
    &.unactive {
      opacity: 0.8;
    }
  }
  .prev,
  .next {
    position: absolute;
    top: calc(50% - 4px);
    &:before {
      content: "";
      border: solid black;
      border-width: 0 3px 3px 0;
      display: inline-block;
      padding: 3px;
    }
  }
  .prev {
    left: -10px;
    &:before {
      transform: rotate(135deg);
      -webkit-transform: rotate(135deg);
    }
  }
  .next {
    right: -10px;
    &:before {
      transform: rotate(-45deg);
      -webkit-transform: rotate(-45deg);
    }
  }
}
</style>
