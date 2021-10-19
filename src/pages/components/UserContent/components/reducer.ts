import { useState, useReducer } from "react";

/**
 *  消息列表联动
 */
const useMessageReducer = (data: any) => {
  // 列表
  const [userMessageList, dispatch] = useReducer(
    (state: any, action: string) => {
      switch (action) {
        default:
          return state;
      }
    },
    data
  );
  // 当前数据
  const [record, setRecord] = useState<any>(userMessageList?.[0]);

  return { userMessageList, record, setRecord };
};

export { useMessageReducer };
