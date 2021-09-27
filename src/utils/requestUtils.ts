// @ts-ignore
import request from "./request";
import { useState, useEffect } from "react";

export const isSuccess = (response: any) => {
  return response?.statusCode === "0";
};

export const createService = (url: string, method: string = "get") => {
  if (method === "get") {
    return (params: any = undefined) => request(url, { method, params });
  }
  if (method === "post") {
    return (data: any = undefined) => request(url, { method, data });
  }
  // 创建失败
  return () => {
    console.error("无效的Promise,请检查！");
  };
};

export const transformResponse = (
  response: any,
  showError: boolean = false
) => {
  if (isSuccess(response)) {
    return response.data;
  }
  if (showError) {
    console.error(response?.statusMessage);
  }
  return null;
};

export const useResource = (
  service: any,
  { params = {}, desp = [], defaultData = null, formatResult }: any
) => {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  async function fetchData(p: any) {
    setLoading(true);
    const response = await service(p);
    setData(
      formatResult?.(transformResponse(response) || defaultData) ||
        transformResponse(response) ||
        defaultData
    );
    setLoading(false);
  }
  useEffect(() => {
    fetchData(params);
  }, desp);

  function refresh() {
    fetchData(params);
  }

  return {
    data,
    loading,
    refresh,
  };
};
