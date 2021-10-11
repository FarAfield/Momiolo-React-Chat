import {
  MessageOutlined,
  UserOutlined,
  HeartOutlined,
  FolderOutlined,
} from "@ant-design/icons";
import styles from "./index.module.less";

const TOP = [
  { key: "message", render: (p: any) => <MessageOutlined {...p} /> },
  { key: "contacts", render: (p: any) => <UserOutlined {...p} /> },
  { key: "collection", render: (p: any) => <HeartOutlined {...p} /> },
  { key: "file", render: (p: any) => <FolderOutlined {...p} /> },
];
const UserLeftLayout = (props: any) => {
  const { userInfo, activeKey, setActiveKey } = props;
  const { avatarUrl } = userInfo;

  return (
    <div className={styles.root}>
      <div className={styles.top}>
        <div className={styles.avatar}>
          <img src={avatarUrl} alt="" />
        </div>
        {TOP.map((item: any) => (
          <div
            key={item.key}
            className={styles.icon}
            onClick={() => setActiveKey(item.key)}
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
    </div>
  );
};
export default UserLeftLayout;
