import Countdown from "@/components/coming-soon/Countdown";
import Image from "next/image";
import ContactButton from "@/components/coming-soon/ContactButton";
import CanvasComponent from "@/components/Canvas";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={`${styles.main}`}>
   <CanvasComponent/>
    </div>
  );
}
