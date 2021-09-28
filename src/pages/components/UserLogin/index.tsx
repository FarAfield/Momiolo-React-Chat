import { useState, useEffect } from "react";
import { Avatar, Radio, Space } from "antd";
import {
  SettingOutlined,
  CloseOutlined,
  UserOutlined,
} from "@ant-design/icons";
import QRCode from "qrcode.react";
import { useResource, createService } from '@/utils/requestUtils';
import { UserInfoList } from "@/utils/constant";
import styles from "./index.module.less";

const userList = createService('/user/userList');
const UserLogin = ({
  userInfo,
  setUserInfo,
  setIsSign,
  setGlobalStatus,
}: any) => {
  const [isScanCode, setIsScanCode] = useState(false); // 是否已扫码
  const [isSetting, setIsSetting] = useState(false); // 是否处于设置状态
  const [openId, setOpenId] = useState<any>(undefined); // openId
  const { data: userInfoList } = useResource(userList,{ defaultData: UserInfoList });

  useEffect(() => {
    // 用户信息存在，初始时设置为已扫码
    if (Object.keys(userInfo).length) {
      setIsScanCode(true);
    }
  }, []);

  /** 登陆 */
  function login() {
    setIsSign(true);
  }
  /** 切换账号 */
  function switchAccount() {
    setIsScanCode(false);
    setUserInfo({});
  }
  /** 扫码成功 */
  function scanCodeSuccess() {
    if (openId) {
      setIsScanCode(true);
      setUserInfo(userInfoList.find((i: any) => i.openId === openId) || {});
    }
  }
  /** 最小化 */
  function close() {
    setGlobalStatus(false);
  }
  /** 切换设置 */
  function switchSetting() {
    setIsSetting(!isSetting);
    // 若已扫码且openId存在，直接更新用户信息
    if (isScanCode && openId) {
      setUserInfo(userInfoList.find((i: any) => i.openId === openId) || {});
    }
  }
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div className={styles.text}>微信</div>
        <div className={styles.setting}>
          <div onClick={switchSetting}>
            {isSetting ? (
              <UserOutlined className={styles.icon} />
            ) : (
              <SettingOutlined className={styles.icon} />
            )}
          </div>
          <div onClick={close}>
            <CloseOutlined className={styles.icon} />
          </div>
        </div>
      </div>
      {isSetting && <Setting openId={openId} setOpenId={setOpenId} />}
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
export default UserLogin;

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
const Setting = ({ openId, setOpenId }: any) => {
  return (
    <>
      <div className={styles.settingChange}>选择账号</div>
      <div className={styles.settingSelect}>
        <Radio.Group
          onChange={(e: any) => setOpenId(e.target.value)}
          value={openId}
        >
          <Space direction="vertical">
            {UserInfoList.map((item: any) => (
              <Radio key={item.openId} value={item.openId} disabled={item.online}>
                {item.nickName}
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </div>
    </>
  );
};
