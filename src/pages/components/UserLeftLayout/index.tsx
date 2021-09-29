import Icon from "@/components/Icon";
import styles from "./index.module.less";

const TOP = [
  { key: "message", icon: "icon-xiaoxi" },
  { key: "contacts", icon: "icon-lianxiren" },
  { key: "collection", icon: "icon-shoucang" },
  { key: "file", icon: "icon-wenjian" },
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
            <Icon
              type={item.icon}
              fontSize={20}
              color={activeKey === item.key ? "rgba(26,173,25)" : "gray"}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default UserLeftLayout;
