import CanvasComponent from "@/components/Canvas";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={`${styles.main}`}>
   <CanvasComponent/>
    </div>
  );
}
