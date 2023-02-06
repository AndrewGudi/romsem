import axiosClient from "./index";
import { AxiosResponse } from "axios";

export default {
  getClusterNew(): Promise<AxiosResponse> {
    return axiosClient.get("/json/origin.json");
  },
};
