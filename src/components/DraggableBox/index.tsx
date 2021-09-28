import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";
import styles from "./index.module.less";

const DraggableBox = ({ children }: any) => {
  // 计算children的宽高
  const childrenRef = useRef<any>(null);
  // 计算position
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    setPosition({
      x: -childrenRef.current?.offsetWidth / 2 || 0,
      y: -childrenRef.current?.offsetHeight / 2 || 0,
    });
  }, []);

  function handleStart() {}
  function handleDrag(e: any, data: any) {
    setPosition({
      x: data.x,
      y: data.y,
    });
  }
  function handleStop() {}
  return (
    <Draggable
      defaultClassName={styles["react-draggable"]}
      axis="both" // 允许任意方向
      bounds="parent" // 指定边界
      handle=".handle"
      position={position}
      grid={[3, 3]} //  指定捕获范围（越小越流畅）
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <div ref={childrenRef} className="handle">
        {children}
      </div>
    </Draggable>
  );
};
export default DraggableBox;
