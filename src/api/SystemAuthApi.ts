import { apiClient } from "./config/AxiosConfig";
import { defineCancelApiObject } from "./utils/AxiosUtils";

interface SystemUserI {
  email: string;
  password: string;
}

export const SystemAuthApi = {
  systemLogin: async (systemUser: SystemUserI, cancel = false) => {
    const cancelSignal =
      cancel && cancelApiObject
        ? cancelApiObject[SystemAuthApi.systemLogin.name].handleRequestCancellation()
            .signal
        : undefined;

    return await apiClient.request({
      url: "/systemAuth/systemLogin",
      method: "POST",
      data: systemUser,
      signal: cancelSignal,
    });
  },
};

const cancelApiObject = defineCancelApiObject(SystemAuthApi);
