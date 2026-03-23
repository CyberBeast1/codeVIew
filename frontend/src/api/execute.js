import axiosInstance from "../lib/axios.js";

export const executeApi = {
  runCode: async (data) => {
    const response = await axiosInstance.post("/execute", data);
    return response.data;
  },
};