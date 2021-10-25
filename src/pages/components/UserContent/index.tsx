import { connect } from "dva";
import { useSocket } from "@/utils/socket";
import LeftLayout from "./components/LeftLayout";
import CenterLayout from "./components/CenterLayout";
import RightLayout from "./components/RightLayout";
import styles from "./index.module.less";

const UserContent = (props: any) => {
  const {
    global: {
      userInfo: { userId },
    },
  } = props;
  const socketProps = useSocket(userId, { receive, receiveByRoom });
  function receive(data: any) {
    console.log(data, "接收数据");
  }
  function receiveByRoom(roomId: string, data: any) {
    console.log(roomId, data, "接收数据");
  }
  return (
    <div className={styles.root}>
      <LeftLayout />
      <CenterLayout />
      <RightLayout socketProps={socketProps} />
    </div>
  );
};
export default connect(({ global }: any) => ({ global }))(UserContent);
