import { api } from "./config/AxiosConfig";
import { defineCancelApiObject } from "./utils/AxiosUtils";

interface ProductI {
  name: string;
  description: string;
  quantity: number;
}

export const ProductApi = {
  create: async (product: ProductI, cancel = false) => {
    const cancelSignal =
      cancel && cancelApiObject
        ? cancelApiObject[ProductApi.create.name].handleRequestCancellation()
            .signal
        : undefined;

    await api.request({
      url: "/products",
      method: "POST",
      data: product,
      signal: cancelSignal,
    });
  },
};

const cancelApiObject = defineCancelApiObject(ProductApi);
