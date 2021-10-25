import { connect } from "dva";
// import { useSocket } from "@/utils/socket";
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

  return (
    <div className={styles.root}>
      <LeftLayout />
      <CenterLayout />
      <RightLayout />
    </div>
  );
};
export default connect(({ global }: any) => ({ global }))(UserContent);
