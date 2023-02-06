<template lang="pug">
.main-container
  .content-block(ref="contentBlockRef")
    .cars-sliders
      carousel-slider(
        v-for="cluster in dataSet",
        :items="cluster",
        :itemsInRow="4",
        :contentBlockRef="contentBlockRef",
        :useSelect="true",
        @pushActiveClusterToStore="pushActiveClusterToStore($event)",
        v-slot="slotProps"
      )
        car-item(:item="slotProps.item")
    .parallax-image
      parallax-animation(:image="currentImage")
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCarsStore } from "@/store/carsStore";
import CarouselSlider from "@/components/CarouselSlider.vue";
import CarItem from "@/components/CarItem.vue";
import ParallaxAnimation from "@/components/ParallaxAnimation.vue";

const router = useRouter();
const route = useRoute();
const dataSet: any = ref([]);
const clusterStore = useCarsStore();
const itemWidth = ref(0);
const itemHeight = ref(0);
const clusterHeight = ref(0);
const columnCount = ref(4);
const rowCount = ref(0);
const contentBlockRef: any = ref(null);

onMounted(() => {
  clusterStore.getDataOrigin().then((res) => {
    dataSet.value = res;
    pushActiveClusterToStore(res);
    console.log(res);
    recalculate();
    watch(
      () => columnCount.value,
      () => {
        recalculate();
      }
    );
  });
  window.addEventListener("resize", recalculate);
});

const activeCluster = computed(() => {
  return clusterStore.carsStore.activeCluster;
});

const currentImage = computed(() => {
  return activeCluster.value.preview
    ? activeCluster.value.preview
    : "https://www.bmw.com/content/dam/bmw/marketBMWCOM/bmw_com/categories/performance/x5gen/x5-01-stage-hd3.jpg?imwidth=1280";
});

const pushActiveClusterToStore = (activeCluster: any) => {
  clusterStore.carsStore.activeCluster = activeCluster;
};

const recalculate = () => {
  if (contentBlockRef.value && contentBlockRef.value.offsetWidth) {
    itemWidth.value = contentBlockRef.value.offsetWidth / columnCount.value;
    itemHeight.value = itemWidth.value / 2 + 26;
    rowCount.value = Math.ceil(dataSet.value.cars.length / columnCount.value);
    clusterHeight.value = itemHeight.value * rowCount.value;
  }
};
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .filter-block,
  .info-block {
    max-width: 230px;
    width: 100%;
    height: 100%;
  }
  .content-block {
    flex: 1 1;
    margin: 0 50px;
    height: max-content;
    .cluster-section {
      position: relative;
    }
    .parallax-image {
      height: max-content;
      padding: 4px;
    }
  }
}
</style>
