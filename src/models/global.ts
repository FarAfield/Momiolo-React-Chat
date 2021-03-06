export default {
  namespace: "global",
  state: {
    minimize: false, // 最小化
    userInfo: {}, // 用户信息
    login: false, // 是否登录
    activeKey: "message", // 当前功能项
    fixed: false, // 固定化
    maximize: false, // 最大化
  },
  effects: {},
  reducers: {
    update: (state: object, { type, ...newState }: { type: string }) => ({
      ...state,
      ...newState,
    }),
  },
};
