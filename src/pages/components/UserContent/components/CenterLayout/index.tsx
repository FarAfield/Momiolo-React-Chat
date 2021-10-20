import { useState, useEffect } from "react";
import { connect } from "dva";
import { useResource, createService } from "@/utils/requestUtils";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { useVirtualList } from "ahooks";
import styles from "./index.module.less";

const CenterLayout = (props: any) => {
  const {
    global: { activeKey },
  } = props;
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
export default connect(({ global }: any) => ({ global }))(CenterLayout);

/**
 *  消息列表
 */
const messageList = createService("/socket/findUserList");
const MessageList = connect(({ global, relation }: any) => ({
  global,
  relation,
}))(({ global, relation, dispatch }: any) => {
  const {
    userInfo: { openId },
  } = global;
  const { userMessageList, currentMessage } = relation;
  const { data } = useResource(messageList, {
    params: { openId },
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
                data.openId === currentMessage.openId ? "linear-gradient(to right bottom, rgb(200, 200, 200), rgb(198,198,198))" : "",
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
});
