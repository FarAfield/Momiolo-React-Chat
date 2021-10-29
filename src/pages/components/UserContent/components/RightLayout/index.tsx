import {
  MinusOutlined,
  CloseOutlined,
  BorderOutlined,
  PushpinOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import { connect } from "dva";
import wechatBackground from "@/assets/wechatBackground.svg";
import MessageSend from "./MessageSend";
import styles from "./index.module.less";

const RightLayout = (props: any) => {
  const {
    global: { activeKey, maximize, fixed },
    relation: { currentMessage },
    dispatch,
    socketProps,
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
  // 扩展 todo
  function renderContent() {
    const show = (isShow: boolean) => {
      return { style: { display: isShow ? "flex" : "none" } };
    };
    return (
      <>
        <MessageSend
          socketProps={socketProps}
          {...show(
            activeKey === "message" && !!Object.keys(currentMessage).length
          )}
        />
        <Black
          {...show(
            activeKey !== "message" || !Object.keys(currentMessage).length
          )}
        />
      </>
    );
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
      {renderContent()}
    </div>
  );
};
export default connect(({ global, relation }: any) => ({ global, relation }))(
  RightLayout
);

/**
 *  空白页
 */
const Black = ({ style }: any) => {
  return (
    <div className={styles.black} style={style}>
      <img src={wechatBackground} alt="" />
    </div>
  );
};
