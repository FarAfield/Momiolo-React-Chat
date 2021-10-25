import { useState } from "react";
import {
  SmileOutlined,
  FolderOutlined,
  ScissorOutlined,
  MessageOutlined,
  PhoneOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Input } from "antd";
import styles from "./index.module.less";

const { TextArea } = Input;
const Operation = (props: any) => {
  const { socketProps } = props;
  const { send, sendToRoom } = socketProps;
  const [value, setValue] = useState("");

  function enter() {
    send(value);
  }

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
          onFocus={(e) => e.stopPropagation()}
          value={value}
          onChange={(e) => {
            e.stopPropagation();
            setValue(e.target.value);
          }}
          onPressEnter={enter}
        />
      </div>
      <div className={styles.enter}>
        <div className={styles.enterButton} onClick={enter}>
          发送(S)
        </div>
      </div>
    </div>
  );
};
export default Operation;
