import { useState } from "react";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";
import { useVirtualList } from "ahooks";
import styles from "./index.module.less";

const UserCenterLayout = (props: any) => {
  const { userChatList } = props;
  const [isFocus, setIsFocus] = useState(false);
  const [contactList, setContactList] = useState(userChatList);
  const [current, setCurrent] = useState<any>({});
  const { list, containerProps, wrapperProps } = useVirtualList(contactList, {
    overscan: 10,
    itemHeight: 60,
  });
  return (
    <div className={styles.root}>
      <div className={styles.search}>
        <Input />
        <Button>
          <PlusOutlined style={{ color: "rgb(100,100,100)" }} />
        </Button>
      </div>
      <div
        {...containerProps}
        style={{ height: "calc(100% - 56px)", overflow: "overlay" }}
      >
        <div {...wrapperProps}>
          {list.map(({ index, data }) => (
            <div
              className={styles.listItem}
              key={index}
              style={{
                backgroundColor:
                  data.openId === current.openId ? "rgb(196,196,197)" : "",
              }}
              onClick={() => setCurrent(data)}
            >
              <div className={styles.avatar}>
                <img src={data.avatarUrl} alt="" />
              </div>
              <div className={styles.center}>
                <div>{data.nickName}</div>
                <div>{"这是一段文字这是一段文字这是一段文字这是一段文字"}</div>
              </div>
              <div className={styles.time}>{"16:31"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default UserCenterLayout;