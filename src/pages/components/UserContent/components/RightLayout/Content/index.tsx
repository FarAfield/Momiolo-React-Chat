import { Avatar } from "antd";
import styles from "./index.module.less";

const Content = (props: any) => {
  const { relation, global } = props;
  const { userMessageList, currentMessage } = relation;
  const {
    userInfo: { userId },
  } = global;
  const messageList = userMessageList.find(
    (i: any) => i.userId === currentMessage.userId
  )?.messageList;
  const source = currentMessage;
  const target = userMessageList.find(
    (i: any) => i.userId === currentMessage.userId
  );
  return (
    <div className={styles.root} style={{ overflow: "overlay" }}>
      {messageList?.map((item: any, index: number) => {
        // 左边
        if (item.targetUserId === String(userId)) {
          return (
            <div key={index} className={styles.leftMessage}>
              <div className={styles.avatar}>
                <Avatar shape="square" size="large" src={target.avatarUrl} />
              </div>
              <div className={styles.text}>{item.msgContent}</div>
            </div>
          );
        } else if (item.sourceUserId === String(userId)) {
          return (
            <div key={index} className={styles.rightMessage}>
              <div className={styles.text}>{item.msgContent}</div>
              <div className={styles.avatar}>
                <Avatar shape="square" size="large" src={source.avatarUrl} />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};
export default Content;
