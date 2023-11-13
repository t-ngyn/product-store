import axios from "axios";

const StoreClient = axios.create({
  baseURL: "https://dummyjson.com",
});

export default StoreClient;
