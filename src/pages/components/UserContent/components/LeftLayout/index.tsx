import { useState, useRef } from "react";
import {
  MessageOutlined,
  UserOutlined,
  HeartOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import { useClickAway } from "ahooks";
import { connect } from "dva";
import styles from "./index.module.less";

const OPTIONS = [
  { key: "message", render: (p: any) => <MessageOutlined {...p} /> },
  { key: "contacts", render: (p: any) => <UserOutlined {...p} /> },
  { key: "collection", render: (p: any) => <HeartOutlined {...p} /> },
  { key: "file", render: (p: any) => <FolderOutlined {...p} /> },
];
const LeftLayout = (props: any) => {
  const {
    global: { userInfo, activeKey },
    dispatch,
  } = props;
  const { avatarUrl } = userInfo;
  // 展示个人信息
  const [show, setShow] = useState(false);
  const showRef = useRef(null);
  const clickRef = useRef(false);
  useClickAway(() => {
    if (clickRef.current) {
      clickRef.current = false;
    } else {
      setShow(false);
    }
  }, showRef);
  function onChange(v: string) {
    dispatch({
      type: "global/update",
      activeKey: v,
    });
  }
  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div
          className={styles.avatar}
          onClick={() => {
            setShow(true);
            clickRef.current = true;
          }}
        >
          <img src={avatarUrl} alt="" />
        </div>
        {OPTIONS.map((item: any) => (
          <div
            key={item.key}
            className={styles.icon}
            onClick={() => onChange(item.key)}
          >
            {item.render({
              style: {
                color: activeKey === item.key ? "rgba(26,173,25)" : "gray",
                fontSize: 18,
              },
            })}
          </div>
        ))}
      </div>
      <div
        ref={showRef}
        className={styles.float}
        style={{ display: show ? "flex" : "none" }}
      ></div>
    </div>
  );
};
export default connect(({ global }: any) => ({ global }))(LeftLayout);
