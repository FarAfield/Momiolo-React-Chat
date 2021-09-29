import { useState, useEffect } from "react";
import { Rnd } from "react-rnd";
import styles from "./index.module.less";

const DraggableBox = ({
  children,
  width,
  height,
  enableResizing = true,
  disableDragging = false,
  minWidth,
  minHeight,
  ...rest
}: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({
    width: minWidth || width,
    height: minHeight || height,
  });

  // 初始化设置position
  useEffect(() => {
    setPosition({
      x: (document.body.clientWidth - size.width) / 2,
      y: (document.body.clientHeight - size.height) / 2,
    });
  }, []);

  function handleDragStop(e: any, data: any) {
    setPosition({
      x: data.x,
      y: data.y,
    });
  }
  function handleResize(
    e: any,
    direction: any,
    ref: any,
    delta: any,
    position: any
  ) {
    setPosition({
      x: position.x,
      y: position.y,
    });
    setSize({
      width: ref.offsetWidth,
      height: ref.offsetHeight,
    });
  }
  return (
    <Rnd
      className={styles.rnd}
      resizeHandleWrapperClass={
        enableResizing ? styles["rnd-resize"] : styles["rnd-resize-disabled"]
      }
      dragAxis="both" // 允许任意方向
      bounds="parent" // 指定边界
      position={position}
      size={size}
      onDragStop={handleDragStop}
      onResize={handleResize}
      enableResizing={enableResizing}
      disableDragging={disableDragging}
      minWidth={minWidth}
      minHeight={minHeight}
      maxWidth={document.body.clientWidth}
      maxHeight={document.body.clientHeight}
      {...rest}
    >
      <div className={styles.children}>{children}</div>
    </Rnd>
  );
};
export default DraggableBox;
