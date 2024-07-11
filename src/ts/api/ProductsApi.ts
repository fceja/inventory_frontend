import useApiClient from "@api/config/AxiosConfig";

const ProductsApi = () => {
  const apiClient = useApiClient();

  const get = async () => {

    return await apiClient.request({
      url: "/products",
      method: "GET",
      data: null,
    });
  };

  return { get };
};

export default ProductsApi;
