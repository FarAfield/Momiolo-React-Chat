import React from "react";
import { useEffect, useRef } from "react";
import styles from "./index.module.less";

/***
 *
 * @param children   必须保证children是三层结构 <div>[<div/>,<div/>,<div/>]</div>
 * @param direction
 * @constructor
 */

const DragLine = ({ children, direction = "vertical" }: any) => {
  const parentRef = useRef(null);
  const firstDomRef = useRef(null);
  const lineDomRef = useRef(null);
  const lastDomRef = useRef(null);

  useEffect(() => {
    initDrag(
      parentRef.current,
      firstDomRef.current,
      lineDomRef.current,
      lastDomRef.current,
      direction
    );
  }, []);

  return React.Children.map(children, (parentChild) =>
    React.cloneElement(parentChild, {
      ref: parentRef,
      children: React.Children.map(
        parentChild.props.children,
        (child, index) => {
          if (index === 0) {
            return React.cloneElement(child, { ref: firstDomRef });
          } else if (index === 1) {
            return React.cloneElement(child, {
              ref: lineDomRef,
              className: `${styles[`${direction.slice(0, 1)}_line`]} ${
                child.props.className || ""
              }`,
            });
          } else if (index === 2) {
            return React.cloneElement(child, { ref: lastDomRef });
          } else {
            return null;
          }
        }
      ),
    })
  );
};
export default DragLine;

function initDrag(
  parent: any,
  firstDom: any,
  lineDom: any,
  lastDom: any,
  direction: "vertical" | "horizontal"
) {
  // 获取线的高宽
  const lineWidth = lineDom.offsetWidth;
  const lineHeight = lineDom.offsetHeight;
  lineDom.onmousedown = (l: any) => {
    let e = l;
    e.stopPropagation(); // 阻止事件传递到父组件
    // 获取初始点击位置
    const initX = e.clientX;
    const initY = e.clientY;
    // 获取到lastDom的初始高宽
    const initWidth = lastDom.offsetWidth;
    const initHeight = lastDom.offsetHeight;
    document.onmousemove = (d: any) => {
      e = d;
      e.stopPropagation(); // 阻止事件传递到父组件
      switch (direction) {
        case "vertical": {
          firstDom.style.width = `${
            parent.offsetWidth - lineWidth - initWidth + (e.clientX - initX)
          }px`;
          lastDom.style.width = `${initWidth - (e.clientX - initX)}px`;
          break;
        }
        case "horizontal": {
          firstDom.style.height = `${
            parent.offsetHeight - lineHeight - initHeight + (e.clientY - initY)
          }px`;
          lastDom.style.height = `${initHeight - (e.clientY - initY)}px`;
          break;
        }
        default:
          break;
      }
    };
    // 松开鼠标，解绑事件
    lineDom.onmouseup = (o: any) => {
      o.stopPropagation(); // 阻止事件传递到父组件
      e = null;
      document.onmousemove = null;
    };
  };
}
