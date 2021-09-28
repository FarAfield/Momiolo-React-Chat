import { useResource, createService } from "@/utils/requestUtils";
import styles from "./index.module.less";

const chatList = createService("/user/chatList");
const UserContent = (props: any) => {
  const { userInfo } = props;
  const { data: list } = useResource(chatList, {
    params: { openId: userInfo.openId },
    defaultData: [],
  });

  return <div className={styles.root}></div>;
};
export default UserContent;
