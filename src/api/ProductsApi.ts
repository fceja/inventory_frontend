import useApiClient from "./config/AxiosConfig";
import { defineCancelApiObject } from "./utils/AxiosUtils";

interface ProductI {
  name: string;
  quantity: number;
}

const ProductsApi = (dispatch: any, authState: any) => {
  const apiClient = useApiClient(dispatch, authState);
  const cancelApiObject = defineCancelApiObject(ProductsApi);

  const create = async (product: ProductI, cancel = false) => {
    const cancelSignal =
      cancel && cancelApiObject
        ? cancelApiObject.create.handleRequestCancellation().signal
        : undefined;

    return await apiClient.request({
      url: "/products",
      method: "POST",
      data: product,
      signal: cancelSignal,
    });
  };

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

  return { create, get };
};

export default ProductsApi;
