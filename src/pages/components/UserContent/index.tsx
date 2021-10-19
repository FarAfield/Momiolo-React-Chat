import LeftLayout from "./components/LeftLayout";
import CenterLayout from "./components/CenterLayout";
import RightLayout from "./components/RightLayout";
import styles from "./index.module.less";

const UserContent = () => {
  return (
    <div className={styles.root}>
      <LeftLayout />
      <CenterLayout />
      <RightLayout />
    </div>
  );
};
export default UserContent;
