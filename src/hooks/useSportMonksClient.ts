import { usePromise } from "@raycast/utils";
import useAPIKey from "@src/hooks/useAPIKey";
import axios, { AxiosError } from "axios";
import getClient from "@src/api/client";

type Blah = {
  path: string;
  method: "get" | "post";
  params?: Record<string, unknown>;
};

const useSportMonksClient = ({ path, method, params }: Blah) => {
  const apiKey = useAPIKey();
  const { data, revalidate, isLoading } = usePromise(async () => {
    try {
      const {
        data,
        status,
        headers,
        config: { baseURL },
      } = await getClient(apiKey).request({ method, url: path, params });
      return { data, status, headers, baseURL };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError: AxiosError = error;
        if (axiosError.response) {
          return {
            baseURL: axiosError.config?.baseURL,
            data: axiosError.response.data,
            status: axiosError.response.status,
            headers: axiosError.response.headers,
          };
        }
      }
    }
  });
  return { data, revalidate, isLoading };
};

export default useSportMonksClient;
