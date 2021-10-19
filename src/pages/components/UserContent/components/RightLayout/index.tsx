import {
  MinusOutlined,
  CloseOutlined,
  BorderOutlined,
  PushpinOutlined,
  EllipsisOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { connect } from "dva";
import { useMessageReducer } from "../reducer";
import DragLine from "../../../../../components/DragLine";
import Content from "./Content";
import Operation from "./Operation";
import styles from "./index.module.less";
const RightLayout = (props: any) => {
  const {
    global: { activeKey, maximize, fixed },
    dispatch,
  } = props;
  function close() {
    dispatch({
      type: "global/update",
      login: false,
    });
  }
  function minimize() {
    dispatch({
      type: "global/update",
      minimize: true,
    });
  }
  function toggleMaximize() {
    dispatch({
      type: "global/update",
      maximize: !maximize,
    });
  }
  function toggleFixed() {
    dispatch({
      type: "global/update",
      fixed: !fixed,
    });
  }
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.option}>
          <div
            onClick={() => toggleFixed()}
            style={fixed ? { backgroundColor: "rgb(233,233,233)" } : {}}
          >
            <PushpinOutlined rotate={-45} />
          </div>
          <div onClick={minimize}>
            <MinusOutlined />
          </div>
          <div onClick={() => toggleMaximize()}>
            {maximize ? <SelectOutlined rotate={-90} /> : <BorderOutlined />}
          </div>
          <div onClick={close}>
            <CloseOutlined />
          </div>
        </div>
      </div>
      <MessageSend />
    </div>
  );
};
export default connect(({ global }: any) => ({ global }))(RightLayout);

/**
 *  消息发送区
 */
const MessageSend = () => {
  return (
    <>
      <div className={styles.link}>
        <div>新消息</div>
        <div>
          <EllipsisOutlined />
        </div>
      </div>
      <div className={styles.body}>
        <DragLine direction="horizontal">
          <div className={styles.content}>
            <div className={styles.top}>
              <Content />
            </div>
            <div className={styles.line} />
            <div className={styles.bottom}>
              <Operation />
            </div>
          </div>
        </DragLine>
      </div>
    </>
  );
};
