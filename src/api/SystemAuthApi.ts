import { api } from "./config/AxiosConfig";
import { defineCancelApiObject } from "./utils/AxiosUtils";

interface SystemUserI {
  email: string;
  password: string;
}

export const SystemAuthApi = {
  login: async (systemUser: SystemUserI, cancel = false) => {
    const cancelSignal =
      cancel && cancelApiObject
        ? cancelApiObject[SystemAuthApi.login.name].handleRequestCancellation()
            .signal
        : undefined;

    return await api.request({
      url: "/systemAuth/systemLogin",
      method: "POST",
      data: systemUser,
      signal: cancelSignal,
    });
  },
};

const cancelApiObject = defineCancelApiObject(SystemAuthApi);
