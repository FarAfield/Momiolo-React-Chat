import { connect } from "dva";
import { EllipsisOutlined } from "@ant-design/icons";
import DragLine from "@/components/DragLine";
import Content from "../Content";
import Operation from "../Operation";
import styles from "./index.module.less";

const MessageSend = (props: any) => {
  const { relation, socketProps } = props;
  const { currentMessage } = relation;
  return (
    <div className={styles.body}>
      <div className={styles.link}>
        <div>{currentMessage.nickName}</div>
        <div>
          <EllipsisOutlined />
        </div>
      </div>
      <div className={styles.send}>
        <DragLine direction="horizontal">
          <div className={styles.content}>
            <div className={styles.top}>
              <Content />
            </div>
            <div className={styles.line} />
            <div className={styles.bottom}>
              <Operation socketProps={socketProps} />
            </div>
          </div>
        </DragLine>
      </div>
    </div>
  );
};
export default connect(({ relation }: any) => ({ relation }))(MessageSend);
