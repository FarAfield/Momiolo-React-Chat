import { useState } from "react";
import { connect } from "dva";
import { useMessageReducer } from "../reducer";
import { useResource, createService } from "@/utils/requestUtils";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { useVirtualList } from "ahooks";
import styles from "./index.module.less";

const CenterLayout = () => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <div
          className={styles.input}
          style={
            isFocus
              ? { border: "1px solid rgb(220,219,218)", borderRadius: 4 }
              : {}
          }
        >
          <div
            className={styles.icon}
            style={{
              backgroundColor: isFocus
                ? "rgb(248,248,248)"
                : "rgb(226, 226, 226)",
            }}
          >
            <SearchOutlined
              style={{ fontSize: 12, color: "rgb(100,100,100)" }}
            />
          </div>
          <Input
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            placeholder={isFocus ? "" : "搜索"}
          />
        </div>
        <Button>
          <PlusOutlined style={{ color: "rgb(100,100,100)" }} />
        </Button>
      </div>
      <MessageList />
    </div>
  );
};
export default CenterLayout;

/**
 *  消息列表
 */
const messageList = createService("/socket/findMessageList");
const MessageList = connect(({ global }: any) => ({ global }))(
  ({ global }: any) => {
    const {
      userInfo: { openId },
    } = global;
    const { data } = useResource(messageList, {
      params: { openId },
      defaultData: [],
    });
    const { userMessageList, record, setRecord } = useMessageReducer(data);
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
                backgroundColor:
                  data.openId === record.openId ? "rgb(196,196,197)" : "",
              }}
              onClick={() => setRecord(data)}
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
  }
);