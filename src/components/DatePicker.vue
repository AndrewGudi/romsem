<template lang="pug">
.date-picker(:style="styleForDatePicker()")
  .date-picker--header
    button.date-picker--arrow-prev(
      v-if="(datePickerGroup && prevMonth) || !datePickerGroup",
      @click="datePrev(currentDate)"
    )
    .current-date
      .current-date--month {{ months[currentDate.month] }}
      .current-date--year {{ currentDate.year }}
    button.date-picker--arrow-next(
      v-if="(datePickerGroup && nextMonth) || !datePickerGroup",
      @click="dateNext(currentDate)"
    )
  .date-picker--content
    .date-picker--week-day(v-for="weekDay in days", :style="styleForWeekDay()") {{ weekDay[0] }}
    .date-picker--day-number-prev(
      v-for="day in countDaysPrev",
      :class="{ disable: true }",
      :style="styleForWeekDay()"
    ) {{ day }}
    .date-picker--day-number(
      v-for="day in countDaysCurrent",
      @click="useDataRange(day, currentDate)",
      :style="styleForWeekDay()"
    )
      .date-picker--day-number-useble(:class="isUseRange(day, currentDate)") {{ day }}
    .date-picker--day-number-next(
      v-for="day in countDaysNext",
      :class="{ disable: true }",
      :style="styleForWeekDay()"
    ) {{ day }}
</template>

<script lang="ts" setup>
import { computed, defineEmits, defineProps, onMounted, reactive } from "vue";
import { datePickerFunctions } from "@/composables/datePickerFunctions";
import { DataPickerDate, DataPickerRange } from "@/types/dataPicker";

const emit = defineEmits(["updatePrev", "updateNext"]);

const props = defineProps({
  width: { type: Number, default: 300 },
  datePickerGroup: { type: Boolean, default: false },
  prevMonth: { type: Boolean, default: false },
  nextMonth: { type: Boolean, default: false },
  currentData: Object as () => DataPickerDate,
  dateRange: Object as () => DataPickerRange,
});

onMounted(() => {
  currentDate.value.year = Number(new Date().getFullYear());
  currentDate.value.month = Number(new Date().getMonth());
  currentDate.value.day = Number(new Date().getDate());
});

const initialState: DataPickerDate = {
  year: 0 as number,
  month: 0 as number,
  day: 0 as number,
};

const dateRange: DataPickerRange = reactive({
  from: { ...initialState },
  to: { ...initialState },
});
const currentDateRange = computed(() => {
  return props.dateRange ? props.dateRange : dateRange;
});

const { days, months, isUseRange, useDataRange, datePrev, dateNext } =
  datePickerFunctions(emit, currentDateRange.value);

const currentData = reactive({ ...initialState });
const currentDate = computed(() => {
  return props.currentData ? props.currentData : currentData;
});

const firstDayOfMonth = computed((): any => {
  return new Date(currentDate.value.year, currentDate.value.month, 0).getDay();
});
const lastDayOfMonth = computed((): any => {
  return new Date(
    currentDate.value.year,
    currentDate.value.month,
    countDaysCurrent.value
  ).getDay();
});

const countDaysCurrent = computed(() => {
  return new Date(
    currentDate.value.year,
    currentDate.value.month + 1,
    0
  ).getDate();
});
const countDaysPrev = computed(() => {
  const countDays = new Date(
    currentDate.value.year,
    currentDate.value.year + 1,
    0
  ).getDate();
  const arrayDays: number[] = Array.from(
    { length: countDays },
    (_, i) => i + 1
  );
  return arrayDays.slice(countDays - firstDayOfMonth.value, countDays);
});
const countDaysNext = computed(() => {
  const countDays = new Date(
    currentDate.value.year,
    currentDate.value.month + 2,
    0
  ).getDate();
  const column: number =
    (countDaysPrev.value.length +
      countDaysCurrent.value +
      7 -
      lastDayOfMonth.value) /
    7;
  const arrayDays: number[] = Array.from(
    { length: countDays },
    (_, i) => i + 1
  );
  return arrayDays.slice(0, (column < 6 ? 14 : 7) - lastDayOfMonth.value);
});

const styleForDatePicker = () => {
  return {
    width: props.width + "px",
  };
};
const styleForWeekDay = () => {
  return {
    width: props.width / 7 - 1.5 + "px",
  };
};
</script>

<style scoped lang="scss">
.date-picker {
  height: max-content;
  border: 1px solid #a0aec0;
  border-radius: 8px;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
                              not supported by any browser */
  &--header {
    display: flex;
    padding: 8px 10px;
    .current-date {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      &--month {
        margin-right: 5px;
      }
    }
  }
  &--current-date {
    width: 100%;
  }
  &--arrow {
    &-prev,
    &-next {
      cursor: pointer;
      width: 26px;
      height: 26px;
      border: none;
      padding: 5px 0 0;
      background: inherit;
      &:before {
        content: "";
        border: solid #718096;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 6px;
      }
    }
    &-prev {
      &:before {
        transform: rotate(135deg);
        -webkit-transform: rotate(135deg);
      }
    }
    &-next {
      &:before {
        transform: rotate(-45deg);
        -webkit-transform: rotate(-45deg);
      }
    }
  }
  &--content {
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
  }
  &--week-day {
    cursor: default;
    -webkit-user-select: none;
    user-select: none;
    overflow: hidden;

    padding-top: 4px;
    padding-bottom: 8px;

    text-align: center;
    font-size: 14px;
    font-weight: 700;
    line-height: 14px;

    color: #a0aec0;
  }
  &--day-number,
  &--day-number-prev,
  &--day-number-next {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 32px;
  }
  &--day-number {
    &-useble {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: calc(100% - 2px);
      &.active {
        color: white;
        background: blue;
        &.from {
          border-top-right-radius: 0;
          border-bottom-right-radius: 0;
        }
        &.to {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
        &.to.from {
          border-radius: 10px;
        }
      }
      &.ball {
        color: white;
        background: blue;
        border-radius: 10px;
      }
    }
    &-next,
    &-prev {
      &.disable {
        color: #c3c3c3;
      }
    }
  }
}
</style>
