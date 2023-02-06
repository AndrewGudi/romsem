<template lang="pug">
.parallax
  .parallax-layer(:style="{ backgroundImage: `url(${image})` }")
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

const props = defineProps({
  image: { type: String },
});
</script>

<style lang="scss">
.parallax {
  height: 70vh;
  overflow: hidden;

  .parallax-layer {
    width: 100%;
    min-height: 100vh;
    background-position: center center;
    background-attachment: fixed;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
