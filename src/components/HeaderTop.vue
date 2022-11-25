<template lang="pug">
.header
  .header-phone
    .header-title Наш телефон
    a.header-phone-number(href="tel:996705188955") +996 705 188 955
    a.header-phone-number(href="tel:996705188955") +996 555 188 955
    .header-schedule работаем с 10:00 до 00:00
  .header-info
    .header-location
      .header-location--title
      .header-location--city
    .header-btns
</template>

<script lang="ts" setup></script>

<style scoped lang="scss">
.header {
  display: flex;
  height: 95px;
  border-bottom: 0.5px solid #a4acad;

  &-phone {
    display: flex;
    flex-direction: column;
    align-items: center;

    border-right: 0.5px solid #a4acad;
    &-number {
      cursor: pointer;
      font-weight: 500;
      font-size: 18px;
      line-height: 100%;
      text-decoration: none;
      color: #ff9846;
    }
  }
  &-title {
    margin-top: 6px;
    font-weight: 500;
    font-size: 18px;
    line-height: 22px;
  }
  &-schedule {
    position: relative;
    margin: 5px 18px 0 18px;
    padding-left: 20px;

    color: #a4acad;

    font-weight: 500;
    font-size: 14px;
    line-height: 17px;

    &:before {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 15px;
      height: 15px;
      background-image: url("../assets/images/clock.svg");
      background-repeat: no-repeat;
    }
  }
}
</style>
