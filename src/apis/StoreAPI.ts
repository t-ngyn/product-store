import StoreClient from "./clients/StoreClient";

const StoreAPI = {
  getProducts: async function (params: Pagination) {
    const response = await StoreClient.request({
      method: "GET",
      url: "/products",
      params,
    });

    return response.data;
  },
};

export default StoreAPI;
