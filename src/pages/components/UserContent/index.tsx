import { useState } from "react";
import { useResource, createService } from "@/utils/requestUtils";
import UserLeftLayout from "../UserLeftLayout";
import UserCenterLayout from "../UserCenterLayout";
import UserRightLayout from "../UserRightLayout";
import { UserInfoList } from "@/utils/constant";
import styles from "./index.module.less";

const chatList = createService("/user/chatList");
const UserContent = (props: any) => {
  const { userInfo, setIsSign } = props;
  const { data: userChatList } = useResource(chatList, {
    params: { openId: userInfo.openId },
    defaultData: UserInfoList,
  });
  const [activeKey, setActiveKey] = useState("message");

  return (
    <div className={styles.root}>
      <UserLeftLayout
        userInfo={userInfo}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
      />
      <UserCenterLayout userChatList={userChatList} />
      <UserRightLayout setIsSign={setIsSign}/>
    </div>
  );
};
export default UserContent;
