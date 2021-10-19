import { useState, useEffect } from "react";
import { Avatar, Radio, Space } from "antd";
import {
  SettingOutlined,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { connect } from "dva";
import QRCode from "qrcode.react";
import { useResource, createService } from "@/utils/requestUtils";
import styles from "./index.module.less";

const userList = createService("/socket/findUserList");
const UserLogin = (props: any) => {
  const {
    global: { userInfo },
    dispatch,
  } = props;
  const [isScanCode, setIsScanCode] = useState(false); // 是否已扫码
  const [isSetting, setIsSetting] = useState(false); // 是否处于设置状态
  const { data: userInfoList } = useResource(userList, {
    defaultData: [],
  });

  useEffect(() => {
    // 用户信息存在，初始时设置为已扫码
    if (Object.keys(userInfo).length) {
      setIsScanCode(true);
    }
  }, []);

  /** 最小化 */
  function minimize() {
    dispatch({
      type: "global/update",
      minimize: true,
    });
  }
  /** 登陆 */
  function login() {
    dispatch({
      type: "global/update",
      login: true,
    });
  }
  /** 切换账号 */
  function switchAccount() {
    setIsScanCode(false);
    dispatch({
      type: "global/update",
      userInfo: {},
    });
  }
  /** 扫码成功 */
  function scanCodeSuccess() {
    if (Object.keys(userInfo).length) {
      setIsScanCode(true);
    }
  }
  /** 切换设置 */
  function switchSetting() {
    setIsSetting(!isSetting);
  }
  /** 选择用户 */
  function selectUser(v: object) {
    dispatch({
      type: "global/update",
      userInfo: v,
    });
  }
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.text}>微信</div>
        <div className={styles.setting}>
          <div onClick={switchSetting}>
            {isSetting ? <UserOutlined /> : <SettingOutlined />}
          </div>
          <div onClick={minimize}>
            <CloseOutlined />
          </div>
        </div>
      </div>
      {isSetting && (
        <Setting
          userInfoList={userInfoList}
          userInfo={userInfo}
          selectUser={selectUser}
        />
      )}
      {!isSetting && (
        <>
          {isScanCode && (
            <Login
              userInfo={userInfo}
              switchAccount={switchAccount}
              login={login}
            />
          )}
          {!isScanCode && <Code scanCodeSuccess={scanCodeSuccess} />}
        </>
      )}
    </div>
  );
};
export default connect(({ global }: any) => ({ global }))(UserLogin);

const Login = ({ userInfo, login, switchAccount }: any) => {
  const { nickName, avatarUrl } = userInfo;
  return (
    <>
      <div className={styles.avatar}>
        <Avatar src={avatarUrl} />
      </div>
      <div className={styles.nickName}>{nickName}</div>
      <div className={styles.button} onClick={login}>
        登录
      </div>
      <a className={styles.switch} onClick={switchAccount}>
        切换账号
      </a>
    </>
  );
};
const Code = ({ scanCodeSuccess }: any) => {
  return (
    <>
      <div className={styles.tip}>扫码登录</div>
      <div className={styles.qrCode} onClick={scanCodeSuccess}>
        <QRCode
          value={`${Math.random().toString(36)}${Math.random().toString(36)}`}
          size={188}
          level="Q"
          fgColor="#2D2D2D"
        />
      </div>
    </>
  );
};
const Setting = ({ userInfoList, userInfo, selectUser }: any) => {
  return (
    <>
      <div className={styles.settingChange}>选择账号</div>
      <div className={styles.settingSelect}>
        <Radio.Group
          onChange={(e: any) =>
            selectUser(
              userInfoList.find((i: any) => i.openId === e.target.value)
            )
          }
          value={userInfo.openId}
        >
          <Space direction="vertical">
            {userInfoList.map((item: any) => (
              <Radio
                key={item.openId}
                value={item.openId}
                disabled={item.online}
              >
                {item.nickName}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </>
  );
};
