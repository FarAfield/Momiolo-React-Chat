import { connect } from "dva";
import PubSub from "pubsub-js";
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
    PubSub.publish("receive", data);
  }
  function receiveByRoom(roomId: string, data: any) {
    PubSub.publish("receiveByRoom", { roomId, data });
  }
  return (
    <div className={styles.root}>
      <LeftLayout />
      <CenterLayout socketProps={socketProps} />
      <RightLayout socketProps={socketProps} />
    </div>
  );
};
export default connect(({ global }: any) => ({ global }))(UserContent);
