import { connect } from "dva";
import DraggableBox from "@/components/DraggableBox";
import UserLogin from "./components/UserLogin";
import UserContent from "./components/UserContent";
import wechat from "@/assets/wechat.svg";
import styles from "./App.module.less";

function show(status = false) {
  return { style: { display: status ? "block" : "none" } };
}
function App(props: any) {
  const {
    global: { minimize, userInfo, login },
    dispatch,
  } = props;

  function toggleStatus() {
    dispatch({
      type: "global/update",
      minimize: !minimize,
    });
  }

  return (
    <div className={styles.app}>
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
        <DraggableBox minWidth={700} minHeight={500} {...show(!minimize)}>
          <UserContent />
        </DraggableBox>
      )}
    </div>
  );
}
export default connect(({ global }: any) => ({ global }))(App);
