<template lang="pug">
.header
  .header-phone
    .header-title Наш телефон
    a.header-phone-number(href="tel:996705188955") +996 705 188 955
    a.header-phone-number(href="tel:996705188955") +996 555 188 955
    .header-schedule работаем с 10:00 до 00:00
  .header-info
    .header-location
      .header-location--title Город:
      .header-location--city Кропивницкий
    .header-btns
      .header-btns--first Отзывы
      .header-btns--second Доставка и оплата
      .header-btns--search
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

    min-width: 221px;

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
  &-info {
    display: flex;
    justify-content: space-between;

    width: 100%;
  }
  &-location {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;

    margin-left: 10px;
    height: 100%;

    &--title {
      cursor: pointer;

      font-weight: 300;
      font-size: 14px;
      line-height: 17px;
      color: #a4acad;
    }

    &--city {
      cursor: pointer;

      margin-bottom: 25px;

      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
    }
  }
  .header-btns {
    display: flex;
    align-items: flex-end;

    &--first,
    &--second {
      cursor: pointer;

      margin-bottom: 35px;

      font-weight: 400;
      font-size: 18px;
      line-height: 22px;
      &:hover {
        color: #ff9846;
      }
    }
    &--first {
      margin-right: 10px;
    }
    &--second {
      margin-right: 69px;
    }
    &--search {
      cursor: pointer;
      width: 30px;
      height: 30px;

      margin-right: 40px;
      margin-bottom: 30px;
      &:before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        max-width: 30px;
        max-height: 30px;
        -webkit-mask-image: url("../assets/images/search_icon.svg");
        background-color: #a4acad;
        background-repeat: no-repeat;
      }
      &:hover {
        &:before {
          background-color: #ff9846;
        }
      }
    }
  }
}
</style>
