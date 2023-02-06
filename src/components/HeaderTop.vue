<template lang="pug">
.header
  .header--nav
    a.logo(:href="'/'")
    .header--nav-global
      ul.header--nav-global-links
        li.header--nav-global-link {{ "Models" }}
        li.header--nav-global-link {{ "Build Your Own" }}
        li.header--nav-global-link {{ "Shopping" }}
        li.header--nav-global-link {{ "BMW Certified" }}
        li.header--nav-global-link {{ "Owners" }}
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.header {
  width: 100%;
  height: 100px;
  &--nav {
    position: absolute;
    display: flex;
    align-items: center;
    z-index: 2;
    height: 100px;
    width: 100%;
    padding: 0 56px;
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
