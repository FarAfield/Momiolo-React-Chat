import { useState, useRef } from "react";
import {
  SmileOutlined,
  FolderOutlined,
  ScissorOutlined,
  MessageOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import PubSub from "pubsub-js";
import moment from "moment";
import styles from "./index.module.less";

function createRoomId(sourceId: any, targetId: any) {
  const list = [sourceId, targetId].sort((a: any, b: any) => a - b);
  return list.join("");
}
function computedMessageList(
  userMessageList: any,
  newMessage: any,
  userId: string
) {
  const cloneList = [...userMessageList];
  // 当前是发送方
  let index = -1;
  if (newMessage.sourceUserId === String(userId)) {
    index = cloneList.findIndex(
      (i: any) => String(i.userId) === newMessage.targetUserId
    );
  } else if (newMessage.targetUserId === String(userId)) {
    index = cloneList.findIndex(
      (i: any) => String(i.userId) === newMessage.sourceUserId
    );
  }
  if (index === -1) {
    console.error("socket发生了错误");
    return cloneList;
  }
  cloneList[index] = {
    ...cloneList[index],
    messageList: (cloneList[index].messageList || []).concat(newMessage),
    latestMessage: newMessage.msgContent,
    latestTime: moment().format("HH:mm"),
  };
  return cloneList;
}
const { TextArea } = Input;
const Operation = (props: any) => {
  const { relation, global, socketProps, dispatch } = props;
  const { userMessageList, currentMessage } = relation;
  const {
    userInfo: { userId },
  } = global;
  const { sendToRoom } = socketProps;
  const [value, setValue] = useState("");
  const textareaRef = useRef<any>(null);
  const enterRef = useRef(""); // 记录回车事件

  function enter(v: any) {
    if (!v) return;
    sendToRoom(createRoomId(userId, currentMessage.userId), {
      msgContent: v,
      targetUserId: currentMessage.userId,
    });
    // 清空输入框
    setValue("");
  }
  function send() {
    if (!value) return;
    sendToRoom(createRoomId(userId, currentMessage.userId), {
      msgContent: value,
      targetUserId: currentMessage.userId,
    });
    // 清空输入框
    setValue("");
    // 重新获取焦点
    textareaRef.current?.focus();
  }
  PubSub.unsubscribe("receiveByRoom");
  PubSub.subscribe("receiveByRoom", (msg: any, { roomId, data }: any) => {
    const result = computedMessageList(userMessageList, data, userId);
    dispatch({
      type: "relation/update",
      userMessageList: result,
    });
  });
  // @ts-ignore
  return (
    <div className={styles.root}>
      <div className={styles.operation}>
        <div className={styles.iconGroup}>
          <SmileOutlined style={{ color: "rgb(145,145,145)" }} />
          <FolderOutlined style={{ color: "rgb(145,145,145)" }} />
          <ScissorOutlined style={{ color: "rgb(145,145,145)" }} rotate={-90} />
          <MessageOutlined style={{ color: "rgb(145,145,145)" }} />
        </div>
        <div className={styles.iconGroup}>
          <PhoneOutlined style={{ color: "rgb(145,145,145)" }} rotate={90} />
          <VideoCameraOutlined style={{ color: "rgb(145,145,145)" }} />
        </div>
      </div>
      <div className={styles.textArea}>
        <TextArea
          ref={textareaRef}
          onFocus={(e) => e.stopPropagation()}
          value={value}
          onChange={(e) => {
            e.stopPropagation();
            if (enterRef.current !== "enter") {
              setValue(e.target.value);
            } else {
              enterRef.current = "";
            }
          }}
          onPressEnter={(e: any) => {
            e.stopPropagation();
            enterRef.current = "enter";
            enter(e.target.value);
          }}
        />
      </div>
      <div className={styles.enter}>
        <div className={styles.enterButton} onClick={send}>
          发送(S)
        </div>
      </div>
    </div>
  );
};
export default Operation;
