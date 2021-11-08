import { Avatar } from "antd";
import { useEffect } from "react";
import styles from "./index.module.less";

const Content = (props: any) => {
  const { relation, global } = props;
  const { userMessageList, currentMessage } = relation;
  const {
    userInfo: { userId, avatarUrl },
  } = global;
  const messageList = userMessageList.find(
    (i: any) => i.userId === currentMessage.userId
  )?.messageList;
  useEffect(() => {
    // 滚动到最新的消息
    const target: any = document.getElementById("chat-box");
    if (target) {
      target.scrollTop = target.scrollHeight;
    }
  }, [userMessageList]);
  return (
    <div id="chat-box" className={styles.root} style={{ overflow: "overlay" }}>
      {messageList?.map((item: any, index: number) => {
        // 左边
        if (item.targetUserId === String(userId)) {
          return (
            <div key={index} className={styles.leftMessage}>
              <div className={styles.avatar}>
                <Avatar shape="square" size="large" src={currentMessage.avatarUrl} />
              </div>
              <div className={styles.text}>{item.msgContent}</div>
            </div>
          );
        } else if (item.sourceUserId === String(userId)) {
          return (
            <div key={index} className={styles.rightMessage}>
              <div className={styles.text}>{item.msgContent}</div>
              <div className={styles.avatar}>
                <Avatar shape="square" size="large" src={avatarUrl} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
export default Content;
