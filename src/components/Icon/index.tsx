// 在 iconfont.cn 上生成
const scriptUrl = "//at.alicdn.com/t/font_2840362_hmuzux6098q.js";

const scriptElement = document.createElement("script");
scriptElement.src = scriptUrl;
document.body.appendChild(scriptElement);
const Icon = (props: any = {}) => {
  const { type, fontSize, color } = props;
  const style = {
    fontSize: fontSize || 16,
    color: color || "black",
  };
  return (
    <svg className="icon" aria-hidden="true" style={style}>
      <use xlinkHref={`#${type}`} />
    </svg>
  );
};
export default Icon;
