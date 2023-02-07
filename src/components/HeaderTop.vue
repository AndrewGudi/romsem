<template lang="pug">
.header
  .header--nav
    a.logo(:href="'/'")
    .header--nav-global
      ul.header--nav-global-links
        li.header--nav-global-link(@click="openModal('car-models')") {{ "Models" }}
        li.header--nav-global-link {{ "Build Your Own" }}
        li.header--nav-global-link {{ "Shopping" }}
        li.header--nav-global-link {{ "BMW Certified" }}
        li.header--nav-global-link {{ "Owners" }}
</template>

<script setup lang="ts">
import { ref } from "vue";

const isOpen = ref("" as string | undefined);
const openModal = (name?: string | undefined) => {
  isOpen.value = name;
};
</script>

<style scoped lang="scss">
.header {
  height: 100px;
  padding: 0 50px;
  &--nav {
    display: flex;
    align-items: center;
    z-index: 2;
    height: 100px;
    width: 100%;
    background: white;
    .logo {
      cursor: pointer;
      display: block;
      width: 50px;
      height: 50px;
      &:before {
        content: "";
        display: block;
        width: 100%;
        height: 100%;
        background: url("@/assets/images/bmw-logo-2021.svg") no-repeat;
        background-size: 100%;
      }
    }
    &-global {
      display: flex;
      margin-left: 15px;
      &-links {
        cursor: pointer;
        display: flex;
        gap: 20px;
      }
    }
  }
}
</style>
