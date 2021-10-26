import { useState } from "react";
import { connect } from "dva";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import MessageList from "./MessageList";
import styles from "./index.module.less";

const CenterLayout = (props: any) => {
  const {
    global: { activeKey },
    socketProps,
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
      <MessageList socketProps={socketProps}/>
    </div>
  );
};
export default connect(({ global }: any) => ({ global }))(CenterLayout);

/**
 *  消息列表
 */
