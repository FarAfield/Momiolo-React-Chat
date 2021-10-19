// @ts-ignore
import request from "./request";
import { message } from "antd";
import { useState, useEffect } from "react";

export const isSuccess = (response: any) => {
  return response?.statusCode === "0";
};

export const createService = (
  url: string,
  method: string = "get",
  options: object = {}
) => {
  if (method === "get") {
    return (params: any = undefined) =>
      request(url, { method, params, ...options });
  }
  if (method === "post") {
    return (data: any = undefined) =>
      request(url, { method, data, ...options });
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
    message.error(response?.statusMessage);
  }
  return null;
};

export const useResource = (
  service: any,
  { params = {}, desp = [], defaultData = null, formatResult }: any = {}
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

export const useSearch = (service: any, options: any = {}) => {
  const { defaultData = null, formatResult } = options;
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(false);
  async function run(p = {}) {
    setLoading(true);
    const response = await service(p);
    setData(
      formatResult?.(transformResponse(response) || defaultData) ||
        transformResponse(response) ||
        defaultData
    );
    setLoading(false);
  }
  return {
    data,
    loading,
    run,
  };
};
