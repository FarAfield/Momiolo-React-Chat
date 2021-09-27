import { useState } from "react";
import DraggableBox from "@/components/DraggableBox";
import UserLogin from "./components/UserLogin";
import UserContent from "./components/UserContent";
import wechat from "@/assets/wechat.svg";
import styles from "./App.module.less";

function App() {
  const [globalStatus, setGlobalStatus] = useState(true); // 全局状态（false为关闭状态）
  const [userInfo, setUserInfo] = useState({}); // 用户信息
  const [isSign, setIsSign] = useState(false); // 是否登陆

  return (
    <div className={styles.app}>
      {!globalStatus && (
        <div className={styles.wave} onClick={() => setGlobalStatus(true)}>
          <img className={styles.waveImg} src={wechat} alt="" />
        </div>
      )}
      {globalStatus && (
        <DraggableBox key={`${Number(globalStatus)}${Number(isSign)}`}>
          {!isSign && (
            <UserLogin
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              setIsSign={setIsSign}
              setGlobalStatus={setGlobalStatus}
            />
          )}
          {isSign && <UserContent userInfo={userInfo} setIsSign={setIsSign} />}
        </DraggableBox>
      )}
    </div>
  );
}

export default App;
