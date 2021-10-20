import React from "react";
import { useEffect, useRef } from "react";
import styles from "./index.module.less";

/***
 *
 * @param children   必须保证children是三层结构 <div>[<div/>,<div/>,<div/>]</div>
 * @param direction
 * @constructor
 * 会保证最小24px不可拖拽
 */
const minSpacing = 24;
const DragLine = ({ children, direction = "vertical" }: any) => {
  const parentRef = useRef<any>(null);
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
          let firstWidth = Number(
            `${
              parent.offsetWidth - lineWidth - initWidth + (e.clientX - initX)
            }`
          );
          let lastWidth = Number(`${initWidth - (e.clientX - initX)}`);
          if (firstWidth < minSpacing) {
            firstWidth = minSpacing;
            lastWidth = parent.offsetWidth - lineWidth - minSpacing;
          }
          if (lastWidth < minSpacing) {
            firstWidth = parent.offsetWidth - lineWidth - minSpacing;
            lastWidth = minSpacing;
          }
          firstDom.style.width = `${firstWidth}px`;
          lastDom.style.width = `${lastWidth}px`;
          break;
        }
        case "horizontal": {
          let firstHeight = Number(
            `${
              parent.offsetHeight -
              lineHeight -
              initHeight +
              (e.clientY - initY)
            }`
          );
          let lastHeight = Number(`${initHeight - (e.clientY - initY)}`);
          if (firstHeight < minSpacing) {
            firstHeight = minSpacing;
            lastHeight = parent.offsetHeight - lineHeight - minSpacing;
          }
          if (lastHeight < minSpacing) {
            firstHeight = parent.offsetHeight - lineHeight - minSpacing;
            lastHeight = minSpacing;
          }
          firstDom.style.height = `${firstHeight}px`;
          lastDom.style.height = `${lastHeight}px`;
          break;
        }
        default:
          break;
      }
    };
    // 松开鼠标，解绑事件
    parent.onmouseup = (o: any) => {
      o.stopPropagation(); // 阻止事件传递到父组件
      document.onmousedown = null;
      document.onmousemove = null;
    };
  };
}
