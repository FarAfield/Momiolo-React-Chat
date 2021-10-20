import { useEffect, useRef } from "react";
import { connect } from "dva";
import { useFullscreen } from "ahooks";
import DraggableBox from "@/components/DraggableBox";
import UserLogin from "./components/UserLogin";
import UserContent from "./components/UserContent";
import wechat from "@/assets/wechat.svg";
import styles from "./App.module.less";

function show(status = false) {
  return { style: { display: status ? "flex" : "none" } };
}
function App(props: any) {
  const {
    global: { minimize, login, fixed, maximize },
    dispatch,
  } = props;
  const rootRef = useRef(null);
  const [_, { setFull, exitFull }]: any = useFullscreen(rootRef);

  useEffect(() => {
    if (rootRef.current) {
      maximize ? setFull() : exitFull();
    }
  }, [maximize]);

  function toggleStatus() {
    dispatch({
      type: "global/update",
      minimize: !minimize,
    });
  }

  return (
    <div className={styles.app} ref={rootRef}>
      {/** 最小化状态，展示小图标 */}
      <div
        className={styles.minimize}
        onClick={() => toggleStatus()}
        {...show(minimize)}
      >
        <img className={styles.minimizeImg} src={wechat} alt="" />
      </div>
      {/** 未登录状态 */}
      {!login && (
        <DraggableBox
          enableResizing={false}
          width={280}
          height={400}
          {...show(!minimize)}
        >
          <UserLogin />
        </DraggableBox>
      )}
      {/** 登陆状态 */}
      {login && (
        <DraggableBox
          minWidth={700}
          minHeight={500}
          {...show(!minimize)}
          enableResizing={!fixed}
          disableDragging={fixed}
          maximize={maximize}
        >
          <UserContent />
        </DraggableBox>
      )}
    </div>
  );
}
export default connect(({ global }: any) => ({ global }))(App);
