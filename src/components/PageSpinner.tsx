import { useEffect, useState, useCallback } from "react";
import styles from "./PageSpinner.module.css";

type SpinnerEvent = CustomEvent<{ duration: number }>;

/**
 * 触发顶部鱼板旋转加载动画。
 * @param duration 动画持续时间（毫秒），默认 1200ms
 *
 * 用法：
 *   import { showPageSpinner } from "./components/PageSpinner";
 *   showPageSpinner();           // 默认 1200ms
 *   showPageSpinner(2000);       // 自定义时长
 */
export const showPageSpinner = (duration = 1200) => {
  window.dispatchEvent(
    new CustomEvent("page-spinner", { detail: { duration } }),
  );
};

/**
 * 页面导航加载指示器组件。
 * 放在 App 顶层，监听自定义事件，从顶部滑出旋转鱼板。
 */
const PageSpinner = () => {
  const [active, setActive] = useState(false);

  const handleSpinner = useCallback((e: Event) => {
    const { duration } = (e as SpinnerEvent).detail;
    setActive(true);

    setTimeout(() => {
      setActive(false);
    }, duration);
  }, []);

  useEffect(() => {
    window.addEventListener("page-spinner", handleSpinner);
    return () => window.removeEventListener("page-spinner", handleSpinner);
  }, [handleSpinner]);

  return (
    <div
      className={`${styles.spinnerContainer} ${active ? styles.spinnerContainerActive : ""}`}
      aria-hidden={!active}
      role="status"
      aria-label="页面加载中"
    >
      <img
        src="/naruto.svg"
        alt=""
        className={styles.spinnerImage}
      />
    </div>
  );
};

export default PageSpinner;
