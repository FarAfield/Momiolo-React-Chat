import { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import styles from "./index.module.less";

const MaxScreenWidth = window.screen.availWidth;
const MaxScreenHeight = window.screen.availHeight + 40; // 屏幕高度不包含功能区高度，因此加上40px来达到全屏覆盖
const MaxWidth = window.innerWidth;
const MaxHeight = window.innerHeight;
const DraggableBox = ({
  children,
  width,
  height,
  enableResizing = true,
  disableDragging = false,
  minWidth,
  minHeight,
  maximize = false, // 最大化
  ...rest
}: any) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({
    width: minWidth || width,
    height: minHeight || height,
  });
  const sizeRef = useRef<any>({}); // 记录最大化前的size
  const positionRef = useRef<any>({}); // 记录最大化前的position

  // 初始化设置position
  useEffect(() => {
    setPosition({
      x: (MaxWidth - size.width) / 2,
      y: (MaxHeight - size.height) / 2,
    });
  }, []);

  // 设置最大化的时候记录当前size以及position
  useEffect(() => {
    if (maximize) {
      sizeRef.current = size;
      positionRef.current = position;
      setSize({
        width: MaxScreenWidth,
        height: MaxScreenHeight,
      });
      setPosition({
        x: 0,
        y: 0,
      });
    } else {
      if (
        Object.keys(sizeRef.current).length &&
        Object.keys(positionRef.current).length
      ) {
        setSize(sizeRef.current);
        setPosition(positionRef.current);
      }
    }
  }, [maximize]);

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
      maxWidth={maximize ? MaxScreenWidth : MaxWidth}
      maxHeight={maximize ? MaxScreenHeight : MaxHeight}
      {...rest}
    >
      <div className={styles.children}>{children}</div>
    </Rnd>
  );
};
export default DraggableBox;
