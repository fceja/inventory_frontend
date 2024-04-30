import useApiClient from "@api/config/AxiosConfig";
import { defineCancelApiObject } from "@api/utils/AxiosUtils";

const ProductsApi = () => {
  const apiClient = useApiClient();
  const cancelApiObject = defineCancelApiObject(ProductsApi);

  const get = async (cancel = false) => {
    const cancelSignal =
      cancel && cancelApiObject
        ? cancelApiObject.get.handleRequestCancellation().signal
        : undefined;

    return await apiClient.request({
      url: "/products",
      method: "GET",
      data: null,
      signal: cancelSignal,
    });
  };

  return { get };
};

export default ProductsApi;
