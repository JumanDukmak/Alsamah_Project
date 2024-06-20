import axios from "axios";

export const uploadDirectCostFileApi = (formData) => {
  return axios.post(
    "http://127.0.0.1:8000/api/costs/import-directWork",
    formData,
    {
      headers: {
        Authorization: `Bearer ${""}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );
};



export const addDirectWorkApi = (directWorkCost, id) => {
  return axios.post(
    `http://127.0.0.1:8000/api/costs/add-directWork/${id}`,
    {
      directWorkCost: directWorkCost,
    },
    {
      headers: {
        Authorization: `Bearer ${""}`,
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteDirectWorkApi = (productId, directWork) => {
  return axios.post(
    `http://127.0.0.1:8000/api/costs/delete-directWork/${productId}`,
    {
      directWork: directWork,
    },
    {
      headers: {
        Authorization: `Bearer ${""}`,
        "Content-Type": "application/json",
      },
    }
  );
};
