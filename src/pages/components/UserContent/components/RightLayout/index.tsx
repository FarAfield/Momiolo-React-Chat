import {
  MinusOutlined,
  CloseOutlined,
  BorderOutlined,
  PushpinOutlined,
  EllipsisOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { connect } from "dva";
import wechatBackground from "@/assets/wechatBackground.svg";
import DragLine from "../../../../../components/DragLine";
import Content from "./Content";
import Operation from "./Operation";
import styles from "./index.module.less";
function show(status = false) {
  return { style: { display: status ? "flex" : "none" } };
}
const RightLayout = (props: any) => {
  const {
    global: { activeKey, maximize, fixed },
    relation: { currentMessage },
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
      <Black isShow={!Object.keys(currentMessage).length} />
      <MessageSend isShow={Object.keys(currentMessage).length} />
    </div>
  );
};
export default connect(({ global, relation }: any) => ({ global, relation }))(
  RightLayout
);

/**
 *  空白页
 */
const Black = ({ isShow }: any) => {
  return (
    <div className={styles.black} {...show(isShow)}>
      <img src={wechatBackground} alt="" />
    </div>
  );
};
/**
 *  消息发送区   hidden设置当前组件隐藏
 */
const MessageSend = connect(({ relation }: any) => ({ relation }))(
  ({ relation, isShow }: any) => {
    const { currentMessage } = relation;
    return (
      <div className={styles.body} {...show(isShow)}>
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
                <Operation />
              </div>
            </div>
          </DragLine>
        </div>
      </div>
    );
  }
);
