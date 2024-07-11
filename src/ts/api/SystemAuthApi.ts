import useApiClient from "@api/config/AxiosConfig";

interface SystemUserI {
  email: string;
  password: string;
}

const SystemAuthApi = () => {
  const apiClient = useApiClient();

  const systemLogin = async (systemUser: SystemUserI) => {

    return await apiClient.request({
      url: "/systemAuth/systemLogin",
      method: "POST",
      data: systemUser,
    });
  };

  return { systemLogin };
};

export default SystemAuthApi;
