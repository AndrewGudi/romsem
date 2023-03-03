<template lang="pug">
.main-container
  .content-block(ref="contentBlockRef")
    .content-block--top
      .content-block--image(
        :style="{ backgroundImage: `url(${currentImage})` }"
      )
      .content-block--text
        p MAKE EVERY DAY
        p LEGENDARY
        | THE 2023 BMW
    .content-block--landing-nav(v-if="activeCluster.content")
      .landing-nav
        ul.landing-nav--links
          li.landing-nav--link(@click="scrollToSection(models)") {{ "Models" }}
          li.landing-nav--link(@click="scrollToSection(highlights)") {{ "Highlights" }}
          li.landing-nav--link(@click="scrollToSection(performance)") {{ "Performance" }}
    .content-block--cars-title(ref="models", v-if="!activeCluster.title")
      h2 {{ `BMW SPORTS ACTIVITY COUPE®` }}
      p {{ `An athletic, powerful BMW that leads with standout design and impressive performance.` }}
    .content-block--cars-title(ref="models", v-if="activeCluster.title")
      h2 {{ activeCluster.title.logo }}
      p {{ activeCluster.title.text }}
    .cluster-section(:style="{ height: `${clusterHeight}px` }")
      origin-cluster-item(
        :clustersData="dataSet",
        :useKey="useKey",
        :blockScroll="blockScroll",
        :columnCount="columnCount",
        :rowCount="rowCount",
        :itemWidth="itemWidth",
        :itemHeight="itemHeight",
        :contentBlockRef="contentBlockRef",
        @pushActiveClusterToStore="pushActiveClusterToStore($event)"
      )
    .content-block--highlights-section(ref="highlights")
      highlights-section(:clustersData="activeCluster")
    .content-block--performance-section(ref="performance")
      performance-section(:clustersData="activeCluster")
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCarsStore } from "@/store/carsStore";
import OriginClusterItem from "@/components/OriginClusterItem.vue";
import HighlightsSection from "@/components/HighlightsSection.vue";
import PerformanceSection from "@/components/PerformanceSection.vue";

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
const useKey = ref(false);
const blockScroll = ref(true);
const highlights = ref();
const models = ref();
const performance = ref();

onMounted(() => {
  clusterStore.getDataOrigin().then((res) => {
    dataSet.value = res;
    pushActiveClusterToStore(res);
    recalculate();
    watch(
      () => columnCount.value,
      () => {
        recalculate();
      }
    );
  });
  window.addEventListener("keydown", listener);
  window.addEventListener("keyup", listener);
  window.addEventListener("resize", recalculate);
});
onUnmounted(() => {
  window.removeEventListener("keydown", listener);
  window.removeEventListener("keyup", listener);
  window.removeEventListener("resize", recalculate);
});

const scrollToSection = (item: any) => {
  item.scrollIntoView({ behavior: "smooth" });
};
const listener = (event: any) => {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }
  switch (event.key) {
    case "Shift":
      useKey.value = event.type === "keydown";
      break;
    case "Meta":
      useKey.value = event.type === "keydown";
      break;
    case "Control":
      useKey.value = event.type === "keydown";
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }
  event.preventDefault();
};

const activeCluster = computed(() => {
  return clusterStore.carsStore.activeCluster;
});

const currentImage = computed(() => {
  return activeCluster.value.preview
    ? activeCluster.value.preview
    : "https://www.bmw.com/content/dam/bmw/marketBMWCOM/bmw_com/categories/performance/x5gen/x5-01-stage-hd3.jpg?imwidth=1280";
});

const pushActiveClusterToStore = (activeCluster: any) => {
  blockScroll.value = false;
  setTimeout(() => {
    blockScroll.value = true;
  }, 1000);
  clusterStore.carsStore.activeCluster = activeCluster;
  setTimeout(() => {
    recalculate();
  }, 500);
};

const recalculate = () => {
  if (contentBlockRef.value && contentBlockRef.value.offsetWidth) {
    itemWidth.value =
      (contentBlockRef.value.offsetWidth - 100) / columnCount.value;
    itemHeight.value = itemWidth.value / 2;
    rowCount.value = Math.ceil(
      (clusterStore.carsStore.activeCluster.cars
        ? clusterStore.carsStore.activeCluster.cars.length
        : dataSet.value.length) / columnCount.value
    );
    clusterHeight.value = itemHeight.value * rowCount.value;
  }
};
</script>

<style scoped lang="scss">
.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: max-content;
  .filter-block,
  .info-block {
    max-width: 230px;
    width: 100%;
    height: 100%;
  }
  .content-block {
    flex: 1 1;
    height: max-content;
    .cluster-section {
      overflow: hidden;
      position: relative;
      margin: 0 50px 80px;
      transition: height 1s ease 0s;
    }
    &--landing-nav {
      height: 70px;
      width: 100%;
      background-color: #f6f6f6;
      color: #4c4c4c;
      .landing-nav {
        height: 100%;
        &--links {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8%;
          height: 100%;
        }
        &--link {
          cursor: pointer;
          position: relative;
          font-size: 16px;
          line-height: normal;
          letter-spacing: 0.25px;
          font-weight: 600;
          &:after {
            content: "";
            position: absolute;
            display: inline-block;
            padding: 3px;
            margin-left: 6px;
            bottom: 6px;
            border: solid dodgerblue;
            border-width: 0 3px 3px 0;
            transform: rotate(45deg);
            -webkit-transform: rotate(45deg);
          }
        }
      }
    }
    &--cars-title {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 80%;
      padding: 80px 0 50px 0;
      margin: 0 auto;
      h2 {
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: 2.75px;
      }
      p {
        max-width: 80%;
        font-size: 28px;
        line-height: 37px;
        letter-spacing: -0.1px;
        font-weight: 500;
        text-align: center;
      }
    }
    &--top {
      position: relative;
      display: flex;
      align-items: center;
      height: 70vh;
    }
    &--image {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
    }
    &--text {
      position: absolute;
      display: flex;
      height: 100%;
      width: 100%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      line-height: 24px;
      letter-spacing: -0.1px;
      color: white;
      background: #00000091;
      p {
        font-size: 56px;
        line-height: 68px;
        letter-spacing: 0;
      }
    }
  }
}
</style>
