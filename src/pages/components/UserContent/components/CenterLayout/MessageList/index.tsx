import { useEffect } from "react";
import { connect } from "dva";
import { useVirtualList } from "ahooks";
import { createService, useResource } from "@/utils/requestUtils";
import styles from "./index.module.less";

function createRoomId(sourceId: any, targetId: any) {
  const list = [sourceId, targetId].sort((a: any, b: any) => a - b);
  return list.join("");
}

const messageList = createService("/socket/findOnlineUserList");
const MessageList = (props: any) => {
  const { global, relation, dispatch, socketProps } = props;
  const {
    userInfo: { userId },
  } = global;
  const { joinRoom } = socketProps;
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
    if (data.length) {
      data.forEach((item: any) => joinRoom(createRoomId(userId, item.userId)));
    }
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
              <div>{data.latestMessage}</div>
            </div>
            <div className={styles.date}>{data.latestTime}</div>
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
