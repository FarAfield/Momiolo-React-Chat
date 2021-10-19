export default {
  namespace: "relation",
  state: {
    userMessageList: [], // 消息列表
    currentMessage: {},
  },
  effects: {},
  reducers: {
    update: (state: object, { type, ...newState }: { type: string }) => ({
      ...state,
      ...newState,
    }),
  },
};
