import CanvasComponent from "@/components/Canvas";
import styles from "./page.module.css";
import MobileView from "@/components/Mobile";

export default function Home() {
  return (
    <div className={`${styles.main}`}>
      <div className={`${styles.desktop}`}>
        <CanvasComponent />
      </div>

      <div className={`${styles.mobile}`}>
        <MobileView/>
      </div>
    </div>
  );
}
