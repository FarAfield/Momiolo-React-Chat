import {
  MinusOutlined,
  CloseOutlined,
  BorderOutlined,
  PushpinOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import styles from "./index.module.less";
const UserRightLayout = (props: any) => {
  const { setIsSign } = props;
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.option}>
          <div onClick={() => {}}>
            <PushpinOutlined rotate={-45} />
          </div>
          <div onClick={() => {}}>
            <MinusOutlined />
          </div>
          <div onClick={() => {}}>
            <BorderOutlined />
          </div>
          <div onClick={() => setIsSign(false)}>
            <CloseOutlined />
          </div>
        </div>
        <div className={styles.link}>
          <div>新消息</div>
          <div>
            <EllipsisOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserRightLayout;
