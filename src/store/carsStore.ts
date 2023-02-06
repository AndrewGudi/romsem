import { defineStore } from "pinia";
import { ref } from "vue";
import ClusterService from "@/services/api/carsApi";
import { useUserStore } from "@/store/user";
import router from "@/router";

export const useCarsStore = defineStore(
  "carsStore",
  () => {
    const userStore = useUserStore();
    const carsStore = ref({
      cars: [],
      activeCluster: [] as any,
      loading: false,
    });
    const getDataOrigin = () => {
      carsStore.value.loading = true;
      return ClusterService.getClusterNew()
        .then(({ data }) => {
          if (data.cars && data.cars.length) {
            carsStore.value.loading = false;
            return data;
          }
        })
        .catch(() => {
          userStore.clear();
          router.push({
            path: "/landing",
          });
          return [];
        });
    };
    return {
      carsStore,
      getDataOrigin,
    };
  },
  {
    persist: true,
  }
);
