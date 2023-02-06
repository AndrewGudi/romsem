<template lang="pug">
.date-picker--group
  date-picker(
    :currentData="currentPrevDate",
    :dateRange="dateRange",
    :datePickerGroup="true",
    :prevMonth="true",
    @updatePrev="datePrev(currentNextDate)"
  )
  date-picker(
    :currentData="currentNextDate",
    :dateRange="dateRange",
    :datePickerGroup="true",
    :nextMonth="true",
    @updateNext="dateNext(currentPrevDate)"
  )
</template>

<script lang="ts" setup>
import { defineEmits, onMounted, reactive } from "vue";
import DatePicker from "@/components/DatePicker.vue";
import { datePickerFunctions } from "@/composables/datePickerFunctions";
import { DataPickerDate, DataPickerRange } from "@/types/dataPicker";
const emit = defineEmits(["updatePrev", "updateNext"]);
const { initialState, datePrev, dateNext } = datePickerFunctions(emit);
const currentPrevDate: DataPickerDate = reactive({ ...initialState });
const currentNextDate: DataPickerDate = reactive({ ...initialState });
onMounted(() => {
  currentPrevDate.year = Number(new Date().getFullYear());
  currentPrevDate.month = Number(new Date().getMonth());
  currentPrevDate.day = Number(new Date().getDate());
  currentNextDate.year = Number(new Date().getFullYear());
  currentNextDate.month = Number(new Date().getMonth());
  currentNextDate.day = Number(new Date().getDate());
  dateNext(currentNextDate);
});

const dateRange: DataPickerRange = reactive({
  from: { ...initialState },
  to: { ...initialState },
});
</script>

<style scoped lang="scss">
.date-picker--group {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: max-content;

  border: 1px solid #a0aec0;
  border-radius: 8px;

  .date-picker {
    border: none;
    border-radius: 0;
  }
}
</style>
