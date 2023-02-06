import { computed, ref } from "vue";
import { DataPickerDate } from "@/types/dataPicker";
export function datePickerFunctions(emit: any, dateRange?: any) {
  const days: string[] = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const initialState: DataPickerDate = {
    year: 0 as number,
    month: 0 as number,
    day: 0 as number,
  };

  const dateFrom = computed(() => {
    return new Date(
      dateRange.from.year,
      dateRange.from.month,
      dateRange.from.day
    );
  });

  const dateTo = computed(() => {
    return new Date(dateRange.to.year, dateRange.to.month, dateRange.to.day);
  });

  const isFrom = ref(true);
  const useDataRange = (day: number, currentDate: DataPickerDate) => {
    if (dateRange.from.year && dateRange.to.year) {
      dateRange.from = { ...initialState };
      dateRange.to = { ...initialState };
    }
    if (!dateRange.from.year) {
      dateRange.from.year = currentDate.year;
      dateRange.from.month = currentDate.month;
      dateRange.from.day = day;
      dateRange.to = { ...initialState };
    } else {
      dateRange.to.year = currentDate.year;
      dateRange.to.month = currentDate.month;
      dateRange.to.day = day;
    }
    const copyFrom = { ...dateRange.from };
    const copyTo = { ...dateRange.to };

    if (
      dateRange.from.day &&
      dateRange.to.day &&
      dateFrom.value.valueOf() < dateTo.value.valueOf()
    ) {
      dateRange.from = copyTo;
      dateRange.to = copyFrom;
    }
    isFrom.value = !isFrom.value;
  };

  const forDay = (day: number, currentDate: DataPickerDate) => {
    return new Date(currentDate.year, currentDate.month, day);
  };

  const isUseRange = (day: number, currentDate: DataPickerDate) => {
    const classes: string[] = [];
    if (
      dateRange.from.day &&
      dateRange.to.day &&
      dateFrom.value.valueOf() >= forDay(day, currentDate).valueOf() &&
      forDay(day, currentDate).valueOf() >= dateTo.value.valueOf()
    ) {
      classes.push("active");
      if (forDay(day, currentDate).valueOf() === dateFrom.value.valueOf()) {
        classes.push("to");
      }
      if (forDay(day, currentDate).valueOf() === dateTo.value.valueOf()) {
        classes.push("from");
      }
    }
    if (
      forDay(day, currentDate).valueOf() === dateFrom.value.valueOf() ||
      forDay(day, currentDate).valueOf() === dateTo.value.valueOf()
    ) {
      classes.push("ball");
    }
    return classes;
  };

  const datePrev = (currentDate: DataPickerDate) => {
    if (!currentDate.month) {
      currentDate.month = 11;
      currentDate.year -= 1;
    } else {
      currentDate.month -= 1;
    }
    emit("updatePrev");
  };

  const dateNext = (currentDate: DataPickerDate) => {
    if (currentDate.month >= 11) {
      currentDate.month = 0;
      currentDate.year += 1;
    } else {
      currentDate.month += 1;
    }
    emit("updateNext");
  };
  return {
    initialState,
    dateRange,
    useDataRange,
    isUseRange,
    datePrev,
    dateNext,
    days,
    months,
  };
}
