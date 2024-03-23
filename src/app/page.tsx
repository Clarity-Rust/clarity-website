import CanvasComponent from "@/components/Canvas";
import styles from "./page.module.css";
import Countdown from "@/components/coming-soon/Countdown";
import ContactButton from "@/components/coming-soon/ContactButton";

export default function Home() {
  return (
    <div className={`${styles.main}`}>
      <div className={`${styles.desktop}`}>
        <CanvasComponent />
      </div>

      <div className={`${styles.mobile}`}>
        <div className={`${styles.gradient} p-1`}>
          <h1 className="text-5xl rust-font">CLARITY RUST</h1>
        </div>
        <div className="text-2xl">The next best Rust server.</div>
        <div className="text-2xl italic">Launching on 3/27.</div>
        <div className="flex flex-col gap-3">
          <h2 className="text-2xl">Check us out below!</h2>
          <div className="flex flex-row gap-2">
            <ContactButton variant="steam" />
            <ContactButton variant="discord" />
          </div>
        </div>
        <Countdown color="white" />
      </div>
    </div>
  );
}
