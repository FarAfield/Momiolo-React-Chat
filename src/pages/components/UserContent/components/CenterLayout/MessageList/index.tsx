import { useEffect } from "react";
import { connect } from "dva";
import { useVirtualList } from "ahooks";
import { createService, useResource } from "@/utils/requestUtils";
import styles from "./index.module.less";

const messageList = createService("/socket/findUserList");
const MessageList = (props: any) => {
  const { global, relation, dispatch } = props;
  const {
    userInfo: { userId },
  } = global;
  const { userMessageList, currentMessage } = relation;
  const { data } = useResource(messageList, {
    params: { userId },
    defaultData: [],
  });
  useEffect(() => {
    dispatch({
      type: "relation/update",
      userMessageList: data,
    });
  }, [data]);
  function updateCurrentMessage(v: any) {
    dispatch({
      type: "relation/update",
      currentMessage: v,
    });
  }
  const { list, containerProps, wrapperProps } = useVirtualList(
    userMessageList,
    {
      overscan: 10,
      itemHeight: 60,
    }
  );
  return (
    <div
      {...containerProps}
      style={{ height: "calc(100% - 56px)", overflow: "overlay" }}
    >
      <div {...wrapperProps}>
        {list.map(({ index, data }) => (
          <div
            className={styles.messageListItem}
            key={index}
            style={{
              background:
                data.userId === currentMessage.userId
                  ? "linear-gradient(to right bottom, rgb(200, 200, 200), rgb(198,198,198))"
                  : "",
            }}
            onClick={() => updateCurrentMessage(data)}
          >
            <div className={styles.avatar}>
              <img src={data.avatarUrl} alt="" />
            </div>
            <div className={styles.message}>
              <div>{data.nickName}</div>
              <div>{data.lastMessage}</div>
            </div>
            <div className={styles.date}>{data.lastDate}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default connect(({ global, relation }: any) => ({
  global,
  relation,
}))(MessageList);
