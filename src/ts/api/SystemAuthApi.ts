import { Dispatch } from "redux";

import useApiClient from "@api/config/AxiosConfig";
import { AuthActionT } from "@store/auth/AuthActions";
import { defineCancelApiObject } from "@api/utils/AxiosUtils";

interface SystemUserI {
  email: string;
  password: string;
}

const SystemAuthApi = (dispatch: Dispatch<AuthActionT>) => {
  const apiClient = useApiClient(dispatch);
  const cancelApiObject = defineCancelApiObject(SystemAuthApi);

  const systemLogin = async (systemUser: SystemUserI, cancel = false) => {
    const cancelSignal =
      cancel && cancelApiObject
        ? cancelApiObject.systemLogin.handleRequestCancellation().signal
        : undefined;

    return await apiClient.request({
      url: "/systemAuth/systemLogin",
      method: "POST",
      data: systemUser,
      signal: cancelSignal,
    });
  };

  return { systemLogin };
};

export default SystemAuthApi;
